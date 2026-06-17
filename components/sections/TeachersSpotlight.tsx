'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { Award } from 'lucide-react';

export default function TeachersSpotlight() {
  const t = useTranslations('Teachers');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const headerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const headerChildVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 18,
      },
    },
  };

  const mockTeachers = [
    {
      name: locale === 'ar' ? 'الشيخ أحمد يحيى زكريا' : locale === 'fr' ? 'Cheikh Ahmed Yahya Zakaria' : 'Sheikh Ahmed Yahya Zakaria',
      title: locale === 'ar'
        ? 'معلم القرآن الكريم واللغة العربية لغير الناطقين بها'
        : locale === 'fr'
        ? 'Enseignant du Saint Coran et de l\'Arabe'
        : 'Quranic Recitation & Arabic Instructor',
      specialty: locale === 'ar' ? 'القرآن والتجويد واللغة العربية' : locale === 'fr' ? 'Coran, Tajwid & Arabe' : 'Quran, Tajweed & Arabic',
      education: locale === 'ar' ? 'جامعة الأزهر الشريف' : locale === 'fr' ? 'Université d\'Al-Azhar' : 'Al-Azhar University',
      languages: locale === 'ar' ? 'العربية، الإنجليزية، الفرنسية، التركية' : locale === 'fr' ? 'Arabe, Anglais, Français, Turc' : 'Arabic, English, French, Turkish',
      slug: 'ahmed-yahya-zakaria',
      ijazat: locale === 'ar'
        ? ['إجازة برواية حفص عن عاصم بالسند المتصل', 'إجازة قرآنية من فضيلة الشيخ نبيل علي والشيخ سيد بعبولة']
        : locale === 'fr'
        ? ['Ijaza de récital coranique (Hafs) avec Isnad connecté', 'Ijazat des Cheikhs Nabil Ali et Sayyid Babola']
        : ['Quranic recitation Ijaza (Hafs) with connected Isnad', 'Ijazat from Sheikh Nabil Ali & Sheikh Sayyid Babola'],
      image: '/images/teacher_ahmed_yahya.png',
    },
    {
      name: locale === 'ar' ? 'الشيخ محمد بدر عبد المرضي حسين' : 'Sheikh Mohamed Badr',
      title: locale === 'ar'
        ? 'واعظ بالأزهر الشريف ومدرس العلوم الشرعية'
        : locale === 'fr'
        ? 'Prédicateur d\'Al-Azhar & Enseignant de Shariah'
        : 'Al-Azhar Emissary & Shariah Instructor',
      specialty: locale === 'ar' ? 'التفسير، الفقه المالكي، والمنطق' : locale === 'fr' ? 'Tafsir, Fiqh Malékite & Logique' : 'Tafsir, Maliki Fiqh, & Logic',
      education: locale === 'ar' ? 'ماجستير جامعة الأزهر الشريف' : locale === 'fr' ? 'Master, Université d\'Al-Azhar' : 'MA, Al-Azhar University',
      languages: locale === 'ar' ? 'العربية، الإنجليزية' : locale === 'fr' ? 'Arabe, Anglais' : 'Arabic, English',
      slug: 'mohamed-badr',
      ijazat: locale === 'ar'
        ? ['إجازة بالقرآن الكريم بالقراءات المتواترة بسند متصل', 'إجازات في متون النحو والفقه والمنطق والعقيدة']
        : locale === 'fr'
        ? ['Isnad au Prophète ﷺ dans plusieurs lectures', 'Ijazas dans les traités de grammaire, Fiqh et logique']
        : ['Connected Isnad to the Prophet ﷺ in multiple Qira\'at', 'Ijazas in grammar, theology, Maliki Fiqh & logic'],
      image: '/images/teacher_mohamed_badr.png',
    },
    {
      name: locale === 'ar' ? 'د. حمادة عطية نادي' : 'Dr. Hamada Attia Nady',
      title: locale === 'ar'
        ? 'باحث دكتوراه في المناهج وطرق التدريس'
        : locale === 'fr'
        ? 'Doctorant en Didactique & Concepteur de Programmes'
        : 'PhD Researcher in Curriculum & Instruction',
      specialty: locale === 'ar' ? 'المناهج وطرق التدريس، والخط العربي' : locale === 'fr' ? 'Didactique & Calligraphie Arabe' : 'Curriculum & Instruction, Calligraphy',
      education: locale === 'ar' ? 'جامعة الأزهر الشريف' : locale === 'fr' ? 'Université d\'Al-Azhar' : 'Al-Azhar University',
      languages: locale === 'ar' ? 'العربية، الإنجليزية' : locale === 'fr' ? 'Arabe, Anglais' : 'Arabic, English',
      slug: 'hamada-attia-nady',
      ijazat: locale === 'ar'
        ? ['تحقيق التراث من معهد المخطوطات والجامع الأزهر', 'شهادة إعداد معلمي العربية لغير الناطقين بها']
        : locale === 'fr'
        ? ['Édition de manuscrits de l\'Institut des Manuscrits', 'Enseignement de l\'arabe aux non-arabophones']
        : ['Manuscript editing certificate from Manuscript Institute', 'Teaching Arabic to non-natives professional license'],
      image: '/images/teacher_hamada_attia.png',
    },
  ];

  return (
    <section className="bg-navy-sapphire py-24 border-b border-gold-muted/10 relative z-10 overflow-hidden">
      {/* Repeating 8-star pattern background for premium texture */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />
      
      {/* Premium ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-hi/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-muted/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.span
            variants={headerChildVariants}
            whileHover={{ x: isRtl ? -4 : 4, color: '#D4A843' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`inline-block text-xs uppercase tracking-widest text-gold-hi font-bold mb-3 cursor-default ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
          >
            {t('spotlight')}
          </motion.span>
          <motion.h2
            variants={headerChildVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`text-title text-parchment font-bold mb-4 cursor-default ${
              isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
            }`}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={headerChildVariants}
            whileHover={{ color: '#ffffff' }}
            transition={{ duration: 0.3 }}
            className={`text-sm text-parchment/80 font-normal max-w-xl mx-auto mb-16 leading-relaxed cursor-default description-justify ${
              isRtl ? 'font-noto' : 'font-lora'
            }`}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          {mockTeachers.map((teacher, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-ivory via-ivory/95 to-ivory/85 backdrop-blur-lg border border-gold-muted/20 rounded-[2rem] hover:border-gold/60 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(139,115,85,0.18)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden group shadow-[0_15px_35px_rgba(0,0,0,0.12)] cursor-default animate-fade-in"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Photo Frame with overlay and text */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Deep gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent pointer-events-none z-10" />
                
                {/* Name & Credentials placed over the image */}
                <div className="absolute bottom-6 left-6 right-6 z-20 text-start">
                  <h3
                    className={`text-[1.35rem] font-bold text-parchment mb-1 group-hover:text-gold-hi transition-colors duration-300 ${
                      isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                    }`}
                  >
                    {teacher.name}
                  </h3>
                  <span className={`text-[10px] text-gold-hi uppercase tracking-widest font-semibold block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {teacher.title}
                  </span>
                </div>
                
                {/* Decorative top-accent gold line */}
                <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/30 via-gold-hi to-gold-muted/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-20" />
              </div>

              {/* Logo watermark background overlay */}
              <div className="absolute right-6 bottom-6 w-24 h-24 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-105 transition-all duration-700 pointer-events-none z-0" />
              
              {/* Padded Content below image */}
              <div className="relative z-10 flex flex-col justify-between flex-grow p-6 md:p-7">
                <div>
                  {/* Details List */}
                  <div className={`mb-5 text-xs space-y-1.5 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    <div className="flex justify-between items-center py-2 border-b border-gold-muted/10 last:border-b-0 group-hover:-translate-y-0.5 transition-all duration-300 ease-out">
                      <span className="text-[#3A332A]/70 font-medium flex items-center gap-1.5 group-hover:text-[#3A332A]/90 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold-hi group-hover:scale-125 transition-all duration-300" />
                        {t('specialty')}
                      </span>
                      <span className="text-midnight font-bold text-end group-hover:text-gold transition-colors duration-300">{teacher.specialty}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gold-muted/10 last:border-b-0 group-hover:-translate-y-0.5 transition-all duration-300 ease-out">
                      <span className="text-[#3A332A]/70 font-medium flex items-center gap-1.5 group-hover:text-[#3A332A]/90 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold-hi group-hover:scale-125 transition-all duration-300" />
                        {t('degrees')}
                      </span>
                      <span className="text-midnight font-bold text-end max-w-[160px] group-hover:text-gold transition-colors duration-300">{teacher.education}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gold-muted/10 last:border-b-0 group-hover:-translate-y-0.5 transition-all duration-300 ease-out">
                      <span className="text-[#3A332A]/70 font-medium flex items-center gap-1.5 group-hover:text-[#3A332A]/90 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold-hi group-hover:scale-125 transition-all duration-300" />
                        {t('languages')}
                      </span>
                      <span className="text-midnight font-bold text-end group-hover:text-gold transition-colors duration-300">{teacher.languages}</span>
                    </div>
                  </div>

                  {/* Ijazat Credentials */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-gold-hi/[0.015] border border-gold-muted/12 relative overflow-hidden group-hover:bg-gold-hi/[0.03] group-hover:border-gold/25 transition-all duration-500 mb-6 group-hover:-translate-y-0.5">
                    <h4 className={`text-[9px] uppercase tracking-widest text-gold font-bold mb-2.5 flex items-center gap-1.5 transition-all duration-300 group-hover:text-gold-hi ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      <Award className="w-3.5 h-3.5 text-gold-hi transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                      {t('ijaza')}
                    </h4>
                    <ul className={`space-y-1.5 text-xs text-[#3A332A]/85 font-normal leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                      {teacher.ijazat.map((ijaza, idx) => (
                        <li key={idx} className="flex items-start gap-2 group-hover:-translate-y-0.5 transition-all duration-300">
                          <span className="text-gold text-[9px] mt-0.5 select-none transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">✦</span>
                          <span className="group-hover:text-midnight transition-colors duration-300">{ijaza}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Profile Link */}
                <Link
                  href={`/${locale}/teachers/${teacher.slug}`}
                  className="btn-gold text-center py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold block w-full relative z-10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  {isRtl ? 'عرض الملف الأكاديمي' : 'View Faculty Profile'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16">
          <Link
            href={`/${locale}/teachers`}
            className={`inline-block border border-gold/30 text-gold-hi hover:border-gold hover:bg-navy-sapphire/35 transition-all duration-300 py-3.5 px-8 rounded-full text-xs uppercase tracking-wider font-semibold ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
