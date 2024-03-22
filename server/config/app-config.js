require('dotenv').config();

const appConfig = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseApiKey: process.env.SUPABASE_API_KEY,
  connectionString: process.env.DATABASE_URL,
  port: process.env.PORT,
  secretKey: process.env.SECRET
};

const corsConfig = {
  allowedOrigins: ['http://localhost:5173'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = {
  appConfig,
  corsConfig,
};
