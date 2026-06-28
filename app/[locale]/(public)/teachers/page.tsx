import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { createStaticClient } from '@/lib/supabase/server';

export const revalidate = 600;

interface TeachersPageProps {
  params: Promise<{ locale: string }>;
}

const scholarsDataFallback: Record<string, Record<string, {
  name: string;
  title: string;
  specialty: string;
  education: string;
  languages: string;
  bio: string;
}>> = {
  'ahmed-yahya-zakaria': {
    ar: {
      name: 'الشيخ أحمد يحيى زكريا',
      title: 'معلم القرآن الكريم واللغة العربية لغير الناطقين بها',
      specialty: 'تعليم القرآن والتجويد واللغة العربية',
      education: 'ليسانس أصول الدين من جامعة الأزهر الشريف',
      languages: 'العربية، الإنجليزية، الفرنسية، التركية',
      bio: 'معلم قرآن كريم ولغة عربية لغير الناطقين بها، يسعى إلى تقديم تعليم متميز يجمع بين الأصالة والوسائل التعليمية الحديثة. يمتلك خبرة واسعة في التدريس عبر الإنترنت، وأسعى دائمًا إلى تطوير مهارات الطلاب ومساعدتهم على تحقيق أهدافهم اللغوية والدينية في بيئة تعليمية تفاعلية وممتعة.',
    },
    en: {
      name: 'Sheikh Ahmed Yahya Zakaria',
      title: 'Instructor of Quranic Recitation & Arabic for Non-Native Speakers',
      specialty: 'Quran, Tajweed, & Classical Arabic',
      education: 'Bachelor in Usul al-Din, Al-Azhar University',
      languages: 'Arabic, English, French, Turkish',
      bio: 'A dedicated educator specializing in Quranic studies and classical Arabic for non-Arabic speakers. He blends traditional methodology with modern interactive tools to foster deep comprehension. Ahmed holds multiple Ijazas and aims to guide students toward their linguistic and spiritual goals in an engaging, supportive environment.',
    },
    fr: {
      name: 'Cheikh Ahmed Yahya Zakaria',
      title: 'Enseignant du Saint Coran et de la Langue Arabe pour les Non-Arabophones',
      specialty: 'Coran, Tajwid et Arabe Classique',
      education: 'Licence en Oussoul al-Din, Université d\'Al-Azhar',
      languages: 'Arabe, Anglais, Français, Turc',
      bio: 'Enseignant dévoué du Coran et de la langue arabe pour les non-arabophones, Ahmed s\'efforce d\'offrir un enseignement d\'excellence alliant authenticité traditionnelle et outils modernes. Il met à profit son expertise pédagogique pour aider les étudiants à atteindre leurs objectifs linguistiques et spirituels dans un cadre interactif et stimulant.',
    }
  },
  'mohamed-badr': {
    ar: {
      name: 'الشيخ محمد بدر عبد المرضي حسين',
      title: 'واعظ بالأزهر الشريف ومدرس العلوم الشرعية واللغوية',
      specialty: 'التفسير وعلوم القرآن، الفقه المالكي، واللغة العربية',
      education: 'ماجستير في التفسير وعلوم القرآن - كلية أصول الدين، جامعة الأزهر الشريف',
      languages: 'العربية، الإنجليزية',
      bio: 'واعظ وباحث أزهري متخصص في التفسير وعلوم القرآن والفقه المالكي. يجمع في تدريسه بين أصالة المنهج الأزهري القائم على حفظ المتون وضبط الشروح، وبين أساليب التقديم الحديثة عبر الإعلام والمواقع الرقمية. يسعى لنشر الفكر الديني الوسطي المعتدل وخدمة طلاب العلم في مشارق الأرض ومغاربها.',
    },
    en: {
      name: 'Sheikh Mohamed Badr',
      title: 'Al-Azhar Emissary & Instructor of Islamic Sciences & Arabic',
      specialty: 'Tafsir, Maliki Fiqh, & Logic',
      education: 'MA in Tafsir & Quranic Sciences, Faculty of Usul al-Din, Al-Azhar University',
      languages: 'Arabic, English',
      bio: 'A scholarly Al-Azhar preacher and researcher specializing in Quranic exegesis and Maliki jurisprudence. Sheikh Mohamed combines the rigor of the traditional Azhari method—focused on memorization of classical texts and precise textual commentary—with modern media outreach, advocating for moderate Islamic teachings globally.',
    },
    fr: {
      name: 'Cheikh Mohamed Badr',
      title: 'Prédicateur d\'Al-Azhar & Enseignant des Sciences Islamiques et de l\'Arabe',
      specialty: 'Tafsir, Fiqh Malékite et Logique',
      education: 'Master en Tafsir et Sciences du Coran, Faculté d\'Oussoul al-Din, Université d\'Al-Azhar',
      languages: 'Arabe, Anglais',
      bio: 'Prédicateur et chercheur d\'Al-Azhar, spécialisé dans l\'exégèse coranique et le droit malékite. Le Cheikh Mohamed allie la rigueur de la méthode traditionnelle d\'Al-Azhar—basée sur l\'apprentissage par cœur des textes de référence et leur explication minutieuse—à une pédagogie active pour transmettre un savoir religieux authentique et modéré.',
    }
  },
  'hamada-attia-nady': {
    ar: {
      name: 'د. حمادة عطية نادي',
      title: 'باحث دكتوراه في المناهج وطرق التدريس',
      specialty: 'المناهج وطرق التدريس، العلوم الشرعية، والخط العربي',
      education: 'باحث دكتوراه في المناهج وطرق التدريس - جامعة الأزهر الشريف',
      languages: 'العربية، الإنجليزية',
      bio: 'باحث دكتوراه ومطور مناهج تعليمية يجمع بين العلوم الشرعية وعلم المناهج التربوية الحديثة. يتميز بخبرته العميقة في تحقيق المخطوطات والتراث العربي الإسلامي، وتصميم النماذج التعليمية التي تيسر دراسة العلوم الإسلامية واللغة العربية، بالإضافة إلى شغفه بتعليم وتحسين الخط العربي كجزء من الهوية الإسلامية.',
    },
    en: {
      name: 'Dr. Hamada Attia Nady',
      title: 'PhD Researcher in Curriculum & Instruction & Calligrapher',
      specialty: 'Curriculum & Instruction, Islamic Sciences, and Calligraphy',
      education: 'PhD Candidate in Curriculum & Instruction, Al-Azhar University',
      languages: 'Arabic, English',
      bio: 'A doctoral researcher and educational designer who bridges Islamic theology with contemporary curriculum development. Specializing in ethical philosophy, pedagogy, and manuscript editing, he is dedicated to building structured learning paths. Hamada is also an accomplished calligrapher, teaching the classical script as an essential pillar of Islamic art and identity.',
    },
    fr: {
      name: 'Dr. Hamada Attia Nady',
      title: 'Chercheur Doctorant en Didactique et Concepteur de Programmes',
      specialty: 'Didactique, Sciences Islamiques et Calligraphie',
      education: 'Doctorant en Didactique et Méthodologies de l\'Enseignement, Université d\'Al-Azhar',
      languages: 'Arabe, Anglais',
      bio: 'Chercheur et concepteur de programmes, Hamada relie la théologie islamique traditionnelle aux théories modernes de l\'éducation. Spécialisé en philosophie morale et didactique, il élabore des structures d\'apprentissage claires. Il également passionné par la calligraphie arabe, qu\'il enseigne comme un art spirituel et un pilier de l\'identité islamique.',
    }
  }
};

export default async function TeachersPage({ params }: TeachersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';
  const activeLocale = (locale === 'ar' || locale === 'en' || locale === 'fr') ? locale : 'en';

  // Fetch settings from Supabase
  const settings: Record<string, any> = {};
  try {
    const supabase = createStaticClient();
    const { data: dbSettings } = await supabase
      .from('settings')
      .select('*');

    if (dbSettings) {
      dbSettings.forEach((s) => {
        settings[s.key] = s.value;
      });
    }
  } catch (error) {
    console.error('Error fetching settings for teachers listing page:', error);
  }

  const getVal = (key: string, defaultVal: string) => {
    return settings[key]?.[activeLocale] || settings[key]?.[activeLocale.toLowerCase()] || defaultVal;
  };

  const scholars = [
    {
      slug: 'ahmed-yahya-zakaria',
      name: getVal('teacher1_name', scholarsDataFallback['ahmed-yahya-zakaria'][activeLocale].name),
      title: getVal('teacher1_title', scholarsDataFallback['ahmed-yahya-zakaria'][activeLocale].title),
      specialty: getVal('teacher1_specialty', scholarsDataFallback['ahmed-yahya-zakaria'][activeLocale].specialty),
      education: getVal('teacher1_education', scholarsDataFallback['ahmed-yahya-zakaria'][activeLocale].education),
      languages: getVal('teacher1_languages', scholarsDataFallback['ahmed-yahya-zakaria'][activeLocale].languages),
      bio: getVal('teacher1_bio', scholarsDataFallback['ahmed-yahya-zakaria'][activeLocale].bio),
      image: getVal('teacher1_image', '/images/teacher_ahmed_yahya.png')
    },
    {
      slug: 'mohamed-badr',
      name: getVal('teacher2_name', scholarsDataFallback['mohamed-badr'][activeLocale].name),
      title: getVal('teacher2_title', scholarsDataFallback['mohamed-badr'][activeLocale].title),
      specialty: getVal('teacher2_specialty', scholarsDataFallback['mohamed-badr'][activeLocale].specialty),
      education: getVal('teacher2_education', scholarsDataFallback['mohamed-badr'][activeLocale].education),
      languages: getVal('teacher2_languages', scholarsDataFallback['mohamed-badr'][activeLocale].languages),
      bio: getVal('teacher2_bio', scholarsDataFallback['mohamed-badr'][activeLocale].bio),
      image: getVal('teacher2_image', '/images/teacher_mohamed_badr.png')
    },
    {
      slug: 'hamada-attia-nady',
      name: getVal('teacher3_name', scholarsDataFallback['hamada-attia-nady'][activeLocale].name),
      title: getVal('teacher3_title', scholarsDataFallback['hamada-attia-nady'][activeLocale].title),
      specialty: getVal('teacher3_specialty', scholarsDataFallback['hamada-attia-nady'][activeLocale].specialty),
      education: getVal('teacher3_education', scholarsDataFallback['hamada-attia-nady'][activeLocale].education),
      languages: getVal('teacher3_languages', scholarsDataFallback['hamada-attia-nady'][activeLocale].languages),
      bio: getVal('teacher3_bio', scholarsDataFallback['hamada-attia-nady'][activeLocale].bio),
      image: getVal('teacher3_image', '/images/teacher_hamada_attia.png')
    }
  ];

  return (
    <section className="bg-parchment-fade min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Star pattern backdrop */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Page Title */}
        <div className="text-center mb-20">
          <span className={`inline-block text-xs uppercase tracking-widest text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'هيئة التدريس' : 'ACADEMIC FACULTY'}
          </span>
          <h1 className={`text-display text-midnight font-bold mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? 'نخبة من المعلمين والعلماء المجازين' : 'Meet Our Scholars'}
          </h1>
          <p className={`text-sm text-stone max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'علماء مجازون من خريجي جامعة الأزهر الشريف والمؤسسات العريقة، ذوو تأهيل تربوي عالٍ وخبرة في إلقاء الدروس بثلاث لغات.'
              : 'Our faculty is comprised of verified, certified scholars who bring years of university instruction and deep pedagogical experience to your private Zoom session.'}
          </p>
        </div>

        {/* Scholars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          {scholars.map((teacher, index) => (
            <div
              key={index}
              className="bg-ivory border border-gold-muted/15 rounded-[2rem] overflow-hidden shadow-md hover:border-gold/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Frame with overlay and text */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Deep gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent pointer-events-none z-10" />

                  {/* Name & Credentials placed over the image */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 text-start">
                    <h2 className={`text-[1.35rem] font-bold text-parchment mb-1 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                      {teacher.name}
                    </h2>
                    <span className={`text-[10px] text-gold-hi uppercase tracking-widest font-semibold block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {teacher.title}
                    </span>
                  </div>
                </div>

                {/* Card Text Content with padding */}
                <div className="p-6 md:p-7">
                  {/* Short Bio */}
                  <p className={`text-xs text-stone leading-relaxed mb-5 italic ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {teacher.bio}
                  </p>

                  {/* Details List */}
                  <div className={`space-y-2.5 mb-6 text-xs ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    <div className="flex justify-between py-1.5 border-b border-gold-muted/10">
                      <span className="text-stone/60">{isRtl ? 'التخصص' : 'Specialty'}</span>
                      <span className="text-midnight font-bold text-end max-w-[170px]">{teacher.specialty}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gold-muted/10">
                      <span className="text-stone/60">{isRtl ? 'الشهادة' : 'Education'}</span>
                      <span className="text-midnight font-bold text-end max-w-[170px]">{teacher.education}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-stone/60">{isRtl ? 'اللغات' : 'Languages'}</span>
                      <span className="text-midnight font-bold">{teacher.languages}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Link */}
              <div className="px-6 pb-6">
                <Link
                  href={`/${locale}/teachers/${teacher.slug}`}
                  className="btn-gold text-center py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold block w-full relative z-10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  {isRtl ? 'عرض السيرة الذاتية والأوقات' : 'View Profile & Schedule'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
