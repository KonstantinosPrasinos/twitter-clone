const appConfig = require('../config/app-config');

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(appConfig.supabaseUrl, appConfig.supabaseApiKey);

module.exports = supabase;
  