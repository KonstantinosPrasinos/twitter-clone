require('dotenv').config();

const config = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseApiKey: process.env.SUPABASE_API_KEY,
  port: process.env.PORT,
};

module.exports = config;