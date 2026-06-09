'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { Award, User } from 'lucide-react';

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
      name: isRtl ? 'د. أنس الأزهري' : 'Dr. Anas Al-Azhari',
      title: isRtl ? 'دكتوراه في القراءات والتجويد' : 'PhD in Quranic Recitations',
      specialty: isRtl ? 'التجويد والقراءات العشر' : 'Tajweed & Qira\'at',
      education: isRtl ? 'جامعة الأزهر الشريف' : 'Al-Azhar University',
      languages: isRtl ? 'العربية، الإنجليزية' : 'Arabic, English',
      slug: 'anas-al-azhari',
      ijazat: isRtl 
        ? ['إجازة بالقراءات العشر المتواترة بموجب الإسناد المتصل', 'إجازة في متن الجزرية وتحفة الأطفال']
        : ['10 Canonical Qira\'at with connected chains (Isnad)', 'Ijaza in Al-Jazariyyah & Tuhfah texts'],
      icon: <User className="w-9 h-9 text-gold-hi transition-transform duration-500 group-hover:scale-110" />,
    },
    {
      name: isRtl ? 'الشيخ يوسف الفرنسي' : 'Sheikh Youssef Al-Faransi',
      title: isRtl ? 'ماجستير في اللغة العربية وآدابها' : 'MA in Classical Arabic Grammar',
      specialty: isRtl ? 'النحو، الصرف، والبلاغة' : 'Arabic Grammar (Nahw & Sarf)',
      education: isRtl ? 'الجامعة الإسلامية بالمدينة المنورة' : 'Islamic University of Madinah',
      languages: isRtl ? 'العربية، الفرنسية' : 'Arabic, French',
      slug: 'youssef-al-faransi',
      ijazat: isRtl
        ? ['إجازة في شرح الآجرومية وقطر الندى', 'سند متصل في تدريس اللغة العربية للناطقين بغيرها']
        : ['Ijaza in teaching Al-Ajrumiyyah & Qatr al-Nada', 'Certified chain for Arabic instruction to non-natives'],
      icon: <User className="w-9 h-9 text-gold-hi transition-transform duration-500 group-hover:scale-110" />,
    },
    {
      name: isRtl ? 'د. مريم الأحمد' : 'Dr. Mariam Al-Ahmad',
      title: isRtl ? 'دكتوراه في الفقه وأصوله' : 'PhD in Islamic Jurisprudence',
      specialty: isRtl ? 'الفقه الإسلامي، العقيدة، والقرآن' : 'Fiqh, Aqeedah, & Quran',
      education: isRtl ? 'جامعة الأزهر الشريف' : 'Al-Azhar University',
      languages: isRtl ? 'العربية، الإنجليزية، الفرنسية' : 'Arabic, English, French',
      slug: 'mariam-al-ahmad',
      ijazat: isRtl
        ? ['إجازة في الفقه الحنفي والشافعي المقارن', 'سند متصل في الأربعين النووية والموطأ']
        : ['Ijaza in comparative Hanafi & Shafi\'i Fiqh', 'Sanad in Al-Arba\'in al-Nawawiyyah & Al-Muwatta'],
      icon: <User className="w-9 h-9 text-gold-hi transition-transform duration-500 group-hover:scale-110" />,
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
              className="bg-gradient-to-br from-ivory via-ivory/95 to-ivory/85 backdrop-blur-lg border border-gold-muted/20 rounded-3xl p-8 hover:border-gold/60 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(139,115,85,0.18)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden group shadow-[0_15px_35px_rgba(0,0,0,0.12)] cursor-default animate-fade-in"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Decorative top-accent gold line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted/30 via-gold-hi to-gold-muted/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Logo watermark background overlay */}
              <div className="absolute right-6 bottom-6 w-24 h-24 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-105 transition-all duration-700 pointer-events-none z-0" />
              
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  {/* Photo Frame (Gold Geometric frame enclosing stylized icon avatar) */}
                  <div className="w-28 h-28 mx-auto mb-8 relative flex items-center justify-center">
                    {/* SVG Outer border frame (Static octagon shape that shifts color to gold-hi on hover) */}
                    <svg className="absolute inset-0 w-full h-full text-gold group-hover:text-gold-hi transition-colors duration-500" viewBox="0 0 100 100">
                      <polygon points="50,3 92,25 92,75 50,97 8,75 8,25" fill="none" stroke="currentColor" strokeWidth="1" />
                      <polygon points="50,7 88,28 88,72 50,93 12,72 12,28" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    </svg>
                    {/* Stylized Medallion Avatar container (Scales up slightly on hover and gets a rich gold shadow glow) */}
                    <div className="w-[78px] h-[78px] bg-gradient-to-br from-navy-sapphire to-navy-deep rounded-full flex items-center justify-center border-2 border-gold shadow-[0_8px_20px_rgba(184,132,26,0.25)] z-10 group-hover:scale-105 group-hover:border-gold-hi group-hover:shadow-[0_12px_30px_rgba(212,168,67,0.45)] transition-all duration-500">
                      {teacher.icon}
                    </div>
                  </div>

                  {/* Name & Credentials */}
                  <div className="text-center mb-6 border-b border-gold-muted/10 pb-5">
                    <h3
                      className={`text-heading font-bold text-midnight mb-1 group-hover:text-gold group-hover:-translate-y-1 transition-all duration-300 ease-out ${
                        isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                      }`}
                    >
                      {teacher.name}
                    </h3>
                    <span className={`text-xs text-gold font-medium group-hover:text-gold-hi group-hover:-translate-y-0.5 transition-all duration-300 ease-out inline-block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                       {teacher.title}
                    </span>
                  </div>

                  {/* Details List */}
                  <div className={`mb-6 text-xs ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    <div className="flex justify-between items-center py-2.5 border-b border-gold-muted/10 last:border-b-0 group-hover:-translate-y-0.5 transition-all duration-300 ease-out">
                      <span className="text-[#3A332A]/70 font-medium flex items-center gap-1.5 group-hover:text-[#3A332A]/90 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold-hi group-hover:scale-125 transition-all duration-300" />
                        {t('specialty')}
                      </span>
                      <span className="text-midnight font-bold text-end group-hover:text-gold transition-colors duration-300">{teacher.specialty}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-gold-muted/10 last:border-b-0 group-hover:-translate-y-0.5 transition-all duration-300 ease-out">
                      <span className="text-[#3A332A]/70 font-medium flex items-center gap-1.5 group-hover:text-[#3A332A]/90 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold-hi group-hover:scale-125 transition-all duration-300" />
                        {t('degrees')}
                      </span>
                      <span className="text-midnight font-bold text-end max-w-[160px] group-hover:text-gold transition-colors duration-300">{teacher.education}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-gold-muted/10 last:border-b-0 group-hover:-translate-y-0.5 transition-all duration-300 ease-out">
                      <span className="text-[#3A332A]/70 font-medium flex items-center gap-1.5 group-hover:text-[#3A332A]/90 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold-hi group-hover:scale-125 transition-all duration-300" />
                        {t('languages')}
                      </span>
                      <span className="text-midnight font-bold text-end group-hover:text-gold transition-colors duration-300">{teacher.languages}</span>
                    </div>
                  </div>

                  {/* Ijazat Credentials */}
                  <div className="mt-6 p-4 rounded-xl bg-gold-hi/[0.02] border border-gold-muted/15 relative overflow-hidden group-hover:bg-gold-hi/[0.04] group-hover:border-gold/30 transition-all duration-500 mb-8 group-hover:-translate-y-0.5">
                    <h4 className={`text-[10px] uppercase tracking-widest text-gold font-bold mb-3 flex items-center gap-1.5 transition-all duration-300 group-hover:text-gold-hi ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      <Award className="w-3.5 h-3.5 text-gold-hi transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                      {t('ijaza')}
                    </h4>
                    <ul className={`space-y-2 text-sm text-[#3A332A]/85 font-normal leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                      {teacher.ijazat.map((ijaza, idx) => (
                        <li key={idx} className="flex items-start gap-2 group-hover:-translate-y-0.5 transition-all duration-300">
                          <span className="text-gold text-[10px] mt-1 select-none transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">✦</span>
                          <span className="group-hover:text-midnight transition-colors duration-300">{ijaza}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Profile Link */}
                <Link
                  href={`/${locale}/teachers/${teacher.slug}`}
                  className={`btn-gold text-center py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold block w-full relative z-10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg`}
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
