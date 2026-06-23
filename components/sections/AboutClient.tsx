'use client';

import React from 'react';
import Link from 'next/link';
import ParallaxBackground from '@/components/ui/ParallaxBackground';
import { 
  BookOpen, 
  ShieldCheck, 
  Award, 
  Languages, 
  CheckCircle2, 
  Quote, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  UserCheck
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface AboutClientProps {
  settings: Record<string, any>;
  locale: string;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function AboutClient({ settings, locale }: AboutClientProps) {
  const isRtl = locale === 'ar';

  const getVal = (key: string, defaultVal: string = '') => {
    return settings[key]?.[locale] || settings[key]?.['ar'] || defaultVal;
  };

  return (
    <article className="relative min-h-screen bg-ivory text-ink overflow-x-hidden">
      
      {/* ── SECTION 1: HERO HEADER (DARK) ── */}
      <section 
        className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden"
      >
        <ParallaxBackground src="/images/about-us-bg.webp" className="md:bg-[length:100%_100%]" />

        <div 
          className="absolute inset-0 bg-gradient-to-b from-midnight/65 via-midnight/55 to-midnight/40 pointer-events-none z-0"
        />

        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:120px_120px] opacity-[0.035] filter invert pointer-events-none z-0" />
        
        <motion.div 
          className="max-w-6xl mx-auto px-6 w-full relative z-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            className={`inline-block text-xs uppercase tracking-[0.25em] text-gold-champagne font-bold mb-4 ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
            variants={fadeInUp}
          >
            {getVal('about_hero_tag')}
          </motion.span>
          
          <motion.h1 
            className={`text-hero text-parchment leading-tight max-w-4xl mx-auto mb-6 ${
              isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'
            }`}
            variants={fadeInUp}
          >
            {getVal('about_hero_title')}
          </motion.h1>

          <motion.p 
            className={`text-sm md:text-base lg:text-lg text-parchment/80 leading-relaxed max-w-3xl mx-auto mb-12 ${
              isRtl ? 'font-noto' : 'font-lora'
            }`}
            variants={fadeInUp}
          >
            {getVal('about_hero_subtitle')}
          </motion.p>

          <motion.div 
            className="inline-block mt-4 pt-8 border-t border-gold-muted/30"
            variants={scaleIn}
          >
            <span dir="rtl" className="block font-amiri text-2xl lg:text-[1.85rem] text-gold-champagne select-none leading-relaxed">
              {getVal('about_hero_verse')}
            </span>
            <span className={`block text-[10px] uppercase tracking-widest text-parchment/40 mt-2 ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}>
              {getVal('about_hero_verse_source')}
            </span>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gold-hi/55 via-white/80 via-parchment/65 via-gold-hi/55 to-transparent bg-[length:200%_100%] animate-gold-shimmer" />
        </div>
      </section>

      {/* ── SECTION 2: OUR STORY & PHILOSOPHY (LIGHT) ── */}
      <section className="bg-[#FDFAF3] py-24 relative z-10 border-b border-gold-muted/15">
        <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-gold-hi/5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Calligraphic Philosophy Card */}
            <motion.div 
              className="lg:col-span-5 bg-gradient-to-br from-[#162742] via-[#122038] to-[#091521] border border-gold-hi/30 hover:border-gold-hi/45 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 hover:translate-y-[-2px] group"
              variants={slideInLeft}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted via-gold-hi to-gold-muted opacity-80" />
              
              <div dir="rtl" className="text-gold-hi/80 text-sm md:text-base font-amiri mb-3 text-center select-none">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَِِّيمِ
              </div>

              <div dir="rtl" className="text-gold-hi text-xl md:text-2xl font-amiri mb-8 text-center select-none leading-loose">
                {getVal('about_hero_verse')}
              </div>

              <h3 className={`text-heading text-parchment font-bold mb-4 text-center ${
                isRtl ? 'font-amiri' : 'font-cormorant font-semibold'
              }`}>
                {getVal('about_philosophy_title')}
              </h3>

              <h4 className={`text-xs text-gold-champagne tracking-wider uppercase mb-6 text-center font-semibold ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}>
                {getVal('about_philosophy_subtitle')}
              </h4>
              
              <p className={`text-parchment/75 text-xs md:text-sm leading-relaxed text-start ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}>
                {getVal('about_philosophy_text')}
              </p>

              <div className="mt-10 pt-6 border-t border-gold-muted/20 flex items-center justify-between">
                <span className={`text-[9px] uppercase tracking-widest text-gold-hi/60 font-semibold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {getVal('about_philosophy_logo_subtitle')}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-gold-hi rotate-45" />
              </div>
            </motion.div>

            {/* OUR STORY: Editorial text */}
            <motion.div 
              className="lg:col-span-7 flex flex-col justify-center text-start lg:pt-4"
              variants={slideInRight}
            >
              <span className={`text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 inline-block ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}>
                {getVal('about_story_tag')}
              </span>
              
              <h2 className={`text-title text-midnight font-bold mb-8 leading-tight ${
                isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
              }`}>
                {getVal('about_story_title')}
              </h2>

              <div className={`space-y-6 text-ink text-sm leading-relaxed ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}>
                <p>{getVal('about_story_text1')}</p>
                <p className="border-s-2 border-gold/45 ps-6 italic text-stone/90">
                  {getVal('about_story_text2')}
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ── SECTION 3: OUR MISSION ── */}
      <section className="bg-gradient-to-b from-[#091521] via-navy-sapphire/95 to-[#091521] py-24 relative z-10 border-b border-gold-muted/15">
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.02] filter invert pointer-events-none" />

        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div className="lg:col-span-6 text-start" variants={fadeInUp}>
              <span className={`text-xs font-bold text-gold-champagne uppercase tracking-[0.2em] mb-3 inline-block ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}>
                {getVal('about_mission_tag')}
              </span>
              
              <h2 className={`text-title text-parchment font-bold mb-8 leading-tight ${
                isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
              }`}>
                {getVal('about_mission_title')}
              </h2>

              <p className={`text-parchment/80 text-sm md:text-base leading-relaxed max-w-xl ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}>
                {getVal('about_mission_intro')}
              </p>
            </motion.div>

            <motion.div className="lg:col-span-6 space-y-6 text-start" variants={staggerContainer}>
              {[1, 2, 3].map((num) => (
                <motion.div 
                  key={num}
                  className="bg-[#162742]/40 backdrop-blur-md border border-gold-hi/15 rounded-2xl p-6 shadow-md hover:shadow-lg hover:border-gold-hi/30 transition-all duration-300"
                  variants={fadeInUp}
                >
                  <h3 className={`text-heading text-gold-champagne font-bold mb-2 flex items-center gap-2.5 ${
                    isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                  }`}>
                    <span className="w-1.5 h-1.5 bg-gold-champagne rounded-full shrink-0" />
                    {getVal(`about_mission_point${num}_title`)}
                  </h3>
                  <p className={`text-parchment/70 text-xs leading-relaxed ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}>
                    {getVal(`about_mission_point${num}_desc`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ── SECTION 4: FOUR PILLARS ── */}
      <section className="bg-[#FDFAF3] py-24 relative z-10 border-b border-gold-muted/15">
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.035] pointer-events-none" />

        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span 
            className={`text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 inline-block ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
            variants={fadeInUp}
          >
            {getVal('about_pillars_tag')}
          </motion.span>
          <motion.h2 
            className={`text-title text-midnight font-bold mb-4 leading-tight max-w-2xl mx-auto ${
              isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
            }`}
            variants={fadeInUp}
          >
            {getVal('about_pillars_title')}
          </motion.h2>
          <motion.p 
            className={`text-sm text-stone max-w-xl mx-auto mb-16 leading-relaxed ${
              isRtl ? 'font-noto' : 'font-lora'
            }`}
            variants={fadeInUp}
          >
            {getVal('about_pillars_subtitle')}
          </motion.p>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start" variants={staggerContainer}>
            {[
              { keyNum: 1, icon: BookOpen },
              { keyNum: 2, icon: Sparkles },
              { keyNum: 3, icon: ShieldCheck },
              { keyNum: 4, icon: Languages }
            ].map(({ keyNum, icon: IconComponent }) => (
              <motion.div 
                key={keyNum}
                className="bg-white border border-gold-muted/10 rounded-2xl p-8 hover:border-gold/45 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 group flex gap-6 items-start"
                variants={fadeInUp}
              >
                <div className="p-3 bg-gold-muted/10 rounded-xl border border-gold/20 text-gold group-hover:bg-gold-muted/20 group-hover:scale-105 transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-heading text-midnight font-bold leading-tight ${
                    isRtl ? 'font-amiri' : 'font-cormorant font-semibold'
                  }`}>
                    {getVal(`about_pillar${keyNum}_title`)}
                  </h3>
                  <p className={`text-stone text-xs md:text-sm leading-relaxed ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}>
                    {getVal(`about_pillar${keyNum}_desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </section>

      {/* ── SECTION 5: VETTING ROADMAP ── */}
      <section className="bg-gradient-to-b from-[#091521] via-[#122038] to-[#091521] py-24 relative z-10 border-b border-gold-muted/15">
        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          <div className="text-center mb-20">
            <motion.span 
              className={`text-xs font-bold text-gold-champagne uppercase tracking-[0.2em] mb-3 inline-block ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}
              variants={fadeInUp}
            >
              {getVal('about_vetting_tag')}
            </motion.span>
            <motion.h2 
              className={`text-title text-parchment font-bold mb-4 leading-tight max-w-2xl mx-auto ${
                isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
              }`}
              variants={fadeInUp}
            >
              {getVal('about_vetting_title')}
            </motion.h2>
            <motion.p 
              className={`text-sm text-parchment/75 max-w-xl mx-auto leading-relaxed ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}
              variants={fadeInUp}
            >
              {getVal('about_vetting_subtitle')}
            </motion.p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer}>
            {[1, 2, 3, 4].map((num) => (
              <motion.div 
                key={num} 
                className="bg-[#162742]/55 border border-gold-hi/15 rounded-2xl p-6 relative flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:border-gold-hi/35 hover:bg-[#1c2e4d]/60"
                variants={fadeInUp}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold font-cormorant text-gold-champagne/30 group-hover:text-gold-champagne transition-colors duration-300">
                      0{num}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-gold-champagne opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <h3 className={`text-heading text-parchment font-bold mb-4 leading-tight ${
                    isRtl ? 'font-amiri' : 'font-cormorant font-semibold'
                  }`}>
                    {getVal(`about_vetting_step${num}_title`)}
                  </h3>
                  
                  <p className={`text-parchment/70 text-[12px] md:text-xs leading-relaxed ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}>
                    {getVal(`about_vetting_step${num}_desc`)}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gold-muted/10 text-start">
                  <span className={`text-[8px] uppercase tracking-widest text-parchment/40 font-bold ${
                    isRtl ? 'font-cairo' : 'font-dm'
                  }`}>
                    {isRtl ? `المرحلة 0${num}` : `PHASE 0${num}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </section>

      {/* ── SECTION 6: SCHOLARLY QUOTE ── */}
      <section className="bg-[#F2ECD8] py-20 relative z-10 border-b border-gold-muted/15 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14rem] font-serif text-gold-hi/[0.04] pointer-events-none select-none">
          ”
        </div>

        <motion.div 
          className="max-w-4xl mx-auto px-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
        >
          <Quote className="w-8 h-8 text-gold mx-auto mb-6 opacity-60" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-amiri text-midnight select-none leading-loose max-w-2xl mx-auto mb-6">
            {getVal('about_quote_text')}
          </h2>
          <p className={`text-xs uppercase tracking-wider text-stone font-semibold ${
            isRtl ? 'font-cairo' : 'font-dm'
          }`}>
            {getVal('about_quote_author')}
          </p>
        </motion.div>
      </section>

      {/* ── SECTION 7: FINAL CTA ── */}
      <section className="bg-[#FDFAF3] py-24 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          
          <motion.div 
            className="bg-gradient-to-br from-[#162742] via-[#22314b] to-[#122038] border border-gold-hi/25 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,43,71,0.25)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted via-gold-hi to-gold-muted opacity-80" />

            <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:90px_90px] opacity-[0.025] filter invert pointer-events-none" />

            <div className="relative z-10">
              <span className={`inline-block text-xs uppercase tracking-[0.2em] text-gold-champagne font-bold mb-4 ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}>
                {isRtl ? 'بدء التسجيل والتلقي' : 'START REGISTRATION'}
              </span>

              <h2 className={`text-title lg:text-3xl text-parchment font-bold mb-4 max-w-2xl mx-auto leading-tight ${
                isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
              }`}>
                {isRtl ? 'ابدأ مسارك التعليمي المخصص اليوم' : 'Begin Your Personal Study Path'}
              </h2>

              <p className={`text-xs md:text-sm text-parchment/75 max-w-xl mx-auto mb-10 leading-relaxed ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}>
                {isRtl ? 'احجز جلسة تقييم مجانية بالكامل للوقوف على مستواك الحالي ووضع خطتك الدراسية المخصصة مع أحد علمائنا المعتمدين.' : 'Schedule a complimentary live Zoom assessment to map your current level and establish your tailored scholarly goals.'}
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                <Link
                  href={`/${locale}/book`}
                  className="btn-gold py-4 px-10 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto group font-ui"
                >
                  <Sparkles className="w-4 h-4 text-[#22314b] shrink-0" />
                  <span className="whitespace-nowrap">{isRtl ? 'احجز جلسة تقييم مجانية الآن' : 'Schedule Your Free Assessment Now'}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3.5 h-3.5 text-[#22314b] shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-[#22314b] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </Link>

                <Link
                  href={`/${locale}/programs`}
                  className="border border-gold-hi/35 text-gold-champagne hover:bg-gold-hi/[0.08] hover:border-gold-hi/70 py-4 px-10 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto group font-ui"
                >
                  <BookOpen className="w-4 h-4 text-gold-champagne shrink-0" />
                  <span className="whitespace-nowrap">{isRtl ? 'استكشف المسارات التعليمية' : 'Explore Academic Programs'}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3.5 h-3.5 text-gold-champagne shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-gold-champagne shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </Link>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>

    </article>
  );
}
