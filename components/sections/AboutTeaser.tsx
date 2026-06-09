'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { Scroll, UserCheck, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AboutTeaser() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const content = {
    ar: {
      tag: 'عن أكاديمية إسلام تبيان',
      title: 'رؤية أكاديمية تربط الماضي العريق بالمستقبل المعاصر',
      subtitle: 'نسعى لبناء جيل يعتز بدينه ولغته من خلال الجمع بين الرصانة العلمية العتيقة والتعليم التفاعلي الفردي الحديث.',
      
      philosophyTitle: 'فلسفتنا التعليمية',
      philosophyText: 'نؤمن في إسلام تبيان بأن العلوم الشرعية واللغة العربية لا تؤخذ إلا بالتلقي المباشر والمشافهة عن أهل العلم المتخصصين. لذلك نلتزم بتقديم تعليم قائم على منهجية السند المتصل، لضمان صحة الفهم ودقة المعرفة وفق منهج الأزهر الشريف الوسطي.',
      quoteText: '﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾',
      
      pillar1Title: 'منهجية السند المتصل',
      pillar1Text: 'تلقّ العلوم الشرعية وحفظ القرآن الكريم بإسناد متصل إلى النبي ﷺ على يد نخبة من علماء الأزهر الشريف المجازين.',
      
      pillar2Title: 'التعليم الفردي المباشر',
      pillar2Text: 'حصص خاصة (1-to-1) مباشرة تضمن التركيز الكامل، ومراعاة الفروق الفردية، وتعديل المنهج حسب سرعة الطالب واحتياجاته.',
      
      pillar3Title: 'هيئة تدريس أزهرية',
      pillar3Text: 'علماء وأكاديميون متخصصون من جامعة الأزهر، يتم اختيارهم وفق معايير علمية وأخلاقية صارمة، يجيدون لغات متعددة.',
      
      btnText: 'اقرأ المزيد عن رسالتنا'
    },
    en: {
      tag: 'ABOUT ISLAM TEBYAN',
      title: 'A Vision Connecting Sacred Heritage with Modern Education',
      subtitle: 'We preserve traditional scholarly rigor while utilizing advanced individual tutoring formats to raise a generation deeply rooted in their faith and language.',
      
      philosophyTitle: 'Our Educational Philosophy',
      philosophyText: 'We believe that sacred knowledge and Arabic cannot be fully absorbed except through direct oral transmission (Talaqqi) from qualified scholars. Thus, we commit to a methodology built on connected chains (Isnad) to guarantee sound understanding.',
      quoteText: '“And We have sent down to you the Book as a clarification for all things”',
      
      pillar1Title: 'Connected Chains (Isnad)',
      pillar1Text: 'Acquire sacred knowledge and Quran recitation with connected chains of transmission back to the Prophet ﷺ under certified Al-Azhar scholars.',
      
      pillar2Title: 'One-on-One Tutoring',
      pillar2Text: 'Live, interactive private sessions ensuring maximum engagement, tailored pace, and custom-drafted syllabi to fit your goals.',
      
      pillar3Title: 'Elite Al-Azhar Faculty',
      pillar3Text: 'Scholars and academics selected from Al-Azhar University under strict standards, possessing native mastery and multilingual proficiency.',
      
      btnText: 'Read More About Our Mission'
    },
    fr: {
      tag: 'À PROPOS DE L\'ACADÉMIE',
      title: 'Une Vision Alliant Héritage Sacré et Éducation Moderne',
      subtitle: 'Nous préservons la rigueur académique traditionnelle tout en utilisant des formats d\'apprentissage en ligne interactifs et personnalisés.',
      
      philosophyTitle: 'Notre Philosophie',
      philosophyText: 'Nous croyons que les sciences islamiques et l\'arabe ne s\'acquièrent que par la transmission orale directe (Talaqqi) auprès de savants qualifiés. Nous nous engageons donc à enseigner via l\'Isnad pour garantir une compréhension pure.',
      quoteText: '“Et Nous avons fait descendre sur toi le Livre, comme un exposé explicite de toute chose”',
      
      pillar1Title: 'Chaîne de Transmission (Isnad)',
      pillar1Text: 'Étudiez le Coran et les sciences islamiques avec une chaîne de transmission ininterrompue remontant au Prophète ﷺ par des savants d\'Al-Azhar.',
      
      pillar2Title: 'Cours Particuliers En Direct',
      pillar2Text: 'Des sessions individuelles assurant une attention totale, un rythme adapté et un programme personnalisé selon vos objectifs.',
      
      pillar3Title: 'Faculté d\'Élite d\'Al-Azhar',
      pillar3Text: 'Des enseignants diplômés d\'Al-Azhar, rigoureusement sélectionnés, maîtrisant plusieurs langues pour un apprentissage fluide.',
      
      btnText: 'En Savoir Plus Sur Notre Mission'
    }
  };

  const activeContent = content[locale as keyof typeof content] || content.en;

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: isRtl ? 35 : -35 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 18,
      }
    }
  };

  const pillarContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const pillarVariants: Variants = {
    hidden: { opacity: 0, x: isRtl ? -35 : 35 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 16,
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-white via-parchment/15 to-white py-24 relative z-10 border-b border-gold-muted/15">
      {/* Small repeating gold pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:60px_60px] opacity-[0.04] pointer-events-none" />

      {/* Decorative top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-hi/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerVariants}
        >
          <span
            className={`inline-block text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3 ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
          >
            {activeContent.tag}
          </span>
          <h2
            className={`text-title text-midnight font-bold max-w-3xl mx-auto mb-5 ${
              isRtl ? 'font-amiri font-bold leading-[1.4]' : 'font-cormorant font-semibold leading-tight'
            }`}
          >
            {activeContent.title}
          </h2>
          <p
            className={`text-sm md:text-base text-[#3A332A] max-w-2xl mx-auto leading-relaxed font-normal description-justify ${
              isRtl ? 'font-noto' : 'font-lora'
            }`}
          >
            {activeContent.subtitle}
          </p>
        </motion.div>

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          {/* Column 1: Philosophy Card (Navy & Gold Glassmorphic) */}
          <motion.div
            className="lg:col-span-5 bg-gradient-to-br from-[#223554] via-[#16243b] to-[#0c1424] backdrop-blur-md border border-gold-hi/30 hover:border-gold-hi/45 rounded-[2rem] p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between group transition-all duration-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={cardVariants}
          >
            {/* Top gold shimmer bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted via-gold-hi to-gold-muted opacity-80" />
            
            {/* Subtle logo watermark in bottom right corner */}
            <div className="absolute right-4 bottom-4 w-28 h-28 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.08] filter invert brightness-200 pointer-events-none group-hover:scale-105 transition-transform duration-1000" />
            
            {/* Internal ambient glow */}
            <div className="absolute -top-10 -left-10 w-[150px] h-[150px] bg-gold-hi/5 blur-[50px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center">
              {/* Basmala - Always in Arabic script & RTL layout, font-normal to prevent bold distortion */}
              <div dir="rtl" className="text-gold-hi/80 text-sm md:text-base lg:text-lg font-amiri mb-3 font-normal select-none leading-relaxed tracking-normal transition-all duration-500 group-hover:text-gold-hi group-hover:scale-[1.01]">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </div>

              {/* Islamic Calligraphic / Typographic Motif (The Quranic Verse) - Always in Arabic script & RTL layout */}
              <div dir="rtl" className="text-gold-hi text-xl md:text-2xl lg:text-[1.75rem] font-amiri mb-8 font-normal select-none leading-loose tracking-normal transition-all duration-500 group-hover:text-gold-hi group-hover:scale-[1.02]">
                ﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾
              </div>

              <h3 className={`text-heading text-parchment font-bold mb-6 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-gold-hi text-center ${
                isRtl ? 'font-amiri leading-[1.4]' : 'font-cormorant font-medium'
              }`}>
                {activeContent.philosophyTitle}
              </h3>
              
              <p className={`text-parchment/90 text-sm md:text-base leading-relaxed text-start transition-all duration-500 group-hover:text-parchment description-justify-start ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}>
                {activeContent.philosophyText}
              </p>
            </div>

            {/* Decorative bottom element */}
            <div className="mt-12 pt-6 border-t border-gold-muted/20 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-gold-hi/60 font-semibold font-dm">
                AL-AZHAR SCHOLASTIC WAY
              </span>
              <div className="w-2 h-2 rounded-full bg-gold-hi opacity-60 rotate-45" />
            </div>
          </motion.div>

          {/* Column 2: Key Pillars Grid */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={pillarContainerVariants}
          >
            {/* Pillar 1 */}
            <motion.div 
              className="bg-gradient-to-br from-white to-ivory/30 border border-gold-muted/10 rounded-2xl p-6 flex gap-5 items-start hover:border-gold-hi/35 hover:shadow-lg transition-all duration-300 group"
              variants={pillarVariants}
            >
              <div className="p-3 bg-gold-muted/10 rounded-xl border border-gold/20 text-gold-hi group-hover:bg-gold-muted/20 group-hover:scale-105 transition-all duration-300">
                <Scroll className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className={`text-heading text-midnight font-bold ${
                  isRtl ? 'font-amiri leading-[1.4]' : 'font-cormorant font-semibold leading-tight'
                }`}>
                  {activeContent.pillar1Title}
                </h4>
                <p className={`text-sm text-[#3A332A]/85 leading-relaxed font-normal description-justify-start ${
                  isRtl ? 'font-noto' : 'font-lora'
                }`}>
                  {activeContent.pillar1Text}
                </p>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              className="bg-gradient-to-br from-white to-ivory/30 border border-gold-muted/10 rounded-2xl p-6 flex gap-5 items-start hover:border-gold-hi/35 hover:shadow-lg transition-all duration-300 group"
              variants={pillarVariants}
            >
              <div className="p-3 bg-gold-muted/10 rounded-xl border border-gold/20 text-gold-hi group-hover:bg-gold-muted/20 group-hover:scale-105 transition-all duration-300">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className={`text-heading text-midnight font-bold ${
                  isRtl ? 'font-amiri leading-[1.4]' : 'font-cormorant font-semibold leading-tight'
                }`}>
                  {activeContent.pillar2Title}
                </h4>
                <p className={`text-sm text-[#3A332A]/85 leading-relaxed font-normal description-justify-start ${
                  isRtl ? 'font-noto' : 'font-lora'
                }`}>
                  {activeContent.pillar2Text}
                </p>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div 
              className="bg-gradient-to-br from-white to-ivory/30 border border-gold-muted/10 rounded-2xl p-6 flex gap-5 items-start hover:border-gold-hi/35 hover:shadow-lg transition-all duration-300 group"
              variants={pillarVariants}
            >
              <div className="p-3 bg-gold-muted/10 rounded-xl border border-gold/20 text-gold-hi group-hover:bg-gold-muted/20 group-hover:scale-105 transition-all duration-300">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className={`text-heading text-midnight font-bold ${
                  isRtl ? 'font-amiri leading-[1.4]' : 'font-cormorant font-semibold leading-tight'
                }`}>
                  {activeContent.pillar3Title}
                </h4>
                <p className={`text-sm text-[#3A332A]/85 leading-relaxed font-normal description-justify-start ${
                  isRtl ? 'font-noto' : 'font-lora'
                }`}>
                  {activeContent.pillar3Text}
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Action Center - Link to Full About Page */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gold hover:text-gold-hi transition-colors duration-300 group"
          >
            <span>{activeContent.btnText}</span>
            {isRtl ? (
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            )}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
