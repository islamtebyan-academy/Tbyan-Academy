'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Book, Award, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgramsShowcase() {
  const t = useTranslations('Programs');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const programs = [
    {
      icon: <Award className="w-5 h-5 text-white" />,
      title: t('quranTitle'),
      arabic: t('quranArabic'),
      desc: t('quranDesc'),
      books: t('quranBooks'),
      href: `/${locale}/programs?track=quran`,
    },
    {
      icon: <Book className="w-5 h-5 text-white" />,
      title: t('arabicTitle'),
      arabic: t('arabicArabic'),
      desc: t('arabicDesc'),
      books: t('arabicBooks'),
      href: `/${locale}/programs?track=arabic`,
    },
    {
      icon: <FileText className="w-5 h-5 text-white" />,
      title: t('islamicTitle'),
      arabic: t('islamicArabic'),
      desc: t('islamicDesc'),
      books: t('islamicBooks'),
      href: `/${locale}/programs?track=islamic`,
    },
  ];

  return (
    <section className="bg-parchment-fade py-24 relative z-10 border-b border-gold-muted/15">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Header */}
        <span
          className={`inline-block text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3 ${
            isRtl ? 'font-cairo' : 'font-dm'
          }`}
        >
          {t('title')}
        </span>
        <h2
          className={`text-title text-midnight font-bold mb-4 ${
            isRtl ? 'font-amiri' : 'font-cormorant'
          }`}
        >
          {isRtl ? 'مناهج العلوم الإسلامية واللغوية بـسند متصل' : 'Editorial Scholarly Curriculums'}
        </h2>
        <p
          className={`text-sm text-[#3A332A] max-w-xl mx-auto mb-16 leading-relaxed font-normal description-justify ${
            isRtl ? 'font-noto' : 'font-lora'
          }`}
        >
          {t('subtitle')}
        </p>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          {programs.map((prog, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white to-ivory/40 border border-gold-muted/15 rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 hover:border-gold hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(139,115,85,0.12)] group relative overflow-hidden pattern-overlay"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Decorative top-accent gold line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted/30 via-gold-hi to-gold-muted/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 bg-gradient-to-br from-gold-hi to-gold text-white rounded-xl flex items-center justify-center mb-8 shadow-md shadow-gold/15 group-hover:scale-110 group-hover:shadow-gold/25 transition-all duration-300">
                  {prog.icon}
                </div>
                
                {/* Titles */}
                <h3
                  className={`text-heading font-bold text-midnight mb-1 group-hover:text-gold transition-colors duration-300 ${
                    isRtl ? 'font-amiri' : 'font-cormorant'
                  }`}
                >
                  {prog.title}
                </h3>
                
                <span
                  className="block text-xs font-semibold text-gold-muted mb-6 font-amiri tracking-wide"
                  dir="rtl"
                >
                  {prog.arabic}
                </span>

                {/* Description */}
                <p
                  className={`text-sm text-[#3A332A]/85 leading-relaxed mb-6 font-normal description-justify-start ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}
                >
                  {prog.desc}
                </p>

                {/* Textbooks List (Premium addition) */}
                <div className="bg-parchment/35 border border-gold-muted/10 rounded-xl p-4 mt-4 mb-8">
                  <span className={`block text-[9px] uppercase tracking-wider text-gold-muted font-bold mb-1.5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {isRtl ? 'المقررات والمتون الدراسية' : 'Core Textbooks Studied'}
                  </span>
                  <p className={`text-xs text-[#3A332A]/80 leading-relaxed font-normal description-justify-start ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {prog.books}
                  </p>
                </div>
              </div>

              {/* Explore Link */}
              <Link
                href={prog.href}
                className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[1.5px] text-gold font-bold transition-all duration-300 hover:text-gold-hi ${
                  isRtl ? 'font-cairo' : 'font-dm'
                }`}
              >
                <span>{isRtl ? 'عرض تفاصيل المسار الدراسي' : 'View Curriculum Details'}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
