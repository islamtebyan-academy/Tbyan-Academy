const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Basic .env parser
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value.trim();
      }
    }
  }
}

loadEnv();

console.log('SUPABASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testConnection() {
  const { data: courses, error: coursesError } = await supabase.from('courses').select('id, slug');
  if (coursesError) {
    console.error('Error fetching courses:', coursesError);
  } else {
    console.log(`Successfully fetched ${courses.length} courses:`, courses);
  }

  const { data: settings, error: settingsError } = await supabase.from('settings').select('*');
  if (settingsError) {
    console.error('Error fetching settings:', settingsError);
  } else {
    console.log(`Successfully fetched ${settings.length} settings:`, settings);
  }
}

testConnection();
