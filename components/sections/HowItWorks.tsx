'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import {
  ClipboardList, Video, Rocket, ArrowRight, ArrowLeft,
  CheckCircle2, Loader2, Sparkles, ChevronDown, Shield, GraduationCap, Users, Clock
} from 'lucide-react';

import { detectCountry, DEFAULT_COUNTRY } from '@/lib/countries';


export default function HowItWorks({
  tagOverride,
  whyTitleOverride,
  formTitleOverride,
  formSubtitleOverride,
  btnSubmitOverride
}: {
  tagOverride?: string;
  whyTitleOverride?: string;
  formTitleOverride?: string;
  formSubtitleOverride?: string;
  btnSubmitOverride?: string;
}) {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: 'male',
    preferredTeacher: 'any',
    course: '',
    country: '',
    whatsapp: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const detected = detectCountry();
    setCountry(detected);
    setFormData(prev => ({
      ...prev,
      country: detected.name,
      whatsapp: detected.dial + ' ',
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = {
    ar: {
      tag: 'ابدأ رحلتك التعليمية مجاناً وبدون أي التزام',
      whyTitle: 'لماذا الحصة\nالتجريبية المجانية؟',
      benefits: [
        { icon: <GraduationCap className="w-4.5 h-4.5" />, text: 'تجربة حقيقية مع نخبة من المعلمين الأزهريين المجازين' },
        { icon: <ClipboardList className="w-4.5 h-4.5" />, text: 'تقييم مستواك الحالي ووضع خطة دراسية مخصصة لأهدافك' },
        { icon: <Shield className="w-4.5 h-4.5" />, text: 'التعرف على المنهج الأكاديمي وأدوات التعلم الحديثة' },
        { icon: <CheckCircle2 className="w-4.5 h-4.5" />, text: 'تقييم مدى ارتياحك قبل الاشتراك — بدون أي ضغوط' },
      ],
      stats: [
        { value: '+500', label: 'طالب نشط' },
        { value: '98%', label: 'نسبة الرضا' },
        { value: '24 ساعة', label: 'وقت الاستجابة' },
      ],
      formTitle: 'احجز حصتك التجريبية المجانية',
      formSubtitle: 'أكمل النموذج وسيتواصل معك فريقنا خلال 24 ساعة',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      age: 'العمر',
      gender: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
      preferredTeacher: 'تفضيل المعلم',
      any: 'أي',
      course: 'اختر المقرر',
      countryLabel: 'الدولة',
      whatsapp: 'رقم الواتساب',
      message: 'رسالة إضافية',
      messagePlaceholder: 'أي متطلبات أو أسئلة خاصة؟',
      btnSubmit: 'تأكيد الحجز',
      courses: [
        { value: 'quran', label: 'القرآن والتجويد' },
        { value: 'fiqh', label: 'الفقه الإسلامي' },
        { value: 'arabic', label: 'النحو والصرف' },
        { value: 'aqidah', label: 'العقيدة الإسلامية' },
        { value: 'logic', label: 'علم المنطق' },
        { value: 'literature', label: 'الأدب والبلاغة' },
        { value: 'kids', label: 'برنامج الأطفال' },
      ],
      successTitle: 'تم الحجز بنجاح!',
      successDesc: 'سيتواصل معك منسق الأكاديمية خلال 24 ساعة لتحديد الموعد.',
    },
    en: {
      tag: 'START YOUR LEARNING JOURNEY FOR FREE AND WITH ZERO COMMITMENT',
      whyTitle: 'Why a Free\nTrial?',
      benefits: [
        { icon: <GraduationCap className="w-4.5 h-4.5" />, text: 'Live experience with top-tier certified Azhari educators' },
        { icon: <ClipboardList className="w-4.5 h-4.5" />, text: 'Assess your current level and get a tailored study plan' },
        { icon: <Shield className="w-4.5 h-4.5" />, text: 'Understand the curriculum and modern tools we use' },
        { icon: <CheckCircle2 className="w-4.5 h-4.5" />, text: 'Evaluate your comfort level before subscribing — zero pressure' },
      ],
      stats: [
        { value: '+500', label: 'Active Students' },
        { value: '98%', label: 'Satisfaction Rate' },
        { value: '24h', label: 'Response Time' },
      ],
      formTitle: 'Book Your Free Trial',
      formSubtitle: 'Fill out the form below and our team will contact you within 24 hours',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      age: 'Age',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      preferredTeacher: 'Preferred Teacher',
      any: 'Any',
      course: 'Select Course',
      countryLabel: 'Country',
      whatsapp: 'WhatsApp Number',
      message: 'Additional Message',
      messagePlaceholder: 'Any specific requirements or questions?',
      btnSubmit: 'Confirm Booking',
      courses: [
        { value: 'quran', label: 'Quran & Tajweed' },
        { value: 'fiqh', label: 'Islamic Jurisprudence' },
        { value: 'arabic', label: 'Grammar & Morphology' },
        { value: 'aqidah', label: 'Islamic Creed' },
        { value: 'logic', label: 'Islamic Logic' },
        { value: 'literature', label: 'Literature & Rhetoric' },
        { value: 'kids', label: 'Kids Program' },
      ],
      successTitle: 'Booking Confirmed!',
      successDesc: 'Our academic coordinator will contact you within 24 hours to schedule your session.',
    },
    fr: {
      tag: 'COMMENCEZ VOTRE PARCOURS GRATUITEMENT ET SANS ENGAGEMENT',
      whyTitle: 'Pourquoi un Cours\nd\'Essai Gratuit ?',
      benefits: [
        { icon: <GraduationCap className="w-4.5 h-4.5" />, text: 'Expérience réelle avec des éducateurs azhari certifiés d\'élite' },
        { icon: <ClipboardList className="w-4.5 h-4.5" />, text: 'Évaluez votre niveau et obtenez un plan d\'études personnalisé' },
        { icon: <Shield className="w-4.5 h-4.5" />, text: 'Découvrez le programme et nos outils pédagogiques modernes' },
        { icon: <CheckCircle2 className="w-4.5 h-4.5" />, text: 'Évaluez votre confort avant de vous abonner — sans pression' },
      ],
      stats: [
        { value: '+500', label: 'Étudiants actifs' },
        { value: '98%', label: 'Taux de satisfaction' },
        { value: '24h', label: 'Temps de réponse' },
      ],
      formTitle: 'Réservez Votre Essai Gratuit',
      formSubtitle: 'Remplissez le formulaire et notre équipe vous contactera sous 24 heures',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse E-mail',
      age: 'Âge',
      gender: 'Genre',
      male: 'Homme',
      female: 'Femme',
      preferredTeacher: 'Enseignant Préféré',
      any: 'Indifférent',
      course: 'Choisir un Cours',
      countryLabel: 'Pays',
      whatsapp: 'Numéro WhatsApp',
      message: 'Message Supplémentaire',
      messagePlaceholder: 'Des exigences ou questions spécifiques ?',
      btnSubmit: 'Confirmer la Réservation',
      courses: [
        { value: 'quran', label: 'Coran & Tajwid' },
        { value: 'fiqh', label: 'Jurisprudence Islamique' },
        { value: 'arabic', label: 'Grammaire & Morphologie' },
        { value: 'aqidah', label: 'Dogme Islamique' },
        { value: 'logic', label: 'Logique Islamique' },
        { value: 'literature', label: 'Littérature & Rhétorique' },
        { value: 'kids', label: 'Programme Enfants' },
      ],
      successTitle: 'Réservation Confirmée !',
      successDesc: 'Notre coordinateur académique vous contactera sous 24 heures.',
    }
  };

  const activeContent = content[locale as keyof typeof content] || content.en;

  const steps = [
    { number: '01', icon: <ClipboardList className="w-5 h-5" />, title: isRtl ? 'سجّل بياناتك' : locale === 'fr' ? 'Inscrivez-vous' : 'Fill the Form' },
    { number: '02', icon: <Video className="w-5 h-5" />, title: isRtl ? 'تعرّف على معلمك' : locale === 'fr' ? 'Rencontrez votre savant' : 'Meet Your Scholar' },
    { number: '03', icon: <Rocket className="w-5 h-5" />, title: isRtl ? 'انطلق في رحلتك' : locale === 'fr' ? 'Commencez' : 'Begin Your Journey' },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 18 }
    }
  };

  const inputClass = `w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3.5 rounded-xl text-[13px] focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 placeholder:text-stone/30 ${isRtl ? 'font-noto' : 'font-dm'}`;
  const labelClass = `block text-[9px] font-bold uppercase tracking-widest text-stone/50 mb-1.5 ${isRtl ? 'font-cairo' : 'font-dm'}`;

  return (
    <section className="bg-navy py-24 relative z-10 border-b border-gold-muted/10 overflow-hidden text-parchment">
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:60px_60px] opacity-[0.035] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ═══ Top: 3-Step Mini Process ═══ */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <span className={`inline-block text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
              {isRtl ? 'كيف يعمل النظام' : locale === 'fr' ? 'COMMENT ÇA MARCHE' : 'HOW IT WORKS'}
            </span>
            <h2 className={`text-title text-parchment font-bold max-w-3xl mx-auto ${isRtl ? 'font-amiri font-bold leading-[1.4]' : 'font-cormorant font-semibold leading-tight'}`}>
              {isRtl ? 'ابدأ رحلتك العلمية في ثلاث خطوات بسيطة' : locale === 'fr' ? 'Commencez en Trois Étapes Simples' : 'Start Your Journey in Three Simple Steps'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 relative max-w-4xl mx-auto">
            <div className="absolute top-[24px] sm:top-[28px] left-[15%] right-[15%] z-0">
              <div className="w-full h-[2px] md:h-[3px] bg-gradient-to-r from-gold/10 via-gold-hi to-gold/10 shadow-[0_0_8px_rgba(212,175,55,0.5)] rounded-full animate-pulse" />
            </div>
            {steps.map((step, idx) => (
              <motion.div key={idx} className="text-center relative z-10" variants={itemVariants}>
                <div className={`absolute -top-2 md:-top-4 left-1/2 -translate-x-1/2 text-[45px] sm:text-[60px] md:text-[80px] font-bold leading-none text-gold/[0.08] pointer-events-none select-none ${isRtl ? 'font-cairo' : 'font-cormorant'}`}>
                  {step.number}
                </div>
                <div className="relative w-12 h-12 md:w-14 h-14 mx-auto rounded-2xl bg-white border border-gold-muted/20 shadow-[0_6px_24px_rgba(139,115,85,0.08)] flex items-center justify-center text-gold-hi mb-3 md:mb-5">
                  {step.icon}
                </div>
                <h3 className={`text-[10px] sm:text-xs md:text-base text-parchment font-bold mb-1 ${isRtl ? 'font-amiri' : 'font-cormorant font-semibold'}`}>
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ Bottom: Split Layout — Why + Form ═══ */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {/* LEFT: Why a Free Trial — 50% width */}
          <motion.div className={`lg:col-span-1 ${isRtl ? 'lg:order-2' : 'lg:order-1'}`} variants={itemVariants}>
            {/* Tag badge */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-parchment border border-gold-muted/20 text-midnight mb-6 relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:30px_30px] opacity-[0.03] pointer-events-none" />
              <div className="relative z-10 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-gold-hi animate-pulse shrink-0" />
                <span className={`text-[10px] md:text-xs uppercase tracking-widest font-bold text-navy leading-normal ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {tagOverride || activeContent.tag}
                </span>
              </div>
            </div>

            <h3 className={`text-[clamp(24px,3.5vw,36px)] text-parchment font-bold mb-8 ${isRtl ? 'font-amiri font-bold leading-[1.4]' : 'font-cormorant font-semibold leading-[1.2]'}`}>
              {whyTitleOverride || activeContent.whyTitle}
            </h3>

            {/* Benefits list — premium cards */}
            <div className="space-y-3.5 mb-10">
              {activeContent.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gold-muted/12 hover:border-gold/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 text-midnight"
                  initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + idx * 0.08, type: 'spring', stiffness: 80 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold-hi shrink-0 mt-0.5">
                    {benefit.icon}
                  </div>
                  <span className={`text-sm text-[#3A332A]/85 leading-relaxed font-normal ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-parchment border border-gold-muted/20 text-midnight relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:30px_30px] opacity-[0.03] pointer-events-none" />
              {activeContent.stats.map((stat, idx) => (
                <div key={idx} className="text-center relative z-10">
                  <div className={`text-lg font-bold text-navy leading-none mb-1 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-[9px] uppercase tracking-wider text-stone/60 font-semibold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust seal */}
            <div className="mt-6 flex items-center gap-3 opacity-60">
              <img src="/logo-new.webp" alt="Academy Seal" className="w-10 h-10 object-contain" />
              <p className={`text-[11px] text-parchment/60 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora italic'}`}>
                {isRtl ? 'مجازون بسند متصل من الأزهر الشريف' : locale === 'fr' ? 'Certifiés par Al-Azhar Al-Sharif' : 'Certified under Al-Azhar Al-Sharif'}
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Booking Form — 50% width */}
          <motion.div className={`lg:col-span-1 ${isRtl ? 'lg:order-1' : 'lg:order-2'} w-full`} variants={itemVariants}>
            <div className="bg-white rounded-3xl border border-gold-muted/12 shadow-[0_20px_60px_rgba(139,115,85,0.1)] p-6 md:p-8 relative overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20" />

              {isSuccess ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-14 h-14 bg-gold/10 border border-gold rounded-full flex items-center justify-center text-gold mb-5 animate-pulse">
                    <Sparkles size={24} />
                  </div>
                  <h4 className={`text-lg text-midnight font-bold mb-2 ${isRtl ? 'font-amiri' : 'font-cormorant font-semibold'}`}>
                    {activeContent.successTitle}
                  </h4>
                  <p className={`text-xs text-stone/70 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {activeContent.successDesc}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className={`text-lg text-midnight font-bold mb-0.5 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                    {formTitleOverride || activeContent.formTitle}
                  </h3>
                  <p className={`text-[11px] text-stone/50 mb-6 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {formSubtitleOverride || activeContent.formSubtitle}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Row: First + Last Name */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>{activeContent.firstName}</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                          placeholder={isRtl ? 'عبدالله' : 'Abdullah'} required className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>{activeContent.lastName}</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                          placeholder={isRtl ? 'الفارسي' : 'Al-Farsi'} required className={inputClass} />
                      </div>
                    </div>

                    {/* Row: Email + Age */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label htmlFor="email" className={labelClass}>{activeContent.email}</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                          placeholder="hello@example.com" required className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="age" className={labelClass}>{activeContent.age}</label>
                        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange}
                          placeholder="25" min="4" max="99" required className={inputClass} />
                      </div>
                    </div>

                    {/* Row: Gender + Preferred Teacher */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>{activeContent.gender}</label>
                        <div className="flex gap-1.5">
                          {(['male', 'female'] as const).map((g) => (
                            <button key={g} type="button"
                              onClick={() => setFormData({ ...formData, gender: g })}
                              className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${formData.gender === g
                                ? 'bg-navy text-parchment border-navy shadow-sm'
                                : 'bg-white text-stone/70 border-gold-muted/20 hover:border-gold/30'
                                }`}
                            >
                              {g === 'male' ? activeContent.male : activeContent.female}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>{activeContent.preferredTeacher}</label>
                        <div className="flex gap-1.5">
                          {(['any', 'male', 'female'] as const).map((t) => (
                            <button key={t} type="button"
                              onClick={() => setFormData({ ...formData, preferredTeacher: t })}
                              className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${formData.preferredTeacher === t
                                ? 'bg-navy text-parchment border-navy shadow-sm'
                                : 'bg-white text-stone/70 border-gold-muted/20 hover:border-gold/30'
                                }`}
                            >
                              {t === 'any' ? activeContent.any : t === 'male' ? activeContent.male : activeContent.female}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row: Course */}
                    <div>
                      <label htmlFor="course" className={labelClass}>{activeContent.course}</label>
                      <div className="relative">
                        <select id="course" name="course" value={formData.course} onChange={handleChange} required
                          title={activeContent.course}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>{activeContent.course}</option>
                          {activeContent.courses.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                        <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-stone/30 pointer-events-none ${isRtl ? 'left-3' : 'right-3'}`} />
                      </div>
                    </div>

                    {/* Row: Country (auto-detected) + WhatsApp */}
                    <div className="grid grid-cols-5 gap-3">
                      {/* Country — auto-detected with flag */}
                      <div className="col-span-2">
                        <label className={labelClass}>{activeContent.countryLabel}</label>
                        <div className={`flex items-center gap-2 bg-parchment/40 border border-gold-muted/15 py-2.5 px-3.5 rounded-xl ${isRtl ? 'font-noto' : 'font-dm'}`}>
                          <span className="text-lg leading-none">{country.flag}</span>
                          <span className="text-[13px] text-midnight/80 font-medium truncate">{country.name}</span>
                        </div>
                        <input type="hidden" name="country" value={formData.country} />
                      </div>
                      {/* WhatsApp with dial code */}
                      <div className="col-span-3">
                        <label htmlFor="whatsapp" className={labelClass}>{activeContent.whatsapp}</label>
                        <div className="relative">
                          <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1 text-[12px] text-stone/50 font-semibold pointer-events-none ${isRtl ? 'right-3' : 'left-3'} ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                            <span className="text-sm">{country.flag}</span>
                            <span>{country.dial}</span>
                          </div>
                          <input type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                            placeholder={isRtl ? '5XXXXXXXX' : '5XXXXXXXX'}
                            title={activeContent.whatsapp}
                            className={`${inputClass} ${isRtl ? 'pr-20' : 'pl-20'}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row: Message */}
                    <div>
                      <label htmlFor="message" className={labelClass}>{activeContent.message}</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={2}
                        placeholder={activeContent.messagePlaceholder}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={isSubmitting}
                      className="w-full btn-gold py-3.5 rounded-xl text-[13px] uppercase tracking-wider font-bold cursor-pointer inline-flex items-center justify-center gap-2 shadow-lg shadow-gold/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 mt-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          <span>{isRtl ? 'جاري الإرسال...' : 'Submitting...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{btnSubmitOverride || activeContent.btnSubmit}</span>
                          {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
