// config.js - ESM Version
import dotenv from 'dotenv';
dotenv.config();

const config = {
    // MongoDB Configuration (only this is from process.env)
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://drkamranislamabad_db_user:z2PKHv440McbIWiM@cluster0.9rc7zep.mongodb.net',
    
    // Fixed Database Name
    DB_NAME: process.env.DB_NAME || 'drkamranx400',
    
    // Collections Configuration
    COLLECTIONS: {
        SESSIONS: 'whatsapp_sessions',
        NUMBERS: 'active_numbers',
        CONFIGS: 'bot_configs'
    },
    
    // Bot Configuration
    AUTO_VIEW_STATUS: 'true',
    ANTI_STATUS: 'false',
    AUTO_LIKE_STATUS: 'false',  // ADDED - Auto like status messages
    MENTION_REPLY: 'false',
    AUTO_RECORDING: 'false',
    AUTO_REACT: 'false',
    AUTO_TYPING: 'false',
    ALWAYS_ONLINE: 'false',
    VERSION: '3.0.0 Bᴇᴛᴀ',
    DESCRIPTION: '*© POWERED BY KAMRAN-MD*',
    ANTI_DELETE_PATH: 'inbox',
    ANTI_DELETE: 'false',
    ANTI_EDIT_PATH: 'inbox',
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
    AUTO_LIKE_EMOJI: ['❤️', '🔥', '👑', '⭐', '💎'],
    OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],
    REACT_EMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
    LIKE_EMOJIS: ['❤️', '👍', '😮', '😎', '💀'],  // ADDED - Emojis for auto like status
    
    // Bot Identity
    BOT_NAME: 'KAMRAN-MD',
    OWNER_NAME: 'KAMRAN-MD',
    OWNER_NUMBER: '923036338918',
    DEV: '923219300532',
    IK_IMAGE_PATH: './lib/jawadmd.jpg',
    BOT_IMAGE: 'https://files.catbox.moe/skv7bu.jpg',
      
    // System Configuration
    MAX_RETRIES: 3,
    OTP_EXPIRY: 300000,
    SUDO: [],
    
    // Default Settings Template
    DEFAULT_SETTINGS: {
        // Status & View Settings
        AUTO_VIEW_STATUS: 'true',
        ANTI_STATUS: 'false',
        AUTO_LIKE_STATUS: 'false',  // ADDED - Auto like status (disabled by default)
        MENTION_REPLY: 'false',
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
        ANTI_DELETE_PATH: 'inbox',
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
        VERSION: '7.0.0 Bᴇᴛᴀ',
        OWNER_NAME: 'KAMRAN-MD',
        OWNER_NUMBER: '923036338918',
        DEV: '923219300532',
        DESCRIPTION: '*© POWERED BY KAMRAN-MD*',
        STICKER_NAME: 'KAMRAN-MD',
        MODE: 'public',
        PREFIX: '.',
        BOT_NAME: 'KAMRAN-MD',
        BOT_IMAGE: 'https://files.catbox.moe/skv7bu.jpg',        
        AUTO_LIKE_EMOJI: ['❤️', '🔥', '👑', '⭐', '💎'],        
        REACT_EMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
        OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],
        LIKE_EMOJIS: ['❤️', '👍', '😮', '😎', '💀'],  // ADDED - Emojis for auto like
        
        SUDO: []
    }
};

export default config;
