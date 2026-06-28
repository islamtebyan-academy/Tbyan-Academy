import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { createStaticClient } from '@/lib/supabase/server';
import { 
  BookOpen, Award, CheckCircle2, ChevronRight, ChevronLeft,
  ArrowRight, ArrowLeft, Users, Calendar, Clock, Star,
  Compass, Scale, Shield, Feather, Sparkles, Check, ShieldCheck
} from 'lucide-react';

import {
  CourseDbItem,
  OutcomeItem,
  StudyPlanItem,
  COURSES_DATABASE,
  CourseDetailProps,
  getStaticSlug
} from '../data';

export const revalidate = 600;

export async function generateStaticParams() {
  const staticSlugs = [
    'quran-tajweed',
    '10-qiraat',
    'shatibiyyah-durrah',
    'mushaf-script',
    'quranic-sciences-tafsir',
    'waqf-ibtida',
    'arabic-grammar',
    'arabic-literature',
    'alfiya-ibn-malik',
    'islamic-fiqh',
    'islamic-creed',
    'islamic-logic',
    'principles-of-fiqh'
  ];

  try {
    const supabase = createStaticClient();
    const { data: courses } = await supabase
      .from('courses')
      .select('slug');
    
    const dbSlugs = courses?.map(c => c.slug) || [];
    const allSlugs = Array.from(new Set([...staticSlugs, ...dbSlugs]));
    const locales = ['en', 'fr', 'ar'];
    const params: { locale: string; slug: string }[] = [];

    locales.forEach((locale) => {
      allSlugs.forEach((slug) => {
        params.push({ locale, slug });
      });
    });

    return params;
  } catch (error) {
    console.error('Error generating dynamic static params:', error);
    const locales = ['en', 'fr', 'ar'];
    const params: { locale: string; slug: string }[] = [];
    locales.forEach((locale) => {
      staticSlugs.forEach((slug) => {
        params.push({ locale, slug });
      });
    });
    return params;
  }
}

const getCourseIcon = (path: string) => {
  const p = path.toLowerCase();
  if (p.includes('قرآن') || p.includes('quran')) {
    return <Award className="w-5 h-5 text-gold-hi" />;
  } else if (p.includes('عرب') || p.includes('arabic') || p.includes('لغة') || p.includes('لسان') || p.includes('أدب') || p.includes('نحو') || p.includes('صرف') || p.includes('gramm') || p.includes('liter')) {
    return <Feather className="w-5 h-5 text-gold-hi" />;
  } else {
    return <Compass className="w-5 h-5 text-gold-hi" />;
  }
};

const getTrackFromSlug = (slug: string): string => {
  const s = slug.toLowerCase();
  if (['quran-tajweed', '10-qiraat', 'shatibiyyah-durrah', 'mushaf-script', 'quranic-sciences-tafsir', 'waqf-ibtida'].includes(s) || s.includes('quran') || s.includes('tajweed') || s.includes('qiraat') || s.includes('recitation')) {
    return 'quran';
  }
  if (['arabic-grammar', 'arabic-literature', 'alfiya-ibn-malik', 'arabic-philology', 'arabic-metrics', 'creative-writing'].includes(s) || s.includes('arabic') || s.includes('grammar') || s.includes('nahw') || s.includes('linguistics')) {
    return 'arabic';
  }
  if (['islamic-fiqh', 'islamic-creed', 'principles-of-fiqh', 'hadith-sciences', 'seerah', 'islamic-logic'].includes(s) || s.includes('islamic') || s.includes('fiqh') || s.includes('creed') || s.includes('hadith') || s.includes('shariah') || s.includes('aqidah') || s.includes('logic') || s.includes('seerah')) {
    return 'islamic';
  }
  return 'kids';
};

const getTrackTitle = (track: string, locale: string): string => {
  if (locale === 'ar') {
    if (track === 'quran') return 'مسار القرآن الكريم';
    if (track === 'arabic') return 'مسار اللغة العربية';
    if (track === 'islamic') return 'مسار العلوم الشرعية';
    return 'مسار النشء والشباب';
  } else if (locale === 'fr') {
    if (track === 'quran') return 'Parcours Coran';
    if (track === 'arabic') return 'Langue Arabe';
    if (track === 'islamic') return 'Sciences Islamiques';
    return 'Parcours Jeunesse';
  } else {
    if (track === 'quran') return 'Quranic Sciences Path';
    if (track === 'arabic') return 'Classical Arabic Path';
    if (track === 'islamic') return 'Shariah Path';
    return 'Youth Path';
  }
};

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // 1. Fetch course from Supabase
  const supabase = createStaticClient();
  const { data: dbCourse } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single();

  // 2. Fetch static fallback course
  const staticSlug = getStaticSlug(slug);
  const staticCourse = COURSES_DATABASE[locale]?.[staticSlug] || COURSES_DATABASE.en?.[staticSlug];

  let course: CourseDbItem | null = null;

  if (staticCourse) {
    const dbWhatYouLearn = dbCourse?.what_you_learn?.[locale] || dbCourse?.what_you_learn?.en;
    const dbOutcomes = dbCourse?.outcomes?.[locale] || dbCourse?.outcomes?.en;
    const dbStudyPlan = dbCourse?.study_plan?.[locale] || dbCourse?.study_plan?.en;

    course = {
      ...staticCourse,
      title: dbCourse ? (dbCourse.title?.[locale] || dbCourse.title?.en || staticCourse.title) : staticCourse.title,
      tagline: dbCourse ? (dbCourse.short_description?.[locale] || dbCourse.short_description?.en || staticCourse.tagline) : staticCourse.tagline,
      image: dbCourse ? (dbCourse.image_url || staticCourse.image) : staticCourse.image,
      duration: dbCourse ? (dbCourse.duration?.[locale] || dbCourse.duration?.en || staticCourse.duration) : staticCourse.duration,
      importance: dbCourse ? (dbCourse.full_description?.[locale] || dbCourse.full_description?.en || staticCourse.importance) : staticCourse.importance,
      syllabus: dbCourse ? (dbCourse.instructor?.[locale] || dbCourse.instructor?.en || staticCourse.syllabus) : staticCourse.syllabus,
      whatYouLearn: (dbWhatYouLearn && dbWhatYouLearn.length > 0) ? dbWhatYouLearn : staticCourse.whatYouLearn,
      outcomes: (dbOutcomes && dbOutcomes.length > 0) ? dbOutcomes : staticCourse.outcomes,
      studyPlan: (dbStudyPlan && dbStudyPlan.length > 0) ? dbStudyPlan : staticCourse.studyPlan,
    };
  } else if (dbCourse) {
    const track = getTrackFromSlug(dbCourse.slug);
    const dbWhatYouLearn = dbCourse.what_you_learn?.[locale] || dbCourse.what_you_learn?.en || [];
    const dbOutcomes = dbCourse.outcomes?.[locale] || dbCourse.outcomes?.en || [];
    const dbStudyPlan = dbCourse.study_plan?.[locale] || dbCourse.study_plan?.en || [];

    course = {
      title: dbCourse.title?.[locale] || dbCourse.title?.en || '',
      tagline: dbCourse.short_description?.[locale] || dbCourse.short_description?.en || '',
      path: getTrackTitle(track, locale),
      image: dbCourse.image_url || '/images/course_default.png',
      duration: dbCourse.duration?.[locale] || dbCourse.duration?.en || '',
      level: locale === 'ar' ? 'تأصيلي' : (locale === 'fr' ? 'Fondations' : 'Core'),
      syllabus: dbCourse.instructor?.[locale] || dbCourse.instructor?.en || '',
      importance: dbCourse.full_description?.[locale] || dbCourse.full_description?.en || '',
      whatYouLearn: dbWhatYouLearn,
      outcomes: dbOutcomes,
      relatedSlugs: [],
      studyPlan: dbStudyPlan
    };
  }

  if (!course) {
    notFound();
  }

  const isRtl = locale === 'ar';

  const labelsByLocale: Record<string, any> = {
    ar: {
      back: '← العودة لجميع البرامج الدراسية',
      duration: 'مدة المقرر',
      level: 'المستوى الأكاديمي',
      syllabus: 'الكتاب المنهجي',
      delivery: 'نظام التعليم',
      deliveryVal: 'تعليم فردي مباشر 1-on-1',
      importance: 'أهمية هذا المقرر وأبعاده العلمية',
      learnTitle: 'ماذا سيتعلم طالب العلم في هذا المسار؟',
      outcomesTitle: 'مخرجات التعلم والملكات المكتسبة',
      howItWorks: 'منهجية التلقي ونظام الدراسة بالأكاديمية',
      ctaTitle: 'ابدأ تحصيلك العلمي بجلسة تقييم مجانية بالكامل',
      ctaDesc: 'سجل الآن للقاء أحد شيوخنا ومنسقينا الأكاديميين لتحديد مستواك الحالي وتصميم خطتك الدراسية المخصصة وتنسيق مواعيد حصصك الأسبوعية.',
      ctaBtn: 'احجز جلسة التقييم المجانية الآن',
      contactBtn: 'تواصل مع الدعم الأكاديمي',
      relatedTitle: 'مقررات تراثية متممة ذات صلة',
      relatedDesc: 'علوم ومتون شقيقة تدعم حصيلتك وتوسع آفاق الفهم الأصولي واللغوي لديك.',
      relatedBtn: 'تفاصيل المقرر',
      studyPlanTitle: 'المنهج الدراسي والترقي العلمي للمقرر',
      studyPlanDesc: 'تفصيل مراحل التحصيل والمسائل المقررة في هذا المسار الدراسي لتأصيل الفهم المتكامل.',
      milestone: 'المرحلة',
      certificateTitle: 'الإجازة الأكاديمية والشهادة المعتمدة',
      certificateDesc: 'بعد إتمام دراسة المقرر واجتياز الاختبار الشفهي النهائي بنجاح، يمنح الطالب سنداً متصلاً أو شهادة تخرج معتمدة من شيوخنا الأزهريين.',
      certificationBadge: 'إسناد متصل وإجازة شرعية معتمدة'
    },
    en: {
      back: '← Back to Academic Programs',
      duration: 'Course Duration',
      level: 'Academic Level',
      syllabus: 'Core Manual',
      delivery: 'Delivery Method',
      deliveryVal: '1-on-1 Private Live Tuition',
      importance: 'Scholarly Importance of this Course',
      learnTitle: 'Core Curriculum Breakdown',
      outcomesTitle: 'Key Learning Outcomes',
      howItWorks: 'Our Pedagogy & Traditional Recitation',
      ctaTitle: 'Begin Your Scholarly Journey with a Free Assessment',
      ctaDesc: 'Meet with one of our academic coordinators to evaluate your current level, custom-tailor your syllabus, and fix your weekly classes.',
      ctaBtn: 'Schedule Your Free Assessment Now',
      contactBtn: 'Contact Academic Office',
      relatedTitle: 'Complementary Scholarly Courses',
      relatedDesc: 'Sciences and treatises that support your core curriculum and expand your traditional horizons.',
      relatedBtn: 'Course Details',
      studyPlanTitle: 'Academic Curriculum Roadmap',
      studyPlanDesc: 'A detailed breakdown of the modules and stages required to complete this syllabus.',
      milestone: 'Module',
      certificateTitle: 'Academic Certification & Isnad',
      certificateDesc: 'Upon completing the text and passing the final oral examination, the student receives a traditional Ijaza with a connected chain of transmission (Isnad) or a verified graduation certificate.',
      certificationBadge: 'Traditional Verified Ijaza'
    },
    fr: {
      back: "← Retour aux Programmes Académiques",
      duration: "Durée du Cours",
      level: "Niveau Académique",
      syllabus: "Manuel d'Étude",
      delivery: "Format du Cours",
      deliveryVal: "Cours Particulier Direct 1-à-1",
      importance: "Importance Académique de ce Cours",
      learnTitle: "Ce Que Vous Allez Maîtriser",
      outcomesTitle: "Compétences & Objectifs Atteints",
      howItWorks: "Notre Méthodologie & Transmission Traditionnelle",
      ctaTitle: "Commencez par une Évaluation Gratuite",
      ctaDesc: "Rencontrez l'un de nos coordinateurs académiques pour évaluer votre niveau, personnaliser votre programme et fixer vos horaires.",
      ctaBtn: "Réserver Votre Évaluation Gratuite",
      contactBtn: "Contacter le Bureau Académique",
      relatedTitle: "Cours Académiques Complémentaires",
      relatedDesc: "Sciences et traités classiques pour élargir vos horizons théologiques et linguistiques.",
      relatedBtn: "Détails du Cours",
      studyPlanTitle: "Plan d'Études & Progression",
      studyPlanDesc: "Détails des étapes de progression et critères d'évaluation pour terminer ce programme.",
      milestone: "Étape",
      certificateTitle: "Certification Académique & Isnad",
      certificateDesc: "Après avoir terminé le texte et réussi l'examen oral final, l'étudiant reçoit une Ijaza traditionnelle avec Isnad ou un certificat de réussite validé.",
      certificationBadge: "Ijaza Académique Vérifiée"
    }
  };

  const labels = labelsByLocale[locale] || labelsByLocale.en;

  const steps = [
    {
      num: '01',
      title: isRtl ? 'جلسة تقييم مجانية' : (locale === 'fr' ? 'Évaluation Gratuite' : 'Free Assessment'),
      desc: isRtl ? 'جلسة تعارف وتقييم مستوى مدتها 30 دقيقة عبر زووم لتحديد منطلق الدراسة.' : (locale === 'fr' ? 'Une séance Zoom de 30 minutes pour évaluer votre niveau et planifier vos objectifs.' : 'A 30-minute Zoom session to evaluate your current level and custom map your targets.')
    },
    {
      num: '02',
      title: isRtl ? 'اختيار المعلم والجدول' : (locale === 'fr' ? 'Tuteur & Horaires' : 'Tutor & Schedule Match'),
      desc: isRtl ? 'تنسيق كامل للمواعيد واختيار المعلم الأزهري المجاز الأنسب لأهدافك ولغتك.' : (locale === 'fr' ? 'Choisissez vos horaires hebdomadaires et soyez mis en relation avec le tuteur certifié le plus adapté.' : 'Choose your optimal weekly hours and match with the certified scholar best suited for you.')
    },
    {
      num: '03',
      title: isRtl ? 'حصص فردية مباشرة' : (locale === 'fr' ? 'Classes Privées en Direct' : 'Private Live Classes'),
      desc: isRtl ? 'تلقٍ مباشر وصيانة للسند عبر غرف زووم خاصة، مع مرونة تامة في التعديل والتعويض.' : (locale === 'fr' ? 'Transmission directe et interactive via Zoom avec une flexibilité totale de planification.' : 'Direct traditional transmission in private online sessions with full scheduling flexibility.')
    },
    {
      num: '04',
      title: isRtl ? 'متابعة واختبارات' : (locale === 'fr' ? 'Suivi & Évaluation' : 'Tracking & Evaluation'),
      desc: isRtl ? 'تقارير أداء دورية واختبارات فقهية أو قرآنية للحصول على الإجازة المعتمدة.' : (locale === 'fr' ? 'Rapports périodiques et examens finaux menant à une certification ou Ijaza reconnue.' : 'Periodic reports, oral reviews, and traditional exams culminating in verified Ijazat.')
    }
  ];

  const relatedCourses = (course.relatedSlugs || [])
    .map(relSlug => {
      const staticRelSlug = getStaticSlug(relSlug);
      return {
        slug: relSlug,
        data: COURSES_DATABASE[locale]?.[staticRelSlug] || COURSES_DATABASE.en?.[staticRelSlug]
      };
    })
    .filter(item => item.data !== undefined);

  return (
    <article className="relative min-h-screen bg-[#FDFCF9] text-midnight overflow-x-hidden selection:bg-gold-hi/30">
      
      {/* Background elegant pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:110px_110px] opacity-[0.015] pointer-events-none" />

      {/* ── SECTION 1: PRESTIGIOUS MANUSCRIPT HERO (DARK BLUE) ── */}
      <section className="relative pt-44 pb-32 bg-[#22314b] text-white border-b border-gold/20 overflow-hidden">
        
        {/* Subtle geometric star grid */}
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:55px_55px] opacity-[0.03] pointer-events-none" />
        
        {/* Ambient glows */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-gold-hi/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse-slow" />
        <div className="absolute right-10 -bottom-20 w-96 h-96 bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        {/* Thin top gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-hi/40 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-start">
          
          {/* Back button */}
          <div className="mb-12">
            <Link
              href={`/${locale}/programs`}
              className={`inline-flex items-center gap-3 text-xs font-bold text-gold-champagne hover:text-gold transition-colors duration-200 group ${
                isRtl ? 'flex-row-reverse' : ''
              }`}
            >
              <span className="p-1.5 rounded-full border border-gold-muted/30 bg-white/5 transition-transform group-hover:scale-110">
                {isRtl ? <ChevronRight size={14} className="text-gold-hi" /> : <ChevronLeft size={14} className="text-gold-hi" />}
              </span>
              <span className={`tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>{labels.back}</span>
            </Link>
          </div>

          {/* Golden Arched Layout Frame Container */}
          <div className="border border-gold-hi/15 rounded-[2.5rem] bg-white/[0.01] backdrop-blur-sm p-8 md:p-12 relative overflow-hidden shadow-2xl">
            
            {/* Fine ornamental corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold-hi/30" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold-hi/30" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold-hi/30" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold-hi/30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Title and Details */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Pathway Tag */}
                <span className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-extrabold px-4 py-2 rounded-full border border-gold-hi/30 bg-gold-hi/10 text-gold-hi ${
                  isRtl ? 'font-cairo' : 'font-dm'
                }`}>
                  <Sparkles size={11} className="animate-pulse" />
                  <span>{course.path}</span>
                </span>

                {/* Course Main Title */}
                <h1 className={`text-hero leading-tight bg-gradient-to-r from-white via-gold-champagne to-[#FFE0B2] bg-clip-text text-transparent font-bold tracking-tight ${
                  isRtl ? 'font-amiri text-5xl md:text-6xl font-bold' : 'font-cormorant text-4xl md:text-5xl font-bold'
                }`}>
                  {course.title}
                </h1>

                {/* Subtitle / Tagline */}
                <p className={`text-stone/90 text-sm md:text-base max-w-xl font-normal leading-relaxed ${
                  isRtl ? 'font-noto' : 'font-lora italic'
                }`}>
                  {course.tagline}
                </p>

                {/* stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-2xl">
                  
                  <div className="p-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-1 group hover:border-gold-hi/25 hover:bg-white/[0.04] transition-all duration-300">
                    <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                      {labels.duration}
                    </span>
                    <span className={`block text-xs text-gold-champagne font-extrabold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {course.duration}
                    </span>
                  </div>

                  <div className="p-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-1 group hover:border-gold-hi/25 hover:bg-white/[0.04] transition-all duration-300">
                    <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                      {labels.level}
                    </span>
                    <span className={`block text-xs text-white font-extrabold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {course.level}
                    </span>
                  </div>

                  <div className="p-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-1 group hover:border-gold-hi/25 hover:bg-white/[0.04] transition-all duration-300">
                    <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                      {labels.syllabus}
                    </span>
                    <span className={`block text-xs text-white font-extrabold truncate ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {course.syllabus}
                    </span>
                  </div>

                  <div className="p-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-1 group hover:border-gold-hi/25 hover:bg-white/[0.04] transition-all duration-300">
                    <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                      {labels.delivery}
                    </span>
                    <span className={`block text-xs text-gold-hi font-extrabold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {labels.deliveryVal}
                    </span>
                  </div>

                </div>

              </div>

              {/* Right Column: Hero Image Frame */}
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-[2.5rem] p-3 bg-gradient-to-br from-gold-hi/20 via-white/5 to-transparent border border-white/[0.08] shadow-[0_30px_70px_rgba(0,0,0,0.6)] group">
                  
                  {/* Decorative golden window outline */}
                  <div className="absolute inset-1.5 border border-gold-hi/20 rounded-[2.3rem] pointer-events-none z-10 transition-colors duration-300 group-hover:border-gold-hi/40" />

                  {/* Main image */}
                  <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-navy-deep">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                    />
                    
                    {/* Dark bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#22314b] via-transparent to-transparent pointer-events-none" />
                    
                    {/* Logo watermark */}
                    <div className="absolute right-4 bottom-4 w-12 h-12 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.12] filter invert pointer-events-none" />
                  </div>

                  {/* Ambient backdrop glow */}
                  <div className="absolute -inset-2 bg-gold-hi/5 rounded-[2.8rem] filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: PATHWAY EDITORIAL DETAILS (PARCHMENT / LIGHT) ── */}
      <section className="py-24 bg-[#FDFAF3] border-b border-gold-muted/12 relative z-10 text-start">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Scholarly Importance Description */}
            <div className="lg:col-span-7 space-y-12">
              
              <div className="p-8 md:p-10 bg-white border border-gold-muted/15 rounded-[2rem] shadow-[0_15px_45px_rgba(139,115,85,0.03)] space-y-6 relative overflow-hidden">
                {/* Background art details */}
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-[url('/images/pattern-8star.svg')] bg-contain bg-no-repeat opacity-[0.01] pointer-events-none" />
                
                <div className="flex items-center gap-3.5 pb-4 border-b border-gold-muted/10">
                  <Compass className="w-5 h-5 text-gold-hi shrink-0" />
                  <h2 className={`text-sm font-bold uppercase tracking-wider text-midnight ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {labels.importance}
                  </h2>
                </div>

                {/* Dropped cap styling for premium scholarly manuscript look */}
                <p className={`text-sm md:text-base text-[#3E3831] leading-relaxed text-justify ${
                  isRtl 
                    ? 'font-noto first-letter:text-4xl first-letter:font-bold first-letter:text-gold-hi first-letter:float-right first-letter:ml-3' 
                    : 'font-lora first-letter:text-4xl first-letter:font-bold first-letter:text-gold-hi first-letter:float-left first-letter:mr-3'
                }`}>
                  {course.importance}
                </p>
              </div>

              {/* Curriculum Grid: What you learn */}
              {course.whatYouLearn && course.whatYouLearn.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3.5 pb-3 border-b border-gold-muted/10">
                    <BookOpen className="w-5 h-5 text-gold-hi shrink-0" />
                    <h2 className={`text-sm font-bold uppercase tracking-wider text-midnight ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {labels.learnTitle}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.whatYouLearn.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gold-muted/10 hover:border-gold/30 hover:bg-white/80 transition-all duration-300 group shadow-sm"
                      >
                        <span className="w-7 h-7 rounded-full bg-gold/5 border border-gold-muted/20 flex items-center justify-center text-[10px] text-gold-hi font-extrabold shrink-0 mt-0.5 select-none transition-all duration-300 group-hover:bg-[#0B132B] group-hover:text-gold-champagne group-hover:border-gold-hi">
                          {idx + 1}
                        </span>
                        <span className={`text-xs text-[#3E3831] leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar outcomes panel and certificate */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Outcomes Panel */}
              {course.outcomes && course.outcomes.length > 0 && (
                <div className="bg-gradient-to-br from-white to-[#FDFAF3] border border-gold-muted/15 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 pb-3 border-b border-gold-muted/10 mb-6">
                    <Award className="w-5 h-5 text-gold-hi shrink-0" />
                    <h2 className={`text-sm font-bold uppercase tracking-wider text-midnight ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {labels.outcomesTitle}
                    </h2>
                  </div>
                  
                  <ul className="space-y-6">
                    {course.outcomes.map((out, idx) => (
                      <li key={idx} className="space-y-1.5 group text-start">
                        <div className="flex items-center gap-2.5">
                          <span className="p-1 rounded-full bg-gold/10 border border-gold/25 text-gold-hi transition-transform duration-300 group-hover:scale-110">
                            <Check size={11} className="stroke-[3]" />
                          </span>
                          <span className={`text-xs font-bold text-midnight ${isRtl ? 'font-cairo' : 'font-dm'}`}>{out.title}</span>
                        </div>
                        <p className={`text-[11px] text-[#554E45] leading-relaxed pl-7 rtl:pl-0 rtl:pr-7 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                          {out.desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prestigious Certification Mock-up (Traditional Arched Border) */}
              <div className="bg-[#22314b] text-white border border-gold/25 rounded-3xl p-7 relative overflow-hidden shadow-xl group">
                <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:40px_40px] opacity-[0.02] pointer-events-none" />
                
                {/* Certification Badge */}
                <span className={`absolute top-4 right-4 text-[8px] uppercase tracking-widest font-extrabold text-gold-hi border border-gold-hi/30 bg-gold-hi/10 px-2.5 py-1 rounded-full ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {labels.certificationBadge}
                </span>
                
                <h3 className={`text-sm font-bold text-gold-champagne mb-3 mt-4 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {labels.certificateTitle}
                </h3>
                <p className={`text-[11px] text-[#A6ADB8] leading-relaxed mb-6 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {labels.certificateDesc}
                </p>

                {/* Ornamental border representation */}
                <div className="border border-gold-hi/20 rounded-2xl p-4 bg-white/[0.02] relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-hi/30" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-hi/30" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-hi/30" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-hi/30" />
                  
                  <div className="text-center py-2 space-y-2">
                    <span className="block text-[8px] uppercase tracking-[0.2em] text-gold-hi/60 font-bold font-dm">
                      ACADEMY SANAD LICENSE
                    </span>
                    <span className="block text-xs font-amiri text-gold-champagne font-bold">
                      شَهَادَةُ إِجَازَةٍ بِالسَّنَدِ الْمُتَّصِلِ
                    </span>
                    <span className="block text-[7px] text-stone/50 font-dm">
                      AZHARI SCHOLARLY SUPERVISION
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-muted/30 to-transparent my-4" />
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-gold-hi transition-transform duration-500 group-hover:rotate-12">
                    <Award size={14} />
                  </div>
                  <span className={`text-[10px] text-stone/80 font-bold uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {isRtl ? 'مستند بالتلقي الشفهي المباشر' : 'Verified via Oral Recitation'}
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: VISUAL TIMELINE ROADMAP (PREMIUM DARK BLOCK) ── */}
      {course.studyPlan && course.studyPlan.length > 0 && (
        <section className="py-24 bg-[#22314b] text-white relative z-10 border-t border-b border-gold/20 overflow-hidden text-start">
          <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:65px_65px] opacity-[0.025] pointer-events-none" />
          <div className="absolute -right-40 -top-40 w-96 h-96 bg-gold-hi/5 rounded-full filter blur-[100px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Header */}
            <div className="text-center mb-20 space-y-3">
              <span className={`text-xs uppercase tracking-[0.2em] text-gold font-bold block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {labels.milestone}
              </span>
              <h2 className={`text-title text-gold-champagne font-bold ${isRtl ? 'font-amiri text-4xl' : 'font-cormorant text-4xl'}`}>
                {labels.studyPlanTitle}
              </h2>
              <p className={`text-xs text-stone/60 max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {labels.studyPlanDesc}
              </p>
            </div>

            {/* Connected Vertical Timeline Layout */}
            <div className="relative max-w-4xl mx-auto">
              
              {/* central alignment line */}
              <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[1.5px] bg-gradient-to-b from-gold-hi/10 via-gold/40 to-gold-hi/10 -translate-x-1/2" />

              <div className="space-y-12">
                {course.studyPlan.map((step, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div key={idx} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0`}>
                      
                      {/* timeline node badge */}
                      <div className="absolute top-6 left-6 md:left-1/2 w-9 h-9 rounded-full bg-[#22314b] border border-gold-hi text-gold-hi flex items-center justify-center -translate-x-1/2 z-20 font-bold font-dm shadow-[0_0_12px_rgba(212,168,67,0.25)] transition-all duration-300 group-hover:scale-110">
                        <span className="text-xs">0{idx + 1}</span>
                      </div>

                      {/* Timeline card container */}
                      <div className={`w-full md:w-[45%] ${isEven ? 'md:pl-8' : 'md:pr-8'} pl-12 md:pl-0`}>
                        <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-gold-hi/45 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group hover:shadow-[0_15px_40px_rgba(212,168,67,0.08)]">
                          
                          {/* Shimmer top line */}
                          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-hi to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                          
                          {/* Large fading watermark step number */}
                          <div className={`absolute -right-4 -bottom-6 text-[80px] font-bold text-gold-hi/[0.01] group-hover:text-gold-hi/[0.035] transition-colors duration-300 pointer-events-none select-none leading-none ${isRtl ? 'font-cairo' : 'font-cormorant'}`}>
                            0{idx + 1}
                          </div>

                          <span className={`inline-block text-[9px] uppercase tracking-wider text-gold-hi/80 font-bold mb-2 font-dm`}>
                            {labels.milestone} 0{idx + 1}
                          </span>
                          
                          <h3 className={`text-sm font-bold text-white mb-2 group-hover:text-gold-champagne transition-colors duration-200 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                            {step.title}
                          </h3>
                          
                          <p className={`text-[11px] text-[#A6ADB8] leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      {/* empty spacer for alignment */}
                      <div className="hidden md:block w-[45%]" />

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ── SECTION 4: HOW THE ACADEMY WORKS (TRADITIONAL PEDAGOGY) ── */}
      <section className="py-24 bg-[#FDFAF3] relative z-10 border-b border-gold-muted/12 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <span className={`text-xs uppercase tracking-widest text-gold font-bold mb-3 block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'نظام ومنهجية التلقي' : 'OUR PEDAGOGY'}
          </span>
          <h2 className={`text-title text-midnight font-bold mb-16 ${isRtl ? 'font-amiri text-4xl' : 'font-cormorant text-4xl'}`}>
            {labels.howItWorks}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
            {steps.map((st, idx) => (
              <div 
                key={idx}
                className="bg-white border border-gold-muted/12 rounded-3xl p-7 relative overflow-hidden flex flex-col justify-between group hover:border-gold hover:-translate-y-1.5 transition-all duration-500 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold-muted/20 text-gold-hi flex items-center justify-center font-bold text-sm mb-6 transition-all duration-300 group-hover:bg-[#0B132B] group-hover:text-gold-champagne">
                    <span className="font-dm">{st.num}</span>
                  </div>
                  <h3 className={`text-sm font-bold text-midnight mb-2 group-hover:text-gold-hi transition-colors duration-300 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {st.title}
                  </h3>
                  <p className={`text-[11px] text-[#554E45] leading-relaxed group-hover:text-midnight transition-colors duration-300 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: RELATED COURSES (ACADEMIC SHELF) ── */}
      {relatedCourses.length > 0 && (
        <section className="py-24 bg-[#FAF6EC] border-b border-gold-muted/12 relative z-10 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <span className={`text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3 block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
              {isRtl ? 'سلسلة الترقي المعرفي' : 'COMPLEMENTARY PATHS'}
            </span>
            <h2 className={`text-title text-midnight font-bold mb-4 ${isRtl ? 'font-amiri text-4xl' : 'font-cormorant text-4xl'}`}>
              {labels.relatedTitle}
            </h2>
            <p className={`text-xs text-stone max-w-xl mx-auto mb-16 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
              {labels.relatedDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
              {relatedCourses.map((rel, idx) => {
                if (!rel.data) return null;
                const relCourseIcon = getCourseIcon(rel.data.path);
                return (
                  <div 
                    key={idx}
                    className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-3xl p-0 shadow-[0_8px_30px_rgba(139,115,85,0.1)] hover:border-gold hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(139,115,85,0.18)] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
                  >
                    {/* Top Accent Gold Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                    {/* Watermark in background */}
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[url('/images/pattern-8star.svg')] bg-contain bg-no-repeat opacity-[0.015] group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none filter sepia hue-rotate-15 brightness-95" />

                    <div>
                      {/* Course Header Image Frame */}
                      <div className="relative h-48 w-full overflow-hidden rounded-t-[1.4rem]">
                        <Image
                          src={rel.data.image}
                          alt={rel.data.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/20 to-transparent pointer-events-none" />
                        
                        {/* Badge Overlay */}
                        <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-gold-muted/30 bg-midnight/80 backdrop-blur-sm text-gold-hi font-dm z-10">
                          {rel.data.path}
                        </span>
                      </div>

                      {/* Card Content wrapper */}
                      <div className="p-6 md:p-8">
                        {/* Icon & Title row */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className={`text-[1.2rem] text-midnight font-bold leading-snug group-hover:text-gold-hi transition-colors duration-300 ${
                            isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                          }`}>
                            {rel.data.title}
                          </h3>
                          <div className="p-2 bg-gold-muted/10 rounded-xl border border-gold/15 text-gold-hi transition-colors duration-300">
                            {relCourseIcon}
                          </div>
                        </div>

                        {/* Tagline */}
                        <span className={`block text-[11px] text-gold/80 font-semibold mb-4 uppercase tracking-wider ${
                          isRtl ? 'font-cairo' : 'font-dm'
                        }`}>
                          {rel.data.tagline}
                        </span>

                        {/* Description */}
                        <p className={`text-xs text-[#554E45] leading-relaxed mb-6 line-clamp-3 ${
                          isRtl ? 'font-noto' : 'font-lora'
                        }`}>
                          {rel.data.importance}
                        </p>

                        {/* Syllabus Stats Metadata Section */}
                        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gold-muted/15 text-center bg-[#FDFAF3]/30 rounded-xl">
                          <div className="space-y-1">
                            <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                              {labels.duration}
                            </span>
                            <span className={`block text-[10px] text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                              {rel.data.duration}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                              {labels.syllabus}
                            </span>
                            <span className={`block text-[10px] text-gold font-bold leading-none truncate px-1 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                              {rel.data.syllabus}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="block text-[8px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                              {labels.level}
                            </span>
                            <span className={`block text-[10px] text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                              {rel.data.level}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bottom Action Center inside Card */}
                    <div className="px-6 md:px-8 pb-8 flex items-center justify-between">
                      <Link
                        href={`/${locale}/programs/${rel.slug}`}
                        className={`text-[11px] uppercase tracking-widest font-bold text-stone hover:text-gold transition-colors duration-300 inline-flex items-center gap-1.5 ${
                          isRtl ? 'font-cairo' : 'font-dm'
                        }`}
                      >
                        <span>{labels.relatedBtn}</span>
                        {isRtl ? (
                          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </Link>

                      {/* Small branding logo opposite the button */}
                      <div className="w-12 h-12 flex items-center justify-center select-none pointer-events-none">
                        <img
                          src="/logo-new.webp"
                          alt="Academy Seal"
                          className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 transition-all duration-500"
                        />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 6: HIGH-FIDELITY CTA CARD (DARK MODE) ── */}
      <section className="py-24 bg-[#FDFAF3] relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#22314b] text-white border border-gold/25 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
            
            {/* Watermarks */}
            <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:45px_45px] opacity-[0.015] pointer-events-none" />
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.03] filter invert pointer-events-none" />

            {/* Decorative gold frames in the corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/30" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold/30" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold/30" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/30" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              
              {/* Emblem icon */}
              <div className="w-12 h-12 bg-gold/15 border border-gold-hi/40 rounded-full flex items-center justify-center text-gold-hi mx-auto shadow-inner">
                <Sparkles size={20} className="animate-pulse" />
              </div>

              <div className="space-y-4">
                <h2 className={`text-2xl md:text-3xl text-gold-champagne font-bold ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
                  {labels.ctaTitle}
                </h2>
                <p className={`text-xs md:text-sm text-[#A6ADB8] leading-relaxed max-w-xl mx-auto ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {labels.ctaDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                
                <Link
                  href={`/${locale}/book?course=${encodeURIComponent(course.title)}`}
                  className={`btn-gold px-8 py-4 rounded-full text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-gold/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  {labels.ctaBtn}
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className={`px-8 py-4 border border-white/10 hover:border-gold-hi hover:bg-gold-hi/5 rounded-full text-xs font-bold transition-all duration-300 text-white hover:text-gold-champagne ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  {labels.contactBtn}
                </Link>

              </div>

            </div>
          </div>
        </div>
      </section>

    </article>
  );
}
