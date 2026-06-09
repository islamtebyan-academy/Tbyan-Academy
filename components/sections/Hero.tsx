'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import ParallaxBackground from '../ui/ParallaxBackground';

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const isRtl = locale === 'ar';

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

  const taglineVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
      clipPath: 'inset(0% 0% 100% 0%)'
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const descVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      className="relative min-h-screen pt-32 pb-0 flex flex-col justify-between overflow-hidden"
    >
      {/* Parallax Background */}
      <ParallaxBackground src="/hero-pc-bg.webp" className="md:bg-[length:100%_100%]" />

      {/* Premium Gradient Overlay for Text Readability */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 ${isRtl
          ? 'bg-gradient-to-b from-midnight/70 via-midnight/45 to-midnight/20 lg:bg-gradient-to-l lg:from-midnight/70 lg:via-midnight/45 lg:to-midnight/20'
          : 'bg-gradient-to-b from-midnight/70 via-midnight/45 to-midnight/20 lg:bg-gradient-to-r lg:from-midnight/70 lg:via-midnight/45 lg:to-midnight/20'
          }`}
      />

      {/* Content Columns Wrapper */}
      <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

          {/* Left Column (Editorial Text Column) */}
          <motion.div
            className="lg:col-span-7 flex flex-col text-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.span
              variants={taglineVariants}
              whileHover={{ x: isRtl ? -4 : 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`inline-block text-xs uppercase tracking-[0.2em] text-gold-champagne font-bold mb-4 cursor-default ${isRtl ? 'font-cairo' : 'font-dm'
                }`}
            >
              {t('tagline')}
            </motion.span>

            {/* Main Title */}
            <motion.h1
              variants={titleVariants}
              className={`group text-hero text-parchment leading-[1.08] mb-6 cursor-default ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'
                }`}
            >
              {isRtl ? (
                <span>
                  {t('headlineTextBefore')}{' '}
                  <span className="text-shimmer font-bold">{t('headlineHighlight')}</span>{' '}
                  {t('headlineTextAfter')}
                </span>
              ) : (
                <span>
                  {t('headlineTextBefore')}{' '}
                  <span className="text-shimmer font-bold italic">{t('headlineHighlight')}</span>{' '}
                  {t('headlineTextAfter')}
                </span>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={descVariants}
              whileHover={{ opacity: 1, color: '#FDFAF3' }}
              transition={{ duration: 0.3 }}
              className={`text-sm md:text-base text-parchment/80 font-normal leading-relaxed mb-10 max-w-2xl cursor-default description-justify-start ${isRtl ? 'font-noto' : 'font-lora'
                }`}
            >
              {t('description')}
            </motion.p>

            {/* Actions buttons */}
            <motion.div
              variants={buttonVariants}
              className={`flex flex-col sm:flex-row gap-4 items-center sm:items-start w-full sm:w-auto ${isRtl ? 'font-cairo' : 'font-dm'
                }`}
            >
              <Link
                href={`/${locale}/book`}
                className="btn-gold py-4 rounded-full text-xs uppercase tracking-wider font-bold w-full sm:w-auto sm:min-w-[320px] px-6 sm:px-8 text-center inline-flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              >
                <Sparkles className="w-4 h-4 text-[#22314b] shrink-0" />
                <span className="whitespace-nowrap">{t('ctaPrimary')}</span>
              </Link>
              <Link
                href={`/${locale}/method`}
                className="py-4 rounded-full text-xs uppercase tracking-wider font-bold border border-gold-champagne/55 bg-white/[0.05] backdrop-blur-md text-parchment hover:border-gold-champagne hover:bg-gold-champagne/15 transition-all w-full sm:w-auto sm:min-w-[320px] px-6 sm:px-8 text-center inline-flex items-center justify-center gap-2.5 hover:scale-[1.03] active:scale-[0.97]"
              >
                <Compass className="w-4 h-4 text-gold-champagne shrink-0" />
                <span className="whitespace-nowrap">{t('ctaSecondary')}</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column (Spacer for background graphic alignment on desktop) */}
          <div className="lg:col-span-5 hidden lg:block" />

        </div>
      </div>

      {/* Stats strip below Hero */}
      <div className="relative z-10 w-full border-t border-gold-hi/25 bg-navy-sapphire/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '32+', label: t('statStudents') },
              { value: '40+', label: t('statTeachers') },
              { value: '25,000+', label: t('statHours') },
              { value: '4.9/5', label: t('statRating') },
            ].map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col text-start border-gold-hi/30 ps-4 md:ps-6 ${
                  i === 0
                    ? 'border-s-0'
                    : i % 2 === 0
                      ? 'border-s-0 md:border-s'
                      : 'border-s'
                }`}
              >
                <span className="text-xl md:text-2xl font-bold font-cormorant text-gold-champagne leading-none mb-1">
                  {stat.value}
                </span>
                <span className={`text-[9px] uppercase tracking-wider text-parchment/40 font-medium ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Animated bottom border in light colors */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gold-hi/45 via-white/80 via-parchment/65 via-gold-hi/45 to-transparent bg-[length:200%_100%] animate-gold-shimmer" />
        </div>
      </div>
    </section>
  );
}
