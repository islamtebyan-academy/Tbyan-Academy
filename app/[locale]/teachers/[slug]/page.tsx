import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Award, BookOpen, Clock, Heart, Shield } from 'lucide-react';

interface TeacherProfileProps {
  params: Promise<{ locale: string; slug: string }>;
}

const teachersData: Record<string, Record<string, any>> = {
  'anas-al-azhari': {
    ar: {
      name: 'د. أنس الأزهري',
      title: 'دكتوراه في القراءات والتجويد',
      education: 'جامعة الأزهر الشريف، القاهرة',
      specialty: 'التجويد والقراءات العشر المتواترة',
      languages: 'العربية (اللغة الأم)، الإنجليزية (طلاقة)',
      ijazas: [
        'إجازة في القراءات العشر الصغرى (من طريقي الشاطبية والدرة)',
        'إجازة في القراءات العشر الكبرى (من طريق طيبة النشر)',
        'سند متصل إلى رسول الله صلى الله عليه وسلم برواية حفص عن عاصم',
        'إجازة في شرح الجزرية وتحفة الأطفال',
      ],
      bio: 'الدكتور أنس الأزهري هو باحث ومقرئ متخصص في علم الأصوات والقراءات القرآنية. أمضى أكثر من 15 عاماً في دراسة ونقل علوم القرآن الكريم، وعمل كعضو هيئة تدريس في العديد من المعاهد الإسلامية العريقة بمصر. كرس السنوات الأخيرة لتعليم الطلاب في الدول الغربية، متميزاً بمنهجية تدريس تربوية تناسب العقليات الحديثة بمستوياتهم المختلفة.',
    },
    en: {
      name: 'Dr. Anas Al-Azhari',
      title: 'PhD in Quranic Recitations & Tajweed',
      education: 'Al-Azhar University, Cairo',
      specialty: 'Tajweed & 10 Quranic Recitations',
      languages: 'Arabic (Native), English (Fluent)',
      ijazas: [
        'Ijaza in the 10 Minor Qira\'at (via Shatibiyyah and Durrah)',
        'Ijaza in the 10 Major Qira\'at (via Tayyibat al-Nashr)',
        'Verified Isnad (chain of transmission) back to the Prophet (PBUH)',
        'Ijaza in teaching Al-Jazariyyah and Tuhfat al-Atfal',
      ],
      bio: 'Dr. Anas Al-Azhari is a dedicated Quranic phonology and recitation scholar. He spent over 15 years studying and transmitting the sciences of the Quran, serving as a lecturer in major Cairo institutions. Over the last decade, he has specialized in tutoring Western students, developing a clear pedagogical approach that bridges traditional transmission with modern instruction techniques.',
    },
    fr: {
      name: 'Dr. Anas Al-Azhari',
      title: 'Doctorat en Récitations du Coran & Tajwid',
      education: 'Université d\'Al-Azhar, Le Caire',
      specialty: 'Tajwid et Récitations Coraniques (10 Qira\'at)',
      languages: 'Arabe (Maternelle), Anglais (Courant)',
      ijazas: [
        'Ijaza dans les 10 lectures mineures (via Shatibiyyah et Durrah)',
        'Ijaza dans les 10 lectures majeures (via Tayyibat al-Nashr)',
        'Chaîne de transmission (Isnad) remontant au Prophète (PSL)',
        'Autorisation d\'enseigner les traités d\'Al-Jazariyyah et Tuhfat al-Atfal',
      ],
      bio: 'Le Dr Anas Al-Azhari est un chercheur spécialisé dans la phonologie et les récits coraniques. Il a consacré plus de 15 ans à l\'étude et à la transmission des sciences du Coran au Caire. Au cours des dix dernières années, il s\'est spécialisé dans l\'accompagnement des étudiants occidentaux, concevant une méthode pédagogique combinant transmission traditionnelle et outils d\'apprentissage modernes.',
    },
  },
  'youssef-al-faransi': {
    ar: {
      name: 'الشيخ يوسف الفرنسي',
      title: 'ماجستير في النحو واللغويات العربية',
      education: 'الجامعة الإسلامية بالمدينة المنورة',
      specialty: 'النحو والصرف والبلاغة القديمة',
      languages: 'العربية (اللغة الأم)، الفرنسية (طلاقة)',
      ijazas: [
        'إجازة في تدريس الآجرومية وقطر الندى وشرح ابن عقيل',
        'شهادة تخصص في البلاغة العربية من كلية اللغة بالمدينة',
        'إجازة في حفظ وقراءة ديوان المعلقات السبع',
      ],
      bio: 'الشيخ يوسف الفرنسي لغوي ومعلم متفانٍ ولد ونشأ في بيئة فرانكوفونية قبل دراسته المتعمقة بالمدينة المنورة. جعل مهمته تذليل الصعاب اللغوية أمام الطلاب الناطقين بالفرنسية للوصول المباشر إلى نصوص الوحي وفهم المراجع الإسلامية التراثية، معتمداً على أساليب النحو التوليدي التقليدي.',
    },
    en: {
      name: 'Sheikh Youssef Al-Faransi',
      title: 'MA in Classical Arabic Grammar',
      education: 'Islamic University of Madinah',
      specialty: 'Arabic Grammar (Nahw & Sarf)',
      languages: 'Arabic (Native), French (Fluent)',
      ijazas: [
        'Ijaza in teaching Al-Ajrumiyyah & Qatr al-Nada',
        'Certificate of Excellence in Arabic Rhetoric & Balaghah',
        'Ijaza in memorization & reciting the Mu\'allaqat (classical poems)',
      ],
      bio: 'Sheikh Youssef Al-Faransi is a linguist and instructor who grew up in a French-speaking environment before completing his academic studies in Madinah. He has dedicated his career to simplifying classical Arabic for French speakers, allowing them to access original Quranic and historical texts through structured analysis of grammar and morphology.',
    },
    fr: {
      name: 'Sheikh Youssef Al-Faransi',
      title: 'Master en Grammaire et Linguistique Arabes',
      education: 'Université Islamique de Médine',
      specialty: 'Grammaire, Morphologie et Éloquence (Nahw & Sarf)',
      languages: 'Arabe (Maternelle), Français (Courant)',
      ijazas: [
        'Ijaza dans l\'enseignement de l\'Ajroumiyyah et Qatr al-Nada',
        'Certificat d\'excellence en rhétorique arabe (Balaghah)',
        'Autorisation de transmettre et d\'expliquer les Mu\'allaqat (poèmes classiques)',
      ],
      bio: 'Le Cheikh Youssef Al-Faransi est un linguiste et enseignant ayant grandi dans un environnement francophone avant de poursuivre ses études supérieures à Médine. Il a consacré sa carrière à simplifier la grammaire arabe classique pour les francophones, leur permettant d\'accéder directement aux textes originaux du Coran et de la tradition prophétique.',
    },
  },
  'mariam-al-ahmad': {
    ar: {
      name: 'د. مريم الأحمد',
      title: 'دكتوراه في الفقه الإسلامي وأصوله',
      education: 'كلية الدراسات الإسلامية بجامعة الأزهر',
      specialty: 'الفقه المقارن، أصول الفقه، العقيدة، والقرآن',
      languages: 'العربية (اللغة الأم)، الإنجليزية (طلاقة)، الفرنسية (جيد جداً)',
      ijazas: [
        'إجازة في الفقه الشافعي والمقارن من معهد الدراسات الإسلامية',
        'إجازة في حفظ وقراءة القرآن الكريم برواية حفص وشعبة عن عاصم',
        'إجازة في قراءة الكتب الستة في الحديث الشريف',
      ],
      bio: 'الدكتورة مريم الأحمد هي عالمة متخصصة في الفقه وأصوله ولها أبحاث منشورة في فقه النوازل والقضايا المعاصرة للمسلمين في الغرب. تدرس الشريعة الإسلامية بأسلوب أكاديمي دقيق وتلقي دروسها بثلاث لغات. تركز جهودها لتقديم برامج مخصصة للأخوات والناشئة لبناء جيل يعتز بهويته الإسلامية وقائم على علم موثوق.',
    },
    en: {
      name: 'Dr. Mariam Al-Ahmad',
      title: 'PhD in Islamic Jurisprudence (Fiqh)',
      education: 'Faculty of Islamic Studies, Al-Azhar',
      specialty: 'Comparative Fiqh, Creed, & Quranic Sciences',
      languages: 'Arabic (Native), English (Fluent), French (Proficient)',
      ijazas: [
        'Ijaza in Shafi\'i & Comparative Jurisprudence',
        'Ijaza in Quranic recitation (Hafs & Shu\'bah variants)',
        'Ijaza in transmitting the Six canonical Hadith collections',
      ],
      bio: 'Dr. Mariam Al-Ahmad is a senior scholar in comparative jurisprudence and contemporary Islamic law, with multiple publications on minority jurisprudence. She teaches classical Shariah disciplines with academic precision, using English and French as mediums of instruction. She is particularly committed to mentoring women and families in building solid, text-grounded Islamic knowledge.',
    },
    fr: {
      name: 'Dr. Mariam Al-Ahmad',
      title: 'Doctorat en Jurisprudence Islamique (Fiqh)',
      education: 'Faculté des Études Islamiques, Al-Azhar',
      specialty: 'Fiqh Comparé, Théologie (Aqida) & Sciences du Coran',
      languages: 'Arabe (Maternelle), Anglais (Courant), Français (Très bon niveau)',
      ijazas: [
        'Ijaza en jurisprudence shafi\'ite et comparée',
        'Ijaza de récitation coranique (lectures Hafs et Shu\'bah)',
        'Ijaza de transmission des six recueils canoniques de Hadith',
      ],
      bio: 'La Dre Mariam Al-Ahmad est une spécialiste de la jurisprudence comparée et des enjeux juridiques contemporains. Elle enseigne les disciplines classiques de la Shariah avec rigueur académique, en s\'appuyant sur l\'anglais et le français. Elle s\'attache particulièrement à accompagner les femmes et les familles dans l\'acquisition d\'un savoir religieux structuré.',
    },
  },
};

export function generateStaticParams() {
  const slugs = ['anas-al-azhari', 'youssef-al-faransi', 'mariam-al-ahmad'];
  const locales = ['en', 'fr', 'ar'];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export default async function TeacherDetailPage({ params }: TeacherProfileProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const teacher = teachersData[slug]?.[locale];

  if (!teacher) {
    notFound();
  }

  const isRtl = locale === 'ar';

  return (
    <section className="bg-parchment-fade min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Star pattern background watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <div className="mb-8 text-start">
          <Link
            href={`/${locale}/teachers`}
            className={`inline-flex items-center gap-2 text-xs font-semibold text-gold hover:text-gold-champagne transition-colors duration-200 ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <span>{isRtl ? '← العودة لقائمة العلماء' : '← Back to Faculty'}</span>
          </Link>
        </div>

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start text-start">
          
          {/* Left Column (Details Card) */}
          <div className="bg-ivory border border-gold-muted/15 rounded-lg p-8 shadow-md">
            {/* Calligraphy Initial Icon */}
            <div className="w-24 h-24 mx-auto mb-6 relative flex items-center justify-center text-gold">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <polygon points="50,3 92,25 92,75 50,97 8,75 8,25" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <div className="w-16 h-16 bg-parchment rounded-full flex items-center justify-center border border-gold-muted/30 shadow-inner z-10">
                <span className="font-cormorant text-2xl font-bold text-midnight tracking-wider">
                  {slug.split('-').map(n => n[0].toUpperCase()).join('')}
                </span>
              </div>
            </div>

            <div className="text-center border-b border-gold-muted/10 pb-6 mb-6">
              <h1 className={`text-heading font-bold text-midnight mb-1.5 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
                {teacher.name}
              </h1>
              <span className={`text-xs text-gold font-medium leading-normal block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {teacher.title}
              </span>
            </div>

            {/* Meta attributes */}
            <div className={`space-y-4 text-xs ${isRtl ? 'font-noto' : 'font-lora'}`}>
              <div>
                <span className="text-stone/50 block mb-1">{isRtl ? 'المؤسسة التعليمية' : 'Education'}</span>
                <span className="text-midnight font-semibold block">{teacher.education}</span>
              </div>
              <div>
                <span className="text-stone/50 block mb-1">{isRtl ? 'التخصص الدقيق' : 'Specialization'}</span>
                <span className="text-midnight font-semibold block">{teacher.specialty}</span>
              </div>
              <div>
                <span className="text-stone/50 block mb-1">{isRtl ? 'لغات التدريس' : 'Languages'}</span>
                <span className="text-midnight font-semibold block">{teacher.languages}</span>
              </div>
            </div>

            {/* Book Button */}
            <div className="mt-8">
              <Link
                href={`/${locale}/book`}
                className="btn-gold text-center py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold block w-full"
              >
                {isRtl ? 'احجز جلسة خاصة مع المعلم' : 'Book a Session with Scholar'}
              </Link>
            </div>
          </div>

          {/* Right Column (Biography & Ijazat) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio Block */}
            <div className="bg-ivory border border-gold-muted/15 rounded-lg p-8 shadow-md">
              <div className="flex items-center gap-3 border-b border-gold-muted/10 pb-4 mb-6">
                <BookOpen size={18} className="text-gold" />
                <h2 className={`text-base font-bold text-midnight uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {isRtl ? 'السيرة الأكاديمية والمهنية' : 'Academic Biography'}
                </h2>
              </div>
              <p className={`text-sm text-stone leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {teacher.bio}
              </p>
            </div>

            {/* Ijazat & Chains of Transmission */}
            <div className="bg-ivory border border-gold-muted/15 rounded-lg p-8 shadow-md">
              <div className="flex items-center gap-3 border-b border-gold-muted/10 pb-4 mb-6">
                <Award size={18} className="text-gold" />
                <h2 className={`text-base font-bold text-midnight uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {isRtl ? 'الإجازات والأسانيد المعتمدة' : 'Certifications & Ijazat'}
                </h2>
              </div>
              
              <ul className="space-y-4">
                {teacher.ijazas.map((ijaza: string, i: number) => (
                  <li key={i} className="flex items-start gap-3.5 text-xs text-stone">
                    <Shield size={14} className="text-gold shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{ijaza}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
