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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const email = process.argv[2] || 'admin@islamtebyan.com';
const password = process.argv[3] || 'TebyanAdmin2026!';
const name = process.argv[4] || 'Super Admin';

async function createSuperAdmin() {
  console.log(`Creating admin account for ${email}...`);
  
  // 1. Create the user in Auth
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: {
      name: name,
      role: 'super_admin'
    }
  });

  if (error) {
    console.error('Error creating auth user:', error.message);
    return;
  }

  const userId = data.user.id;
  console.log(`User created in auth.users with ID: ${userId}`);

  // 2. Insert or update the profile to ensure role is super_admin and active is true
  const { error: profileError } = await supabase
    .from('admin_profiles')
    .upsert({
      id: userId,
      email: email,
      name: name,
      role: 'super_admin',
      active: true,
      updated_at: new Date().toISOString()
    });

  if (profileError) {
    console.error('Error verifying/creating profile in admin_profiles:', profileError.message);
  } else {
    console.log(`Successfully configured profile in admin_profiles table as Super Admin.`);
    console.log(`\n==========================================`);
    console.log(`Login Email: ${email}`);
    console.log(`Login Password: ${password}`);
    console.log(`Role: super_admin`);
    console.log(`==========================================`);
  }
}

createSuperAdmin();
