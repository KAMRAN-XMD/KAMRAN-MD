import { proto, downloadContentFromMessage, getContentType, jidDecode } from '@whiskeysockets/baileys';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WRAPPER_TYPES = [
    'viewOnceMessage',
    'viewOnceMessageV2',
    'viewOnceMessageV2Extension',
    'ephemeralMessage',
    'documentWithCaptionMessage',
    'editedMessage'
];

const VIEW_ONCE_TYPES = new Set([
    'viewOnceMessage',
    'viewOnceMessageV2',
    'viewOnceMessageV2Extension'
]);

// Helper function to decode JID directly
const decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
        const decode = jidDecode(jid) || {};
        return (decode.user && decode.server && decode.user + '@' + decode.server) || jid;
    }
    return jid;
};

// Helper function to check if string is URL
const isUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
};

// Unwrap viewOnce / ephemeral wrappers to find the inner content type and message node
const unwrapMessageContent = (rawMsg) => {
    let current = rawMsg;
    let isViewOnce = false;
    let depth = 0;

    while (current && typeof current === 'object' && depth < 8) {
        const type = getContentType(current);
        if (!type) break;

        if (VIEW_ONCE_TYPES.has(type)) {
            isViewOnce = true;
        }

        if (WRAPPER_TYPES.includes(type) && current[type]?.message) {
            current = current[type].message;
            depth += 1;
            continue;
        }

        const content = current[type];
        return {
            mtype: type,
            msg: content && typeof content === 'object' ? content : {},
            container: current,
            isViewOnce
        };
    }

    const fallbackType = current && typeof current === 'object' ? getContentType(current) : null;
    return {
        mtype: fallbackType || null,
        msg: fallbackType && current[fallbackType] && typeof current[fallbackType] === 'object'
            ? current[fallbackType]
            : (current && typeof current === 'object' ? current : {}),
        container: current || {},
        isViewOnce
    };
};

const resolveMediaTarget = (message) => {
    if (!message || typeof message !== 'object') {
        return { mtype: null, msg: {} };
    }

    // If msg already looks like a direct media node with url/directPath and supported mtype
    if (
        message.msg &&
        typeof message.msg === 'object' &&
        (message.msg.url || message.msg.directPath) &&
        ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'].includes(message.mtype)
    ) {
        return { mtype: message.mtype, msg: message.msg };
    }

    // Try unwrapping from message.message, message.msg, or message itself
    for (const candidate of [message.message, message.msg, message]) {
        if (!candidate || typeof candidate !== 'object') continue;
        const unwrapped = unwrapMessageContent(candidate);
        if (
            unwrapped.mtype &&
            ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'].includes(unwrapped.mtype)
        ) {
            return { mtype: unwrapped.mtype, msg: unwrapped.msg };
        }
    }

    return { mtype: message.mtype || null, msg: message.msg || {} };
};

const downloadMediaMessage = async (message, filename) => {
    try {
        if (!message || typeof message !== 'object') {
            throw new Error('Invalid message object');
        }

        const { msg, mtype } = resolveMediaTarget(message);

        if (!msg || typeof msg !== 'object') {
            throw new Error('Invalid media message content');
        }

        let streamType = 'image';
        let extension = '';

        if (mtype === 'imageMessage') {
            streamType = 'image';
            extension = 'jpg';
        } else if (mtype === 'videoMessage') {
            streamType = 'video';
            extension = 'mp4';
        } else if (mtype === 'audioMessage') {
            streamType = 'audio';
            extension = msg.ptt ? 'ogg' : 'mp3';
        } else if (mtype === 'stickerMessage') {
            streamType = 'sticker';
            extension = 'webp';
        } else if (mtype === 'documentMessage') {
            streamType = 'document';
            extension = msg.fileName ? msg.fileName.split('.').pop() : 'bin';
        } else {
            throw new Error(`Unsupported message type: ${mtype || 'unknown'}`);
        }

        if (!msg.url && !msg.directPath) {
            throw new Error('No valid media URL or directPath present in message');
        }

        const stream = await downloadContentFromMessage(msg, streamType);
        let buffer = Buffer.from([]);

        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (filename) {
            const filePath = filename + '.' + extension;
            fs.writeFileSync(filePath, buffer);
            return fs.readFileSync(filePath);
        }

        return buffer;
    } catch (error) {
        console.error('[DOWNLOAD MEDIA] Error:', error);
        throw error;
    }
};

const sms = (conn, m, store) => {
    if (!m) return m;

    try {
        const M = proto.WebMessageInfo;

        // Process message key
        if (m.key) {
            m.id = m.key.id;
            m.isBot = m.id ? (m.id.startsWith('BAES') && m.id.length === 16) : false;
            m.isBaileys = m.id ? (m.id.startsWith('BAE5') && m.id.length === 16) : false;
            m.chat = m.key.remoteJid;
            m.fromMe = Boolean(m.key.fromMe);
            m.isGroup = m.chat ? m.chat.endsWith('@g.us') : false;
            m.sender = m.fromMe
                ? (conn?.user?.id ? decodeJid(conn.user.id) : '')
                : (m.isGroup ? decodeJid(m.key.participant) : decodeJid(m.key.remoteJid));
        }

        // Process message content
        if (m.message) {
            const unwrappedMain = unwrapMessageContent(m.message);
            m.message = unwrappedMain.container || m.message;
            m.mtype = unwrappedMain.mtype;
            m.msg = unwrappedMain.msg || {};
            m.viewOnce = unwrappedMain.isViewOnce;

            // Extract message body
            try {
                m.body = '';
                if (m.mtype === 'conversation' && m.message.conversation) {
                    m.body = m.message.conversation;
                } else if (m.mtype === 'imageMessage' && m.msg?.caption) {
                    m.body = m.msg.caption;
                } else if (m.mtype === 'videoMessage' && m.msg?.caption) {
                    m.body = m.msg.caption;
                } else if (m.mtype === 'extendedTextMessage' && m.msg?.text) {
                    m.body = m.msg.text;
                } else if (m.mtype === 'buttonsResponseMessage' && m.msg?.selectedButtonId) {
                    m.body = m.msg.selectedButtonId;
                } else if (m.mtype === 'listResponseMessage' && m.msg?.singleSelectReply?.selectedRowId) {
                    m.body = m.msg.singleSelectReply.selectedRowId;
                } else if (m.mtype === 'templateButtonReplyMessage' && m.msg?.selectedId) {
                    m.body = m.msg.selectedId;
                } else if (m.mtype === 'messageContextInfo') {
                    m.body =
                        m.message.buttonsResponseMessage?.selectedButtonId ||
                        m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
                        '';
                }
            } catch {
                m.body = '';
            }

            // Get quoted message
            const contextInfo = m.msg?.contextInfo || m.message?.extendedTextMessage?.contextInfo || null;
            const rawQuoted = contextInfo?.quotedMessage || null;

            // Get mentioned JIDs
            m.mentionedJid = contextInfo?.mentionedJid || [];

            if (rawQuoted) {
                try {
                    const unwrappedQuoted = unwrapMessageContent(rawQuoted);
                    let quotedNode = unwrappedQuoted.msg;

                    if (typeof quotedNode === 'string') {
                        quotedNode = { text: quotedNode };
                    }

                    if (!quotedNode || typeof quotedNode !== 'object') {
                        quotedNode = {};
                    }

                    // Handle productMessage if present
                    let type = unwrappedQuoted.mtype;
                    if (type === 'productMessage' && quotedNode.product) {
                        quotedNode = quotedNode.product;
                    }

                    m.quoted = quotedNode;
                    m.quoted.mtype = type;
                    m.quoted.viewOnce = unwrappedQuoted.isViewOnce;
                    m.quoted.id = contextInfo?.stanzaId || '';
                    m.quoted.chat = contextInfo?.remoteJid || m.chat;
                    m.quoted.isBot = m.quoted.id ? (m.quoted.id.startsWith('BAES') && m.quoted.id.length === 16) : false;
                    m.quoted.isBaileys = m.quoted.id ? (m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16) : false;
                    m.quoted.sender = contextInfo?.participant ? decodeJid(contextInfo.participant) : '';
                    m.quoted.fromMe = m.quoted.sender && conn?.user?.id
                        ? (m.quoted.sender === decodeJid(conn.user.id))
                        : false;
                    m.quoted.text =
                        m.quoted.text ||
                        m.quoted.caption ||
                        m.quoted.conversation ||
                        m.quoted.contentText ||
                        m.quoted.selectedDisplayText ||
                        m.quoted.title ||
                        '';
                    m.quoted.mentionedJid = contextInfo?.mentionedJid || [];
                    m.quoted.mimetype = m.quoted.mimetype || '';
                    m.quoted.ptt = Boolean(m.quoted.ptt);

                    // Function to get quoted message object from store
                    m.getQuotedObj = m.getQuotedMessage = async () => {
                        if (!m.quoted.id || !store) return false;
                        try {
                            const q = await store.loadMessage(m.chat, m.quoted.id, conn);
                            return q ? sms(conn, q, store) : false;
                        } catch (e) {
                            console.log('[GET QUOTED] Error:', e.message);
                            return false;
                        }
                    };

                    // Download quoted media function
                    m.quoted.download = async (filename) => {
                        try {
                            const quotedMsg = {
                                msg: m.quoted,
                                mtype: m.quoted.mtype,
                                message: rawQuoted
                            };
                            return await downloadMediaMessage(quotedMsg, filename);
                        } catch (error) {
                            console.error('[QUOTED DOWNLOAD] Error:', error);
                            throw error;
                        }
                    };
                } catch (e) {
                    console.log('[QUOTED PROCESS] Error:', e.message);
                    m.quoted = null;
                }
            } else {
                m.quoted = null;
            }
        }

        // Download function for main message
        if (m.msg && (m.msg.url || m.msg.directPath || m.mtype)) {
            m.download = async (filename) => {
                try {
                    return await downloadMediaMessage(m, filename);
                } catch (error) {
                    console.error('[MAIN DOWNLOAD] Error:', error);
                    throw error;
                }
            };
        }

        // Get message text
        m.text = '';
        if (m.msg) {
            m.text = m.msg.text || m.msg.caption || '';
        }
        if (!m.text && m.message?.conversation) {
            m.text = m.message.conversation;
        }
        if (!m.text && m.msg) {
            m.text = m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || '';
        }

        // Message functions
        m.copy = () => sms(conn, M.fromObject(M.toObject(m)), store);

        m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => {
            return conn.copyNForward(jid, m, forceForward, options);
        };

        m.react = (emoji) => {
            return conn.sendMessage(m.chat, {
                react: {
                    text: emoji,
                    key: m.key
                }
            });
        };

        return m;
    } catch (error) {
        console.error('[SMS] Critical error in sms function:', error);
        return m || {};
    }
};

export { sms, downloadMediaMessage };
