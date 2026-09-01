// config.js - ESM Version
import dotenv from 'dotenv';
dotenv.config();

const config = {
    // MongoDB Configuration (only this is from process.env)
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://drkamran_db_user:7e2LYGpbF0CLkuqe@cluster0.zcim3sa.mongodb.net/?appName=Cluster0',
    
    // Fixed Database Name
    DB_NAME: process.env.DB_NAME || '1902',
    
    // Collections Configuration
    COLLECTIONS: {
        SESSIONS: 'whatsapp_sessions',
        NUMBERS: 'active_numbers',
        CONFIGS: 'bot_configs'
    },
    
    // Bot Configuration
    AUTO_VIEW_STATUS: 'true',
    AUTO_LIKE_STATUS: 'false',  // ADDED - Auto like status messages
    MENTION_REPLY: 'true',
    AUTO_RECORDING: 'false',
    AUTO_REACT: 'false',
    AUTO_TYPING: 'false',
    ALWAYS_ONLINE: 'false',
    VERSION: '5.0.0 Bᴇᴛᴀ',
    DESCRIPTION: '*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ KAMRAN-MD*',
    ANTI_DELETE_PATH: 'inbox',
    ANTI_DELETE: 'false',
    ANTI_STATUS: 'true',
    ANTIEDIT_PATH: 'inbox',
    ANTI_EDIT: 'false',
    STICKER_NAME: 'KAMRAN-MD',
    ANTI_LINK: 'true',
    WELCOME: 'false',
    GOODBYE: 'false',
    WELCOME_MESSAGE: '*_@user joined the group, welcome! 🎉_*',
    GOODBYE_MESSAGE: '*_@user has left the group, we will miss them! 👋_*',
    ADMIN_ACTION: 'false',
    MODE: 'public',
    PREFIX: '.',
    ANTI_CALL: 'false',
    REJECT_MSG: '*Call Rejected Automatically 📵*',
    READ_MESSAGE: 'false',
    AUTO_STATUS_SEEN: 'true',
    OWNER_REACT: 'false',
    OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],
    REACT_EMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
    LIKE_EMOJIS: ['❤️', '👍', '😮', '😎', '💀'],  // ADDED - Emojis for auto like status
    
    // Bot Identity
    BOT_NAME: 'KAMRAN-MD',
    OWNER_NAME: 'KAMRAN-MD',
    OWNER_NUMBER: '923195068309',
    DEV: '923195068309',
    IK_IMAGE_PATH: './lib/jawadmd.jpg',
    BOT_IMAGE: 'https://i.ibb.co/RTWD9M32/jawadmd.jpg',
    
    // Newsletter Configuration
    NEWSLETTER_JID: '120363418144382782@newsletter',
    NEWSLETTER_MESSAGE_ID: '428',  
    
    // System Configuration
    MAX_RETRIES: 3,
    OTP_EXPIRY: 300000,
    CHANNEL_LINK: 'https://whatsapp.com/channel/0029VbAhxYY90x2vgwhXJV3O',
    BANNED: [],
    SUDO: ["2744576493407@lid", "633341413102@lid", "2811233040696@lid", "1297129679592@lid", "923196891871@s.whatsapp.net", "923195068309@s.whatsapp.net", "923110741871@s.whatsapp.net", "923036338918@s.whatsapp.net"],
    
    // Default Settings Template
    DEFAULT_SETTINGS: {
        // Status & View Settings
        AUTO_VIEW_STATUS: 'true',
        AUTO_LIKE_STATUS: 'false',  // ADDED - Auto like status (disabled by default)
        MENTION_REPLY: 'true',
        AUTO_STATUS_SEEN: 'true',
        READ_MESSAGE: 'false',
        
        // Auto Actions
        AUTO_RECORDING: 'false',
        AUTO_REACT: 'false',
        AUTO_TYPING: 'false',
        ALWAYS_ONLINE: 'false',
        OWNER_REACT: 'false',
        
        // Anti Features
        ANTI_DELETE: 'false',
        ANTI_STATUS: 'true',
        ANTI_DELETE_PATH: 'inbox',
        ANTI_EDIT: 'false',
        ANTIEDIT_PATH: 'inbox',
        ANTI_CALL: 'false',
        ANTI_LINK: 'true',
        
        // Group Events
        WELCOME: 'false',
        GOODBYE: 'false',
        ADMIN_ACTION: 'false',
        
        // Message Templates
        WELCOME_MESSAGE: '*_@user joined the group, welcome! 🎉_*',
        GOODBYE_MESSAGE: '*_@user has left the group, we will miss them! 👋_*',
        REJECT_MSG: '*Call Rejected Automatically 📵*',
        
        // Bot Identity
        VERSION: '3.0.0 Bᴇᴛᴀ',
        OWNER_NAME: 'KAMRAN-MD',
        OWNER_NUMBER: '923196891871',
        DEV: '923195058309',
        DESCRIPTION: '*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ KAMRAN MD*',
        STICKER_NAME: 'KAMRAN-MD.',
        MODE: 'public',
        PREFIX: '.',
        BOT_NAME: 'KAMRAN-MD',
        BOT_IMAGE: 'https://i.ibb.co/RTWD9M32/jawadmd.jpg',
        
        REACT_EMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
        OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],
        LIKE_EMOJIS: ['❤️', '👍', '😮', '😎', '💀'],  // ADDED - Emojis for auto like
        
        // Lists
        BANNED: [],
        SUDO: ["274457654493407@lid", "63334141399102@lid", "281123343040696@lid", "129712961679592@lid", "923195068309@s.whatsapp.net", "923196891871@s.whatsapp.net", "923036338918@s.whatsapp.net", "923110741871@s.whatsapp.net"]
    }
};

export default config;
