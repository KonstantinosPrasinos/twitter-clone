require('dotenv').config();

const config = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseApiKey: process.env.SUPABASE_API_KEY,
  connectionString: process.env.DATABASE_URL,
  port: process.env.PORT,
};

export default config;
