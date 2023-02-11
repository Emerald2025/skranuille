require("dotenv").config();
const openai = require("openai");
openai.apiKey = process.env.openai.apiKey;
