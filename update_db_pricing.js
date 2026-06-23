const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env manually
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
  if (match) {
    const key = match[1].trim();
    let value = match[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    envVars[key] = value;
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const pricingData = {
  pricing_plan1_name: { ar: 'الاشتراك الأساسي (تأسيس)', en: 'Starter Plan (Foundations)', fr: 'Plan Tassees (Bases)' },
  pricing_plan1_desc: {
    ar: 'مناسب للطلاب الراغبين في دراسة خفيفة مع الحفاظ على وتيرة تلقي منتظمة وضبط مستمر.',
    en: 'Perfect for students seeking light study commitment while maintaining consistent direct feedback.',
    fr: 'Parfait pour les étudiants qui souhaitent un rythme léger tout en conservant un suivi direct régulier.'
  },
  pricing_plan1_feat1: { ar: '4 حصص خاصة شهرياً', en: '4 private sessions / month', fr: '4 séances privées / mois' },
  pricing_plan1_feat2: { ar: 'معلم أزهري مجاز متصل السند', en: 'Certified Azhari tutor', fr: 'Tuteur diplômé d\'Al-Azhar' },
  pricing_plan1_feat3: { ar: 'تعديل مرن ومستمر للمواعيد', en: 'Flexible reschedule policy', fr: 'Politique de report flexible' },
  pricing_plan1_feat4: { ar: 'دعم فني وتنسيق كامل للأوقات', en: 'Full coordinator support', fr: 'Soutien complet du coordinateur' },
  
  pricing_plan1_price_30: { ar: '10', en: '10', fr: '10' },
  pricing_plan1_price_45: { ar: '15', en: '15', fr: '15' },
  pricing_plan1_price_60: { ar: '20', en: '20', fr: '20' },

  pricing_plan2_price_30: { ar: '20', en: '20', fr: '20' },
  pricing_plan2_price_45: { ar: '30', en: '30', fr: '30' },
  pricing_plan2_price_60: { ar: '40', en: '40', fr: '40' },

  pricing_plan3_price_30: { ar: '30', en: '30', fr: '30' },
  pricing_plan3_price_45: { ar: '45', en: '45', fr: '45' },
  pricing_plan3_price_60: { ar: '60', en: '60', fr: '60' }
};

async function run() {
  console.log('Seeding pricing data to database...');
  for (const [key, value] of Object.entries(pricingData)) {
    const { error } = await supabase.from('settings').upsert({
      key,
      value,
      updated_at: new Date().toISOString()
    });
    if (error) {
      console.error(`Error updating ${key}:`, error);
    } else {
      console.log(`Successfully updated key: ${key}`);
    }
  }
  console.log('Pricing data seeded successfully!');
}

run();
