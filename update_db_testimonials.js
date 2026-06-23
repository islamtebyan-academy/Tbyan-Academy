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

const testimonialsData = {
  testimonials_active_ids: { ar: '1,2,3,4,5,6', en: '1,2,3,4,5,6', fr: '1,2,3,4,5,6' },
  
  testimonial1_name: { ar: 'أميرة خليل', en: 'Amira Khalil', fr: 'Amira Khalil' },
  testimonial1_role: { ar: 'لندن، المملكة المتحدة', en: 'London, UK', fr: 'Londres, Royaume-Uni' },
  testimonial1_persona: { ar: 'أم محترفة', en: 'Bilingual Parent', fr: 'Parent Bilingue' },
  testimonial1_quote: {
    ar: 'العثور على معلم يفهم كلاً من تجويد القرآن والسياق ثنائي اللغة لأطفالي كان أمراً غيّر حياتنا تماماً. الحصص تفاعلية للغاية وأطفالي يتطلعون إليها بشوق كل أسبوع.',
    en: 'Finding a teacher who understands both Quranic Tajweed and my children\'s bilingual context has been life-changing. The lessons are deeply interactive, and my kids look forward to them every single week.',
    fr: 'Trouver un enseignant comprenant le Tajwid et le contexte bilingue de mes enfants a changé notre vie. Les cours sont interactifs.'
  },

  testimonial2_name: { ar: 'يوسف أحمد', en: 'Yusuf Ahmad', fr: 'Yusuf Ahmad' },
  testimonial2_role: { ar: 'تورونتو، كندا', en: 'Toronto, Canada', fr: 'Toronto, Canada' },
  testimonial2_persona: { ar: 'مهندس برمجيات', en: 'Software Developer', fr: 'Développeur' },
  testimonial2_quote: {
    ar: 'المنهج الأكاديمي المتبع لتعليم قواعد اللغة العربية الفصحى استثنائي للغاية. المادة العلمية دقيقة ومنظمة والتعليم فردي تفاعلي، يختلف تماماً عن تطبيقات اللغات التقليدية.',
    en: 'The academic approach to classical Arabic grammar here is exceptional. It\'s tailored, thorough, and highly structured, unlike typical language learning apps.',
    fr: 'L\'approche académique de la grammaire arabe classique est exceptionnelle. Le contenu est structuré et de haut niveau.'
  },

  testimonial3_name: { ar: 'فاطمة منصور', en: 'Fatima Mansour', fr: 'Fatima Mansour' },
  testimonial3_role: { ar: 'الرياض، السعودية', en: 'Riyadh, Saudi Arabia', fr: 'Riyadh, Arabie Saoudite' },
  testimonial3_persona: { ar: 'طالبة دراسات عليا', en: 'Postgraduate Student', fr: 'Étudiante' },
  testimonial3_quote: {
    ar: 'إن إتقان التجويد ودراسة متون التفسير على أيدي نخبة من علماء الأزهر قد عمّق فهمي لكتاب الله. جودة التعليم هنا ترقى لأعلى المستويات الأكاديمية.',
    en: 'Perfecting my Tajweed and studying Tafsir with Al-Azhar scholars 1-on-1 has profoundly deepened my connection to the Quran. The instruction is elite.',
    fr: 'Perfectionner mon Tajwid et étudier le Tafsir avec des savants d\'Al-Azhar en cours 1-on-1 a approfondi mon lien avec le Coran.'
  },

  testimonial4_name: { ar: 'د. طارق ياسين', en: 'Dr. Tariq Yassin', fr: 'Dr. Tariq Yassin' },
  testimonial4_role: { ar: 'نيو جيرسي، الولايات المتحدة', en: 'New Jersey, USA', fr: 'New Jersey, États-Unis' },
  testimonial4_persona: { ar: 'طبيب قلب ووالد', en: 'Cardiologist & Parent', fr: 'Cardiologue & Parent' },
  testimonial4_quote: {
    ar: 'بصفتي ولي أمر أعيش في نيو جيرسي، وفرت أكاديمية تبيان معلماً أزهرياً رائعاً يتواصل معهم بسلاسة، ومدى تقدمهم في مخارج الحروف مذهل حقاً.',
    en: 'As a parent in New Jersey, Islam Tebyan provided an incredible Azhari tutor who connects with them effortlessly. The progress is remarkable.',
    fr: 'En tant que parent dans le New Jersey, l\'académie a fourni un tuteur incroyable d\'Al-Azhar. Leurs progrès sont vraiment remarquables.'
  },

  testimonial5_name: { ar: 'سارة بن جلون', en: 'Sarah Benjelloun', fr: 'Sarah Benjelloun' },
  testimonial5_role: { ar: 'باريس، فرنسا', en: 'Paris, France', fr: 'Paris, France' },
  testimonial5_persona: { ar: 'طالبة قانون', en: 'Law Student', fr: 'Étudiante en Droit' },
  testimonial5_quote: {
    ar: 'دراسة النصوص الفقهية والشرعية باللغتين الفرنسية والعربية في جلسات فردية منظمة تماماً كالحلقات العلمية الجامعية. الشيوخ هنا علماء أكاديميون حقيقيون.',
    en: 'The 1-on-1 study of Islamic legal texts in French and Arabic is structured exactly like a university seminar. The teachers are true academic scholars.',
    fr: 'L\'étude individuelle des textes juridiques islamiques en français et en arabe est structurée comme un séminaire universitaire. Les enseignants sont de vrais savants.'
  },

  testimonial6_name: { ar: 'أحمد محمود', en: 'Ahmad Mahmoud', fr: 'Ahmad Mahmoud' },
  testimonial6_role: { ar: 'برلين، ألمانيا', en: 'Berlin, Germany', fr: 'Berlin, Allemagne' },
  testimonial6_persona: { ar: 'طالب دكتوراه', en: 'Ph.D. Candidate', fr: 'Doctorant' },
  testimonial6_quote: {
    ar: 'تنوع المناهج الدراسية ومرونة الأوقات مكنتني من الموازنة بين دراستي الأكاديمية وحفظ القرآن الكريم بالتجويد الصحيح.',
    en: 'The curriculum diversity and scheduling flexibility enabled me to balance my postgraduate studies with memorizing the Quran with proper Tajweed.',
    fr: 'La diversité du programme et la flexibilité des horaires m\'ont permis de concilier mes études et la mémorisation du Coran.'
  }
};

async function run() {
  console.log('Updating settings table with clean testimonials...');
  for (const [key, value] of Object.entries(testimonialsData)) {
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
  console.log('All testimonials updated successfully!');
}

run();
