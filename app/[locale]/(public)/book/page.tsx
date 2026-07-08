'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { detectCountry, DEFAULT_COUNTRY } from '@/lib/countries';

const formSchema = z.object({
  program: z.enum(['quran', 'arabic', 'islamic']),
  frequency: z.enum(['1x', '2x', '3x']),
  duration: z.enum(['30min', '45min', '60min']),
  timezone: z.string().min(1, 'Timezone is required'),
  genderPreference: z.enum(['any', 'male', 'female']),
  studentName: z.string().min(2, 'Name must be at least 2 characters'),
  studentEmail: z.string().email('Please enter a valid email address'),
  studentAge: z.enum(['child', 'teen', 'adult']),
  studentGoals: z.string().min(10, 'Please write a brief summary (min 10 characters)'),
  whatsapp: z.string().min(5, 'WhatsApp number is required'),
  country: z.string().min(1, 'Country is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function BookPage() {
  const t = useTranslations('Booking');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  // Form initialization
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program: 'quran',
      frequency: '2x',
      duration: '45min',
      timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC',
      genderPreference: 'any',
      studentName: '',
      studentEmail: '',
      studentAge: 'adult',
      studentGoals: '',
      whatsapp: '',
      country: '',
    },
  });

  useEffect(() => {
    const detected = detectCountry();
    setCountry(detected);
    setValue('country', detected.name);
    setValue('whatsapp', detected.dial + ' ');
  }, [setValue]);

  const selectedProgram = watch('program');
  const selectedFrequency = watch('frequency');
  const selectedDuration = watch('duration');
  const selectedGender = watch('genderPreference');
  const selectedAge = watch('studentAge');

  // Trigger step validations before proceeding
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ['program'];
    if (currentStep === 2) fieldsToValidate = ['frequency', 'duration'];
    if (currentStep === 3) fieldsToValidate = ['timezone', 'genderPreference'];
    if (currentStep === 4) fieldsToValidate = ['studentName', 'studentEmail', 'studentAge', 'studentGoals', 'whatsapp', 'country'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Submit handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error('Booking submission failed');
      }
    } catch (err) {
      console.error('Error submitting booking:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: t('step1') },
    { number: 2, title: t('step2') },
    { number: 3, title: t('step3') },
    { number: 4, title: t('step4') },
    { number: 5, title: t('step5') },
  ];

  return (
    <section className="bg-parchment-fade min-h-screen pt-36 pb-24 relative overflow-hidden flex items-center justify-center">
      {/* Background Star pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-3xl w-full px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className={`inline-block text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'طلب حصة تقييم مجانية' : 'Complimentary Assessment'}
          </span>
          <h1 className={`text-display text-midnight font-bold mb-3 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {t('title')}
          </h1>
          <p className={`text-sm text-stone max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {t('subtitle')}
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-12 relative">
          {/* Connector bar behind circles */}
          <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gold-muted/15 -translate-y-1/2 z-0" />
          
          {steps.map((s) => {
            const isActive = currentStep === s.number;
            const isCompleted = currentStep > s.number;
            
            let circleClass = '';
            if (isActive) {
              circleClass = 'bg-midnight text-gold-hi border border-gold ring-4 ring-gold/15 font-bold shadow-md';
            } else if (isCompleted) {
              circleClass = 'bg-gold text-white border border-gold font-semibold shadow-sm';
            } else {
              circleClass = 'bg-white border border-gold-muted/20 text-stone/40 font-semibold';
            }

            return (
              <div key={s.number} className="flex flex-col items-center z-10 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${circleClass}`}>
                  {isCompleted ? <Check size={14} /> : s.number}
                </div>
                <span className={`hidden sm:block text-[9px] uppercase tracking-wider mt-3 font-bold text-center max-w-[85px] ${
                  isActive ? 'text-gold' : isCompleted ? 'text-midnight/80' : 'text-stone/40'
                } ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container Card */}
        <div className="bg-white border border-gold-muted/15 rounded-[2rem] p-8 sm:p-12 shadow-[0_30px_70px_rgba(139,115,85,0.12)] relative overflow-hidden">
          {/* Shimmer top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20" />
          
          {/* Background watermark logo */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.015] pointer-events-none z-0" />

          <AnimatePresence mode="wait">
            {isSuccess ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 flex flex-col items-center relative z-10"
              >
                <div className="w-16 h-16 bg-gold/10 border border-gold rounded-full flex items-center justify-center text-gold mb-6 shadow-inner animate-pulse">
                  <Sparkles size={28} />
                </div>
                <h2 className={`text-heading text-midnight font-bold mb-4 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'}`}>
                  {t('successTitle')}
                </h2>
                <p className={`text-sm text-stone leading-relaxed max-w-md ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {t('successDesc')}
                </p>
              </motion.div>
            ) : (
              /* Form Steps */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                
                {/* STEP 1: Program Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    className="space-y-6 text-start"
                  >
                    <h3 className={`text-sm font-bold uppercase tracking-wider text-gold mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {t('step1')}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { id: 'quran', title: 'Quran & Tajweed', desc: 'القرآن الكريم والتجويد • Certified Ijaza scholars' },
                        { id: 'arabic', title: 'Classical Arabic', desc: 'اللغة العربية الفصحى • Grammar, reading, and eloquence' },
                        { id: 'islamic', title: 'Islamic Studies', desc: 'العلوم الشرعية • Fiqh, Aqeedah, Tafsir, and Seerah' },
                      ].map((item) => (
                        <label
                           key={item.id}
                           onClick={() => setValue('program', item.id as any)}
                           className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                            selectedProgram === item.id
                              ? 'bg-navy border-gold text-parchment shadow-lg shadow-navy/15'
                              : 'bg-ivory/40 border-gold-muted/15 text-midnight/80 hover:border-gold/30 hover:bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="program"
                            value={item.id}
                            checked={selectedProgram === item.id}
                            onChange={() => {}}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 shrink-0 ${
                            selectedProgram === item.id ? 'border-gold bg-gold/20' : 'border-gold-muted/30 bg-white'
                          }`}>
                            {selectedProgram === item.id && <div className="w-2 h-2 rounded-full bg-gold" />}
                          </div>
                          <div>
                            <p className={`font-bold text-sm leading-tight transition-colors duration-200 ${
                              selectedProgram === item.id ? 'text-gold-hi' : 'text-midnight'
                            }`}>
                              {item.title}
                            </p>
                            <p className={`text-xs mt-1.5 transition-colors duration-200 ${
                              selectedProgram === item.id ? 'text-parchment/65' : 'text-stone/60'
                            }`}>
                              {item.desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Frequency & Duration */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    className="space-y-8 text-start"
                  >
                    <div>
                      <h3 className={`text-sm font-bold uppercase tracking-wider text-gold mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {t('frequency')}
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: '1x', label: isRtl ? 'حصة/أسبوع' : '1x / week' },
                          { id: '2x', label: isRtl ? 'حصتان/أسبوع' : '2x / week' },
                          { id: '3x', label: isRtl ? '3 حصص/أسبوع' : '3x / week' },
                        ].map((item) => (
                          <label
                            key={item.id}
                            onClick={() => setValue('frequency', item.id as any)}
                            className={`p-4 rounded-xl border text-center cursor-pointer transition-all duration-200 block text-xs font-bold ${
                              selectedFrequency === item.id
                                ? 'bg-navy border-gold text-gold-hi shadow-md shadow-navy/10'
                                : 'bg-ivory/40 border-gold-muted/15 text-stone hover:border-gold/30 hover:bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="frequency"
                              value={item.id}
                              checked={selectedFrequency === item.id}
                              onChange={() => {}}
                              className="sr-only"
                            />
                            {item.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-sm font-bold uppercase tracking-wider text-gold mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {t('duration')}
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: '30min', label: '30 mins' },
                          { id: '45min', label: '45 mins' },
                          { id: '60min', label: '60 mins' },
                        ].map((item) => (
                          <label
                            key={item.id}
                            onClick={() => setValue('duration', item.id as any)}
                            className={`p-4 rounded-xl border text-center cursor-pointer transition-all duration-200 block text-xs font-bold ${
                              selectedDuration === item.id
                                ? 'bg-navy border-gold text-gold-hi shadow-md shadow-navy/10'
                                : 'bg-ivory/40 border-gold-muted/15 text-stone hover:border-gold/30 hover:bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="duration"
                              value={item.id}
                              checked={selectedDuration === item.id}
                              onChange={() => {}}
                              className="sr-only"
                            />
                            {item.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Scheduling & Preferences */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    className="space-y-6 text-start"
                  >
                    <div>
                      <label className={`block text-[10px] font-bold uppercase tracking-widest text-stone mb-2.5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {t('timeZone')}
                      </label>
                      <input
                        type="text"
                        {...register('timezone')}
                        className="w-full bg-ivory/40 border border-gold-muted/20 text-midnight p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 placeholder:text-stone/30"
                      />
                      {errors.timezone && (
                        <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.timezone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-[10px] font-bold uppercase tracking-widest text-stone mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {t('preferredGender')}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { id: 'any', label: t('genderAny') },
                          { id: 'male', label: t('genderMale') },
                          { id: 'female', label: t('genderFemale') },
                        ].map((item) => (
                          <label
                            key={item.id}
                            onClick={() => setValue('genderPreference', item.id as any)}
                            className={`p-4 rounded-xl border text-center cursor-pointer transition-all duration-200 block text-xs font-bold ${
                              selectedGender === item.id
                                ? 'bg-navy border-gold text-gold-hi shadow-md shadow-navy/10'
                                : 'bg-ivory/40 border-gold-muted/15 text-stone hover:border-gold/30 hover:bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="genderPreference"
                              value={item.id}
                              checked={selectedGender === item.id}
                              onChange={() => {}}
                              className="sr-only"
                            />
                            {item.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Student Profile */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    className="space-y-5 text-start"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-widest text-stone mb-2.5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          {t('studentName')}
                        </label>
                        <input
                          type="text"
                          placeholder="Abdullah Al-Farsi"
                          {...register('studentName')}
                          className="w-full bg-ivory/40 border border-gold-muted/20 text-midnight p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 placeholder:text-stone/30"
                        />
                        {errors.studentName && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold">{t('validationName')}</p>
                        )}
                      </div>

                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-widest text-stone mb-2.5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          {t('studentEmail')}
                        </label>
                        <input
                          type="email"
                          placeholder="student@example.com"
                          {...register('studentEmail')}
                          className="w-full bg-ivory/40 border border-gold-muted/20 text-midnight p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 placeholder:text-stone/30"
                        />
                        {errors.studentEmail && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold">{t('validationEmail')}</p>
                        )}
                      </div>
                    </div>

                    {/* Row: Country & WhatsApp */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      {/* Country display */}
                      <div className="sm:col-span-2 text-start">
                        <label className={`block text-[10px] font-bold uppercase tracking-widest text-stone mb-2.5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          {t('countryLabel')}
                        </label>
                        <div className={`flex items-center gap-2 bg-ivory/40 border border-gold-muted/20 py-3.5 px-4 rounded-xl text-sm ${isRtl ? 'font-noto' : 'font-dm'}`}>
                          <span className="text-lg leading-none">{country.flag}</span>
                          <span className="text-sm text-midnight/80 font-medium truncate">{country.name}</span>
                        </div>
                        <input type="hidden" {...register('country')} />
                      </div>

                      {/* WhatsApp with flag/dial prefix overlay */}
                      <div className="sm:col-span-3 text-start">
                        <label htmlFor="whatsapp" className={`block text-[10px] font-bold uppercase tracking-widest text-stone mb-2.5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          {t('whatsapp')}
                        </label>
                        <div className="relative">
                          <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1 text-[12px] text-stone/50 font-semibold pointer-events-none ${isRtl ? 'right-3' : 'left-3'} ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                            <span className="text-sm">{country.flag}</span>
                            <span>{country.dial}</span>
                          </div>
                          <input
                            type="tel"
                            id="whatsapp"
                            placeholder="5XXXXXXXX"
                            {...register('whatsapp')}
                            className={`w-full bg-ivory/40 border border-gold-muted/20 text-midnight p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 placeholder:text-stone/30 ${isRtl ? 'pr-20' : 'pl-20'}`}
                          />
                        </div>
                        {errors.whatsapp && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold">{t('validationWhatsapp')}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-[10px] font-bold uppercase tracking-widest text-stone mb-3.5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {t('studentAge')}
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: 'child', label: t('ageChild') },
                          { id: 'teen', label: t('ageTeen') },
                          { id: 'adult', label: t('ageAdult') },
                        ].map((item) => (
                          <label
                            key={item.id}
                            onClick={() => setValue('studentAge', item.id as any)}
                            className={`p-4 rounded-xl border text-center cursor-pointer transition-all duration-200 block text-xs font-bold ${
                              selectedAge === item.id
                                ? 'bg-navy border-gold text-gold-hi shadow-md shadow-navy/10'
                                : 'bg-ivory/40 border-gold-muted/15 text-stone hover:border-gold/30 hover:bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="studentAge"
                              value={item.id}
                              checked={selectedAge === item.id}
                              onChange={() => {}}
                              className="sr-only"
                            />
                            {item.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-[10px] font-bold uppercase tracking-widest text-stone mb-2.5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {t('studentGoals')}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={t('goalsPlaceholder')}
                        {...register('studentGoals')}
                        className="w-full bg-ivory/40 border border-gold-muted/20 text-midnight p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 placeholder:text-stone/30 resize-none"
                      />
                      {errors.studentGoals && (
                        <p className="text-red-500 text-xs mt-1.5 font-semibold">{t('validationGoals')}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: Review & Confirm */}
                {currentStep === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    className="space-y-6 text-start"
                  >
                    <h3 className={`text-sm font-bold uppercase tracking-wider text-gold mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {t('step5')}
                    </h3>

                    {/* Summary Board */}
                    <div className="bg-ivory/50 border border-gold-muted/15 rounded-2xl p-6 space-y-4 text-sm text-midnight/80">
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-stone">{t('step1')}</span>
                        <span className="font-bold capitalize text-midnight">{watch('program')}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-stone">{t('frequency')} & {t('duration')}</span>
                        <span className="font-bold text-midnight">{watch('frequency')} • {watch('duration')}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-stone">{t('preferredGender')}</span>
                        <span className="font-bold capitalize text-midnight">{watch('genderPreference')}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-stone">{t('studentName')}</span>
                        <span className="font-bold text-midnight">{watch('studentName')}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-stone">{t('studentEmail')}</span>
                        <span className="font-bold text-midnight">{watch('studentEmail')}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-stone">{t('whatsapp')}</span>
                        <span className="font-bold text-midnight">{watch('whatsapp')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone">{t('countryLabel')}</span>
                        <span className="font-bold text-midnight">{watch('country')}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gold/5 border border-gold/15 flex items-start gap-3">
                      <Sparkles size={16} className="text-gold mt-0.5 shrink-0" />
                      <p className="text-[11px] text-[#7A5C12] leading-normal font-semibold">
                        {isRtl 
                          ? 'بمجرد التأكيد، سيتم حجز الجلسة وسيتصل بك منسق الأكاديمية خلال 12 ساعة لتحديد موعد البدء وتزويدك ببيانات المعلم ورابط زووم.'
                          : 'Upon confirmation, your trial session is reserved. A coordinator will email you within 12 hours with your assigned scholar, schedule, and Zoom link.'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Form Navigation Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-gold-muted/10 mt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone hover:text-midnight transition-colors duration-200 focus:outline-none cursor-pointer ${
                        isRtl ? 'flex-row-reverse' : ''
                      }`}
                    >
                      {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                      <span>{t('btnBack')}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-gold px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>{t('btnNext')}</span>
                      {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>{isRtl ? 'جاري الإرسال...' : 'Scheduling...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('btnSubmit')}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
