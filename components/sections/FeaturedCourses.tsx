'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Award, Scale, Languages, Shield, Compass, Feather, ArrowRight, ArrowLeft } from 'lucide-react';

export default function FeaturedCourses() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const content = {
    ar: {
      tag: 'المقررات الدراسية المميزة',
      title: 'منهاج تفصيلي يؤصل للعلوم الشرعية واللغوية',
      desc: 'باقة مختارة من المتون والعلوم التأسيسية المصممة لبناء ملكة علمية رصينة وفهم عميق للتراث الإسلامي واللسان العربي.',
      
      statDuration: 'المدة',
      statText: 'المقرر',
      statLevel: 'المستوى',

      quranTitle: 'القرآن الكريم والتجويد',
      quranTag: 'الأساس والمبتدأ',
      quranDesc: 'تصحيح التلاوة وحفظ كتاب الله بروايتي حفص وشعبة بسند متصل مع دراسة أحكام التجويد نظرياً وعملياً لتلاوة مجودة صحيحة.',
      quranPath: 'مسار القرآن الكريم',
      quranDuration: '40 ساعة',
      quranText: 'روايتان',
      quranLevel: 'تأسيسي',
      
      fiqhTitle: 'الفقه الإسلامي',
      fiqhTag: 'فقه العبادات والمعاملات',
      fiqhDesc: 'تفقه في الدين على مذهب من المذاهب المعتبرة شرعاً بالتدريج العلمي لتأصيل المسائل الفقهية وتطبيقها.',
      fiqhPath: 'مسار العلوم الشرعية',
      fiqhDuration: '48 ساعة',
      fiqhText: 'المتون المعتمدة',
      fiqhLevel: 'تأصيلي',
      
      arabicTitle: 'النحو والصرف',
      arabicTag: 'مفتاح فهم الوحيين',
      arabicDesc: 'صون اللسان وفهم تركيب الكلام العربي بدراسة الآجرومية وقطر الندى في النحو، ومتن البناء وتصريف الأفعال في علم الصرف.',
      arabicPath: 'مسار اللغة العربية',
      arabicDuration: '50 ساعة',
      arabicText: 'الآجرومية',
      arabicLevel: 'تمكيني',
      
      aqidahTitle: 'العقيدة الإسلامية',
      aqidahTag: 'أصول الدين ورسوخ اليقين',
      aqidahDesc: 'تأصيل عقيدة أهل السنة والجماعة عبر المتون المعتمدة لبناء حصانة فكرية والرد على الشبهات المعاصرة.',
      aqidahPath: 'مسار العلوم الشرعية',
      aqidahDuration: '36 ساعة',
      aqidahText: 'الجوهرة',
      aqidahLevel: 'تأصيلي',
      
      logicTitle: 'علم المنطق',
      logicTag: 'آلة العلوم وصون الفكر',
      logicDesc: 'دراسة السلم المنورق لتأسيس التفكير السليم، وضبط الاستدلال العقلي والبرهنة، وفهم المصطلحات الأصولية والشروح العلمية.',
      logicPath: 'مسار العلوم الشرعية',
      logicDuration: '30 ساعة',
      logicText: 'السلم',
      logicLevel: 'متقدم',
      
      litTitle: 'الأدب والبلاغة',
      litTag: 'جماليات اللسان العربي',
      litDesc: 'تذوق بلاغة القرآن المعجزة ودراسة المعلقات وروائع الشعر الجاهلي والإسلامي لبناء الملكة الأدبية والأسلوب البياني الراقي.',
      litPath: 'مسار اللغة العربية',
      litDuration: '45 ساعة',
      litText: 'المعلقات',
      litLevel: 'تذوقي',
      
      btnBook: 'عرض تفاصيل المقرر',
      btnAll: 'عرض جميع البرامج الدراسية'
    },
    en: {
      tag: 'FEATURED COURSES',
      title: 'Scholarly Curriculums Tailored for Deep Comprehension',
      desc: 'A handpicked selection of primary texts and foundational sciences designed to build strong intellectual roots and command over Islamic heritage.',
      
      statDuration: 'Duration',
      statText: 'Syllabus',
      statLevel: 'Level',

      quranTitle: 'Quran & Tajweed',
      quranTag: 'The Ultimate Foundation',
      quranDesc: 'Master Quran recitation and memorization under connected chains (Isnad) using theoretical rules and practical application of Tajweed.',
      quranPath: 'Quranic Path',
      quranDuration: '40 Hrs',
      quranText: '2 Recitations',
      quranLevel: 'Core',
      
      fiqhTitle: 'Islamic Jurisprudence (Fiqh)',
      fiqhTag: 'Worship & Transactions',
      fiqhDesc: 'Acquire Islamic jurisprudence systematically according to one of the recognized schools of thought through primary manuals.',
      fiqhPath: 'Islamic Studies Path',
      fiqhDuration: '48 Hrs',
      fiqhText: 'Accredited Manuals',
      fiqhLevel: 'Academic',
      
      arabicTitle: 'Grammar & Morphology',
      arabicTag: 'Key to the Sacred Texts',
      arabicDesc: 'Protect your tongue from errors and decode Arabic script by studying Al-Ajurrumiyyah and Qatr al-Nada (Syntax) and Matn al-Bina (Morphology).',
      arabicPath: 'Classical Arabic Path',
      arabicDuration: '50 Hrs',
      arabicText: 'Ajurrumiyyah',
      arabicLevel: 'Essential',
      
      aqidahTitle: 'Islamic Creed (Aqidah)',
      aqidahTag: 'Theology & Core Convictions',
      aqidahDesc: 'Study authentic Sunni creed via classical texts to build sound conviction and address modern philosophy.',
      aqidahPath: 'Islamic Studies Path',
      aqidahDuration: '36 Hrs',
      aqidahText: 'Jawharah',
      aqidahLevel: 'Theological',
      
      logicTitle: 'Islamic Logic (Mantiq)',
      logicTag: 'Tool of the Intellectual Sciences',
      logicDesc: 'Study Al-Sullam al-Munawraq to cultivate critical reasoning, sound arguments, and understand structural definitions in scholarly literature.',
      logicPath: 'Islamic Studies Path',
      logicDuration: '30 Hrs',
      logicText: 'Munawraq',
      logicLevel: 'Advanced',
      
      litTitle: 'Literature & Rhetoric',
      litTag: 'Esthetics of Classical Arabic',
      litDesc: 'Appreciate the miraculous eloquence (Balaghah) of the Quran, pre-Islamic poetry, and classical prose to refine your literary taste and writing.',
      litPath: 'Classical Arabic Path',
      litDuration: '45 Hrs',
      litText: 'Mu’allaqat',
      litLevel: 'Literary',
      
      btnBook: 'View Course Details',
      btnAll: 'View All Academic Paths'
    },
    fr: {
      tag: 'COURS D\'ÉLITE',
      title: 'Des Programmes Académiques Structurés pour Réussir',
      desc: 'Une sélection rigoureuse de textes classiques et de sciences fondamentales conçus pour asseoir vos bases théoriques et linguistiques.',
      
      statDuration: 'Durée',
      statText: 'Manuel',
      statLevel: 'Niveau',

      quranTitle: 'Coran & Tajwid',
      quranTag: 'La Fondation Ultime',
      quranDesc: 'Apprenez la récitation et la mémorisation du Coran sous Isnad avec une mise en pratique rigoureuse des règles du Tajwid.',
      quranPath: 'Parcours Coran',
      quranDuration: '40 h',
      quranText: '2 Récitations',
      quranLevel: 'Base',
      
      fiqhTitle: 'Jurisprudence Islamique (Fiqh)',
      fiqhTag: 'Pratique & Transactions',
      fiqhDesc: 'Étudiez la jurisprudence islamique selon l\'une des écoles reconnues à travers les manuels classiques de référence.',
      fiqhPath: 'Sciences Islamiques',
      fiqhDuration: '48 h',
      fiqhText: 'Manuels Agréés',
      fiqhLevel: 'Académique',
      
      arabicTitle: 'Grammaire & Morphologie',
      arabicTag: 'Clé des Textes Sacrés',
      arabicDesc: 'Maîtrisez la syntaxe (Ajurrumiyyah, Qatr al-Nada) et la conjugaison (Matn al-Bina) pour comprendre la structure de la langue arabe.',
      arabicPath: 'Langue Arabe',
      arabicDuration: '50 h',
      arabicText: 'Ajurrumiyyah',
      arabicLevel: 'Clé',
      
      aqidahTitle: 'Dogme Islamique (Aqida)',
      aqidahTag: 'Théologie & Conviction Pure',
      aqidahDesc: 'Assimilez la croyance sunnite authentique à travers les textes classiques pour solidifier votre foi.',
      aqidahPath: 'Sciences Islamiques',
      aqidahDuration: '36 h',
      aqidahText: 'Jawharah',
      aqidahLevel: 'Dogmatique',
      
      logicTitle: 'Logique Islamique (Mantiq)',
      logicTag: 'Outil des Sciences Scolastiques',
      logicDesc: 'Étudiez le Sullam al-Munawraq pour développer votre raisonnement déductif, construire des arguments valides et comprendre la terminologie.',
      logicPath: 'Sciences Islamiques',
      logicDuration: '30 h',
      logicText: 'Munawraq',
      logicLevel: 'Avancé',
      
      litTitle: 'Littérature & Rhétorique',
      litTag: 'Esthétique de la Langue Arabe',
      litDesc: 'Goûtez à l\'éloquence (Balagha) du Coran et étudiez les grands poèmes préislamiques pour cultiver votre style et vocabulaire.',
      litPath: 'Langue Arabe',
      litDuration: '45 h',
      litText: 'Mu’allaqat',
      litLevel: 'Littéraire',
      
      btnBook: 'Voir les détails',
      btnAll: 'Voir tous les parcours'
    }
  };

  const activeContent = content[locale as keyof typeof content] || content.en;

  const courses = [
    {
      image: '/images/course_quran.png',
      icon: <Award className="w-5 h-5 text-gold-hi" />,
      title: activeContent.quranTitle,
      tagline: activeContent.quranTag,
      desc: activeContent.quranDesc,
      path: activeContent.quranPath,
      slug: 'quran-tajweed',
      stats: [
        { label: activeContent.statDuration, value: activeContent.quranDuration },
        { label: activeContent.statText, value: activeContent.quranText },
        { label: activeContent.statLevel, value: activeContent.quranLevel }
      ]
    },
    {
      image: '/images/course_fiqh.png',
      icon: <Scale className="w-5 h-5 text-gold-hi" />,
      title: activeContent.fiqhTitle,
      tagline: activeContent.fiqhTag,
      desc: activeContent.fiqhDesc,
      path: activeContent.fiqhPath,
      slug: 'islamic-fiqh',
      stats: [
        { label: activeContent.statDuration, value: activeContent.fiqhDuration },
        { label: activeContent.statText, value: activeContent.fiqhText },
        { label: activeContent.statLevel, value: activeContent.fiqhLevel }
      ]
    },
    {
      image: '/images/course_arabic.png',
      icon: <Languages className="w-5 h-5 text-gold-hi" />,
      title: activeContent.arabicTitle,
      tagline: activeContent.arabicTag,
      desc: activeContent.arabicDesc,
      path: activeContent.arabicPath,
      slug: 'arabic-grammar',
      stats: [
        { label: activeContent.statDuration, value: activeContent.arabicDuration },
        { label: activeContent.statText, value: activeContent.arabicText },
        { label: activeContent.statLevel, value: activeContent.arabicLevel }
      ]
    },
    {
      image: '/images/course_aqidah.png',
      icon: <Shield className="w-5 h-5 text-gold-hi" />,
      title: activeContent.aqidahTitle,
      tagline: activeContent.aqidahTag,
      desc: activeContent.aqidahDesc,
      path: activeContent.aqidahPath,
      slug: 'islamic-creed',
      stats: [
        { label: activeContent.statDuration, value: activeContent.aqidahDuration },
        { label: activeContent.statText, value: activeContent.aqidahText },
        { label: activeContent.statLevel, value: activeContent.aqidahLevel }
      ]
    },
    {
      image: '/images/course_logic.png',
      icon: <Compass className="w-5 h-5 text-gold-hi" />,
      title: activeContent.logicTitle,
      tagline: activeContent.logicTag,
      desc: activeContent.logicDesc,
      path: activeContent.logicPath,
      slug: 'islamic-logic',
      stats: [
        { label: activeContent.statDuration, value: activeContent.logicDuration },
        { label: activeContent.statText, value: activeContent.logicText },
        { label: activeContent.statLevel, value: activeContent.logicLevel }
      ]
    },
    {
      image: '/images/course_literature.png',
      icon: <Feather className="w-5 h-5 text-gold-hi" />,
      title: activeContent.litTitle,
      tagline: activeContent.litTag,
      desc: activeContent.litDesc,
      path: activeContent.litPath,
      slug: 'arabic-literature',
      stats: [
        { label: activeContent.statDuration, value: activeContent.litDuration },
        { label: activeContent.statText, value: activeContent.litText },
        { label: activeContent.statLevel, value: activeContent.litLevel }
      ]
    },
  ];

  // Framer Motion Animation Variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 85,
        damping: 18,
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-white via-[#fcfbf7] to-white py-24 relative z-10 border-b border-gold-muted/15">
      {/* Repeating background pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:80px_80px] opacity-[0.035] pointer-events-none" />

      {/* Decorative top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-hi/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3 ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
          >
            {activeContent.tag}
          </span>
          <h2
            className={`text-title text-midnight font-bold max-w-3xl mx-auto mb-4 ${
              isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
            }`}
          >
            {activeContent.title}
          </h2>
          <p
            className={`text-sm text-[#3A332A] max-w-xl mx-auto leading-relaxed font-normal description-justify ${
              isRtl ? 'font-noto' : 'font-lora'
            }`}
          >
            {activeContent.desc}
          </p>
        </div>

        {/* Courses Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-3xl p-0 shadow-[0_8px_30px_rgba(139,115,85,0.1)] hover:border-gold hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(139,115,85,0.18)] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
              variants={cardVariants}
            >
              {/* Top Accent Gold Bar */}
              <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              {/* Watermark in background */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[url('/images/pattern-8star.svg')] bg-contain bg-no-repeat opacity-[0.015] group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none filter sepia hue-rotate-15 brightness-95" />

              <div>
                {/* Course Header Image Frame */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-[1.4rem]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/20 to-transparent pointer-events-none" />
                  
                  {/* Badge Overlay */}
                  <span className={`absolute top-4 left-4 rtl:left-auto rtl:right-4 text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-gold-muted/30 bg-midnight/80 backdrop-blur-sm text-gold-hi font-dm z-10`}>
                    {course.path}
                  </span>
                </div>

                {/* Card Content wrapper */}
                <div className="p-6 md:p-8">
                  {/* Icon & Title row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className={`text-[1.3rem] text-midnight font-bold leading-snug group-hover:text-gold-hi transition-colors duration-300 ${
                      isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                    }`}>
                      {course.title}
                    </h3>
                    <div className="p-2 bg-gold-muted/10 rounded-xl border border-gold/15 text-gold-hi transition-colors duration-300">
                      {course.icon}
                    </div>
                  </div>

                  {/* Tagline */}
                  <span className={`block text-xs text-gold/80 font-semibold mb-4 uppercase tracking-wider ${
                    isRtl ? 'font-cairo' : 'font-dm'
                  }`}>
                    {course.tagline}
                  </span>

                  {/* Description */}
                  <p className={`text-sm text-[#3A332A]/85 leading-relaxed mb-6 font-normal description-justify-start ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}>
                    {course.desc}
                  </p>

                  {/* Syllabus Stats Metadata Section */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gold-muted/15 text-center bg-[#FDFAF3]/30 rounded-xl">
                    {course.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <span className="block text-[9px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                          {stat.label}
                        </span>
                        <span className={`block text-xs text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Bottom Action Center inside Card */}
              <div className="px-6 md:px-8 pb-8 flex items-center justify-between">
                <Link
                  href={`/${locale}/programs/${course.slug}`}
                  className={`text-[11px] uppercase tracking-widest font-bold text-stone hover:text-gold transition-colors duration-300 inline-flex items-center gap-1.5 ${
                    isRtl ? 'font-cairo' : 'font-dm'
                  }`}
                >
                  <span>{activeContent.btnBook}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </Link>

                {/* Small branding logo opposite the button */}
                <div className="w-12 h-12 flex items-center justify-center select-none pointer-events-none">
                  <img
                    src="/logo-new.webp"
                    alt="Academy Seal"
                    className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Section Footer CTA */}
        <div className="mt-16 text-center">
          <Link
            href={`/${locale}/programs`}
            className="btn-gold px-8 py-4 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2.5 shadow-lg shadow-gold/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>{activeContent.btnAll}</span>
            <span className={`transition-transform duration-300 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
              {isRtl ? '←' : '→'}
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
