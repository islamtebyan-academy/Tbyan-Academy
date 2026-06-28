'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Check, Calendar, RotateCcw, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingTeaserProps {
  titleOverride?: string;
  subtitleOverride?: string;
  trialRefundPolicyTitleOverride?: string;
  trialRefundPolicyDescOverride?: string;
  pricingPlan1Name?: string;
  pricingPlan1Desc?: string;
  pricingPlan1Feat1?: string;
  pricingPlan1Feat2?: string;
  pricingPlan1Feat3?: string;
  pricingPlan1Feat4?: string;
  pricingPlan1Price30?: string;
  pricingPlan1Price45?: string;
  pricingPlan1Price60?: string;
  pricingPlan2Name?: string;
  pricingPlan2Desc?: string;
  pricingPlan2Feat1?: string;
  pricingPlan2Feat2?: string;
  pricingPlan2Feat3?: string;
  pricingPlan2Feat4?: string;
  pricingPlan2Price30?: string;
  pricingPlan2Price45?: string;
  pricingPlan2Price60?: string;
  pricingPlan3Name?: string;
  pricingPlan3Desc?: string;
  pricingPlan3Feat1?: string;
  pricingPlan3Feat2?: string;
  pricingPlan3Feat3?: string;
  pricingPlan3Feat4?: string;
  pricingPlan3Price30?: string;
  pricingPlan3Price45?: string;
  pricingPlan3Price60?: string;
}

export default function PricingTeaser({
  titleOverride,
  subtitleOverride,
  trialRefundPolicyTitleOverride,
  trialRefundPolicyDescOverride,
  pricingPlan1Name,
  pricingPlan1Desc,
  pricingPlan1Feat1,
  pricingPlan1Feat2,
  pricingPlan1Feat3,
  pricingPlan1Feat4,
  pricingPlan1Price30,
  pricingPlan1Price45,
  pricingPlan1Price60,
  pricingPlan2Name,
  pricingPlan2Desc,
  pricingPlan2Feat1,
  pricingPlan2Feat2,
  pricingPlan2Feat3,
  pricingPlan2Feat4,
  pricingPlan2Price30,
  pricingPlan2Price45,
  pricingPlan2Price60,
  pricingPlan3Name,
  pricingPlan3Desc,
  pricingPlan3Feat1,
  pricingPlan3Feat2,
  pricingPlan3Feat3,
  pricingPlan3Feat4,
  pricingPlan3Price30,
  pricingPlan3Price45,
  pricingPlan3Price60,
}: PricingTeaserProps) {
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
      billingCycleLabel: 'Périodicité',
      durationLabel: 'Durée de la leçon',
      monthlyLabel: 'Facturation Mensuelle',
      quarterlyLabel: 'Facturation Trimestrielle (-10%)',
    }
  };

  const l = labels[locale as keyof typeof labels] || labels.en;

  const packages = [
    {
      id: 'starter' as const,
      name: pricingPlan1Name || t('starterName'),
      desc: pricingPlan1Desc || t('starterDesc'),
      frequency: isRtl ? 'حصة واحدة أسبوعياً' : (locale === 'fr' ? '1 séance par semaine' : '1 session per week'),
      features: [
        pricingPlan1Feat1 || (isRtl ? 'حصة تفاعلية' : (locale === 'fr' ? 'Leçon interactive' : 'Interactive lesson')),
        pricingPlan1Feat2 || (isRtl ? 'تقييم شامل لمهارات النطق والتلاوة' : (locale === 'fr' ? 'Évaluation complète de la récitation' : 'Evaluation of recitation skills')),
        pricingPlan1Feat3 || (isRtl ? 'تقرير تحديد مستوى وخطة مقترحة' : (locale === 'fr' ? 'Rapport de niveau et plan d\'étude' : 'Level report & proposed study plan')),
        pricingPlan1Feat4 || (isRtl ? 'دعم فني وتنسيق كامل للأوقات' : (locale === 'fr' ? 'Support technique et coordination' : 'Full coordinator support')),
      ].filter(Boolean),
      featured: false,
    },
    {
      id: 'optimal' as const,
      name: pricingPlan2Name || t('optimalName'),
      desc: pricingPlan2Desc || t('optimalDesc'),
      frequency: isRtl ? 'حصتان أسبوعياً' : (locale === 'fr' ? '2 séances par semaine' : '2 sessions per week'),
      features: [
        pricingPlan2Feat1 || (isRtl ? 'دروس خاصة فردية (1:1) بالكامل' : (locale === 'fr' ? 'Cours particuliers 100% individuels (1:1)' : 'Strictly 1-on-1 private lessons')),
        pricingPlan2Feat2 || (isRtl ? 'نخبة من شيوخ وعلماء الأزهر الشريف' : (locale === 'fr' ? 'Enseignants diplômés de l\'Université d\'Al-Azhar' : 'Al-Azhar University certified scholars')),
        pricingPlan2Feat3 || (isRtl ? 'متابعة وتقارير دورية للتقدم' : (locale === 'fr' ? 'Rapports et suivis réguliers des progrès' : 'Regular progress reports and logs')),
        pricingPlan2Feat4 || (isRtl ? 'إمكانية تجميد أو تعديل المواعيد' : (locale === 'fr' ? 'Possibilité de suspendre ou modifier les cours' : 'Flexible booking and adjustments')),
      ].filter(Boolean),
      featured: true,
    },
    {
      id: 'intensive' as const,
      name: pricingPlan3Name || t('intensiveName'),
      desc: pricingPlan3Desc || t('intensiveDesc'),
      frequency: isRtl ? '3 حصص أسبوعياً' : (locale === 'fr' ? '3 séances par semaine' : '3 sessions per week'),
      features: [
        pricingPlan3Feat1 || (isRtl ? 'إعداد شامل لنيل الإجازة بالسند المتصل للنبي ﷺ' : (locale === 'fr' ? 'Préparation complète à l\'obtention de l\'Ijazah avec Isnad' : 'Rigorous preparation for connected Isnad')),
        pricingPlan3Feat2 || (isRtl ? 'متابعة وتسميع يومي مكثف' : (locale === 'fr' ? 'Suivi et récitation quotidienne intensive' : 'Intensive daily recitation monitoring')),
        pricingPlan3Feat3 || (isRtl ? 'اختبارات نظرية وعلمية دورية' : (locale === 'fr' ? 'Examens théoriques et pratiques réguliers' : 'Periodic theoretical & practical exams')),
        pricingPlan3Feat4 || (isRtl ? 'أولوية قصوى لتنسيق المواعيد' : (locale === 'fr' ? 'Priorité absolue pour la coordination des horaires' : 'Highest priority scheduling coordination')),
      ].filter(Boolean),
      featured: false,
    },
  ];

  const getPackagePrice = (pkgId: 'starter' | 'optimal' | 'intensive') => {
    const sessionsPerMonth = pkgId === 'starter' ? 4 : pkgId === 'optimal' ? 8 : 12;
    
    // Look up monthly price override from settings props
    let priceSetting: string | undefined;
    if (pkgId === 'starter') {
      priceSetting = classDuration === '30' ? pricingPlan1Price30 : classDuration === '45' ? pricingPlan1Price45 : pricingPlan1Price60;
    } else if (pkgId === 'optimal') {
      priceSetting = classDuration === '30' ? pricingPlan2Price30 : classDuration === '45' ? pricingPlan2Price45 : pricingPlan2Price60;
    } else {
      priceSetting = classDuration === '30' ? pricingPlan3Price30 : classDuration === '45' ? pricingPlan3Price45 : pricingPlan3Price60;
    }

    const staticMonthly = prices[classDuration][pkgId].monthly;
    const baseMonthlyPrice = priceSetting ? parseFloat(priceSetting.replace(/[^0-9.]/g, '')) : staticMonthly;
    const isNumeric = !isNaN(baseMonthlyPrice) && baseMonthlyPrice > 0;

    const finalMonthlyPrice = isNumeric ? baseMonthlyPrice : staticMonthly;
    const finalQuarterlyPrice = finalMonthlyPrice * 3 * 0.9;

    if (billingCycle === 'monthly') {
      const rate = (finalMonthlyPrice / sessionsPerMonth).toFixed(2);
      return {
        amount: `$${finalMonthlyPrice.toFixed(0)}`,
        perSession: `$${rate}/${l.perSessionUnit}`,
        savings: null
      };
    } else {
      const rate = (finalQuarterlyPrice / (sessionsPerMonth * 3)).toFixed(2);
      const perMonthEquiv = (finalQuarterlyPrice / 3).toFixed(0);
      const originalQuarterly = finalMonthlyPrice * 3;
      const savings = originalQuarterly - finalQuarterlyPrice;
      return {
        amount: `$${finalQuarterlyPrice.toFixed(0)}`,
        perSession: `$${rate}/${l.perSessionUnit}`,
        savings: `${l.equivalent} $${perMonthEquiv}/${l.perMonth} (${l.save} $${savings.toFixed(0)})`
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
            {titleOverride || t('title')}
          </span>
          <h2
            className={`text-title text-midnight font-bold max-w-2xl mx-auto mb-4 ${
              isRtl ? 'font-amiri' : 'font-cormorant'
            }`}
          >
            {subtitleOverride || (isRtl ? 'خطط اشتراك مدروسة وقيمة عادلة ومضمونة' : 'Honest Pricing, Academic Value')}
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
                    {isRtl ? 'موصى به' : (locale === 'fr' ? 'Recommandé' : 'Recommended')}
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
                        {pkg.frequency} • {classDuration === '30' ? (isRtl ? '30 دقيقة' : (locale === 'fr' ? '30 min' : '30 mins')) : classDuration === '45' ? (isRtl ? '45 دقيقة' : (locale === 'fr' ? '45 min' : '45 mins')) : (isRtl ? '60 دقيقة' : (locale === 'fr' ? '60 min' : '60 mins'))}
                      </p>
                      <p className="opacity-80">
                        ({pricing.perSession} / {isRtl ? 'الحصة الفردية' : (locale === 'fr' ? 'séance privée' : 'private class')})
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
                {trialRefundPolicyTitleOverride || t('trialRefundPolicy')}
              </h4>
              <p className={`text-sm text-[#3A332A]/80 leading-relaxed font-normal ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {trialRefundPolicyDescOverride || t('trialRefundPolicyDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
