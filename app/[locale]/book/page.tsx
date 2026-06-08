'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, Loader2, Sparkles } from 'lucide-react';

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
});

type FormData = z.infer<typeof formSchema>;

export default function BookPage() {
  const t = useTranslations('Booking');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    },
  });

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
    if (currentStep === 4) fieldsToValidate = ['studentName', 'studentEmail', 'studentAge', 'studentGoals'];

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
    <section className="bg-navy-deep min-h-screen pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
      {/* Background Star pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:120px_120px] opacity-[0.02] pointer-events-none" />

      <div className="max-w-3xl w-full px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className={`text-title text-parchment font-bold mb-2 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {t('title')}
          </h1>
          <p className={`text-xs text-parchment/60 ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {t('subtitle')}
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-12 relative">
          {/* Connector bar behind circles */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold-muted/20 -translate-y-1/2 z-0" />
          
          {steps.map((s) => {
            const isActive = currentStep === s.number;
            const isCompleted = currentStep > s.number;
            
            let circleClass = '';
            if (isActive) {
              circleClass = 'bg-gold text-navy-deep ring-4 ring-gold/20 font-bold';
            } else if (isCompleted) {
              circleClass = 'bg-gold/20 border border-gold text-gold-hi font-semibold';
            } else {
              circleClass = 'bg-navy border border-gold-muted/20 text-parchment/30';
            }

            return (
              <div key={s.number} className="flex flex-col items-center z-10 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${circleClass}`}>
                  {isCompleted ? <Check size={14} /> : s.number}
                </div>
                <span className={`hidden sm:block text-[9px] uppercase tracking-wider mt-2.5 font-semibold text-center max-w-[80px] ${
                  isActive ? 'text-gold' : isCompleted ? 'text-gold-hi' : 'text-parchment/30'
                } ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container Card */}
        <div className="bg-navy rounded-none border border-gold-muted/15 p-8 sm:p-10 shadow-2xl shadow-midnight/50 relative">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gold/10 border border-gold rounded-full flex items-center justify-center text-gold mb-6 shadow-inner animate-pulse">
                  <Sparkles size={28} />
                </div>
                <h2 className={`text-heading text-gold-hi font-bold mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
                  {t('successTitle')}
                </h2>
                <p className={`text-sm text-parchment/70 leading-relaxed max-w-md ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {t('successDesc')}
                </p>
              </motion.div>
            ) : (
              /* Form Steps */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* STEP 1: Program Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    className="space-y-6"
                  >
                    <h3 className={`text-base font-bold text-gold-hi mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
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
                           className={`flex items-start gap-4 p-5 rounded-none border cursor-pointer transition-all duration-200 ${
                            selectedProgram === item.id
                              ? 'bg-navy-deep border-gold text-parchment shadow-md shadow-midnight/35'
                              : 'bg-navy-deep/45 border-gold-muted/15 text-parchment/70 hover:border-gold/30'
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
                            selectedProgram === item.id ? 'border-gold' : 'border-gold-muted/40'
                          }`}>
                            {selectedProgram === item.id && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-parchment leading-tight">
                              {item.title}
                            </p>
                            <p className="text-xs text-parchment/40 mt-1.5">
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
                    className="space-y-8"
                  >
                    <div>
                      <h3 className={`text-base font-bold text-gold-hi mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
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
                            className={`p-4 rounded-none border text-center cursor-pointer transition-all duration-200 block text-xs font-semibold ${
                              selectedFrequency === item.id
                                ? 'bg-navy-deep border-gold text-parchment shadow-md shadow-midnight/35'
                                : 'bg-navy-deep/45 border-gold-muted/15 text-parchment/60 hover:border-gold/30'
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
                      <h3 className={`text-base font-bold text-gold-hi mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
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
                            className={`p-4 rounded-none border text-center cursor-pointer transition-all duration-200 block text-xs font-semibold ${
                              selectedDuration === item.id
                                ? 'bg-navy-deep border-gold text-parchment shadow-md shadow-midnight/35'
                                : 'bg-navy-deep/45 border-gold-muted/15 text-parchment/60 hover:border-gold/30'
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
                    className="space-y-6"
                  >
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider text-gold-hi mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {t('timeZone')}
                      </label>
                      <input
                        type="text"
                        {...register('timezone')}
                        className="w-full bg-navy-deep border border-gold-muted/20 text-parchment p-3.5 rounded-none text-sm focus:outline-none focus:border-gold focus:ring-3 focus:ring-gold/12"
                      />
                      {errors.timezone && (
                        <p className="text-red-500 text-xs mt-1">{errors.timezone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider text-gold-hi mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
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
                            className={`p-4 rounded-none border text-center cursor-pointer transition-all duration-200 block text-xs font-semibold ${
                              selectedGender === item.id
                                ? 'bg-navy-deep border-gold text-parchment shadow-md shadow-midnight/35'
                                : 'bg-navy-deep/45 border-gold-muted/15 text-parchment/60 hover:border-gold/30'
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
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider text-gold-hi mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          {t('studentName')}
                        </label>
                        <input
                          type="text"
                          placeholder="Abdullah Al-Farsi"
                          {...register('studentName')}
                          className="w-full bg-navy-deep border border-gold-muted/20 text-parchment p-3.5 rounded-none text-sm focus:outline-none focus:border-gold focus:ring-3 focus:ring-gold/12"
                        />
                        {errors.studentName && (
                          <p className="text-red-500 text-xs mt-1">{t('validationName')}</p>
                        )}
                      </div>

                      <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider text-gold-hi mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          {t('studentEmail')}
                        </label>
                        <input
                          type="email"
                          placeholder="student@example.com"
                          {...register('studentEmail')}
                          className="w-full bg-navy-deep border border-gold-muted/20 text-parchment p-3.5 rounded-none text-sm focus:outline-none focus:border-gold focus:ring-3 focus:ring-gold/12"
                        />
                        {errors.studentEmail && (
                          <p className="text-red-500 text-xs mt-1">{t('validationEmail')}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider text-gold-hi mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
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
                            className={`p-4 rounded-none border text-center cursor-pointer transition-all duration-200 block text-xs font-semibold ${
                              selectedAge === item.id
                                ? 'bg-navy-deep border-gold text-parchment shadow-md shadow-midnight/35'
                                : 'bg-navy-deep/45 border-gold-muted/15 text-parchment/60 hover:border-gold/30'
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
                      <label className={`block text-xs font-bold uppercase tracking-wider text-gold-hi mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {t('studentGoals')}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={t('goalsPlaceholder')}
                        {...register('studentGoals')}
                        className="w-full bg-navy-deep border border-gold-muted/20 text-parchment p-3.5 rounded-none text-sm focus:outline-none focus:border-gold focus:ring-3 focus:ring-gold/12 resize-none"
                      />
                      {errors.studentGoals && (
                        <p className="text-red-500 text-xs mt-1">{t('validationGoals')}</p>
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
                    className="space-y-6"
                  >
                    <h3 className={`text-base font-bold text-gold-hi mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {t('step5')}
                    </h3>

                    {/* Summary Board */}
                    <div className="bg-navy-deep border border-gold-muted/15 rounded-none p-6 space-y-4 text-sm text-parchment/80">
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-parchment/40">{t('step1')}</span>
                        <span className="font-semibold capitalize">{watch('program')}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-parchment/40">{t('frequency')} & {t('duration')}</span>
                        <span className="font-semibold">{watch('frequency')} • {watch('duration')}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-parchment/40">{t('preferredGender')}</span>
                        <span className="font-semibold capitalize">{watch('genderPreference')}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold-muted/10 pb-3">
                        <span className="text-parchment/40">{t('studentName')}</span>
                        <span className="font-semibold">{watch('studentName')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-parchment/40">{t('studentEmail')}</span>
                        <span className="font-semibold">{watch('studentEmail')}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-none bg-gold/5 border border-gold/10 flex items-start gap-3">
                      <Sparkles size={16} className="text-gold mt-0.5 shrink-0" />
                      <p className="text-[11px] text-gold-hi/80 leading-normal">
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
                      className={`flex items-center gap-2 text-xs font-semibold text-parchment/65 hover:text-gold transition-colors duration-200 focus:outline-none cursor-pointer ${
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
                      className={`btn-gold px-6 py-3 rounded-none text-xs uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2`}
                    >
                      <span>{t('btnNext')}</span>
                      {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-gold px-8 py-3.5 rounded-none text-xs uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2`}
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
