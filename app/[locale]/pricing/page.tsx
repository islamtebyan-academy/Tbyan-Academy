'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  Check,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Calendar,
  RotateCcw,
  Lock,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ParallaxBackground from '@/components/ui/ParallaxBackground';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function PricingPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [classDuration, setClassDuration] = useState<'30' | '45' | '60'>('30');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  const content = {
    ar: {
      hero: {
        tag: 'رسوم شفافة وقيمة عادلة',
        title: 'الاشتراكات والخطط الدراسية',
        subtitle: 'صمم مسارك التعليمي المخصص دون التزامات طويلة الأجل. باقات مرنة تدعم ضبط التلقي وصيانة السند على يد نخبة من علماء الأزهر الشريف.',
      },
      billing: {
        monthly: 'دفع شهري',
        quarterly: 'دفع ربع سنوي (توفير 10%)',
        perMonth: 'شهرياً',
        equivalent: 'ما يعادل',
        save: 'وفر',
        cycle: 'لكل دورة',
      },
      packages: [
        {
          id: 'starter' as const,
          name: 'الاشتراك الأساسي (تأسيس)',
          desc: 'مثالي للطلاب الراغبين في دراسة خفيفة مع الحفاظ على وتيرة تلقي منتظمة وضبط مستمر.',
          frequency: 'حصة واحدة أسبوعياً',
          features: ['4 حصص خاصة شهرياً', 'معلم أزهري مجاز متصل السند', 'تعديل مرن ومستمر للمواعيد', 'دعم فني وتنسيق كامل للأوقات'],
        },
        {
          id: 'optimal' as const,
          name: 'الاشتراك القياسي (موصى به)',
          desc: 'الخيار الأكاديمي الأفضل لتثبيت الحفظ، ودراسة قواعد اللغة العربية، وبناء تحصيل شرعي متكامل ومستمر.',
          frequency: 'حصتان أسبوعياً',
          features: ['8 حصص خاصة شهرياً', 'معلم أزهري مجاز متصل السند', 'تعديل مرن ومستمر للمواعيد', 'دعم فني وتنسيق كامل للأوقات', 'أولوية اختيار وتثبيت الأوقات المفضلة'],
          featured: true,
        },
        {
          id: 'intensive' as const,
          name: 'الاشتراك المكثف (نخبة)',
          desc: 'مصمم لطلاب العلم المتفرغين الراغبين في تسريع وتيرة الحفظ أو الحصول على الإجازات والأسانيد المتصلة.',
          frequency: '3 حصص أسبوعياً',
          features: ['12 حصة خاصة شهرياً', 'معلم أزهري مجاز متصل السند', 'تعديل مرن ومستمر للمواعيد', 'دعم فني وتنسيق كامل للأوقات', 'أولوية اختيار وتثبيت الأوقات المفضلة', 'تقارير أداء ومتابعة شهرية مفصلة من المعلم'],
        }
      ],
      custom: {
        title: 'هل تحتاج لجدولة مخصصة أو باقة عائلية؟',
        desc: 'نقدم خصماً عائلياً قدره 10% عند تسجيل فردين أو أكثر من نفس العائلة. كما يمكننا توفير حصص بمدد زمنية مخصصة (مثلاً 30 دقيقة للأطفال الصغار) أو ترددات أسبوعية مختلفة تناسب وتيرة يومك.',
        btn: 'طلب عرض سعر مخصص',
      },
      policies: {
        title: 'سياسات الحماية والضمان الأكاديمي',
        subtitle: 'نضمن حقوق الطالب بالكامل لنوفر بيئة تعليمية آمنة ومريحة تركز على التحصيل المعرفي.',
        items: [
          {
            title: 'الإيقاف المؤقت للاشتراك',
            desc: 'يمكنك تعليق اشتراكك مؤقتاً لمدة تصل إلى 30 يوماً خلال العام عند السفر أو الانشغال دون خسارة مواعيدك المفضلة أو معلمك المعين.',
          },
          {
            title: 'إعادة الجدولة والتعويض',
            desc: 'يمكنك طلب إعادة جدولة أي حصة مجاناً قبل موعدها بـ 24 ساعة على الأقل. سيتم تعويض الحصة بالكامل بالتنسيق مع المعلم.',
          },
          {
            title: 'الحصة التجريبية وضمان الرضا',
            desc: 'حصتك الأولى تقييمية ومجانية بالكامل. في حال الاشتراك وعدم الرضا التام بعد الحصة الأولى المدفوعة، يحق لك استرداد كامل المبلغ فوراً.',
          }
        ]
      },
      faq: {
        title: 'الأسئلة الشائعة حول الاشتراكات',
        subtitle: 'إجابات واضحة ومباشرة عن كافة التساؤلات المالية والأكاديمية المتعلقة بالتسجيل.',
        items: [
          {
            q: 'كيف يتم معالجة الدفع وهل بياناتي آمنة؟',
            a: 'تتم معالجة جميع عمليات الدفع بشكل آمن ومشفر بالكامل 100% عبر بوابات دفع عالمية معتمدة (مثل Stripe أو PayPal أو بطاقات الائتمان المباشرة). لا تقوم الأكاديمية بتخزين أي معلومات متعلقة ببطاقتك المصرفية على خوادمنا.',
          },
          {
            q: 'هل يمكنني تغيير الباقة أو إلغاؤها لاحقاً؟',
            a: 'نعم بالتأكيد. يمكنك ترقية باقتك، أو خفضها، أو إلغاء الاشتراك بالكامل في أي وقت تشاء دون شروط جزائية أو عقود ملزمة. التعديل يبدأ فوراً من دورة الفوترة التالية.',
          },
          {
            q: 'ماذا يحدث إذا ألغى المدرس الحصة أو تأخر؟',
            a: 'في الحالات النادرة التي يضطر فيها المدرس للاعتذار عن حصة، يتم تعويض الطالب بالكامل بحصة بديلة في موعد يختاره، أو إضافتها كرصيد للحساب. التزام المدرسين بالوقت يقع تحت تدقيق رقابي صارم.',
          },
          {
            q: 'هل هناك خصومات خاصة لتسجيل الإخوة أو العائلات؟',
            a: 'نعم، يسعدنا تقديم خصم دائم بنسبة 10% للطفل الثاني أو أي فرد إضافي مسجل من نفس العائلة لتبسيط ودعم عملية التحصيل المشترك داخل البيت المسلم.',
          },
          {
            q: 'ما هي طريقة تعويض الحصص الفائتة؟',
            a: 'عند اعتذار الطالب عن حصة قبل موعدها بـ 24 ساعة على الأقل، يتم جدولة حصة تعويضية مجانية. للحفاظ على انتظام العملية التعليمية وتنسيق أوقات المعلمين، لا يمكن تعويض الحصص التي يتم إلغاؤها دون إشعار مسبق.',
          }
        ]
      },
      cta: {
        title: 'احجز جلسة تقييم مجانية بالكامل الآن',
        subtitle: 'ابدأ اليوم بلقاء تقييمي مجاني لتحديد مستواك الأكاديمي، واختيار الباقة المناسبة، ووضع الخطة الدراسية المناسبة لأهدافك.',
        btn: 'احجز جلسة التقييم الآن',
        btnCourses: 'استكشف المسارات التعليمية',
      }
    },
    en: {
      hero: {
        tag: 'Transparent Fees & Academic Value',
        title: 'Academic Memberships',
        subtitle: 'Design your custom learning path without long-term commitments. Flexible plans to master Quran, Arabic, and Islamic sciences under Azhari scholars.',
      },
      billing: {
        monthly: 'Monthly Billing',
        quarterly: 'Quarterly Billing (Save 10%)',
        perMonth: 'month',
        equivalent: 'equiv.',
        save: 'Save',
        cycle: 'per cycle',
      },
      packages: [
        {
          id: 'starter' as const,
          name: 'Starter Plan (Foundations)',
          desc: 'Perfect for students seeking light study commitment while maintaining consistent direct feedback.',
          frequency: '1 session per week',
          features: ['4 private sessions / month', 'Certified Azhari tutor', 'Flexible reschedule policy', 'Full coordinator support'],
        },
        {
          id: 'optimal' as const,
          name: 'Optimal Plan (Recommended)',
          desc: 'The best academic pace to solidify memorization, master Arabic rules, and maintain structured religious studies.',
          frequency: '2 sessions per week',
          features: ['8 private sessions / month', 'Certified Azhari tutor', 'Flexible reschedule policy', 'Full coordinator support', 'Priority schedule selection'],
          featured: true,
        },
        {
          id: 'intensive' as const,
          name: 'Intensive Plan (Elite)',
          desc: 'Designed for dedicated seekers aiming to accelerate memorization or obtain certified chains of transmission (Ijazat).',
          frequency: '3 sessions per week',
          features: ['12 private sessions / month', 'Certified Azhari tutor', 'Flexible reschedule policy', 'Full coordinator support', 'Priority schedule selection', 'Detailed monthly progress reports'],
        }
      ],
      custom: {
        title: 'Need a Custom Schedule or Family Plan?',
        desc: 'We offer a permanent 10% discount when registering two or more family members. We can also accommodate custom lesson lengths (such as 30 minutes for kids) or custom weekly frequencies that suit your schedule.',
        btn: 'Request Custom Quote',
      },
      policies: {
        title: 'Protection & Guarantee Policies',
        subtitle: 'We protect student rights fully to provide a secure and focused learning environment.',
        items: [
          {
            title: 'Flexible Freeze Option',
            desc: 'Pause your subscription for up to 30 days per calendar year due to travel or exams without losing your preferred schedule or tutor.',
          },
          {
            title: 'Makeup Classes',
            desc: 'Reschedule any private session for free with at least 24 hours advance notice. We guarantee full makeup coordination.',
          },
          {
            title: 'Satisfaction Refund',
            desc: 'Your first session is a free trial. After that, if you are not fully satisfied during your first paid month, receive a full refund.',
          }
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Clear, direct answers to standard billing and academic questions.',
        items: [
          {
            q: 'How are payments processed and is my card secure?',
            a: 'All transactions are 100% securely processed and encrypted via industry-leading gateways (Stripe, PayPal, or major credit cards). The academy never stores your credit card numbers on its servers.',
          },
          {
            q: 'Can I change or cancel my plan later?',
            a: 'Yes, absolutely. You can upgrade, downgrade, or cancel your membership at any time with no penalties. Changes take effect on the next billing cycle.',
          },
          {
            q: 'What happens if the teacher cancels a class?',
            a: 'In the rare event that a teacher cancels or is late, you are fully credited for that session, and a makeup class will be arranged at your convenience.',
          },
          {
            q: 'Are there discounts for siblings or families?',
            a: 'Yes! We support family learning by offering a permanent 10% discount for siblings or additional family members registered on the platform.',
          },
          {
            q: 'How does the makeup policy work for student absences?',
            a: 'If you notify us at least 24 hours in advance of an absence, the session is preserved and rescheduled. Sessions missed without notice cannot be compensated to respect the tutor’s dedicated time slot.',
          }
        ]
      },
      cta: {
        title: 'Book Your Free Assessment Today',
        subtitle: 'Start with a complimentary Zoom assessment to map your current level, choose your optimal package, and set your study plan.',
        btn: 'Schedule Assessment Now',
        btnCourses: 'Explore Academic Programs',
      }
    },
    fr: {
      hero: {
        tag: 'Frais Transparents & Valeur Académique',
        title: 'Abonnements Académiques',
        subtitle: 'Concevez votre cursus personnalisé sans engagement à long terme. Des plans flexibles pour maîtriser le Coran, l\'arabe et les sciences sous des savants d\'Al-Azhar.',
      },
      billing: {
        monthly: 'Facturation Mensuelle',
        quarterly: 'Facturation Trimestrielle (Économisez 10%)',
        perMonth: 'mois',
        equivalent: 'équiv.',
        save: 'Économisez',
        cycle: 'par cycle',
      },
      packages: [
        {
          id: 'starter' as const,
          name: 'Plan Tassees (Bases)',
          desc: 'Parfait pour les étudiants qui souhaitent un rythme léger tout en conservant un suivi direct régulier.',
          frequency: '1 séance par semaine',
          features: ['4 séances privées / mois', 'Tuteur diplômé d\'Al-Azhar', 'Politique de report flexible', 'Soutien complet du coordinateur'],
        },
        {
          id: 'optimal' as const,
          name: 'Plan Optimal (Recommandé)',
          desc: 'Le rythme idéal pour consolider la mémorisation, maîtriser la grammaire arabe et structurer vos études religieuses.',
          frequency: '2 séances par semaine',
          features: ['8 séances privées / mois', 'Tuteur diplômé d\'Al-Azhar', 'Politique de report flexible', 'Soutien complet du coordinateur', 'Sélection prioritaire des horaires'],
          featured: true,
        },
        {
          id: 'intensive' as const,
          name: 'Plan Intensif (Élite)',
          desc: 'Conçu pour les étudiants dévoués visant à accélérer la mémorisation ou obtenir des Ijazat.',
          frequency: '3 séances par semaine',
          features: ['12 séances privées / mois', 'Tuteur diplômé d\'Al-Azhar', 'Politique de report flexible', 'Soutien complet du coordinateur', 'Sélection prioritaire des horaires', 'Rapports mensuels de progression détaillés'],
        }
      ],
      custom: {
        title: 'Besoin d\'un horaire sur mesure ou d\'un plan familial ?',
        desc: 'Nous offrons une réduction permanente de 10% à partir du deuxième membre inscrit de la même famille. Nous pouvons également adapter la durée des leçons (par exemple, 30 minutes pour les enfants) ou le nombre de cours hebdomadaires.',
        btn: 'Demander un devis personnalisé',
      },
      policies: {
        title: 'Politiques de Garantie Académique',
        subtitle: 'Nous protégeons pleinement les droits des étudiants pour offrir un environnement d\'apprentissage serein.',
        items: [
          {
            title: 'Gel Flexible',
            desc: 'Suspendez votre abonnement jusqu\'à 30 jours par an en cas de voyage ou d\'examens sans perdre vos horaires réservés ni votre tuteur.',
          },
          {
            title: 'Cours de Rattrapage',
            desc: 'Repoussez gratuitement tout cours privé avec un préavis minimum de 24 heures. Nous garantissons le rattrapage du cours.',
          },
          {
            title: 'Remboursement de Satisfaction',
            desc: 'Votre premier cours est un essai gratuit. Par la suite, si vous n\'êtes pas pleinement satisfait lors du premier mois payé, nous remboursons les frais.',
          }
        ]
      },
      faq: {
        title: 'Questions Fréquemment Posées',
        subtitle: 'Des réponses claires et précises à vos questions financières et académiques.',
        items: [
          {
            q: 'Comment les paiements sont-ils traités et mes données sont-elles sécurisées ?',
            a: 'Toutes les transactions sont traitées de manière 100% sécurisée et cryptée via des passerelles de paiement de renommée mondiale (Stripe, PayPal ou cartes bancaires). L\'académie ne stocke jamais vos numéros de carte.',
          },
          {
            q: 'Puis-je modifier ou annuler mon abonnement plus tard ?',
            a: 'Oui, absolument. Vous pouvez augmenter, réduire ou résilier votre abonnement à tout moment sans frais ni engagement. Les modifications prennent effet au cycle suivant.',
          },
          {
            q: 'Que se passe-t-il si l\'enseignant annule un cours ?',
            a: 'Dans le cas rare où l\'enseignant annule, le cours est intégralement crédité à votre compte et un rattrapage est planifié selon vos convenances.',
          },
          {
            q: 'Y a-t-il des réductions pour les familles ou frères et sœurs ?',
            a: 'Oui ! Nous encourageons l\'apprentissage familial avec une réduction permanente de 10% pour tout membre supplémentaire de la famille inscrit sur la plateforme.',
          },
          {
            q: 'Comment fonctionne le rattrapage en cas d\'absence de l\'élève ?',
            a: 'Si vous nous informez au moins 24 heures à l\'avance, le cours est conservé et reporté. Les cours manqués sans préavis ne sont pas compensés pour respecter le créneau bloqué du tuteur.',
          }
        ]
      },
      cta: {
        title: 'Réservez Votre Évaluation Gratuite Aujourd\'hui',
        subtitle: 'Démarrez par un entretien Zoom gratuit pour évaluer votre niveau, choisir votre formule et planifier votre programme personnalisé.',
        btn: 'Planifier Mon Évaluation',
        btnCourses: 'Découvrir Nos Programmes',
      }
    }
  };

  const activeContent = content[locale as keyof typeof content] || content.en;

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
        savings: `${activeContent.billing.equivalent} $${perMonthEquiv}/${activeContent.billing.perMonth} (${activeContent.billing.save} $${savings})`
      };
    }
  };

  return (
    <article className="relative min-h-screen bg-ivory text-ink overflow-x-hidden">

      {/* ── SECTION 1: HERO HEADER (DARK - 100vh / min-h-screen) ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-36 pb-20 overflow-hidden">
        {/* Parallax Background */}
        <ParallaxBackground src="/images/about-us-bg.webp" className="md:bg-[length:100%_100%]" />

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/85 via-midnight/65 to-[#091521] pointer-events-none z-0" />

        {/* Stars decoration */}
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:120px_120px] opacity-[0.035] filter invert pointer-events-none z-0" />

        <motion.div 
          className="max-w-6xl mx-auto px-6 w-full relative z-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            className={`inline-block text-xs uppercase tracking-[0.25em] text-gold-champagne font-bold mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}
            variants={fadeInUp}
          >
            {activeContent.hero.tag}
          </motion.span>
          <motion.h1 
            className={`text-hero text-parchment leading-tight max-w-4xl mx-auto mb-6 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'}`}
            variants={fadeInUp}
          >
            {activeContent.hero.title}
          </motion.h1>
          <motion.p 
            className={`text-sm md:text-base text-parchment/80 leading-relaxed max-w-2xl mx-auto ${isRtl ? 'font-noto' : 'font-lora'}`}
            variants={fadeInUp}
          >
            {activeContent.hero.subtitle}
          </motion.p>
        </motion.div>

        {/* Bottom luxury divider */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gold-hi/55 via-white/80 via-parchment/65 via-gold-hi/55 to-transparent bg-[length:200%_100%] animate-gold-shimmer" />
        </div>
      </section>

      {/* ── SECTION 2: BILLING & DURATION SWITCHERS + CARDS GRID (LIGHT) ── */}
      <section className="bg-ivory py-24 relative z-10 border-b border-gold-muted/15">
        <div className="max-w-6xl mx-auto px-6">

          {/* Swaps & Toggles */}
          <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16 relative z-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Duration Switcher */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className={`text-[10px] uppercase tracking-wider text-stone font-bold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {isRtl ? 'مدة الحصة الفردية' : 'Class Duration'}
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
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${classDuration === dur.value
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
                {isRtl ? 'خطة الدفع والفوترة' : 'Billing Cycle'}
              </span>
              <div className="bg-[#FDFAF3] border border-gold-muted/20 p-1.5 rounded-full flex gap-1 shadow-md shadow-midnight/3">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${billingCycle === 'monthly'
                      ? 'bg-gradient-to-r from-gold via-gold-hi to-gold text-navy-brand shadow-sm font-bold'
                      : 'text-navy-brand/70 hover:text-gold'
                    } ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  {activeContent.billing.monthly}
                </button>
                <button
                  onClick={() => setBillingCycle('quarterly')}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${billingCycle === 'quarterly'
                      ? 'bg-gradient-to-r from-gold via-gold-hi to-gold text-navy-brand shadow-sm font-bold'
                      : 'text-navy-brand/70 hover:text-gold'
                    } ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  <span>{activeContent.billing.quarterly}</span>
                  <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full animate-pulse">
                    -10%
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Pricing Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {activeContent.packages.map((pkg, index) => {
              const pricing = getPackagePrice(pkg.id);
              return (
                <motion.div
                  key={pkg.id}
                  className={`rounded-[2rem] p-8 md:p-10 border flex flex-col justify-between relative overflow-hidden transition-all duration-500 group text-start ${pkg.featured
                      ? 'bg-gradient-to-br from-[#162742] via-[#122038] to-[#091521] border-gold-hi/35 shadow-2xl text-parchment'
                      : 'bg-gradient-to-br from-white to-[#FDFAF3]/60 border-gold-muted/15 text-midnight'
                    }`}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: pkg.featured ? -12 : -6, 
                    scale: 1.015,
                    boxShadow: pkg.featured 
                      ? "0 25px 60px rgba(26,43,71,0.35)" 
                      : "0 20px 50px rgba(139,115,85,0.1)"
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Decorative gold accent header line */}
                  <div className={`absolute top-0 left-0 right-0 h-[3.5px] z-20 ${pkg.featured
                      ? 'bg-gradient-to-r from-gold via-gold-hi to-gold'
                      : 'bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300'
                    }`} />

                  {pkg.featured && (
                    <div className="absolute top-0 right-0 bg-gold text-[#122038] text-[9px] uppercase tracking-widest font-extrabold py-1.5 px-4 rounded-bl-xl z-20">
                      {isRtl ? 'موصى به' : 'Recommended'}
                    </div>
                  )}

                  {/* Watermark Logo */}
                  <div className={`absolute right-6 bottom-6 w-24 h-24 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat transition-all duration-700 pointer-events-none z-0 ${pkg.featured
                      ? 'opacity-[0.04] group-hover:opacity-[0.09] filter invert brightness-200'
                      : 'opacity-[0.05] group-hover:opacity-[0.1]'
                    }`} />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Package Title */}
                      <h3 className={`text-sm font-bold mb-4 uppercase tracking-widest ${pkg.featured ? 'text-gold-champagne' : 'text-gold'
                        } ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {pkg.name}
                      </h3>

                      {/* Pricing Amount */}
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className={`text-4xl lg:text-5xl font-bold font-cormorant ${pkg.featured ? 'text-parchment' : 'text-midnight'}`}>
                          {pricing.amount}
                        </span>
                        <span className={`text-xs ${pkg.featured ? 'text-parchment/60' : 'text-stone'} ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          / {billingCycle === 'monthly' ? activeContent.billing.perMonth : activeContent.billing.cycle}
                        </span>
                      </div>

                      {/* Savings Label */}
                      <div className="min-h-[20px] mb-6">
                        {pricing.savings && (
                          <span className={`text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold ${isRtl ? 'font-cairo' : 'font-dm'
                            }`}>
                            {pricing.savings}
                          </span>
                        )}
                      </div>

                      {/* Subtitle details */}
                      <div className={`text-xs mb-6 pb-6 border-b border-gold-muted/10 ${pkg.featured ? 'text-parchment/75' : 'text-stone'} ${isRtl ? 'font-noto' : 'font-lora'}`}>
                        <p className="font-bold mb-1">
                          {pkg.frequency} • {classDuration === '30' ? (isRtl ? '30 دقيقة' : '30 mins') : classDuration === '45' ? (isRtl ? '45 دقيقة' : '45 mins') : (isRtl ? '60 دقيقة' : '60 mins')}
                        </p>
                        <p className="opacity-80">
                          ({pricing.perSession} / {isRtl ? 'الحصة الفردية' : 'private class'})
                        </p>
                      </div>

                      {/* Paragraph info */}
                      <p className={`text-xs mb-8 leading-relaxed min-h-[48px] ${pkg.featured ? 'text-parchment/70' : 'text-stone'} ${isRtl ? 'font-noto' : 'font-lora'}`}>
                        {pkg.desc}
                      </p>

                      {/* Features */}
                      <ul className="space-y-4 mb-8">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs leading-normal">
                            <Check size={14} className={`shrink-0 mt-0.5 ${pkg.featured ? 'text-gold-champagne' : 'text-gold'}`} />
                            <span className={pkg.featured ? 'text-parchment/80' : 'text-stone/90'}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Booking Link wrapper for micro-scale */}
                    <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }} className="w-full">
                      <Link
                        href={`/${locale}/book`}
                        className={`w-full text-center py-4 rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 block z-20 relative ${pkg.featured
                            ? 'btn-gold shadow-md shadow-midnight/5'
                            : 'border border-gold text-gold hover:bg-navy-brand hover:text-parchment hover:border-navy-brand shadow-sm'
                          } ${isRtl ? 'font-cairo' : 'font-dm'}`}
                      >
                        {isRtl ? 'احجز حصة تقييم مجانية' : 'Book Free Trial'}
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Custom Plan request panel */}
          <motion.div 
            className="bg-gradient-to-br from-white to-[#FDFAF3]/70 border border-gold-muted/20 rounded-3xl p-8 md:p-10 shadow-lg text-start flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Shimmer top border */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="space-y-3 max-w-3xl">
              <h3 className={`text-lg md:text-xl font-bold text-midnight flex items-center gap-2.5 ${isRtl ? 'font-amiri' : 'font-cormorant font-semibold'}`}>
                <CheckCircle2 size={20} className="text-gold shrink-0" />
                {activeContent.custom.title}
              </h3>
              <p className={`text-xs md:text-sm text-stone leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {activeContent.custom.desc}
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full md:w-auto shrink-0">
              <Link
                href={`/${locale}/contact`}
                className={`btn-gold py-3 px-8 rounded-full text-xs uppercase tracking-wider font-bold block text-center ${isRtl ? 'font-cairo' : 'font-dm'
                  }`}
              >
                {activeContent.custom.btn}
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 3: PROTECTION POLICIES (LIGHT) ── */}
      <section className="bg-[#FDFAF3] py-24 relative z-10 border-b border-gold-muted/15">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span 
              className={`inline-block text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}
              variants={fadeInUp}
            >
              {isRtl ? 'حماية حقوق الطالب' : 'GUARANTEED RIGHTS'}
            </motion.span>
            <motion.h2 
              className={`text-title text-midnight font-bold mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}
              variants={fadeInUp}
            >
              {activeContent.policies.title}
            </motion.h2>
            <motion.p 
              className={`text-sm text-stone max-w-xl mx-auto mb-16 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}
              variants={fadeInUp}
            >
              {activeContent.policies.subtitle}
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {activeContent.policies.items.map((policy, idx) => {
              const IconComponent = idx === 0 ? Calendar : idx === 1 ? RotateCcw : ShieldCheck;
              return (
                <motion.div
                  key={idx}
                  className="bg-gradient-to-br from-[#162742] via-[#122038] to-[#091521] border border-gold-hi/15 rounded-3xl p-8 text-parchment shadow-xl relative overflow-hidden group hover:border-gold-hi/30 transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(197, 160, 89, 0.45)' }}
                >
                  {/* Watermark icons */}
                  <div className="absolute right-4 bottom-4 text-parchment/[0.02] text-8xl pointer-events-none select-none">
                    <IconComponent className="w-24 h-24" />
                  </div>

                  <div className="p-3 bg-gold-hi/10 border border-gold-hi/25 text-gold-champagne rounded-xl w-fit mb-6">
                    <IconComponent size={20} />
                  </div>

                  <h3 className={`text-heading text-parchment font-bold mb-3 ${isRtl ? 'font-amiri' : 'font-cormorant font-semibold'}`}>
                    {policy.title}
                  </h3>
                  <p className={`text-parchment/75 text-xs leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {policy.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 4: FAQ ACCORDION (LIGHT) ── */}
      <section className="bg-ivory py-24 relative z-10 border-b border-gold-muted/15 text-start">
        <div className="max-w-4xl mx-auto px-6">

          <motion.div 
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span 
              className={`inline-block text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}
              variants={fadeInUp}
            >
              FAQ
            </motion.span>
            <motion.h2 
              className={`text-title text-midnight font-bold mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}
              variants={fadeInUp}
            >
              {activeContent.faq.title}
            </motion.h2>
            <motion.p 
              className={`text-sm text-stone max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}
              variants={fadeInUp}
            >
              {activeContent.faq.subtitle}
            </motion.p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {activeContent.faq.items.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <motion.div
                  key={idx}
                  className="bg-white border border-gold-muted/15 rounded-2xl shadow-sm hover:border-gold/35 transition-all duration-300 overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.008, borderColor: 'rgba(197, 160, 89, 0.3)' }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-start focus:outline-none cursor-pointer"
                  >
                    <span className={`text-sm font-bold text-midnight flex items-center gap-3 ${isRtl ? 'font-cairo' : 'font-dm'
                      }`}>
                      <HelpCircle size={15} className="text-gold shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 border-t border-gold-muted/10 pt-4 bg-ivory/[0.15]">
                          <p className={`text-stone text-xs md:text-sm leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'
                            }`}>
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 5: TRUST BADGES & FINAL CTA ── */}
      <section className="bg-[#FDFAF3] py-24 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">

          {/* Trust Seals strip */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8 mb-12 opacity-80"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-stone text-xs font-semibold font-dm">
              <Lock size={14} className="text-gold" />
              <span>SSL Secure Checkout</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gold-muted/40" />
            <div className="flex items-center gap-2 text-stone text-xs font-semibold font-dm">
              <ShieldCheck size={14} className="text-gold" />
              <span>Azhari Certified Board</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gold-muted/40" />
            <div className="flex items-center gap-2 text-stone text-xs font-semibold font-dm">
              <RotateCcw size={14} className="text-gold" />
              <span>Satisfaction Guarantee</span>
            </div>
          </motion.div>

          {/* CTA Card Container */}
          <motion.div 
            className="bg-gradient-to-br from-[#162742] via-[#22314b] to-[#122038] border border-gold-hi/25 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,43,71,0.25)]"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >

            {/* Top shimmer bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted via-gold-hi to-gold-muted opacity-80" />

            {/* Pattern watermarks */}
            <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:90px_90px] opacity-[0.025] filter invert pointer-events-none" />

            <div className="relative z-10">
              <span className={`inline-block text-xs uppercase tracking-[0.2em] text-gold-champagne font-bold mb-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {isRtl ? 'صرح تبيان الأكاديمي' : 'TEBYAN ACADEMY'}
              </span>

              <h2 className={`text-title lg:text-3xl text-parchment font-bold mb-4 max-w-2xl mx-auto leading-tight ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                {activeContent.cta.title}
              </h2>

              <p className={`text-xs md:text-sm text-parchment/75 max-w-xl mx-auto mb-10 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {activeContent.cta.subtitle}
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {/* Primary CTA (Assessment) */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Link
                    href={`/${locale}/book`}
                    className="btn-gold py-4 px-10 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2.5 transition-all duration-300 w-full sm:w-auto group"
                  >
                    <Sparkles className="w-4 h-4 text-[#22314b] shrink-0" />
                    <span className="whitespace-nowrap">{activeContent.cta.btn}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-3.5 h-3.5 text-[#22314b] shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[#22314b] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </Link>
                </motion.div>

                {/* Secondary CTA (Programs) */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Link
                    href={`/${locale}/programs`}
                    className="border border-gold-hi/35 text-gold-champagne hover:bg-gold-hi/[0.08] hover:border-gold-hi/70 py-4 px-10 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2.5 transition-all duration-300 w-full sm:w-auto group"
                  >
                    <BookOpen className="w-4 h-4 text-gold-champagne shrink-0" />
                    <span className="whitespace-nowrap">{activeContent.cta.btnCourses}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-3.5 h-3.5 text-gold-champagne shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-gold-champagne shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </Link>
                </motion.div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

    </article>
  );
}
