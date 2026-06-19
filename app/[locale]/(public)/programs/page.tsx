'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Award, BookOpen, FileText, CheckCircle2, ChevronDown, 
  ArrowRight, ArrowLeft, Book, Users, Star, GraduationCap, 
  Sparkles, HelpCircle, Layers, ShieldCheck, Mail,
  Scale, Languages, Shield, Compass, Feather
} from 'lucide-react';
import ParallaxBackground from '@/components/ui/ParallaxBackground';

const COURSE_SLUG_MAP: Record<string, string> = {
  // Quran Arabic
  'القرآن الكريم والتجويد بالسند': 'quran-tajweed',
  'علم القراءات العشر المتواترة': '10-qiraat',
  'متن الشاطبية والدرة في القراءات': 'shatibiyyah-durrah',
  'رسم المصحف العثماني وضبطه': 'mushaf-script',
  'علوم القرآن وأصول التفسير': 'quranic-sciences-tafsir',
  'علم الوقف والابتداء في التلاوة': 'waqf-ibtida',
  
  // Quran French
  'Coran & Tajwid sous Isnad': 'quran-tajweed',
  'Les Dix Lectures Mutawatir': '10-qiraat',
  'Matn al-Shatibiyyah & al-Durrah': 'shatibiyyah-durrah',
  'Orthographe Coranique (Rasm Uthmani)': 'mushaf-script',
  "Sciences du Coran & Principes d'Exégèse": 'quranic-sciences-tafsir',
  "L'art du Waqf & Ibtida (Pauses et Reprises)": 'waqf-ibtida',

  // Quran English
  'Quran & Tajweed under Isnad': 'quran-tajweed',
  "Ten Mutawatir Recitations (Qira'at)": '10-qiraat',
  'Quranic Orthography & Writing Rules': 'mushaf-script',
  'Quranic Sciences & Tafsir Principles': 'quranic-sciences-tafsir',
  'The Science of Waqf & Ibtida (Pauses)': 'waqf-ibtida',

  // Arabic Arabic
  'النحو والصرف العربي': 'arabic-grammar',
  'الأدب والبلاغة والبيان': 'arabic-literature',
  'متن ألفية ابن مالك في النحو والصرّف': 'alfiya-ibn-malik',
  'فقه اللغة وأسرار العربية': 'arabic-grammar',
  'علم العروض والقوافي وموسيقى الشعر': 'arabic-literature',
  'الإنشاء والخطابة والكتابة الأدبية': 'arabic-literature',

  // Arabic French
  'Syntaxe & Morphologie Arabes': 'arabic-grammar',
  'Littérature, Rhétorique & Éloquence': 'arabic-literature',
  "L'Alfiya d'Ibn Malik en Syntaxe & Conjugaison": 'alfiya-ibn-malik',
  'Philologie Arabe & Sémantique': 'arabic-grammar',
  'Métrique (Arud) & Poésie Classique': 'arabic-literature',
  'Rédaction Littéraire & Art Oratoire': 'arabic-literature',

  // Arabic English
  'Arabic Grammar & Morphology': 'arabic-grammar',
  'Literature, Rhetoric & Eloquence': 'arabic-literature',
  "Ibn Malik's Alfiya (Advanced Grammar)": 'alfiya-ibn-malik',
  'Arabic Philology & Semantics': 'arabic-grammar',
  'Arabic Metrics (Arud) & Poetics': 'arabic-literature',
  'Eloquent Prose & Creative Writing': 'arabic-literature',

  // Shariah Arabic
  'الفقه الإسلامي وتأصيل الأحكام': 'islamic-fiqh',
  'العقيدة الإسلامية والتوحيد': 'islamic-creed',
  'أصول الفقه وقواعد الاستنباط الفقهي': 'principles-of-fiqh',
  'مصطلح الحديث وعلوم الأثر الشريف': 'principles-of-fiqh',
  'السيرة النبوية والشمائل المحمدية المطهرة': 'islamic-creed',
  'علم المنطق السني وعلم الكلام الأزهري': 'islamic-logic',

  // Shariah French
  'Jurisprudence Islamique (Fiqh)': 'islamic-fiqh',
  'Dogme Sunnite & Théologie': 'islamic-creed',
  'Principes de Jurisprudence (Usul al-Fiqh)': 'principles-of-fiqh',
  'Sciences & Terminologie du Hadith': 'principles-of-fiqh',
  'Vie du Prophète & Nobles Caractères': 'islamic-creed',
  'Théologie & Logique Sunnite': 'islamic-logic',

  // Shariah English
  'Islamic Jurisprudence (Fiqh)': 'islamic-fiqh',
  'Islamic Creed (Aqidah)': 'islamic-creed',
  'Principles of Jurisprudence (Usul al-Fiqh)': 'principles-of-fiqh',
  'Hadith Sciences & Terminology': 'principles-of-fiqh',
  'Seerah & Prophetic Noble Qualities': 'islamic-creed',
  'Sunni Logic (Mantiq) & Theology': 'islamic-logic',

  // Youth Arabic
  'القاعدة النورانية وتأسيس اللسان': 'quran-tajweed',
  'مأموريات التجويد وحفظ القرآن للنشء': 'quran-tajweed',
  'ميكانيكا العبادات والآداب الإسلامية': 'islamic-fiqh',
  'قصص الأنبياء والتاريخ الإسلامي المبسط': 'quranic-sciences-tafsir',
  'حفظ الأذكار النبوية والأدعية اليومية للطفل': 'quran-tajweed',
  'التربية الأخلاقية والآداب الإسلامية العامة': 'islamic-creed',

  // Youth French
  'Qaida Nuraniyyah & Éveil à la Lecture': 'quran-tajweed',
  'Mémorisation du Juz Amma pour Jeunes': 'quran-tajweed',
  'Ablutions, Prière & Adab Pratique': 'islamic-fiqh',
  'Histoires des Prophètes & Histoires du Coran': 'quranic-sciences-tafsir',
  'Invocations & Adhkar pour le Quotidien': 'quran-tajweed',
  'Éducation Morale & Nobles Vertus': 'islamic-creed',

  // Youth English
  'Qaida Nuraniyyah & Reading Basics': 'quran-tajweed',
  'Juz Amma Memorization & Tajweed': 'quran-tajweed',
  'Salah, Wudu & Practical Daily Adab': 'islamic-fiqh',
  "Stories of the Prophets & Qur'an Stories": 'quranic-sciences-tafsir',
  "Daily Adhkar & Prophet's Prayers": 'quran-tajweed',
  'Islamic Ethics & Noble Character': 'islamic-creed'
};

interface Level {
  num: string;
  title: string;
  desc: string;
}

interface BookItem {
  title: string;
  author: string;
  desc: string;
}

interface FacultyMember {
  name: string;
  title: string;
  credentials: string[];
  bio: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface CourseData {
  slug?: string;
  image: string;
  iconName: string;
  title: string;
  tagline: string;
  desc: string;
  path: string;
  stats: {
    duration: string;
    syllabus: string;
    level: string;
  };
}

interface TrackData {
  title: string;
  subtitle: string;
  desc: string;
  levels: Level[];
  books: BookItem[];
  outcomes: string[];
  teachers: FacultyMember[];
  courses: CourseData[];
}

const ACADEMIC_DATABASE: Record<string, Record<string, TrackData>> = {
  ar: {
    quran: {
      title: 'علوم القرآن الكريم والتجويد الأكاديمي',
      subtitle: 'مسار التلقي وضبط الأداء بالسند المتصل',
      desc: 'مسار دراسي متكامل مخصص لضبط الحروف وتصحيح التلاوة وتلقي أحكام التجويد النظرية والعملية، وصولاً إلى الحفظ والتمكين والحصول على الإجازة بالسند المتصل إلى رسول الله ﷺ على يد كبار قراء الأزهر الشريف.',
      levels: [
        { num: '01', title: 'المستوى التمهيدي: تحرير المخارج وتصحيح الأداء', desc: 'التركيز الكامل على إخراج كل حرف من مخرجه الدقيق، وضبط صفات الحروف وتصحيح الحركات السبع للأداء القرآني الفصيح.' },
        { num: '02', title: 'المستوى المتوسط: أحكام التجويد التطبيقية', desc: 'دراسة عملية ونظرية لأحكام النون الساكنة والتنوين، والميم الساكنة، وأحكام المدود، والوقف والابتداء مع التطبيق أثناء التلاوة.' },
        { num: '03', title: 'المستوى المتقدم: التمكين والحفظ المنهجي', desc: 'حفظ وتثبيت القرآن الكريم بجدول مخصص يراعي قدرات الطالب، مع ربط الآيات ومراجعة المحفوظ القديم بطريقة الألواح العلمية.' },
        { num: '04', title: 'الإجازة والسند المتصل بالرسول ﷺ', desc: 'تلاوة الختمة الكاملة غيباً بضبط ودقة متناهية للحصول على السند المتصل برواية حفص عن عاصم أو رواية ورش وعموم القراءات العشر.' }
      ],
      books: [
        { title: 'تحفة الأطفال والغلمان', author: 'الإمام سليمان الجمزوري', desc: 'متن منظوم ميسر يجمع القواعد الأساسية لأحكام التجويد كالميم والنون الساكنة والمدود.' },
        { title: 'المقدمة الجزرية', author: 'الإمام محمد بن الجزري', desc: 'المنظومة الأم في تجويد القرآن ومخارج الحروف وصفاتها للطلاب المتقدمين.' },
        { title: 'القرآن الكريم برواية حفص عن عاصم', author: 'طريق الشاطبية', desc: 'الرواية الأكثر شيوعاً وضبطاً، ودراسة أصولها الأدائية وتطبيقها العملي.' }
      ],
      outcomes: [
        'نطق الحروف العربية نطقاً فصيحاً خالياً من اللحن الجلي والخفي.',
        'تطبيق أحكام التجويد تلقائياً أثناء القراءة دون تكلف.',
        'حفظ أجزاء من كتاب الله مع التثبيت والربط الدقيق.',
        'فهم الفروق الأدائية بين القراءات المتواترة وشروط الإجازة.'
      ],
      teachers: [
        { name: 'الشيخ أحمد محمود الأزهري', title: 'شيخ مقرأة ومجاز بالقراءات العشر', credentials: ['إجازة متصلة السند بالقراءات العشر الصغرى والكبرى', 'ليسانس علوم القرآن جامعة الأزهر'], bio: 'متخصص في تلقين وضبط التلاوة وتصحيح المخارج للطلاب العرب وغير العرب بخبرة تزيد عن 15 عاماً.' },
        { name: 'الشيخة فاطمة الزهراء', title: 'معلمة قراءات متخصصة للأطفال والنساء', credentials: ['إجازة برواية حفص وورش', 'بكالوريوس التربية الدراسات الإسلامية'], bio: 'تتميز بأسلوب تربوي مبسط لتعليم التجويد العملي وتثبيت الحفظ لفئات النساء والناشئين.' }
      ],
      courses: [
        {
          image: '/images/course_quran.png',
          iconName: 'Award',
          title: 'القرآن الكريم والتجويد بالسند',
          tagline: 'الأساس والمبتدأ',
          desc: 'تصحيح التلاوة وحفظ كتاب الله بروايتي حفص وشعبة بسند متصل مع دراسة أحكام التجويد نظرياً وعملياً لتلاوة مجودة صحيحة.',
          path: 'مسار القرآن الكريم',
          stats: { duration: '40 ساعة', syllabus: 'روايتان', level: 'تأسيسي' }
        },
        {
          image: '/images/article_qiraat.png',
          iconName: 'BookOpen',
          title: 'علم القراءات العشر المتواترة',
          tagline: 'تلقي الروايات وضبط الأداء',
          desc: 'دراسة أصول القراءات العشر المتواترة من طريقي الشاطبية والدرة وتطبيقها بمجالس الجمع والإفراد للحصول على السند المتصل.',
          path: 'مسار القرآن الكريم',
          stats: { duration: '60 ساعة', syllabus: 'الشاطبية والدرة', level: 'متقدم جداً' }
        },
        {
          image: '/images/course_shatibiyyah.png',
          iconName: 'Layers',
          title: 'متن الشاطبية والدرة في القراءات',
          tagline: 'ضوابط القراءات السبع والعشر',
          desc: 'دراسة منظومة الشاطبية والدرة لضبط أصول القراءات السبع والعشر، وتطبيقها العملي والتحريري في التلاوة والتلقي.',
          path: 'مسار القرآن الكريم',
          stats: { duration: '50 ساعة', syllabus: 'الشاطبية والدرة', level: 'متقدم' }
        },
        {
          image: '/images/pillar-manuscript.png',
          iconName: 'Feather',
          title: 'رسم المصحف العثماني وضبطه',
          tagline: 'قواعد كتابة وحفظ الرسم العثماني',
          desc: 'دراسة أصول الرسم العثماني وقواعد الضبط وعلاقة ذلك بالأداء القرآني وتواتر النص عبر العصور والمصاحف الأثرية.',
          path: 'مسار القرآن الكريم',
          stats: { duration: '30 ساعة', syllabus: 'رسم المصحف', level: 'تأصيلي' }
        },
        {
          image: '/images/pillar-study.png',
          iconName: 'Book',
          title: 'علوم القرآن وأصول التفسير',
          tagline: 'مناهج التفسير وأسباب النزول',
          desc: 'دراسة أسباب النزول، المكي والمدني، الناسخ والمنسوخ، وتاريخ جمع القرآن وتدوينه ومناهج المفسرين الأعلام واستنباط الأحكام.',
          path: 'مسار القرآن الكريم',
          stats: { duration: '40 ساعة', syllabus: 'علوم القرآن', level: 'تأصيلي' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'ShieldCheck',
          title: 'علم الوقف والابتداء في التلاوة',
          tagline: 'تمام المعنى وصون التلاوة',
          desc: 'دراسة أحكام الوقف والابتداء وتصنيفاتهما وتأثيرهما على المعنى النحوي والتفسيري لحماية القراءة من اللحن والفساد اللفظي.',
          path: 'مسار القرآن الكريم',
          stats: { duration: '24 ساعة', syllabus: 'أحكام الوقف والابتداء', level: 'متقدم' }
        }
      ]
    },
    arabic: {
      title: 'اللسانيات واللغة العربية الفصحى',
      subtitle: 'مسار علوم العربية: النحو والصرف والبلاغة',
      desc: 'مسار منهجي لتأصيل الطلاب في علوم اللسان العربي؛ يغطي دراسة النحو، الصرف، الإعراب، البلاغة البيانية، وتذوق الأدب والشعر الفصيح من التأسيس إلى مستويات التمكين اللغوي.',
      levels: [
        { num: '01', title: 'المستوى الأول: التأسيس والتكامل اللغوي', desc: 'بناء الثروة اللغوية الأساسية، والتدرب على المحادثة البسيطة، والتمكين من القراءة والكتابة الصحيحة للتراكيب العربية.' },
        { num: '02', title: 'المستوى الثاني: قواعد النحو وعلم الإعراب', desc: 'دراسة الجملة الاسمية والفعلية، والمرفوعات والمنصوبات والمجرورات من الأسماء، وتطبيق قواعد النحو على نصوص الفصحى.' },
        { num: '03', title: 'المستوى الثالث: علم الصرف وأوزان الكلمات', desc: 'فهم بنية الكلمة واشتقاقها، وتصريف الأفعال والمشتقات والمصادر والمجرد والمزيد لتوسيع الفهم الدلالي للالفاظ.' },
        { num: '04', title: 'المستوى الرابع: البلاغة والأدب وإعجاز النظم', desc: 'دراسة علوم المعاني والبيان والبديع، وتحليل التراكيب البلاغية الراقية وتذوق الشعر العربي وتطبيقه في فهم إعجاز النظم القرآني.' }
      ],
      books: [
        { title: 'الآجرومية في علم العربية', author: 'الإمام ابن آجروم الصنهاجي', desc: 'المتن الأساسي الأول لولوج علم النحو وفهم قواعد الإعراب بشكل مبسط ورصين.' },
        { title: 'قطر الندى وبل الصدى', author: 'الإمام ابن هشام الأنصاري', desc: 'شرح فقهي لغوي متوسط يعمق قواعد النحو ويبسط أصول الإعراب بالتفصيل الشافي.' },
        { title: 'العربية بين يديك', author: 'نخبة من علماء اللغة', desc: 'السلسلة المعاصرة الأقوى لتنمية مهارات التحدث والاستماع والقراءة لغير الناطقين بالعربية.' }
      ],
      outcomes: [
        'القدرة على التحدث بلغة عربية فصحى صحيحة خالية من اللحن العامي.',
        'إعراب الجمل المعقدة في القرآن الكريم والنصوص الأدبية إعراباً دقيقاً.',
        'فهم بنية الكلمات وتصريفاتها وتوليد المشتقات اللغوية بمرونة.',
        'تذوق وجوه الإعجاز البلاغي والبياني في النص القرآني الكريم.'
      ],
      teachers: [
        { name: 'الدكتور ياسر عبد الرحمن', title: 'أستاذ اللغويات والنحو بجامعة الأزهر', credentials: ['دكتوراه في اللغة العربية وآدابها بجامعة الأزهر', 'عضو الجمعية اللغوية للغة العربية'], bio: 'خبير في تدريس متون النحو الكلاسيكية واللسانيات المقارنة وله مؤلفات عدة في النحو التعليمي.' },
        { name: 'الأستاذ محمود الشافعي', title: 'معلم لغة عربية لغير الناطقين بها', credentials: ['ماجستير تعليم العربية لغير الناطقين بها', 'ليسانس كلية الآداب قسم لغة عربية'], bio: 'متميز في ابتكار الوسائل التفاعلية لتعليم لغة الضاد وتنمية المحادثة الحرة بأساليب حديثة.' }
      ],
      courses: [
        {
          image: '/images/course_arabic.png',
          iconName: 'Languages',
          title: 'النحو والصرف العربي',
          tagline: 'مفتاح فهم الوحيين',
          desc: 'صون اللسان وفهم تركيب الكلام العربي بدراسة الآجرومية وقطر الندى في النحو، ومتن البناء وتصريف الأفعال في علم الصرف.',
          path: 'مسار اللغة العربية',
          stats: { duration: '50 ساعة', syllabus: 'الآجرومية وبناء الأفعال', level: 'تمكيني' }
        },
        {
          image: '/images/course_literature.png',
          iconName: 'Feather',
          title: 'الأدب والبلاغة والبيان',
          tagline: 'جماليات اللسان العربي',
          desc: 'تذوق بلاغة القرآن المعجزة ودراسة المعلقات وروائع الشعر الجاهلي والإسلامي لبناء الملكة الأدبية والأسلوب البياني الراقي.',
          path: 'مسار اللغة العربية',
          stats: { duration: '45 ساعة', syllabus: 'المعلقات وروائع الشعر', level: 'تذوقي' }
        },
        {
          image: '/images/article_grammar.png',
          iconName: 'Award',
          title: 'متن ألفية ابن مالك في النحو والصرّف',
          tagline: 'تاج العلوم اللغوية والنحوية',
          desc: 'شرح ألفية ابن مالك في النحو والصرف وتدريب الطالب على إعراب الشواهد الشعرية والقرآنية المتقدمة لتمكين الملكة اللغوية والتأصيل النحوي.',
          path: 'مسار اللغة العربية',
          stats: { duration: '80 ساعة', syllabus: 'ألفية ابن مالك', level: 'متقدم جداً' }
        },
        {
          image: '/images/course_arabic.png',
          iconName: 'Compass',
          title: 'فقه اللغة وأسرار العربية',
          tagline: 'نشأة اللغات ودلالات الألفاظ',
          desc: 'دراسة خصائص اللغة العربية، ونشأة الألفاظ، والترادف والمشترك اللفظي، ودراسة معجمية متقدمة لتوسيع الفهم الدلالي وبلاغة المفردات.',
          path: 'مسار اللغة العربية',
          stats: { duration: '36 ساعة', syllabus: 'الصاحبي للثعالبي', level: 'متقدم' }
        },
        {
          image: '/images/course_literature.png',
          iconName: 'Layers',
          title: 'علم العروض والقوافي وموسيقى الشعر',
          tagline: 'ميزان الشعر وموسيقى الفصحى',
          desc: 'دراسة البحور الشعرية الستة عشر التي وضعها الخليل بن أحمد، وتدرب الطلاب على التقطيع العروضي وضبط القوافي الشعرية ونظم الأبيات.',
          path: 'مسار اللغة العربية',
          stats: { duration: '30 ساعة', syllabus: 'العروض والخليل', level: 'تمكيني' }
        },
        {
          image: '/images/course_arabic.png',
          iconName: 'BookOpen',
          title: 'الإنشاء والخطابة والكتابة الأدبية',
          tagline: 'صياغة الحجة وبناء الأسلوب',
          desc: 'تدريبات عملية على الكتابة النثرية الأدبية البليغة، صياغة المقالات العلمية، والخطابة وإلقاء الحجج العقلية والخطب البليغة بالفصحى.',
          path: 'مسار اللغة العربية',
          stats: { duration: '32 ساعة', syllabus: 'أدب الكاتب والإنشاء', level: 'تمكيني' }
        }
      ]
    },
    islamic: {
      title: 'العلوم الشرعية الإسلامية وأصول الدين',
      subtitle: 'مسار التفقه المنهجي وفق المذاهب الأربعة المعتمدة',
      desc: 'بناء الوعي الشرعي والمنهجي للطالب المعاصر من خلال دراسة الفقه الإسلامي المذهبي، العقيدة السنية الصافية، السيرة النبوية العطرة، وأصول علوم الحديث والتفسير.',
      levels: [
        { num: '01', title: 'المستوى الأول: فقه العبادات الميسر والعقيدة', desc: 'تصحيح الطهارة، الصلاة، الصيام، الزكاة، والحج وفق مذهب الطالب الفقهي، ودراسة أركان الإيمان وأصول الاعتقاد الصحيحة.' },
        { num: '02', title: 'المستوى الثاني: السيرة النبوية والأخلاق الإسلامية', desc: 'تتبع حياة النبي ﷺ من الولادة إلى الوفاة، وتدارس الشمائل المحمدية وغرس الآداب والأخلاق الإسلامية الرفيعة.' },
        { num: '03', title: 'المستوى الثالث: أصول الفقه وقواعد الاستدلال', desc: 'دراسة كيفية استنباط الأحكام الشرعية من أدلتها التفصيلية (الكتاب، السنة، الإجماع، القياس) وفهم مقاصد الشريعة الإسلامية.' },
        { num: '04', title: 'المستوى الرابع: علوم الحديث الشريف ومصطلحه', desc: 'دراسة كيفية التحقق من الأحاديث النبوية، وفهم تصنيفات الحديث (الصحيح، الحسن، الضعيف) وقواعد الجرح والتعديل.' }
      ],
      books: [
        { title: 'متن أبي شجاع (الغاية والتقريب)', author: 'القاضي أبو شجاع الشافعي', desc: 'المتن المعتمد للمبتدئين في الفقه الشافعي، ويشمل جميع أبواب الفقه بعبارة وجيزة.' },
        { title: 'العقيدة الطحاوية', author: 'الإمام أبو جعفر الطحاوي', desc: 'بيان عقيدة أهل السنة والجماعة المتفق عليها بين أئمة السلف والخلف دون شبهات.' },
        { title: 'الأربعون النووية', author: 'الإمام يحيى بن شرف النووي', desc: 'أربعون حديثاً جوامع من كلم النبي ﷺ تجمع أصول الإسلام وقواعد التشريع والأخلاق.' }
      ],
      outcomes: [
        'معرفة الأحكام الشرعية للعبادات والمعاملات اليومية معرفة مبنية على الأدلة والتقليد المنهجي.',
        'بناء عقلية شرعية متزنة تبتعد عن الغلو والتشدد والتفريط.',
        'فهم السيرة النبوية وتطبيق الهدي النبوي الشريف في الحياة الفردية والاجتماعية.',
        'امتلاك القدرة على قراءة وفهم المتون الشرعية التراثية بأسلوب علمي صحيح.'
      ],
      teachers: [
        { name: 'الدكتور مصطفى النجار', title: 'مدرس الفقه المقارن بجامعة الأزهر الشريف', credentials: ['دكتوراه في الفقه المقارن كلية الشريعة والقانون', 'عضو لجنة الفتوى بالأزهر'], bio: 'عالم فقهي ومفتي متميز بأسلوبه المعاصر في تقريب الفقه المذهبي وحل النوازل المستجدة.' },
        { name: 'الشيخ هشام محمد', title: 'باحث في علم الكلام والعقيدة الإسلامية', credentials: ['ماجستير أصول الدين قسم العقيدة والفلسفة', 'إجازة في تدريس متون العقيدة والتوحيد'], bio: 'شغوف بتبسيط قضايا العقيدة وعلم الكلام ورد الشبهات الفلسفية المعاصرة بمنهجية عقلية رزينة.' }
      ],
      courses: [
        {
          image: '/images/course_fiqh.png',
          iconName: 'Scale',
          title: 'الفقه الإسلامي وتأصيل الأحكام',
          tagline: 'فقه العبادات والمعاملات',
          desc: 'تفقه في الدين على مذهب من المذاهب المعتبرة شرعاً بالتدريج العلمي لتأصيل المسائل الفقهية وتطبيقها الفعلي.',
          path: 'مسار العلوم الشرعية',
          stats: { duration: '48 ساعة', syllabus: 'المتون المعتمدة', level: 'تأصيلي' }
        },
        {
          image: '/images/course_aqidah.png',
          iconName: 'ShieldCheck',
          title: 'العقيدة الإسلامية والتوحيد',
          tagline: 'أصول الدين ورسوخ اليقين',
          desc: 'تأصيل عقيدة أهل السنة والجماعة عبر المتون المعتمدة لبناء حصانة فكرية والرد على الشبهات المعاصرة والتحصين العقدي.',
          path: 'مسار العلوم الشرعية',
          stats: { duration: '36 ساعة', syllabus: 'الجوهرة والنسفية', level: 'تأصيلي' }
        },
        {
          image: '/images/course_usul.png',
          iconName: 'Compass',
          title: 'أصول الفقه وقواعد الاستدلال الفقهي',
          tagline: 'منهجية استنباط الأحكام الشرعية',
          desc: 'دراسة القواعد الأصولية التي تبين كيفية استخراج الفقه من أدلته الإجمالية وفق مناهج المتكلمين والفقهاء لتخريج الفروع وتأصيل الاجتهاد.',
          path: 'مسار العلوم الشرعية',
          stats: { duration: '44 ساعة', syllabus: 'الورقات واللمع في الأصول', level: 'تأصيلي' }
        },
        {
          image: '/images/course_hadith.png',
          iconName: 'Shield',
          title: 'مصطلح الحديث وعلوم الأثر الشريف',
          tagline: 'قواعد قبول ورد المرويات النبوية',
          desc: 'دراسة تصنيف الأحاديث من حيث القبول والرد، وفهم مناهج المحدثين في الجرح والتعديل وتخريج الأسانيد النبوية وصون السنّة من الشبهات.',
          path: 'مسار العلوم الشرعية',
          stats: { duration: '40 ساعة', syllabus: 'نخبة الفكر والأثر', level: 'تأصيلي' }
        },
        {
          image: '/images/course_seerah.png',
          iconName: 'Users',
          title: 'السيرة النبوية والشمائل المحمدية المطهرة',
          tagline: 'حياة المصطفى والشمائل المحمدية',
          desc: 'تتبع سيرة النبي ﷺ من الولادة للوفاة، واستخلاص العبر السياسية والتربوية والجهادية، ودراسة صفاته وشمائله الخَلْقية والخُلُقية لبناء القدوة.',
          path: 'مسار العلوم الشرعية',
          stats: { duration: '32 ساعة', syllabus: 'الرحيق المختوم والشمائل', level: 'تأصيلي' }
        },
        {
          image: '/images/course_logic.png',
          iconName: 'BookOpen',
          title: 'علم المنطق السني وعلم الكلام الأزهري',
          tagline: 'صون الفكر وضبط الاستدلال العقلاني',
          desc: 'دراسة السلم المنورق لتأسيس التفكير السليم، وضبط الاستدلال العقلي والبرهنة، وفهم المصطلحات الأصولية والشروح العلمية للرد على الفلسفات الحديثة.',
          path: 'مسار العلوم الشرعية',
          stats: { duration: '30 ساعة', syllabus: 'السلم المنورق والشروح', level: 'متقدم' }
        }
      ]
    },
    kids: {
      title: 'مسار النشء والشباب لبناء الشخصية الإسلامية',
      subtitle: 'تأسيس متكامل للطفل المسلم المعاصر',
      desc: 'مسار شامل متدرج يهدف لبناء الهوية الإسلامية المعتدلة للطفل والناشئ (من سن 5 إلى 18 سنة)، عبر تعليم القراءة العربية السليمة، حفظ جزء عم وتجويده عملياً، وفهم أصول السلوك والآداب والعبادات اليومية.',
      levels: [
        { num: '01', title: 'المستوى الأول: التأسيس والقراءة السليمة', desc: 'إتقان مخارج الحروف العربية وضبط الحركات ومبادئ التهجي والقراءة الميسرة من المصحف الشريف.' },
        { num: '02', title: 'المستوى الثاني: الحفظ العملي وجزء عم', desc: 'مmemorisation لقصار السور والآيات مع تصحيح أحكام التجويد الأساسية بصورة عملية وتفاعلية.' },
        { num: '03', title: 'المستوى الثالث: العبادات والآداب اليومية', desc: 'التعريب العملي بالوضوء والصلاة، وحفظ أذكار اليوم والليلة، وترسيخ آداب المعاملات وبر الوالدين.' },
        { num: '04', title: 'المستوى الرابع: قصص الأنبياء والتاريخ المبسط', desc: 'دراسة قصص الأنبياء والدروس المستفادة منها لبناء القدوات والأبطال وتأصيل الهوية العقائدية.' }
      ],
      books: [
        { title: 'منهج القاعدة النورانية الميسرة', author: 'الشيخ نور محمد حقاني', desc: 'المنهجية الأقوى والأشهر عالمياً لتأسيس الأطفال على مخارج الحروف الدقيقة والقراءة الصحيحة.' },
        { title: 'كتاب الآداب والعبادات المصور للناشئة', author: 'إدارة التعليم بالأكاديمية', desc: 'شرح مصور تفاعلي ومسابقات ترفيهية لتبسيط الفقه والآداب والسير النبوية للطفل.' },
        { title: 'أطلس قصص الأنبياء المصور للطفل', author: 'أكاديميون أزهريون', desc: 'مجموعة من القصص التاريخية للأنبياء بطريقة تربوية تفاعلية وجذابة تناسب ذهن الطفل.' }
      ],
      outcomes: [
        'قراءة الكلمات والتراكيب القرآنية من المصحف قراءة صحيحة ومستقلة.',
        'حفظ أجزاء من القرآن الكريم (جزء عم بالكامل) مع التجويد والترتيل.',
        'أداء فريضة الصلاة والوضوء أداءً صحيحاً وبانتظام.',
        'تمثل السلوكيات والأخلاق النبيلة مثل الصدق والأمانة وبر الوالدين.'
      ],
      teachers: [
        { name: 'الشيخ أحمد محمود الأزهري', title: 'شيخ مقرأة ومجاز بالقراءات العشر', credentials: ['إجازة متصلة السند بالقراءات العشر الصغرى والكبرى', 'ليسانس علوم القرآن جامعة الأزهر'], bio: 'متخصص في تلقين وضبط التلاوة وتصحيح المخارج للطلاب العرب وغير العرب بخبرة تزيد عن 15 عاماً.' },
        { name: 'الشيخة فاطمة الزهراء', title: 'معلمة قراءات متخصصة للأطفال والنساء', credentials: ['إجازة برواية حفص وورش', 'بكالوريوس التربية الدراسات الإسلامية'], bio: 'تتميز بأسلوب تربوي مبسط لتعليم التجويد العملي وتثبيت الحفظ لفئات النساء والناشئين.' }
      ],
      courses: [
        {
          image: '/images/article_kids.png',
          iconName: 'BookOpen',
          title: 'القاعدة النورانية وتأسيس اللسان',
          tagline: 'خطوتك الأولى لتلاوة فصيحة',
          desc: 'تعليم مخارج الحروف والتهجي الصحيح وتأسيس القراءة والكتابة العربية للأطفال والناشئين باستخدام منهج القاعدة النورانية والتلقي التفاعلي.',
          path: 'مسار النشء والشباب',
          stats: { duration: '24 ساعة', syllabus: 'القاعدة النورانية', level: 'مبتدئ' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'Book',
          title: 'مأموريات التجويد وحفظ القرآن للنشء',
          tagline: 'مذاكرة التجويد وحفظ القرءان',
          desc: 'مراجعة وتثبيت المحفوظ من القرآن الكريم لقصار السور (جزء عم) وتلقين التجويد العملي للأطفال بطرق تفاعلية مبسطة ومحببة لنفوسهم.',
          path: 'مسار النشء والشباب',
          stats: { duration: '32 ساعة', syllabus: 'جزء عم والتجويد الفعلي', level: 'تأسيسي' }
        },
        {
          image: '/images/course_fiqh.png',
          iconName: 'Award',
          title: 'ميكانيكا العبادات والآداب الإسلامية',
          tagline: 'تربية إسلامية عملية',
          desc: 'تدريب عملي للطفل على كيفية الوضوء والصلاة الصحيحة وحفظ الأذكار الأساسية والآداب الإسلامية العامة في البيت والمدرسة والمعاملات.',
          path: 'مسار النشء والشباب',
          stats: { duration: '28 ساعة', syllabus: 'فقه العبادات للطفل والآداب', level: 'تأسيسي' }
        },
        {
          image: '/images/article_kids.png',
          iconName: 'Users',
          title: 'قصص الأنبياء والتاريخ الإسلامي المبسط',
          tagline: 'سير الأنبياء والقصص القرآني الممتع',
          desc: 'تدريس سير الأنبياء من آدم عليه السلام إلى خاتم النبيين ﷺ بأسلوب شيق ومبسط يناسب مدارك الأطفال والناشئين لبناء القدوات والأبطال.',
          path: 'مسار النشء والشباب',
          stats: { duration: '30 ساعة', syllabus: 'قصص الأنبياء والتاريخ', level: 'تأسيسي' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'ShieldCheck',
          title: 'حفظ الأذكار النبوية والأدعية اليومية للطفل',
          tagline: 'حصن الطفل اليومي بالذكر النبوي',
          desc: 'مراجعة وحفظ الأذكار اليومية (أذكار الصباح والمساء، الطعام، النوم، السفر، الاستيقاظ) وتطبيقها في سلوك الطفل اليومي لربطه بالسنة الشريفة.',
          path: 'مسار النشء والشباب',
          stats: { duration: '20 ساعة', syllabus: 'حصن المسلم المصور للطفل', level: 'تأسيسي' }
        },
        {
          image: '/images/course_fiqh.png',
          iconName: 'Award',
          title: 'التربية الأخلاقية والآداب الإسلامية العامة',
          tagline: 'غرس القيم والآداب الإسلامية الراسخة',
          desc: 'غرس القيم الأخلاقية الأساسية (الصدق، الأمانة، بر الوالدين، احترام الكبير، الرحمة بالصغير) وتدريب الطفل على الآداب العامة والمعاملة الحسنة.',
          path: 'مسار النشء والشباب',
          stats: { duration: '24 ساعة', syllabus: 'الآداب والأخلاق والشمائل للطفل', level: 'تربوي' }
        }
      ]
    }
  },
  fr: {
    quran: {
      title: 'Sciences du Saint Coran & Tajwid Académique',
      subtitle: 'Mémorisation & Transmission sous Isnad (Chaîne Connectée)',
      desc: 'Un programme académique d\'élite conçu pour maîtriser la récitation du Coran, corriger la prononciation des lettres et apprendre les règles théoriques et pratiques du Tajwid, menant à l\'obtention de l\'Ijaza avec Isnad lié au Prophète ﷺ par des savants d\'Al-Azhar.',
      levels: [
        { num: '01', title: 'Niveau Préparatoire : Phonétique & Prononciation Exacte', desc: 'Mise au point complète de la prononciation de chaque lettre arabe depuis son point d\'articulation (Makhraj) et correction des voyelles.' },
        { num: '02', title: 'Niveau Intermédiaire : Règles Pratiques du Tajwid', desc: 'Étude théorique et pratique des règles du Noun et Mim Sakina, des prolongations (Moudoud) et des règles d\'arrêt et de reprise (Waqf & Ibtida).' },
        { num: '03', title: 'Niveau Avancé : Mémorisation & Consolidation Structurée', desc: 'Mémorisation progressive du Coran avec un emploi du temps personnalisé, combinant révision intensive de l\'ancien et mémorisation du nouveau.' },
        { num: '04', title: 'Ijaza & Isnad Connecté au Prophète ﷺ', desc: 'Récitation intégrale du Coran de mémoire avec une précision absolue devant un Sheikh certifié pour obtenir l\'Ijaza officielle de transmission.' }
      ],
      books: [
        { title: 'Tuhfat al-Atfal wa al-Ghilman', author: 'Imam Souleymane al-Jamzouri', desc: 'Un poème didactique classique résumant les règles fondamentales du Tajwid de manière simple.' },
        { title: 'Al-Muqaddimah al-Jazariyyah', author: 'Imam Muhammad ibn al-Jazari', desc: 'Le poème fondateur le plus important sur la récitation coranique, destiné aux étudiants avancés.' },
        { title: 'Le Saint Coran selon la récitation de Hafs \'an \'Asim', author: 'Voie de la Shatibiyyah', desc: 'L\'étude approfondie des règles spécifiques à la lecture de Hafs, la plus répandue dans le monde.' }
      ],
      outcomes: [
        'Prononcer toutes les lettres arabes de manière parfaite sans aucun défaut.',
        'Appliquer naturellement les règles de Tajwid lors de la récitation spontanée.',
        'Mémoriser des parties importantes du Coran avec une excellente fluidité.',
        'Comprendre les conditions de l\'Ijaza et l\'histoire de la transmission orale.'
      ],
      teachers: [
        { name: 'Sheikh Ahmad Mahmoud Al-Azhari', title: 'Grand récitateur et enseignant de Qira\'at', credentials: ['Ijaza dans les dix lectures majeures et mineures', 'Licence en sciences du Coran de l\'Université d\'Al-Azhar'], bio: 'Spécialisé dans la correction et la transmission du Coran pour les arabophones et non-arabophones depuis plus de 15 ans.' },
        { name: 'Sheikha Fatima Al-Zahra', title: 'Enseignante de Tajwid pour femmes et enfants', credentials: ['Ijaza de récitation (Hafs et Warsh)', 'Licence en éducation et études islamiques'], bio: 'Reconnue pour sa pédagogie bienveillante facilitant l\'apprentissage des règles de base pour les femmes et les adolescents.' }
      ],
      courses: [
        {
          image: '/images/course_quran.png',
          iconName: 'Award',
          title: 'Coran & Tajwid sous Isnad',
          tagline: 'Fondation & Récitation',
          desc: 'Correction de la récitation et mémorisation du Coran sous les récitations de Hafs et Chou\'bah avec une chaîne de transmission connectée.',
          path: 'Parcours Coran',
          stats: { duration: '40 h', syllabus: 'Deux Récitations', level: 'Base' }
        },
        {
          image: '/images/article_qiraat.png',
          iconName: 'BookOpen',
          title: 'Les Dix Lectures Mutawatir',
          tagline: 'Transmission & Variantes de Lecture',
          desc: 'Étude des fondements des dix lectures du Coran via la Shatibiyyah et la Durrah, et récitation pratique pour l\'obtention de l\'Ijaza.',
          path: 'Parcours Coran',
          stats: { duration: '60 h', syllabus: 'Shatibiyyah & Durrah', level: 'Avancé+' }
        },
        {
          image: '/images/course_shatibiyyah.png',
          iconName: 'Layers',
          title: 'Matn al-Shatibiyyah & al-Durrah',
          tagline: 'Les Règles des 7 & 10 Lectures',
          desc: 'Étude approfondie des célèbres poèmes didactiques pour maîtriser les variantes de récitation et leur application pratique en séance.',
          path: 'Parcours Coran',
          stats: { duration: '50 h', syllabus: 'Shatibiyyah', level: 'Avancé' }
        },
        {
          image: '/images/pillar-manuscript.png',
          iconName: 'Feather',
          title: 'Orthographe Coranique (Rasm Uthmani)',
          tagline: 'Règles d\'Écriture & Tracé Othmanien',
          desc: 'Étude de l\'orthographe officielle du Coran, des signes de vocalisation et de leur impact direct sur la transmission textuelle.',
          path: 'Parcours Coran',
          stats: { duration: '30 h', syllabus: 'Rasm al-Mus-haf', level: 'Fondateur' }
        },
        {
          image: '/images/pillar-study.png',
          iconName: 'Book',
          title: 'Sciences du Coran & Principes d\'Exégèse',
          tagline: 'Méthodologie du Tafsir & Révélation',
          desc: 'Étude du contexte de révélation (Asbab al-Nouzoul), de l\'abrogation (Nasikh/Mansoukh) et des écoles classiques de Tafsir.',
          path: 'Parcours Coran',
          stats: { duration: '40 h', syllabus: 'Sciences du Coran', level: 'Fondateur' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'ShieldCheck',
          title: 'L\'Art du Waqf & Ibtida (Pauses)',
          tagline: 'Préservation du Sens & Récitation Flude',
          desc: 'Étude des règles d\'arrêt et de reprise de la récitation afin de préserver la structure grammaticale et le sens théologique des versets.',
          path: 'Parcours Coran',
          stats: { duration: '24 h', syllabus: 'Règles du Waqf', level: 'Avancé' }
        }
      ]
    },
    arabic: {
      title: 'Linguistique & Langue Arabe Littéraire',
      subtitle: 'Sciences de la Langue : Syntaxe, Morphologie & Rhétorique',
      desc: 'Un parcours d\'études rigoureux pour maîtriser la langue arabe classique ; de l\'apprentissage des bases de l\'écriture et de la grammaire jusqu\'à la rhétorique avancée, la poésie et l\'analyse stylistique du Coran.',
      levels: [
        { num: '01', title: 'Niveau 1 : Alphabétisation & Communication', desc: 'Apprentissage de la lecture, de l\'écriture et des règles de base de la communication quotidienne pour acquérir un premier vocabulaire.' },
        { num: '02', title: 'Niveau 2 : Syntaxe (Nahw) & Déclinaisons', desc: 'Étude de la structure de la phrase nominale et verbale, des déclinaisons (I\'rab) et de l\'application des règles sur les textes.' },
        { num: '03', title: 'Niveau 3 : Morphologie (Sarf) & Structures', desc: 'Compréhension de la racine des mots arabes, de la dérivation des verbes et des noms pour élargir son vocabulaire de manière intuitive.' },
        { num: '04', title: 'Niveau 4 : Rhétorique (Balaghah) & Style littéraire', desc: 'Étude des figures de style, de la sémantique et de la beauté de la prose et de la poésie classique, appliquée au texte coranique.' }
      ],
      books: [
        { title: 'Al-Ajurrumiyyah dans la langue arabe', author: 'Imam Ibn Ajourroum', desc: 'Le manuel classique le plus réputé pour débuter l\'étude de la grammaire et de la syntaxe.' },
        { title: 'Qatr al-Nada wa Ball al-Sada', author: 'Imam Ibn Hisham al-Ansari', desc: 'Un texte de grammaire intermédiaire qui approfondit les règles de syntaxe et les subtilités de la langue.' },
        { title: 'Al-Arabiyyah Bayna Yadayk', author: 'Un panel de linguistes', desc: 'La méthode moderne de référence pour développer l\'écoute, l\'expression orale et écrite.' }
      ],
      outcomes: [
        'S\'exprimer avec fluidité en arabe littéraire sans erreurs de grammaire.',
        'Analyser grammaticalement (I\'rab) des versets et textes littéraires complexes.',
        'Comprendre les processus de dérivation morphologique des mots arabes.',
        'Apprécier la beauté et la subtilité rhétorique (Balaghah) du texte coranique.'
      ],
      teachers: [
        { name: 'Dr. Yasser Abdel Rahman', title: 'Professeur de linguistique à l\'Université d\'Al-Azhar', credentials: ['Doctorat en langue et littérature arabes de l\'Université d\'Al-Azhar', 'Membre de l\'Association de la Langue Arabe'], bio: 'Expert dans l\'enseignement des textes classiques de grammaire et en linguistique comparée.' },
        { name: 'Ustadh Mahmoud Al-Shafi\'i', title: 'Spécialiste de l\'arabe langue étrangère', credentials: ['Master en didactique de l\'arabe pour non-arabophones', 'Licence en littérature arabe'], bio: 'Reconnu pour ses méthodes d\'enseignement interactives favorisant l\'expression orale spontanée.' }
      ],
      courses: [
        {
          image: '/images/course_arabic.png',
          iconName: 'Languages',
          title: 'Syntaxe & Morphologie Arabes',
          tagline: 'Clé des Textes Sacrés',
          desc: 'Maîtrisez les structures de la langue à travers l\'étude de l\'Ajurrumiyyah, du Qatr al-Nada en syntaxe et du manuel al-Bina en morphologie.',
          path: 'Langue Arabe',
          stats: { duration: '50 h', syllabus: 'Ajurrumiyyah & Conjugaison', level: 'Intermédiaire' }
        },
        {
          image: '/images/course_literature.png',
          iconName: 'Feather',
          title: 'Littérature, Rhétorique & Éloquence',
          tagline: 'Esthétique de la Langue',
          desc: 'Découvrez la rhétorique coranique, étudiez les grands poèmes préislamiques (Mu\'allaqat) et apprenez à apprécier le style classique.',
          path: 'Langue Arabe',
          stats: { duration: '45 h', syllabus: 'Rhabillage & Poésie', level: 'Esthétique' }
        },
        {
          image: '/images/article_grammar.png',
          iconName: 'Award',
          title: 'L\'Alfiyyah d\'Ibn Malik',
          tagline: 'Le Sommet de la Syntaxe Arabe',
          desc: 'Étude approfondie du célèbre poème de 1000 vers résumant les règles de grammaire et de morphologie pour les étudiants avancés.',
          path: 'Langue Arabe',
          stats: { duration: '80 h', syllabus: 'Alfiyyah d\'Ibn Malik', level: 'Avancé+' }
        },
        {
          image: '/images/course_arabic.png',
          iconName: 'Compass',
          title: 'Philologie Arabe & Sémantique',
          tagline: 'Origine de la Langue & Lexicologie',
          desc: 'Étude des caractéristiques uniques de la langue arabe, de la formation des mots, des synonymes et de l\'histoire des grands dictionnaires.',
          path: 'Langue Arabe',
          stats: { duration: '36 h', syllabus: 'As-Sahibi de Tha\'alibi', level: 'Avancé' }
        },
        {
          image: '/images/course_literature.png',
          iconName: 'Layers',
          title: 'Métrique (Arud) & Poésie Classique',
          tagline: 'Rythme & Musique du Vers Arabe',
          desc: 'Étude des 16 mètres poétiques arabes établis par Al-Khalil ibn Ahmad, et pratique de la scansion et des règles de rimes.',
          path: 'Langue Arabe',
          stats: { duration: '30 h', syllabus: 'Métrique d\'Al-Khalil', level: 'Avancé' }
        },
        {
          image: '/images/course_arabic.png',
          iconName: 'BookOpen',
          title: 'Rédaction Littéraire & Art Oratoire',
          tagline: 'Composition Éloquente & Rhétorique',
          desc: 'Exercices pratiques d\'écriture littéraire en prose, de rédaction d\'essais académiques et d\'art oratoire en arabe littéraire.',
          path: 'Langue Arabe',
          stats: { duration: '32 h', syllabus: 'Adab al-Katib', level: 'Intermédiaire' }
        }
      ]
    },
    islamic: {
      title: 'Sciences de la Shariah & Théologie Islamique',
      subtitle: 'Étude Méthodologique selon les Écoles Orthodoxes',
      desc: 'Un programme conçu pour construire une compréhension solide et équilibrée de l\'islam à travers l\'étude de la jurisprudence (Fiqh), du dogme (\'Aqidah sunnite), de la vie du Prophète (Seerah) et des principes du Hadith.',
      levels: [
        { num: '01', title: 'Niveau 1 : Jurisprudence Pratique & Fondements', desc: 'Maîtrise des règles de la purification, de la prière, du jeûne et de la Zakat selon l\'école de jurisprudence choisie.' },
        { num: '02', title: 'Niveau 2 : Vie du Prophète (Seerah) & Éthique', desc: 'Étude chronologique de la vie du Prophète ﷺ, de ses caractères nobles (Shama\'il) et de l\'éthique musulmane au quotidien.' },
        { num: '03', title: 'Niveau 3 : Principes du Droit (Usul al-Fiqh)', desc: 'Apprentissage de la méthodologie de déduction des lois et des règles d\'interprétation des textes législatifs (Coran, Sunnah).' },
        { num: '04', title: 'Niveau 4 : Sciences du Hadith & Terminologie', desc: 'Étude de la méthode scientifique de transmission des paroles prophétiques et des critères d\'authenticité des récits.' }
      ],
      books: [
        { title: 'Le Matn d\'Abou Chouja\' dans le Fiqh', author: 'Cadi Abou Chouja\'', desc: 'Le texte classique de référence pour l\'apprentissage de la jurisprudence selon l\'école shafi\'ite.' },
        { title: 'La \'Aqidah Tahawiyyah', author: 'Imam Abou Ja\'far al-Tahawi', desc: 'L\'exposé le plus célèbre de la croyance sunnite consensuelle, exempt de déviations.' },
        { title: 'Les Quarante Hadiths d\'Al-Nawawi', author: 'Imam Yahya al-Nawawi', desc: 'Une sélection de 42 hadiths fondamentaux résumant les principes moraux et légaux de l\'islam.' }
      ],
      outcomes: [
        'Pratiquer les rites de culte quotidiens sur des bases juridiques claires.',
        'Comprendre les fondements du dogme musulman sunnite traditionnel.',
        'Analyser la vie du Prophète et appliquer son modèle de comportement dans sa vie.',
        'Lire et comprendre les textes classiques du patrimoine islamique avec méthode.'
      ],
      teachers: [
        { name: 'Dr. Moustafa Al-Najjar', title: 'Professeur de droit comparé à Al-Azhar', credentials: ['Doctorat en droit comparé de la Faculté de Shariah et de Droit', 'Membre du comité de Fatwa d\'Al-Azhar'], bio: 'Reconnu pour sa pédagogie claire reliant les concepts juridiques classiques aux problématiques contemporaines.' },
        { name: 'Sheikh Hisham Muhammad', title: 'Chercheur en théologie et dogme sunnite', credentials: ['Master en théologie et philosophie islamiques', 'Ijaza pour l\'enseignement des textes de croyance'], bio: 'Passionné par la simplification des concepts théologiques et la réponse méthodique aux courants de pensée modernes.' }
      ],
      courses: [
        {
          image: '/images/course_fiqh.png',
          iconName: 'Scale',
          title: 'Jurisprudence Islamique (Fiqh)',
          tagline: 'Adoration & Transactions',
          desc: 'Étudiez la jurisprudence islamique selon l\'une des écoles reconnues à travers les manuels classiques de référence.',
          path: 'Sciences Islamiques',
          stats: { duration: '48 h', syllabus: 'Manuels Agréés', level: 'Fondations' }
        },
        {
          image: '/images/course_aqidah.png',
          iconName: 'ShieldCheck',
          title: 'Dogme Sunnite & Théologie',
          tagline: 'Croyance & Conviction Ferme',
          desc: 'Assimilez la théologie sunnite traditionnelle à travers les textes classiques pour solidifier votre foi.',
          path: 'Sciences Islamiques',
          stats: { duration: '36 h', syllabus: 'Jawharah & An-Nasafiyyah', level: 'Fondations' }
        },
        {
          image: '/images/course_usul.png',
          iconName: 'Compass',
          title: 'Principes de Jurisprudence (Usul al-Fiqh)',
          tagline: 'Méthodologie de Déduction des Lois',
          desc: 'Étude des fondements méthodologiques de l\'extraction des règles de droit depuis leurs sources originelles (Coran, Sunnah, Consensus, Analogie).',
          path: 'Sciences Islamiques',
          stats: { duration: '44 h', syllabus: 'Les Waraqat de Jouwayni', level: 'Théorique' }
        },
        {
          image: '/images/course_hadith.png',
          iconName: 'Shield',
          title: 'Sciences & Terminologie du Hadith',
          tagline: 'Règles de Critique des Récits',
          desc: 'Étude des critères de classification des hadiths, de la fiabilité des rapporteurs et de l\'histoire de la codification de la Sunnah.',
          path: 'Sciences Islamiques',
          stats: { duration: '40 h', syllabus: 'Nukhbat al-Fikar d\'Ibn Hajar', level: 'Théorique' }
        },
        {
          image: '/images/course_seerah.png',
          iconName: 'Users',
          title: 'Vie du Prophète & Nobles Caractères',
          tagline: 'Seerah & Shama\'il al-Muhammadiyyah',
          desc: 'Étude chronologique de la vie du Prophète ﷺ, de sa gouvernance, et de ses descriptions physiques et morales (Shama\'il).',
          path: 'Sciences Islamiques',
          stats: { duration: '32 h', syllabus: 'Le Nectar Cacheté & Shama\'il', level: 'Histoire' }
        },
        {
          image: '/images/course_logic.png',
          iconName: 'BookOpen',
          title: 'Théologie & Logique Sunnite',
          tagline: 'Raisonnement & Argumentation Rationnelle',
          desc: 'Étude du Sullam al-Munawraq pour structurer la pensée logique, construire des démonstrations et réfuter les doutes théologiques.',
          path: 'Sciences Islamiques',
          stats: { duration: '30 h', syllabus: 'Sullam al-Munawraq', level: 'Avancé' }
        }
      ]
    },
    kids: {
      title: 'Parcours Jeunesse : Éducation & Valeurs Islamiques',
      subtitle: 'Former le Caractère & Mémoriser le Coran',
      desc: 'Un cursus complet adapté aux enfants et adolescents (de 5 à 18 ans) pour acquérir une lecture fluide du Coran, mémoriser des sourates avec Tajwid, apprendre la prière et cultiver les vertus de l\'islam.',
      levels: [
        { num: '01', title: 'Niveau 1 : Lecture Correcte & Phonétique', desc: 'Maîtrise des lettres, de la prononciation et des règles de lecture directe du Coran grâce à la Qaida Nuraniyyah.' },
        { num: '02', title: 'Niveau 2 : Mémorisation Pratique & Tajwid', desc: 'Mémorisation du Juz Amma avec application interactive des règles de base pour une belle récitation.' },
        { num: '03', title: 'Niveau 3 : Pratique du Culte & Bon Comportement', desc: 'Apprentissage concret des ablutions, de la prière, des invocations du quotidien et des règles de politesse (Adab).' },
        { num: '04', title: 'Niveau 4 : Histoires du Coran & Modèles de Vie', desc: 'Découverte des histoires des Prophètes et de la vie des Compagnons pour s\'inspirer de leurs nobles valeurs.' }
      ],
      books: [
        { title: 'La Méthode Qaida Nuraniyyah Maternelle', author: 'Sheikh Nour Muhammad Haqqani', desc: 'La méthode de référence universelle pour former l\'appareil phonétique des enfants à la lecture du Coran.' },
        { title: 'Le Guide Illustré des Bonnes Manières', author: 'Éditions Éducatives d\'Al-Azhar', desc: 'Un support visuel coloré expliquant les règles de politesse, le comportement et la prière de façon ludique.' },
        { title: 'Les Plus Belles Histoires des Prophètes', author: 'Comité Éducatif de l\'Académie', desc: 'Recueil de récits adaptés reliant les vies des Prophètes à des leçons éthiques pratiques et quotidiennes.' }
      ],
      outcomes: [
        'Lire des versets directement dans le Coran de manière autonome.',
        'Mémoriser le Juz Amma complet avec une récitation rythmée et correcte.',
        'Accomplir de façon autonome et correcte les prières quotidiennes.',
        'Adopter des comportements moraux nobles (respect, honnêteté, politesse).'
      ],
      teachers: [
        { name: 'Ustadh Muhammad Dawood', title: 'Éducateur spécialisé en sciences du Coran', credentials: ['Diplôme en psychologie de l\'enfant', 'Licence en sciences de l\'éducation d\'Al-Azhar'], bio: 'Expert dans la mise en place d\'activités d\'apprentissage ludiques qui captivent et motivent les jeunes élèves.' },
        { name: 'Ustadha Shaimaa Al-Hawari', title: 'Enseignante de Coran pour jeunes enfants', credentials: ['Ijaza de mémorisation du Coran', 'Licence en éducation de la petite enfance'], bio: 'Spécialisée dans la mémorisation pour jeunes enfants en utilisant le jeu et les contes éducatifs.' }
      ],
      courses: [
        {
          image: '/images/article_kids.png',
          iconName: 'BookOpen',
          title: 'Qaida Nuraniyyah & Éveil à la Lecture',
          tagline: 'Premiers Pas vers la Récitation',
          desc: 'Apprentissage des points d\'articulation des lettres, de l\'écriture et de la lecture fluide du Coran grâce à la méthode Qaida Nuraniyyah.',
          path: 'Parcours Jeunesse',
          stats: { duration: '24 h', syllabus: 'Qaida Nuraniyyah', level: 'Débutant' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'Book',
          title: 'Mémorisation du Juz Amma pour Jeunes',
          tagline: 'Mémorisation & Rythme Correct',
          desc: 'Mémorisation des sourates courtes du Coran avec correction directe de la prononciation et respect du Tajwid de manière interactive.',
          path: 'Parcours Jeunesse',
          stats: { duration: '32 h', syllabus: 'Juz Amma & Récitation', level: 'Fondations' }
        },
        {
          image: '/images/course_fiqh.png',
          iconName: 'Award',
          title: 'Ablutions, Prière & Adab Pratique',
          tagline: 'Éducation Religieuse & Culte',
          desc: 'Apprentissage pratique de la purification, de la prière, des invocations indispensables et des règles de comportement avec l\'entourage.',
          path: 'Parcours Jeunesse',
          stats: { duration: '28 h', syllabus: 'Fiqh pour Enfants', level: 'Fondations' }
        },
        {
          image: '/images/article_kids.png',
          iconName: 'Users',
          title: 'Histoires des Prophètes & Histoires du Coran',
          tagline: 'Récits Inspirants & Leçons Morales',
          desc: 'Découverte de la vie des messagers d\'Allah, d\'Adam à Muhammad ﷺ, racontée de manière captivante pour former des modèles de vertu.',
          path: 'Parcours Jeunesse',
          stats: { duration: '30 h', syllabus: 'Histoires des Prophètes', level: 'Fondations' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'ShieldCheck',
          title: 'Invocations & Adhkar pour le Quotidien',
          tagline: 'Rappel Quotidien & Spiritualité',
          desc: 'Mémorisation et pratique des invocations journalières (matin, soir, sommeil, repas, voyages) pour intégrer la présence divine au quotidien.',
          path: 'Parcours Jeunesse',
          stats: { duration: '20 h', syllabus: 'Invocations Illustrées', level: 'Fondations' }
        },
        {
          image: '/images/course_fiqh.png',
          iconName: 'Award',
          title: 'Éducation Morale & Nobles Vertus',
          tagline: 'Développement du Caractère Musulman',
          desc: 'Génération de comportements moraux (honnêteté, générosité, respect des parents, entraide) à travers des ateliers interactifs basés sur les textes.',
          path: 'Parcours Jeunesse',
          stats: { duration: '24 h', syllabus: 'Noble Caractère & Adab', level: 'Éducatif' }
        }
      ]
    }
  },
  en: {
    quran: {
      title: 'Saint Quranic Sciences & Academic Tajweed',
      subtitle: 'Consolidation, Mémorisation & Ijaza with Isnad',
      desc: 'A comprehensive academic track designed to refine letter pronunciation, correct common mistakes, and study theoretical and practical rules of Tajweed, culminating in receiving an authorized Ijaza with Isnad back to the Prophet ﷺ from graduate scholars of Al-Azhar.',
      levels: [
        { num: '01', title: 'Preparatory Level: Articulation Points & Correction', desc: 'Focusing on the correct extraction of each Arabic letter (Makhraj), letters\' attributes, and the rules of the seven vowels.' },
        { num: '02', title: 'Intermediate Level: Applied Tajweed Rulings', desc: 'Theoretical and practical study of the rules of Noon and Meem Sakinah, Mudood (prolongations), and the rules of stopping and starting.' },
        { num: '03', title: 'Advanced Level: Systematic Memorization & Hifdh', desc: 'Memorizing the Quran according to a customized timetable tailored to the student\'s memory capacity, with structured revision loops.' },
        { num: '04', title: 'Ijaza & Connected Chain of Transmission (Isnad)', desc: 'Reciting the entire Quran from memory with absolute precision and mastery before a certified Sheikh to receive the authorized Ijaza.' }
      ],
      books: [
        { title: 'Tuhfat al-Atfal in Tajweed rules', author: 'Imam Sulayman al-Jamzouri', desc: 'A popular and concise poetry manual summarizing the fundamental rules of Tajweed.' },
        { title: 'Al-Muqaddimah al-Jazariyyah', author: 'Imam Muhammad bin al-Jazari', desc: 'The most authoritative classical poem on Tajweed and articulation points for advanced students.' },
        { title: 'The Holy Quran narrated by Hafs from \'Asim', author: 'Way of Shatibiyyah', desc: 'The study and practical application of the most widely accepted recitation method and its structural details.' }
      ],
      outcomes: [
        'Pronounce all Arabic letters from their exact points of articulation without errors.',
        'Spontaneously apply Tajweed rules during recitation without artificial effort.',
        'Memorize select portions of the Quran with solid connection and speed.',
        'Understand the conditions of Ijaza and the historical chains of recitation.'
      ],
      teachers: [
        { name: 'Sheikh Ahmad Mahmoud Al-Azhari', title: 'Head of Recitation & Multi-Qira\'at Instructor', credentials: ['Authorized Isnad in the Ten Minor and Major Recitations', 'Bachelor of Quranic Sciences from Al-Azhar University'], bio: 'Specializes in precise oral recitation correction and Isnad certification for both Arab and non-Arab students for over 15 years.' },
        { name: 'Sheikha Fatima Al-Zahra', title: 'Qira\'at Instructor for Women and Children', credentials: ['Ijaza in Hafs and Warsh recitations', 'Bachelor of Islamic Studies and Education'], bio: 'Known for her patient, child-friendly teaching approach to consolidate memorization and correct Tajweed.' }
      ],
      courses: [
        {
          image: '/images/course_quran.png',
          iconName: 'Award',
          title: 'Quran & Tajweed under Isnad',
          tagline: 'The Ultimate Foundation',
          desc: 'Master Quran recitation and memorization under connected chains (Isnad) using theoretical rules and practical application of Tajweed.',
          path: 'Quranic Path',
          stats: { duration: '40 Hrs', syllabus: '2 Recitations', level: 'Core' }
        },
        {
          image: '/images/article_qiraat.png',
          iconName: 'BookOpen',
          title: 'Ten Mutawatir Recitations (Qira\'at)',
          tagline: 'Isnad & Advanced Récital Variations',
          desc: 'Study the rules of the ten mutawatir recitations from the Shatibiyyah and Durrah pathways, with practical compilation (Jam\') methods.',
          path: 'Quranic Path',
          stats: { duration: '60 Hrs', syllabus: 'Shatibiyyah & Durrah', level: 'Advanced+' }
        },
        {
          image: '/images/course_shatibiyyah.png',
          iconName: 'Layers',
          title: 'Matn al-Shatibiyyah & al-Durrah',
          tagline: 'Advanced Qira\'at Systems',
          desc: 'In-depth study of the Shatibiyyah and Durrah poems to master the systems and rules of the 7 and 10 recitations in practice.',
          path: 'Quranic Path',
          stats: { duration: '50 Hrs', syllabus: 'Shatibiyyah', level: 'Advanced' }
        },
        {
          image: '/images/pillar-manuscript.png',
          iconName: 'Feather',
          title: 'Quranic Orthography & Writing Rules',
          tagline: 'Uthmanic Script & Vocalization',
          desc: 'A comprehensive study of the orthography of the Uthmanic codex, historical vocalization, and its relation to oral transmission.',
          path: 'Quranic Path',
          stats: { duration: '30 Hrs', syllabus: 'Rasm al-Mus-haf', level: 'Core' }
        },
        {
          image: '/images/pillar-study.png',
          iconName: 'Book',
          title: 'Quranic Sciences & Tafsir Principles',
          tagline: 'Hermeneutics & Context of Revelation',
          desc: 'Study of the reasons for revelation, Meccan vs Medinan chapters, abrogation, compilation history, and classical exegesis methods.',
          path: 'Quranic Path',
          stats: { duration: '40 Hrs', syllabus: 'Sciences of Quran', level: 'Core' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'ShieldCheck',
          title: 'The Science of Waqf & Ibtida (Pauses)',
          tagline: 'Preserving Meaning in Recitation',
          desc: 'Master the rules of pauses and starts during recitation to maintain grammatical and theological structures of the verses.',
          path: 'Quranic Path',
          stats: { duration: '24 Hrs', syllabus: 'Rules of Waqf', level: 'Advanced' }
        }
      ]
    },
    arabic: {
      title: 'Linguistics & Classical Arabic Language',
      subtitle: 'Grammar, Morphology, Rhetoric & Literature',
      desc: 'A structured, academic pathway to master the classical Arabic tongue (Fusha) ; covering grammar (Nahw), morphology (Sarf), eloquent rhetoric (Balaghah), and classical poetry and prose.',
      levels: [
        { num: '01', title: 'Level 1: Foundational Arabic & Conversation', desc: 'Building basic vocabulary, listening skills, writing Arabic letters, and engaging in simple daily dialogues.' },
        { num: '02', title: 'Level 2: Arabic Syntax & Parsing (I\'rab)', desc: 'Studying the nominal and verbal sentence, noun declensions, grammatical signs, and parsing rules in texts.' },
        { num: '03', title: 'Level 3: Morphology (Sarf) & Word Derivation', desc: 'Understanding word formulas, verb paradigms, scales, derivatives, and root structures to expand vocabulary.' },
        { num: '04', title: 'Level 4: Rhetoric (Balaghah) & Eloquence', desc: 'Studying figures of speech, semantics, and literary tropes to understand the miraculous style of the Quran.' }
      ],
      books: [
        { title: 'Al-Ajurrumiyyah in Arabic grammar', author: 'Imam Ibn Ajurrum', desc: 'The most popular foundational textbook on Arabic syntax and parsing rules.' },
        { title: 'Qatr al-Nada (Dewdrop & Wetness)', author: 'Imam Ibn Hisham al-Ansari', desc: 'An intermediate grammar manual that delves deeper into syntax and grammatical anomalies.' },
        { title: 'Al-Arabiyyah Bayna Yadayk', author: 'A board of leading linguists', desc: 'The strongest contemporary curriculum for non-native speakers to master the four language skills.' }
      ],
      outcomes: [
        'Speak classical Arabic (Fusha) with confidence without major grammatical errors.',
        'Parse complex sentences in the Quran and classical literature with accuracy.',
        'Analyze word derivations and morphology scales of verbs and nouns.',
        'Appreciate the eloquent rhetoric (Balaghah) and literary structures in the Quran.'
      ],
      teachers: [
        { name: 'Dr. Yasser Abdel Rahman', title: 'Professor of Arabic Linguistics at Al-Azhar', credentials: ['PhD in Arabic Language and Literature from Al-Azhar University', 'Member of the Arabic Language Association'], bio: 'An expert in teaching classical grammar manuals, comparative Semitic linguistics, and educational parsing.' },
        { name: 'Ustadh Mahmoud Al-Shafi\'i', title: 'Arabic for Non-Native Speakers Specialist', credentials: ['Master\'s in teaching Arabic as a foreign language', 'Bachelor\'s in Arabic Language and Literature'], bio: 'Specializes in creating interactive conversation-based learning systems to accelerate student speaking fluency.' }
      ],
      courses: [
        {
          image: '/images/course_arabic.png',
          iconName: 'Languages',
          title: 'Arabic Grammar & Morphology',
          tagline: 'Key to the Sacred Texts',
          desc: 'Protect your tongue from errors and decode Arabic script by studying Al-Ajurrumiyyah and Qatr al-Nada (Syntax) and Matn al-Bina (Morphology).',
          path: 'Classical Arabic Path',
          stats: { duration: '50 Hrs', syllabus: 'Ajurrumiyyah & Conjugation', level: 'Essential' }
        },
        {
          image: '/images/course_literature.png',
          iconName: 'Feather',
          title: 'Literature, Rhetoric & Eloquence',
          tagline: 'Esthetics of Classical Arabic',
          desc: 'Appreciate the miraculous eloquence (Balaghah) of the Quran, pre-Islamic poetry, and classical prose to refine your literary taste.',
          path: 'Classical Arabic Path',
          stats: { duration: '45 Hrs', syllabus: 'Rhetoric & Odes', level: 'Literary' }
        },
        {
          image: '/images/article_grammar.png',
          iconName: 'Award',
          title: 'Ibn Malik\'s Alfiyyah in Grammar',
          tagline: 'The Pinnacle of Arabic Grammar',
          desc: 'In-depth study of the legendary 1,000-line poem on syntax and morphology, training students to parse advanced Arabic structures.',
          path: 'Classical Arabic Path',
          stats: { duration: '80 Hrs', syllabus: 'Alfiyyah', level: 'Expert' }
        },
        {
          image: '/images/course_arabic.png',
          iconName: 'Compass',
          title: 'Arabic Philology & Semantics',
          tagline: 'Word Origins & Dictionaries',
          desc: 'Exploring the origins of Arabic, its unique semantic roots, word derivations, synonyms, and classical lexicology.',
          path: 'Classical Arabic Path',
          stats: { duration: '36 Hrs', syllabus: 'As-Sahibi by Tha\'alibi', level: 'Advanced' }
        },
        {
          image: '/images/course_literature.png',
          iconName: 'Layers',
          title: 'Arabic Metrics (Arud) & Poetics',
          tagline: 'Rhythms & Music of Classical Poetry',
          desc: 'Study of the 16 classical Arabic poetic meters established by Al-Khalil bin Ahmad, including practical scanning and rhyme rules.',
          path: 'Classical Arabic Path',
          stats: { duration: '30 Hrs', syllabus: 'Arud (Metrics)', level: 'Advanced' }
        },
        {
          image: '/images/course_arabic.png',
          iconName: 'BookOpen',
          title: 'Eloquent Prose & Creative Writing',
          tagline: 'Prose Composition & Rhetoric',
          desc: 'Practical training in composing eloquent Arabic prose, academic essays, and mastering classical public speaking and arguments.',
          path: 'Classical Arabic Path',
          stats: { duration: '32 Hrs', syllabus: 'Adab al-Katib', level: 'Core' }
        }
      ]
    },
    islamic: {
      title: 'Islamic Shariah Studies & Creed (Usul)',
      subtitle: 'Methodological Study According to the 4 Orthodox Schools',
      desc: 'Building a balanced and deep Shariah knowledge for the contemporary student by studying Islamic jurisprudence (Fiqh), creed (Aqidah), Prophetic biography (Seerah), and sciences of Hadith.',
      levels: [
        { num: '01', title: 'Level 1: Essential Fiqh of Worship & Creed', desc: 'Learning purification, prayer, fasting, zakat, and Hajj according to the student\'s chosen school, and core pillars of faith.' },
        { num: '02', title: 'Level 2: Prophetic Seerah & Islamic Etiquette', desc: 'Tracing the biography of the Prophet ﷺ from birth to death, studying his noble qualities, and moral character.' },
        { num: '03', title: 'Level 3: Principles of Jurisprudence (Usul)', desc: 'Learning the rules of legal deduction and how to extract legal rulings from primary texts (Quran, Sunnah).' },
        { num: '04', title: 'Level 4: Hadith Methodology & Classification', desc: 'Understanding validation of texts, chains of narration, compiler conditions, and rules of authenticity.' }
      ],
      books: [
        { title: 'Matn Abi Shuja\' in Shafi\'i Fiqh', author: 'Judge Abu Shuja\' al-Shafi\'i', desc: 'The authorized primer for beginners in Shafi\'i jurisprudence covering legal chapters.' },
        { title: 'Al-Aqidah al-Tahawiyyah', author: 'Imam Abu Ja\'far al-Tahawi', desc: 'The most consensus-based statement of Sunni theology agreed upon by classical scholars.' },
        { title: 'Al-Arba\'oon al-Nawawiyyah', author: 'Imam Yahya al-Nawawi', desc: 'A collection of 42 pivotal Hadiths encompassing core ethical, legal, and spiritual rules of Islam.' }
      ],
      outcomes: [
        'Perform all daily worship rituals according to structured, verified legal rulings.',
        'Understand the authentic creed of Sunni Islam and defend against misconceptions.',
        'Apply lessons from the Prophetic Seerah to personal character and societal morals.',
        'Read and understand classical Shariah literature using traditional keys.'
      ],
      teachers: [
        { name: 'Dr. Mostafa Al-Najjar', title: 'Comparative Fiqh Professor at Al-Azhar', credentials: ['PhD in Comparative Fiqh from Faculty of Shariah and Law', 'Member of Al-Azhar Fatwa Committee'], bio: 'A specialist in presenting traditional jurisprudential systems in relation to modern socio-legal issues.' },
        { name: 'Sheikh Hisham Muhammad', title: 'Theology and Sunni Creed Researcher', credentials: ['Master\'s in Islamic Creed and Philosophy', 'Ijaza in teaching classical Aqidah texts'], bio: 'Dedicated to teaching creed using both textual evidences and rational logic to address modern doubts.' }
      ],
      courses: [
        {
          image: '/images/course_fiqh.png',
          iconName: 'Scale',
          title: 'Islamic Jurisprudence (Fiqh)',
          tagline: 'Worship & Transactions',
          desc: 'Acquire Islamic jurisprudence systematically according to one of the recognized schools of thought through primary manuals.',
          path: 'Shariah Path',
          stats: { duration: '48 Hrs', syllabus: 'Accredited Manuals', level: 'Academic' }
        },
        {
          image: '/images/course_aqidah.png',
          iconName: 'ShieldCheck',
          title: 'Islamic Creed (Aqidah)',
          tagline: 'Theology & Core Convictions',
          desc: 'Study authentic Sunni creed via classical texts to build sound conviction and address modern philosophy.',
          path: 'Shariah Path',
          stats: { duration: '36 Hrs', syllabus: 'Jawharah & Nasafiyyah', level: 'Theological' }
        },
        {
          image: '/images/course_usul.png',
          iconName: 'Compass',
          title: 'Principles of Jurisprudence (Usul al-Fiqh)',
          tagline: 'Legal Methodology & Deduction',
          desc: 'Rigorous study of legal methodology and the rules governing how rulings are extracted from primary texts (e.g. Al-Waraqat).',
          path: 'Shariah Path',
          stats: { duration: '44 Hrs', syllabus: 'Al-Waraqat & Al-Luma\'', level: 'Academic' }
        },
        {
          image: '/images/course_hadith.png',
          iconName: 'Shield',
          title: 'Hadith Sciences & Terminology',
          tagline: 'Rules of Narration Critique',
          desc: 'Critical study of hadith classification, chains of narrators (Isnad), grading standards, narrator reliability, and textual critique.',
          path: 'Shariah Path',
          stats: { duration: '40 Hrs', syllabus: 'Nukhbat al-Fikar', level: 'Core' }
        },
        {
          image: '/images/course_seerah.png',
          iconName: 'Users',
          title: 'Seerah & Prophetic Noble Qualities',
          tagline: 'Prophetic Biography & Shama\'il',
          desc: 'Detailed study of the Prophet\'s life, political and social wisdom, and his physical and moral descriptions (Shama\'il).',
          path: 'Shariah Path',
          stats: { duration: '32 Hrs', syllabus: 'Seerah & Shama\'il', level: 'Core' }
        },
        {
          image: '/images/course_logic.png',
          iconName: 'BookOpen',
          title: 'Sunni Logic (Mantiq) & Theology',
          tagline: 'Reasoning & Scholarly Argumentation',
          desc: 'Study Al-Sullam al-Munawraq to cultivate critical reasoning, sound arguments, and understand structural definitions in scholarly literature.',
          path: 'Shariah Path',
          stats: { duration: '30 Hrs', syllabus: 'Munawraq', level: 'Advanced' }
        }
      ]
    },
    kids: {
      title: 'Youth & Kids Path of Islamic Identity',
      subtitle: 'Building Character & Memorizing Quran',
      desc: 'A comprehensive, age-appropriate path for children and youth (ages 5 to 18) to read the Quran fluently, memorize Juz Amma with Tajweed, learn worship mechanics, and acquire Islamic manners.',
      levels: [
        { num: '01', title: 'Level 1: Fluent Reading & Pronunciation', desc: 'Learning Arabic letters, pronunciation, and spelling to read Quran directly using the Qaida Nuraniyyah method.' },
        { num: '02', title: 'Level 2: Quran Memorization & Tajweed', desc: 'Memorizing Juz Amma with interactive correct pronunciation and basic Tajweed rules.' },
        { num: '03', title: 'Level 3: Worship Mechanics & Daily Adhab', desc: 'Practical training in Wudu, Salah, daily supplications, and essential morals like honesty and respect.' },
        { num: '04', title: 'Level 4: Stories of Prophets & Moral Models', desc: 'Exploring biographies of Prophets and Companions to build a strong Islamic identity.' }
      ],
      books: [
        { title: 'The phonetic Qaida Nuraniyyah method', author: 'Sheikh Nur Muhammad Haqqani', desc: 'The most universally recognized method to train children on accurate Quranic articulation.' },
        { title: 'Illustrated Book of Manners & Worship', author: 'Academy Academic Board', desc: 'An engaging, illustrated visual guide and quizzes to teach Fiqh and Adab to children.' },
        { title: 'Stories of the Prophets for Muslim Kids', author: 'Azhari Educators', desc: 'A collection of stories explaining the lives of Prophets in a simplified and moral way.' }
      ],
      outcomes: [
        'Read words and full sentences directly from the Quran independently.',
        'Memorize the entire Juz Amma with rhythmic and correct recitation.',
        'Perform daily prayers and ablutions correctly and independently.',
        'Demonstrate core Islamic ethics (truthfulness, respecting parents, kindness).'
      ],
      teachers: [
        { name: 'Ustadh Muhammad Dawood', title: 'Youth Educator & Quran Instructor', credentials: ['Diploma in Child Psychology', 'Bachelor\'s of Education from Al-Azhar'], bio: 'Specializes in game-based, interactive learning methods that inspire children to love the Quran.' },
        { name: 'Ustadha Shaimaa Al-Hawari', title: 'Early Childhood Quran Teacher', credentials: ['Ijaza in Quranic Memorization', 'Bachelor\'s in Early Childhood Education'], bio: 'Expert in teaching Quran to young children using visual storytelling and memory exercises.' }
      ],
      courses: [
        {
          image: '/images/article_kids.png',
          iconName: 'BookOpen',
          title: 'Qaida Nuraniyyah & Reading Basics',
          tagline: 'Your First Step to Eloquent Reading',
          desc: 'Learn letters, correct points of articulation, and fluent Quran spelling using the Qaida Nuraniyyah methodology.',
          path: 'Youth Path',
          stats: { duration: '24 Hrs', syllabus: 'Qaida Nuraniyyah', level: 'Beginner' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'Book',
          title: 'Juz Amma Memorization & Tajweed',
          tagline: 'Quran Memorization for Kids',
          desc: 'Memorize and perfect short chapters of the Quran (Juz Amma) with basic practical Tajweed and consolidation loops.',
          path: 'Youth Path',
          stats: { duration: '32 Hrs', syllabus: 'Juz Amma & Recitation', level: 'Core' }
        },
        {
          image: '/images/course_fiqh.png',
          iconName: 'Award',
          title: 'Salah, Wudu & Practical Daily Adab',
          tagline: 'Practical Islamic Culte',
          desc: 'Step-by-step practical training for Wudu, Salah, daily remembrance, and good manners at home and school.',
          path: 'Youth Path',
          stats: { duration: '28 Hrs', syllabus: 'Fiqh & Manners for Kids', level: 'Core' }
        },
        {
          image: '/images/article_kids.png',
          iconName: 'Users',
          title: 'Stories of the Prophets & Qur\'anic Tales',
          tagline: 'Inspirational Historical Stories',
          desc: 'Exploring the lives of Prophets from Adam to Muhammad ﷺ, told in a captivating way to build role models for children.',
          path: 'Youth Path',
          stats: { duration: '30 Hrs', syllabus: 'Stories of the Prophets', level: 'Core' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'ShieldCheck',
          title: 'Daily Adhkar & Prophet\'s Supplications',
          tagline: 'Daily Fortress for Muslim Children',
          desc: 'Memorizing and practicing daily prayers (eating, sleeping, travel, morning/evening) to connect the child\'s heart to the Sunnah.',
          path: 'Youth Path',
          stats: { duration: '20 Hrs', syllabus: 'Illustrated Adhkar', level: 'Core' }
        },
        {
          image: '/images/course_fiqh.png',
          iconName: 'Award',
          title: 'Islamic Ethics & Noble Character',
          tagline: 'Building Strong Moral Identity',
          desc: 'Instilling essential moral values (honesty, truthfulness, respecting parents, kindness) using interactive stories and exercises.',
          path: 'Youth Path',
          stats: { duration: '24 Hrs', syllabus: 'Islamic Manners & Ethics', level: 'Educational' }
        }
      ]
    }
  }
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Award': return <Award className="w-5 h-5 text-gold-hi" />;
    case 'Scale': return <Scale className="w-5 h-5 text-gold-hi" />;
    case 'Languages': return <Languages className="w-5 h-5 text-gold-hi" />;
    case 'Shield': return <Shield className="w-5 h-5 text-gold-hi" />;
    case 'Compass': return <Compass className="w-5 h-5 text-gold-hi" />;
    case 'Feather': return <Feather className="w-5 h-5 text-gold-hi" />;
    case 'BookOpen': return <BookOpen className="w-5 h-5 text-gold-hi" />;
    case 'Book': return <Book className="w-5 h-5 text-gold-hi" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-gold-hi" />;
    default: return <BookOpen className="w-5 h-5 text-gold-hi" />;
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const getTrackFromSlug = (slug: string): string => {
  if (['quran-tajweed', '10-qiraat', 'shatibiyyah-durrah', 'mushaf-script', 'quranic-sciences-tafsir', 'waqf-ibtida'].includes(slug)) {
    return 'quran';
  }
  if (['arabic-grammar', 'arabic-literature', 'alfiya-ibn-malik', 'arabic-philology', 'arabic-metrics', 'creative-writing'].includes(slug)) {
    return 'arabic';
  }
  if (['islamic-fiqh', 'islamic-creed', 'principles-of-fiqh', 'hadith-sciences', 'seerah', 'islamic-logic'].includes(slug)) {
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

export default function ProgramsPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [selectedTrack, setSelectedTrack] = useState('quran');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [dbCourses, setDbCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('status', 'published');
        
        if (error) {
          console.error('Error fetching courses:', error);
        } else if (data) {
          setDbCourses(data);
        }
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // Set default tab from URL query params (avoids Next.js build-time suspends)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const trackParam = params.get('track');
      if (trackParam && ['quran', 'arabic', 'islamic', 'kids'].includes(trackParam)) {
        setSelectedTrack(trackParam);
      }
    }
  }, []);

  // Program-specific FAQs (World class details)
  const faqs = useMemo<FAQItem[]>(() => {
    if (locale === 'ar') {
      return [
        { q: 'هل يمكنني الجمع بين دراسة اللغة العربية والقرآن الكريم؟', a: 'نعم بالتأكيد. تتيح الأكاديمية تصميم جداول مخصصة تجمع بين حصص التجويد وحصص اللغة العربية بالتكامل، بحيث يدرس الطالب كلا العلمين إما في نفس الحصة أو مقسمة على أيام الأسبوع بالتناوب.' },
        { q: 'كيف تسير عملية التقييم وحصص التلقي الفردية؟', a: 'جميع دروسنا تقدم بشكل فردي 1-على-1 عبر تطبيق زووم لضمان التركيز الكامل. تبدأ الرحلة بحصة تقييم مجانية مدتها 30 دقيقة يقوم فيها الشيخ بتحديد مستواك الحالي وبناء خطة دراسية تتناسب مع أوقاتك وأهدافك.' },
        { q: 'هل تقدم الأكاديمية شهادات إتمام معتمدة بعد انتهاء المستويات؟', a: 'نعم. تمنح الأكاديمية شهادة أكاديمية موقعة ومختومة من هيئة إدارة التعليم بالأكاديمية تفيد باجتياز الطالب للمستوى بنجاح، بعد تخطي الاختبار التقييمي المقرر في نهاية كل مستوى.' },
        { q: 'كيف يتم تنظيم الحفظ والحصول على الإجازة والسند المتصل؟', a: 'يخضع طالب السند لبرنامج مكثف يبدأ بضبط المخارج وإتقان التجويد النظري. بعد مراجعة وتمكين الحفظ كاملاً، يبدأ الطالب بقراءة الختمة الكاملة غيباً من أول الفاتحة إلى آخر الناس في مجالس متتالية تحت إشراف الشيخ المجاز ليمنحه الإجازة بالسند المتصل للنبي ﷺ.' },
        { q: 'هل المناهج والكتب المقررة ملائمة للمبتدئين والأطفال الصغار؟', a: 'نعم، تم تصميم مسار النشء والشباب خصيصاً ليناسب طبيعة الأطفال ونفسيتهم، حيث نعتمد على القاعدة النورانية الميسرة والكتب المصورة والألعاب التعليمية لجعل التعليم مشوقاً ومحبباً للأطفال من سن 5 سنوات.' },
        { q: 'ما هي المذاهب الفقهية المتاحة للدراسة في قسم العلوم الشرعية؟', a: 'ندرس الفقه الإسلامي المذهبي المعتمد وفق المذاهب الأربعة الرئيسية (المالكي، الشافعي، الحنفي، الحنبلي)، ويختار الطالب دراسة المذهب السائد في بلده أو المذهب الذي يفضله بمتابعة شيوخ متخصصين في كل مذهب.' }
      ];
    } else if (locale === 'fr') {
      return [
        { q: 'Puis-je étudier l\'arabe et le Coran en même temps ?', a: 'Oui, tout à fait. L\'académie permet de concevoir des emplois du temps sur mesure combinant cours de Tajwid et cours d\'arabe, étudiés soit durant la même session, soit répartis en alternance.' },
        { q: 'Comment se déroulent l\'évaluation et les cours individuels ?', a: 'Tous nos cours sont dispensés en privé 1-à-1 sur Zoom. Le parcours débute par un cours d\'essai gratuit de 30 minutes au cours duquel l\'enseignant évalue votre niveau et conçoit votre programme.' },
        { q: 'L\'académie délivre-t-elle des certificats de réussite ?', a: 'Oui. L\'académie délivre un certificat officiel de fin d\'études signé à la fin de chaque niveau, après réussite de l\'examen d\'évaluation.' },
        { q: 'Comment fonctionne le processus d\'obtention de l\'Ijaza ?', a: 'L\'étudiant suit un programme intensif de mémorisation et de Tajwid. Après mémorisation complète, il récite l\'intégralité du Coran de mémoire devant un Sheikh certifié pour obtenir son Ijaza avec Isnad.' },
        { q: 'Les manuels sont-ils adaptés aux débutants et aux enfants ?', a: 'Oui, le parcours jeunesse est conçu spécifiquement pour les enfants dès 5 ans, utilisant la méthode Qaida Nuraniyyah et des supports illustrés.' },
        { q: 'Quelles écoles de jurisprudence sont enseignées en sciences islamiques ?', a: 'Nous enseignons le Fiqh selon les quatre écoles orthodoxes (Malikite, Chafiite, Hanafite, Hanbalite) selon le choix de l\'étudiant.' }
      ];
    } else {
      return [
        { q: 'Can I study Arabic and the Quran simultaneously?', a: 'Yes, absolutely. The academy allows designing customized schedules combining Tajweed and Arabic classes, studied either during the same session or split across alternating days of the week.' },
        { q: 'How do the assessment and the 1-on-1 private sessions work?', a: 'All our classes are taught privately 1-on-1 via Zoom. The journey starts with a 30-minute free trial evaluation class where a scholar assesses your level and drafts your study plan.' },
        { q: 'Does the academy provide completion certificates?', a: 'Yes. The academy awards an official certificate of completion signed by the academic board upon passing the assessment exam at the end of each level.' },
        { q: 'How does the Hifz consolidation and Ijaza process work?', a: 'The student undergoes a structured prep program. Once memorization is secure, they recite the entire Quran from memory to a certified Sheikh to receive their authorized Ijaza with Isnad.' },
        { q: 'Are the textbooks suitable for beginners and young children?', a: 'Yes, the youth path is designed specifically for children from age 5, using the Qaida Nuraniyyah method and illustrated guides to make learning engaging.' },
        { q: 'Which schools of jurisprudence (Fiqh) are taught in Shariah classes?', a: 'We teach jurisprudence according to the four orthodox Sunni schools (Maliki, Shafi\'i, Hanafi, Hanbali), depending on the student\'s preference.' }
      ];
    }
  }, [locale]);

  // Translation Labels
  const labels = useMemo(() => {
    if (locale === 'ar') {
      return {
        tag: 'البرامج والمناهج الأكاديمية',
        title: 'منظومة المناهج والعلوم التراثية والمعاصرة',
        subtitle: 'مسارات تعليمية وتلقي فردي مصمم خصيصاً لبناء هوية إسلامية رصينة وإتقان اللسان العربي وعلوم الوحي.',
        faqTitle: 'الأسئلة الأكاديمية والمنهجية',
        faqSubtitle: 'كل ما تود معرفته عن نظام الدراسة والمناهج والاختبارات في الأكاديمية.',
        btnContact: 'احجز تقييمك وتواصل معنا',
        btnBlog: 'تصفح الأبحاث والمقالات العلمية',
        btnBook: 'عرض تفاصيل المقرر',
        ctaTitle: 'ابدأ رحلة التلقي وضبط الأداء اليوم',
        ctaDesc: 'اختر مسارك الأكاديمي، وحدد أوقاتك المفضلة، وابدأ رحلتك الفردية مع علماء الأزهر الشريف بمستوى الترا برميم تفاعلي.',
        levelsHeader: 'المستويات المنهجية الأربعة',
        coursesHeader: 'الدورات والمناهج التفصيلية المتاحة',
        booksHeader: 'المتون والكتب المقررة للتدريس',
        outcomesHeader: 'مخرجات التعلم والكفاءة المكتسبة',
        teachersHeader: 'العلماء المتخصصون المشرفون على المسار',
        statDuration: 'المدة',
        statSyllabus: 'المقرر',
        statLevel: 'المستوى',
        tabs: {
          quran: 'علوم القرآن والتجويد',
          arabic: 'اللغة العربية واللسانيات',
          islamic: 'العلوم الشرعية الإسلامية',
          kids: 'مسار النشء والشباب'
        }
      };
    } else if (locale === 'fr') {
      return {
        tag: 'PROGRAMMES ACADÉMIQUES',
        title: 'Système d\'Enseignement Traditionnel & Moderne',
        subtitle: 'Parcours d\'apprentissage privés et personnalisés conçus pour maîtriser la langue arabe, le Coran et les sciences de la Shariah.',
        faqTitle: 'Questions Académiques & Méthodologiques',
        faqSubtitle: 'Tout ce que vous devez savoir sur le système d\'études, les examens et les certificats.',
        btnContact: 'Réserver l\'évaluation & Contacter',
        btnBlog: 'Lire les articles de recherche',
        btnBook: 'Voir les détails',
        ctaTitle: 'Commencez Votre Apprentissage Dès Aujourd\'hui',
        ctaDesc: 'Choisissez votre parcours, définissez vos horaires et commencez vos cours particuliers avec des savants d\'Al-Azhar.',
        levelsHeader: 'Les 4 Niveaux du Programme',
        coursesHeader: 'Cours & Disciplines Détaillés',
        booksHeader: 'Textes & Manuels d\'Études Officiels',
        outcomesHeader: 'Compétences & Objectifs Acquis',
        teachersHeader: 'Savants & Enseignants Spécialisés',
        statDuration: 'Durée',
        statSyllabus: 'Manuel',
        statLevel: 'Niveau',
        tabs: {
          quran: 'Coran & Tajwid',
          arabic: 'Linguistique Arabe',
          islamic: 'Sciences Islamiques',
          kids: 'Parcours Jeunesse'
        }
      };
    } else {
      return {
        tag: 'ACADEMIC PATHS & CURRICULUM',
        title: 'Traditional Mastery & Modern Pedagogies',
        subtitle: 'Customized private 1-on-1 pathways designed to build strong Islamic identity, classical Arabic literacy, and theological depth.',
        faqTitle: 'Academic & Curricular FAQs',
        faqSubtitle: 'Everything you need to know about class structures, textbooks, and assessment procedures.',
        btnContact: 'Book Free Assessment & Contact',
        btnBlog: 'Browse Scholarly Articles',
        btnBook: 'View Course Details',
        ctaTitle: 'Begin Your Path of Traditional Study Today',
        ctaDesc: 'Choose your academic path, select your preferred hours, and start your private study with Al-Azhar graduate scholars.',
        levelsHeader: 'The 4 Developmental Levels',
        coursesHeader: 'Detailed Courses & Study Programs',
        booksHeader: 'Prescribed Classical Textbooks',
        outcomesHeader: 'Expected Learning Outcomes',
        teachersHeader: 'Specialized Scholars & Faculty Board',
        statDuration: 'Duration',
        statSyllabus: 'Syllabus',
        statLevel: 'Level',
        tabs: {
          quran: 'Quran & Tajweed',
          arabic: 'Arabic Linguistics',
          islamic: 'Islamic Studies',
          kids: 'Youth & Kids Path'
        }
      };
    }
  }, [locale]);

  const activeTrackData = useMemo(() => {
    const staticTrack = ACADEMIC_DATABASE[locale]?.[selectedTrack] || ACADEMIC_DATABASE.en[selectedTrack];
    if (!staticTrack) return null;

    // Filter dbCourses for the active track
    const trackDbCourses = dbCourses.filter(c => getTrackFromSlug(c.slug) === selectedTrack);

    // Build the merged list of courses
    const mergedCourses = staticTrack.courses.map(staticCourse => {
      // Find matching dbCourse
      const matchingDbCourse = trackDbCourses.find(c => {
        const mappedSlug = COURSE_SLUG_MAP[staticCourse.title] || '';
        return c.slug === mappedSlug;
      });

      const slug = matchingDbCourse?.slug || COURSE_SLUG_MAP[staticCourse.title] || 'quran-tajweed';

      if (matchingDbCourse) {
        return {
          ...staticCourse,
          slug,
          title: matchingDbCourse.title?.[locale] || matchingDbCourse.title?.en || staticCourse.title,
          desc: matchingDbCourse.short_description?.[locale] || matchingDbCourse.short_description?.en || staticCourse.desc,
          image: matchingDbCourse.image_url || staticCourse.image,
          stats: {
            ...staticCourse.stats,
            duration: matchingDbCourse.duration?.[locale] || matchingDbCourse.duration?.en || staticCourse.stats.duration,
          }
        };
      }
      return {
        ...staticCourse,
        slug
      };
    });

    // Now find any dbCourses that are NOT in the static list
    const newDbCourses = trackDbCourses.filter(c => {
      return !staticTrack.courses.some(staticCourse => {
        const mappedSlug = COURSE_SLUG_MAP[staticCourse.title] || '';
        return c.slug === mappedSlug;
      });
    });

    // Map new dbCourses to CourseData structure
    const mappedNewCourses = newDbCourses.map(c => {
      return {
        slug: c.slug,
        image: c.image_url || '/images/course_default.png',
        iconName: 'BookOpen',
        title: c.title?.[locale] || c.title?.en || '',
        tagline: locale === 'ar' ? 'مقرر جديد' : (locale === 'fr' ? 'Nouveau Cours' : 'New Course'),
        desc: c.short_description?.[locale] || c.short_description?.en || '',
        path: getTrackTitle(selectedTrack, locale),
        stats: {
          duration: c.duration?.[locale] || c.duration?.en || '',
          syllabus: c.instructor?.[locale] || c.instructor?.en || (isRtl ? 'منهج الأكاديمية' : 'Academy Syllabus'),
          level: isRtl ? 'تأسيسي' : 'Core'
        }
      };
    });

    return {
      ...staticTrack,
      courses: [...mergedCourses, ...mappedNewCourses]
    };
  }, [locale, selectedTrack, dbCourses, isRtl]);

  if (!activeTrackData) return null;

  return (
    <article className="min-h-screen bg-ivory text-midnight overflow-x-hidden selection:bg-gold-hi/30">
      
      {/* ── SECTION 1: HERO HEADER (DARK 100vh) ── */}
      <section className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 overflow-hidden border-b border-gold-hi/25">
        <ParallaxBackground src="/images/about-us-bg.webp" className="md:bg-[length:100%_100%]" />
        
        {/* Premium Dark Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b162c]/85 via-[#0e1d3a]/70 to-[#122548]/80 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:120px_120px] opacity-[0.03] filter invert pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 text-center my-auto flex flex-col justify-center items-center">
          <motion.span 
            className={`inline-block text-xs uppercase tracking-[0.25em] text-gold-champagne font-bold mb-5 ${isRtl ? 'font-cairo' : 'font-dm'}`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {labels.tag}
          </motion.span>
          
          <motion.h1 
            className={`text-hero text-parchment leading-tight max-w-4xl mx-auto mb-6 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'}`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {labels.title}
          </motion.h1>

          <motion.div 
            className="flex flex-col items-center justify-center my-6 max-w-2xl"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-hi to-transparent mb-4" />
            <div dir="rtl" className="text-gold-hi font-amiri text-lg md:text-[23px] leading-relaxed mb-1 select-none font-bold">
              ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ﴾
            </div>
            <span className="text-[10px] text-parchment/40 uppercase tracking-wider font-semibold">
              {isRtl ? 'سورة العلق [1]' : 'Surah Al-Alaq [96:1]'}
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-hi to-transparent mt-4" />
          </motion.div>
          
          <motion.p 
            className={`text-sm md:text-base text-parchment/80 leading-relaxed max-w-2xl mx-auto ${isRtl ? 'font-noto' : 'font-lora'}`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {labels.subtitle}
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2 text-gold-champagne text-center"
          animate={{ y: [0, 8, 0], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={() => document.getElementById('programs-catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
        >
          <span className={`text-[9px] uppercase tracking-[0.25em] font-semibold text-parchment/40 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'اسحب للأسفل' : 'Scroll Down'}
          </span>
          <ArrowRight size={16} className="text-gold-hi rotate-90" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gold-hi/50 via-white/70 via-gold-hi/50 to-transparent animate-gold-shimmer" />
        </div>
      </section>

      {/* ── SECTION 2: INTERACTIVE PROGRAMS SWITCHER & VIEW (LIGHT CREAM) ── */}
      <section id="programs-catalog-section" className="bg-[#FDFAF3] py-24 relative z-10 border-b border-gold-muted/15">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Branded Floating Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-20 max-w-5xl mx-auto">
            {Object.entries(labels.tabs).map(([key, name]) => {
              const isActive = selectedTrack === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTrack(key)}
                  className={`relative px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'text-parchment shadow-md shadow-navy/15 scale-105'
                      : 'bg-white text-stone/80 border border-gold-muted/15 hover:border-gold/30 hover:text-midnight shadow-sm shadow-midnight/2'
                  } ${isRtl ? 'font-cairo' : 'font-dm'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTrackTab"
                      className="absolute inset-0 bg-navy z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Program Dashboard Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTrack}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-20 text-start"
            >
              
              {/* Part A: Track Overview Description Card */}
              <div className="bg-white border border-gold-muted/12 rounded-3xl p-8 md:p-12 shadow-[0_12px_45px_rgba(139,115,85,0.02)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="absolute top-0 left-0 w-24 h-24 bg-gold-hi/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-3xl">
                  <span className={`inline-block text-[10px] uppercase tracking-widest text-gold-hi font-bold mb-2 pb-1 border-b border-gold-muted/20 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {activeTrackData.subtitle}
                  </span>
                  <h2 className={`text-2xl md:text-3xl text-midnight font-bold mb-4 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                    {activeTrackData.title}
                  </h2>
                  <p className={`text-stone/75 text-sm leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {activeTrackData.desc}
                  </p>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <Link
                    href={`/${locale}/book?topic=${selectedTrack}`}
                    className={`btn-gold px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider block w-full text-center hover:scale-[1.03] active:scale-[0.97] transition-transform ${isRtl ? 'font-cairo' : 'font-dm'}`}
                  >
                    {labels.btnBook}
                  </Link>
                </div>
              </div>

              {/* Part B: Timeline of Academic Levels */}
              <div>
                <div className="flex items-center gap-3 mb-10 border-b border-gold-muted/15 pb-4">
                  <Layers className="w-5 h-5 text-gold" />
                  <h3 className={`text-lg md:text-xl text-midnight font-bold uppercase tracking-wider ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                    {labels.levelsHeader}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeTrackData.levels.map((level, index) => (
                    <motion.div
                      key={level.num}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={index}
                      className="bg-white border border-gold-muted/12 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300 group text-start relative"
                    >
                      <span className="absolute top-4 right-4 font-cormorant text-2xl font-bold text-gold/20 group-hover:text-gold/45 transition-colors">
                        {level.num}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-ivory border border-gold-muted/10 flex items-center justify-center mb-5 group-hover:bg-gold-hi/10 transition-colors">
                        <Award className="w-5 h-5 text-gold" />
                      </div>
                      <h4 className={`text-sm text-midnight font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {level.title}
                      </h4>
                      <p className={`text-stone/60 text-xs leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                        {level.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Part C: Offered Courses & Study Programs */}
              <div>
                <div className="flex items-center gap-3 mb-10 border-b border-gold-muted/15 pb-4">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <h3 className={`text-lg md:text-xl text-midnight font-bold uppercase tracking-wider ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                    {labels.coursesHeader}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeTrackData.courses.map((course, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={idx}
                      className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-3xl p-0 shadow-[0_8px_30px_rgba(139,115,85,0.06)] hover:border-gold hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(139,115,85,0.12)] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between text-start"
                    >
                      {/* Top Accent Gold Bar */}
                      <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                      {/* Watermark in background */}
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[url('/images/pattern-8star.svg')] bg-contain bg-no-repeat opacity-[0.015] group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none filter sepia hue-rotate-15 brightness-95" />

                      <div>
                        {/* Course Header Image Frame */}
                        <div className="relative h-48 w-full overflow-hidden rounded-t-[1.4rem]">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/20 to-transparent pointer-events-none" />
                          
                          {/* Badge Overlay */}
                          <span className={`absolute top-4 left-4 rtl:left-auto rtl:right-4 text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-gold-muted/30 bg-midnight/80 backdrop-blur-sm text-gold-hi font-dm z-10`}>
                            {course.path}
                          </span>
                        </div>

                        {/* Card Content wrapper */}
                        <div className="p-6 md:p-8">
                          {/* Icon & Title row */}
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className={`text-[1.25rem] text-midnight font-bold leading-snug group-hover:text-gold-hi transition-colors duration-300 ${
                              isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                            }`}>
                              {course.title}
                            </h3>
                            <div className="p-2 bg-gold-muted/10 rounded-xl border border-gold/15 text-gold-hi transition-colors duration-300">
                              {getIcon(course.iconName)}
                            </div>
                          </div>

                          {/* Tagline */}
                          <span className={`block text-xs text-gold/80 font-semibold mb-4 uppercase tracking-wider ${
                            isRtl ? 'font-cairo' : 'font-dm'
                          }`}>
                            {course.tagline}
                          </span>

                          {/* Description */}
                          <p className={`text-stone/75 text-xs md:text-sm leading-relaxed mb-6 min-h-[3rem] ${
                            isRtl ? 'font-noto' : 'font-lora'
                          }`}>
                            {course.desc}
                          </p>

                          {/* Syllabus Stats Metadata Section */}
                          <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gold-muted/15 text-center bg-[#FDFAF3]/30 rounded-xl">
                            <div className="space-y-1">
                              <span className="block text-[9px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                                {labels.statDuration}
                              </span>
                              <span className={`block text-xs text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                                {course.stats.duration}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <span className="block text-[9px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                                {labels.statSyllabus}
                              </span>
                              <span className={`block text-xs text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                                {course.stats.syllabus}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <span className="block text-[9px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                                {labels.statLevel}
                              </span>
                              <span className={`block text-xs text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                                {course.stats.level}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Bottom Action Center inside Card */}
                      <div className="px-6 md:px-8 pb-8 flex items-center justify-between">
                        <Link
                          href={`/${locale}/programs/${course.slug || 'quran-tajweed'}`}
                          className={`text-[11px] uppercase tracking-widest font-bold text-stone hover:text-gold transition-colors duration-300 inline-flex items-center gap-1.5 ${
                            isRtl ? 'font-cairo' : 'font-dm'
                          }`}
                        >
                          <span>{labels.btnBook}</span>
                          {isRtl ? (
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          )}
                        </Link>

                        {/* Small branding logo opposite the button */}
                        <div className="w-10 h-10 flex items-center justify-center select-none pointer-events-none relative">
                          <Image
                            src="/logo-new.webp"
                            alt="Academy Seal"
                            width={40}
                            height={40}
                            className="object-contain opacity-80 group-hover:opacity-100 transition-all duration-500"
                          />
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Part D: Prescribed Books & Primers */}
              <div>
                <div className="flex items-center gap-3 mb-10 border-b border-gold-muted/15 pb-4">
                  <Book className="w-5 h-5 text-gold" />
                  <h3 className={`text-lg md:text-xl text-midnight font-bold uppercase tracking-wider ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                    {labels.booksHeader}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {activeTrackData.books.map((book, index) => (
                    <motion.div
                      key={book.title}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={index}
                      className="bg-white border border-gold-muted/12 rounded-2xl p-7 flex gap-5 hover:border-gold-hi/30 shadow-[0_4px_20px_rgba(139,115,85,0.01)] hover:shadow-[0_12px_30px_rgba(139,115,85,0.03)] transition-all duration-300 text-start"
                    >
                      <div className="w-12 h-12 bg-ivory border border-gold-muted/10 rounded-xl flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className={`text-sm text-midnight font-bold mb-1 ${isRtl ? 'font-amiri text-base' : 'font-dm'}`}>
                          {book.title}
                        </h4>
                        <span className={`block text-[10px] text-gold-hi font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          {isRtl ? `تأليف: ${book.author}` : `By ${book.author}`}
                        </span>
                        <p className={`text-stone/60 text-xs leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                          {book.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Part D: Outcomes and Scholars Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6">
                
                {/* Outcomes Grid */}
                <div className="bg-white border border-gold-muted/12 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 border-b border-stone/5 pb-3">
                    <ShieldCheck className="w-5 h-5 text-gold" />
                    <h3 className={`text-base md:text-lg text-midnight font-bold uppercase tracking-wider ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                      {labels.outcomesHeader}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {activeTrackData.outcomes.map((out, idx) => (
                      <motion.div
                        key={idx}
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={idx}
                        className="flex items-start gap-3 text-start"
                      >
                        <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                        <span className={`text-xs text-stone/70 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                          {out}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Specialized Faculty Board */}
                <div className="bg-white border border-gold-muted/12 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 border-b border-stone/5 pb-3">
                    <Users className="w-5 h-5 text-gold" />
                    <h3 className={`text-base md:text-lg text-midnight font-bold uppercase tracking-wider ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                      {labels.teachersHeader}
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {activeTrackData.teachers.map((teach, index) => (
                      <motion.div
                        key={teach.name}
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={index}
                        className="flex gap-4 items-start text-start group"
                      >
                        <div className="w-10 h-10 rounded-full bg-ivory border border-gold-muted/10 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <h4 className={`text-xs md:text-sm text-midnight font-bold flex items-center gap-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                            <span>{teach.name}</span>
                            <span className="flex text-[9px] bg-gold/10 text-gold px-2 py-0.5 rounded-full border border-gold/10 font-sans">
                              <Star size={9} className="fill-gold text-gold shrink-0 mt-0.5 mr-0.5" />
                              {isRtl ? 'أزهري' : 'Azhari'}
                            </span>
                          </h4>
                          <span className={`block text-[10px] text-stone/40 font-bold mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                            {teach.title}
                          </span>
                          <p className={`text-stone/60 text-xs leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                            {teach.bio}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── SECTION 3: FAQ ACCORDION SECTION ── */}
      <section className="bg-white py-24 relative z-10 border-b border-gold-muted/12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs uppercase tracking-widest text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
              <HelpCircle className="inline-block w-4 h-4 mr-1.5 -mt-0.5 align-middle" />
              {labels.faqTitle}
            </span>
            <h2 className={`text-2xl md:text-3xl text-midnight font-bold ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
              {labels.faqSubtitle}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-gold-muted/15 rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-300 bg-[#FDFAF3]/30"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-start font-semibold text-midnight hover:text-gold cursor-pointer transition-colors focus:outline-none"
                >
                  <span className={`text-xs md:text-sm ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-gold transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className={`px-6 pb-6 pt-2 border-t border-gold-muted/10 text-stone/70 text-xs md:text-sm leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: HIGH-CONVERSION CTA TIMELINE BOARD ── */}
      <section className="relative py-24 bg-gradient-to-br from-[#122038] to-[#091521] text-parchment overflow-hidden border-b border-gold-hi/20">
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.02] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Sparkles className="w-10 h-10 text-gold-hi mx-auto mb-6" />
          <h2 className={`text-3xl md:text-4xl text-parchment font-bold mb-4 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'}`}>
            {labels.ctaTitle}
          </h2>
          <p className={`text-sm text-parchment/70 max-w-2xl mx-auto leading-relaxed mb-10 ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {labels.ctaDesc}
          </p>
          <Link
            href={`/${locale}/book?topic=${selectedTrack}`}
            className={`btn-gold px-10 py-4 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 ${isRtl ? 'font-cairo' : 'font-dm'}`}
          >
            <span>{labels.btnBook}</span>
            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>
      </section>

      {/* ── SECTION 5: FOOTER CTA NAVIGATION STRIP (LIGHT GOLD) ── */}
      <section className="py-12 bg-[#FDFAF3] border-b border-gold-muted/15 z-10 relative">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          
          <Link
            href={`/${locale}/contact`}
            className={`flex items-center gap-3 px-6 py-4 rounded-full border border-gold-hi/30 bg-white shadow-sm hover:border-gold hover:shadow-md transition-all duration-300 text-midnight text-xs font-bold uppercase tracking-wider group hover:scale-[1.02] active:scale-[0.98] ${isRtl ? 'font-cairo' : 'font-dm'}`}
          >
            <Mail size={15} className="text-gold group-hover:scale-110 transition-transform" />
            <span>{labels.btnContact}</span>
            {isRtl ? <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" /> : <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />}
          </Link>

          <Link
            href={`/${locale}/blog`}
            className={`flex items-center gap-3 px-6 py-4 rounded-full border border-gold-hi/30 bg-white shadow-sm hover:border-gold hover:shadow-md transition-all duration-300 text-midnight text-xs font-bold uppercase tracking-wider group hover:scale-[1.02] active:scale-[0.98] ${isRtl ? 'font-cairo' : 'font-dm'}`}
          >
            <BookOpen size={15} className="text-gold group-hover:scale-110 transition-transform" />
            <span>{labels.btnBlog}</span>
            {isRtl ? <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" /> : <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />}
          </Link>

        </div>
      </section>

    </article>
  );
}
