'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Loader2, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Send,
  MessageCircle,
  Clock,
  ChevronDown,
  GraduationCap,
  ClipboardList,
  Shield,
  CheckCircle2,
  Users,
  ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ParallaxBackground from '@/components/ui/ParallaxBackground';

/* ═══════════════════════════════════════════════════════════════
   Timezone → Country mapping (covers 40+ common timezones)
   ═══════════════════════════════════════════════════════════════ */
const TIMEZONE_COUNTRY_MAP: Record<string, { code: string; name: string; dial: string; flag: string }> = {
  'Africa/Cairo': { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
  'Africa/Casablanca': { code: 'MA', name: 'Morocco', dial: '+212', flag: '🇲🇦' },
  'Africa/Algiers': { code: 'DZ', name: 'Algeria', dial: '+213', flag: '🇩🇿' },
  'Africa/Tunis': { code: 'TN', name: 'Tunisia', dial: '+216', flag: '🇹🇳' },
  'Africa/Tripoli': { code: 'LY', name: 'Libya', dial: '+218', flag: '🇱🇾' },
  'Africa/Khartoum': { code: 'SD', name: 'Sudan', dial: '+249', flag: '🇸🇩' },
  'Asia/Riyadh': { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
  'Asia/Dubai': { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪' },
  'Asia/Qatar': { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦' },
  'Asia/Kuwait': { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼' },
  'Asia/Bahrain': { code: 'BH', name: 'Bahrain', dial: '+973', flag: '🇧🇭' },
  'Asia/Muscat': { code: 'OM', name: 'Oman', dial: '+968', flag: '🇴🇲' },
  'Asia/Amman': { code: 'JO', name: 'Jordan', dial: '+962', flag: '🇯🇴' },
  'Asia/Beirut': { code: 'LB', name: 'Lebanon', dial: '+961', flag: '🇱🇧' },
  'Asia/Baghdad': { code: 'IQ', name: 'Iraq', dial: '+964', flag: '🇮🇶' },
  'Asia/Damascus': { code: 'SY', name: 'Syria', dial: '+963', flag: '🇸🇾' },
  'Asia/Gaza': { code: 'PS', name: 'Palestine', dial: '+970', flag: '🇵🇸' },
  'Asia/Hebron': { code: 'PS', name: 'Palestine', dial: '+970', flag: '🇵🇸' },
  'Asia/Istanbul': { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷' },
  'Asia/Karachi': { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
  'Asia/Kolkata': { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  'Asia/Dhaka': { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
  'Asia/Jakarta': { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
  'Asia/Kuala_Lumpur': { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
  'Europe/London': { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  'Europe/Paris': { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  'Europe/Berlin': { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  'Europe/Brussels': { code: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪' },
  'Europe/Amsterdam': { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  'Europe/Rome': { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
  'Europe/Madrid': { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  'Europe/Stockholm': { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
  'America/New_York': { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  'America/Chicago': { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  'America/Denver': { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  'America/Los_Angeles': { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  'America/Toronto': { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  'America/Sao_Paulo': { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  'Australia/Sydney': { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
};

const DEFAULT_COUNTRY = { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' };

function detectCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_COUNTRY_MAP[tz] || DEFAULT_COUNTRY;
  } catch {
    return DEFAULT_COUNTRY;
  }
}

// Zod validation schema matching the full fields of the homepage booking form
const bookingContactSchema = z.object({
  firstName: z.string().min(2, 'First name is required / الاسم الأول مطلوب'),
  lastName: z.string().min(2, 'Last name is required / اسم العائلة مطلوب'),
  email: z.string().email('Valid email is required / البريد الإلكتروني غير صحيح'),
  age: z.string().min(1, 'Age is required / العمر مطلوب'),
  gender: z.enum(['male', 'female']),
  preferredTeacher: z.enum(['any', 'male', 'female']),
  course: z.string().min(1, 'Please select a course / الرجاء اختيار المقرر الدراسي'),
  country: z.string().min(1),
  whatsapp: z.string().min(5, 'Valid WhatsApp number is required / رقم الواتساب مطلوب'),
  message: z.string().optional(),
});

type BookingContactData = z.infer<typeof bookingContactSchema>;

// Trilingual localized content config
const content = {
  ar: {
    hero: {
      tag: 'بوابة التواصل والقبول الأكاديمي',
      title: 'تواصل مع مستشاري أكاديمية تبيان',
      subtitle: 'هل لديك أسئلة حول البرامج الدراسية، أوقات الحصص، أو مؤهلات معلمينا الأزهريين؟ تفضل بملء طلبك وسيتواصل معك منسقو الأكاديمية على مدار الساعة لتصميم خطتك المخصصة.',
      verse: '﴿يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا﴾',
      verseCitation: 'سورة الحجرات [13]',
    },
    divisions: {
      tag: 'إدارة الفصول وشؤون الطلاب',
      title: 'أقسام التنسيق المباشر',
      subtitle: 'اختر القسم المعني باستفسارك للتواصل الفوري والمتابعة المباشرة مع المنسق المسؤول.',
      items: [
        {
          title: 'مكتب القبول والتسجيل الجديد',
          desc: 'للطلاب الجدد، حجز حصص التقييم المجانية، استفسارات المقررات واختيار المدرسين.',
          btn: 'تواصل مع القبول',
          url: 'https://wa.me/201019281416?text=Admissions%20Inquiry',
        },
        {
          title: 'إدارة شؤون الطلاب والمتابعة',
          desc: 'للطلاب الحاليين، تنسيق الجداول الدراسية، حالات تجميد الاشتراكات، وتقارير الحضور.',
          btn: 'تواصل مع شؤون الطلاب',
          url: 'https://wa.me/201019281416?text=Student%20Affairs%20Inquiry',
        },
        {
          title: 'الدعم التقني وغرف الفصول',
          desc: 'للمشاكل المتعلقة بروابط زووم، إعدادات الصوت والصورة، أو استخدام المنصة التعليمية.',
          btn: 'تواصل مع الدعم الفني',
          url: 'https://wa.me/201019281416?text=Technical%20Support',
        }
      ]
    },
    pipeline: {
      tag: 'رحلتك الدراسية مع أكاديمية تبيان',
      title: 'خطوات البدء والتأسيس الأكاديمي',
      steps: [
        {
          number: '01',
          title: 'طلب الانضمام',
          desc: 'املأ استمارة التسجيل أدناه مع توضيح أهدافك والمقرر الدراسي المفضل وأوقات الملاءمة.',
        },
        {
          number: '02',
          title: 'التنسيق والتواصل',
          desc: 'يتواصل معك منسق القبول عبر واتساب لتحديد موعد جلسة التقييم وتوضيح المتطلبات.',
        },
        {
          number: '03',
          title: 'التقييم المجاني',
          desc: 'جلسة تشخيصية فردية (15-30 دقيقة) مع معلم أزهري لتحديد المستوى واقتراح الخطة الدراسية.',
        },
        {
          number: '04',
          title: 'اعتماد الجدول والبدء',
          desc: 'اختيار المعلم المفضل، تحديد مواعيد الحصص الأسبوعية الثابتة، والبدء بسند متصل.',
        }
      ]
    },
    info: {
      whatsapp: {
        title: 'واتساب الأعمال الرسمي',
        subtitle: 'تواصل فوري سريع للمساعدة في حجز التقييم وتعديل الجداول.',
        value: '+20 101 928 1416',
        btn: 'ابدأ الدردشة الآن',
        url: 'https://wa.me/201019281416',
      },
      email: {
        title: 'البريد الإلكتروني للأكاديمية',
        subtitle: 'للمراسلات الرسمية، طلبات الشراكة واستفسارات الطلاب العامة.',
        value: 'support@islamtebyan.com',
        btn: 'نسخ البريد الإلكتروني',
      },
      supportWhatsapp: {
        title: 'دعم المقررات والطلاب',
        subtitle: 'تواصل مباشر مع قسم المتابعة لتنسيق الحصص والاختبارات.',
        value: '+20 101 928 1416',
        btn: 'تواصل مع الدعم الفوري',
        url: 'https://wa.me/201019281416?text=Support',
      },
      office: {
        title: 'المقر وساعات التواصل',
        address: 'القاهرة، مصر',
        hours: 'متاحون أونلاين 24 ساعة طوال أيام الأسبوع',
      }
    },
    form: {
      title: 'طلب الجلسة المجانية والتواصل',
      subtitle: 'أكمل بيانات الطالب بالكامل، وسنقوم بالرد وتنسيق الجلسة خلال 12 ساعة كحد أقصى.',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      age: 'العمر',
      gender: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
      preferredTeacher: 'تفضيل المعلم',
      any: 'أي معلم',
      course: 'المقرر الدراسي المطلوب',
      countryLabel: 'الدولة',
      whatsapp: 'رقم الواتساب',
      message: 'رسالة إضافية / أهداف الدراسة',
      messagePlaceholder: 'اكتب تفاصيل إضافية مثل مستواك الحالي، والأهداف التي تود تحقيقها...',
      btnSubmit: 'تأكيد وحفظ الطلب',
      successTitle: 'تم إرسال طلبك بنجاح!',
      successDesc: 'نشكرك على ثقتك. سيقوم منسق القبول والتسجيل بالتواصل معك عبر الواتساب أو البريد الإلكتروني لتأكيد موعد الجلسة التجريبية وتزويدك ببيانات المعلم ورابط زووم.',
      courses: [
        { value: 'quran', label: 'القرآن الكريم والتجويد' },
        { value: 'fiqh', label: 'الفقه المالكي' },
        { value: 'arabic', label: 'النحو والصرف واللغة العربية' },
        { value: 'aqidah', label: 'العقيدة الإسلامية والتوحيد' },
        { value: 'logic', label: 'علم المنطق والبحث' },
        { value: 'literature', label: 'الأدب والبلاغة الإسلامية' },
        { value: 'kids', label: 'برنامج التأسيس المخصص للأطفال' },
      ],
    },
    hub: {
      tag: 'استمارة التسجيل المباشرة',
      title: 'احجز تقييمك المجاني وتواصل معنا',
      subtitle: 'املأ الاستمارة أدناه لتنسيق جلستك التجريبية وتحديد المعلم المناسب، أو تواصل فوراً عبر قنوات الدعم المباشرة.',
    },
    social: {
      title: 'تابع تبيان على منصات التواصل',
      subtitle: 'انضم لمجتمعنا الأكاديمي وتابع المحاضرات العامة، والإنتاجات العلمية، والدروس المباشرة.',
      ctaText: 'أو تفضل باستكشاف مناهجنا الدراسية ومدونتنا المعرفية مباشرة',
      btnCourses: 'استكشاف المقررات الدراسية',
      btnArticles: 'تصفح المقالات والمدونة',
    }
  },
  en: {
    hero: {
      tag: 'ADMISSIONS & CONTACT PORTAL',
      title: 'Connect with Tebyan Academic Advising',
      subtitle: 'Have questions about programs, scheduling, or scholarly credentials? Or want to reserve a free assessment directly? Fill out this request and our coordination team will assist you 24/7.',
      verse: '﴿يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا﴾',
      verseCitation: 'Surah Al-Hujurat [49:13]',
    },
    divisions: {
      tag: 'ACADEMIC ADMINISTRATION',
      title: 'Admissions & Student Services Divisions',
      subtitle: 'Reach out to the appropriate department directly for faster resolution and specialized guidance.',
      items: [
        {
          title: 'Admissions & New Enrollments',
          desc: 'For new inquiries, booking free diagnostic evaluations, curriculum selections, and pricing questions.',
          btn: 'Contact Admissions',
          url: 'https://wa.me/201019281416?text=Admissions%20Inquiry',
        },
        {
          title: 'Student Affairs & Support',
          desc: 'For active students, shifting class schedules, subscription freeze requests, and attendance follow-ups.',
          btn: 'Contact Student Affairs',
          url: 'https://wa.me/201019281416?text=Student%20Affairs%20Inquiry',
        },
        {
          title: 'Technical Support & Zoom Rooms',
          desc: 'Assistance for classroom Zoom link errors, browser configurations, mic/camera settings, and portal issues.',
          btn: 'Contact Tech Support',
          url: 'https://wa.me/201019281416?text=Technical%20Support',
        }
      ]
    },
    pipeline: {
      tag: 'ONBOARDING PIPELINE',
      title: 'Steps to Begin Your Learning Path',
      steps: [
        {
          number: '01',
          title: 'Registration Request',
          desc: 'Complete the scheduling form below detailing your goals, preferred course, age, and weekly availability.',
        },
        {
          number: '02',
          title: 'Instant Coordination',
          desc: 'Our admissions coordinator reaches out to you via WhatsApp to align schedule requirements.',
        },
        {
          number: '03',
          title: 'Free Diagnostic Trial',
          desc: 'Attend a live 1-on-1 Zoom session (15-30 mins) with an Al-Azhar scholar to assess your level and baseline.',
        },
        {
          number: '04',
          title: 'Final Syllabus Match',
          desc: 'Secure your permanent slots, designate teacher gender preference, and start learning under connected chain.',
        }
      ]
    },
    info: {
      whatsapp: {
        title: 'Official WhatsApp Business',
        subtitle: 'Instant chat support for trial booking, scheduling, and admin help.',
        value: '+20 101 928 1416',
        btn: 'Start Live Chat',
        url: 'https://wa.me/201019281416',
      },
      email: {
        title: 'Official Academy Email',
        subtitle: 'For corporate inquiries, partner proposals, or administrative questions.',
        value: 'support@islamtebyan.com',
        btn: 'Copy Email Address',
      },
      supportWhatsapp: {
        title: 'Academic Support WhatsApp',
        subtitle: 'Direct support line for scheduling, quizzes, and class assistance.',
        value: '+20 101 928 1416',
        btn: 'Chat with Support',
        url: 'https://wa.me/201019281416?text=Support',
      },
      office: {
        title: 'Office Location & Hours',
        address: 'Cairo, Egypt',
        hours: 'Available online 24 hours / 7 days',
      }
    },
    form: {
      title: 'Request Free Trial & Contact Team',
      subtitle: 'Complete all student details. Our admissions team will email/WhatsApp you within 12 hours.',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      age: 'Age',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      preferredTeacher: 'Teacher Preference',
      any: 'Any Teacher',
      course: 'Select Target Program',
      countryLabel: 'Country',
      whatsapp: 'WhatsApp Number',
      message: 'Additional Message / Goals',
      messagePlaceholder: 'Tell us about your learning goals, current recitation/Arabic background, and schedule preferences...',
      btnSubmit: 'Confirm & Send Request',
      successTitle: 'Request Received Successfully!',
      successDesc: 'Thank you for choosing Tebyan. An academic coordinator will contact you via WhatsApp or email within 12 hours to confirm your free trial date and send your Zoom link.',
      courses: [
        { value: 'quran', label: 'Quran & Tajweed (connected chain)' },
        { value: 'fiqh', label: 'Maliki Jurisprudence' },
        { value: 'arabic', label: 'Classical Arabic & Grammar' },
        { value: 'aqidah', label: 'Islamic Creed & Aqidah' },
        { value: 'logic', label: 'Islamic Logic (Mantiq)' },
        { value: 'literature', label: 'Rhetoric & Literature' },
        { value: 'kids', label: 'Custom Kids Foundation Program' },
      ],
    },
    hub: {
      tag: 'DIRECT ENROLLMENT HUB',
      title: 'Request Your Evaluation & Connect Directly',
      subtitle: 'Complete the student application below to schedule your free trial class, or contact our coordinators instantly.',
    },
    social: {
      title: 'Join Our Scholarly Community',
      subtitle: 'Follow our lectures, publications, and announcements across official social channels.',
      ctaText: 'Or explore our academic courses and knowledge blog directly.',
      btnCourses: 'Explore Courses & Programs',
      btnArticles: 'Browse Scholarly Articles',
    }
  },
  en_US: {
    hero: {
      tag: 'ADMISSIONS & CONTACT PORTAL',
      title: 'Connect with Tebyan Academic Advising',
      subtitle: 'Have questions about programs, scheduling, or scholarly credentials? Or want to reserve a free assessment directly? Fill out this request and our coordination team will assist you 24/7.',
      verse: '﴿يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا﴾',
      verseCitation: 'Surah Al-Hujurat [49:13]',
    },
    divisions: {
      tag: 'ACADEMIC ADMINISTRATION',
      title: 'Admissions & Student Services Divisions',
      subtitle: 'Reach out to the appropriate department directly for faster resolution and specialized guidance.',
      items: [
        {
          title: 'Admissions & New Enrollments',
          desc: 'For new inquiries, booking free diagnostic evaluations, curriculum selections, and pricing questions.',
          btn: 'Contact Admissions',
          url: 'https://wa.me/201019281416?text=Admissions%20Inquiry',
        },
        {
          title: 'Student Affairs & Support',
          desc: 'For active students, shifting class schedules, subscription freeze requests, and attendance follow-ups.',
          btn: 'Contact Student Affairs',
          url: 'https://wa.me/201019281416?text=Student%20Affairs%20Inquiry',
        },
        {
          title: 'Technical Support & Zoom Rooms',
          desc: 'Assistance for classroom Zoom link errors, browser configurations, mic/camera settings, and portal issues.',
          btn: 'Contact Tech Support',
          url: 'https://wa.me/201019281416?text=Technical%20Support',
        }
      ]
    },
    pipeline: {
      tag: 'ONBOARDING PIPELINE',
      title: 'Steps to Begin Your Learning Path',
      steps: [
        {
          number: '01',
          title: 'Registration Request',
          desc: 'Complete the scheduling form below detailing your goals, preferred course, age, and weekly availability.',
        },
        {
          number: '02',
          title: 'Instant Coordination',
          desc: 'Our admissions coordinator reaches out to you via WhatsApp to align schedule requirements.',
        },
        {
          number: '03',
          title: 'Free Diagnostic Trial',
          desc: 'Attend a live 1-on-1 Zoom session (15-30 mins) with an Al-Azhar scholar to assess your level and baseline.',
        },
        {
          number: '04',
          title: 'Final Syllabus Match',
          desc: 'Secure your permanent slots, designate teacher gender preference, and start learning under connected chain.',
        }
      ]
    },
    info: {
      whatsapp: {
        title: 'Official WhatsApp Business',
        subtitle: 'Instant chat support for trial booking, scheduling, and admin help.',
        value: '+20 101 928 1416',
        btn: 'Start Live Chat',
        url: 'https://wa.me/201019281416',
      },
      email: {
        title: 'Official Academy Email',
        subtitle: 'For corporate inquiries, partner proposals, or administrative questions.',
        value: 'support@islamtebyan.com',
        btn: 'Copy Email Address',
      },
      supportWhatsapp: {
        title: 'Academic Support WhatsApp',
        subtitle: 'Direct support line for scheduling, quizzes, and class assistance.',
        value: '+20 101 928 1416',
        btn: 'Chat with Support',
        url: 'https://wa.me/201019281416?text=Support',
      },
      office: {
        title: 'Office Location & Hours',
        address: 'Cairo, Egypt',
        hours: 'Available online 24 hours / 7 days',
      }
    },
    form: {
      title: 'Request Free Trial & Contact Team',
      subtitle: 'Complete all student details. Our admissions team will email/WhatsApp you within 12 hours.',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      age: 'Age',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      preferredTeacher: 'Teacher Preference',
      any: 'Any Teacher',
      course: 'Select Target Program',
      countryLabel: 'Country',
      whatsapp: 'WhatsApp Number',
      message: 'Additional Message / Goals',
      messagePlaceholder: 'Tell us about your learning goals, current recitation/Arabic background, and schedule preferences...',
      btnSubmit: 'Confirm & Send Request',
      successTitle: 'Request Received Successfully!',
      successDesc: 'Thank you for choosing Tebyan. An academic coordinator will contact you via WhatsApp or email within 12 hours to confirm your free trial date and send your Zoom link.',
      courses: [
        { value: 'quran', label: 'Quran & Tajweed (connected chain)' },
        { value: 'fiqh', label: 'Maliki Jurisprudence' },
        { value: 'arabic', label: 'Classical Arabic & Grammar' },
        { value: 'aqidah', label: 'Islamic Creed & Aqidah' },
        { value: 'logic', label: 'Islamic Logic (Mantiq)' },
        { value: 'literature', label: 'Rhetoric & Literature' },
        { value: 'kids', label: 'Custom Kids Foundation Program' },
      ],
    },
    hub: {
      tag: 'DIRECT ENROLLMENT HUB',
      title: 'Request Your Evaluation & Connect Directly',
      subtitle: 'Complete the student application below to schedule your free trial class, or contact our coordinators instantly.',
    },
    social: {
      title: 'Join Our Scholarly Community',
      subtitle: 'Follow our lectures, publications, and announcements across official social channels.',
      ctaText: 'Or explore our academic courses and knowledge blog directly.',
      btnCourses: 'Explore Courses & Programs',
      btnArticles: 'Browse Scholarly Articles',
    }
  },
  fr: {
    hero: {
      tag: 'PORTAIL INSCRIPTION & CONTACT',
      title: 'Échangez avec les Conseillers Académiques',
      subtitle: 'Des questions sur nos programmes, les plannings ou les diplômes de nos savants ? Ou vous souhaitez planifier un essai gratuit direct ? Remplissez ce formulaire et notre équipe vous répondra sous 12h.',
      verse: '﴿يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا﴾',
      verseCitation: 'Sourate Al-Hujurat [49:13]',
    },
    divisions: {
      tag: 'ADMINISTRATION ACADÉMIQUE',
      title: 'Nos Services de Coordination Directs',
      subtitle: 'Contactez directement le service concerné pour accélérer le traitement de votre demande.',
      items: [
        {
          title: 'Bureau des Admissions & Nouveaux Équivalents',
          desc: 'Pour les nouveaux étudiants, réservations d\'évaluations gratuites, questions sur les cours et tarifs.',
          btn: 'Contacter les Admissions',
          url: 'https://wa.me/201019281416?text=Admissions%20Inquiry',
        },
        {
          title: 'Affaires Étudiantes & Suivi Académique',
          desc: 'Pour les étudiants actifs, changements d\'horaires, gel d\'abonnements et rapports d\'assiduité.',
          btn: 'Contacter le Suivi',
          url: 'https://wa.me/201019281416?text=Student%20Affairs%20Inquiry',
        },
        {
          title: 'Support Technique & Classes Virtuelles',
          desc: 'Assistance pour les erreurs de lien Zoom, configurations audio/vidéo et dysfonctionnements du portail.',
          btn: 'Support Technique',
          url: 'https://wa.me/201019281416?text=Technical%20Support',
        }
      ]
    },
    pipeline: {
      tag: 'PROCESSUS D\'INTÉGRATION',
      title: 'Étapes pour Commencer Votre Apprentissage',
      steps: [
        {
          number: '01',
          title: 'Demande d\'Inscription',
          desc: 'Remplissez le formulaire ci-dessous avec vos objectifs, le cours ciblé, votre âge et vos créneaux.',
        },
        {
          number: '02',
          title: 'Coordination Immédiate',
          desc: 'Un coordinateur vous contacte sur WhatsApp pour planifier le rendez-vous d\'évaluation.',
        },
        {
          number: '03',
          title: 'Évaluation Gratuite',
          desc: 'Entretien individuel de 15 à 30 min sur Zoom avec un savant d\'Al-Azhar pour évaluer votre niveau.',
        },
        {
          number: '04',
          title: 'Début des Cours sous Isnad',
          desc: 'Validation de vos créneaux fixes hebdomadaires, attribution du professeur et début des cours.',
        }
      ]
    },
    info: {
      whatsapp: {
        title: 'WhatsApp Business Officiel',
        subtitle: 'Assistance instantanée pour planifier votre évaluation gratuite et adapter votre emploi du temps.',
        value: '+20 101 928 1416',
        btn: 'Lancer la Discussion',
        url: 'https://wa.me/201019281416',
      },
      email: {
        title: 'Adresse E-mail Officielle',
        subtitle: 'Pour les propositions académiques officielles, partenariats ou questions administratives.',
        value: 'support@islamtebyan.com',
        btn: 'Copier l\'adresse e-mail',
      },
      supportWhatsapp: {
        title: 'WhatsApp de Support Académique',
        subtitle: 'Liaison de soutien direct pour les horaires, quiz et suivi des cours.',
        value: '+20 101 928 1416',
        btn: 'Contacter le Support',
        url: 'https://wa.me/201019281416?text=Support',
      },
      office: {
        title: 'Adresse & Horaires de Bureau',
        address: 'Le Caire, Égypte',
        hours: 'Disponible en ligne 24h/24 et 7j/7',
      }
    },
    form: {
      title: 'Demande d\'Évaluation & Contact',
      subtitle: 'Remplissez le formulaire ci-dessous. Notre équipe vous contactera dans les 12 heures.',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse E-mail',
      age: 'Âge',
      gender: 'Genre',
      male: 'Homme',
      female: 'Femme',
      preferredTeacher: 'Préférence Enseignant',
      any: 'Peu Importe',
      course: 'Programme Souhaité',
      countryLabel: 'Pays',
      whatsapp: 'Numéro WhatsApp',
      message: 'Message / Objectifs d\'Étude',
      messagePlaceholder: 'Décrivez vos antécédents en lecture/arabe, vos objectifs de mémorisation et vos préférences d\'horaires...',
      btnSubmit: 'Confirmer la Demande',
      successTitle: 'Demande Reçue avec Succès !',
      successDesc: 'Merci pour votre confiance. Un coordinateur académique vous contactera par WhatsApp ou e-mail dans les 12 heures pour planifier votre cours d\'essai gratuit et vous envoyer le lien Zoom.',
      courses: [
        { value: 'quran', label: 'Coran & Règles de Tajweed' },
        { value: 'fiqh', label: 'Jurisprudence Malikite' },
        { value: 'arabic', label: 'Arabe Classique & Grammaire' },
        { value: 'aqidah', label: 'Théologie & Croyance Islamique (Aqida)' },
        { value: 'logic', label: 'Logique Islamique (Mantiq)' },
        { value: 'literature', label: 'Littérature & Rhétorique' },
        { value: 'kids', label: 'Programme Fondamental pour Enfants' },
      ],
    },
    hub: {
      tag: 'CENTRE D\'INSCRIPTION DIRECT',
      title: 'Demandez votre évaluation & contactez-nous',
      subtitle: 'Remplissez le formulaire ci-dessous pour planifier votre cours d\'essai gratuit, ou contactez nos coordinateurs.',
    },
    social: {
      title: 'Rejoignez notre Communauté',
      subtitle: 'Suivez nos conférences, publications et annonces sur nos canaux officiels.',
      ctaText: 'Ou explorez directement nos cours académiques et notre blog de connaissances.',
      btnCourses: 'Explorer les cours et programmes',
      btnArticles: 'Parcourir les articles scientifiques',
    }
  }
};

// Framer Motion animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function ContactPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Cast locale to match keys
  const langKey = locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr' : 'en';
  const activeContent = content[langKey] || content.en;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingContactData>({
    resolver: zodResolver(bookingContactSchema),
    defaultValues: {
      gender: 'male',
      preferredTeacher: 'any',
      course: '',
      country: DEFAULT_COUNTRY.name,
      whatsapp: '',
      message: '',
    }
  });

  const selectedGender = watch('gender');
  const selectedTeacher = watch('preferredTeacher');

  useEffect(() => {
    const detected = detectCountry();
    setCountry(detected);
    setValue('country', detected.name);
    setValue('whatsapp', detected.dial + ' ');
  }, [setValue]);

  const onSubmit = async (data: BookingContactData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (e) {
      console.error('Error submitting direct request:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('support@islamtebyan.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass = `w-full bg-[#FDFAF3]/40 border border-gold-muted/20 text-midnight py-3.5 px-4 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 placeholder:text-stone/30 ${isRtl ? 'font-noto' : 'font-dm'}`;
  const labelClass = `block text-[10px] font-bold uppercase tracking-widest text-stone mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`;

  return (
    <article className="min-h-screen bg-ivory text-midnight overflow-x-hidden selection:bg-gold-hi/30">

      {/* ── SECTION 1: HERO HEADER (DARK 100vh) ── */}
      <section className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 overflow-hidden border-b border-gold-hi/25">
        {/* Parallax Background */}
        <ParallaxBackground src="/images/about-us-bg.webp" className="md:bg-[length:100%_100%]" />

        {/* Premium Dark Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b162c]/80 via-[#0e1d3a]/65 to-[#122548]/75 pointer-events-none z-0" />

        {/* Star watermark pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:120px_120px] opacity-[0.03] filter invert pointer-events-none z-0" />

        {/* Hero Content (Centered) */}
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 text-center my-auto flex flex-col justify-center items-center">
          <motion.span 
            className={`inline-block text-xs uppercase tracking-[0.25em] text-gold-champagne font-bold mb-5 ${isRtl ? 'font-cairo' : 'font-dm'}`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {activeContent.hero.tag}
          </motion.span>
          
          <motion.h1 
            className={`text-hero text-parchment leading-tight max-w-4xl mx-auto mb-6 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'}`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {activeContent.hero.title}
          </motion.h1>

          {/* Calligraphic Quranic Verse divider */}
          <motion.div 
            className="flex flex-col items-center justify-center my-6 max-w-2xl"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-hi to-transparent mb-4" />
            <div dir="rtl" className="text-gold-hi font-amiri text-lg md:text-[25px] leading-relaxed mb-1 select-none font-bold">
              {activeContent.hero.verse}
            </div>
            <span className="text-[10px] text-parchment/40 uppercase tracking-wider font-semibold">
              {activeContent.hero.verseCitation}
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-hi to-transparent mt-4" />
          </motion.div>
          
          <motion.p 
            className={`text-sm md:text-base text-parchment/80 leading-relaxed max-w-2xl mx-auto ${isRtl ? 'font-noto' : 'font-lora'}`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {activeContent.hero.subtitle}
          </motion.p>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2 text-gold-champagne text-center"
          animate={{ y: [0, 8, 0], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={() => document.getElementById('admissions-directory')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
        >
          <span className={`text-[9px] uppercase tracking-[0.25em] font-semibold text-parchment/40 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'اسحب للأسفل' : 'Scroll Down'}
          </span>
          <ArrowDown size={16} className="text-gold-hi" />
        </motion.div>

        {/* Shimmer line divider at bottom boundary */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gold-hi/50 via-white/70 via-gold-hi/50 to-transparent animate-gold-shimmer" />
        </div>
      </section>

      {/* ── SECTION 2: ADMISSIONS & COORDINATION divisions DIRECTORY (LIGHT CREAM) ── */}
      <section id="admissions-directory" className="bg-[#FDFAF3] py-24 relative z-10 border-b border-gold-muted/15">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.span 
            className={`text-xs uppercase tracking-widest text-gold-hi font-bold mb-3 block ${isRtl ? 'font-cairo' : 'font-dm'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {activeContent.divisions.tag}
          </motion.span>
          <motion.h2 
            className={`text-title text-midnight font-bold mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {activeContent.divisions.title}
          </motion.h2>
          <motion.p 
            className={`text-sm text-stone max-w-xl mx-auto mb-16 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {activeContent.divisions.subtitle}
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {activeContent.divisions.items.map((divi, idx) => (
              <motion.div 
                key={idx}
                className="bg-white border border-gold-muted/15 rounded-3xl p-8 shadow-sm hover:border-gold/30 hover:shadow-[0_12px_36px_rgba(139,115,85,0.06)] flex flex-col justify-between transition-all duration-300 group"
                variants={fadeInUp}
                whileHover={{ y: -6 }}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold-hi mb-6 transition-colors duration-300 group-hover:bg-gold group-hover:text-[#122038]">
                    {idx === 0 ? <GraduationCap size={22} /> : idx === 1 ? <Users size={22} /> : <Clock size={22} />}
                  </div>
                  <h3 className={`text-base font-bold text-midnight mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {divi.title}
                  </h3>
                  <p className={`text-xs text-stone/80 mb-6 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {divi.desc}
                  </p>
                </div>
                <a 
                  href={divi.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-xl border border-gold/30 text-gold-hi hover:bg-gold hover:text-[#122038] hover:border-gold transition-all duration-300 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 cursor-pointer ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  <span>{divi.btn}</span>
                  {isRtl ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: ONBOARDING TIMELINE PIPELINE (DARK BLUE) ── */}
      <section className="bg-gradient-to-b from-[#0e1e38] via-[#122548] to-[#09152b] py-24 relative z-10 border-b border-gold-hi/15 text-parchment text-center">
        {/* Background micro-pattern overlay */}
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:36px_36px] opacity-[0.03] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.span 
            className={`text-xs uppercase tracking-widest text-gold-hi font-bold mb-3 block ${isRtl ? 'font-cairo' : 'font-dm'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {activeContent.pipeline.tag}
          </motion.span>
          <motion.h2 
            className={`text-title text-parchment font-bold mb-16 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {activeContent.pipeline.title}
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {activeContent.pipeline.steps.map((step, idx) => (
              <motion.div 
                key={idx}
                className="bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-md border border-white/[0.08] rounded-3xl p-7 relative overflow-hidden flex flex-col justify-between group hover:border-gold-hi/50 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(212,168,67,0.18)]"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                {/* Ambient Top Glow Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-hi/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Step number watermark (Larger, more elegant) */}
                <div className={`absolute -right-4 -bottom-6 text-[100px] font-bold text-gold-hi/[0.02] group-hover:text-gold-hi/[0.05] transition-all duration-500 pointer-events-none select-none leading-none ${isRtl ? 'font-cairo' : 'font-cormorant'}`}>
                  {step.number}
                </div>

                <div>
                  {/* Glowing step badge */}
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold via-gold-hi to-gold-champagne text-midnight flex items-center justify-center font-bold text-sm shadow-[0_4px_12px_rgba(184,132,26,0.3)] mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(212,168,67,0.4)]">
                    <span className="font-dm text-midnight">{step.number}</span>
                  </div>
                  <h3 className={`text-base font-bold text-white mb-3 group-hover:text-gold-champagne transition-colors duration-300 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs text-parchment/75 leading-relaxed group-hover:text-parchment transition-colors duration-300 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: CONTACT INFORMATION & FULL MESSAGE FORM GRID (IVORY) ── */}
      <section id="contact-form-section" className="bg-ivory py-24 relative z-10 border-b border-gold-muted/15">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span 
              className={`text-xs uppercase tracking-widest text-gold-hi font-bold mb-3 block ${isRtl ? 'font-cairo' : 'font-dm'}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {activeContent.hub.tag}
            </motion.span>
            <motion.h2 
              className={`text-title text-midnight font-bold mb-4 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {activeContent.hub.title}
            </motion.h2>
            <motion.p 
              className={`text-sm text-stone max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {activeContent.hub.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">

            {/* Left Column: Direct channels list */}
            <motion.div 
              className="flex flex-col gap-6 lg:grid lg:grid-cols-1 lg:grid-rows-4 lg:gap-6 lg:h-full"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Location & Hours Card (Cairo, Egypt - 24 Hours Online) */}
              <motion.div 
                className="bg-gradient-to-br from-[#1c3258] via-[#122548] to-[#0a1731] border border-gold-hi/30 rounded-3xl p-7 lg:p-6 shadow-md text-parchment overflow-hidden relative text-start flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_20px_50px_rgba(212,168,67,0.15)] hover:border-gold/60 group"
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.01 }}
              >
                {/* MapPin Watermark */}
                <div className="absolute right-2 bottom-2 text-parchment/[0.02] text-8xl pointer-events-none select-none">
                  <MapPin className="w-24 h-24" />
                </div>
                
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold via-gold-hi to-gold-champagne text-midnight flex items-center justify-center shadow-[0_4px_12px_rgba(184,132,26,0.3)] mb-5 transition-all duration-300 group-hover:scale-105">
                  <MapPin size={20} className="text-midnight" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold text-gold-champagne mb-3 transition-colors duration-300 group-hover:text-white ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {activeContent.info.office.title}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2.5 items-center">
                      <MapPin size={14} className="text-gold-champagne shrink-0" />
                      <p className={`text-xs text-parchment/80 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                        {activeContent.info.office.address}
                      </p>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Clock size={14} className="text-gold-champagne shrink-0" />
                      <p className={`text-xs text-parchment/80 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                        {activeContent.info.office.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* WhatsApp Card */}
              <motion.div 
                className="bg-white border border-gold-muted/15 rounded-3xl p-6 lg:p-5 shadow-md hover:border-gold/30 transition-all duration-300 flex flex-col justify-between h-full group text-start"
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.015 }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 mb-3 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                    <Phone size={18} />
                  </div>
                  <h3 className={`text-sm font-bold text-midnight mb-1 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {activeContent.info.whatsapp.title}
                  </h3>
                  <p className={`text-[11px] text-stone/60 mb-2 leading-tight ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {activeContent.info.whatsapp.subtitle}
                  </p>
                  <span className="text-xs font-bold text-midnight font-dm select-all block mb-3">
                    {activeContent.info.whatsapp.value}
                  </span>
                </div>
                <a 
                  href={activeContent.info.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 rounded-xl border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-300 text-[11px] font-bold text-center inline-flex items-center justify-center gap-1.5 cursor-pointer ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  <span>{activeContent.info.whatsapp.btn}</span>
                  {isRtl ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
                </a>
              </motion.div>

              {/* WhatsApp Support Card */}
              <motion.div 
                className="bg-white border border-gold-muted/15 rounded-3xl p-6 lg:p-5 shadow-md hover:border-gold/30 transition-all duration-300 flex flex-col justify-between h-full group text-start"
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.015 }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 mb-3 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                    <MessageCircle size={18} />
                  </div>
                  <h3 className={`text-sm font-bold text-midnight mb-1 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {activeContent.info.supportWhatsapp.title}
                  </h3>
                  <p className={`text-[11px] text-stone/60 mb-2 leading-tight ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {activeContent.info.supportWhatsapp.subtitle}
                  </p>
                  <span className="text-xs font-bold text-midnight font-dm select-all block mb-3">
                    {activeContent.info.supportWhatsapp.value}
                  </span>
                </div>
                <a 
                  href={activeContent.info.supportWhatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 rounded-xl border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-300 text-[11px] font-bold text-center inline-flex items-center justify-center gap-1.5 cursor-pointer ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  <span>{activeContent.info.supportWhatsapp.btn}</span>
                  {isRtl ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
                </a>
              </motion.div>

              {/* Email Card */}
              <motion.div 
                className="bg-white border border-gold-muted/15 rounded-3xl p-6 lg:p-5 shadow-md hover:border-gold/30 transition-all duration-300 flex flex-col justify-between h-full group text-start"
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.015 }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold mb-3 transition-colors duration-300 group-hover:bg-gold group-hover:text-[#122038]">
                    <Mail size={18} />
                  </div>
                  <h3 className={`text-sm font-bold text-midnight mb-1 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {activeContent.info.email.title}
                  </h3>
                  <p className={`text-[11px] text-stone/60 mb-2 leading-tight ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {activeContent.info.email.subtitle}
                  </p>
                  <a 
                    href="mailto:islamtebyan@gmail.com"
                    className="text-xs font-bold text-midnight hover:text-gold font-dm select-all block mb-3 break-all transition-colors"
                  >
                    {activeContent.info.email.value}
                  </a>
                </div>
                <button 
                  onClick={copyEmail}
                  className={`w-full py-2.5 rounded-xl border border-gold-muted/30 text-gold hover:bg-gold hover:text-[#122038] hover:border-gold transition-all duration-300 text-[11px] font-bold text-center inline-flex items-center justify-center gap-1.5 cursor-pointer ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? (isRtl ? 'تم النسخ!' : 'Copied!') : activeContent.info.email.btn}</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column: Complete Booking & Message Form */}
            <motion.div 
              className="bg-white border border-gold-muted/12 shadow-[0_20px_60px_rgba(139,115,85,0.1)] rounded-3xl p-8 md:p-10 lg:col-span-2 relative overflow-hidden text-start"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Shimmer top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20" />

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 flex flex-col items-center"
                >
                  <div className="w-14 h-14 bg-gold/10 border border-gold rounded-full flex items-center justify-center text-gold mb-6 animate-pulse">
                    <Check size={26} />
                  </div>
                  <h3 className={`text-xl font-bold text-midnight mb-2 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'}`}>
                    {activeContent.form.successTitle}
                  </h3>
                  <p className={`text-xs text-stone/80 max-w-sm ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {activeContent.form.successDesc}
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className={`text-xl font-bold text-midnight mb-1.5 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                    {activeContent.form.title}
                  </h3>
                  <p className={`text-xs text-stone/50 mb-8 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {activeContent.form.subtitle}
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Row 1: First Name & Last Name (50/50) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>{activeContent.form.firstName}</label>
                        <input
                          type="text"
                          id="firstName"
                          {...register('firstName')}
                          placeholder={isRtl ? 'عبدالله' : 'Abdullah'}
                          className={inputClass}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold font-dm">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lastName" className={labelClass}>{activeContent.form.lastName}</label>
                        <input
                          type="text"
                          id="lastName"
                          {...register('lastName')}
                          placeholder={isRtl ? 'الفارسي' : 'Al-Farsi'}
                          className={inputClass}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold font-dm">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email & Age (2/3 and 1/3) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label htmlFor="email" className={labelClass}>{activeContent.form.email}</label>
                        <input
                          type="email"
                          id="email"
                          {...register('email')}
                          placeholder="hello@example.com"
                          className={inputClass}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold font-dm">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="age" className={labelClass}>{activeContent.form.age}</label>
                        <input
                          type="number"
                          id="age"
                          {...register('age')}
                          placeholder="25"
                          min="4"
                          max="99"
                          className={inputClass}
                        />
                        {errors.age && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold font-dm">{errors.age.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Gender & Preferred Teacher Selection Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{activeContent.form.gender}</label>
                        <div className="flex gap-2">
                          {(['male', 'female'] as const).map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setValue('gender', g)}
                              className={`flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                                selectedGender === g
                                  ? 'bg-navy text-parchment border-navy shadow-md'
                                  : 'bg-white text-stone/70 border-gold-muted/20 hover:border-gold/30'
                              }`}
                            >
                              {g === 'male' ? activeContent.form.male : activeContent.form.female}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" {...register('gender')} />
                      </div>

                      <div>
                        <label className={labelClass}>{activeContent.form.preferredTeacher}</label>
                        <div className="flex gap-2">
                          {(['any', 'male', 'female'] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setValue('preferredTeacher', t)}
                              className={`flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                                selectedTeacher === t
                                  ? 'bg-navy text-parchment border-navy shadow-md'
                                  : 'bg-white text-stone/70 border-gold-muted/20 hover:border-gold/30'
                              }`}
                            >
                              {t === 'any' ? activeContent.form.any : t === 'male' ? activeContent.form.male : activeContent.form.female}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" {...register('preferredTeacher')} />
                      </div>
                    </div>

                    {/* Row 4: Target Course Selection */}
                    <div>
                      <label htmlFor="course" className={labelClass}>{activeContent.form.course}</label>
                      <div className="relative">
                        <select
                          id="course"
                          {...register('course')}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>{activeContent.form.course}</option>
                          {activeContent.form.courses.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                        <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-stone/30 pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`} />
                      </div>
                      {errors.course && (
                        <p className="text-red-500 text-xs mt-1.5 font-semibold font-dm">{errors.course.message}</p>
                      )}
                    </div>

                    {/* Row 5: Country (hidden) + WhatsApp Phone dialing */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      {/* Auto-detected Country Badge */}
                      <div className="sm:col-span-2">
                        <label className={labelClass}>{activeContent.form.countryLabel}</label>
                        <div className={`flex items-center gap-2 bg-[#FDFAF3]/40 border border-gold-muted/20 py-3.5 px-4 rounded-xl ${isRtl ? 'font-noto' : 'font-dm'}`}>
                          <span className="text-lg leading-none">{country.flag}</span>
                          <span className="text-[13px] text-midnight/80 font-medium truncate">{country.name}</span>
                        </div>
                        <input type="hidden" {...register('country')} />
                      </div>

                      {/* WhatsApp phone entry */}
                      <div className="sm:col-span-3">
                        <label htmlFor="whatsapp" className={labelClass}>{activeContent.form.whatsapp}</label>
                        <div className="relative">
                          <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1 text-[12px] text-stone/50 font-semibold pointer-events-none ${isRtl ? 'right-4' : 'left-4'} ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                            <span className="text-sm">{country.flag}</span>
                            <span>{country.dial}</span>
                          </div>
                          <input
                            type="tel"
                            id="whatsapp"
                            {...register('whatsapp')}
                            placeholder={isRtl ? '5XXXXXXXX' : '5XXXXXXXX'}
                            className={`${inputClass} ${isRtl ? 'pr-20' : 'pl-20'}`}
                          />
                        </div>
                        {errors.whatsapp && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold font-dm">{errors.whatsapp.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 6: Message / Learning Goals text block */}
                    <div>
                      <label htmlFor="message" className={labelClass}>{activeContent.form.message}</label>
                      <textarea
                        id="message"
                        rows={4}
                        {...register('message')}
                        placeholder={activeContent.form.messagePlaceholder}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Submit Section */}
                    <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }} className="w-full pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-gold py-4.5 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-gold/15 transition-all duration-300 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span>{isRtl ? 'جاري الإرسال...' : 'Sending Request...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{activeContent.form.btnSubmit}</span>
                            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                          </>
                        )}
                      </button>
                    </motion.div>
                  </form>
                </>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: SOCIAL MEDIA LINKS (LIGHT GOLD BASE) ── */}
      <section className="bg-[#FDFAF3] py-20 relative z-10 text-center border-t border-gold-muted/15">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className={`text-title text-midnight font-bold mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}
              variants={fadeInUp}
            >
              {activeContent.social.title}
            </motion.h2>
            <motion.p 
              className={`text-sm text-stone max-w-xl mx-auto mb-12 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}
              variants={fadeInUp}
            >
              {activeContent.social.subtitle}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6"
              variants={staggerContainer}
            >
              {[
                { 
                  name: 'Facebook', 
                  icon: (
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  ), 
                  url: 'https://www.facebook.com/profile.php?id=61590678633766', 
                  color: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]' 
                },
                { 
                  name: 'YouTube', 
                  icon: (
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
                    </svg>
                  ), 
                  url: 'https://www.youtube.com/@TebianIslam', 
                  color: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]' 
                },
                { 
                  name: 'TikTok', 
                  icon: (
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .8.11V9.4a6.27 6.27 0 0 0-3.11.84 6.35 6.35 0 0 0-3.3 5.3 6.35 6.35 0 0 0 10.79 4.9 6.3 6.3 0 0 0 1.96-4.51V8.58a10.81 10.81 0 0 0 6.33 2.01V7.18a7.81 7.81 0 0 1-4.61-2.5z"/>
                    </svg>
                  ), 
                  url: 'https://www.tiktok.com/@isalm_tebyan/', 
                  color: 'hover:bg-black hover:text-white hover:border-black' 
                },
                { 
                  name: 'Instagram', 
                  icon: (
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.054.937.04 1.612.189 2.186.411a4.87 4.87 0 0 1 2.026 2.026c.222.574.372 1.249.412 2.186.04.927.054 1.28.054 3.71 0 2.43-.01 2.784-.054 3.71-.04.937-.189 1.613-.412 2.186a4.87 4.87 0 0 1-2.026 2.026c-.574.222-1.249.372-2.186.412-.927.04-1.28.054-3.71.054s-2.784-.01-3.71-.054c-.937-.04-1.613-.189-2.186-.412a4.87 4.87 0 0 1-2.026-2.026c-.222-.574-.372-1.249-.412-2.186-.04-.927-.054-1.28-.054-3.71 0-2.43.01-2.784.054-3.71.04-.937.189-1.613.412-2.186a4.87 4.87 0 0 1 2.026-2.026c.574-.222 1.249-.372 2.186-.412.927-.04 1.28-.054 3.71-.054zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.827-8a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    </svg>
                  ), 
                  url: 'https://www.instagram.com/islamtebyan/', 
                  color: 'hover:bg-gradient-to-tr hover:from-[#f9ce3f] hover:via-[#e1306c] hover:to-[#833ab4] hover:text-white hover:border-transparent' 
                },
                { 
                  name: 'WhatsApp', 
                  icon: (
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.031 2C6.479 2 2 6.478 2 12.029c0 1.91.536 3.693 1.463 5.23L2 22l4.908-1.428c1.464.843 3.142 1.328 4.937 1.328 5.551 0 10.03-4.478 10.03-10.029C22.062 6.478 17.582 2 12.03 2zm6.604 14.148c-.273.766-1.584 1.393-2.185 1.463-.547.062-1.258.093-2.032-.156-.475-.152-1.077-.384-1.848-.718-3.238-1.4-5.323-4.66-5.485-4.878-.162-.218-1.309-1.745-1.309-3.328 0-1.584.829-2.361 1.127-2.673.3-.312.656-.39.875-.39.219 0 .438.001.625.01.2.01.469-.077.734.56.28.673.969 2.373 1.053 2.54.084.167.141.362.031.583-.11.22-.162.36-.328.553-.167.193-.35.43-.5.58-.168.167-.343.349-.147.684.197.336.877 1.444 1.879 2.336 1.292 1.152 2.378 1.509 2.715 1.677.337.168.536.14.734-.093.2-.234.86-.998 1.09-1.342.23-.343.46-.28.77-.168.312.112 1.977.93 2.321 1.099.343.169.57.252.654.394.084.14.084.812-.19 1.578z"/>
                    </svg>
                  ), 
                  url: 'https://wa.me/201019281416', 
                  color: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]' 
                }
              ].map((plat, idx) => (
                <motion.a
                  key={idx}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 px-6 py-3 border border-gold-muted/30 text-midnight bg-white rounded-full text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer ${plat.color} ${isRtl ? 'font-cairo' : 'font-dm'}`}
                  variants={fadeInUp}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plat.icon}
                  <span>{plat.name}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* CTA to Courses & Articles */}
            <motion.div 
              className="mt-16 pt-12 border-t border-gold-muted/15 max-w-2xl mx-auto text-center"
              variants={fadeInUp}
            >
              <h3 className={`text-base font-bold text-midnight mb-3 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                {activeContent.social.ctaText}
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link
                  href={`/${locale}/programs`}
                  className={`px-8 py-3.5 bg-gradient-to-br from-gold via-gold-hi to-gold-champagne text-midnight hover:shadow-[0_12px_24px_rgba(184,132,26,0.25)] rounded-full text-xs font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer inline-flex items-center gap-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  <span>{activeContent.social.btnCourses}</span>
                  {isRtl ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className={`px-8 py-3.5 border border-gold-muted/30 text-gold-hi hover:bg-gold hover:text-midnight hover:border-gold rounded-full text-xs font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer inline-flex items-center gap-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  <span>{activeContent.social.btnArticles}</span>
                  {isRtl ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                </Link>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

    </article>
  );
}
