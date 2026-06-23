'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Award, BookOpen, Clock, Globe2, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Credibility({
  titleOverride,
  diff1TitleOverride,
  diff1DescOverride,
  diff2TitleOverride,
  diff2DescOverride,
  diff3TitleOverride,
  diff3DescOverride,
  diff4TitleOverride,
  diff4DescOverride,
  diff5TitleOverride,
  diff5DescOverride
}: {
  titleOverride?: string;
  diff1TitleOverride?: string;
  diff1DescOverride?: string;
  diff2TitleOverride?: string;
  diff2DescOverride?: string;
  diff3TitleOverride?: string;
  diff3DescOverride?: string;
  diff4TitleOverride?: string;
  diff4DescOverride?: string;
  diff5TitleOverride?: string;
  diff5DescOverride?: string;
}) {
  const t = useTranslations('Credibility');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const differentiators = [
    {
      icon: <Award className="text-gold w-5 h-5" />,
      title: diff1TitleOverride || t('diff1Title'),
      desc: diff1DescOverride || t('diff1Desc'),
    },
    {
      icon: <UserCheck className="text-gold w-5 h-5" />,
      title: diff2TitleOverride || t('diff2Title'),
      desc: diff2DescOverride || t('diff2Desc'),
    },
    {
      icon: <Globe2 className="text-gold w-5 h-5" />,
      title: diff3TitleOverride || t('diff3Title'),
      desc: diff3DescOverride || t('diff3Desc'),
    },
    {
      icon: <BookOpen className="text-gold w-5 h-5" />,
      title: diff4TitleOverride || t('diff4Title'),
      desc: diff4DescOverride || t('diff4Desc'),
    },
    {
      icon: <Clock className="text-gold w-5 h-5" />,
      title: diff5TitleOverride || t('diff5Title'),
      desc: diff5DescOverride || t('diff5Desc'),
    },
  ];

  return (
    <section className="bg-navy-sapphire py-20 relative z-10 border-b border-gold-muted/15">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h2
          className={`text-title text-parchment font-bold mb-16 tracking-wide max-w-2xl mx-auto ${
            isRtl ? 'font-amiri leading-[1.4]' : 'font-cormorant leading-tight'
          }`}
        >
          {titleOverride || t('title')}
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch max-w-5xl mx-auto">
          {differentiators.map((diff, index) => {
            let gridClasses = 'col-span-1';
            if (index < 3) {
              gridClasses += ' md:col-span-2';
            } else if (index === 3) {
              gridClasses += ' md:col-span-2 md:col-start-2';
            } else {
              gridClasses += ' md:col-span-2';
            }

            return (
              <motion.div
                key={index}
                className={`${gridClasses} group bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-gold-hi/30 rounded-2xl px-6 py-8 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_45px_rgba(0,0,0,0.45)] hover:shadow-gold-hi/5 hover:border-gold-hi/75 cursor-pointer h-full relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                {/* Decorative top-accent gold line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted/30 via-gold-hi to-gold-muted/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon wrapper */}
                <div className="w-12 h-12 bg-white/5 border border-gold-hi/20 rounded-full flex items-center justify-center mb-6 shadow-md text-gold-hi shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {diff.icon}
                </div>
                
                {/* Title */}
                <h3
                  className={`text-xs lg:text-[9px] xl:text-[11px] 2xl:text-xs font-extrabold text-gold-hi mb-4 tracking-wider whitespace-nowrap w-full text-center uppercase ${
                    isRtl ? 'font-cairo' : 'font-dm'
                  }`}
                >
                  {diff.title}
                </h3>
                
                {/* Description */}
                <p
                  className={`text-xs md:text-sm text-parchment/85 font-normal leading-relaxed w-full description-justify ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}
                >
                  {diff.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
