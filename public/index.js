require('./config')
require('dotenv').config();
const openai = require('openai');
openai_apiKey: process.env.openai_apiKey;