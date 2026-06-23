'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, 
  CheckCircle2, 
  Loader2, 
  Home, 
  Compass,
  Upload,
  Image as ImageIcon,
  Sparkles,
  BookOpen,
  Pencil,
  AlertCircle,
  Award,
  Globe2,
  UserCheck,
  Clock,
  Book,
  FileText,
  Check,
  ChevronDown,
  Calendar,
  RotateCcw,
  ShieldCheck,
  MessageSquare,
  ClipboardList,
  Video,
  Rocket,
  GraduationCap,
  Trash2,
  Plus
} from 'lucide-react';
import { saveSettings } from '@/app/actions/settings';
import { uploadMedia } from '@/app/actions/media';
import arMessages from '@/messages/ar.json';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

interface CmsEditorProps {
  initialSettings: Record<string, any>;
  locale: string;
  initialMedia?: string[];
}

const PAGES_CONFIG = [
  {
    id: 'homepage',
    titleAr: 'الصفحة الرئيسية',
    titleEn: 'Homepage',
    icon: Home,
  },
  {
    id: 'global',
    titleAr: 'عناصر الموقع وتذييل الصفحة',
    titleEn: 'Global Website & Footer',
    icon: Compass,
  }
];

const HOMEPAGE_SUB_SECTIONS = [
  { id: 'hero', titleAr: 'البانر الرئيسي', titleEn: 'Hero Section' },
  { id: 'about', titleAr: 'عن الأكاديمية', titleEn: 'About Section' },
  { id: 'credibility', titleAr: 'المصداقية والتميز', titleEn: 'Credibility' },
  { id: 'programs', titleAr: 'البرامج التعليمية', titleEn: 'Programs Showcase' },
  { id: 'methodology', titleAr: 'منهجيتنا التعليمية', titleEn: 'Methodology' },
  { id: 'courses', titleAr: 'المقررات الدراسية', titleEn: 'Featured Courses' },
  { id: 'teachers', titleAr: 'أعضاء هيئة التدريس', titleEn: 'Faculty Spotlight' },
  { id: 'testimonials', titleAr: 'آراء الطلاب', titleEn: 'Student Testimonials' },
  { id: 'how_it_works', titleAr: 'احجز حصة تجريبية', titleEn: 'Booking & Trial' },
  { id: 'pricing', titleAr: 'باقات الاشتراك', titleEn: 'Pricing Plans' },
  { id: 'final_cta', titleAr: 'شعار نهاية الصفحة', titleEn: 'Final CTA' }
];

const DEFAULTS_MAP: Record<string, Record<'ar' | 'en' | 'fr', string>> = {
  hero_tagline: {
    ar: arMessages.Hero.tagline,
    en: enMessages.Hero.tagline,
    fr: frMessages.Hero.tagline,
  },
  hero_headline: {
    ar: arMessages.Hero.headline,
    en: enMessages.Hero.headline,
    fr: frMessages.Hero.headline,
  },
  hero_description: {
    ar: arMessages.Hero.description,
    en: enMessages.Hero.description,
    fr: frMessages.Hero.description,
  },
  hero_cta_primary: {
    ar: arMessages.Hero.ctaPrimary,
    en: enMessages.Hero.ctaPrimary,
    fr: frMessages.Hero.ctaPrimary,
  },
  hero_cta_secondary: {
    ar: arMessages.Hero.ctaSecondary,
    en: enMessages.Hero.ctaSecondary,
    fr: frMessages.Hero.ctaSecondary,
  },
  hero_stat1_value: { ar: '32+', en: '32+', fr: '32+' },
  hero_stat1_label: {
    ar: arMessages.Hero.statStudents,
    en: enMessages.Hero.statStudents,
    fr: frMessages.Hero.statStudents,
  },
  hero_stat2_value: { ar: '40+', en: '40+', fr: '40+' },
  hero_stat2_label: {
    ar: arMessages.Hero.statTeachers,
    en: enMessages.Hero.statTeachers,
    fr: frMessages.Hero.statTeachers,
  },
  hero_stat3_value: { ar: '25,000+', en: '25,000+', fr: '25,000+' },
  hero_stat3_label: {
    ar: arMessages.Hero.statHours,
    en: enMessages.Hero.statHours,
    fr: frMessages.Hero.statHours,
  },
  hero_stat4_value: { ar: '4.9/5', en: '4.9/5', fr: '4.9/5' },
  hero_stat4_label: {
    ar: arMessages.Hero.statRating,
    en: enMessages.Hero.statRating,
    fr: frMessages.Hero.statRating,
  },
  about_teaser_title: {
    ar: 'رؤية أكاديمية تربط الماضي العريق بالمستقبل المعاصر',
    en: 'A Vision Connecting Sacred Heritage with Modern Education',
    fr: 'Une Vision Alliant Héritage Sacré et Éducation Moderne',
  },
  about_teaser_description: {
    ar: 'نسعى لبناء جيل يعتز بدينه ولغته من خلال الجمع بين الرصانة العلمية العتيقة والتعليم التفاعلي الفردي الحديث.',
    en: 'We preserve traditional scholarly rigor while utilizing advanced individual tutoring formats to raise a generation deeply rooted in their faith and language.',
    fr: 'Nous préservons la rigueur académique traditionnelle tout en utilisant des formats d\'apprentissage en ligne interactifs et personnalisés.',
  },
  about_teaser_btn: {
    ar: 'اقرأ المزيد عن رسالتنا',
    en: 'Read More About Our Mission',
    fr: 'En Savoir Plus Sur Notre Mission',
  },
  about_teaser_tag: {
    ar: 'عن أكاديمية إسلام تبيان',
    en: 'ABOUT ISLAM TEBYAN',
    fr: 'À PROPOS DE L\'ACADÉMIE',
  },
  about_teaser_philosophy_title: {
    ar: 'فلسفتنا التعليمية',
    en: 'Our Educational Philosophy',
    fr: 'Notre Philosophie',
  },
  about_teaser_philosophy_text: {
    ar: 'نؤمن في إسلام تبيان بأن العلوم الشرعية واللغة العربية لا تؤخذ إلا بالتلقي المباشر والمشافهة عن أهل العلم المتخصصين. لذلك نلتزم بتقديم تعليم قائم على منهجية السند المتصل، لضمان صحة الفهم ودقة المعرفة وفق منهج الأزهر الشريف الوسطي.',
    en: 'We believe that sacred knowledge and Arabic cannot be fully absorbed except through direct oral transmission (Talaqqi) from qualified scholars. Thus, we commit to a methodology built on connected chains (Isnad) to guarantee sound understanding.',
    fr: 'Nous croyons que les sciences islamiques et l\'arabe ne s\'acquièrent que par la transmission orale directe (Talaqqi) auprès de savants qualifiés. Nous nous engageons donc à enseigner via l\'Isnad pour garantir une compréhension pure.',
  },
  about_teaser_pillar1_title: {
    ar: 'منهجية السند المتصل',
    en: 'Connected Chains (Isnad)',
    fr: 'Chaîne de Transmission (Isnad)',
  },
  about_teaser_pillar1_text: {
    ar: 'تلقّ العلوم الشرعية وحفظ القرآن الكريم بإسناد متصل إلى النبي ﷺ على يد نخبة من علماء الأزهر الشريف المجازين.',
    en: 'Acquire sacred knowledge and Quran recitation with connected chains of transmission back to the Prophet ﷺ under certified Al-Azhar scholars.',
    fr: 'Étudiez le Coran et les sciences islamiques avec une chaîne de transmission ininterrompue remontant au Prophète ﷺ par des savants d\'Al-Azhar.',
  },
  about_teaser_pillar2_title: {
    ar: 'التعليم الفردي المباشر',
    en: 'One-on-One Tutoring',
    fr: 'Cours Particuliers En Direct',
  },
  about_teaser_pillar2_text: {
    ar: 'حصص خاصة (1-to-1) مباشرة تضمن التركيز الكامل، ومراعاة الفروق الفردية، وتعديل المنهج حسب سرعة الطالب واحتياجاته.',
    en: 'Live, interactive private sessions ensuring maximum engagement, tailored pace, and custom-drafted syllabi to fit your goals.',
    fr: 'Des sessions individuelles assurant une attention totale, un rythme adapté et un programme personnalisé selon vos objectifs.',
  },
  credibility_title: {
    ar: arMessages.Credibility.title,
    en: enMessages.Credibility.title,
    fr: frMessages.Credibility.title,
  },
  credibility_diff1_title: { ar: arMessages.Credibility.diff1Title, en: enMessages.Credibility.diff1Title, fr: frMessages.Credibility.diff1Title },
  credibility_diff1_desc: { ar: arMessages.Credibility.diff1Desc, en: enMessages.Credibility.diff1Desc, fr: frMessages.Credibility.diff1Desc },
  credibility_diff2_title: { ar: arMessages.Credibility.diff2Title, en: enMessages.Credibility.diff2Title, fr: frMessages.Credibility.diff2Title },
  credibility_diff2_desc: { ar: arMessages.Credibility.diff2Desc, en: enMessages.Credibility.diff2Desc, fr: frMessages.Credibility.diff2Desc },
  credibility_diff3_title: { ar: arMessages.Credibility.diff3Title, en: enMessages.Credibility.diff3Title, fr: frMessages.Credibility.diff3Title },
  credibility_diff3_desc: { ar: arMessages.Credibility.diff3Desc, en: enMessages.Credibility.diff3Desc, fr: frMessages.Credibility.diff3Desc },
  credibility_diff4_title: { ar: arMessages.Credibility.diff4Title, en: enMessages.Credibility.diff4Title, fr: frMessages.Credibility.diff4Title },
  credibility_diff4_desc: { ar: arMessages.Credibility.diff4Desc, en: enMessages.Credibility.diff4Desc, fr: frMessages.Credibility.diff4Desc },
  credibility_diff5_title: { ar: arMessages.Credibility.diff5Title, en: enMessages.Credibility.diff5Title, fr: frMessages.Credibility.diff5Title },
  credibility_diff5_desc: { ar: arMessages.Credibility.diff5Desc, en: enMessages.Credibility.diff5Desc, fr: frMessages.Credibility.diff5Desc },
  programs_showcase_tag: { ar: 'البرامج الأكاديمية التخصصية', en: 'STRUCTURED PATHS', fr: 'PROGRAMMES ACADÉMIQUES' },
  programs_showcase_title: { ar: arMessages.Programs.title, en: enMessages.Programs.title, fr: frMessages.Programs.title },
  programs_showcase_desc: { ar: arMessages.Programs.subtitle, en: enMessages.Programs.subtitle, fr: frMessages.Programs.subtitle },
  programs_showcase_quran_title: { ar: arMessages.Programs.quranTitle, en: enMessages.Programs.quranTitle, fr: frMessages.Programs.quranTitle },
  programs_showcase_quran_arabic: { ar: arMessages.Programs.quranArabic, en: enMessages.Programs.quranArabic, fr: frMessages.Programs.quranArabic },
  programs_showcase_quran_desc: { ar: arMessages.Programs.quranDesc, en: enMessages.Programs.quranDesc, fr: frMessages.Programs.quranDesc },
  programs_showcase_quran_books: { ar: arMessages.Programs.quranBooks, en: enMessages.Programs.quranBooks, fr: frMessages.Programs.quranBooks },
  programs_showcase_arabic_title: { ar: arMessages.Programs.arabicTitle, en: enMessages.Programs.arabicTitle, fr: frMessages.Programs.arabicTitle },
  programs_showcase_arabic_arabic: { ar: arMessages.Programs.arabicArabic, en: enMessages.Programs.arabicArabic, fr: frMessages.Programs.arabicArabic },
  programs_showcase_arabic_desc: { ar: arMessages.Programs.arabicDesc, en: enMessages.Programs.arabicDesc, fr: frMessages.Programs.arabicDesc },
  programs_showcase_arabic_books: { ar: arMessages.Programs.arabicBooks, en: enMessages.Programs.arabicBooks, fr: frMessages.Programs.arabicBooks },
  programs_showcase_islamic_title: { ar: arMessages.Programs.islamicTitle, en: enMessages.Programs.islamicTitle, fr: frMessages.Programs.islamicTitle },
  programs_showcase_islamic_arabic: { ar: arMessages.Programs.islamicArabic, en: enMessages.Programs.islamicArabic, fr: frMessages.Programs.islamicArabic },
  programs_showcase_islamic_desc: { ar: arMessages.Programs.islamicDesc, en: enMessages.Programs.islamicDesc, fr: frMessages.Programs.islamicDesc },
  programs_showcase_islamic_books: { ar: arMessages.Programs.islamicBooks, en: enMessages.Programs.islamicBooks, fr: frMessages.Programs.islamicBooks },
  methodology_title: { ar: arMessages.Method.title, en: enMessages.Method.title, fr: frMessages.Method.title },
  methodology_subtitle: { ar: arMessages.Method.subtitle, en: enMessages.Method.subtitle, fr: frMessages.Method.subtitle },
  methodology_pillar1_title: { ar: arMessages.Method.pillar1Title, en: enMessages.Method.pillar1Title, fr: frMessages.Method.pillar1Title },
  methodology_pillar1_desc: { ar: arMessages.Method.pillar1Desc, en: enMessages.Method.pillar1Desc, fr: arMessages.Method.pillar1Desc },
  methodology_pillar1_image: {
    ar: '/images/pillar-manuscript.png',
    en: '/images/pillar-manuscript.png',
    fr: '/images/pillar-manuscript.png',
  },
  methodology_pillar2_title: { ar: arMessages.Method.pillar2Title, en: enMessages.Method.pillar2Title, fr: frMessages.Method.pillar2Title },
  methodology_pillar2_desc: { ar: arMessages.Method.pillar2Desc, en: enMessages.Method.pillar2Desc, fr: frMessages.Method.pillar2Desc },
  methodology_pillar2_image: {
    ar: '/images/pillar-study.png',
    en: '/images/pillar-study.png',
    fr: '/images/pillar-study.png',
  },
  methodology_pillar3_title: { ar: arMessages.Method.pillar3Title, en: enMessages.Method.pillar3Title, fr: frMessages.Method.pillar3Title },
  methodology_pillar3_desc: { ar: arMessages.Method.pillar3Desc, en: enMessages.Method.pillar3Desc, fr: frMessages.Method.pillar3Desc },
  methodology_pillar3_image: {
    ar: '/images/pillar-astrolabe.png',
    en: '/images/pillar-astrolabe.png',
    fr: '/images/pillar-astrolabe.png',
  },
  featured_courses_tag: { ar: 'المقررات الدراسية المميزة', en: 'Featured Courses', fr: 'Cours à la Une' },
  featured_courses_title: { ar: 'منهاج تفصيلي يؤصل للعلوم الشرعية واللغوية', en: 'A Rigorous Traditional Syllabus', fr: 'Un Programme Traditionnel Rigoureux' },
  featured_courses_desc: { ar: 'باقة مختارة من المتون والعلوم التأسيسية المصممة لبناء ملكة علمية رصينة وفهم عميق للتراث الإسلامي واللسان العربي.', en: 'A carefully curated selection of texts designed to build a solid scholarly foundation in Islamic law and Arabic grammar.', fr: 'Une sélection rigoureuse de textes conçus pour bâtir des bases solides en droit islamique et en grammaire arabe.' },
  featured_courses_btn_all: { ar: 'عرض جميع المقررات', en: 'View All Courses', fr: 'Voir tous les cours' },
  teachers_spotlight_tag: { ar: arMessages.Teachers.spotlight, en: enMessages.Teachers.spotlight, fr: frMessages.Teachers.spotlight },
  teachers_spotlight_title: { ar: arMessages.Teachers.title, en: enMessages.Teachers.title, fr: frMessages.Teachers.title },
  teachers_spotlight_subtitle: { ar: arMessages.Teachers.subtitle, en: enMessages.Teachers.subtitle, fr: frMessages.Teachers.subtitle },
  teachers_spotlight_btn_all: { ar: arMessages.Teachers.viewAll, en: enMessages.Teachers.viewAll, fr: frMessages.Teachers.viewAll },
  testimonials_tag: { ar: 'قصص الأثر والتلقي', en: 'STUDENT VOICES', fr: 'TÉMOIGNAGES' },
  testimonials_title: { ar: arMessages.Testimonials.title, en: enMessages.Testimonials.title, fr: frMessages.Testimonials.title },
  testimonials_subtitle: { ar: arMessages.Testimonials.subtitle, en: enMessages.Testimonials.subtitle, fr: frMessages.Testimonials.subtitle },
  how_it_works_tag: { ar: 'ابدأ رحلتك التعليمية مجاناً وبدون أي التزام', en: 'START YOUR LEARNING JOURNEY FOR FREE AND WITH ZERO COMMITMENT', fr: 'COMMENCEZ VOTRE PARCOURS GRATUITEMENT ET SANS ENGAGEMENT' },
  how_it_works_why_title: { ar: 'لماذا الحصة\nالتجريبية المجانية؟', en: 'Why a Free\nTrial?', fr: 'Pourquoi un Cours\nd\'Essai Gratuit ?' },
  how_it_works_form_title: { ar: 'احجز حصتك التجريبية المجانية', en: 'Book Your Free Trial', fr: 'Réservez Votre Essai Gratuit' },
  how_it_works_form_subtitle: { ar: 'أكمل النموذج وسيتواصل معك فريقنا خلال 24 ساعة', en: 'Fill out the form below and our team will contact you within 24 hours', fr: 'Remplissez le formulaire et notre équipe vous contactera sous 24 heures' },
  how_it_works_btn_submit: { ar: 'تأكيد الحجز', en: 'Book Free Assessment', fr: 'Confirmer la Réservation' },
  pricing_teaser_title: { ar: arMessages.Pricing.title, en: enMessages.Pricing.title, fr: frMessages.Pricing.title },
  pricing_teaser_subtitle: { ar: arMessages.Pricing.subtitle, en: enMessages.Pricing.subtitle, fr: frMessages.Pricing.subtitle },
  pricing_teaser_trial_refund_policy_title: { ar: arMessages.Pricing.trialRefundPolicy, en: enMessages.Pricing.trialRefundPolicy, fr: frMessages.Pricing.trialRefundPolicy },
  pricing_teaser_trial_refund_policy_desc: { ar: arMessages.Pricing.trialRefundPolicyDesc, en: enMessages.Pricing.trialRefundPolicyDesc, fr: frMessages.Pricing.trialRefundPolicyDesc },
  latest_articles_tag: { ar: 'المقالات والأبحاث الأكاديمية', en: 'ACADEMIC PAPERS & ARTICLES', fr: 'ARTICLES & RECHERCHES ACADÉMIQUES' },
  latest_articles_title: { ar: 'دراسات تخصصية بأقلام علماء الأكاديمية', en: 'Scholarly Insights by Our Faculty Scholars', fr: 'Études Spécialisées par les Savants de l\'Académie' },
  latest_articles_subtitle: { ar: 'باقة من البحوث والمقالات المحكّمة التي تعالج مسائل علمية دقيقة في العلوم الشرعية، اللسانيات العربية، والتاريخ الإسلامي.', en: 'Explore rigorous essays and research papers covering advanced issues in jurisprudence, Arabic linguistics, and Islamic history.', fr: 'Une sélection de recherches et d\'articles rédigés par nos professeurs pour traiter des questions académiques précises en sciences islamiques et linguistiques.' },
  latest_articles_btn_all: { ar: 'عرض المدونة الأكاديمية', en: 'View Academic Blog', fr: 'Voir le Blog Académique' },
  final_cta_tag: { ar: 'ابدأ رحلتك الأكاديمية اليوم', en: 'START YOUR ACADEMIC PATH', fr: 'COMMENCEZ VOTRE PARCOURS ACADÉMIQUE' },
  final_cta_title: { ar: 'تلقَّ العلوم الشرعية واللغة العربية بـسند متصل', en: 'Acquire Sacred Knowledge & Classical Arabic under Connected Chains', fr: 'Étudiez les Sciences Islamiques et l\'Arabe Classique sous Isnad' },
  final_cta_desc: { ar: 'انضم إلى الحصص الفردية المباشرة مع نخبة من علماء الأزهر الشريف. اختر مسارك الدراسي المخصص وتواصل معنا لتنسيق خطتك التعليمية الخاصة.', en: 'Step into a premium, university-level tutoring experience with Al-Azhar scholars. Choose your custom program or connect directly with our coordinators to draft your syllabus.', fr: 'Rejoignez une formation d\'élite en cours particuliers en ligne avec des savants d\'Al-Azhar. Découvrez nos programmes ou contactez-nous pour concevoir votre plan d\'études personnalisé.' },
  final_cta_btn_courses: { ar: 'استكشف البرامج الدراسية', en: 'Explore Academic Programs', fr: 'Explorer les Programmes' },
  final_cta_btn_contact: { ar: 'تواصل مع مستشارنا الأكاديمي', en: 'Contact Academic Coordinator', fr: 'Contactez nos Conseillers' },
  // Course 1 defaults (Quran)
  course1_title: { ar: 'القرآن الكريم والتجويد', en: 'Quran & Tajweed', fr: 'Coran & Tajwid' },
  course1_tag: { ar: 'الأساس والمبتدأ', en: 'The Ultimate Foundation', fr: 'La Base Fondamentale' },
  course1_desc: {
    ar: 'تصحيح التلاوة وحفظ كتاب الله بروايتي حفص وشعبة بسند متصل مع دراسة أحكام التجويد.',
    en: 'Master Quran recitation and memorization under connected chains (Isnad) using Tajweed rules.',
    fr: 'Mémorisez le Coran et étudiez le Tajwid avec isnad connecté sous des professeurs agréés.'
  },
  course1_duration: { ar: '40 ساعة', en: '40 Hrs', fr: '40 h' },
  course1_level: { ar: 'تأسيسي', en: 'Core', fr: 'Base' },
  course1_syllabus: { ar: 'روايتان', en: '2 Recitations', fr: '2 Récitations' },

  // Course 2 defaults (Fiqh)
  course2_title: { ar: 'الفقه الإسلامي', en: 'Islamic Fiqh', fr: 'Jurisprudence (Fiqh)' },
  course2_tag: { ar: 'فقه العبادات والمعاملات', en: 'Worship & Transactions', fr: 'Culte & Transactions' },
  course2_desc: {
    ar: 'تفقه في الدين على مذهب من المذاهب المعتبرة شرعاً بالتدريج العلمي لتأصيل المسائل الفقهية.',
    en: 'Study Fiqh according to the established madhhabs with a structured academic methodology.',
    fr: 'Étudiez le Fiqh de manière progressive selon les quatre écoles traditionnelles reconnues.'
  },
  course2_duration: { ar: '48 ساعة', en: '48 Hrs', fr: '48 h' },
  course2_level: { ar: 'تأصيلي', en: 'Intermediate', fr: 'Académique' },
  course2_syllabus: { ar: 'المتون المعتمدة', en: 'Standard Texts', fr: 'Manuels Agréés' },

  // Course 3 defaults (Arabic Grammar)
  course3_title: { ar: 'النحو والصرف', en: 'Arabic Grammar', fr: 'Grammaire & Morphologie' },
  course3_tag: { ar: 'مفتاح فهم الوحيين', en: 'Key to Understanding', fr: 'Clé de la Langue' },
  course3_desc: {
    ar: 'صون اللسان وفهم تركيب الكلام العربي بدراسة الآجرومية وقطر الندى في النحو وتصريف الأفعال.',
    en: 'Protect your tongue and understand classical sentence structures through Al-Ajrumiyyah.',
    fr: 'Maîtrisez la syntaxe et la structure des mots arabes grâce à l\'étude d\'Al-Ajrumiyyah.'
  },
  course3_duration: { ar: '50 ساعة', en: '50 Hrs', fr: '50 h' },
  course3_level: { ar: 'تمكيني', en: 'Advanced', fr: 'Clé' },
  course3_syllabus: { ar: 'الآجرومية', en: 'Al-Ajrumiyyah', fr: 'Ajurrumiyyah' },

  // Teacher 1 defaults (Sheikh Ahmed Yahya)
  teacher1_name: { ar: 'الشيخ أحمد يحيى زكريا', en: 'Sheikh Ahmed Yahya Zakaria', fr: 'Cheikh Ahmed Yahya Zakaria' },
  teacher1_title: {
    ar: 'معلم القرآن الكريم واللغة العربية لغير الناطقين بها',
    en: 'Quranic Recitation & Arabic Instructor',
    fr: 'Enseignant du Saint Coran et de l\'Arabe'
  },
  teacher1_specialty: { ar: 'القرآن والتجويد واللغة العربية', en: 'Quran, Tajweed & Arabic', fr: 'Coran, Tajwid & Arabe' },
  teacher1_education: { ar: 'جامعة الأزهر الشريف', en: 'Al-Azhar University', fr: 'Université d\'Al-Azhar' },
  teacher1_languages: { ar: 'العربية، الإنجليزية، الفرنسية، التركية', en: 'Arabic, English, French, Turkish', fr: 'Arabe, Anglais, Français, Turc' },
  teacher1_ijazah1: {
    ar: 'إجازة برواية حفص عن عاصم بالسند المتصل',
    en: 'Quranic recitation Ijaza (Hafs) with connected Isnad',
    fr: 'Ijaza de récital coranique (Hafs) avec Isnad connecté'
  },
  teacher1_ijazah2: {
    ar: 'إجازة قرآنية من كبار علماء الأزهر الشريف',
    en: 'Ijazat from senior Al-Azhar scholars',
    fr: 'Ijazat de savants renommés d\'Al-Azhar'
  },
  teacher1_image: {
    ar: '/images/teacher_ahmed_yahya.png',
    en: '/images/teacher_ahmed_yahya.png',
    fr: '/images/teacher_ahmed_yahya.png'
  },

  // Teacher 2 defaults (Sheikh Mohamed Badr)
  teacher2_name: { ar: 'الشيخ محمد بدر عبد المرضي', en: 'Sheikh Mohamed Badr', fr: 'Cheikh Mohamed Badr' },
  teacher2_title: {
    ar: 'واعظ بالأزهر الشريف ومدرس العلوم الشرعية',
    en: 'Al-Azhar Emissary & Shariah Instructor',
    fr: 'Prédicateur d\'Al-Azhar & Enseignant de Shariah'
  },
  teacher2_specialty: { ar: 'التفسير، الفقه المالكي، والمنطق', en: 'Tafsir, Maliki Fiqh, & Logic', fr: 'Tafsir, Fiqh Malékite & Logique' },
  teacher2_education: { ar: 'ماجستير جامعة الأزهر الشريف', en: 'MA, Al-Azhar University', fr: 'Master, Université d\'Al-Azhar' },
  teacher2_languages: { ar: 'العربية، الإنجليزية', en: 'Arabic, English', fr: 'Arabe, Anglais' },
  teacher2_ijazah1: {
    ar: 'إجازة بالقرآن بالقراءات المتواترة بسند متصل',
    en: 'Connected Isnad to the Prophet ﷺ in multiple Qira\'at',
    fr: 'Isnad au Prophète ﷺ dans plusieurs lectures'
  },
  teacher2_ijazah2: {
    ar: 'إجازات متعددة في متون الفقه والنحو والعقيدة',
    en: 'Ijazas in grammar, theology & Maliki Fiqh',
    fr: 'Ijazas dans les traités de grammaire, Fiqh et théologie'
  },
  teacher2_image: {
    ar: '/images/teacher_mohamed_badr.png',
    en: '/images/teacher_mohamed_badr.png',
    fr: '/images/teacher_mohamed_badr.png'
  },

  // Teacher 3 defaults (Dr. Hamada Attia)
  teacher3_name: { ar: 'د. حمادة عطية نادي', en: 'Dr. Hamada Attia Nady', fr: 'Dr. Hamada Attia Nady' },
  teacher3_title: {
    ar: 'باحث دكتوراه في المناهج وطرق التدريس',
    en: 'PhD Researcher in Curriculum & Instruction',
    fr: 'Doctorant en Didactique & Concepteur de Programmes'
  },
  teacher3_specialty: { ar: 'المناهج وطرق التدريس، والخط العربي', en: 'Curriculum & Instruction, Calligraphy', fr: 'Didactique & Calligraphie Arabe' },
  teacher3_education: { ar: 'جامعة الأزهر الشريف', en: 'Al-Azhar University', fr: 'Université d\'Al-Azhar' },
  teacher3_languages: { ar: 'العربية، الإنجليزية', en: 'Arabic, English', fr: 'Arabe, Anglais' },
  teacher3_ijazah1: {
    ar: 'تحقيق التراث من معهد المخطوطات والجامع الأزهر',
    en: 'Manuscript editing certificate from Manuscript Institute',
    fr: 'Édition de manuscrits de l\'Institut des Manuscrits'
  },
  teacher3_ijazah2: {
    ar: 'شهادة إعداد معلمي العربية لغير الناطقين بها',
    en: 'Teaching Arabic to non-natives professional license',
    fr: 'Enseignement de l\'arabe aux non-arabophones'
  },
  teacher3_image: {
    ar: '/images/teacher_hamada_attia.png',
    en: '/images/teacher_hamada_attia.png',
    fr: '/images/teacher_hamada_attia.png'
  },

  // Testimonials defaults
  testimonial1_name: { ar: 'أميرة خليل', en: 'Amira Khalil', fr: 'Amira Khalil' },
  testimonial1_role: { ar: 'لندن، المملكة المتحدة', en: 'London, UK', fr: 'Londres, RO' },
  testimonial1_persona: { ar: 'أم محترفة', en: 'Bilingual Parent', fr: 'Parent Bilingue' },
  testimonial1_quote: {
    ar: 'العثور على معلم يفهم كلاً من تجويد القرآن والسياق ثنائي اللغة لأطفالي كان أمراً غيّر حياتنا تماماً.',
    en: 'Finding a teacher who understands both Quranic Tajweed and my children\'s bilingual context has been life-changing.',
    fr: 'Trouver un enseignant comprenant le Tajwid et le contexte bilingue de mes enfants a changé notre vie.'
  },

  testimonial2_name: { ar: 'يوسف أحمد', en: 'Yusuf Ahmad', fr: 'Yusuf Ahmad' },
  testimonial2_role: { ar: 'تورونتو، كندا', en: 'Toronto, Canada', fr: 'Toronto, Canada' },
  testimonial2_persona: { ar: 'مهندس برمجيات', en: 'Software Developer', fr: 'Développeur' },
  testimonial2_quote: {
    ar: 'المنهج الأكاديمي المتبع لتعليم قواعد اللغة العربية الفصحى استثنائي للغاية. المادة العلمية دقيقة ومنظمة.',
    en: 'The academic approach to classical Arabic grammar here is exceptional. It\'s tailored, thorough, and highly structured.',
    fr: 'L\'approche académique de la grammaire arabe classique est exceptionnelle. Le contenu est structuré et de haut niveau.'
  },

  testimonial3_name: { ar: 'فاطمة منصور', en: 'Fatima Mansour', fr: 'Fatima Mansour' },
  testimonial3_role: { ar: 'الرياض، السعودية', en: 'Riyadh, Saudi Arabia', fr: 'Riyadh, Arabie Saoudite' },
  testimonial3_persona: { ar: 'طالبة دراسات عليا', en: 'Postgraduate Student', fr: 'Étudiante' },
  testimonial3_quote: {
    ar: 'إن إتقان التجويد ودراسة متون التفسير على أيدي نخبة من علماء الأزهر قد عمّق فهمي لكتاب الله.',
    en: 'Perfecting my Tajweed and studying Tafsir with Al-Azhar scholars 1-on-1 has profoundly deepened my connection to the Quran.',
    fr: 'Perfectionner mon Tajwid et étudier le Tafsir avec des savants d\'Al-Azhar en cours 1-on-1 a approfondi mon lien avec le Coran.'
  },

  testimonial4_name: { ar: 'د. طارق ياسين', en: 'Dr. Tariq Yassin', fr: 'Dr. Tariq Yassin' },
  testimonial4_role: { ar: 'نيو جيرسي، الولايات المتحدة', en: 'New Jersey, USA', fr: 'New Jersey, États-Unis' },
  testimonial4_persona: { ar: 'طبيب قلب ووالد', en: 'Cardiologist & Parent', fr: 'Cardiologue & Parent' },
  testimonial4_quote: {
    ar: 'بصفتي ولي أمر أعيش في نيو جيرسي، وفرت أكاديمية تبيان معلماً أزهرياً رائعاً يتواصل معهم بسلاسة، ومدى تقدمهم في مخارج الحروف مذهل حقاً.',
    en: 'As a parent in New Jersey, Islam Tebyan provided an incredible Azhari tutor who connects with them effortlessly. The progress is remarkable.',
    fr: 'En tant que parent dans le New Jersey, l\'académie a fourni un tuteur incroyable d\'Al-Azhar. Leurs progrès sont vraiment remarquables.'
  },

  testimonial5_name: { ar: 'سارة بن جلون', en: 'Sarah Benjelloun', fr: 'Sarah Benjelloun' },
  testimonial5_role: { ar: 'باريس، فرنسا', en: 'Paris, France', fr: 'Paris, France' },
  testimonial5_persona: { ar: 'طالبة قانون', en: 'Law Student', fr: 'Étudiante en Droit' },
  testimonial5_quote: {
    ar: 'دراسة النصوص الفقهية والشرعية باللغتين الفرنسية والعربية في جلسات فردية منظمة تماماً كالحلقات العلمية الجامعية.',
    en: 'The 1-on-1 study of Islamic legal texts in French and Arabic is structured exactly like a university seminar.',
    fr: 'L\'étude individuelle des textes juridiques islamiques en français et en arabe est structurée comme un séminaire universitaire.'
  },

  testimonial6_name: { ar: 'أحمد محمود', en: 'Ahmad Mahmoud', fr: 'Ahmad Mahmoud' },
  testimonial6_role: { ar: 'برلين، ألمانيا', en: 'Berlin, Germany', fr: 'Berlin, Allemagne' },
  testimonial6_persona: { ar: 'طالب دكتوراه', en: 'Ph.D. Candidate', fr: 'Doctorant' },
  testimonial6_quote: {
    ar: 'تنوع المناهج الدراسية ومرونة الأوقات مكنتني من الموازنة بين دراستي الأكاديمية وحفظ القرآن الكريم بالتجويد الصحيح.',
    en: 'The curriculum diversity and scheduling flexibility enabled me to balance my postgraduate studies with memorizing the Quran with proper Tajweed.',
    fr: 'La diversité du programme et la flexibilité des horaires m\'ont permis de concilier mes études et la mémorisation du Coran.'
  },

  // Pricing plans defaults
  pricing_plan1_name: { ar: 'الاشتراك الأساسي (تأسيس)', en: 'Starter Plan (Foundations)', fr: 'Plan Tassees (Bases)' },
  pricing_plan1_desc: {
    ar: 'مناسب للطلاب الراغبين في دراسة خفيفة مع الحفاظ على وتيرة تلقي منتظمة وضبط مستمر.',
    en: 'Perfect for students seeking light study commitment while maintaining consistent direct feedback.',
    fr: 'Parfait pour les étudiants qui souhaitent un rythme léger tout en conservant un suivi direct régulier.'
  },
  pricing_plan1_feat1: { ar: '4 حصص خاصة شهرياً', en: '4 private sessions / month', fr: '4 séances privées / mois' },
  pricing_plan1_feat2: { ar: 'معلم أزهري مجاز متصل السند', en: 'Certified Azhari tutor', fr: 'Tuteur diplômé d\'Al-Azhar' },
  pricing_plan1_feat3: { ar: 'تعديل مرن ومستمر للمواعيد', en: 'Flexible reschedule policy', fr: 'Politique de report flexible' },
  pricing_plan1_feat4: { ar: 'دعم فني وتنسيق كامل للأوقات', en: 'Full coordinator support', fr: 'Soutien complet du coordinateur' },
  
  pricing_plan1_price_30: { ar: '10', en: '10', fr: '10' },
  pricing_plan1_price_45: { ar: '15', en: '15', fr: '15' },
  pricing_plan1_price_60: { ar: '20', en: '20', fr: '20' },

  pricing_plan2_name: { ar: 'باقة التعليم المخصص (1-on-1)', en: 'Personalized Tutoring Pack', fr: 'Pack Éducation Personnalisée' },
  pricing_plan2_desc: {
    ar: 'تعليم فردي مباشر مع خطة دراسية مرنة وجدول مخصص',
    en: 'Direct individual tutoring with flexible scheduling and custom syllabus.',
    fr: 'Enseignement individuel direct avec horaires flexibles et programme sur mesure.'
  },
  pricing_plan2_feat1: { ar: 'دروس خاصة فردية (1:1) بالكامل', en: 'Strictly 1-on-1 private lessons', fr: 'Cours strictement individuels (1:1)' },
  pricing_plan2_feat2: { ar: 'نخبة من شيوخ وعلماء الأزهر الشريف', en: 'Al-Azhar University certified scholars', fr: 'Savants certifiés de l\'Université d\'Al-Azhar' },
  pricing_plan2_feat3: { ar: 'متابعة وتقارير دورية للتقدم', en: 'Regular progress reports and logs', fr: 'Rapports de progrès réguliers' },
  pricing_plan2_feat4: { ar: 'إمكانية تجميد أو تعديل المواعيد', en: 'Flexible booking and adjustments', fr: 'Horaires et réservations flexibles' },
  
  pricing_plan2_price_30: { ar: '20', en: '20', fr: '20' },
  pricing_plan2_price_45: { ar: '30', en: '30', fr: '30' },
  pricing_plan2_price_60: { ar: '40', en: '40', fr: '40' },

  pricing_plan3_name: { ar: 'مسار السند المتصل المكثف', en: 'Intensive Isnad Track', fr: 'Parcours Isnad Intensif' },
  pricing_plan3_desc: {
    ar: 'دراسة تخصصية متعمقة لنيل الإجازة بالسند المتصل',
    en: 'Rigorous scholarly track to earn traditional recitation Ijazah.',
    fr: 'Parcours académique rigoureux pour obtenir l\'Ijazah de récitation.'
  },
  pricing_plan3_feat1: { ar: 'إعداد شامل لنيل الإجازة بالسند المتصل للنبي ﷺ', en: 'Rigorous preparation for connected Isnad', fr: 'Préparation à l\'Isnad connecté au Prophète ﷺ' },
  pricing_plan3_feat2: { ar: 'متابعة وتسميع يومي مكثف', en: 'Intensive daily recitation monitoring', fr: 'Suivi quotidien intensif de la récitation' },
  pricing_plan3_feat3: { ar: 'اختبارات نظرية وعلمية دورية', en: 'Periodic theoretical & practical exams', fr: 'Examens théoriques et pratiques périodiques' },
  pricing_plan3_feat4: { ar: 'أولوية قصوى لتنسيق المواعيد', en: 'Highest priority scheduling coordination', fr: 'Coordination prioritaire des horaires' },

  pricing_plan3_price_30: { ar: '30', en: '30', fr: '30' },
  pricing_plan3_price_45: { ar: '45', en: '45', fr: '45' },
  pricing_plan3_price_60: { ar: '60', en: '60', fr: '60' },

  // Latest Articles defaults
  article1_tag: { ar: 'البحوث القرآنية', en: 'Quranic Studies', fr: 'Études Coraniques' },
  article1_title: {
    ar: 'مناهج الأئمة القراء في تدوين وضبط المصحف الشريف',
    en: 'Methodologies of Early Reciters in Quranic Orthography',
    fr: 'Les méthodologies de transcription du Saint Coran'
  },
  article1_desc: {
    ar: 'دراسة علمية محكّمة في تاريخ كتابة المصحف، وتطور علامات الضبط والرسم العثماني عبر العصور الإسلامية.',
    en: 'A critical analysis of Quranic orthography (Rasm) and the preservation of script accuracy throughout history.',
    fr: 'Une étude historique sur la transcription du Coran et le développement des règles de récitation.'
  },
  article1_author: { ar: 'كتبه: الشيخ أحمد يحيى', en: 'By: Sheikh Ahmed Yahya', fr: 'Par: Cheikh Ahmed Yahya' },
  article1_date: { ar: '١٥ يونيو ٢٠٢٦', en: '15 June 2026', fr: '15 Juin 2026' },
  article1_image: {
    ar: '/images/article_qiraat.png',
    en: '/images/article_qiraat.png',
    fr: '/images/article_qiraat.png'
  },

  article2_tag: { ar: 'اللسانيات العربية', en: 'Arabic Linguistics', fr: 'Linguistique Arabe' },
  article2_title: {
    ar: 'أثر نظرية العامل عند النحاة الأوائل في صون اللسان العربي',
    en: 'The Influence of Governing Elements (Amil) Theory in Preserving Classical Arabic',
    fr: 'L\'impact de la théorie de la grammaire dans la préservation de la langue'
  },
  article2_desc: {
    ar: 'بحث يعالج مفهوم العامل النحوي ونشأته، ودوره الجوهري في صون لسان الأمة العربي وتجنب اللحن والخطأ.',
    en: 'Exploring the syntactical framework of classical grammar and its historical impact on preservation.',
    fr: 'Recherche sur le concept de structure grammaticale et son rôle dans la préservation de l\'arabe.'
  },
  article2_author: { ar: 'كتبه: د. حمادة عطية', en: 'By: Dr. Hamada Attia', fr: 'Par: Dr. Hamada Attia' },
  article2_date: { ar: '٢٨ مايو ٢٠٢٦', en: '28 May 2026', fr: '28 Mai 2026' },
  article2_image: {
    ar: '/images/article_grammar.png',
    en: '/images/article_grammar.png',
    fr: '/images/article_grammar.png'
  },

  footer_verse: {
    ar: arMessages.Footer.verse,
    en: enMessages.Footer.verse,
    fr: frMessages.Footer.verse,
  }
};

export default function CmsEditor({ initialSettings, locale, initialMedia = [] }: CmsEditorProps) {
  const isRtl = locale === 'ar';
  const [activeTab, setActiveTab] = useState('homepage');
  const [activeSubSection, setActiveSubSection] = useState('hero');
  
  // Track active language per section
  const [sectionLang, setSectionLang] = useState<Record<string, 'ar' | 'en' | 'fr'>>({
    hero: 'ar',
    about: 'ar',
    credibility: 'ar',
    programs: 'ar',
    methodology: 'ar',
    courses: 'ar',
    teachers: 'ar',
    testimonials: 'ar',
    how_it_works: 'ar',
    pricing: 'ar',
    final_cta: 'ar',
    footer: 'ar'
  });

  // Track save state per section
  const [saveStates, setSaveStates] = useState<Record<string, { loading: boolean; success: boolean; error: string | null }>>({});

  // Local state for field values to enable real-time preview sync
  const [fieldValues, setFieldValues] = useState<Record<string, Record<string, string>>>({});

  // Local state for background image previews (object URLs)
  const [heroBgPreviews, setHeroBgPreviews] = useState<Record<string, string>>({});

  // Dynamic testimonials state & handlers
  const [testimonialIds, setTestimonialIds] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [testimonialPage, setTestimonialPage] = useState<number>(0);
  
  // Pricing duration switcher state inside CMS editor
  const [adminPricingDuration, setAdminPricingDuration] = useState<'30' | '45' | '60'>('30');

  // Initialize dynamic testimonials list from initialSettings or fall back to [1, 2, 3, 4, 5, 6]
  useEffect(() => {
    if (initialSettings) {
      const activeIdsStr = initialSettings.testimonials_active_ids?.ar || 
                           initialSettings.testimonials_active_ids?.en || 
                           initialSettings.testimonials_active_ids?.fr;
      if (activeIdsStr) {
        let parsedIds = activeIdsStr.split(',').map((id: string) => parseInt(id.trim(), 10)).filter(Number.isInteger);
        if (parsedIds.length > 0) {
          // Pad active ids list up to 6 reviews if database only lists 3
          if (parsedIds.length < 6) {
            const allPossible = [1, 2, 3, 4, 5, 6];
            const toAdd = allPossible.filter(id => !parsedIds.includes(id));
            parsedIds = [...parsedIds, ...toAdd].slice(0, 6);
          }
          setTestimonialIds(parsedIds);
          return;
        }
      }
      // Fallback: scan keys for testimonial{id}_name
      const ids = Object.keys(initialSettings)
        .filter(k => k.startsWith('testimonial') && k.endsWith('_name'))
        .map(k => {
          const match = k.match(/^testimonial(\d+)_name$/);
          return match ? parseInt(match[1], 10) : null;
        })
        .filter((n): n is number => n !== null)
        .sort((a, b) => a - b);
      if (ids.length > 0) {
        setTestimonialIds(ids);
      } else {
        setTestimonialIds([1, 2, 3, 4, 5, 6]);
      }
    }
  }, [initialSettings]);

  const handleAddTestimonial = () => {
    const nextId = testimonialIds.length > 0 ? Math.max(...testimonialIds) + 1 : 1;
    setTestimonialIds(prev => [...prev, nextId]);
    
    // Initialize default field values for this new testimonial
    const newFields = {
      [`testimonial${nextId}_name`]: { ar: '', en: '', fr: '' },
      [`testimonial${nextId}_role`]: { ar: '', en: '', fr: '' },
      [`testimonial${nextId}_persona`]: { ar: '', en: '', fr: '' },
      [`testimonial${nextId}_quote`]: { ar: '', en: '', fr: '' },
    };
    
    setFieldValues(prev => ({
      ...prev,
      ...newFields
    }));
    
    // Scroll to the last page which will contain the new card
    const newTotalItems = testimonialIds.length + 2; // +1 for the new id, +1 for "+ Add New"
    const lastPage = Math.ceil(newTotalItems / 3) - 1;
    setTestimonialPage(lastPage);
  };

  const handleDeleteTestimonialById = (idToDelete: number) => {
    if (testimonialIds.length <= 1) return;
    
    setTestimonialIds(prev => prev.filter(id => id !== idToDelete));
    
    // Clear values from local state
    setFieldValues(prev => {
      const updated = { ...prev };
      delete updated[`testimonial${idToDelete}_name`];
      delete updated[`testimonial${idToDelete}_role`];
      delete updated[`testimonial${idToDelete}_persona`];
      delete updated[`testimonial${idToDelete}_quote`];
      return updated;
    });

    // Adjust page if it becomes out of bounds
    const newLength = testimonialIds.length - 1;
    const maxPage = Math.ceil((newLength + 1) / 3) - 1;
    setTestimonialPage(prev => Math.min(prev, Math.max(0, maxPage)));
  };

  const handleResetSection = (sectionId: string) => {
    const fieldsToReset: string[] = [];
    
    if (sectionId === 'hero') {
      fieldsToReset.push(
        'hero_tagline', 'hero_headline', 'hero_description', 'hero_cta_primary', 'hero_cta_secondary',
        'hero_stat1_value', 'hero_stat1_label', 'hero_stat2_value', 'hero_stat2_label',
        'hero_stat3_value', 'hero_stat3_label', 'hero_stat4_value', 'hero_stat4_label'
      );
      setHeroBgPreviews(prev => {
        const updated = { ...prev };
        delete updated[sectionLang.hero];
        return updated;
      });
    } else if (sectionId === 'about') {
      fieldsToReset.push(
        'about_teaser_title', 'about_teaser_description', 'about_teaser_btn', 'about_teaser_tag',
        'about_teaser_philosophy_title', 'about_teaser_philosophy_text',
        'about_teaser_pillar1_title', 'about_teaser_pillar1_text',
        'about_teaser_pillar2_title', 'about_teaser_pillar2_text'
      );
    } else if (sectionId === 'credibility') {
      fieldsToReset.push(
        'credibility_title',
        'credibility_diff1_title', 'credibility_diff1_desc',
        'credibility_diff2_title', 'credibility_diff2_desc',
        'credibility_diff3_title', 'credibility_diff3_desc',
        'credibility_diff4_title', 'credibility_diff4_desc',
        'credibility_diff5_title', 'credibility_diff5_desc'
      );
    } else if (sectionId === 'programs') {
      fieldsToReset.push(
        'programs_showcase_tag', 'programs_showcase_title', 'programs_showcase_desc',
        'programs_showcase_quran_title', 'programs_showcase_quran_arabic', 'programs_showcase_quran_desc', 'programs_showcase_quran_books',
        'programs_showcase_arabic_title', 'programs_showcase_arabic_arabic', 'programs_showcase_arabic_desc', 'programs_showcase_arabic_books',
        'programs_showcase_islamic_title', 'programs_showcase_islamic_arabic', 'programs_showcase_islamic_desc', 'programs_showcase_islamic_books'
      );
    } else if (sectionId === 'methodology') {
      fieldsToReset.push(
        'methodology_title', 'methodology_subtitle',
        'methodology_pillar1_title', 'methodology_pillar1_desc', 'methodology_pillar1_image',
        'methodology_pillar2_title', 'methodology_pillar2_desc', 'methodology_pillar2_image',
        'methodology_pillar3_title', 'methodology_pillar3_desc', 'methodology_pillar3_image'
      );
    } else if (sectionId === 'courses') {
      fieldsToReset.push(
        'featured_courses_tag', 'featured_courses_title', 'featured_courses_desc', 'featured_courses_btn_all',
        'course1_title', 'course1_tag', 'course1_desc', 'course1_duration', 'course1_level', 'course1_syllabus',
        'course2_title', 'course2_tag', 'course2_desc', 'course2_duration', 'course2_level', 'course2_syllabus',
        'course3_title', 'course3_tag', 'course3_desc', 'course3_duration', 'course3_level', 'course3_syllabus'
      );
    } else if (sectionId === 'teachers') {
      fieldsToReset.push(
        'teachers_spotlight_tag', 'teachers_spotlight_title', 'teachers_spotlight_subtitle', 'teachers_spotlight_btn_all',
        'teacher1_name', 'teacher1_title', 'teacher1_specialty', 'teacher1_education', 'teacher1_languages', 'teacher1_ijazah1', 'teacher1_ijazah2', 'teacher1_image',
        'teacher2_name', 'teacher2_title', 'teacher2_specialty', 'teacher2_education', 'teacher2_languages', 'teacher2_ijazah1', 'teacher2_ijazah2', 'teacher2_image',
        'teacher3_name', 'teacher3_title', 'teacher3_specialty', 'teacher3_education', 'teacher3_languages', 'teacher3_ijazah1', 'teacher3_ijazah2', 'teacher3_image'
      );
    } else if (sectionId === 'testimonials') {
      fieldsToReset.push('testimonials_tag', 'testimonials_title', 'testimonials_subtitle');
      // Reset active testimonial IDs
      const activeIdsStr = initialSettings.testimonials_active_ids?.ar || 
                           initialSettings.testimonials_active_ids?.en || 
                           initialSettings.testimonials_active_ids?.fr;
      let originalIds = [1, 2, 3, 4, 5, 6];
      if (activeIdsStr) {
        let parsedIds = activeIdsStr.split(',').map((id: string) => parseInt(id.trim(), 10)).filter(Number.isInteger);
        if (parsedIds.length > 0) {
          if (parsedIds.length < 6) {
            const allPossible = [1, 2, 3, 4, 5, 6];
            const toAdd = allPossible.filter(id => !parsedIds.includes(id));
            parsedIds = [...parsedIds, ...toAdd].slice(0, 6);
          }
          originalIds = parsedIds;
        }
      } else {
        const ids = Object.keys(initialSettings)
          .filter(k => k.startsWith('testimonial') && k.endsWith('_name'))
          .map(k => {
            const match = k.match(/^testimonial(\d+)_name$/);
            return match ? parseInt(match[1], 10) : null;
          })
          .filter((n): n is number => n !== null)
          .sort((a, b) => a - b);
        if (ids.length > 0) {
          originalIds = ids;
        }
      }
      setTestimonialIds(originalIds);
      setTestimonialPage(0);
      
      originalIds.forEach(id => {
        fieldsToReset.push(
          `testimonial${id}_name`,
          `testimonial${id}_role`,
          `testimonial${id}_persona`,
          `testimonial${id}_quote`
        );
      });
    } else if (sectionId === 'how_it_works') {
      fieldsToReset.push(
        'how_it_works_tag', 'how_it_works_why_title', 'how_it_works_form_title',
        'how_it_works_form_subtitle', 'how_it_works_btn_submit'
      );
    } else if (sectionId === 'pricing') {
      fieldsToReset.push(
        'pricing_teaser_title', 'pricing_teaser_subtitle', 'pricing_teaser_trial_refund_policy_title', 'pricing_teaser_trial_refund_policy_desc',
        'pricing_plan1_name', 'pricing_plan1_desc', 'pricing_plan1_feat1', 'pricing_plan1_feat2', 'pricing_plan1_feat3', 'pricing_plan1_feat4',
        'pricing_plan1_price_30', 'pricing_plan1_price_45', 'pricing_plan1_price_60',
        'pricing_plan2_name', 'pricing_plan2_desc', 'pricing_plan2_feat1', 'pricing_plan2_feat2', 'pricing_plan2_feat3', 'pricing_plan2_feat4',
        'pricing_plan2_price_30', 'pricing_plan2_price_45', 'pricing_plan2_price_60',
        'pricing_plan3_name', 'pricing_plan3_desc', 'pricing_plan3_feat1', 'pricing_plan3_feat2', 'pricing_plan3_feat3', 'pricing_plan3_feat4',
        'pricing_plan3_price_30', 'pricing_plan3_price_45', 'pricing_plan3_price_60'
      );
    } else if (sectionId === 'final_cta') {
      fieldsToReset.push(
        'final_cta_tag', 'final_cta_title', 'final_cta_desc', 'final_cta_btn_courses', 'final_cta_btn_contact'
      );
    } else if (sectionId === 'footer') {
      fieldsToReset.push('footer_verse');
    }

    setFieldValues(prev => {
      const updated = { ...prev };
      fieldsToReset.forEach(field => {
        updated[field] = {
          ar: initialSettings[field]?.ar || DEFAULTS_MAP[field]?.ar || '',
          en: initialSettings[field]?.en || DEFAULTS_MAP[field]?.en || '',
          fr: initialSettings[field]?.fr || DEFAULTS_MAP[field]?.fr || ''
        };
      });
      return updated;
    });
  };
  
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const heroPreviewRef = useRef<HTMLDivElement>(null);

  // Media Selector Modal State
  const [imageSelectorOpen, setImageSelectorOpen] = useState(false);
  const [imageSelectorField, setImageSelectorField] = useState('');
  const [imageSelectorSection, setImageSelectorSection] = useState('');
  const [mediaList, setMediaList] = useState<string[]>(initialMedia);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeSelectorTab, setActiveSelectorTab] = useState<'library' | 'upload' | 'url'>('library');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Sync initialMedia with mediaList state
  useEffect(() => {
    if (initialMedia) {
      setMediaList(initialMedia);
    }
  }, [initialMedia]);

  const openImageSelector = (field: string, section: string) => {
    setImageSelectorField(field);
    setImageSelectorSection(section);
    const currentVal = fieldValues[field]?.[sectionLang[section]] || '';
    setCustomImageUrl(currentVal);
    setUploadError(null);
    setActiveSelectorTab('library');
    setImageSelectorOpen(true);
  };

  const selectImage = (url: string) => {
    const lang = sectionLang[imageSelectorSection];
    handleFieldChange(imageSelectorField, lang, url);
    setImageSelectorOpen(false);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('mediaFile', file);
      formData.append('locale', locale);

      const res = await uploadMedia(null, formData);

      if (res?.error) {
        setUploadError(res.error);
      } else if (res?.url) {
        setMediaList(prev => [res.url, ...prev]);
        selectImage(res.url);
      } else {
        setUploadError(isRtl ? 'فشل الرفع' : 'Upload failed');
      }
    } catch (err: any) {
      setUploadError(err.message || 'An error occurred during upload.');
    } finally {
      setUploadingImage(false);
    }
  };

  const subTabsRef = useRef<HTMLDivElement>(null);

  const scrollSubTabs = (direction: 'left' | 'right') => {
    if (subTabsRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      subTabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Sync hero background image to DOM ref to prevent inline style linter warning
  useEffect(() => {
    if (heroPreviewRef.current && activeSubSection === 'hero') {
      const bgUrl = heroBgPreviews[sectionLang.hero] || 
                    initialSettings.hero_bg_image?.[sectionLang.hero] || 
                    initialSettings.hero_bg_image?.['ar'] || 
                    initialSettings.hero_bg_image?.['en'] || 
                    '/hero-pc-bg.webp';
      heroPreviewRef.current.style.backgroundImage = `url(${bgUrl})`;
    }
  }, [heroBgPreviews, sectionLang.hero, initialSettings, activeSubSection]);

  // Initialize field values from initial settings
  useEffect(() => {
    const values: Record<string, Record<string, string>> = {};
    const defaultKeys = Object.keys(DEFAULTS_MAP);
    const dynamicKeys = Object.keys(initialSettings).filter(
      key => key.startsWith('testimonial') && !defaultKeys.includes(key)
    );
    const allKeys = [...defaultKeys, ...dynamicKeys];
    
    allKeys.forEach(key => {
      values[key] = {
        ar: initialSettings[key]?.ar || DEFAULTS_MAP[key]?.ar || '',
        en: initialSettings[key]?.en || DEFAULTS_MAP[key]?.en || '',
        fr: initialSettings[key]?.fr || DEFAULTS_MAP[key]?.fr || ''
      };
    });
    setFieldValues(values);
  }, [initialSettings]);

  const handleFieldChange = (key: string, lang: 'ar' | 'en' | 'fr', val: string) => {
    setFieldValues(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [lang]: val
      }
    }));
  };

  const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>, lang: 'ar' | 'en' | 'fr') => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setHeroBgPreviews(prev => ({
        ...prev,
        [lang]: previewUrl
      }));
    }
  };

  const handleSaveSection = async (e: React.FormEvent<HTMLFormElement>, sectionId: string) => {
    e.preventDefault();
    
    setSaveStates(prev => ({
      ...prev,
      [sectionId]: { loading: true, success: false, error: null }
    }));

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('locale', locale);

      const result = await saveSettings(formData);

      if (result?.error) {
        setSaveStates(prev => ({
          ...prev,
          [sectionId]: { loading: false, success: false, error: result.error }
        }));
      } else {
        setSaveStates(prev => ({
          ...prev,
          [sectionId]: { loading: false, success: true, error: null }
        }));

        setTimeout(() => {
          setSaveStates(prev => ({
            ...prev,
            [sectionId]: { ...prev[sectionId], success: false }
          }));
        }, 3000);
      }
    } catch (err: any) {
      setSaveStates(prev => ({
        ...prev,
        [sectionId]: { loading: false, success: false, error: err.message || 'An error occurred' }
      }));
    }
  };

  const getVal = (key: string, sectionId: string) => {
    const lang = sectionLang[sectionId];
    return fieldValues[key]?.[lang] || '';
  };

  return (
    <div className="cms-editor-container w-full space-y-6">
      {/* Top Page Selector Tabs Menu */}
      <div className="bg-white/60 backdrop-blur-md border border-gold-muted/15 rounded-2xl p-2.5 shadow-[0_8px_30px_rgba(139,115,85,0.03)] flex flex-col sm:flex-row items-center gap-4">
        <div className={`text-[10px] font-bold text-stone/50 uppercase tracking-widest px-3 py-1 font-ui text-start ${isRtl ? 'sm:border-l' : 'sm:border-r'} border-gold-muted/15 shrink-0`}>
          {isRtl ? 'الصفحة النشطة للتعديل' : 'Active Page to Edit'}
        </div>
        <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
          {PAGES_CONFIG.map((page) => {
            const Icon = page.icon;
            const isActive = page.id === activeTab;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => {
                  setActiveTab(page.id);
                  if (page.id === 'homepage') {
                    setActiveSubSection('hero');
                  }
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold font-ui transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-gold text-white shadow-md shadow-gold/20 scale-[1.01]' 
                    : 'bg-white hover:bg-gold-muted/5 text-stone/80 hover:text-midnight border border-stone/10 hover:border-gold/25'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-gold'} />
                <span>{isRtl ? page.titleAr : page.titleEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections List */}
      <div className="w-full space-y-8">
        
        {/* HOMEPAGE TAB CONTENT */}
        {activeTab === 'homepage' && (
          <>
            {/* Sub-tab navigation */}
            <div className="relative group/tabs flex items-center mb-6 bg-gold-muted/5 border border-gold-muted/10 p-1 rounded-2xl">
              {/* Left scroll button */}
              <button
                type="button"
                onClick={() => scrollSubTabs('left')}
                className="absolute left-2 z-20 bg-[#162742]/90 hover:bg-[#162742] text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover/tabs:opacity-100 transition-opacity duration-300 shadow-md text-[9px] font-bold select-none cursor-pointer"
                title={isRtl ? 'تمرير لليسار' : 'Scroll Left'}
              >
                ◀
              </button>

              <div 
                ref={subTabsRef}
                className="flex-1 flex overflow-x-auto gap-2 p-1.5 cms-editor-subtabs-scrollbar whitespace-nowrap scroll-smooth px-8"
              >
                {HOMEPAGE_SUB_SECTIONS.map((sub) => {
                  const isSubActive = sub.id === activeSubSection;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setActiveSubSection(sub.id)}
                      className={`shrink-0 px-3 py-1.5 text-[9px] font-bold rounded-lg transition-all cursor-pointer font-ui ${
                        isSubActive 
                          ? 'bg-gold text-white shadow-sm scale-[1.01]' 
                          : 'bg-white hover:bg-gold-muted/5 text-stone border border-stone/10 hover:border-gold/25'
                      }`}
                    >
                      {isRtl ? sub.titleAr : sub.titleEn}
                    </button>
                  );
                })}
              </div>

              {/* Right scroll button */}
              <button
                type="button"
                onClick={() => scrollSubTabs('right')}
                className="absolute right-2 z-20 bg-[#162742]/90 hover:bg-[#162742] text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover/tabs:opacity-100 transition-opacity duration-300 shadow-md text-[9px] font-bold select-none cursor-pointer"
                title={isRtl ? 'تمرير لليمين' : 'Scroll Right'}
              >
                ▶
              </button>
            </div>

            {/* HERO SECTION CARD */}
            {activeSubSection === 'hero' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'hero')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Card Header & Language Toggle */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <Sparkles size={16} className="text-gold" />
                      {isRtl ? 'تصميم قسم البانر الرئيسي (Hero Section)' : 'Hero Section Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تحرير نصوص وصورة خلفية البانر الرئيسي للموقع بالشكل الحقيقي' : 'Visual editor for tagline, headline, paragraph and background image.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, hero: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.hero === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High-Fidelity Mini Layout Preview */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold text-stone/50 uppercase tracking-widest text-start font-ui">
                      {isRtl ? 'معاينة مباشرة تفاعلية (اضغط على أي نص للتعديل)' : 'Interactive Live Preview (Click any text area to edit)'}
                    </div>
                    {heroBgPreviews[sectionLang.hero] && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gold/10 text-gold text-[8px] font-bold rounded border border-gold/25 animate-pulse font-ui">
                        <ImageIcon size={10} />
                        {isRtl ? 'خلفية جديدة جاهزة للحفظ' : 'New background pending save'}
                      </span>
                    )}
                  </div>
                  
                  {/* Visual Preview Shell */}
                  <div 
                    ref={heroPreviewRef}
                    className="relative rounded-2xl overflow-hidden min-h-[640px] flex flex-col justify-between p-12 md:p-16 bg-cover bg-center border border-gold-muted/20 transition-all duration-500 shadow-inner group"
                  >
                    {/* Ambient Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/65 to-midnight/35 z-0" />

                    {/* Change Background Button Overlay (Premium Styling) */}
                    <div className="absolute top-4 right-4 z-20">
                      <button
                        type="button"
                        onClick={() => heroFileInputRef.current?.click()}
                        className="bg-midnight/70 hover:bg-gold backdrop-blur-md border border-gold-champagne/30 hover:border-gold text-white font-bold text-[9px] py-2 px-3 rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-all duration-300 shadow-lg hover:scale-105"
                      >
                        <Upload size={12} className="text-gold-champagne group-hover:text-white" />
                        <span>{isRtl ? 'تغيير الخلفية' : 'Change Background'}</span>
                      </button>
                    </div>

                    {/* Hidden Background File Input */}
                    <input
                      ref={heroFileInputRef}
                      type="file"
                      name={`hero_bg_image__${sectionLang.hero}`}
                      accept="image/*"
                      onChange={(e) => handleBgImageChange(e, sectionLang.hero)}
                      className="hidden"
                      title={isRtl ? 'تحميل صورة الخلفية للبانر الرئيسي' : 'Upload hero background image'}
                    />

                    {/* Hero Left Column Replica */}
                    <div className="relative z-10 w-full max-w-lg space-y-8 self-center text-start">
                      
                      {/* Tagline Input Group */}
                      <div className="relative group/field space-y-1">
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                          <Pencil size={8} />
                          <span>{isRtl ? 'الشعار الممهد' : 'Tagline'}</span>
                        </span>
                        
                        <input
                          type="text"
                          name={`hero_tagline__${sectionLang.hero}`}
                          value={getVal('hero_tagline', 'hero')}
                          onChange={(e) => handleFieldChange('hero_tagline', sectionLang.hero, e.target.value)}
                          placeholder="Tagline..."
                          className="w-full bg-black/15 hover:bg-black/25 focus:bg-midnight/40 border border-dashed border-white/20 hover:border-gold-champagne/60 focus:border-gold-champagne rounded-lg px-3 py-2.5 text-gold-champagne text-xs md:text-sm font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-gold-champagne font-ui transition-all"
                        />
                      </div>

                      {/* Headline Input Group */}
                      <div className="relative group/field space-y-1">
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                          <Pencil size={8} />
                          <span>{isRtl ? 'العنوان الرئيسي' : 'Headline'}</span>
                        </span>
                        
                        <textarea
                          name={`hero_headline__${sectionLang.hero}`}
                          value={getVal('hero_headline', 'hero')}
                          onChange={(e) => handleFieldChange('hero_headline', sectionLang.hero, e.target.value)}
                          placeholder="Headline..."
                          rows={2}
                          className="w-full bg-black/15 hover:bg-black/25 focus:bg-midnight/40 border border-dashed border-white/20 hover:border-gold/60 focus:border-gold rounded-lg px-3 py-2 text-white text-lg md:text-2xl font-bold font-primary leading-normal focus:outline-none focus:ring-1 focus:ring-gold resize-none transition-all"
                        />
                      </div>

                      {/* Description Paragraph Input Group */}
                      <div className="relative group/field space-y-1">
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                          <Pencil size={8} />
                          <span>{isRtl ? 'الوصف التعريفي' : 'Description'}</span>
                        </span>
                        
                        <textarea
                          name={`hero_description__${sectionLang.hero}`}
                          value={getVal('hero_description', 'hero')}
                          onChange={(e) => handleFieldChange('hero_description', sectionLang.hero, e.target.value)}
                          placeholder="Paragraph description..."
                          rows={3}
                          className="w-full bg-black/15 hover:bg-black/25 focus:bg-midnight/40 border border-dashed border-white/20 hover:border-white/40 focus:border-gold rounded-lg px-4 py-3 text-parchment/80 text-xs md:text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-gold resize-none font-ui transition-all"
                        />
                      </div>

                      {/* Action buttons mockup (interactive preview) */}
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-2.5">
                          {/* Primary CTA */}
                          <div className="relative group/field flex-1 min-w-[140px] max-w-[200px]">
                            <span className="absolute -top-2 right-2 px-1 py-0.5 bg-gold text-[7px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                              <Pencil size={6} />
                              <span>{isRtl ? 'الزر الرئيسي' : 'Primary CTA'}</span>
                            </span>
                            <input
                              type="text"
                              name={`hero_cta_primary__${sectionLang.hero}`}
                              value={getVal('hero_cta_primary', 'hero')}
                              onChange={(e) => handleFieldChange('hero_cta_primary', sectionLang.hero, e.target.value)}
                              placeholder={isRtl ? 'حجز حصة تجريبية' : 'Book a Trial Class'}
                              className="w-full bg-gold text-[#22314b] text-[11px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full border border-dashed border-midnight/15 hover:border-midnight/40 focus:border-midnight focus:outline-none transition-all text-center"
                            />
                          </div>

                          {/* Secondary CTA */}
                          <div className="relative group/field flex-1 min-w-[140px] max-w-[200px]">
                            <span className="absolute -top-2 right-2 px-1 py-0.5 bg-gold text-[7px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                              <Pencil size={6} />
                              <span>{isRtl ? 'الزر الثانوي' : 'Secondary CTA'}</span>
                            </span>
                            <input
                              type="text"
                              name={`hero_cta_secondary__${sectionLang.hero}`}
                              value={getVal('hero_cta_secondary', 'hero')}
                              onChange={(e) => handleFieldChange('hero_cta_secondary', sectionLang.hero, e.target.value)}
                              placeholder={isRtl ? 'منهجيتنا التعليمية' : 'Our Methodology'}
                              className="w-full bg-white/5 text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full border border-dashed border-gold-champagne/20 hover:border-gold-champagne/65 focus:border-gold-champagne focus:outline-none transition-all text-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Stats replica (Editable fields) */}
                    <div className="relative z-10 w-full border-t border-white/10 pt-4 flex flex-wrap gap-4 justify-between items-center">
                      {/* Stat 1 */}
                      <div className="flex-1 min-w-[100px] relative group text-center space-y-1 border border-dashed border-white/10 hover:border-gold-champagne/30 rounded-lg p-3.5 transition-all">
                        <span className="absolute -top-2 right-1/2 translate-x-1/2 px-1 py-0.5 bg-gold text-[6px] font-bold text-midnight rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui whitespace-nowrap">
                          {isRtl ? 'الإحصائية ١' : 'Stat 1'}
                        </span>
                        <input
                          type="text"
                          name={`hero_stat1_value__${sectionLang.hero}`}
                          value={getVal('hero_stat1_value', 'hero')}
                          onChange={(e) => handleFieldChange('hero_stat1_value', sectionLang.hero, e.target.value)}
                          placeholder="32+"
                          className="w-full bg-black/20 hover:bg-black/35 focus:bg-midnight/40 border border-transparent hover:border-gold-champagne/30 focus:border-gold-champagne rounded px-3 py-1.5 text-gold-champagne text-base md:text-xl font-bold focus:outline-none text-center transition-all"
                        />
                        <input
                          type="text"
                          name={`hero_stat1_label__${sectionLang.hero}`}
                          value={getVal('hero_stat1_label', 'hero')}
                          onChange={(e) => handleFieldChange('hero_stat1_label', sectionLang.hero, e.target.value)}
                          placeholder="Students"
                          className="w-full bg-black/20 hover:bg-black/35 focus:bg-midnight/40 border border-transparent hover:border-gold-champagne/30 focus:border-gold-champagne rounded px-3 py-1.5 text-parchment/80 text-[10px] md:text-xs uppercase tracking-wider focus:outline-none text-center transition-all"
                        />
                      </div>

                      {/* Stat 2 */}
                      <div className="flex-1 min-w-[100px] relative group text-center space-y-1 border border-dashed border-white/10 hover:border-gold-champagne/30 rounded-lg p-3.5 transition-all">
                        <span className="absolute -top-2 right-1/2 translate-x-1/2 px-1 py-0.5 bg-gold text-[6px] font-bold text-midnight rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui whitespace-nowrap">
                          {isRtl ? 'الإحصائية ٢' : 'Stat 2'}
                        </span>
                        <input
                          type="text"
                          name={`hero_stat2_value__${sectionLang.hero}`}
                          value={getVal('hero_stat2_value', 'hero')}
                          onChange={(e) => handleFieldChange('hero_stat2_value', sectionLang.hero, e.target.value)}
                          placeholder="40+"
                          className="w-full bg-black/20 hover:bg-black/35 focus:bg-midnight/40 border border-transparent hover:border-gold-champagne/30 focus:border-gold-champagne rounded px-3 py-1.5 text-gold-champagne text-base md:text-xl font-bold focus:outline-none text-center transition-all"
                        />
                        <input
                          type="text"
                          name={`hero_stat2_label__${sectionLang.hero}`}
                          value={getVal('hero_stat2_label', 'hero')}
                          onChange={(e) => handleFieldChange('hero_stat2_label', sectionLang.hero, e.target.value)}
                          placeholder="Teachers"
                          className="w-full bg-black/20 hover:bg-black/35 focus:bg-midnight/40 border border-transparent hover:border-gold-champagne/30 focus:border-gold-champagne rounded px-3 py-1.5 text-parchment/80 text-[10px] md:text-xs uppercase tracking-wider focus:outline-none text-center transition-all"
                        />
                      </div>

                      {/* Stat 3 */}
                      <div className="flex-1 min-w-[100px] relative group text-center space-y-1 border border-dashed border-white/10 hover:border-gold-champagne/30 rounded-lg p-3.5 transition-all">
                        <span className="absolute -top-2 right-1/2 translate-x-1/2 px-1 py-0.5 bg-gold text-[6px] font-bold text-midnight rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui whitespace-nowrap">
                          {isRtl ? 'الإحصائية ٣' : 'Stat 3'}
                        </span>
                        <input
                          type="text"
                          name={`hero_stat3_value__${sectionLang.hero}`}
                          value={getVal('hero_stat3_value', 'hero')}
                          onChange={(e) => handleFieldChange('hero_stat3_value', sectionLang.hero, e.target.value)}
                          placeholder="25,000+"
                          className="w-full bg-black/20 hover:bg-black/35 focus:bg-midnight/40 border border-transparent hover:border-gold-champagne/30 focus:border-gold-champagne rounded px-3 py-1.5 text-gold-champagne text-base md:text-xl font-bold focus:outline-none text-center transition-all"
                        />
                        <input
                          type="text"
                          name={`hero_stat3_label__${sectionLang.hero}`}
                          value={getVal('hero_stat3_label', 'hero')}
                          onChange={(e) => handleFieldChange('hero_stat3_label', sectionLang.hero, e.target.value)}
                          placeholder="Hours"
                          className="w-full bg-black/20 hover:bg-black/35 focus:bg-midnight/40 border border-transparent hover:border-gold-champagne/30 focus:border-gold-champagne rounded px-3 py-1.5 text-parchment/80 text-[10px] md:text-xs uppercase tracking-wider focus:outline-none text-center transition-all"
                        />
                      </div>

                      {/* Stat 4 */}
                      <div className="flex-1 min-w-[100px] relative group text-center space-y-1 border border-dashed border-white/10 hover:border-gold-champagne/30 rounded-lg p-3.5 transition-all">
                        <span className="absolute -top-2 right-1/2 translate-x-1/2 px-1 py-0.5 bg-gold text-[6px] font-bold text-midnight rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui whitespace-nowrap">
                          {isRtl ? 'الإحصائية ٤' : 'Stat 4'}
                        </span>
                        <input
                          type="text"
                          name={`hero_stat4_value__${sectionLang.hero}`}
                          value={getVal('hero_stat4_value', 'hero')}
                          onChange={(e) => handleFieldChange('hero_stat4_value', sectionLang.hero, e.target.value)}
                          placeholder="4.9/5"
                          className="w-full bg-black/20 hover:bg-black/35 focus:bg-midnight/40 border border-transparent hover:border-gold-champagne/30 focus:border-gold-champagne rounded px-3 py-1.5 text-gold-champagne text-base md:text-xl font-bold focus:outline-none text-center transition-all"
                        />
                        <input
                          type="text"
                          name={`hero_stat4_label__${sectionLang.hero}`}
                          value={getVal('hero_stat4_label', 'hero')}
                          onChange={(e) => handleFieldChange('hero_stat4_label', sectionLang.hero, e.target.value)}
                          placeholder="Rating"
                          className="w-full bg-black/20 hover:bg-black/35 focus:bg-midnight/40 border border-transparent hover:border-gold-champagne/30 focus:border-gold-champagne rounded px-3 py-1.5 text-parchment/80 text-[10px] md:text-xs uppercase tracking-wider focus:outline-none text-center transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Footer Actions */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.hero?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات ونشرها بنجاح' : 'Hero section updated successfully'}
                      </span>
                    )}
                    {saveStates.hero?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.hero.error}` : `Error: ${saveStates.hero.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('hero')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.hero?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.hero?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.hero?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ والنشر...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* ABOUT US TEASER SECTION */}
            {activeSubSection === 'about' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'about')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Card Header & Language Toggle */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <BookOpen size={16} className="text-gold" />
                      {isRtl ? 'قسم نبذة عن الأكاديمية (About Section)' : 'About Teaser Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تحرير العنوان والفقرة التمهيدية لقسم التعريف بالأكاديمية بالشكل الحقيقي' : 'Visual editor for about us tagline, section title and header description.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, about: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.about === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High-Fidelity Mini Layout Preview */}
                <div className="p-6">
                  <div className="text-[10px] font-bold text-stone/50 uppercase tracking-widest mb-3 text-start font-ui">
                    {isRtl ? 'معاينة مباشرة تفاعلية (اضغط على أي نص للتعديل)' : 'Interactive Live Preview (Click any text area to edit)'}
                  </div>

                  {/* About section wrapper */}
                  <div className="relative rounded-3xl p-14 md:p-20 bg-[#FDFAF3] border border-gold-muted/15 shadow-inner space-y-12">
                    <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:30px_30px] opacity-[0.03] pointer-events-none rounded-2xl" />

                    {/* Main section header (with editable fields) */}
                    <div className="relative z-10 text-center max-w-xl mx-auto space-y-8">
                      {/* About Section Tag Input */}
                      <div className="relative group/field space-y-1 w-full max-w-xs mx-auto">
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                          <Pencil size={8} />
                          <span>{isRtl ? 'الشعار الصغير' : 'Small Tag'}</span>
                        </span>
                        <input
                          type="text"
                          name={`about_teaser_tag__${sectionLang.about}`}
                          value={getVal('about_teaser_tag', 'about')}
                          onChange={(e) => handleFieldChange('about_teaser_tag', sectionLang.about, e.target.value)}
                          placeholder="Tag..."
                          className="w-full text-center bg-white/60 hover:bg-white focus:bg-white border border-dashed border-gold-muted/30 hover:border-gold focus:border-gold rounded-lg px-2 py-0.5 text-gold text-xs md:text-sm font-bold uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                        />
                      </div>
                      
                      {/* About Section Title */}
                      <div className="relative group/field space-y-1">
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                          <Pencil size={8} />
                          <span>{isRtl ? 'عنوان القسم الرئيسي' : 'Section Title'}</span>
                        </span>
                        
                        <input
                          type="text"
                          name={`about_teaser_title__${sectionLang.about}`}
                          value={getVal('about_teaser_title', 'about')}
                          onChange={(e) => handleFieldChange('about_teaser_title', sectionLang.about, e.target.value)}
                          placeholder="Section title..."
                          className="w-full text-center bg-white/60 hover:bg-white focus:bg-white border border-dashed border-gold-muted/30 hover:border-gold focus:border-gold rounded-lg px-2.5 py-1.5 text-midnight text-base md:text-xl font-bold font-primary focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                        />
                      </div>

                      {/* About Section Paragraph Description */}
                      <div className="relative group/field space-y-1">
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                          <Pencil size={8} />
                          <span>{isRtl ? 'الوصف التمهيدي' : 'Teaser Paragraph'}</span>
                        </span>
                        
                        <textarea
                          name={`about_teaser_description__${sectionLang.about}`}
                          value={getVal('about_teaser_description', 'about')}
                          onChange={(e) => handleFieldChange('about_teaser_description', sectionLang.about, e.target.value)}
                          placeholder="Teaser description..."
                          rows={2}
                          className="w-full text-center bg-white/60 hover:bg-white focus:bg-white border border-dashed border-gold-muted/30 hover:border-gold focus:border-gold rounded-lg px-2.5 py-1.5 text-stone text-xs md:text-sm leading-relaxed font-ui focus:outline-none focus:ring-1 focus:ring-gold resize-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Two columns mockup representation */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch text-start">
                      {/* Philosophy card mock */}
                      <div className="md:col-span-5 bg-[#223554] border border-gold-hi/30 rounded-xl p-8 md:p-10 text-center space-y-5 flex flex-col justify-between shadow-sm">
                        <div className="text-gold-hi/60 text-[10px] font-amiri select-none">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                        <div className="text-gold-hi text-xs font-amiri leading-normal select-none">﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾</div>
                        
                        {/* Philosophy Title Input */}
                        <div className="relative group/field space-y-1">
                          <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                            <Pencil size={8} />
                            <span>{isRtl ? 'عنوان الفلسفة' : 'Philosophy Title'}</span>
                          </span>
                          <input
                            type="text"
                            name={`about_teaser_philosophy_title__${sectionLang.about}`}
                            value={getVal('about_teaser_philosophy_title', 'about')}
                            onChange={(e) => handleFieldChange('about_teaser_philosophy_title', sectionLang.about, e.target.value)}
                            placeholder="Philosophy title..."
                            className="w-full bg-black/15 hover:bg-black/25 focus:bg-midnight/40 border border-dashed border-white/20 hover:border-gold-hi/60 focus:border-gold-hi rounded-lg px-2 py-1 text-gold-hi text-xs md:text-sm font-bold focus:outline-none focus:ring-1 focus:ring-gold-hi transition-all text-center"
                          />
                        </div>

                        {/* Philosophy Text Input */}
                        <div className="relative group/field space-y-1 flex-1">
                          <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                            <Pencil size={8} />
                            <span>{isRtl ? 'نص الفلسفة' : 'Philosophy Text'}</span>
                          </span>
                          <textarea
                            name={`about_teaser_philosophy_text__${sectionLang.about}`}
                            value={getVal('about_teaser_philosophy_text', 'about')}
                            onChange={(e) => handleFieldChange('about_teaser_philosophy_text', sectionLang.about, e.target.value)}
                            placeholder="Philosophy text..."
                            rows={4}
                            className="w-full bg-black/15 hover:bg-black/25 focus:bg-midnight/40 border border-dashed border-white/20 hover:border-gold-hi/60 focus:border-gold-hi rounded-lg px-2 py-1 text-[#e1e9f5] text-[10px] md:text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-gold-hi resize-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Pillars list mock */}
                      <div className="md:col-span-7 space-y-6 flex flex-col justify-center">
                        {/* Pillar 1 */}
                        <div className="bg-white border border-gold-muted/10 rounded-xl p-6 flex gap-5 items-start relative group">
                          <span className="p-1.5 bg-gold/10 text-gold rounded-lg font-bold select-none text-[9px]">1</span>
                          <div className="flex-1 space-y-1.5 text-start">
                            {/* Title input */}
                            <div className="relative group/field">
                              <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[7px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                                <Pencil size={6} />
                                <span>{isRtl ? 'عنوان الركيزة الأولى' : 'Pillar 1 Title'}</span>
                              </span>
                              <input
                                type="text"
                                name={`about_teaser_pillar1_title__${sectionLang.about}`}
                                value={getVal('about_teaser_pillar1_title', 'about')}
                                onChange={(e) => handleFieldChange('about_teaser_pillar1_title', sectionLang.about, e.target.value)}
                                placeholder="Pillar 1 Title..."
                                className="w-full bg-stone-50 hover:bg-white focus:bg-white border border-dashed border-gold-muted/20 hover:border-gold focus:border-gold rounded px-2 py-0.5 text-midnight font-bold text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                              />
                            </div>
                            
                            {/* Text input */}
                            <div className="relative group/field">
                              <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[7px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                                <Pencil size={6} />
                                <span>{isRtl ? 'وصف الركيزة الأولى' : 'Pillar 1 Description'}</span>
                              </span>
                              <textarea
                                name={`about_teaser_pillar1_text__${sectionLang.about}`}
                                value={getVal('about_teaser_pillar1_text', 'about')}
                                onChange={(e) => handleFieldChange('about_teaser_pillar1_text', sectionLang.about, e.target.value)}
                                placeholder="Pillar 1 Description..."
                                rows={2}
                                className="w-full bg-stone-50 hover:bg-white focus:bg-white border border-dashed border-gold-muted/20 hover:border-gold focus:border-gold rounded px-2 py-1 text-stone/80 text-[10px] md:text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-gold resize-none transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Pillar 2 */}
                        <div className="bg-white border border-gold-muted/10 rounded-xl p-6 flex gap-5 items-start relative group">
                          <span className="p-1.5 bg-gold/10 text-gold rounded-lg font-bold select-none text-[9px]">2</span>
                          <div className="flex-1 space-y-1.5 text-start">
                            {/* Title input */}
                            <div className="relative group/field">
                              <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[7px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                                <Pencil size={6} />
                                <span>{isRtl ? 'عنوان الركيزة الثانية' : 'Pillar 2 Title'}</span>
                              </span>
                              <input
                                type="text"
                                name={`about_teaser_pillar2_title__${sectionLang.about}`}
                                value={getVal('about_teaser_pillar2_title', 'about')}
                                onChange={(e) => handleFieldChange('about_teaser_pillar2_title', sectionLang.about, e.target.value)}
                                placeholder="Pillar 2 Title..."
                                className="w-full bg-stone-50 hover:bg-white focus:bg-white border border-dashed border-gold-muted/20 hover:border-gold focus:border-gold rounded px-2 py-0.5 text-midnight font-bold text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                              />
                            </div>
                            
                            {/* Text input */}
                            <div className="relative group/field">
                              <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[7px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                                <Pencil size={6} />
                                <span>{isRtl ? 'وصف الركيزة الثانية' : 'Pillar 2 Description'}</span>
                              </span>
                              <textarea
                                name={`about_teaser_pillar2_text__${sectionLang.about}`}
                                value={getVal('about_teaser_pillar2_text', 'about')}
                                onChange={(e) => handleFieldChange('about_teaser_pillar2_text', sectionLang.about, e.target.value)}
                                placeholder="Pillar 2 Description..."
                                rows={2}
                                className="w-full bg-stone-50 hover:bg-white focus:bg-white border border-dashed border-gold-muted/20 hover:border-gold focus:border-gold rounded px-2 py-1 text-stone/80 text-[10px] md:text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-gold resize-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Center - Link to Full About Page (Editable) */}
                    <div className="relative z-10 mt-8 pt-6 border-t border-gold-muted/15 flex flex-col items-center gap-2">
                      <div className="relative group/field w-full max-w-xs">
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                          <Pencil size={8} />
                          <span>{isRtl ? 'زر اقرأ المزيد' : 'Read More Button'}</span>
                        </span>
                        <div className="flex items-center justify-center gap-2 w-full">
                          <input
                            type="text"
                            name={`about_teaser_btn__${sectionLang.about}`}
                            value={getVal('about_teaser_btn', 'about')}
                            onChange={(e) => handleFieldChange('about_teaser_btn', sectionLang.about, e.target.value)}
                            placeholder={isRtl ? 'اقرأ المزيد عن رسالتنا' : 'Read More About Our Mission'}
                            className="w-full bg-white border border-dashed border-gold-muted/30 hover:border-gold focus:border-gold rounded-lg px-2.5 py-1 text-gold text-xs font-bold uppercase tracking-widest text-center focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Footer Actions */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.about?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'About section updated successfully'}
                      </span>
                    )}
                    {saveStates.about?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.about.error}` : `Error: ${saveStates.about.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('about')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.about?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.about?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.about?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* CREDIBILITY SECTION */}
            {activeSubSection === 'credibility' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'credibility')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <Award size={16} className="text-gold" />
                      {isRtl ? 'قسم معايير الجودة والمصداقية' : 'Credibility & Vetting Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تعديل عنوان القسم والركائز الخمس للمصداقية' : 'Edit the section header title and five indicators of trust.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, credibility: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.credibility === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview and Inputs */}
                <div className="p-6 space-y-6">
                  {/* Live Simulation Shell */}
                  <div className="bg-navy-sapphire rounded-3xl p-12 md:p-16 text-center text-parchment space-y-12 relative overflow-hidden border border-gold-muted/20">
                    <div className="relative group/field space-y-1 max-w-2xl mx-auto">
                      <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                        <Pencil size={8} />
                        <span>{isRtl ? 'عنوان القسم' : 'Section Title'}</span>
                      </span>
                      <input
                        type="text"
                        name={`credibility_title__${sectionLang.credibility}`}
                        value={getVal('credibility_title', 'credibility')}
                        onChange={(e) => handleFieldChange('credibility_title', sectionLang.credibility, e.target.value)}
                        placeholder="Section title..."
                        className="w-full text-center bg-black/15 hover:bg-black/25 focus:bg-midnight/40 border border-dashed border-gold-hi/30 hover:border-gold focus:border-gold rounded-lg px-2 py-1.5 text-parchment text-sm font-bold font-primary focus:outline-none transition-all"
                      />
                    </div>

                    {/* Cards mockup */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
                      {([1, 2, 3, 4, 5] as const).map((num, idx) => {
                        let gridClasses = 'col-span-1';
                        if (idx < 3) {
                          gridClasses += ' md:col-span-2';
                        } else if (idx === 3) {
                          gridClasses += ' md:col-span-2 md:col-start-2';
                        } else {
                          gridClasses += ' md:col-span-2';
                        }

                        return (
                          <div key={num} className={`${gridClasses} bg-white/[0.04] border border-gold-hi/20 rounded-xl p-6 flex flex-col items-center gap-4 relative group overflow-hidden`}>
                            {/* Decorative top-accent gold line */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted/30 via-gold-hi to-gold-muted/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <span className="absolute -top-2 right-2 px-1 py-0.5 bg-gold text-[6px] font-bold text-midnight rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui whitespace-nowrap">
                              {isRtl ? `الركيزة ${num}` : `Pillar ${num}`}
                            </span>

                            {/* Icon wrapper */}
                            <div className="w-10 h-10 bg-white/5 border border-gold-hi/20 rounded-full flex items-center justify-center mb-1 shadow-md text-gold-hi shrink-0">
                              {num === 1 && <Award className="text-gold w-4 h-4" />}
                              {num === 2 && <UserCheck className="text-gold w-4 h-4" />}
                              {num === 3 && <Globe2 className="text-gold w-4 h-4" />}
                              {num === 4 && <BookOpen className="text-gold w-4 h-4" />}
                              {num === 5 && <Clock className="text-gold w-4 h-4" />}
                            </div>
                            
                            <div className="relative group/field space-y-1 w-full">
                              <input
                                type="text"
                                name={`credibility_diff${num}_title__${sectionLang.credibility}`}
                                value={getVal(`credibility_diff${num}_title`, 'credibility')}
                                onChange={(e) => handleFieldChange(`credibility_diff${num}_title`, sectionLang.credibility, e.target.value)}
                                placeholder={`Pillar ${num} Title`}
                                className="w-full text-center bg-black/15 hover:bg-black/25 focus:bg-midnight/40 border border-dashed border-white/20 hover:border-gold rounded px-1 py-0.5 text-gold-hi font-bold text-xs focus:outline-none transition-all"
                              />
                            </div>

                            <div className="relative group/field space-y-1 w-full">
                              <textarea
                                name={`credibility_diff${num}_desc__${sectionLang.credibility}`}
                                value={getVal(`credibility_diff${num}_desc`, 'credibility')}
                                onChange={(e) => handleFieldChange(`credibility_diff${num}_desc`, sectionLang.credibility, e.target.value)}
                                placeholder={`Pillar ${num} Description`}
                                rows={3}
                                className="w-full text-center bg-black/15 hover:bg-black/25 focus:bg-midnight/40 border border-dashed border-white/10 hover:border-gold rounded px-1 py-1 text-parchment/70 text-xs focus:outline-none resize-none transition-all"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.credibility?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Credibility updated successfully'}
                      </span>
                    )}
                    {saveStates.credibility?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.credibility.error}` : `Error: ${saveStates.credibility.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('credibility')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.credibility?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.credibility?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.credibility?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* PROGRAMS SHOWCASE SECTION */}
            {activeSubSection === 'programs' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'programs')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <BookOpen size={16} className="text-gold" />
                      {isRtl ? 'قسم البرامج الأكاديمية التخصصية' : 'Programs Showcase Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تعديل نصوص البرامج الثلاثة ومحتواها التفصيلي' : 'Edit labels, titles and books for Quran, Arabic, and Shariah programs.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, programs: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.programs === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Body Preview */}
                <div className="p-6 space-y-6 text-start">
                  <div className="relative rounded-3xl p-10 md:p-14 bg-ivory border border-gold-muted/15 shadow-inner space-y-10">
                    {/* Header values */}
                    <div className="text-center max-w-xl mx-auto space-y-3">
                      <input
                        type="text"
                        name={`programs_showcase_tag__${sectionLang.programs}`}
                        value={getVal('programs_showcase_tag', 'programs')}
                        onChange={(e) => handleFieldChange('programs_showcase_tag', sectionLang.programs, e.target.value)}
                        placeholder="Tag..."
                        className="w-full text-center bg-white/60 hover:bg-white focus:bg-white border border-dashed border-gold-muted/30 rounded px-2 py-0.5 text-gold text-[10px] font-bold focus:outline-none transition-all"
                      />
                      <input
                        type="text"
                        name={`programs_showcase_title__${sectionLang.programs}`}
                        value={getVal('programs_showcase_title', 'programs')}
                        onChange={(e) => handleFieldChange('programs_showcase_title', sectionLang.programs, e.target.value)}
                        placeholder="Section title..."
                        className="w-full text-center bg-white/60 hover:bg-white focus:bg-white border border-dashed border-gold-muted/30 rounded px-2 py-1 text-midnight text-sm font-bold focus:outline-none transition-all"
                      />
                      <textarea
                        name={`programs_showcase_desc__${sectionLang.programs}`}
                        value={getVal('programs_showcase_desc', 'programs')}
                        onChange={(e) => handleFieldChange('programs_showcase_desc', sectionLang.programs, e.target.value)}
                        placeholder="Section description..."
                        rows={2}
                        className="w-full text-center bg-white/60 hover:bg-white focus:bg-white border border-dashed border-gold-muted/30 rounded px-2 py-1 text-stone text-xs focus:outline-none resize-none transition-all"
                      />
                    </div>

                    {/* Three Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(['quran', 'arabic', 'islamic'] as const).map(track => (
                        <div key={track} className="bg-white border border-gold-muted/10 rounded-2xl p-6 space-y-6">
                          <span className="text-[10px] font-bold text-gold uppercase">{track} Track</span>
                          
                          <div className="space-y-2">
                            <label htmlFor={`programs_showcase_${track}_title`} className="text-[8px] font-bold text-stone/50 block">Title (EN/FR)</label>
                            <input
                              id={`programs_showcase_${track}_title`}
                              type="text"
                              name={`programs_showcase_${track}_title__${sectionLang.programs}`}
                              value={getVal(`programs_showcase_${track}_title`, 'programs')}
                              onChange={(e) => handleFieldChange(`programs_showcase_${track}_title`, sectionLang.programs, e.target.value)}
                              placeholder="Title (EN/FR)"
                              title="Title (EN/FR)"
                              className="w-full bg-stone-50 border border-dashed border-gold-muted/20 rounded px-2 py-0.5 text-xs text-midnight font-bold"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor={`programs_showcase_${track}_arabic`} className="text-[8px] font-bold text-stone/50 block">Title (Arabic script)</label>
                            <input
                              id={`programs_showcase_${track}_arabic`}
                              type="text"
                              name={`programs_showcase_${track}_arabic__${sectionLang.programs}`}
                              value={getVal(`programs_showcase_${track}_arabic`, 'programs')}
                              onChange={(e) => handleFieldChange(`programs_showcase_${track}_arabic`, sectionLang.programs, e.target.value)}
                              placeholder="Title (Arabic script)"
                              title="Title (Arabic script)"
                              className="w-full bg-stone-50 border border-dashed border-gold-muted/20 rounded px-2 py-0.5 text-xs text-midnight text-right"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor={`programs_showcase_${track}_desc`} className="text-[8px] font-bold text-stone/50 block">Description</label>
                            <textarea
                              id={`programs_showcase_${track}_desc`}
                              name={`programs_showcase_${track}_desc__${sectionLang.programs}`}
                              value={getVal(`programs_showcase_${track}_desc`, 'programs')}
                              onChange={(e) => handleFieldChange(`programs_showcase_${track}_desc`, sectionLang.programs, e.target.value)}
                              placeholder="Description"
                              title="Description"
                              rows={3}
                              className="w-full bg-stone-50 border border-dashed border-gold-muted/20 rounded px-2 py-1 text-[10px] text-stone"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor={`programs_showcase_${track}_books`} className="text-[8px] font-bold text-stone/50 block">Studied Books List</label>
                            <input
                              id={`programs_showcase_${track}_books`}
                              type="text"
                              name={`programs_showcase_${track}_books__${sectionLang.programs}`}
                              value={getVal(`programs_showcase_${track}_books`, 'programs')}
                              onChange={(e) => handleFieldChange(`programs_showcase_${track}_books`, sectionLang.programs, e.target.value)}
                              placeholder="Studied Books List"
                              title="Studied Books List"
                              className="w-full bg-stone-50 border border-dashed border-gold-muted/20 rounded px-2 py-0.5 text-[9px] text-stone/85 italic"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.programs?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Programs updated successfully'}
                      </span>
                    )}
                    {saveStates.programs?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.programs.error}` : `Error: ${saveStates.programs.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('programs')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.programs?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.programs?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.programs?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* METHODOLOGY SECTION */}
            {activeSubSection === 'methodology' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'methodology')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <Sparkles size={16} className="text-gold" />
                      {isRtl ? 'قسم منهجيتنا التعليمية' : 'Methodology Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تعديل نصوص تبيان والركائز الثلاث للمنهجية التعليمية' : 'Edit tagline, section title and the three main pedagogical pillars.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, methodology: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.methodology === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview form */}
                <div className="p-6 space-y-6 text-start">
                  <div className="relative rounded-3xl p-10 md:p-14 bg-[#132034] text-parchment border border-gold-muted/15 shadow-inner space-y-10">
                    {/* Repeating 8-star pattern background simulation */}
                    <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:60px_60px] opacity-[0.02] pointer-events-none rounded-3xl" />
                    
                    <div className="text-center max-w-xl mx-auto space-y-3 relative z-10">
                      <label htmlFor={`methodology_title__${sectionLang.methodology}`} className="sr-only">
                        {isRtl ? 'ترويسة المنهجية' : 'Methodology Tagline'}
                      </label>
                      <input
                        id={`methodology_title__${sectionLang.methodology}`}
                        type="text"
                        name={`methodology_title__${sectionLang.methodology}`}
                        value={getVal('methodology_title', 'methodology')}
                        onChange={(e) => handleFieldChange('methodology_title', sectionLang.methodology, e.target.value)}
                        placeholder="Tagline..."
                        title="Methodology Tagline"
                        className="w-full text-center bg-black/20 hover:bg-black/35 border border-dashed border-gold/30 rounded px-2 py-0.5 text-gold text-[10px] font-bold focus:outline-none"
                      />
                      <label htmlFor={`methodology_subtitle__${sectionLang.methodology}`} className="sr-only">
                        {isRtl ? 'عنوان المنهجية' : 'Methodology Title'}
                      </label>
                      <input
                        id={`methodology_subtitle__${sectionLang.methodology}`}
                        type="text"
                        name={`methodology_subtitle__${sectionLang.methodology}`}
                        value={getVal('methodology_subtitle', 'methodology')}
                        onChange={(e) => handleFieldChange('methodology_subtitle', sectionLang.methodology, e.target.value)}
                        placeholder="Title..."
                        title="Methodology Title"
                        className="w-full text-center bg-black/20 hover:bg-black/35 border border-dashed border-gold/30 rounded px-2 py-1 text-parchment text-sm font-bold focus:outline-none"
                      />
                    </div>

                    <div className="space-y-8 relative z-10">
                      {([1, 2, 3] as const).map(num => {
                        const arabicSymbols = ['', 'أثر', 'فرد', 'فهم'];
                        return (
                          <div key={num} className="bg-gradient-to-br from-white to-stone-50 text-midnight p-7 md:p-8 rounded-2xl border border-gold-muted/20 flex flex-col md:flex-row gap-6 items-center shadow-md">
                            {/* Interactive image container */}
                            <div 
                              onClick={() => openImageSelector(`methodology_pillar${num}_image`, 'methodology')}
                              className="w-full md:w-1/3 aspect-[4/3] bg-stone-100 rounded-lg relative overflow-hidden flex items-center justify-center border border-gold-muted/15 cursor-pointer group/img select-none"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img 
                                src={getVal(`methodology_pillar${num}_image`, 'methodology') || (num === 1 ? '/images/pillar-manuscript.png' : num === 2 ? '/images/pillar-study.png' : '/images/pillar-astrolabe.png')} 
                                alt={getVal(`methodology_pillar${num}_title`, 'methodology')}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover/img:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 text-white">
                                <ImageIcon size={18} className="text-gold-hi animate-bounce" />
                                <span className="text-[9px] font-bold tracking-wider">
                                  {isRtl ? 'تغيير الصورة' : 'Change Image'}
                                </span>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-[#132034] text-gold-hi border border-gold-hi/30 px-2 py-0.5 rounded text-xs font-amiri z-10">
                                {arabicSymbols[num]}
                              </div>
                              <input
                                type="hidden"
                                name={`methodology_pillar${num}_image__${sectionLang.methodology}`}
                                value={getVal(`methodology_pillar${num}_image`, 'methodology')}
                              />
                            </div>
                            {/* Inputs content */}
                            <div className="flex-1 w-full space-y-2 text-start">
                              <span className="text-[9px] font-bold text-gold tracking-wider">0{num} / 03</span>
                              
                              <label htmlFor={`methodology_pillar${num}_title__${sectionLang.methodology}`} className="sr-only">
                                {isRtl ? `عنوان الركيزة ${num}` : `Pillar ${num} Title`}
                              </label>
                              <input
                                id={`methodology_pillar${num}_title__${sectionLang.methodology}`}
                                type="text"
                                name={`methodology_pillar${num}_title__${sectionLang.methodology}`}
                                value={getVal(`methodology_pillar${num}_title`, 'methodology')}
                                onChange={(e) => handleFieldChange(`methodology_pillar${num}_title`, sectionLang.methodology, e.target.value)}
                                placeholder={`Pillar ${num} Title`}
                                title={`Pillar ${num} Title`}
                                className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/30 rounded px-2.5 py-1 text-xs text-midnight font-bold focus:outline-none"
                              />

                              <label htmlFor={`methodology_pillar${num}_desc__${sectionLang.methodology}`} className="sr-only">
                                {isRtl ? `وصف الركيزة ${num}` : `Pillar ${num} Description`}
                              </label>
                              <textarea
                                id={`methodology_pillar${num}_desc__${sectionLang.methodology}`}
                                name={`methodology_pillar${num}_desc__${sectionLang.methodology}`}
                                value={getVal(`methodology_pillar${num}_desc`, 'methodology')}
                                onChange={(e) => handleFieldChange(`methodology_pillar${num}_desc`, sectionLang.methodology, e.target.value)}
                                placeholder={`Pillar ${num} Description`}
                                title={`Pillar ${num} Description`}
                                rows={2}
                                className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/30 rounded px-2.5 py-1.5 text-[10px] text-stone resize-none font-ui leading-normal focus:outline-none"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.methodology?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Methodology updated successfully'}
                      </span>
                    )}
                    {saveStates.methodology?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.methodology.error}` : `Error: ${saveStates.methodology.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('methodology')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.methodology?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.methodology?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.methodology?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* FEATURED COURSES SECTION */}
            {activeSubSection === 'courses' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'courses')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <BookOpen size={16} className="text-gold" />
                      {isRtl ? 'قسم المقررات الدراسية المميزة' : 'Featured Courses Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تعديل نصوص المقررات الدراسية وزر استعراض الكل' : 'Edit course header texts and the view all courses button.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, courses: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.courses === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form preview */}
                <div className="p-6 text-start space-y-6">
                  <div className="relative rounded-3xl p-10 md:p-14 bg-parchment border border-gold-muted/15 shadow-inner space-y-10">
                    <div className="text-center max-w-xl mx-auto space-y-4">
                      <input
                        type="text"
                        name={`featured_courses_tag__${sectionLang.courses}`}
                        value={getVal('featured_courses_tag', 'courses')}
                        onChange={(e) => handleFieldChange('featured_courses_tag', sectionLang.courses, e.target.value)}
                        placeholder="Tag..."
                        className="w-full text-center bg-white/60 hover:bg-white border border-dashed border-gold-muted/30 rounded px-2 py-0.5 text-gold text-[10px] font-bold focus:outline-none"
                      />
                      <input
                        type="text"
                        name={`featured_courses_title__${sectionLang.courses}`}
                        value={getVal('featured_courses_title', 'courses')}
                        onChange={(e) => handleFieldChange('featured_courses_title', sectionLang.courses, e.target.value)}
                        placeholder="Title..."
                        className="w-full text-center bg-white/60 hover:bg-white border border-dashed border-gold-muted/30 rounded px-2.5 py-1.5 text-midnight text-sm font-bold focus:outline-none"
                      />
                      <textarea
                        name={`featured_courses_desc__${sectionLang.courses}`}
                        value={getVal('featured_courses_desc', 'courses')}
                        onChange={(e) => handleFieldChange('featured_courses_desc', sectionLang.courses, e.target.value)}
                        placeholder="Description..."
                        rows={2}
                        className="w-full text-center bg-white/60 hover:bg-white border border-dashed border-gold-muted/30 rounded px-2.5 py-1.5 text-stone text-xs focus:outline-none resize-none"
                      />
                    </div>

                    {/* Courses Grid (Fully editable inputs simulating the real page) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-start">
                      {([1, 2, 3] as const).map((num) => (
                        <div key={num} className="bg-white border border-gold-muted/15 rounded-2xl p-6 md:p-7 flex flex-col justify-between text-midnight shadow-sm">
                          <div className="space-y-4">
                            <label htmlFor={`course${num}_tag__${sectionLang.courses}`} className="sr-only">Course {num} Tag</label>
                            <input
                              id={`course${num}_tag__${sectionLang.courses}`}
                              type="text"
                              name={`course${num}_tag__${sectionLang.courses}`}
                              value={getVal(`course${num}_tag`, 'courses')}
                              onChange={(e) => handleFieldChange(`course${num}_tag`, sectionLang.courses, e.target.value)}
                              placeholder="Category Tag..."
                              title={`Course ${num} Category Tag`}
                              className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] text-gold uppercase font-bold tracking-wider focus:outline-none"
                            />

                            <label htmlFor={`course${num}_title__${sectionLang.courses}`} className="sr-only">Course {num} Title</label>
                            <input
                              id={`course${num}_title__${sectionLang.courses}`}
                              type="text"
                              name={`course${num}_title__${sectionLang.courses}`}
                              value={getVal(`course${num}_title`, 'courses')}
                              onChange={(e) => handleFieldChange(`course${num}_title`, sectionLang.courses, e.target.value)}
                              placeholder="Course Title..."
                              title={`Course ${num} Title`}
                              className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1.5 py-0.5 text-xs font-bold text-midnight font-primary focus:outline-none"
                            />

                            <label htmlFor={`course${num}_desc__${sectionLang.courses}`} className="sr-only">Course {num} Description</label>
                            <textarea
                              id={`course${num}_desc__${sectionLang.courses}`}
                              name={`course${num}_desc__${sectionLang.courses}`}
                              value={getVal(`course${num}_desc`, 'courses')}
                              onChange={(e) => handleFieldChange(`course${num}_desc`, sectionLang.courses, e.target.value)}
                              placeholder="Course Description..."
                              title={`Course ${num} Description`}
                              rows={3}
                              className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1.5 py-0.5 text-[9px] text-stone/85 leading-relaxed resize-none focus:outline-none"
                            />
                          </div>
                          
                          <div className="border-t border-gold-muted/10 pt-4 mt-6 space-y-2 text-[8px] font-ui">
                            <div className="flex justify-between items-center text-stone/60">
                              <span>{isRtl ? 'المدة المقدرة:' : 'Est. Duration:'}</span>
                              <div className="w-[100px]">
                                <label htmlFor={`course${num}_duration__${sectionLang.courses}`} className="sr-only">Course {num} Duration</label>
                                <input
                                  id={`course${num}_duration__${sectionLang.courses}`}
                                  type="text"
                                  name={`course${num}_duration__${sectionLang.courses}`}
                                  value={getVal(`course${num}_duration`, 'courses')}
                                  onChange={(e) => handleFieldChange(`course${num}_duration`, sectionLang.courses, e.target.value)}
                                  placeholder="Duration..."
                                  title={`Course ${num} Duration`}
                                  className="w-full text-end bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] font-bold text-midnight focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-stone/60">
                              <span>{isRtl ? 'المستوى الدراسي:' : 'Syllabus Level:'}</span>
                              <div className="w-[100px]">
                                <label htmlFor={`course${num}_level__${sectionLang.courses}`} className="sr-only">Course {num} Level</label>
                                <input
                                  id={`course${num}_level__${sectionLang.courses}`}
                                  type="text"
                                  name={`course${num}_level__${sectionLang.courses}`}
                                  value={getVal(`course${num}_level`, 'courses')}
                                  onChange={(e) => handleFieldChange(`course${num}_level`, sectionLang.courses, e.target.value)}
                                  placeholder="Level..."
                                  title={`Course ${num} Level`}
                                  className="w-full text-end bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] font-bold text-midnight focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-stone/60">
                              <span>{isRtl ? 'المنهج المقرر:' : 'Primary Text:'}</span>
                              <div className="w-[100px]">
                                <label htmlFor={`course${num}_syllabus__${sectionLang.courses}`} className="sr-only">Course {num} Syllabus</label>
                                <input
                                  id={`course${num}_syllabus__${sectionLang.courses}`}
                                  type="text"
                                  name={`course${num}_syllabus__${sectionLang.courses}`}
                                  value={getVal(`course${num}_syllabus`, 'courses')}
                                  onChange={(e) => handleFieldChange(`course${num}_syllabus`, sectionLang.courses, e.target.value)}
                                  placeholder="Syllabus..."
                                  title={`Course ${num} Syllabus`}
                                  className="w-full text-end bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] font-bold text-midnight focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gold/10 text-gold text-center py-2 rounded-lg text-[8px] font-bold mt-3 select-none border border-gold/15">
                            {isRtl ? 'عرض تفاصيل المقرر' : 'View Course Syllabus'}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View all button mock */}
                    <div className="pt-4 border-t border-gold-muted/10 flex flex-col items-center">
                      <div className="relative group/field w-full max-w-xs">
                        <input
                          type="text"
                          name={`featured_courses_btn_all__${sectionLang.courses}`}
                          value={getVal('featured_courses_btn_all', 'courses')}
                          onChange={(e) => handleFieldChange('featured_courses_btn_all', sectionLang.courses, e.target.value)}
                          placeholder="View All Button..."
                          className="w-full text-center bg-white border border-dashed border-gold-muted/30 rounded-lg py-1 px-3 text-gold text-xs font-bold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.courses?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Courses updated successfully'}
                      </span>
                    )}
                    {saveStates.courses?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.courses.error}` : `Error: ${saveStates.courses.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('courses')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.courses?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.courses?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.courses?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* FACULTY SPOTLIGHT SECTION */}
            {activeSubSection === 'teachers' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'teachers')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <UserCheck size={16} className="text-gold" />
                      {isRtl ? 'قسم أعضاء هيئة التدريس المميزين' : 'Faculty Spotlight Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تعديل نصوص ترويسة هيئة التدريس وزر عرض الكل' : 'Edit faculty header tagline, title, subtitle and View All button.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, teachers: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.teachers === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form preview */}
                <div className="p-6 text-start space-y-6">
                  <div className="relative rounded-3xl p-10 md:p-14 bg-[#162742] border border-gold-muted/20 shadow-inner text-parchment space-y-10">
                    <div className="text-center max-w-xl mx-auto space-y-4">
                      <input
                        type="text"
                        name={`teachers_spotlight_tag__${sectionLang.teachers}`}
                        value={getVal('teachers_spotlight_tag', 'teachers')}
                        onChange={(e) => handleFieldChange('teachers_spotlight_tag', sectionLang.teachers, e.target.value)}
                        placeholder="Tag..."
                        className="w-full text-center bg-black/15 hover:bg-black/25 border border-dashed border-gold-hi/30 rounded px-2 py-0.5 text-gold-hi text-[10px] font-bold focus:outline-none"
                      />
                      <input
                        type="text"
                        name={`teachers_spotlight_title__${sectionLang.teachers}`}
                        value={getVal('teachers_spotlight_title', 'teachers')}
                        onChange={(e) => handleFieldChange('teachers_spotlight_title', sectionLang.teachers, e.target.value)}
                        placeholder="Title..."
                        className="w-full text-center bg-black/15 hover:bg-black/25 border border-dashed border-gold-hi/30 rounded px-2.5 py-1.5 text-parchment text-sm font-bold focus:outline-none"
                      />
                      <textarea
                        name={`teachers_spotlight_subtitle__${sectionLang.teachers}`}
                        value={getVal('teachers_spotlight_subtitle', 'teachers')}
                        onChange={(e) => handleFieldChange('teachers_spotlight_subtitle', sectionLang.teachers, e.target.value)}
                        placeholder="Subtitle..."
                        rows={2}
                        className="w-full text-center bg-black/15 hover:bg-black/25 border border-dashed border-white/20 rounded px-2.5 py-1.5 text-parchment/80 text-xs focus:outline-none resize-none"
                      />
                    </div>

                    {/* Teachers Grid (Fully editable inputs simulating the real page) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 text-start">
                      {([1, 2, 3] as const).map((num) => {
                        const defaultImages = [
                          '',
                          '/images/teacher_ahmed_yahya.png',
                          '/images/teacher_mohamed_badr.png',
                          '/images/teacher_hamada_attia.png'
                        ];
                        return (
                          <div key={num} className="bg-gradient-to-br from-ivory via-ivory/95 to-ivory/85 border border-gold-muted/20 rounded-[1.5rem] overflow-hidden shadow-md flex flex-col justify-between text-midnight relative">
                            <div 
                              onClick={() => openImageSelector(`teacher${num}_image`, 'teachers')}
                              className="relative h-64 w-full bg-stone-100 flex items-center justify-center overflow-hidden cursor-pointer group/img select-none"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img 
                                src={getVal(`teacher${num}_image`, 'teachers') || defaultImages[num]} 
                                alt={getVal(`teacher${num}_name`, 'teachers')}
                                className="object-cover object-top w-full h-full transition-transform duration-500 group-hover/img:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 text-white z-20">
                                <ImageIcon size={20} className="text-gold-hi animate-bounce" />
                                <span className="text-[9px] font-bold tracking-wider">
                                  {isRtl ? 'تغيير الصورة' : 'Change Image'}
                                </span>
                              </div>
                              <input
                                type="hidden"
                                name={`teacher${num}_image__${sectionLang.teachers}`}
                                value={getVal(`teacher${num}_image`, 'teachers')}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/35 to-transparent" />
                              <div className="absolute bottom-3 left-4 right-4 text-start space-y-1.5">
                                <label htmlFor={`teacher${num}_name__${sectionLang.teachers}`} className="sr-only">Teacher {num} Name</label>
                                <input
                                  id={`teacher${num}_name__${sectionLang.teachers}`}
                                  type="text"
                                  name={`teacher${num}_name__${sectionLang.teachers}`}
                                  value={getVal(`teacher${num}_name`, 'teachers')}
                                  onChange={(e) => handleFieldChange(`teacher${num}_name`, sectionLang.teachers, e.target.value)}
                                  placeholder="Teacher Name..."
                                  title={`Teacher ${num} Name`}
                                  className="w-full bg-black/30 hover:bg-black/50 border border-dashed border-gold-hi/30 rounded px-1.5 py-0.5 text-xs font-bold text-parchment leading-tight focus:outline-none"
                                />

                                <label htmlFor={`teacher${num}_title__${sectionLang.teachers}`} className="sr-only">Teacher {num} Title</label>
                                <input
                                  id={`teacher${num}_title__${sectionLang.teachers}`}
                                  type="text"
                                  name={`teacher${num}_title__${sectionLang.teachers}`}
                                  value={getVal(`teacher${num}_title`, 'teachers')}
                                  onChange={(e) => handleFieldChange(`teacher${num}_title`, sectionLang.teachers, e.target.value)}
                                  placeholder="Teacher Title..."
                                  title={`Teacher ${num} Title`}
                                  className="w-full bg-black/30 hover:bg-black/50 border border-dashed border-gold-hi/30 rounded px-1.5 py-0.5 text-[8px] text-gold-hi font-medium block opacity-95 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="p-6 space-y-3 text-[9px] font-ui">
                              <div className="flex justify-between items-center border-b border-gold-muted/10 pb-1.5">
                                <span className="text-stone/60">{isRtl ? 'التخصص:' : 'Specialty:'}</span>
                                <div className="w-[110px]">
                                  <label htmlFor={`teacher${num}_specialty__${sectionLang.teachers}`} className="sr-only">Teacher {num} Specialty</label>
                                  <input
                                    id={`teacher${num}_specialty__${sectionLang.teachers}`}
                                    type="text"
                                    name={`teacher${num}_specialty__${sectionLang.teachers}`}
                                    value={getVal(`teacher${num}_specialty`, 'teachers')}
                                    onChange={(e) => handleFieldChange(`teacher${num}_specialty`, sectionLang.teachers, e.target.value)}
                                    placeholder="Specialty..."
                                    title={`Teacher ${num} Specialty`}
                                    className="w-full text-end bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] font-bold text-midnight focus:outline-none"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-between items-center border-b border-gold-muted/10 pb-1.5">
                                <span className="text-stone/60">{isRtl ? 'الشهادة:' : 'Education:'}</span>
                                <div className="w-[110px]">
                                  <label htmlFor={`teacher${num}_education__${sectionLang.teachers}`} className="sr-only">Teacher {num} Education</label>
                                  <input
                                    id={`teacher${num}_education__${sectionLang.teachers}`}
                                    type="text"
                                    name={`teacher${num}_education__${sectionLang.teachers}`}
                                    value={getVal(`teacher${num}_education`, 'teachers')}
                                    onChange={(e) => handleFieldChange(`teacher${num}_education`, sectionLang.teachers, e.target.value)}
                                    placeholder="Education..."
                                    title={`Teacher ${num} Education`}
                                    className="w-full text-end bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] font-bold text-midnight focus:outline-none"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-between items-center border-b border-gold-muted/10 pb-1.5">
                                <span className="text-stone/60">{isRtl ? 'اللغات:' : 'Languages:'}</span>
                                <div className="w-[110px]">
                                  <label htmlFor={`teacher${num}_languages__${sectionLang.teachers}`} className="sr-only">Teacher {num} Languages</label>
                                  <input
                                    id={`teacher${num}_languages__${sectionLang.teachers}`}
                                    type="text"
                                    name={`teacher${num}_languages__${sectionLang.teachers}`}
                                    value={getVal(`teacher${num}_languages`, 'teachers')}
                                    onChange={(e) => handleFieldChange(`teacher${num}_languages`, sectionLang.teachers, e.target.value)}
                                    placeholder="Languages..."
                                    title={`Teacher ${num} Languages`}
                                    className="w-full text-end bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] font-bold text-midnight focus:outline-none"
                                  />
                                </div>
                              </div>
                              <div className="bg-gold-hi/[0.02] border border-gold-muted/12 rounded-lg p-2 mt-2">
                                <span className="text-[7px] uppercase tracking-wider text-gold font-bold block mb-1 flex items-center gap-1">✦ {isRtl ? 'الإجازات العلمية' : 'Academic Ijazat'}</span>
                                <ul className="space-y-1 text-stone/85 text-[8px] leading-tight">
                                  <li className="flex items-center gap-1">
                                    <span className="text-gold">✦</span>
                                    <label htmlFor={`teacher${num}_ijazah1__${sectionLang.teachers}`} className="sr-only">Teacher {num} Ijazah 1</label>
                                    <input
                                      id={`teacher${num}_ijazah1__${sectionLang.teachers}`}
                                      type="text"
                                      name={`teacher${num}_ijazah1__${sectionLang.teachers}`}
                                      value={getVal(`teacher${num}_ijazah1`, 'teachers')}
                                      onChange={(e) => handleFieldChange(`teacher${num}_ijazah1`, sectionLang.teachers, e.target.value)}
                                      placeholder="Ijazah 1..."
                                      title={`Teacher ${num} Ijazah 1`}
                                      className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] focus:outline-none"
                                    />
                                  </li>
                                  <li className="flex items-center gap-1">
                                    <span className="text-gold">✦</span>
                                    <label htmlFor={`teacher${num}_ijazah2__${sectionLang.teachers}`} className="sr-only">Teacher {num} Ijazah 2</label>
                                    <input
                                      id={`teacher${num}_ijazah2__${sectionLang.teachers}`}
                                      type="text"
                                      name={`teacher${num}_ijazah2__${sectionLang.teachers}`}
                                      value={getVal(`teacher${num}_ijazah2`, 'teachers')}
                                      onChange={(e) => handleFieldChange(`teacher${num}_ijazah2`, sectionLang.teachers, e.target.value)}
                                      placeholder="Ijazah 2..."
                                      title={`Teacher ${num} Ijazah 2`}
                                      className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] focus:outline-none"
                                    />
                                  </li>
                                </ul>
                              </div>
                              <div className="bg-gold/10 text-gold text-center py-2 rounded-lg text-[8px] font-bold mt-2 select-none border border-gold/15">
                                {isRtl ? 'عرض الملف الأكاديمي' : 'View Profile'}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-col items-center">
                      <div className="relative group/field w-full max-w-xs">
                        <input
                          type="text"
                          name={`teachers_spotlight_btn_all__${sectionLang.teachers}`}
                          value={getVal('teachers_spotlight_btn_all', 'teachers')}
                          onChange={(e) => handleFieldChange('teachers_spotlight_btn_all', sectionLang.teachers, e.target.value)}
                          placeholder="View All Faculty Button..."
                          className="w-full text-center bg-white/5 border border-dashed border-gold/45 rounded-lg py-1 px-3 text-gold-hi text-xs font-bold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.teachers?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Faculty updated successfully'}
                      </span>
                    )}
                    {saveStates.teachers?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.teachers.error}` : `Error: ${saveStates.teachers.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('teachers')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.teachers?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.teachers?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.teachers?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TESTIMONIALS SECTION */}
            {activeSubSection === 'testimonials' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'testimonials')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <MessageSquare size={16} className="text-gold" />
                      {isRtl ? 'قسم آراء الطلاب (Testimonials)' : 'Student Testimonials Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تعديل نصوص ترويسة قسم آراء الطلاب' : 'Edit testimonials tagline, section title and header subtitle description.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, testimonials: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.testimonials === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview and Inputs */}
                <div className="p-6 text-start space-y-6">
                  <div className="relative rounded-3xl p-10 md:p-14 bg-parchment border border-gold-muted/15 shadow-inner space-y-8">
                    <div className="text-center max-w-xl mx-auto space-y-4">
                      <input
                        type="text"
                        name={`testimonials_tag__${sectionLang.testimonials}`}
                        value={getVal('testimonials_tag', 'testimonials')}
                        onChange={(e) => handleFieldChange('testimonials_tag', sectionLang.testimonials, e.target.value)}
                        placeholder="Tag..."
                        className="w-full text-center bg-white/60 hover:bg-white border border-dashed border-gold-muted/30 rounded px-2 py-0.5 text-gold text-[10px] font-bold focus:outline-none"
                      />
                      <input
                        type="text"
                        name={`testimonials_title__${sectionLang.testimonials}`}
                        value={getVal('testimonials_title', 'testimonials')}
                        onChange={(e) => handleFieldChange('testimonials_title', sectionLang.testimonials, e.target.value)}
                        placeholder="Title..."
                        className="w-full text-center bg-white/60 hover:bg-white border border-dashed border-gold-muted/30 rounded px-2.5 py-1.5 text-midnight text-sm font-bold focus:outline-none"
                      />
                      <textarea
                        name={`testimonials_subtitle__${sectionLang.testimonials}`}
                        value={getVal('testimonials_subtitle', 'testimonials')}
                        onChange={(e) => handleFieldChange('testimonials_subtitle', sectionLang.testimonials, e.target.value)}
                        placeholder="Subtitle description..."
                        rows={2}
                        className="w-full text-center bg-white/60 hover:bg-white border border-dashed border-gold-muted/30 rounded px-2.5 py-1.5 text-stone text-xs focus:outline-none resize-none"
                      />
                    </div>

                    {/* Testimonials Carousel Editor */}
                    {(() => {
                      const totalPages = Math.ceil((testimonialIds.length + 1) / 3);
                      return (
                        <div className="space-y-6 pt-6">
                          {/* Carousel Controls Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-4 bg-gold-muted/5 border border-gold-muted/10 p-3.5 rounded-2xl">
                            {/* Left/Right Buttons & Label */}
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setTestimonialPage(prev => Math.max(0, prev - 1))}
                                disabled={testimonialPage === 0}
                                className="bg-white border border-gold-muted/20 hover:border-gold hover:text-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-stone rounded-lg w-8 h-8 flex items-center justify-center transition-all cursor-pointer text-stone text-xs font-bold"
                                title={isRtl ? 'الصفحة السابقة' : 'Previous Page'}
                              >
                                {isRtl ? '◀' : '◀'}
                              </button>
                              
                              <span className="text-[11px] font-bold text-midnight font-ui min-w-[85px] text-center select-none">
                                {isRtl 
                                  ? `الصفحة ${testimonialPage + 1} من ${totalPages}` 
                                  : `Page ${testimonialPage + 1} of ${totalPages}`}
                              </span>

                              <button
                                type="button"
                                onClick={() => setTestimonialPage(prev => Math.min(totalPages - 1, prev + 1))}
                                disabled={testimonialPage === totalPages - 1}
                                className="bg-white border border-gold-muted/20 hover:border-gold hover:text-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-stone rounded-lg w-8 h-8 flex items-center justify-center transition-all cursor-pointer text-stone text-xs font-bold"
                                title={isRtl ? 'الصفحة التالية' : 'Next Page'}
                              >
                                {isRtl ? '▶' : '▶'}
                              </button>
                            </div>

                            {/* Dot Indicators */}
                            <div className="flex gap-1.5 justify-center flex-wrap max-w-[150px]">
                              {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setTestimonialPage(idx)}
                                  title={isRtl ? `الذهاب إلى الصفحة ${idx + 1}` : `Go to page ${idx + 1}`}
                                  aria-label={isRtl ? `الذهاب إلى الصفحة ${idx + 1}` : `Go to page ${idx + 1}`}
                                  className={`transition-all duration-300 rounded-full h-1.5 ${
                                    idx === testimonialPage ? 'w-4 bg-gold' : 'w-1.5 bg-gold/30 hover:bg-gold/50'
                                  }`}
                                />
                              ))}
                            </div>

                            {/* Summary Info */}
                            <div className="text-[10px] text-stone/50 font-bold uppercase tracking-wider font-ui">
                              {isRtl 
                                ? `إجمالي الآراء: ${testimonialIds.length}` 
                                : `Total Reviews: ${testimonialIds.length}`}
                            </div>
                          </div>

                          {/* Hidden input to save the active IDs mapping */}
                          <input type="hidden" name={`testimonials_active_ids__${sectionLang.testimonials}`} value={testimonialIds.join(',')} />

                          {/* Testimonial Cards Grid (Render all, hide if not on active page) */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonialIds.map((id, index) => {
                              const cardPage = Math.floor(index / 3);
                              const isVisible = cardPage === testimonialPage;
                              return (
                                <div 
                                  key={id} 
                                  className={`bg-white border border-gold-muted/15 rounded-2xl p-5 shadow-sm hover:border-gold-hi/50 transition-all duration-300 flex flex-col justify-between text-midnight relative ${
                                    isVisible ? 'block animate-fade-in' : 'hidden'
                                  }`}
                                >
                                  {/* Card Header with Stars and Delete Button */}
                                  <div className="flex items-center justify-between mb-4 select-none">
                                    <div className="text-gold text-xs">★★★★★</div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[8px] text-stone/45 uppercase tracking-widest font-mono">ID: {id}</span>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteTestimonialById(id)}
                                        disabled={testimonialIds.length <= 1}
                                        className="text-stone/45 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-1"
                                        title={isRtl ? 'حذف هذا الرأي' : 'Delete Review'}
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                                    <div>
                                      <label htmlFor={`testimonial${id}_quote__${sectionLang.testimonials}`} className="sr-only">Testimonial {id} Quote</label>
                                      <textarea
                                        id={`testimonial${id}_quote__${sectionLang.testimonials}`}
                                        name={`testimonial${id}_quote__${sectionLang.testimonials}`}
                                        value={getVal(`testimonial${id}_quote`, 'testimonials')}
                                        onChange={(e) => handleFieldChange(`testimonial${id}_quote`, sectionLang.testimonials, e.target.value)}
                                        placeholder={isRtl ? "اكتب رأي الطالب هنا..." : "Student quote..."}
                                        title={`Testimonial ${id} Quote`}
                                        rows={4}
                                        className="w-full bg-stone-50 hover:bg-stone-100/50 border border-dashed border-gold-muted/20 rounded p-2 text-[10px] leading-relaxed italic text-stone/90 focus:outline-none resize-none text-start font-ui animate-pulse-once"
                                      />
                                    </div>

                                    <div className="border-t border-gold-muted/10 pt-3 mt-4 space-y-2">
                                      <div className="space-y-2">
                                        <div>
                                          <label htmlFor={`testimonial${id}_name__${sectionLang.testimonials}`} className="sr-only">Testimonial {id} Student Name</label>
                                          <input
                                            id={`testimonial${id}_name__${sectionLang.testimonials}`}
                                            type="text"
                                            name={`testimonial${id}_name__${sectionLang.testimonials}`}
                                            value={getVal(`testimonial${id}_name`, 'testimonials')}
                                            onChange={(e) => handleFieldChange(`testimonial${id}_name`, sectionLang.testimonials, e.target.value)}
                                            placeholder={isRtl ? "اسم الطالب..." : "Student name..."}
                                            title={`Testimonial ${id} Student Name`}
                                            className="w-full bg-stone-50 hover:bg-stone-100/50 border border-dashed border-gold-muted/20 rounded px-2.5 py-1 text-[10px] font-bold text-midnight focus:outline-none text-start font-ui"
                                          />
                                        </div>

                                        <div className="flex gap-2">
                                          <div className="flex-1">
                                            <label htmlFor={`testimonial${id}_role__${sectionLang.testimonials}`} className="sr-only">Testimonial {id} Location</label>
                                            <input
                                              id={`testimonial${id}_role__${sectionLang.testimonials}`}
                                              type="text"
                                              name={`testimonial${id}_role__${sectionLang.testimonials}`}
                                              value={getVal(`testimonial${id}_role`, 'testimonials')}
                                              onChange={(e) => handleFieldChange(`testimonial${id}_role`, sectionLang.testimonials, e.target.value)}
                                              placeholder={isRtl ? "البلد..." : "Location..."}
                                              title={`Testimonial ${id} Location`}
                                              className="w-full bg-stone-50 hover:bg-stone-100/50 border border-dashed border-gold-muted/20 rounded px-2 py-1 text-[9px] text-stone/60 focus:outline-none text-start font-ui"
                                            />
                                          </div>
                                          <div className="w-[80px]">
                                            <label htmlFor={`testimonial${id}_persona__${sectionLang.testimonials}`} className="sr-only">Testimonial {id} Persona</label>
                                            <input
                                              id={`testimonial${id}_persona__${sectionLang.testimonials}`}
                                              type="text"
                                              name={`testimonial${id}_persona__${sectionLang.testimonials}`}
                                              value={getVal(`testimonial${id}_persona`, 'testimonials')}
                                              onChange={(e) => handleFieldChange(`testimonial${id}_persona`, sectionLang.testimonials, e.target.value)}
                                              placeholder={isRtl ? "الوصف..." : "Persona..."}
                                              title={`Testimonial ${id} Persona`}
                                              className="w-full bg-gold/10 hover:bg-gold/20 border border-dashed border-gold/30 rounded px-2 py-1 text-[8px] font-bold text-gold text-center focus:outline-none font-ui"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            {/* "+ Add New Review" dashed placeholder card at the end of the list */}
                            {Math.floor(testimonialIds.length / 3) === testimonialPage && (
                              <button
                                type="button"
                                onClick={handleAddTestimonial}
                                className="bg-gold-muted/5 border-2 border-dashed border-gold-muted/30 hover:border-gold hover:bg-gold/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[250px] cursor-pointer group hover:scale-[1.01]"
                                title={isRtl ? 'إضافة رأي جديد' : 'Add New Review'}
                              >
                                <div className="w-10 h-10 rounded-full bg-gold/15 group-hover:bg-gold/25 text-gold flex items-center justify-center transition-colors mb-3">
                                  <Plus size={18} />
                                </div>
                                <span className="text-xs font-bold text-midnight/80 group-hover:text-gold transition-colors font-ui">
                                  {isRtl ? 'إضافة رأي جديد' : 'Add New Review'}
                                </span>
                                <span className="text-[9px] text-stone/50 mt-1 font-ui">
                                  {isRtl ? 'أضف تعليقاً جديداً لعرضه في الصفحة الرئيسية' : 'Append a custom student review to the carousel'}
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.testimonials?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Testimonials updated successfully'}
                      </span>
                    )}
                    {saveStates.testimonials?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.testimonials.error}` : `Error: ${saveStates.testimonials.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('testimonials')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.testimonials?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.testimonials?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.testimonials?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* HOW IT WORKS SECTION */}
            {activeSubSection === 'how_it_works' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'how_it_works')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <ClipboardList size={16} className="text-gold" />
                      {isRtl ? 'قسم الحصص التجريبية والتسجيل' : 'Trial Assessment & Booking Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تعديل شعار وبطاقات الحجز المجاني' : 'Edit booking form title, sub-headline and submission action texts.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, how_it_works: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.how_it_works === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form layout */}
                <div className="p-6 space-y-6 text-start">
                  <div className="relative rounded-3xl p-10 md:p-14 bg-navy border border-gold-muted/20 text-parchment shadow-inner grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left why trial */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-gold-hi uppercase">Why Section</span>
                      
                      <div className="space-y-2">
                        <label htmlFor="how_it_works_tag" className="text-[8px] font-bold text-white/50 block">Tag Badge</label>
                        <input
                          id="how_it_works_tag"
                          type="text"
                          name={`how_it_works_tag__${sectionLang.how_it_works}`}
                          value={getVal('how_it_works_tag', 'how_it_works')}
                          onChange={(e) => handleFieldChange('how_it_works_tag', sectionLang.how_it_works, e.target.value)}
                          placeholder="Tag Badge"
                          title="Tag Badge"
                          className="w-full bg-black/20 border border-dashed border-white/20 rounded px-2.5 py-1 text-xs text-parchment focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="how_it_works_why_title" className="text-[8px] font-bold text-white/50 block">Section Headline</label>
                        <textarea
                          id="how_it_works_why_title"
                          name={`how_it_works_why_title__${sectionLang.how_it_works}`}
                          value={getVal('how_it_works_why_title', 'how_it_works')}
                          onChange={(e) => handleFieldChange('how_it_works_why_title', sectionLang.how_it_works, e.target.value)}
                          placeholder="Section Headline"
                          title="Section Headline"
                          rows={3}
                          className="w-full bg-black/20 border border-dashed border-white/20 rounded px-2.5 py-1.5 text-xs text-parchment focus:outline-none resize-none font-primary"
                        />
                      </div>
                    </div>

                    {/* Right form editor */}
                    <div className="space-y-6 bg-white rounded-2xl p-6 md:p-8 text-midnight border border-gold-muted/10">
                      <span className="text-[10px] font-bold text-gold uppercase">Booking Form Panel</span>
                      
                      <div className="space-y-2">
                        <label htmlFor="how_it_works_form_title" className="text-[8px] font-bold text-stone/50 block">Form Title</label>
                        <input
                          id="how_it_works_form_title"
                          type="text"
                          name={`how_it_works_form_title__${sectionLang.how_it_works}`}
                          value={getVal('how_it_works_form_title', 'how_it_works')}
                          onChange={(e) => handleFieldChange('how_it_works_form_title', sectionLang.how_it_works, e.target.value)}
                          placeholder="Form Title"
                          title="Form Title"
                          className="w-full bg-stone-50 border border-dashed border-gold-muted/30 rounded px-2 py-0.5 text-xs text-midnight font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="how_it_works_form_subtitle" className="text-[8px] font-bold text-stone/50 block">Form Subtitle Description</label>
                        <textarea
                          id="how_it_works_form_subtitle"
                          name={`how_it_works_form_subtitle__${sectionLang.how_it_works}`}
                          value={getVal('how_it_works_form_subtitle', 'how_it_works')}
                          onChange={(e) => handleFieldChange('how_it_works_form_subtitle', sectionLang.how_it_works, e.target.value)}
                          placeholder="Form Subtitle Description"
                          title="Form Subtitle Description"
                          rows={2}
                          className="w-full bg-stone-50 border border-dashed border-gold-muted/30 rounded px-2 py-1 text-[10px] text-stone resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="how_it_works_btn_submit" className="text-[8px] font-bold text-stone/50 block">Submit Button text</label>
                        <input
                          id="how_it_works_btn_submit"
                          type="text"
                          name={`how_it_works_btn_submit__${sectionLang.how_it_works}`}
                          value={getVal('how_it_works_btn_submit', 'how_it_works')}
                          onChange={(e) => handleFieldChange('how_it_works_btn_submit', sectionLang.how_it_works, e.target.value)}
                          placeholder="Submit Button Text"
                          title="Submit Button Text"
                          className="w-full bg-gold border border-dashed border-midnight/20 rounded py-1 px-3 text-center text-midnight font-bold text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.how_it_works?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Booking updated successfully'}
                      </span>
                    )}
                    {saveStates.how_it_works?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.how_it_works.error}` : `Error: ${saveStates.how_it_works.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('how_it_works')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.how_it_works?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.how_it_works?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.how_it_works?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* PRICING plans SECTION */}
            {activeSubSection === 'pricing' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'pricing')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <ShieldCheck size={16} className="text-gold" />
                      {isRtl ? 'قسم باقات الاشتراك والأسعار' : 'Membership Pricing Designer'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تعديل نصوص ترويسة الأسعار وسياسة الاسترجاع' : 'Edit pricing header title, subtitle and satisfaction refund policy.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, pricing: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.pricing === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form preview */}
                <div className="p-6 text-start space-y-6">
                  <div className="relative rounded-3xl p-10 md:p-14 bg-ivory border border-gold-muted/15 shadow-inner space-y-10">
                    <div className="text-center max-w-xl mx-auto space-y-4">
                      <input
                        type="text"
                        name={`pricing_teaser_title__${sectionLang.pricing}`}
                        value={getVal('pricing_teaser_title', 'pricing')}
                        onChange={(e) => handleFieldChange('pricing_teaser_title', sectionLang.pricing, e.target.value)}
                        placeholder="Tag..."
                        className="w-full text-center bg-white/60 hover:bg-white border border-dashed border-gold-muted/30 rounded px-2 py-0.5 text-gold text-[10px] font-bold focus:outline-none"
                      />
                      <input
                        type="text"
                        name={`pricing_teaser_subtitle__${sectionLang.pricing}`}
                        value={getVal('pricing_teaser_subtitle', 'pricing')}
                        onChange={(e) => handleFieldChange('pricing_teaser_subtitle', sectionLang.pricing, e.target.value)}
                        placeholder="Header Title..."
                        className="w-full text-center bg-white/60 hover:bg-white border border-dashed border-gold-muted/30 rounded px-2.5 py-1.5 text-midnight text-sm font-bold focus:outline-none"
                      />
                    </div>

                    {/* Duration tabs switcher inside CmsEditor.tsx */}
                    <div className="flex justify-center pt-4">
                      <div className="bg-gold-muted/10 p-1.5 rounded-full flex gap-1 border border-gold-muted/15 shadow-sm">
                        {(['30', '45', '60'] as const).map((dur) => (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => setAdminPricingDuration(dur)}
                            className={`px-5 py-2 rounded-full text-xs font-bold font-ui transition-all duration-300 cursor-pointer ${
                              adminPricingDuration === dur 
                                ? 'bg-gold text-white shadow-sm font-bold' 
                                : 'text-stone/60 hover:text-midnight'
                            }`}
                          >
                            {dur === '30' ? (isRtl ? '30 دقيقة' : '30 Mins') : dur === '45' ? (isRtl ? '45 دقيقة' : '45 Mins') : (isRtl ? '60 دقيقة' : '60 Mins')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Hidden inputs to make sure all duration prices are preserved and submitted */}
                    {([1, 2, 3] as const).map((num) => (
                      <React.Fragment key={num}>
                        {(['30', '45', '60'] as const).map((dur) => (
                          adminPricingDuration !== dur && (
                            <input 
                              key={dur}
                              type="hidden" 
                              name={`pricing_plan${num}_price_${dur}__${sectionLang.pricing}`} 
                              value={getVal(`pricing_plan${num}_price_${dur}`, 'pricing')} 
                            />
                          )
                        ))}
                      </React.Fragment>
                    ))}

                    {/* Pricing Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2 text-start">
                      {([1, 2, 3] as const).map((num) => (
                        <div key={num} className={`bg-white border rounded-2xl p-7 md:p-8 flex flex-col justify-between text-midnight relative shadow-sm ${
                          num === 2 ? 'border-gold ring-1 ring-gold shadow-md shadow-gold/5' : 'border-gold-muted/15'
                        }`}>
                          {num === 2 && (
                            <span className="absolute -top-2.5 right-6 bg-gold text-white text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10">
                              {isRtl ? 'الأكثر طلباً' : 'Most Popular'}
                            </span>
                          )}
                          <div className="space-y-5">
                            <label htmlFor={`pricing_plan${num}_name__${sectionLang.pricing}`} className="sr-only">Plan {num} Name</label>
                            <input
                              id={`pricing_plan${num}_name__${sectionLang.pricing}`}
                              type="text"
                              name={`pricing_plan${num}_name__${sectionLang.pricing}`}
                              value={getVal(`pricing_plan${num}_name`, 'pricing')}
                              onChange={(e) => handleFieldChange(`pricing_plan${num}_name`, sectionLang.pricing, e.target.value)}
                              placeholder="Plan Name..."
                              title={`Plan ${num} Name`}
                              className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 py-0.5 text-xs font-bold text-midnight font-primary focus:outline-none text-start"
                            />
                            
                            {/* Duration Specific Price Input */}
                            <div>
                              {(['30', '45', '60'] as const).map((dur) => {
                                const fieldKey = `pricing_plan${num}_price_${dur}`;
                                const isActive = adminPricingDuration === dur;
                                if (!isActive) return null;
                                return (
                                  <div key={dur} className="space-y-1">
                                    <label htmlFor={`${fieldKey}__${sectionLang.pricing}`} className="text-[8px] font-bold text-stone/50 block">
                                      {isRtl ? `السعر الشهري (${dur} دقيقة)` : `Monthly Price (${dur} Mins)`}
                                    </label>
                                    <div className="flex items-center gap-1.5">
                                      <input
                                        id={`${fieldKey}__${sectionLang.pricing}`}
                                        type="text"
                                        name={`${fieldKey}__${sectionLang.pricing}`}
                                        value={getVal(fieldKey, 'pricing')}
                                        onChange={(e) => handleFieldChange(fieldKey, sectionLang.pricing, e.target.value)}
                                        placeholder="Price..."
                                        title={`Plan ${num} ${dur} Mins Price`}
                                        className="w-[80px] bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 py-0.5 text-sm font-extrabold text-midnight focus:outline-none text-start font-ui"
                                      />
                                      <span className="text-[8px] text-stone/45 font-semibold">
                                        {isRtl ? `/ شهرياً (${num === 1 ? 'حصة' : num === 2 ? 'حصتان' : '3 حصص'} / أسبوع)` : `/ month (${num} sess/wk)`}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            
                            <label htmlFor={`pricing_plan${num}_desc__${sectionLang.pricing}`} className="sr-only">Plan {num} Description</label>
                            <textarea
                              id={`pricing_plan${num}_desc__${sectionLang.pricing}`}
                              name={`pricing_plan${num}_desc__${sectionLang.pricing}`}
                              value={getVal(`pricing_plan${num}_desc`, 'pricing')}
                              onChange={(e) => handleFieldChange(`pricing_plan${num}_desc`, sectionLang.pricing, e.target.value)}
                              placeholder="Plan Description..."
                              title={`Plan ${num} Description`}
                              rows={2}
                              className="w-full bg-stone-50 hover:bg-stone-100/50 border border-dashed border-gold-muted/20 rounded p-1 text-[8px] text-stone/85 leading-normal focus:outline-none resize-none text-start"
                            />
                            
                            <ul className="pt-3 space-y-1.5 border-t border-gold-muted/10 text-[8px] font-ui">
                              {([1, 2, 3] as const).map((featNum) => (
                                <li key={featNum} className="flex items-center gap-1.5">
                                  <span className="text-gold font-bold">✓</span>
                                  <label htmlFor={`pricing_plan${num}_feat${featNum}__${sectionLang.pricing}`} className="sr-only">Plan {num} Feature {featNum}</label>
                                  <input
                                    id={`pricing_plan${num}_feat${featNum}__${sectionLang.pricing}`}
                                    type="text"
                                    name={`pricing_plan${num}_feat${featNum}__${sectionLang.pricing}`}
                                    value={getVal(`pricing_plan${num}_feat${featNum}`, 'pricing')}
                                    onChange={(e) => handleFieldChange(`pricing_plan${num}_feat${featNum}`, sectionLang.pricing, e.target.value)}
                                    placeholder={`Feature ${featNum}...`}
                                    title={`Plan ${num} Feature ${featNum}`}
                                    className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] focus:outline-none text-start"
                                  />
                                </li>
                              ))}
                              
                              {/* Feature 4 is now editable for ALL plans including Plan 1 */}
                              <li className="flex items-center gap-1.5">
                                <span className="text-gold font-bold">✓</span>
                                <label htmlFor={`pricing_plan${num}_feat4__${sectionLang.pricing}`} className="sr-only">Plan {num} Feature 4</label>
                                <input
                                  id={`pricing_plan${num}_feat4__${sectionLang.pricing}`}
                                  type="text"
                                  name={`pricing_plan${num}_feat4__${sectionLang.pricing}`}
                                  value={getVal(`pricing_plan${num}_feat4`, 'pricing')}
                                  onChange={(e) => handleFieldChange(`pricing_plan${num}_feat4`, sectionLang.pricing, e.target.value)}
                                  placeholder="Feature 4..."
                                  title={`Plan ${num} Feature 4`}
                                  className="w-full bg-white hover:bg-stone-50 border border-dashed border-gold-muted/20 rounded px-1 text-[8px] focus:outline-none text-start"
                                />
                              </li>
                            </ul>
                          </div>
                          <div className={`text-center py-2 rounded-lg text-[8px] font-bold mt-4 select-none cursor-pointer border ${
                            num === 2 
                              ? 'bg-gold text-white border-gold hover:bg-gold/90' 
                              : 'bg-stone-50 text-gold border-gold-muted/20 hover:bg-gold-muted/5'
                          }`}>
                            {num === 1 ? (isRtl ? 'احجز حصتك التجريبية الآن' : 'Book Assessment Now') : num === 2 ? (isRtl ? 'اشترك في الباقة التعليمية' : 'Subscribe to Class Plan') : (isRtl ? 'التقديم لمسار الإجازة' : 'Apply for Isnad Track')}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Refund policy widget */}
                    <div className="border-t border-gold-muted/12 pt-6">
                      <div className="bg-[#FDFAF3] border border-gold-muted/15 rounded-xl p-6 flex gap-6 items-start">
                        <ShieldCheck className="text-gold w-6 h-6 shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <label htmlFor={`pricing_teaser_trial_refund_policy_title__${sectionLang.pricing}`} className="sr-only">
                            {isRtl ? 'عنوان سياسة الاسترجاع' : 'Refund Policy Title'}
                          </label>
                          <input
                            id={`pricing_teaser_trial_refund_policy_title__${sectionLang.pricing}`}
                            type="text"
                            name={`pricing_teaser_trial_refund_policy_title__${sectionLang.pricing}`}
                            value={getVal('pricing_teaser_trial_refund_policy_title', 'pricing')}
                            onChange={(e) => handleFieldChange('pricing_teaser_trial_refund_policy_title', sectionLang.pricing, e.target.value)}
                            placeholder={isRtl ? 'عنوان سياسة الاسترجاع...' : 'Refund Policy Title...'}
                            title={isRtl ? 'عنوان سياسة الاسترجاع' : 'Refund Policy Title'}
                            className="w-full bg-white border border-dashed border-gold-muted/30 rounded px-2 py-0.5 text-midnight text-xs font-bold focus:outline-none"
                          />
                          <label htmlFor={`pricing_teaser_trial_refund_policy_desc__${sectionLang.pricing}`} className="sr-only">
                            {isRtl ? 'وصف سياسة الاسترجاع' : 'Refund Policy Description'}
                          </label>
                          <textarea
                            id={`pricing_teaser_trial_refund_policy_desc__${sectionLang.pricing}`}
                            name={`pricing_teaser_trial_refund_policy_desc__${sectionLang.pricing}`}
                            value={getVal('pricing_teaser_trial_refund_policy_desc', 'pricing')}
                            onChange={(e) => handleFieldChange('pricing_teaser_trial_refund_policy_desc', sectionLang.pricing, e.target.value)}
                            placeholder={isRtl ? 'وصف سياسة الاسترجاع...' : 'Refund Policy Description...'}
                            title={isRtl ? 'وصف سياسة الاسترجاع' : 'Refund Policy Description'}
                            rows={2}
                            className="w-full bg-white border border-dashed border-gold-muted/30 rounded px-2 py-0.5 text-stone text-[10px] focus:outline-none resize-none font-ui"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.pricing?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Pricing updated successfully'}
                      </span>
                    )}
                    {saveStates.pricing?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.pricing.error}` : `Error: ${saveStates.pricing.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('pricing')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.pricing?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.pricing?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.pricing?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* FINAL CTA SECTION */}
            {activeSubSection === 'final_cta' && (
              <form 
                onSubmit={(e) => handleSaveSection(e, 'final_cta')}
                className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
                  <div>
                    <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                      <Sparkles size={16} className="text-gold" />
                      {isRtl ? 'قسم الدعوة النهائية للتسجيل' : 'Final CTA Panel'}
                    </h3>
                    <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                      {isRtl ? 'تحرير نصوص البطاقة النهائية وأزرار الدعوة للإجراء' : 'Edit final CTA tagline, title, description, and action buttons.'}
                    </p>
                  </div>

                  <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                    {(['ar', 'en', 'fr'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSectionLang(prev => ({ ...prev, final_cta: lang }))}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          sectionLang.final_cta === lang 
                            ? 'bg-gold text-white shadow-sm' 
                            : 'text-stone/60 hover:text-midnight'
                        }`}
                      >
                        {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form preview */}
                <div className="p-6 text-start space-y-6">
                  <div className="relative rounded-[2.5rem] p-14 md:p-20 bg-gradient-to-br from-[#1c2b46]/75 via-[#132034]/90 to-[#0e1726]/85 backdrop-blur-xl border border-gold-muted/30 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden group">
                    {/* Top gold accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20" />

                    {/* Repeating 8-star watermark simulation */}
                    <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:24px_24px] opacity-[0.04] pointer-events-none" />

                    {/* Ambient Glow */}
                    <div className="absolute -top-24 left-1/3 w-[300px] h-[300px] bg-gold-hi/10 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 max-w-xl mx-auto space-y-8 text-center">
                      <label htmlFor={`final_cta_tag__${sectionLang.final_cta}`} className="sr-only">
                        {isRtl ? 'تصنيف الدعوة للتسجيل' : 'Final CTA Tagline'}
                      </label>
                      <input
                        id={`final_cta_tag__${sectionLang.final_cta}`}
                        type="text"
                        name={`final_cta_tag__${sectionLang.final_cta}`}
                        value={getVal('final_cta_tag', 'final_cta')}
                        onChange={(e) => handleFieldChange('final_cta_tag', sectionLang.final_cta, e.target.value)}
                        placeholder="Tag..."
                        title="Final CTA Tagline"
                        className="w-full text-center bg-black/20 hover:bg-black/35 border border-dashed border-gold-hi/30 rounded px-2 py-0.5 text-gold-hi text-xs md:text-sm font-bold focus:outline-none"
                      />

                      <label htmlFor={`final_cta_title__${sectionLang.final_cta}`} className="sr-only">
                        {isRtl ? 'عنوان الدعوة للتسجيل' : 'Final CTA Title'}
                      </label>
                      <input
                        id={`final_cta_title__${sectionLang.final_cta}`}
                        type="text"
                        name={`final_cta_title__${sectionLang.final_cta}`}
                        value={getVal('final_cta_title', 'final_cta')}
                        onChange={(e) => handleFieldChange('final_cta_title', sectionLang.final_cta, e.target.value)}
                        placeholder="Title..."
                        title="Final CTA Title"
                        className="w-full text-center bg-black/20 hover:bg-black/35 border border-dashed border-gold-hi/30 rounded px-2.5 py-1.5 text-parchment text-base md:text-xl font-bold font-primary focus:outline-none"
                      />

                      <label htmlFor={`final_cta_desc__${sectionLang.final_cta}`} className="sr-only">
                        {isRtl ? 'وصف الدعوة للتسجيل' : 'Final CTA Description'}
                      </label>
                      <textarea
                        id={`final_cta_desc__${sectionLang.final_cta}`}
                        name={`final_cta_desc__${sectionLang.final_cta}`}
                        value={getVal('final_cta_desc', 'final_cta')}
                        onChange={(e) => handleFieldChange('final_cta_desc', sectionLang.final_cta, e.target.value)}
                        placeholder="Description..."
                        title="Final CTA Description"
                        rows={3}
                        className="w-full text-center bg-black/20 hover:bg-black/35 border border-dashed border-white/20 rounded px-2.5 py-1.5 text-parchment/80 text-xs md:text-sm focus:outline-none resize-none font-ui leading-relaxed"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="relative z-10 flex flex-wrap justify-center gap-4 pt-4">
                      <div className="relative group/field w-full sm:w-auto min-w-[200px]">
                        <label htmlFor={`final_cta_btn_courses__${sectionLang.final_cta}`} className="text-[7px] font-bold text-white/50 block mb-1">
                          {isRtl ? 'نص زر المقروات' : 'Courses Button Text'}
                        </label>
                        <input
                          id={`final_cta_btn_courses__${sectionLang.final_cta}`}
                          type="text"
                          name={`final_cta_btn_courses__${sectionLang.final_cta}`}
                          value={getVal('final_cta_btn_courses', 'final_cta')}
                          onChange={(e) => handleFieldChange('final_cta_btn_courses', sectionLang.final_cta, e.target.value)}
                          placeholder="Button text..."
                          title="Courses Button Text"
                          className="w-full bg-gold text-[#122038] text-[11px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full border border-dashed border-midnight/15 text-center focus:outline-none"
                        />
                      </div>
                      <div className="relative group/field w-full sm:w-auto min-w-[200px]">
                        <label htmlFor={`final_cta_btn_contact__${sectionLang.final_cta}`} className="text-[7px] font-bold text-white/50 block mb-1">
                          {isRtl ? 'نص زر التواصل' : 'Contact Button Text'}
                        </label>
                        <input
                          id={`final_cta_btn_contact__${sectionLang.final_cta}`}
                          type="text"
                          name={`final_cta_btn_contact__${sectionLang.final_cta}`}
                          value={getVal('final_cta_btn_contact', 'final_cta')}
                          onChange={(e) => handleFieldChange('final_cta_btn_contact', sectionLang.final_cta, e.target.value)}
                          placeholder="Button text..."
                          title="Contact Button Text"
                          className="w-full bg-white/5 text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full border border-dashed border-gold-hi/20 text-center focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {saveStates.final_cta?.success && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                        <CheckCircle2 size={12} className="animate-bounce" />
                        {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Final CTA updated successfully'}
                      </span>
                    )}
                    {saveStates.final_cta?.error && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                        <AlertCircle size={12} />
                        {isRtl ? `خطأ: ${saveStates.final_cta.error}` : `Error: ${saveStates.final_cta.error}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleResetSection('final_cta')}
                      className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                    >
                      {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                    </button>
                    <button
                      type="submit"
                      disabled={saveStates.final_cta?.loading}
                      className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                        saveStates.final_cta?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {saveStates.final_cta?.loading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={12} />
                          <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        )}

        {/* GLOBAL WEBSITE & FOOTER TAB */}
        {activeTab === 'global' && (
          <form 
            onSubmit={(e) => handleSaveSection(e, 'footer')}
            className="bg-white border border-gold-muted/15 rounded-3xl shadow-[0_12px_40px_rgba(139,115,85,0.05)] overflow-hidden transition-all duration-300"
          >
            {/* Card Header & Language Toggle */}
            <div className="p-6 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-start">
              <div>
                <h3 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                  <Compass size={16} className="text-gold" />
                  {isRtl ? 'تعديل تذييل صفحات الموقع (Footer Section)' : 'Global Website Footer Editor'}
                </h3>
                <p className="text-stone/60 text-[10px] mt-0.5 font-ui">
                  {isRtl ? 'تحرير الآية القرآنية أو المقولة المعروضة أسفل صفحات الموقع بالشكل الحقيقي' : 'Visual editor for Quranic verse or general statement shown in the global footer.'}
                </p>
              </div>

              <div className="flex bg-gold-muted/10 p-0.5 rounded-lg border border-gold-muted/10 self-end sm:self-auto">
                {(['ar', 'en', 'fr'] as const).map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSectionLang(prev => ({ ...prev, footer: lang }))}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                      sectionLang.footer === lang 
                        ? 'bg-gold text-white shadow-sm' 
                        : 'text-stone/60 hover:text-midnight'
                    }`}
                  >
                    {lang === 'ar' ? 'العربية' : lang === 'en' ? 'EN' : 'FR'}
                  </button>
                ))}
              </div>
            </div>

            {/* High-Fidelity Mini Layout Preview */}
            <div className="p-6">
              <div className="text-[10px] font-bold text-stone/50 uppercase tracking-widest mb-3 text-start font-ui">
                {isRtl ? 'معاينة مباشرة تفاعلية (اضغط على النص للتعديل)' : 'Interactive Live Preview (Click text area to edit)'}
              </div>

              {/* Footer replica container */}
              <div className="relative rounded-2xl p-6 bg-[#0c1424] text-[#a9b6cb]/70 border border-gold-muted/20 text-start space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-[10px] font-ui">
                  
                  {/* Brand column preview (with editable footer verse) */}
                  <div className="md:col-span-2 space-y-3">
                    {/* Mock brand logo title */}
                    <div className="text-white text-xs font-bold flex items-center gap-1.5 select-none">
                      <div className="w-5 h-5 bg-gold text-midnight font-bold rounded flex items-center justify-center text-[10px]">T</div>
                      <span>إسلام تبيان / Islam Tebyan</span>
                    </div>

                    {/* Footer Verse Textarea Group */}
                    <div className="relative group/field space-y-1">
                      <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-gold/90 text-[8px] font-bold text-midnight rounded flex items-center gap-1 opacity-0 group-hover/field:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm pointer-events-none z-20 font-ui">
                        <Pencil size={8} />
                        <span>{isRtl ? 'الآية الكريمة / نص التذييل' : 'Quranic Verse'}</span>
                      </span>
                      
                      <textarea
                        name={`footer_verse__${sectionLang.footer}`}
                        value={getVal('footer_verse', 'footer')}
                        onChange={(e) => handleFieldChange('footer_verse', sectionLang.footer, e.target.value)}
                        placeholder="Footer text or Quranic verse..."
                        rows={2}
                        className="w-full bg-white/5 border border-dashed border-white/20 hover:border-gold-hi/60 focus:border-gold-hi rounded-lg px-3 py-2 text-gold-hi text-xs leading-relaxed italic font-primary focus:outline-none focus:ring-1 focus:ring-gold-hi resize-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Mock links columns */}
                  <div className="space-y-2 select-none">
                    <p className="text-gold font-bold uppercase tracking-wider text-[8px]">Quick Links</p>
                    <ul className="space-y-1 opacity-70">
                      <li>Programs Showcase</li>
                      <li>Our Methodology</li>
                      <li>Certified Faculty</li>
                    </ul>
                  </div>

                  <div className="space-y-2 select-none">
                    <p className="text-gold font-bold uppercase tracking-wider text-[8px]">Language</p>
                    <div className="flex gap-1.5 text-[8px] font-bold text-white/50">
                      <span className="text-gold">AR</span> | <span>EN</span> | <span>FR</span>
                    </div>
                  </div>
                </div>

                {/* Footer copyright mock */}
                <div className="border-t border-white/5 pt-3 flex justify-between text-[8px] opacity-50 select-none">
                  <span>© {new Date().getFullYear()} Islam Tebyan Academy.</span>
                  <span>Privacy Policy & Terms</span>
                </div>
              </div>
            </div>

            {/* Form Footer Actions */}
            <div className="px-6 py-4 bg-gradient-to-r from-white to-[#FDFAF3]/30 border-t border-gold-muted/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {saveStates.footer?.success && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold font-ui">
                    <CheckCircle2 size={12} className="animate-bounce" />
                    {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Footer section updated successfully'}
                  </span>
                )}
                {saveStates.footer?.error && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-ui">
                    <AlertCircle size={12} />
                    {isRtl ? `خطأ: ${saveStates.footer.error}` : `Error: ${saveStates.footer.error}`}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleResetSection('footer')}
                  className="px-4 py-2.5 rounded-xl border border-stone/20 hover:border-gold hover:bg-gold/5 text-stone hover:text-gold text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-ui cursor-pointer"
                >
                  {isRtl ? 'إعادة تعيين' : 'Reset Section'}
                </button>
                <button
                  type="submit"
                  disabled={saveStates.footer?.loading}
                  className={`btn-gold py-2.5 px-5 rounded-xl text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-md transition-all duration-300 font-ui cursor-pointer ${
                    saveStates.footer?.loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {saveStates.footer?.loading ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                    </>
                  ) : (
                    <>
                      <Save size={12} />
                      <span>{isRtl ? 'حفظ هذا القسم فقط' : 'Save Section'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Dynamic Image Selector Modal */}
      {imageSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white border border-gold-muted/20 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] text-midnight font-ui text-start animate-fade-up">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gold-muted/10 bg-gradient-to-r from-white to-[#FDFAF3] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-midnight font-primary flex items-center gap-2">
                  <ImageIcon size={16} className="text-gold" />
                  <span>{isRtl ? 'اختر أو ارفع صورة' : 'Select or Upload Image'}</span>
                </h4>
                <p className="text-[10px] text-stone/60 mt-0.5 font-mono">
                  {isRtl ? `تعديل الحقل: ${imageSelectorField}` : `Editing field: ${imageSelectorField}`}
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setImageSelectorOpen(false)}
                className="p-1 rounded-lg text-stone/50 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer text-xs font-bold"
                title={isRtl ? 'إغلاق' : 'Close'}
              >
                ✕
              </button>
            </div>

            {/* Selector Tabs */}
            <div className="flex border-b border-gold-muted/10 bg-stone-50 px-4">
              <button
                type="button"
                onClick={() => setActiveSelectorTab('library')}
                className={`px-4 py-2.5 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                  activeSelectorTab === 'library'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-stone hover:text-midnight'
                }`}
              >
                {isRtl ? 'مكتبة الصور' : 'Media Library'}
              </button>
              <button
                type="button"
                onClick={() => setActiveSelectorTab('upload')}
                className={`px-4 py-2.5 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                  activeSelectorTab === 'upload'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-stone hover:text-midnight'
                }`}
              >
                {isRtl ? 'رفع صورة جديدة' : 'Upload New'}
              </button>
              <button
                type="button"
                onClick={() => setActiveSelectorTab('url')}
                className={`px-4 py-2.5 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                  activeSelectorTab === 'url'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-stone hover:text-midnight'
                }`}
              >
                {isRtl ? 'رابط مباشر (URL)' : 'Direct Link'}
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-1 max-h-[50vh] no-scrollbar">
              {activeSelectorTab === 'library' && (
                <div className="space-y-4">
                  {mediaList.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {mediaList.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectImage(url)}
                          className="group border border-gold-muted/15 hover:border-gold rounded-xl overflow-hidden aspect-video relative bg-navy flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt="Media Asset"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-stone/50 text-xs border border-dashed border-gold-muted/20 bg-stone-50 rounded-2xl">
                      {isRtl ? 'لم يتم العثور على صور في المكتبة.' : 'No images found in the asset library.'}
                    </div>
                  )}
                </div>
              )}

              {activeSelectorTab === 'upload' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gold-muted/20 hover:border-gold/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors bg-white relative">
                    {uploadingImage ? (
                      <div className="space-y-3">
                        <Loader2 className="animate-spin text-gold w-8 h-8 mx-auto" />
                        <p className="text-xs text-stone/75 font-semibold">
                          {isRtl ? 'جاري رفع الملف إلى Supabase...' : 'Uploading file to Supabase...'}
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} className="text-gold mb-3" />
                        <label htmlFor="modalMediaFile" className="sr-only">
                          {isRtl ? 'اختر ملف الصورة للرفع' : 'Choose image file to upload'}
                        </label>
                        <input
                          id="modalMediaFile"
                          type="file"
                          accept="image/*"
                          onChange={handleUploadImage}
                          title={isRtl ? 'اختر ملف الصورة للرفع' : 'Choose image file to upload'}
                          className="w-full text-center text-stone text-xs file:bg-gold/10 file:border-none file:text-gold file:px-3 file:py-1.5 file:rounded-lg file:mr-3 focus:outline-none file:cursor-pointer"
                        />
                        <p className="text-[10px] text-stone/50 mt-2">
                          {isRtl ? 'الامتدادات المسموحة: PNG, JPG, WEBP وغيرها (الصور فقط)' : 'Allowed extensions: PNG, JPG, WEBP, etc. (Images only)'}
                        </p>
                      </>
                    )}
                  </div>
                  {uploadError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-[10px] font-bold text-center">
                      {uploadError}
                    </div>
                  )}
                </div>
              )}

              {activeSelectorTab === 'url' && (
                <div className="space-y-4">
                  <div className="space-y-1.5 text-start">
                    <label htmlFor="modalCustomUrl" className="text-[10px] font-bold text-stone/50 block">
                      {isRtl ? 'رابط الصورة المباشر' : 'Direct Image Link (URL)'}
                    </label>
                    <input
                      id="modalCustomUrl"
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="https://example.com/image.png"
                      className="w-full bg-stone-50 border border-gold-muted/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => selectImage(customImageUrl)}
                    className="btn-gold w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer text-center text-midnight shadow-md shadow-gold/10"
                  >
                    {isRtl ? 'استخدام هذا الرابط' : 'Use Direct Link'}
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-stone-50 border-t border-gold-muted/10 flex justify-end">
              <button
                type="button"
                onClick={() => setImageSelectorOpen(false)}
                className="px-4 py-2 border border-stone/20 rounded-xl text-stone hover:bg-stone/5 text-xs font-bold transition-all cursor-pointer"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
