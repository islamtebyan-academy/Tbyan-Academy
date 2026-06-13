'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Check, Calendar, RotateCcw, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingTeaser() {
  const t = useTranslations('Pricing');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [classDuration, setClassDuration] = useState<'30' | '45' | '60'>('30');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const prices = {
    '30': {
      starter: { monthly: 10, quarterly: 27 },
      optimal: { monthly: 20, quarterly: 54 },
      intensive: { monthly: 30, quarterly: 81 }
    },
    '45': {
      starter: { monthly: 15, quarterly: 40.5 },
      optimal: { monthly: 30, quarterly: 81 },
      intensive: { monthly: 45, quarterly: 121.5 }
    },
    '60': {
      starter: { monthly: 20, quarterly: 54 },
      optimal: { monthly: 40, quarterly: 108 },
      intensive: { monthly: 60, quarterly: 162 }
    }
  };

  const labels = {
    ar: {
      equivalent: 'ما يعادل',
      perMonth: 'شهرياً',
      save: 'وفر',
      cycle: 'لكل دورة',
      durationUnit: 'دقيقة',
      perSessionUnit: 'الحصة الفردية',
      billingCycleLabel: 'خطة الدفع والفوترة',
      durationLabel: 'مدة الحصة الفردية',
      monthlyLabel: 'دفع شهري',
      quarterlyLabel: 'دفع ربع سنوي (توفير 10%)',
    },
    en: {
      equivalent: 'equiv.',
      perMonth: 'month',
      save: 'Save',
      cycle: 'per cycle',
      durationUnit: 'mins',
      perSessionUnit: 'private class',
      billingCycleLabel: 'Billing Cycle',
      durationLabel: 'Class Duration',
      monthlyLabel: 'Monthly Billing',
      quarterlyLabel: 'Quarterly Billing (Save 10%)',
    },
    fr: {
      equivalent: 'équiv.',
      perMonth: 'mois',
      save: 'Économisez',
      cycle: 'par cycle',
      durationUnit: 'min',
      perSessionUnit: 'séance privée',
      billingCycleLabel: 'Billing Cycle',
      durationLabel: 'Durée du cours',
      monthlyLabel: 'Facturation Mensuelle',
      quarterlyLabel: 'Facturation Trimestrielle (-10%)',
    }
  };

  const l = labels[locale as keyof typeof labels] || labels.en;

  const packages = [
    {
      id: 'starter' as const,
      name: t('starterName'),
      desc: t('starterDesc'),
      frequency: isRtl ? 'حصة واحدة أسبوعياً' : '1 session per week',
      features: isRtl
        ? ['4 حصص خاصة شهرياً', 'معلم أزهري مجاز متصل السند', 'تعديل مرن ومستمر للمواعيد', 'دعم فني وتنسيق كامل للأوقات']
        : ['4 private sessions / month', 'Certified Azhari tutor', 'Flexible reschedule policy', 'Full coordinator support'],
      featured: false,
    },
    {
      id: 'optimal' as const,
      name: t('optimalName'),
      desc: t('optimalDesc'),
      frequency: isRtl ? 'حصتان أسبوعياً' : '2 sessions per week',
      features: isRtl
        ? ['8 حصص خاصة شهرياً', 'معلم أزهري مجاز متصل السند', 'تعديل مرن ومستمر للمواعيد', 'دعم فني وتنسيق كامل للأوقات', 'أولوية اختيار وتثبيت الأوقات المفضلة']
        : ['8 private sessions / month', 'Certified Azhari tutor', 'Flexible reschedule policy', 'Full coordinator support', 'Priority schedule selection'],
      featured: true,
    },
    {
      id: 'intensive' as const,
      name: t('intensiveName'),
      desc: t('intensiveDesc'),
      frequency: isRtl ? '3 حصص أسبوعياً' : '3 sessions per week',
      features: isRtl
        ? ['12 حصة خاصة شهرياً', 'معلم أزهري مجاز متصل السند', 'تعديل مرن ومستمر للمواعيد', 'دعم فني وتنسيق كامل للأوقات', 'أولوية اختيار وتثبيت الأوقات المفضلة', 'تقارير أداء ومتابعة شهرية مفصلة من المعلم']
        : ['12 private sessions / month', 'Certified Azhari tutor', 'Flexible reschedule policy', 'Full coordinator support', 'Priority schedule selection', 'Detailed monthly progress reports'],
      featured: false,
    },
  ];

  const getPackagePrice = (pkgId: 'starter' | 'optimal' | 'intensive') => {
    const pkgPrices = prices[classDuration][pkgId];
    const sessionsPerMonth = pkgId === 'starter' ? 4 : pkgId === 'optimal' ? 8 : 12;
    
    if (billingCycle === 'monthly') {
      const amount = pkgPrices.monthly;
      const rate = (amount / sessionsPerMonth).toFixed(2);
      return {
        amount: `$${amount}`,
        perSession: `$${rate}`,
        savings: null
      };
    } else {
      const amount = pkgPrices.quarterly;
      const rate = (amount / (sessionsPerMonth * 3)).toFixed(2);
      const perMonthEquiv = (amount / 3).toFixed(1);
      const originalQuarterly = pkgPrices.monthly * 3;
      const savings = originalQuarterly - amount;
      return {
        amount: `$${amount}`,
        perSession: `$${rate}`,
        savings: `${l.equivalent} $${perMonthEquiv}/${l.perMonth} (${l.save} $${savings})`
      };
    }
  };

  return (
    <section className="bg-ivory py-24 border-b border-gold-muted/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-xs uppercase tracking-widest text-gold font-bold mb-3 ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
          >
            {t('title')}
          </span>
          <h2
            className={`text-title text-midnight font-bold max-w-2xl mx-auto mb-4 ${
              isRtl ? 'font-amiri' : 'font-cormorant'
            }`}
          >
            {isRtl ? 'خطط اشتراك مدروسة وقيمة عادلة ومضمونة' : 'Honest Pricing, Academic Value'}
          </h2>
          <p
            className={`text-sm text-[#3A332A] max-w-xl mx-auto leading-relaxed font-normal description-justify ${
              isRtl ? 'font-noto' : 'font-lora'
            }`}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Dynamic Switchers */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16 relative z-20">
          {/* Duration Switcher */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className={`text-[10px] uppercase tracking-wider text-stone font-bold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
              {l.durationLabel}
            </span>
            <div className="bg-[#FDFAF3] border border-gold-muted/20 p-1.5 rounded-full flex gap-1 shadow-md shadow-midnight/3">
              {[
                { value: '30', label: isRtl ? '30 دقيقة' : '30 Mins' },
                { value: '45', label: isRtl ? '45 دقيقة' : '45 Mins' },
                { value: '60', label: isRtl ? '60 دقيقة' : '60 Mins' }
              ].map((dur) => (
                <button
                  key={dur.value}
                  onClick={() => setClassDuration(dur.value as any)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    classDuration === dur.value
                      ? 'bg-gradient-to-r from-gold via-gold-hi to-gold text-navy-brand shadow-sm font-bold'
                      : 'text-navy-brand/70 hover:text-gold'
                  } ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Divider on Desktop */}
          <div className="hidden md:block w-[1px] h-12 bg-gold-muted/20 self-end mb-1" />

          {/* Billing Cycle Switcher */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className={`text-[10px] uppercase tracking-wider text-stone font-bold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
              {l.billingCycleLabel}
            </span>
            <div className="bg-[#FDFAF3] border border-gold-muted/20 p-1.5 rounded-full flex gap-1 shadow-md shadow-midnight/3">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-gold via-gold-hi to-gold text-navy-brand shadow-sm font-bold'
                    : 'text-navy-brand/70 hover:text-gold'
                } ${isRtl ? 'font-cairo' : 'font-dm'}`}
              >
                {l.monthlyLabel}
              </button>
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'quarterly'
                    ? 'bg-gradient-to-r from-gold via-gold-hi to-gold text-navy-brand shadow-sm font-bold'
                    : 'text-navy-brand/70 hover:text-gold'
                } ${isRtl ? 'font-cairo' : 'font-dm'}`}
              >
                <span>{l.quarterlyLabel}</span>
                <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full animate-pulse">
                  -10%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg, index) => {
            const pricing = getPackagePrice(pkg.id);
            return (
              <motion.div
                key={pkg.id}
                className={`rounded-[2rem] p-8 md:p-10 border flex flex-col justify-between relative overflow-hidden transition-all duration-500 group text-start ${
                  pkg.featured
                    ? 'bg-gradient-to-br from-[#162742] via-[#122038] to-[#091521] border-gold-hi/35 shadow-2xl text-parchment shadow-navy-sapphire/35 -translate-y-2 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(34,49,75,0.45)]'
                    : 'bg-gradient-to-br from-white to-ivory/45 border-gold-muted/15 text-midnight hover:border-gold hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(139,115,85,0.12)]'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Decorative top-accent gold line */}
                <div className={`absolute top-0 left-0 right-0 h-[3.5px] z-20 ${
                  pkg.featured
                    ? 'bg-gradient-to-r from-gold via-gold-hi to-gold'
                    : 'bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300'
                }`} />

                {pkg.featured && (
                  <div className="absolute top-0 right-0 bg-gold text-[#122038] text-[9px] uppercase tracking-widest font-extrabold py-1.5 px-4 rounded-bl-xl z-20">
                    {isRtl ? 'موصى به' : 'Recommended'}
                  </div>
                )}

                {/* Logo watermark background overlay */}
                <div className={`absolute right-6 bottom-6 w-24 h-24 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat transition-all duration-700 pointer-events-none z-0 ${
                  pkg.featured
                    ? 'opacity-[0.04] group-hover:opacity-[0.09] filter invert brightness-200'
                    : 'opacity-[0.05] group-hover:opacity-[0.1]'
                }`} />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Plan Name */}
                    <h3
                      className={`text-sm font-bold mb-4 uppercase tracking-widest ${
                        pkg.featured ? 'text-gold-champagne' : 'text-gold'
                      } ${isRtl ? 'font-cairo' : 'font-dm'}`}
                    >
                      {pkg.name}
                    </h3>

                    {/* Price Display */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className={`text-4xl lg:text-5xl font-bold font-cormorant ${pkg.featured ? 'text-parchment' : 'text-midnight'}`}>
                        {pricing.amount}
                      </span>
                      <span className={`text-xs ${pkg.featured ? 'text-parchment/60' : 'text-stone'} ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        / {billingCycle === 'monthly' ? l.perMonth : l.cycle}
                      </span>
                    </div>

                    {/* Savings Label */}
                    <div className="min-h-[20px] mb-6">
                      {pricing.savings && (
                        <span className={`text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold ${
                          isRtl ? 'font-cairo' : 'font-dm'
                        }`}>
                          {pricing.savings}
                        </span>
                      )}
                    </div>

                    {/* Session Description */}
                    <div className={`text-xs mb-6 pb-6 border-b border-gold-muted/10 ${pkg.featured ? 'text-parchment/75' : 'text-stone'} ${isRtl ? 'font-noto' : 'font-lora'}`}>
                      <p className="font-bold mb-1">
                        {pkg.frequency} • {classDuration === '30' ? (isRtl ? '30 دقيقة' : '30 mins') : classDuration === '45' ? (isRtl ? '45 دقيقة' : '45 mins') : (isRtl ? '60 دقيقة' : '60 mins')}
                      </p>
                      <p className="opacity-80">
                        ({pricing.perSession} / {isRtl ? 'الحصة الفردية' : 'private class'})
                      </p>
                    </div>

                    <p className={`text-sm mb-8 leading-relaxed min-h-[48px] description-justify-start ${pkg.featured ? 'text-parchment/80' : 'text-[#3A332A]/80 font-normal'} ${isRtl ? 'font-noto' : 'font-lora'}`}>
                      {pkg.desc}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs leading-normal">
                          <Check size={14} className={`shrink-0 mt-0.5 ${pkg.featured ? 'text-gold-champagne' : 'text-gold'}`} />
                          <span className={pkg.featured ? 'text-parchment/90' : 'text-[#3A332A]/85 font-normal'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <Link
                    href={`/${locale}/book`}
                    className={`w-full text-center py-4 rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 block z-20 relative hover:scale-[1.02] active:scale-[0.98] ${
                      pkg.featured
                        ? 'btn-gold shadow-md shadow-midnight/5'
                        : 'border border-gold text-gold hover:bg-navy-brand hover:text-parchment hover:border-navy-brand shadow-sm'
                    } ${isRtl ? 'font-cairo' : 'font-dm'}`}
                  >
                    {t('bookTrialBtn')}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Protection Policies section */}
        <div className="border-t border-gold-muted/15 pt-16 grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 text-start">
          {/* Policy 1 */}
          <div className={`flex gap-4 px-4 ${isRtl ? 'md:border-l border-gold-muted/20' : 'md:border-r border-gold-muted/20'}`}>
            <Calendar className="text-gold w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <h4 className={`text-sm font-bold text-midnight mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {t('pausingPolicy')}
              </h4>
              <p className={`text-sm text-[#3A332A]/80 leading-relaxed font-normal ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {t('pausingPolicyDesc')}
              </p>
            </div>
          </div>

          {/* Policy 2 */}
          <div className={`flex gap-4 px-4 ${isRtl ? 'md:border-l border-gold-muted/20' : 'md:border-r border-gold-muted/20'}`}>
            <RotateCcw className="text-gold w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <h4 className={`text-sm font-bold text-midnight mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {t('makeupPolicy')}
              </h4>
              <p className={`text-sm text-[#3A332A]/80 leading-relaxed font-normal ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {t('makeupPolicyDesc')}
              </p>
            </div>
          </div>

          {/* Policy 3 */}
          <div className="flex gap-4 px-4">
            <ShieldCheck className="text-gold w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <h4 className={`text-sm font-bold text-midnight mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {t('trialRefundPolicy')}
              </h4>
              <p className={`text-sm text-[#3A332A]/80 leading-relaxed font-normal ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {t('trialRefundPolicyDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
