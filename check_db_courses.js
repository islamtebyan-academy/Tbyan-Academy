const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data, error } = await supabase.from('courses').select('id, slug, title');
  if (error) {
    console.error('Error fetching courses:', error);
  } else {
    console.log(`Found ${data.length} courses in database:`);
    console.log(data);
  }
}

run();
