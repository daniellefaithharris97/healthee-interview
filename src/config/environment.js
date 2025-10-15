require('dotenv').config();

const config = {
  development: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    database: {
      path: './data/feedback.db'
    },
    logging: {
      level: 'info'
    }
  },
  
  production: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'production',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    database: {
      path: process.env.DATABASE_PATH || './data/feedback.db'
    },
    logging: {
      level: 'error'
    }
  }
};

const environment = process.env.NODE_ENV || 'development';
module.exports = config[environment];
