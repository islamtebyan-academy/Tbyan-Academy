import os

code_content = """'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Award, BookOpen, FileText, CheckCircle2, ChevronDown, 
  ArrowRight, ArrowLeft, Book, Users, Star, GraduationCap, 
  Sparkles, HelpCircle, Layers, ShieldCheck, Mail,
  Scale, Languages, Shield, Compass, Feather
} from 'lucide-react';
import ParallaxBackground from '@/components/ui/ParallaxBackground';

/* =================================================================
   SCHOLARLY PROGRAM DATABASE
   ================================================================= */
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
          title: 'الفقه المالكي وتأصيل الأحكام',
          tagline: 'فقه العبادات والمعاملات',
          desc: 'تفقه في الدين على المذهب المالكي بالتدريج العلمي بدءاً من متن ابن عاشر إلى متن الرسالة لتأصيل المسائل الفقهية وتطبيقها.',
          path: 'مسار العلوم الشرعية',
          stats: { duration: '48 ساعة', syllabus: 'ابن عاشر والرسالة', level: 'تأصيلي' }
        },
        {
          image: '/images/course_aqidah.png',
          iconName: 'ShieldCheck',
          title: 'العقيدة الإسلامية والتوحيد',
          tagline: 'أصول الدين ورسوخ اليقين',
          desc: 'تأصيل عقيدة أهل السنة والجماعة عبر المتون المعتمدة لبناء حصانة فكرية والرد على الشبهات المعاصرة.',
          path: 'مسار العلوم الشرعية',
          stats: { duration: '36 ساعة', syllabus: 'الجوهرة والنسفية', level: 'تأصيلي' }
        },
        {
          image: '/images/course_logic.png',
          iconName: 'Compass',
          title: 'علم المنطق وصون الفكر',
          tagline: 'آلة العلوم وضبط الاستدلال',
          desc: 'دراسة السلم المنورق لتأسيس التفكير السليم، وضبط الاستدلال العقلي والبرهنة، وفهم المصطلحات الأصولية والشروح العلمية.',
          path: 'مسار العلوم الشرعية',
          stats: { duration: '30 ساعة', syllabus: 'السلم المنورق', level: 'متقدم' }
        }
      ]
    },
    kids: {
      title: 'مسار التأسيس الشرعي والتربوي للنشء والشباب',
      subtitle: 'بناء الهوية الإسلامية والأخلاق الحميدة للأطفال',
      desc: 'مسار تربوي متكامل مصمم خصيصاً للأطفال والشباب من سن 5 إلى 18 عاماً؛ يهدف لتعليم قراءة القرآن بالتهجي الصحيح، وحفظ قصار السور، وغرس الآداب والسنن اليومية والقصص النبوي الشريف.',
      levels: [
        { num: '01', title: 'المستوى التمهيدي: التهجي الصحيح والقراءة النورانية', desc: 'تمكين الطفل من نطق الحروف العربية وتشكيلها وتهجي الكلمات والجمل القرآنية بطلاقة باستخدام القاعدة النورانية.' },
        { num: '02', title: 'المستوى الثاني: حفظ جزء عم وقصار السور بالتجويد', desc: 'حفظ جزء عم (والتبارك للشباب) مع مراعاة أحكام التجويد الأساسية وضبط الحركات والوقف المناسب.' },
        { num: '03', title: 'المستوى الثالث: الآداب الإسلامية والأذكار اليومية', desc: 'تعليم الطفل الأذكار اليومية (النوم، الطعام، الخروج)، وآداب التعامل مع الوالدين، وقيم الصدق والأمانة وبر الوالدين.' },
        { num: '04', title: 'المستوى الرابع: قصص الأنبياء والبطولات الإسلامية المبسطة', desc: 'تعريف الناشئ بسير الأنبياء الكرام وقصصهم المذكورة في القرآن، وسيرة الصحابة والبطولات الملهمة لبناء هوية إسلامية فخورة.' }
      ],
      books: [
        { title: 'القاعدة النورانية والتهجي', author: 'الشيخ نور محمد حقاني', desc: 'المنهج الأكثر شهرة ونجاحاً لتعليم الصغار كيفية القراءة والنطق السليم لحروف القرآن الكريم.' },
        { title: 'كتاب الآداب الإسلامية للناشئين', author: 'منشورات الأزهر التعليمية', desc: 'كتاب مصور تفاعلي يشرح الآداب والأخلاق والسنن بأسلوب جذاب للأطفال.' },
        { title: 'قصص الأنبياء للصغار', author: 'منهج الأكاديمية المعتمد', desc: 'سلسلة قصصية مبسطة بأسلوب تربوي مشوق يربط القصة بالعبرة الأخلاقية والعملية.' }
      ],
      outcomes: [
        'قراءة كلمات وجمل القرآن الكريم من المصحف الشريف قراءة صحيحة ذاتياً.',
        'حفظ سور جزء عم بالكامل مع أحكام التلاوة والتجويد الأساسية.',
        'الالتزام بالواجبات اليومية كالصلاة، والوضوء الصحيح، والأذكار المأثورة.',
        'التحلي بمكارم الأخلاق الإسلامية وتنمية الفخر بالهوية والانتماء للأمة.'
      ],
      teachers: [
        { name: 'الأستاذ محمد داود الأزهري', title: 'أخصائي تربية وأستاذ قرآن للناشئين', credentials: ['ليسانس كلية التربية قسم دراسات إسلامية وعربية', 'دبلوم الصحة النفسية للطفل'], bio: 'ذو أسلوب ترفيهي وتفاعلي ممتاز يجذب الأطفال ويحببهم في دراسة القرآن والحديث النبوي.' },
        { name: 'الأستاذة شيماء الهواري', title: 'معلمة رياض أطفال وحفظ قرآن مجازة', credentials: ['إجازة في القرآن الكريم برواية حفص عن عاصم', 'ليسانس رياض الأطفال جامعة القاهرة'], bio: 'تتمتع بخبرة تزيد عن 8 سنوات في تحفيظ الأطفال الصغار وتعليم مخارج الحروف بالقصص والألعاب.' }
      ],
      courses: [
        {
          image: '/images/article_kids.png',
          iconName: 'BookOpen',
          title: 'القاعدة النورانية والتهجي',
          tagline: 'الخطوة الأولى للقراءة الصحيحة',
          desc: 'تعليم الحروف مخارجها وصفاتها وحركاتها بالتهجي التفصيلي لتمكين الطفل من القراءة الصحيحة من المصحف الشريف.',
          path: 'مسار النشء والشباب',
          stats: { duration: '24 ساعة', syllabus: 'القاعدة النورانية', level: 'تمهيدي' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'Book',
          title: 'حفظ جزء عم وقصار السور',
          tagline: 'حفظ متقن للأعمار الصغيرة',
          desc: 'تحفيظ جزء عم بالتكرار الممنهج وتطبيق أحكام التجويد الأساسية لربط الصغار بكلام رب العالمين بأساليب تفاعلية مشوقة.',
          path: 'مسار النشء والشباب',
          stats: { duration: '32 ساعة', syllabus: 'جزء عم والتجويد', level: 'تأسيسي' }
        },
        {
          image: '/images/course_fiqh.png',
          iconName: 'Award',
          title: 'الآداب والأخلاق الإسلامية للطفل',
          tagline: 'غرس القيم وبناء العقيدة',
          desc: 'غرس الأخلاق والآداب النبوية كبر الوالدين والصدق، مع تعليم الطهارة والوضوء والصلوات اليومية وقصص الأنبياء العطرة.',
          path: 'مسار النشء والشباب',
          stats: { duration: '28 ساعة', syllabus: 'العبادات والآداب', level: 'تربوي' }
        }
      ]
    }
  },
  en: {
    quran: {
      title: 'Quranic Sciences & Applied Academic Tajweed',
      subtitle: 'Transmission and Articulation Mastery through Connected Isnad',
      desc: 'An integrated academic path designed for mastering Arabic letters articulation (Makharij), understanding theoretical and practical Tajweed rules, systematic memorization (Hifz), and receiving an Ijaza with a connected chain of narration (Isnad) back to the Prophet ﷺ under verified scholars.',
      levels: [
        { num: '01', title: 'Introductory: Phonetic Correction & Makharij Articulation', desc: 'Complete focus on correct pronunciation of Arabic phonemes, correcting movements, and shaping speech for accurate Quranic recitation.' },
        { num: '02', title: 'Intermediate: Theoretical & Applied Tajweed Rules', desc: 'Practical study of Nun Sakinah, Meem Sakinah, Madd prolongations, and legal rules of pausing and starting during recitation.' },
        { num: '03', title: 'Advanced: Hifz Memorization & Consolidation', desc: 'Structured memorization schedules tailored to student capability, utilizing systematic active recall and revision cycles.' },
        { num: '04', title: 'Ijaza Pathway & Connected Isnad to the Prophet ﷺ', desc: 'Recitation of the entire Quran from memory under strict precision to receive an authorized Ijaza in Hafs from Asim or Warsh from Nafi\\'.' }
      ],
      books: [
        { title: 'Tuhfat al-Atfal wa al-Ghilman', author: 'Imam Sulayman al-Jamzuri', desc: 'A classical introductory poetic text summarizing essential Tajweed rules such as Noon and Meem Sakinah.' },
        { title: 'Al-Muqaddimah al-Jazariyyah', author: 'Imam Ibn al-Jazari', desc: 'The fundamental poetic text on Tajweed, focusing on articulation points and specific characteristics of letters for advanced students.' },
        { title: 'The Quran in Hafs from Asim Recitation', author: 'Via the Shatibiyyah Pathway', desc: 'The most widely transmitted recitation standard, studied with its specific performance parameters.' }
      ],
      outcomes: [
        'Articulate every Arabic letter accurately from its precise emission point.',
        'Apply Tajweed rules dynamically during recitation without affectation.',
        'Memorize designated sections of the Quran with secure, long-term recall.',
        'Understand the academic parameters of mutawatir recitations and Ijaza requirements.'
      ],
      teachers: [
        { name: 'Sheikh Ahmed Mahmoud Al-Azhari', title: 'Master of Recitation & Ijaza holding scholar', credentials: ['Ijaza in the Ten Minor & Major Recitations', 'B.A. in Quranic Sciences from Al-Azhar University'], bio: 'Specialist in correcting articulation and transmitting the Quranic text to Arab and non-Arab students with 15+ years of experience.' },
        { name: 'Ustadha Fatima Al-Zahra', title: 'Recitation Instructor for Women & Children', credentials: ['Ijaza in Hafs and Warsh recitations', 'B.A. in Islamic Studies & Education'], bio: 'Renowned for her patient pedagogical approach to teaching Tajweed and securing memorization for women and children.' }
      ],
      courses: [
        {
          image: '/images/course_quran.png',
          iconName: 'Award',
          title: 'Quran & Tajweed Recitation',
          tagline: 'The Ultimate Foundation',
          desc: 'Master Quran recitation and memorization under connected chains (Isnad) using theoretical rules and practical application of Tajweed.',
          path: 'Quranic Path',
          stats: { duration: '40 Hrs', syllabus: '2 Recitations', level: 'Core' }
        },
        {
          image: '/images/article_qiraat.png',
          iconName: 'BookOpen',
          title: 'Mutawatir Qira\\\'at Studies',
          tagline: 'Traditional Chain Transmission',
          desc: 'Deep study of the rules of the ten canonical recitations from Shatibiyyah and Durrah pathways, with practical Isnad preparation.',
          path: 'Quranic Path',
          stats: { duration: '60 Hrs', syllabus: 'Shatibiyyah & Durrah', level: 'Expert' }
        }
      ]
    },
    arabic: {
      title: 'Classical Arabic Linguistics & Literary Sciences',
      subtitle: 'Arabic Grammar (Nahw), Morphology (Sarf), and Rhetoric (Balaghah)',
      desc: 'A structured academic path designed to anchor students in the sciences of the Arabic tongue. Covers grammar, syntax, morphological derivation, and literary analysis from foundational rules to advanced mastery.',
      levels: [
        { num: '01', title: 'Level 1: Foundational Vocabulary & Expression', desc: 'Building primary vocabulary, practicing basic speaking and listening, and learning reading and writing structures.' },
        { num: '02', title: 'Level 2: Arabic Grammar (Nahw) & Syntax', desc: 'Studying nominal and verbal sentences, cases of parsing (I\\\'rab), and applying grammatical rules to classical texts.' },
        { num: '03', title: 'Level 3: Morphology (Sarf) & Word Derivations', desc: 'Understanding the patterns of words, verbs conjugation, noun derivations, and semantic changes in vocabulary.' },
        { num: '04', title: 'Level 4: Balaghah Rhetoric & Classical Literature', desc: 'Studying Eloquence (Bayan), Meanings (Ma\\\'ani), and Ornamentation (Badi\\') in classical Arabic prose and Quranic inimitability.' }
      ],
      books: [
        { title: 'Al-Ajrumiyyah in Arabic Grammar', author: 'Imam Ibn Adjurrum al-Sanhaji', desc: 'The premier classical primer to access the rules of syntax and parsing (I\\\'rab) systematically.' },
        { title: 'Qatr al-Nada wa Ball al-Sada', author: 'Imam Ibn Hisham al-Ansari', desc: 'An intermediate grammar text that deepens rules of syntax with detailed explanations.' },
        { title: 'Al-Arabiyyah Bayna Yadayk', author: 'A panel of linguists', desc: 'The most powerful modern curriculum for developing speaking, listening, and reading skills for non-native speakers.' }
      ],
      outcomes: [
        'Communicate fluently in classical, formal Arabic without dialectal mix.',
        'Parse complex sentences in the Quran and classical poetry with grammatical precision.',
        'Derive and conjugate Arabic words across various morphological tables.',
        'Appreciate and analyze rhetorical devices in classical prose and the Quranic text.'
      ],
      teachers: [
        { name: 'Dr. Yasser Abd Al-Rahman', title: 'Professor of Linguistics at Al-Azhar University', credentials: ['Ph.D. in Arabic Language & Literature from Al-Azhar', 'Member of the Arabic Linguistics Association'], bio: 'Expert in classical grammar texts and comparative linguistics with multiple academic publications.' },
        { name: 'Ustadh Mahmoud Al-Shafi\\\'i', title: 'Arabic Instructor for Non-Native Speakers', credentials: ['M.A. in Teaching Arabic as a Foreign Language', 'B.A. in Arabic Language & Literature'], bio: 'Specialized in using interactive communicative methods to develop vocabulary and conversation skills.' }
      ],
      courses: [
        {
          image: '/images/course_arabic.png',
          iconName: 'Languages',
          title: 'Grammar & Morphology',
          tagline: 'Key to the Sacred Texts',
          desc: 'Protect your tongue from errors and decode Arabic script by studying Al-Ajurrumiyyah and Qatr al-Nada (Syntax) and Matn al-Bina (Morphology).',
          path: 'Classical Arabic',
          stats: { duration: '50 Hrs', syllabus: 'Ajurrumiyyah & Bina', level: 'Essential' }
        },
        {
          image: '/images/course_literature.png',
          iconName: 'Feather',
          title: 'Literature & Rhetoric',
          tagline: 'Esthetics of Classical Arabic',
          desc: 'Appreciate the miraculous eloquence (Balaghah) of the Quran, pre-Islamic poetry, and classical prose to refine your literary taste.',
          path: 'Classical Arabic',
          stats: { duration: '45 Hrs', syllabus: 'Mu’allaqat & Rhetoric', level: 'Literary' }
        }
      ]
    },
    islamic: {
      title: 'Islamic Studies & Shariah Sciences',
      subtitle: 'Jurisprudence (Fiqh), Creed (Aqidah), and Hadith & Tafsir Foundations',
      desc: 'Build a solid, traditional understanding of Islamic Shariah through structured study of jurisprudence (Fiqh) according to the four orthodox schools, Sunni creed (Aqidah), Prophetic biography, and principles of Tafsir and Hadith.',
      levels: [
        { num: '01', title: 'Level 1: Jurisprudence of Worship & Core Creed', desc: 'Purification, prayer, fasting, charity, and pilgrimage rules according to the student\\\'s chosen Madhab, and core pillars of faith.' },
        { num: '02', title: 'Level 2: Seerah Prophetic Biography & Ethics', desc: 'Studying the life of the Prophet ﷺ from birth to death, analyzing his character traits (Shama\\\'il), and Islamic manners.' },
        { num: '03', title: 'Level 3: Usul al-Fiqh & Legal Deductions', desc: 'Learning the methodology of extracting rulings from detailed sources (Quran, Sunnah, Consensus, Analogy) and legal objectives.' },
        { num: '04', title: 'Level 4: Hadith Studies & Terminology (Mustalah)', desc: 'Understanding validation methods of Hadith, categories of reports (Sahih, Hasan, Da\\\'if), and narrators critique rules.' }
      ],
      books: [
        { title: 'Matn Abi Shuja (Al-Ghayah wa al-Taqrib)', author: 'Al-Qadi Abu Shuja al-Shafi\\\'i', desc: 'The standard authorized primer for Shafi\\\'i jurisprudence, outlining all main areas of law.' },
        { title: 'Al-Aqidah al-Tahawiyyah', author: 'Imam Abu Ja\\\'far al-Tahawi', desc: 'A clear exposition of the creed of orthodox Sunni Islam agreed upon by early generations.' },
        { title: 'Al-Arba\\\'in al-Nawawiyyah', author: 'Imam Yahya ibn Sharaf al-Nawawi', desc: 'Forty-two pivotal Hadiths that form the foundation of Islamic law, ethics, and theology.' }
      ],
      outcomes: [
        'Understand legal rules for acts of worship and transactions based on traditional Madhab structures.',
        'Develop a balanced theological understanding aligned with Sunni orthodoxy, free from extremes.',
        'Acquire a deep understanding of the Prophet\\\'s ﷺ life and apply his guidance to daily challenges.',
        'Analyze and read classical Islamic manuscripts and reference books with proper academic guidance.'
      ],
      teachers: [
        { name: 'Dr. Mostafa Al-Najjar', title: 'Professor of Comparative Law at Al-Azhar', credentials: ['Ph.D. in Comparative Fiqh, Faculty of Shariah & Law', 'Member of Al-Azhar Fatwa Committee'], bio: 'Eminent jurist and scholar, renowned for explaining classical legal texts and solving contemporary issues.' },
        { name: 'Sheikh Hisham Muhammad', title: 'Creed & Theology Researcher', credentials: ['M.A. in Islamic Creed & Philosophy from Al-Azhar', 'Ijaza in teaching classical theology manuals'], bio: 'Passionate about explaining theological concepts and addressing contemporary philosophical doubts systematically.' }
      ],
      courses: [
        {
          image: '/images/course_fiqh.png',
          iconName: 'Scale',
          title: 'Maliki Jurisprudence (Fiqh)',
          tagline: 'Worship & Transactions',
          desc: 'Acquire Maliki jurisprudence systematically through primary manuals starting with Matn Ibn Ashir up to Matn Al-Risalah.',
          path: 'Islamic Studies',
          stats: { duration: '48 Hrs', syllabus: 'Ibn Ashir & Risalah', level: 'Academic' }
        },
        {
          image: '/images/course_aqidah.png',
          iconName: 'ShieldCheck',
          title: 'Islamic Creed (Aqidah)',
          tagline: 'Theology & Core Convictions',
          desc: 'Study authentic Sunni creed via classical texts to build sound conviction and address modern philosophy.',
          path: 'Islamic Studies',
          stats: { duration: '36 Hrs', syllabus: 'Jawharah & Nasafiyyah', level: 'Theological' }
        },
        {
          image: '/images/course_logic.png',
          iconName: 'Compass',
          title: 'Islamic Logic (Mantiq)',
          tagline: 'Tool of the Intellectual Sciences',
          desc: 'Study Al-Sullam al-Munawraq to cultivate critical reasoning, sound arguments, and understand structural definitions in scholarly literature.',
          path: 'Islamic Studies',
          stats: { duration: '30 Hrs', syllabus: 'Sullam al-Munawraq', level: 'Advanced' }
        }
      ]
    },
    kids: {
      title: 'Islamic Educational & Character Path for Kids & Youth',
      subtitle: 'Building Islamic Identity, Manners, and Quranic Literacy',
      desc: 'A comprehensive, age-appropriate educational path designed for children and teenagers (ages 5 to 18) to learn fluent Quranic reading, memorize Juz Amma, acquire Islamic manners (Adab), and discover Prophetic histories.',
      levels: [
        { num: '01', title: 'Level 1: Qaida Nuraniyyah & Accurate Reading', desc: 'Learning letter shapes, vowels, and phonics of the Quranic script to enable independent reading using Qaida Nuraniyyah.' },
        { num: '02', title: 'Level 2: Hifz Memorization of Juz Amma with Tajweed', desc: 'Memorizing the short chapters of the Quran with correct pronunciation and basic Tajweed rules.' },
        { num: '03', title: 'Level 3: Islamic Adab Manners & Daily Prayers', desc: 'Learning daily supplications (Duas), details of ablution and prayer, and ethical values such as honesty and respect.' },
        { num: '04', title: 'Level 4: Stories of the Prophets & Companion Biographies', desc: 'Discovering stories of the Prophets from the Quran and the lives of the Companions to build a proud Islamic identity.' }
      ],
      books: [
        { title: 'The Qaida Nuraniyyah Phonics Method', author: 'Sheikh Nur Muhammad Haqqani', desc: 'The most popular and successful method for teaching children accurate pronunciation and reading of the Quranic script.' },
        { title: 'Islamic Manners for Young Muslims', author: 'Al-Azhar Educational Publications', desc: 'An illustrated, interactive guide explaining daily sunnahs and moral values for children.' },
        { title: 'Stories of the Prophets for Children', author: 'Academy Certified Curriculum', desc: 'Engaging stories highlighting the lives of the Prophets, linking narratives with moral lessons.' }
      ],
      outcomes: [
        'Read words and sentences directly from the Quranic script independently.',
        'Memorize Juz Amma completely with basic Tajweed and correct articulation.',
        'Perform daily prayers and ablutions correctly and recite morning and evening supplications.',
        'Demonstrate noble Islamic ethics in interaction with family, peers, and society.'
      ],
      teachers: [
        { name: 'Ustadh Muhammad Dawood', title: 'Youth Educator & Quran Instructor', credentials: ['B.A. in Islamic Studies & Arabic, Al-Azhar University', 'Diploma in Child Psychology & Development'], bio: 'Specialized in interactive, engaging, and game-based lessons that inspire children to love the Quran.' },
        { name: 'Ustadha Shaimaa Al-Hawari', title: 'Early Years Quran Teacher', credentials: ['Ijaza in Hafs from Asim recitation', 'B.A. in Early Childhood Education, Cairo University'], bio: 'Expert in children\\\'s Quran memorization with over 8 years of experience teaching articulation using stories.' }
      ],
      courses: [
        {
          image: '/images/article_kids.png',
          iconName: 'BookOpen',
          title: 'Qaida Nuraniyyah & Phonics',
          tagline: 'First Step to Accurate Reading',
          desc: 'Learn letter shapes, vowels, and phonics of the Arabic script to enable independent and fluent Quranic reading using the Qaida Nuraniyyah.',
          path: 'Youth & Kids Path',
          stats: { duration: '24 Hrs', syllabus: 'Qaida Nuraniyyah', level: 'Beginner' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'Book',
          title: 'Juz Amma Memorization',
          tagline: 'Hifz & Basic Tajweed',
          desc: 'Systematic memorization of short chapters with correct pronunciation, active revision sessions, and kid-friendly explanations.',
          path: 'Youth & Kids Path',
          stats: { duration: '32 Hrs', syllabus: 'Juz Amma', level: 'Core' }
        },
        {
          image: '/images/course_fiqh.png',
          iconName: 'Award',
          title: 'Islamic Manners & Ethics',
          tagline: 'Islamic Character & Manners',
          desc: 'Nurturing Prophetic manners (Adab), daily supplications (Duas), basic rulings of prayers, and inspiring ethical stories.',
          path: 'Youth & Kids Path',
          stats: { duration: '28 Hrs', syllabus: 'Islamic Adab', level: 'Character' }
        }
      ]
    }
  },
  fr: {
    quran: {
      title: 'Sciences du Coran & Tajwid Académique Appliqué',
      subtitle: 'Transmission et Maîtrise de la Récitation via un Isnad Connecté',
      desc: 'Un parcours universitaire complet conçu pour maîtriser l\\\'articulation des lettres arabes (Makharij), comprendre les règles théoriques et pratiques du Tajwid, mémoriser le Coran (Hifz) et obtenir une Ijaza avec une chaîne de transmission (Isnad) remontant au Prophète ﷺ sous la direction de savants agréés.',
      levels: [
        { num: '01', title: 'Niveau 1 : Correction Phonétique & Articulation des Makharij', desc: 'Correction ciblée de l\\\'articulation des lettres arabes, des voyelles et de la prononciation phonétique primaire du texte coranique.' },
        { num: '02', title: 'Niveau 2 : Règles Pratiques & Théoriques du Tajwid', desc: 'Étude détaillée des règles du Noun et Mim Sakinah, des prolongations (Madd), des arrêts et reprises lors de la récitation.' },
        { num: '03', title: 'Niveau 3 : Hifz Mémorisation & Consolidation', desc: 'Programmes de mémorisation structurés adaptés aux objectifs de l\\\'étudiant, utilisant des cycles de révision active.' },
        { num: '04', title: 'Niveau 4 : Voie de l\\\'Ijaza & Isnad Connecté au Prophète ﷺ', desc: 'Récitation de l\\\'intégralité du Coran de mémoire pour obtenir une Ijaza autorisée en Hafs d\\\'Asim, Warsh de Nafi\\\' ou les dix lectures.' }
      ],
      books: [
        { title: 'Tuhfat al-Atfal wa al-Ghilman', author: 'Imam Sulayman al-Jamzuri', desc: 'Un texte poétique classique résumant les règles de base du Tajwid.' },
        { title: 'Al-Muqaddimah al-Jazariyyah', author: 'Imam Ibn al-Jazari', desc: 'Le texte poétique fondamental sur le Tajwid, axé sur les points d\\\'articulation pour les étudiants avancés.' },
        { title: 'Le Coran selon la Récitation Hafs d\\\'Asim', author: 'Via la voie de la Shatibiyyah', desc: 'La récitation standard étudiée avec ses paramètres de performance spécifiques.' }
      ],
      outcomes: [
        'Articuler chaque lettre arabe avec précision à partir de son point d\\\'émission exact.',
        'Appliquer les règles du Tajwid de manière fluide pendant la récitation.',
        'Mémoriser les sections choisies du Coran avec un rappel sécurisé à long terme.',
        'Comprendre les critères académiques des récitations mutawatir et des exigences de l\\\'Ijaza.'
      ],
      teachers: [
        { name: 'Sheikh Ahmed Mahmoud Al-Azhari', title: 'Maître de récitation & savant détenteur d\\\'Ijaza', credentials: ['Ijaza dans les Dix Lectures Mineures & Majeures', 'Licence en Sciences du Coran de l\\\'Université d\\\'Al-Azhar'], bio: 'Spécialiste de la correction de l\\\'articulation et de la transmission du texte coranique avec plus de 15 ans d\\\'expérience.' },
        { name: 'Ustadha Fatima Al-Zahra', title: 'Instructrice de Récitation pour Femmes & Enfants', credentials: ['Ijaza en Hafs et Warsh', 'Licence en Études Islamiques & Éducation'], bio: 'Connue pour son approche pédagogique patiente pour l\\\'enseignement du Tajwid et la consolidation du Hifz.' }
      ],
      courses: [
        {
          image: '/images/course_quran.png',
          iconName: 'Award',
          title: 'Coran & Tajwid',
          tagline: 'La Fondation Ultime',
          desc: 'Apprenez la récitation et la mémorisation du Coran sous Isnad avec une mise en pratique rigoureuse des règles du Tajwid.',
          path: 'Parcours Coran',
          stats: { duration: '40 h', syllabus: '2 Récitations', level: 'Base' }
        },
        {
          image: '/images/article_qiraat.png',
          iconName: 'BookOpen',
          title: 'Études des Dix Lectures (Qira\\\'at)',
          tagline: 'Transmission par Isnad Traditionnel',
          desc: 'Étude approfondie des règles des dix récitations canoniques (Qira\\\'at) avec préparation pratique à l\\\'obtention de l\\\'Ijaza.',
          path: 'Parcours Coran',
          stats: { duration: '60 h', syllabus: 'Shatibiyyah & Durrah', level: 'Expert' }
        }
      ]
    },
    arabic: {
      title: 'Linguistique Arabe Classique & Sciences Littéraires',
      subtitle: 'Grammaire Arabe (Nahw), Morphologie (Sarf) et Rhétorique (Balaghah)',
      desc: 'Un parcours académique structuré conçu pour ancrer les étudiants dans les sciences de la langue arabe. Couvre la grammaire, la syntaxe, la dérivation morphologique et la rhétorique, de l\\\'apprentissage des bases à la maîtrise avancée.',
      levels: [
        { num: '01', title: 'Niveau 1 : Vocabulaire Fondamental & Expression', desc: 'Construction du vocabulaire de base, pratique de l\\\'expression orale et écrite, et apprentissage de la lecture.' },
        { num: '02', title: 'Niveau 2 : Grammaire Arabe (Nahw) & Syntaxe', desc: 'Étude de la phrase nominale et verbale, des cas de déclinaison (I\\\'rab) et application aux textes classiques.' },
        { num: '03', title: 'Niveau 3 : Morphologie (Sarf) & Dérivation des Mots', desc: 'Compréhension de la structure des mots, de la conjugaison des verbes et de la dérivation des noms.' },
        { num: '04', title: 'Niveau 4 : Rhétorique Balaghah & Littérature Classique', desc: 'Étude de l\\\'éloquence (Bayan), des sens (Ma\\\'ani) et de l\\\'ornementation (Badi\\') dans la prose classique.' }
      ],
      books: [
        { title: 'Al-Ajrumiyyah en Grammaire Arabe', author: 'Imam Ibn Adjurrum al-Sanhaji', desc: 'Le premier manuel classique pour aborder les règles de syntaxe et d\\\'analyse grammaticale (I\\\'rab).' },
        { title: 'Qatr al-Nada wa Ball al-Sada', author: 'Imam Ibn Hisham al-Ansari', desc: 'Un texte de grammaire intermédiaire qui approfondit les règles de syntaxe.' },
        { title: 'Al-Arabiyyah Bayna Yadayk', author: 'Un panel de linguistes', desc: 'Le programme moderne le plus efficace pour développer les compétences de communication pour les non-francophones.' }
      ],
      outcomes: [
        'Communiquer couramment en arabe classique formel.',
        'Analyser grammaticalement les phrases complexes du Coran et de la poésie classique.',
        'Dériver et conjuguer les mots arabes à travers divers tableaux morphologiques.',
        'Comprendre les secrets de la rhétorique coranique.'
      ],
      teachers: [
        { name: 'Dr. Yasser Abd Al-Rahman', title: 'Professeur de linguistique à l\\\'Université d\\\'Al-Azhar', credentials: ['Doctorat en langue et littérature arabes d\\\'Al-Azhar', 'Membre de l\\\'Association de linguistique arabe'], bio: 'Expert des textes de grammaire classique avec plusieurs publications académiques.' },
        { name: 'Ustadh Mahmoud Al-Shafi\\\'i', title: 'Instructeur d\\\'arabe pour non-arabophones', credentials: ['Master en enseignement de l\\\'arabe langue étrangère', 'Licence en langue arabe'], bio: 'Spécialisé dans l\\\'utilisation de méthodes interactives pour enseigner la conversation.' }
      ],
      courses: [
        {
          image: '/images/course_arabic.png',
          iconName: 'Languages',
          title: 'Grammaire & Morphologie',
          tagline: 'Clé des Textes Sacrés',
          desc: 'Maîtrisez la syntaxe (Ajurrumiyyah, Qatr al-Nada) et la conjugaison (Matn al-Bina) pour comprendre la structure de la langue.',
          path: 'Linguistique Arabe',
          stats: { duration: '50 h', syllabus: 'Ajurrumiyyah & Bina', level: 'Clé' }
        },
        {
          image: '/images/course_literature.png',
          iconName: 'Feather',
          title: 'Littérature & Rhétorique',
          tagline: 'Esthétique de la Langue Arabe',
          desc: 'Goûtez à l\\\'éloquence (Balagha) du Coran et étudiez les grands poèmes préislamiques pour cultiver votre style.',
          path: 'Linguistique Arabe',
          stats: { duration: '45 h', syllabus: 'Mu’allaqat & Rhétorique', level: 'Littéraire' }
        }
      ]
    },
    islamic: {
      title: 'Études Islamiques & Sciences de la Shariah',
      subtitle: 'Jurisprudence (Fiqh), Dogme (Aqidah) et Introduction aux Sciences du Hadith',
      desc: 'Construisez une compréhension solide et traditionnelle de la Shariah à travers l\\\'étude structurée de la jurisprudence (Fiqh) selon les quatre écoles, de la théologie sunnite (Aqidah), de la biographie prophétique et du Hadith.',
      levels: [
        { num: '01', title: 'Niveau 1 : Jurisprudence du Culte & Dogme de Base', desc: 'Règles de purification, de prière, de jeûne, de charité et de pèlerinage selon le Madhab choisi.' },
        { num: '02', title: 'Niveau 2 : Biographie Prophétique (Seerah) & Éthique', desc: 'Étude de la vie du Prophète ﷺ, analyse de ses traits de caractère (Shama\\\'il) et morale islamique.' },
        { num: '03', title: 'Niveau 3 : Usul al-Fiqh & Fondements de la Loi', desc: 'Méthodologie d\\\'extraction des règles à partir du Coran, de la Sunnah, du consensus et de l\\\'analogie.' },
        { num: '04', title: 'Niveau 4 : Sciences du Hadith & Terminologie (Mustalah)', desc: 'Compréhension des méthodes de validation du Hadith, classification (Sahih, Hasan, Da\\\'if).' }
      ],
      books: [
        { title: 'Matn Abi Shuja', author: 'Al-Qadi Abu Shuja al-Shafi\\\'i', desc: 'Le manuel standard pour la jurisprudence shafi\\\'ite, décrivant tous les domaines de la loi.' },
        { title: 'Al-Aqidah al-Tahawiyyah', author: 'Imam Abu Ja\\\'far al-Tahawi', desc: 'Une exposition claire de la théologie islamique sunnite orthodoxe.' },
        { title: 'Al-Arba\\\'in al-Nawawiyyah', author: 'Imam Al-Nawawi', desc: 'Quarante-deux hadiths fondamentaux qui forment le cœur de l\\\'éthique et de la théologie.' }
      ],
      outcomes: [
        'Comprendre les règles légales de base selon les structures traditionnelles des Madhabs.',
        'Développer une compréhension théologique équilibrée, conforme à l\\\'orthodoxie sunnite.',
        'Mieux connaître la vie du Prophète ﷺ pour appliquer ses enseignements au quotidien.',
        'Lire les manuscrits islamiques classiques avec l\\\'aide de nos enseignants.'
      ],
      teachers: [
        { name: 'Dr. Mostafa Al-Najjar', title: 'Professeur de droit comparé à Al-Azhar', credentials: ['Doctorat en Fiqh Comparé, Faculté de Shariah', 'Membre du comité de Fatwa d\\\'Al-Azhar'], bio: 'Éminent juriste et savant, connu pour expliquer les textes juridiques classiques.' },
        { name: 'Sheikh Hisham Muhammad', title: 'Chercheur en théologie et dogme', credentials: ['Master en théologie et philosophie d\\\'Al-Azhar', 'Autorisation d\\\'enseigner les manuels de théologie'], bio: 'Passionné par la simplification des concepts théologiques et l\\\'explication des textes classiques.' }
      ],
      courses: [
        {
          image: '/images/course_fiqh.png',
          iconName: 'Scale',
          title: 'Jurisprudence Malikite (Fiqh)',
          tagline: 'Pratique & Transactions',
          desc: 'Étudiez les bases de la jurisprudence de l\\\'école malikite à travers les textes de référence, du Matn Ibn Ashir à la Risalah.',
          path: 'Sciences Islamiques',
          stats: { duration: '48 h', syllabus: 'Ibn Ashir & Risalah', level: 'Académique' }
        },
        {
          image: '/images/course_aqidah.png',
          iconName: 'ShieldCheck',
          title: 'Dogme Islamique (Aqida)',
          tagline: 'Théologie & Conviction Pure',
          desc: 'Assimilez la croyance sunnite authentique à travers les textes classiques pour solidifier votre foi.',
          path: 'Sciences Islamiques',
          stats: { duration: '36 h', syllabus: 'Jawharah & Nasafiyyah', level: 'Dogmatique' }
        },
        {
          image: '/images/course_logic.png',
          iconName: 'Compass',
          title: 'Logique Islamique (Mantiq)',
          tagline: 'Outil des Sciences Scolastiques',
          desc: 'Étudiez le Sullam al-Munawraq pour développer votre raisonnement déductif, construire des arguments valides et comprendre la terminologie.',
          path: 'Sciences Islamiques',
          stats: { duration: '30 h', syllabus: 'Sullam al-Munawraq', level: 'Avancé' }
        }
      ]
    },
    kids: {
      title: 'Parcours Éducatif & Spirituel pour Enfants & Jeunes',
      subtitle: 'Construction de l\\\'Identité Islamique, de la Morale et de la Lecture',
      desc: 'Un parcours complet et adapté à l\\\'âge des enfants (de 5 à 18 ans) pour apprendre à lire le Coran couramment, mémoriser le Juz Amma, acquérir le bon comportement (Adab) et découvrir les histoires des Prophètes.',
      levels: [
        { num: '01', title: 'Niveau 1 : Qaida Nuraniyyah & Lecture Correcte', desc: 'Apprentissage de l\\\'écriture coranique, de la phonétique et de la lecture fluide avec la méthode Qaida Nuraniyyah.' },
        { num: '02', title: 'Niveau 2 : Mémorisation du Juz Amma avec Tajwid', desc: 'Mémorisation des chapitres courts du Coran avec une prononciation correcte et le respect du Tajwid.' },
        { num: '03', title: 'Niveau 3 : Comportement (Adab) & Prières Quotidiennes', desc: 'Apprentissage des invocations, de la prière et des valeurs telles que l\\\'honnêteté et le respect.' },
        { num: '04', title: 'Niveau 4 : Histoires des Prophètes & Vies des Compagnons', desc: 'Découverte des histoires des Prophètes à partir du Coran pour construire une identité islamique forte.' }
      ],
      books: [
        { title: 'La méthode phonétique Qaida Nuraniyyah', author: 'Sheikh Nur Muhammad Haqqani', desc: 'La méthode la plus reconnue pour apprendre aux enfants la prononciation exacte du Coran.' },
        { title: 'Le livre du comportement pour les jeunes', author: 'Publications éducatives d\\\'Al-Azhar', desc: 'Un guide illustré expliquant les sunnahs quotidiennes et les valeurs morales pour les enfants.' },
        { title: 'Histoires des Prophètes pour les enfants', author: 'Programme certifié de l\\\'académie', desc: 'Récits captivants de la vie des Prophètes, reliant les histoires à des leçons pratiques.' }
      ],
      outcomes: [
        'Lire des mots et des phrases directement du Coran de manière autonome.',
        'Mémoriser le Juz Amma avec les règles de base du Tajwid.',
        'Accomplir les prières quotidiennes de manière correcte.',
        'Démontrer des comportements éthiques nobles envers l\\\'entourage.'
      ],
      teachers: [
        { name: 'Ustadh Muhammad Dawood', title: 'Éducateur de la jeunesse & enseignant de Coran', credentials: ['Diplôme en psychologie et développement de l\\\'enfant', 'Licence en éducation d\\\'Al-Azhar'], bio: 'Spécialisé dans les cours interactifs et ludiques qui incitent les enfants à aimer le Coran.' },
        { name: 'Ustadha Shaimaa Al-Hawari', title: 'Enseignante de Coran pour jeunes enfants', credentials: ['Autorisation (Ijaza) de récitation', 'Licence en éducation de la petite enfance'], bio: 'Experte en mémorisation du Coran pour enfants, combinant jeux et récits.' }
      ],
      courses: [
        {
          image: '/images/article_kids.png',
          iconName: 'BookOpen',
          title: 'Qaida Nuraniyyah & Lecture',
          tagline: 'Premier Pas vers la Lecture',
          desc: 'Apprentissage de l\\\'écriture coranique, de la phonétique et de la lecture fluide du Coran avec la méthode Qaida Nuraniyyah.',
          path: 'Parcours Jeunesse',
          stats: { duration: '24 h', syllabus: 'Qaida Nuraniyyah', level: 'Débutant' }
        },
        {
          image: '/images/course_quran.png',
          iconName: 'Book',
          title: 'Mémorisation du Juz Amma',
          tagline: 'Mémorisation & Tajwid Simple',
          desc: 'Mémorisation des chapitres courts du Coran avec une prononciation correcte et le respect des règles de base du Tajwid.',
          path: 'Parcours Jeunesse',
          stats: { duration: '32 h', syllabus: 'Juz Amma', level: 'Base' }
        },
        {
          image: '/images/course_fiqh.png',
          iconName: 'Award',
          title: 'Comportement & Prières',
          tagline: 'Caractère & Morale Islamique',
          desc: 'Enseignement des comportements de base, des invocations quotidiennes, de la prière et des récits inspirants des Prophètes.',
          path: 'Parcours Jeunesse',
          stats: { duration: '28 h', syllabus: 'Adab & Culte', level: 'Éducatif' }
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
    transition: { staggerChildren: 0.1 }
  }
};

export default function ProgramsPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [selectedTrack, setSelectedTrack] = useState('quran');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
        { q: 'Puis-je étudier l\\\'arabe et le Coran en même temps ?', a: 'Oui, tout à fait. L\\\'académie permet de concevoir des emplois du temps sur mesure combinant cours de Tajwid et cours d\\\'arabe, étudiés soit durant la même session, soit répartis en alternance.' },
        { q: 'Comment se déroulent l\\\'évaluation et les cours individuels ?', a: 'Tous nos cours sont dispensés en privé 1-à-1 sur Zoom. Le parcours débute par un cours d\\\'essai gratuit de 30 minutes au cours duquel l\\\'enseignant évalue votre niveau et conçoit votre programme.' },
        { q: 'L\\\'académie délivre-t-elle des certificats de réussite ?', a: 'Oui. L\\\'académie délivre un certificat officiel de fin d\\\'études signé à la fin de chaque niveau, après réussite de l\\\'examen d\\\'évaluation.' },
        { q: 'Comment fonctionne le processus d\\\'obtention de l\\\'Ijaza ?', a: 'L\\\'étudiant suit un programme intensif de mémorisation et de Tajwid. Après mémorisation complète, il récite l\\\'intégralité du Coran de mémoire devant un Sheikh certifié pour obtenir son Ijaza avec Isnad.' },
        { q: 'Les manuels sont-ils adaptés aux débutants et aux enfants ?', a: 'Oui, le parcours jeunesse est conçu spécifiquement pour les enfants dès 5 ans, utilisant la méthode Qaida Nuraniyyah et des supports illustrés.' },
        { q: 'Quelles écoles de jurisprudence sont enseignées en sciences islamiques ?', a: 'Nous enseignons le Fiqh selon les quatre écoles orthodoxes (Malikite, Chafiite, Hanafite, Hanbalite) selon le choix de l\\\'étudiant.' }
      ];
    } else {
      return [
        { q: 'Can I study Arabic and the Quran simultaneously?', a: 'Yes, absolutely. The academy allows designing customized schedules combining Tajweed and Arabic classes, studied either during the same session or split across alternating days of the week.' },
        { q: 'How do the assessment and the 1-on-1 private sessions work?', a: 'All our classes are taught privately 1-on-1 via Zoom. The journey starts with a 30-minute free trial evaluation class where a scholar assesses your level and drafts your study plan.' },
        { q: 'Does the academy provide completion certificates?', a: 'Yes. The academy awards an official certificate of completion signed by the academic board upon passing the assessment exam at the end of each level.' },
        { q: 'How does the Hifz consolidation and Ijaza process work?', a: 'The student undergoes a structured prep program. Once memorization is secure, they recite the entire Quran from memory to a certified Sheikh to receive their authorized Ijaza with Isnad.' },
        { q: 'Are the textbooks suitable for beginners and young children?', a: 'Yes, the youth path is designed specifically for children from age 5, using the Qaida Nuraniyyah method and illustrated guides to make learning engaging.' },
        { q: 'Which schools of jurisprudence (Fiqh) are taught in Shariah classes?', a: 'We teach jurisprudence according to the four orthodox Sunni schools (Maliki, Shafi\\\'i, Hanafi, Hanbali), depending on the student\\\'s preference.' }
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
        btnBook: 'احجز حصتك التجريبية الآن',
        ctaTitle: 'ابدأ رحلة التلقي وضبط الأداء اليوم',
        ctaDesc: 'اختر مسارك الأكاديمي، وحدد أوقاتك المفضلة، وابدأ رحلتك الفردية مع علماء الأزهر الشريف بمستوى الترا برميم تفاعلي.',
        levelsHeader: 'المستويات المنهجية الأربعة',
        booksHeader: 'المتون والكتب المقررة للتدريس',
        outcomesHeader: 'مخرجات التعلم والكفاءة المكتسبة',
        teachersHeader: 'العلماء المتخصصون المشرفون على المسار',
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
        title: 'Système d\\\'Enseignement Traditionnel & Moderne',
        subtitle: 'Parcours d\\\'apprentissage privés et personnalisés conçus pour maîtriser la langue arabe, le Coran et les sciences de la Shariah.',
        faqTitle: 'Questions Académiques & Méthodologiques',
        faqSubtitle: 'Tout ce que vous devez savoir sur le système d\\\'études, les examens et les certificats.',
        btnContact: 'Réserver l\\\'évaluation & Contacter',
        btnBlog: 'Lire les articles de recherche',
        btnBook: 'Réserver Mon Cours d\\\'Essai',
        ctaTitle: 'Commencez Votre Apprentissage Dès Aujourd\\\'hui',
        ctaDesc: 'Choisissez votre parcours, définissez vos horaires et commencez vos cours particuliers avec des savants d\\\'Al-Azhar.',
        levelsHeader: 'Les 4 Niveaux du Programme',
        booksHeader: 'Textes & Manuels d\\\'Études Officiels',
        outcomesHeader: 'Compétences & Objectifs Acquis',
        teachersHeader: 'Savants & Enseignants Spécialisés',
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
        btnBook: 'Schedule Free Trial Session',
        ctaTitle: 'Begin Your Path of Traditional Study Today',
        ctaDesc: 'Choose your academic path, select your preferred hours, and start your private study with Al-Azhar graduate scholars.',
        levelsHeader: 'The 4 Developmental Levels',
        booksHeader: 'Prescribed Classical Textbooks',
        outcomesHeader: 'Expected Learning Outcomes',
        teachersHeader: 'Specialized Scholars & Faculty Board',
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
    return ACADEMIC_DATABASE[locale]?.[selectedTrack] || ACADEMIC_DATABASE.en[selectedTrack];
  }, [locale, selectedTrack]);

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
            {Object.entries(labels.tabs).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setSelectedTrack(key)}
                className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedTrack === key
                    ? 'bg-navy text-parchment shadow-md shadow-navy/15 scale-105'
                    : 'bg-white text-stone/80 border border-gold-muted/15 hover:border-gold/30 hover:text-midnight shadow-sm shadow-midnight/2'
                } ${isRtl ? 'font-cairo' : 'font-dm'}`}
              >
                {name}
              </button>
            ))}
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

              {/* Part B: Individual Track Courses Grid */}
              <div className="space-y-10">
                <div className="flex items-center gap-3 border-b border-gold-muted/15 pb-4">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <h3 className={`text-lg md:text-xl text-midnight font-bold uppercase tracking-wider ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                    {isRtl ? 'المقررات والدروس التفصيلية للمسار' : locale === 'fr' ? 'Cours & Programmes du Parcours' : 'Detailed Track Courses & Syllabus'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeTrackData.courses.map((course, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-3xl p-0 shadow-[0_8px_30px_rgba(139,115,85,0.1)] hover:border-gold hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(139,115,85,0.18)] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
                    >
                      {/* Top Accent Gold Bar */}
                      <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                      {/* Watermark in background */}
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[url('/images/pattern-8star.svg')] bg-contain bg-no-repeat opacity-[0.015] group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none filter sepia hue-rotate-15 brightness-95" />

                      <div>
                        {/* Course Header Image Frame */}
                        <div className="relative h-48 w-full overflow-hidden rounded-t-[1.4rem]">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/20 to-transparent pointer-events-none" />
                          
                          {/* Badge Overlay */}
                          <span className={`absolute top-4 left-4 rtl:left-auto rtl:right-4 text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-gold-muted/30 bg-midnight/80 backdrop-blur-sm text-gold-hi font-dm z-10`}>
                            {course.path}
                          </span>
                        </div>

                        {/* Card Content wrapper */}
                        <div className="p-6 md:p-8 text-start">
                          {/* Icon & Title row */}
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className={`text-[1.3rem] text-midnight font-bold leading-snug group-hover:text-gold-hi transition-colors duration-300 ${
                              isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                            }`}>
                              {course.title}
                            </h3>
                            <div className="p-2 bg-gold-muted/10 rounded-xl border border-gold/15 text-gold-hi transition-colors duration-300 shrink-0">
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
                          <p className={`text-stone/85 text-xs md:text-sm leading-relaxed mb-6 ${
                            isRtl ? 'font-noto' : 'font-lora'
                          }`}>
                            {course.desc}
                          </p>

                          {/* Syllabus Stats Metadata Section */}
                          <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gold-muted/15 text-center bg-[#FDFAF3]/30 rounded-xl">
                            <div className="space-y-1">
                              <span className="block text-[9px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                                {isRtl ? 'المدة' : locale === 'fr' ? 'Durée' : 'Duration'}
                              </span>
                              <span className={`block text-xs text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                                {course.stats.duration}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <span className="block text-[9px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                                {isRtl ? 'المقرر' : locale === 'fr' ? 'Manuel' : 'Syllabus'}
                              </span>
                              <span className={`block text-xs text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                                {course.stats.syllabus}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <span className="block text-[9px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                                {isRtl ? 'المستوى' : locale === 'fr' ? 'Niveau' : 'Level'}
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
                          href={`/${locale}/book?topic=${course.title}`}
                          className={`text-[11px] uppercase tracking-widest font-bold text-stone hover:text-gold transition-colors duration-300 inline-flex items-center gap-1.5 ${
                            isRtl ? 'font-cairo' : 'font-dm'
                          }`}
                        >
                          <span>{isRtl ? 'احجز حصة تجريبية مجانية' : locale === 'fr' ? 'Réserver un cours gratuit' : 'Book a Free Trial Session'}</span>
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

                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Part C: Timeline of Academic Levels */}
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

              {/* Part D: Prescribed Books & Primers */}
              <div>
                <div className="flex items-center gap-3 mb-10 border-b border-gold-muted/15 pb-4">
                  <Book className="w-5 h-5 text-gold" />
                  <h3 className={`text-lg md:text-xl text-midnight font-bold uppercase tracking-wider ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                    {labels.booksHeader}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {activeTrackData.books.map((book) => (
                    <div
                      key={book.title}
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Part E: Outcomes and Scholars Panel */}
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
                      <div key={idx} className="flex items-start gap-3 text-start">
                        <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                        <span className={`text-xs text-stone/70 leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                          {out}
                        </span>
                      </div>
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
                    {activeTrackData.teachers.map((teach) => (
                      <div key={teach.name} className="flex gap-4 items-start text-start group">
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
                      </div>
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
"""

with open("app/[locale]/programs/page.tsx", "w", encoding="utf-8") as f:
    f.write(code_content)

print("SUCCESSFULLY OVERWROTE PAGE.TSX")
