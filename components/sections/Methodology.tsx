'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';

export default function Methodology() {
  const t = useTranslations('Method');
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 20,
      },
    },
  };

  const numberVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 16,
      },
    },
  };

  const descVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 18,
      },
    },
  };

  const pillars = [
    {
      title: t('pillar1Title'),
      desc: t('pillar1Desc'),
      arabicSymbol: 'أثر',
      image: '/images/pillar-manuscript.png',
    },
    {
      title: t('pillar2Title'),
      desc: t('pillar2Desc'),
      arabicSymbol: 'فرد',
      image: '/images/pillar-study.png',
    },
    {
      title: t('pillar3Title'),
      desc: t('pillar3Desc'),
      arabicSymbol: 'فهم',
      image: '/images/pillar-astrolabe.png',
    },
  ];

  return (
    <section className="bg-navy-sapphire py-24 border-b border-gold-muted/15 relative z-10 overflow-hidden">
      {/* Repeating 8-star pattern background for premium texture */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />
      
      {/* Premium ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-hi/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-muted/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            whileHover={{ x: isRtl ? -4 : 4, color: '#B8841A' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`inline-block text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3 cursor-default ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
          >
            {t('title')}
          </motion.span>
          <motion.h2
            variants={headerChildVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`text-title text-parchment font-bold max-w-2xl mx-auto leading-tight cursor-default ${
              isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
            }`}
          >
            {t('subtitle')}
          </motion.h2>
        </motion.div>

        {/* Pillars List */}
        <div className="flex flex-col gap-12">
          {pillars.map((p, index) => {
            const isEven = index % 2 === 1;
            const directionClass = isEven ? 'lg:flex-row' : 'lg:flex-row-reverse';

            return (
              <motion.div
                key={index}
                className={`flex flex-col ${directionClass} items-center gap-8 lg:gap-12 bg-gradient-to-br from-ivory/95 to-ivory/85 backdrop-blur-lg border border-gold-muted/20 p-6 lg:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:border-gold/60 hover:shadow-[0_25px_60px_rgba(212,168,67,0.15)] transition-all duration-500 group relative overflow-hidden`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-150px' }}
              >
                {/* Image Container with Double Gold-Muted Frame */}
                <motion.div
                  variants={imageVariants}
                  className="w-full lg:w-1/2 border border-gold-muted/15 rounded-2xl overflow-hidden aspect-[4/3] relative shrink-0 shadow-md group-hover:border-gold/45 transition-colors duration-500"
                >
                  {/* The Image */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Dark gradient vignette for premium overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-sapphire/50 to-transparent pointer-events-none" />

                  {/* Floating Calligraphy Seal */}
                  <div className={`absolute bottom-4 ${isRtl ? 'left-4' : 'right-4'} z-20 bg-navy-sapphire/90 backdrop-blur-md border border-gold-hi/30 px-5 py-2 rounded-xl text-gold-hi font-amiri text-lg shadow-lg select-none`}>
                    {p.arabicSymbol}
                  </div>
                </motion.div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col text-start justify-center">
                  <motion.span
                    variants={numberVariants}
                    whileHover={{ x: isRtl ? -4 : 4, color: '#D4A843' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="text-xs font-bold text-gold tracking-widest uppercase border-b border-gold-muted/20 pb-2 mb-6 inline-block w-fit font-dm cursor-default"
                  >
                    0{index + 1} / 03
                  </motion.span>
                  <motion.h3
                    variants={titleVariants}
                    whileHover={{ x: isRtl ? -6 : 6, color: '#B8841A' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className={`text-heading md:text-2xl font-bold text-midnight mb-6 cursor-default flex items-center gap-3 ${
                      isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                    }`}
                  >
                    <span className="text-gold text-xs opacity-60 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
                      ◆
                    </span>
                    {p.title}
                  </motion.h3>
                  <motion.p
                    variants={descVariants}
                    whileHover={{ color: '#22314b' }}
                    transition={{ duration: 0.3 }}
                    className={`text-sm text-stone/90 leading-relaxed cursor-default group-hover:text-midnight/90 transition-colors duration-500 ${
                      isRtl ? 'font-noto' : 'font-lora'
                    }`}
                  >
                    {p.desc}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
