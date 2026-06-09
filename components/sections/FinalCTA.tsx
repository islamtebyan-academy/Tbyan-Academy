'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { BookOpen, MessageSquare } from 'lucide-react';

export default function FinalCTA() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const content = {
    ar: {
      tag: 'ابدأ رحلتك الأكاديمية اليوم',
      title: 'تلقَّ العلوم الشرعية واللغة العربية بـسند متصل',
      desc: 'انضم إلى الحصص الفردية المباشرة مع نخبة من علماء الأزهر الشريف. اختر مسارك الدراسي المخصص وتواصل معنا لتنسيق خطتك التعليمية الخاصة.',
      btnCourses: 'استكشف البرامج الدراسية',
      btnContact: 'تواصل مع مستشارنا الأكاديمي',
    },
    en: {
      tag: 'START YOUR ACADEMIC PATH',
      title: 'Acquire Sacred Knowledge & Classical Arabic under Connected Chains',
      desc: 'Step into a premium, university-level tutoring experience with Al-Azhar scholars. Choose your custom program or connect directly with our coordinators to draft your syllabus.',
      btnCourses: 'Explore Academic Programs',
      btnContact: 'Contact Academic Coordinator',
    },
    fr: {
      tag: 'COMMENCEZ VOTRE PARCOURS ACADÉMIQUE',
      title: 'Étudiez les Sciences Islamiques et l\'Arabe Classique sous Isnad',
      desc: 'Rejoignez une formation d\'élite en cours particuliers en ligne avec des savants d\'Al-Azhar. Découvrez nos programmes ou contactez-nous pour concevoir votre plan d\'études personnalisé.',
      btnCourses: 'Explorer les Programmes',
      btnContact: 'Contactez nos Conseillers',
    }
  };

  const activeContent = content[locale as keyof typeof content] || content.en;

  // Staggered entry animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants: Variants = {
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
    <section className="bg-gradient-to-b from-parchment to-sand/20 py-28 relative z-10 border-b border-gold-muted/15">
      {/* Premium Elegant Separator Line (Top Boundary) */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold-hi/45 to-transparent z-20 pointer-events-none" />

      {/* Repeating polygonal Islamic pattern watermark wrapped in overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:40px_40px] opacity-[0.6]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Main Glassmorphic Card Container */}
        <motion.div
          className="bg-gradient-to-br from-[#1c2b46]/75 via-[#132034]/90 to-[#0e1726]/85 backdrop-blur-xl border border-gold-muted/30 rounded-[2.5rem] px-5 py-10 sm:p-12 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative overflow-hidden group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {/* Top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20" />

          {/* Micro-pattern watermark inside the card */}
          <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:24px_24px] opacity-[0.06] pointer-events-none" />

          {/* Double-logo watermark background overlays */}
          <div className="absolute right-3 bottom-3 sm:right-6 sm:bottom-6 w-16 h-16 sm:w-32 sm:h-32 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.25] group-hover:opacity-[0.5] group-hover:scale-105 transition-all duration-1000 pointer-events-none filter invert brightness-200" />
          <div className="absolute left-3 top-3 sm:left-6 sm:top-6 w-16 h-16 sm:w-32 sm:h-32 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.25] pointer-events-none filter invert brightness-200" />

          {/* Internal ambient glow */}
          <div className="absolute -top-24 left-1/3 w-[300px] h-[300px] bg-gold-hi/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Tagline */}
            <motion.span
              variants={itemVariants}
              className={`inline-block text-xs uppercase tracking-[0.2em] text-gold-hi font-bold mb-4 cursor-default ${isRtl ? 'font-cairo' : 'font-dm'
                }`}
            >
              {activeContent.tag}
            </motion.span>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className={`text-title text-parchment font-bold mb-6 cursor-default ${isRtl ? 'font-amiri font-bold leading-[1.4]' : 'font-cormorant font-semibold leading-tight'
                }`}
            >
              {activeContent.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className={`text-sm md:text-base text-parchment/70 leading-relaxed mb-10 cursor-default ${isRtl ? 'font-noto' : 'font-lora'
                }`}
            >
              {activeContent.desc}
            </motion.p>

            {/* Premium Two-Button Action Center */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            >
              {/* Primary: Courses/Programs */}
              <Link
                href={`/${locale}/programs`}
                className="btn-gold w-full sm:w-auto px-5 py-3.5 sm:px-8 sm:py-4.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 sm:gap-2.5 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-gold/15 group/btn1"
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-current" />
                <span>{activeContent.btnCourses}</span>
                <span className={`transition-transform duration-300 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                  {isRtl ? '←' : '→'}
                </span>
              </Link>

              {/* Secondary: Contact */}
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto px-5 py-3.5 sm:px-8 sm:py-4.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 sm:gap-2.5 border border-gold/45 text-gold-hi bg-white/[0.03] hover:bg-gold/10 hover:border-gold-hi hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 backdrop-blur-sm group/btn2"
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-hi transition-transform duration-300 group-hover/btn2:scale-110" />
                <span>{activeContent.btnContact}</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
