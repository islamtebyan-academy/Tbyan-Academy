const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Basic .env parser
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

async function seedArticles() {
  console.log('Reading and parsing blog static data...');
  const dataPath = path.join(__dirname, 'app/[locale]/(public)/blog/data.ts');
  if (!fs.existsSync(dataPath)) {
    console.error('Error: Could not find data.ts at:', dataPath);
    return;
  }

  let code = fs.readFileSync(dataPath, 'utf8');

  // Strip interfaces and TypeScript types
  const idx = code.indexOf('export const ARTICLES_DATA');
  if (idx === -1) {
    console.error('Error: Could not locate ARTICLES_DATA in data.ts');
    return;
  }

  code = code.substring(idx)
    .replace('export const ARTICLES_DATA: Record<string, Record<string, ArticleTranslation>> =', 'const ARTICLES_DATA =')
    .replace('export const BASE_ARTICLES: Omit<Article, \'translation\'>[] =', 'const BASE_ARTICLES =');

  code += '\nmodule.exports = { ARTICLES_DATA, BASE_ARTICLES };';

  // Evaluate cleaned Javascript code
  const m = { exports: {} };
  try {
    const fn = new Function('exports', 'require', 'module', code);
    fn(m.exports, require, m);
  } catch (err) {
    console.error('Error evaluating javascript from data.ts:', err.message);
    return;
  }

  const { ARTICLES_DATA, BASE_ARTICLES } = m.exports;

  console.log(`Found ${BASE_ARTICLES.length} base articles. Starting Supabase seeding...`);

  for (const base of BASE_ARTICLES) {
    const slug = base.slug;
    console.log(`Processing article: ${slug}...`);

    // Compile translations
    const title = {
      ar: ARTICLES_DATA.ar?.[slug]?.title || ARTICLES_DATA.en?.[slug]?.title || '',
      en: ARTICLES_DATA.en?.[slug]?.title || ARTICLES_DATA.ar?.[slug]?.title || '',
      fr: ARTICLES_DATA.fr?.[slug]?.title || ARTICLES_DATA.en?.[slug]?.title || ''
    };

    const excerpt = {
      ar: ARTICLES_DATA.ar?.[slug]?.excerpt || ARTICLES_DATA.en?.[slug]?.excerpt || '',
      en: ARTICLES_DATA.en?.[slug]?.excerpt || ARTICLES_DATA.ar?.[slug]?.excerpt || '',
      fr: ARTICLES_DATA.fr?.[slug]?.excerpt || ARTICLES_DATA.en?.[slug]?.excerpt || ''
    };

    const cta_message = {
      ar: ARTICLES_DATA.ar?.[slug]?.ctaMessage || ARTICLES_DATA.en?.[slug]?.ctaMessage || '',
      en: ARTICLES_DATA.en?.[slug]?.ctaMessage || ARTICLES_DATA.ar?.[slug]?.ctaMessage || '',
      fr: ARTICLES_DATA.fr?.[slug]?.ctaMessage || ARTICLES_DATA.en?.[slug]?.ctaMessage || ''
    };

    const booking_topic = ARTICLES_DATA.en?.[slug]?.bookingTopic || ARTICLES_DATA.ar?.[slug]?.bookingTopic || 'general';

    const content = {
      ar: ARTICLES_DATA.ar?.[slug]?.content || null,
      en: ARTICLES_DATA.en?.[slug]?.content || null,
      fr: ARTICLES_DATA.fr?.[slug]?.content || null
    };

    const payload = {
      slug,
      category_key: base.categoryKey,
      image_url: base.image,
      date: base.date,
      read_time: base.readTime,
      title,
      excerpt,
      cta_message,
      booking_topic,
      content,
      status: 'published',
      updated_at: new Date().toISOString()
    };

    // Upsert article
    const { data, error } = await supabase
      .from('articles')
      .upsert(payload, { onConflict: 'slug' });

    if (error) {
      console.error(`Error seeding article ${slug}:`, error.message);
    } else {
      console.log(`Successfully seeded article: ${slug}`);
    }
  }

  console.log('Seeding process completed!');
}

seedArticles();
