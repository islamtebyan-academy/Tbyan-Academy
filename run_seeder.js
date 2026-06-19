const db = require('./check_extracted_db.js');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const COURSE_SLUG_MAP = {
  // Quran Arabic
  'القرآن الكريم والتجويد بالسند': 'quran-tajweed',
  'علم القراءات العشر المتواترة': '10-qiraat',
  'متن الشاطبية والدرة في القراءات': 'shatibiyyah-durrah',
  'رسم المصحف العثماني وضبطه': 'mushaf-script',
  'علوم القرآن وأصول التفسير': 'quranic-sciences-tafsir',
  'علم الوقف والابتداء في التلاوة': 'waqf-ibtida',
  
  // Quran French
  'Coran & Tajwid sous Isnad': 'quran-tajweed',
  'Les Dix Lectures Mutawatir': '10-qiraat',
  'Matn al-Shatibiyyah & al-Durrah': 'shatibiyyah-durrah',
  'Orthographe Coranique (Rasm Uthmani)': 'mushaf-script',
  "Sciences du Coran & Principes d'Exégèse": 'quranic-sciences-tafsir',
  "L'art du Waqf & Ibtida (Pauses et Reprises)": 'waqf-ibtida',

  // Quran English
  'Quran & Tajweed under Isnad': 'quran-tajweed',
  "Ten Mutawatir Recitations (Qira'at)": '10-qiraat',
  'Quranic Orthography & Writing Rules': 'mushaf-script',
  'Quranic Sciences & Tafsir Principles': 'quranic-sciences-tafsir',
  'The Science of Waqf & Ibtida (Pauses)': 'waqf-ibtida',

  // Arabic Arabic
  'النحو والصرف العربي': 'arabic-grammar',
  'الأدب والبلاغة والبيان': 'arabic-literature',
  'متن ألفية ابن مالك في النحو والصرّف': 'alfiya-ibn-malik',
  'فقه اللغة وأسرار العربية': 'arabic-grammar',
  'علم العروض والقوافي وموسيقى الشعر': 'arabic-literature',
  'الإنشاء والخطابة والكتابة الأدبية': 'arabic-literature',

  // Shariah Arabic
  'الفقه الإسلامي وتأصيل الأحكام': 'islamic-fiqh',
  'العقيدة الإسلامية والتوحيد': 'islamic-creed',
  'أصول الفقه وقواعد الاستنباط الفقهي': 'principles-of-fiqh',
  'مصطلح الحديث وعلوم الأثر الشريف': 'principles-of-fiqh',
  'السيرة النبوية والشمائل المحمدية المطهرة': 'islamic-creed',
  'علم المنطق السني وعلم الكلام الأزهري': 'islamic-logic'
};

const getUniqueSlug = (track, idx, defaultSlug) => {
  if (track === 'quran') {
    const quranSlugs = ['quran-tajweed', '10-qiraat', 'shatibiyyah-durrah', 'mushaf-script', 'quranic-sciences-tafsir', 'waqf-ibtida'];
    return quranSlugs[idx] || defaultSlug;
  }
  if (track === 'arabic') {
    const arabicSlugs = ['arabic-grammar', 'arabic-literature', 'alfiya-ibn-malik', 'arabic-philology', 'arabic-metrics', 'creative-writing'];
    return arabicSlugs[idx] || defaultSlug;
  }
  if (track === 'islamic') {
    const shariahSlugs = ['islamic-fiqh', 'islamic-creed', 'principles-of-fiqh', 'hadith-sciences', 'seerah', 'islamic-logic'];
    return shariahSlugs[idx] || defaultSlug;
  }
  if (track === 'kids') {
    const kidsSlugs = ['qaida-nuraniyyah', 'juz-amma', 'kids-salah', 'prophet-stories', 'kids-adhkar', 'kids-ethics'];
    return kidsSlugs[idx] || defaultSlug;
  }
  return defaultSlug;
};

async function seed() {
  console.log('Starting seeder with Service Role Key...');
  const tracks = ['quran', 'arabic', 'islamic', 'kids'];
  
  for (const track of tracks) {
    const arCourses = db.ar[track].courses;
    const enCourses = db.en[track].courses;
    const frCourses = db.fr[track].courses;
    
    for (let i = 0; i < arCourses.length; i++) {
      const arC = arCourses[i];
      const enC = enCourses[i];
      const frC = frCourses[i];
      
      const defaultSlug = COURSE_SLUG_MAP[arC.title] || COURSE_SLUG_MAP[enC.title] || arC.title.toLowerCase().replace(/[^a-z0-t0-9]+/g, '-');
      const slug = getUniqueSlug(track, i, defaultSlug);
      
      const coursePayload = {
        title: {
          ar: arC.title,
          en: enC.title,
          fr: frC.title
        },
        slug: slug,
        short_description: {
          ar: arC.desc,
          en: enC.desc,
          fr: frC.desc
        },
        full_description: {
          ar: arC.desc,
          en: enC.desc,
          fr: frC.desc
        },
        image_url: arC.image || enC.image || frC.image || '/images/course_default.png',
        instructor: {
          ar: 'شيوخ معتمدون من الأزهر الشريف',
          en: 'Certified Azhari Scholars',
          fr: 'Scholars diplômés d\'Al-Azhar'
        },
        duration: {
          ar: arC.stats.duration,
          en: enC.stats.duration,
          fr: frC.stats.duration
        },
        registration_link: null,
        zoom_link: null,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log(`Inserting course: ${slug} (${arC.title})`);
      const { data, error } = await supabase.from('courses').insert([coursePayload]).select();
      if (error) {
        console.error(`Failed to insert ${slug}:`, error.message);
      } else {
        console.log(`Successfully inserted ${slug}`);
      }
    }
  }
  console.log('Seeder complete.');
}

seed();
