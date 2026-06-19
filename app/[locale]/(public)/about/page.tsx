'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import ParallaxBackground from '@/components/ui/ParallaxBackground';
import { 
  BookOpen, 
  ShieldCheck, 
  Award, 
  Languages, 
  CheckCircle2, 
  Quote, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Compass,
  Scroll,
  UserCheck
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

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

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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

export default function AboutPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const content = {
    ar: {
      hero: {
        tag: 'أكاديمية تبيان — الأثر والأصالة الأكاديمية',
        title: 'عن الأكاديمية',
        subtitle: 'صرح تعليمي عالمي يربط أصالة الإسناد ووقار التلقي بأحدث مناهج التخصيص والتمكين الفردي',
        verse: '﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾',
        verseSource: 'سورة النحل — الآية 89'
      },
      philosophy: {
        title: 'فلسفتنا التعليمية والتربوية',
        subtitle: 'المشافهة والسماع كأساس لرسوخ المعرفة وضبط الفهم',
        text: 'نؤمن في أكاديمية تبيان بأن العلوم الشرعية واللغة العربية والقرآن الكريم إرث مبارك يؤخذ بالتلقي المباشر مشافهة وسماعاً عن أهل العلم المتخصصين الموثوقين، ولا يكتفى فيه بالدراسات النظرية الجافة أو التسجيلات العشوائية. من هنا تنطلق رسالتنا لإعادة إحياء منهجية السند المتصل، بالجمع بين الإتقان المنهجي والمرونة التقنية المعاصرة.',
        logoSubtitle: 'منهج الأزهر الشريف الوسطي'
      },
      story: {
        title: 'قصتنا ونشأتنا',
        tag: 'مسيرتنا العلمية',
        text1: 'تأسست أكاديمية تبيان لتكون الجسر المعرفي الأصيل والآمن الواصل بين حواضر العلم الإسلامي العريقة والمسلمين في شتى بقاع الأرض، لا سيما العائلات والمغتربين والناطقين بلغات متعددة. بدأت فكرتنا من استشعار الحاجة لتعليم فردي رصين يحاكي مجالس العلماء التقليدية في مساجد القاهرة وحواضر الشام، ولكن بأسلوب تفاعلي يواكب متطلبات العصر الرقمي.',
        text2: 'منذ انطلاقنا، ركزنا على التلقي المباشر مشافهة وسماعاً كخيار لا بديل عنه. وتطورت الأكاديمية لتخدم اليوم طلاباً من أكثر من 32 دولة، يجمعهم السعي لتحصيل العلم النافع والقرآن الكريم بسند متصل على يد نخبة من علماء الأزهر الشريف المعتمدين.'
      },
      mission: {
        title: 'رسالتنا وأهدافنا الأكاديمية',
        tag: 'رسالتنا العلمية',
        intro: 'نسعى في تبيان لتوفير تعليم إسلامي ولغوي متميز للمسلمين في مختلف أنحاء العالم، يجمع بين الرصانة العلمية العتيقة والتعليم الشخصي الدقيق، لبناء جيل يفهم دينه ولغته فهماً عميقاً قائماً على التلقي الصحيح والأصيل.',
        points: [
          {
            title: 'إحياء منهجية التلقي والأثر',
            desc: 'ربط الطالب بالسند المتصل لرسول الله ﷺ وتنمية ملكته العلمية بدراسة المتون وشروحها المعتمدة.'
          },
          {
            title: 'تيسير العلم للناطقين بغير العربية',
            desc: 'تقديم الشروحات الدقيقة باللغات الإنجليزية والفرنسية لتبسيط الفهم وإزالة الحواجز اللغوية.'
          },
          {
            title: 'بناء الشخصية الإسلامية الوسطية',
            desc: 'ترسيخ قيم الاعتدال والوسطية المستمدة من منهج الأزهر الشريف، بعيداً عن الغلو والتقصير.'
          }
        ]
      },
      pillars: {
        tag: 'ركائز المنهج والتلقي',
        title: 'أركان التميز والريادة العلمية',
        subtitle: 'تقوم الأكاديمية على أربعة أركان أساسية تضمن الحفاظ على أصالة المحتوى وجودة المخرج التعليمي.',
        items: [
          {
            title: 'إسناد متصل بالسند الشريف',
            desc: 'تلقّي القرآن الكريم والعلوم اللغوية والشرعية بسلاسل إسناد متصلة إلى النبي ﷺ والمصنفين الأوائل، تحت إشراف علماء مجازين.',
            icon: BookOpen
          },
          {
            title: 'التعليم الفردي المباشر',
            desc: 'تخصيص كامل لوقت الحصة ومتابعة مباشرة دقيقة تناسب وتيرة الطالب ومستواه التعليمي لتحقيق أقصى استيعاب وضبط.',
            icon: Sparkles
          },
          {
            title: 'هيئة تدريس أزهرية معتمدة',
            desc: 'أكاديميون وعلماء خريجو جامعة الأزهر والمؤسسات العريقة، تم اختيارهم بعناية فائقة لضمان الكفاءة العلمية والمهارة التربوية.',
            icon: ShieldCheck
          },
          {
            title: 'التواصل اللغوي التفاعلي',
            desc: 'علماء متمكنون يتحدثون العربية والإنجليزية والفرنسية بطلاقة، مما يسهل نقل المفاهيم الدقيقة بوضوح تام دون عوائق لغوية.',
            icon: Languages
          }
        ]
      },
      vetting: {
        tag: 'معايير الجودة والاعتماد',
        title: 'منهجية الفرز والاعتماد الأكاديمي لمعلمينا',
        subtitle: 'لحماية العملية التعليمية وضمان موثوقية التحصيل، يمر المتقدم للتدريس في تبيان بأربع مراحل تدقيق صارمة:',
        steps: [
          {
            number: '01',
            title: 'التحقق الأكاديمي والشهادات',
            desc: 'مراجعة الشهادات العلمية للمتقدم والتأكد من تخرجه من كليات الأزهر الشريف (الشريعة، اللغة العربية، أصول الدين، القراءات).'
          },
          {
            number: '02',
            title: 'اختبار الإجازات والرواية',
            desc: 'تقوم لجنة علمية متخصصة باختبار سند المدرس في الحفظ والتجويد وجودة القراءة، للتأكد من صحة التلقي والإجازات الحاصل عليها.'
          },
          {
            number: '03',
            title: 'التدقيق اللغوي والثقافي',
            desc: 'فحص مهارات التواصل باللغة الإنجليزية أو الفرنسية، للتأكد من قدرته على تبسيط المفاهيم المعقدة للمسلمين المغتربين والناطقين بغير العربية.'
          },
          {
            number: '04',
            title: 'الاختبار العملي والتدريب التربوي',
            desc: 'إجراء حصص محاكاة عملية لتقييم المهارات التدريسية والتأكد من توافق أسلوب المعلم مع المنهج التربوي الوسطي للأكاديمية.'
          }
        ]
      },
      quote: {
        text: '«إنَّ هَذَا العِلْمَ دِينٌ، فَانْظُرُوا عَمَّنْ تَأْخُذُونَ دِينَكُمْ»',
        author: 'الإمام التابعي محمد بن سيرين — رحمه الله'
      },
      cta: {
        title: 'ابدأ مسارك التعليمي المخصص اليوم',
        subtitle: 'احجز جلسة تقييم مجانية بالكامل للوقوف على مستواك الحالي ووضع خطتك الدراسية المخصصة مع أحد علمائنا المعتمدين.',
        btn: 'احجز جلسة تقييم مجانية الآن',
        btnCourses: 'استكشف المسارات التعليمية'
      }
    },
    en: {
      hero: {
        tag: 'Tebyan Academy — Legacy & Academic Authority',
        title: 'About the Academy',
        subtitle: 'A world-class scholarly institution preserving direct oral transmission (Talaqqi) alongside modern academic personalization.',
        verse: '﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾',
        verseSource: 'Surah An-Nahl — Verse 89'
      },
      philosophy: {
        title: 'Our Educational Philosophy',
        subtitle: 'Oral reception as the foundation for sound comprehension',
        text: 'We believe that traditional Islamic sciences, classical Arabic, and the Quran cannot be truly mastered through static textbooks or pre-recorded videos. Knowledge is a living light passed directly from the chests of verified scholars to the hearts of students. Islam Tebyan was established to preserve this golden chain of transmission (Isnad), blending rigorous scholarly methodology with the accessibility of modern technology.',
        logoSubtitle: 'Moderate Al-Azhar Scholastic Path'
      },
      story: {
        title: 'Our Story & Foundations',
        tag: 'OUR JOURNEY',
        text1: 'Islam Tebyan Academy was founded to bridge the gap between traditional centers of Islamic scholarship and Muslim families globally. Our journey began with a simple observation: while automated apps and pre-recorded videos offered convenience, they lacked the personal feedback, spiritual guidance, and phonetic correction that define classical Islamic pedagogy.',
        text2: 'We set out to recreate the classical circles of knowledge (Halaqat) in a virtual environment. Today, Tebyan serves dedicated students across 32 countries, helping them memorize the Quran with verified chains of transmission (Isnad) and study classical sciences directly under vetted Al-Azhar graduates.'
      },
      mission: {
        title: 'Our Mission & Mandate',
        tag: 'OUR MISSION',
        intro: 'Our mission is to deliver rigorous, personalized, and text-grounded Islamic and Arabic education to global seekers, preserving the sacred chain of oral transmission while utilizing interactive digital spaces to foster deep comprehension.',
        points: [
          {
            title: 'Reviving Oral Transmission (Talaqqi)',
            desc: 'Connecting students directly to verified chains of transmission (Isnad) back to the Prophet ﷺ.'
          },
          {
            title: 'Accessible Global Scholarship',
            desc: 'Explaining classical concepts in fluent English and French to eliminate language barriers.'
          },
          {
            title: 'Cultivating Scholarly Balance',
            desc: 'Instilling the balanced, moderate creed of Al-Azhar to build well-rounded Muslim identities.'
          }
        ]
      },
      pillars: {
        tag: 'METHODOLOGY PILLARS',
        title: 'Pillars of Scholarly Distinction',
        subtitle: 'Our academy is built on four core standards that protect the integrity and quality of the educational output.',
        items: [
          {
            title: 'Authentic Chains (Isnad)',
            desc: 'Study Quran recitation and classical texts with verified chains of transmission (Isnad) tracing back to the Prophet ﷺ and classical compilers.',
            icon: BookOpen
          },
          {
            title: 'Private 1-on-1 Reception',
            desc: 'Dedicated private sessions where the scholar adapts the pace, provides immediate feedback, and prioritizes your learning goals.',
            icon: Sparkles
          },
          {
            title: 'Azhari Scholarly Faculty',
            desc: 'Learn from certified graduates of Al-Azhar University, rigorously screened for scientific depth, pedagogical talent, and character.',
            icon: ShieldCheck
          },
          {
            title: 'Academic Multilingualism',
            desc: 'Instructors fluent in English, French, and Arabic, allowing nuanced jurisprudential and theological terms to be parsed naturally.',
            icon: Languages
          }
        ]
      },
      vetting: {
        tag: 'QUALITY VETTING STANDARDS',
        title: 'Rigorous Faculty Selection Roadmap',
        subtitle: 'To protect the integrity of your education, we screen our prospective scholars through a four-phase evaluation process:',
        steps: [
          {
            number: '01',
            title: 'Academic Verification',
            desc: 'We verify the authenticity of the scholar’s degrees from accredited Islamic faculties (Shariah, Arabic Language, Theology, Qira’at).'
          },
          {
            number: '02',
            title: 'Isnad & Recitation Audits',
            desc: 'Senior reciters audit the candidate’s chain of transmission, phonetic accuracy, and adherence to tajweed standards.'
          },
          {
            number: '03',
            title: 'Linguistic & Cultural Screening',
            desc: 'We assess secondary language proficiency (English or French) and evaluate capability to address Western cultural contexts.'
          },
          {
            number: '04',
            title: 'Simulated Teaching & Pedagogy',
            desc: 'The tutor conducts mock classes under scientific board monitoring to verify instruction quality and adherence to moderate paths.'
          }
        ]
      },
      quote: {
        text: '“Indeed, this knowledge is your religion, so look to whom you take your religion from.”',
        author: 'Imam Muhammad ibn Sirin (Mercy of Allah upon him)'
      },
      cta: {
        title: 'Begin Your Personal Study Path',
        subtitle: 'Schedule a complimentary live Zoom assessment to map your current level and establish your tailored scholarly goals.',
        btn: 'Schedule Your Free Assessment Now',
        btnCourses: 'Explore Academic Programs'
      }
    },
    fr: {
      hero: {
        tag: 'Académie Tebyan — Autorité Académique et Tradition',
        title: 'À Propos de Nous',
        subtitle: 'Une institution scientifique préservant la transmission orale directe (Talaqqi) alliée à une personnalisation pédagogique d\'élite.',
        verse: '﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾',
        verseSource: 'Sourate An-Nahl — Verset 89'
      },
      philosophy: {
        title: 'Notre Philosophie Pédagogique',
        subtitle: 'La transmission orale comme fondement de la compréhension',
        text: 'Nous croyons que les sciences islamiques traditionnelles, l\'arabe classique et le Coran ne peuvent être assimilés par de ses simples lectures ou vidéos préenregistrées. La connaissance est une lumière transmise directement de la poitrine de savants certifiés vers le cœur des étudiants. Islam Tebyan a été fondée pour préserver cette chaîne d\'or (Isnad), alliant la rigueur traditionnelle aux technologies modernes.',
        logoSubtitle: 'Le juste milieu de la tradition d\'Al-Azhar'
      },
      story: {
        title: 'Notre Histoire et Origines',
        tag: 'NOTRE PARCOURS',
        text1: 'L\'Académie Islam Tebyan a été fondée pour relier les centres historiques du savoir islamique traditionnel aux familles musulmanes à travers le monde. Notre parcours a commencé par un constat simple : bien que les applications automatisées offrent de la commodité, elles manquent de la correction phonétique et du mentorat spirituel qui définissent la pédagogie islamique classique.',
        text2: 'Nous avons recréé les cercles classiques de savoir (Halaqat) dans un environnement virtuel. Aujourd\'hui, Tebyan accompagne des étudiants dans plus de 32 pays, les aidant à mémoriser le Coran avec des chaînes de transmission certifiées (Isnad) sous la tutelle de diplômés d\'Al-Azhar.'
      },
      mission: {
        title: 'Notre Mission & Engagement',
        tag: 'NOTRE MISSION',
        intro: 'Notre mission est de dispenser un enseignement rigoureux et personnalisé du Coran et des sciences islamiques, en préservant la transmission orale directe tout en tirant parti du numérique pour assurer une assimilation profonde.',
        points: [
          {
            title: 'Préserver la Transmission Directe',
            desc: 'Relier directement l\'étudiant aux chaînes de transmission (Isnad) remontant au Prophète ﷺ.'
          },
          {
            title: 'Rendre le Savoir Accessible',
            desc: 'Expliquer les notions complexes en français et en anglais pour lever tout obstacle de langue.'
          },
          {
            title: 'Promouvoir le Juste Milieu',
            desc: 'Transmettre la vision modérée d\'Al-Azhar pour former des citoyens musulmans équilibrés.'
          }
        ]
      },
      pillars: {
        tag: 'PILIER DE LA MÉTHODOLOGIE',
        title: 'Piliers de Distinction Académique',
        subtitle: 'Notre académie repose sur quatre normes fondamentales qui protègent l\'intégrité et la qualité de l\'enseignement.',
        items: [
          {
            title: 'Chaîne de Transmission (Isnad)',
            desc: 'Étudiez le Coran et les textes classiques avec des chaînes de transmission certifiées remontant jusqu\'au Prophète ﷺ.',
            icon: BookOpen
          },
          {
            title: 'Cours Individuels Directs',
            desc: 'Des sessions privées où l\'enseignant s\'adapte à votre rythme, corrige chaque détail et personnalise le cursus.',
            icon: Sparkles
          },
          {
            title: 'Faculté d\'Élite d\'Al-Azhar',
            desc: 'Apprenez auprès de savants diplômés de l\'Université d\'Al-Azhar, rigoureusement sélectionnés pour leur intégrité et pédagogie.',
            icon: ShieldCheck
          },
          {
            title: 'Bilinguisme Académique',
            desc: 'Des enseignants maîtrisant le français, l\'anglais et l\'arabe pour expliquer les concepts théologiques sans obstacle linguistique.',
            icon: Languages
          }
        ]
      },
      vetting: {
        tag: 'NORMES DE SÉLECTION',
        title: 'Protocole de Recrutement de la Faculté',
        subtitle: 'Afin de garantir l\'authenticité de l\'enseignement, nous appliquons un protocole rigoureux de recrutement en 4 étapes :',
        steps: [
          {
            number: '01',
            title: 'Vérification Académique',
            desc: 'Validation rigoureuse des diplômes universitaires délivrés par Al-Azhar (Charia, Langue Arabe, Théologie, Qira\'at).'
          },
          {
            number: '02',
            title: 'Audit de l\'Isnad et Récitation',
            desc: 'Un jury de savants auditionne le candidat sur sa récitation, la précision du Tajwid et la validité de ses Ijazat.'
          },
          {
            number: '03',
            title: 'Évaluation Linguistique et Culturelle',
            desc: 'Examen de la maîtrise du français ou de l\'anglais et aptitude à transmettre les sciences islamiques aux publics francophones.'
          },
          {
            number: '04',
            title: 'Cours de Simulation Pratique',
            desc: 'Mise en situation réelle de classe pour évaluer la pédagogie et l\'alignement avec la charte éthique et le juste milieu.'
          }
        ]
      },
      quote: {
        text: '« Certes, cette science est une religion, regardez donc de qui vous prenez votre religion. »',
        author: 'L\'Imam Muhammad ibn Sirin (Qu\'Allah lui fasse miséricorde)'
      },
      cta: {
        title: 'Commencez Votre Parcours d\'Apprentissage',
        subtitle: 'Réservez dès aujourd\'hui votre séance d\'évaluation gratuite pour définir vos objectifs avec l\'un de nos savants.',
        btn: 'Réserver Mon Évaluation Gratuite',
        btnCourses: 'Découvrir Nos Programmes'
      }
    }
  };

  const activeContent = content[locale as keyof typeof content] || content.en;

  return (
    <article className="relative min-h-screen bg-ivory text-ink overflow-x-hidden">
      
      {/* ── SECTION 1: HERO HEADER (DARK - 100vh / min-h-screen) ── */}
      <section 
        className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden"
      >
        {/* Parallax Background */}
        <ParallaxBackground src="/images/about-us-bg.webp" className="md:bg-[length:100%_100%]" />

        {/* Luxury Radial/Linear Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-midnight/65 via-midnight/55 to-midnight/40 pointer-events-none z-0"
        />

        {/* 8-Star watermarks on dark background */}
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:120px_120px] opacity-[0.035] filter invert pointer-events-none z-0" />
        
        <motion.div 
          className="max-w-6xl mx-auto px-6 w-full relative z-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            className={`inline-block text-xs uppercase tracking-[0.25em] text-gold-champagne font-bold mb-4 ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
            variants={fadeInUp}
          >
            {activeContent.hero.tag}
          </motion.span>
          
          <motion.h1 
            className={`text-hero text-parchment leading-tight max-w-4xl mx-auto mb-6 ${
              isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'
            }`}
            variants={fadeInUp}
          >
            {activeContent.hero.title}
          </motion.h1>

          <motion.p 
            className={`text-sm md:text-base lg:text-lg text-parchment/80 leading-relaxed max-w-3xl mx-auto mb-12 ${
              isRtl ? 'font-noto' : 'font-lora'
            }`}
            variants={fadeInUp}
          >
            {activeContent.hero.subtitle}
          </motion.p>

          {/* Central Calligraphic Watermark Element */}
          <motion.div 
            className="inline-block mt-4 pt-8 border-t border-gold-muted/30"
            variants={scaleIn}
          >
            <span dir="rtl" className="block font-amiri text-2xl lg:text-[1.85rem] text-gold-champagne select-none leading-relaxed">
              {activeContent.hero.verse}
            </span>
            <span className={`block text-[10px] uppercase tracking-widest text-parchment/40 mt-2 ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}>
              {activeContent.hero.verseSource}
            </span>
          </motion.div>
        </motion.div>

        {/* Animated Gold Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gold-hi/55 via-white/80 via-parchment/65 via-gold-hi/55 to-transparent bg-[length:200%_100%] animate-gold-shimmer" />
        </div>
      </section>

      {/* ── SECTION 2: OUR STORY & PHILOSOPHY (LIGHT) ── */}
      <section className="bg-[#FDFAF3] py-24 relative z-10 border-b border-gold-muted/15">
        
        {/* Floating background ambient glow */}
        <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-gold-hi/5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Calligraphic Philosophy Card (Deep Navy/Lapis Lazuli - NOT Black) */}
            <motion.div 
              className="lg:col-span-5 bg-gradient-to-br from-[#162742] via-[#122038] to-[#091521] border border-gold-hi/30 hover:border-gold-hi/45 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 hover:translate-y-[-2px] group"
              variants={slideInLeft}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted via-gold-hi to-gold-muted opacity-80" />
              
              {/* Basmala decoration */}
              <div dir="rtl" className="text-gold-hi/80 text-sm md:text-base font-amiri mb-3 text-center select-none">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </div>

              {/* Calligraphy Watermark block */}
              <div dir="rtl" className="text-gold-hi text-xl md:text-2xl font-amiri mb-8 text-center select-none leading-loose">
                {activeContent.hero.verse}
              </div>

              <h3 className={`text-heading text-parchment font-bold mb-4 text-center ${
                isRtl ? 'font-amiri' : 'font-cormorant font-semibold'
              }`}>
                {activeContent.philosophy.title}
              </h3>

              <h4 className={`text-xs text-gold-champagne tracking-wider uppercase mb-6 text-center font-semibold ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}>
                {activeContent.philosophy.subtitle}
              </h4>
              
              <p className={`text-parchment/75 text-xs md:text-sm leading-relaxed text-start ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}>
                {activeContent.philosophy.text}
              </p>

              <div className="mt-10 pt-6 border-t border-gold-muted/20 flex items-center justify-between">
                <span className={`text-[9px] uppercase tracking-widest text-gold-hi/60 font-semibold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {activeContent.philosophy.logoSubtitle}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-gold-hi rotate-45" />
              </div>
            </motion.div>

            {/* OUR STORY: Narrative Editorial Text (High contrast dark ink on light ivory) */}
            <motion.div 
              className="lg:col-span-7 flex flex-col justify-center text-start lg:pt-4"
              variants={slideInRight}
            >
              <span className={`text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 inline-block font-dm ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}>
                {activeContent.story.tag}
              </span>
              
              <h2 className={`text-title text-midnight font-bold mb-8 leading-tight ${
                isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
              }`}>
                {activeContent.story.title}
              </h2>

              <div className={`space-y-6 text-ink text-sm leading-relaxed ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}>
                <p>{activeContent.story.text1}</p>
                <p className="border-s-2 border-gold/45 ps-6 italic text-stone/90">
                  {activeContent.story.text2}
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ── SECTION 3: OUR MISSION (DARK - Lapis/Sapphire Navy Background) ── */}
      <section className="bg-gradient-to-b from-[#091521] via-navy-sapphire/95 to-[#091521] py-24 relative z-10 border-b border-gold-muted/15">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.02] filter invert pointer-events-none" />

        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Title & Description (Light text on dark) */}
            <motion.div className="lg:col-span-6 text-start" variants={fadeInUp}>
              <span className={`text-xs font-bold text-gold-champagne uppercase tracking-[0.2em] mb-3 inline-block ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}>
                {activeContent.mission.tag}
              </span>
              
              <h2 className={`text-title text-parchment font-bold mb-8 leading-tight ${
                isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
              }`}>
                {activeContent.mission.title}
              </h2>

              <p className={`text-parchment/80 text-sm md:text-base leading-relaxed max-w-xl ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}>
                {activeContent.mission.intro}
              </p>
            </motion.div>

            {/* Mission Key Pillars list (Translucent Navy Blue Cards - NOT Black) */}
            <motion.div className="lg:col-span-6 space-y-6 text-start" variants={staggerContainer}>
              {activeContent.mission.points.map((point, index) => (
                <motion.div 
                  key={index}
                  className="bg-[#162742]/40 backdrop-blur-md border border-gold-hi/15 rounded-2xl p-6 shadow-md hover:shadow-lg hover:border-gold-hi/30 transition-all duration-300"
                  variants={fadeInUp}
                >
                  <h3 className={`text-heading text-gold-champagne font-bold mb-2 flex items-center gap-2.5 ${
                    isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                  }`}>
                    <span className="w-1.5 h-1.5 bg-gold-champagne rounded-full shrink-0" />
                    {point.title}
                  </h3>
                  <p className={`text-parchment/70 text-xs leading-relaxed ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}>
                    {point.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ── SECTION 4: FOUR PILLARS OF METHODOLOGY (LIGHT) ── */}
      <section className="bg-[#FDFAF3] py-24 relative z-10 border-b border-gold-muted/15">
        {/* Subtle watermark background */}
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.035] pointer-events-none" />

        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Section title */}
          <motion.span 
            className={`text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 inline-block ${
              isRtl ? 'font-cairo' : 'font-dm'
            }`}
            variants={fadeInUp}
          >
            {activeContent.pillars.tag}
          </motion.span>
          <motion.h2 
            className={`text-title text-midnight font-bold mb-4 leading-tight max-w-2xl mx-auto ${
              isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
            }`}
            variants={fadeInUp}
          >
            {activeContent.pillars.title}
          </motion.h2>
          <motion.p 
            className={`text-sm text-stone max-w-xl mx-auto mb-16 leading-relaxed ${
              isRtl ? 'font-noto' : 'font-lora'
            }`}
            variants={fadeInUp}
          >
            {activeContent.pillars.subtitle}
          </motion.p>

          {/* Pillars Grid (Light Cards on Light Background) */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start" variants={staggerContainer}>
            {activeContent.pillars.items.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div 
                  key={index}
                  className="bg-white border border-gold-muted/10 rounded-2xl p-8 hover:border-gold/45 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 group flex gap-6 items-start"
                  variants={fadeInUp}
                >
                  <div className="p-3 bg-gold-muted/10 rounded-xl border border-gold/20 text-gold group-hover:bg-gold-muted/20 group-hover:scale-105 transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`text-heading text-midnight font-bold leading-tight ${
                      isRtl ? 'font-amiri' : 'font-cormorant font-semibold'
                    }`}>
                      {pillar.title}
                    </h3>
                    <p className={`text-stone text-xs md:text-sm leading-relaxed ${
                      isRtl ? 'font-noto' : 'font-lora'
                    }`}>
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </motion.div>
      </section>

      {/* ── SECTION 5: SELECTION & VETTING ROADMAP (DARK - Lapis Navy) ── */}
      <section className="bg-gradient-to-b from-[#091521] via-[#122038] to-[#091521] py-24 relative z-10 border-b border-gold-muted/15">
        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Header */}
          <div className="text-center mb-20">
            <motion.span 
              className={`text-xs font-bold text-gold-champagne uppercase tracking-[0.2em] mb-3 inline-block ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}
              variants={fadeInUp}
            >
              {activeContent.vetting.tag}
            </motion.span>
            <motion.h2 
              className={`text-title text-parchment font-bold mb-4 leading-tight max-w-2xl mx-auto ${
                isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
              }`}
              variants={fadeInUp}
            >
              {activeContent.vetting.title}
            </motion.h2>
            <motion.p 
              className={`text-sm text-parchment/75 max-w-xl mx-auto leading-relaxed ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}
              variants={fadeInUp}
            >
              {activeContent.vetting.subtitle}
            </motion.p>
          </div>

          {/* Vetting Steps Grid/Timeline (Lapis/Sapphire Navy Cards - NOT Black) */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer}>
            {activeContent.vetting.steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="bg-[#162742]/55 border border-gold-hi/15 rounded-2xl p-6 relative flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:border-gold-hi/35 hover:bg-[#1c2e4d]/60"
                variants={fadeInUp}
              >
                <div>
                  {/* Step number */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold font-cormorant text-gold-champagne/30 group-hover:text-gold-champagne transition-colors duration-300">
                      {step.number}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-gold-champagne opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <h3 className={`text-heading text-parchment font-bold mb-4 leading-tight ${
                    isRtl ? 'font-amiri' : 'font-cormorant font-semibold'
                  }`}>
                    {step.title}
                  </h3>
                  
                  <p className={`text-parchment/70 text-[12px] md:text-xs leading-relaxed ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}>
                    {step.desc}
                  </p>
                </div>

                {/* Decorative bottom seal indicator */}
                <div className="mt-8 pt-4 border-t border-gold-muted/10 text-start">
                  <span className={`text-[8px] uppercase tracking-widest text-parchment/40 font-bold ${
                    isRtl ? 'font-cairo' : 'font-dm'
                  }`}>
                    {isRtl ? `المرحلة ${step.number}` : `PHASE ${step.number}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </section>

      {/* ── SECTION 6: SCHOLARLY QUOTE (LIGHT) ── */}
      <section className="bg-[#F2ECD8] py-20 relative z-10 border-b border-gold-muted/15 text-center overflow-hidden">
        {/* Giant quotation mark watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14rem] font-serif text-gold-hi/[0.04] pointer-events-none select-none">
          ”
        </div>

        <motion.div 
          className="max-w-4xl mx-auto px-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
        >
          <Quote className="w-8 h-8 text-gold mx-auto mb-6 opacity-60" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-amiri text-midnight select-none leading-loose max-w-2xl mx-auto mb-6">
            {activeContent.quote.text}
          </h2>
          <p className={`text-xs uppercase tracking-wider text-stone font-semibold ${
            isRtl ? 'font-cairo' : 'font-dm'
          }`}>
            {activeContent.quote.author}
          </p>
        </motion.div>
      </section>

      {/* ── SECTION 7: FINAL CTA (LIGHT SECTION WITH DARK BLUE CARD) ── */}
      <section className="bg-[#FDFAF3] py-24 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* CTA Card Container (Illuminated Lapis Navy - NOT Black) */}
          <motion.div 
            className="bg-gradient-to-br from-[#162742] via-[#22314b] to-[#122038] border border-gold-hi/25 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,43,71,0.25)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
          >
            
            {/* Top shimmer bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted via-gold-hi to-gold-muted opacity-80" />

            {/* Pattern watermarks */}
            <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:90px_90px] opacity-[0.025] filter invert pointer-events-none" />

            <div className="relative z-10">
              <span className={`inline-block text-xs uppercase tracking-[0.2em] text-gold-champagne font-bold mb-4 ${
                isRtl ? 'font-cairo' : 'font-dm'
              }`}>
                {isRtl ? 'بدء الطلب والتلقي' : 'START REGISTRATION'}
              </span>

              <h2 className={`text-title lg:text-3xl text-parchment font-bold mb-4 max-w-2xl mx-auto leading-tight ${
                isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
              }`}>
                {activeContent.cta.title}
              </h2>

              <p className={`text-xs md:text-sm text-parchment/75 max-w-xl mx-auto mb-10 leading-relaxed ${
                isRtl ? 'font-noto' : 'font-lora'
              }`}>
                {activeContent.cta.subtitle}
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                {/* Primary CTA (Assessment) */}
                <Link
                  href={`/${locale}/book`}
                  className="btn-gold py-4 px-10 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto group"
                >
                  <Sparkles className="w-4 h-4 text-[#22314b] shrink-0" />
                  <span className="whitespace-nowrap">{activeContent.cta.btn}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3.5 h-3.5 text-[#22314b] shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-[#22314b] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </Link>

                {/* Secondary CTA (Programs) */}
                <Link
                  href={`/${locale}/programs`}
                  className="border border-gold-hi/35 text-gold-champagne hover:bg-gold-hi/[0.08] hover:border-gold-hi/70 py-4 px-10 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto group"
                >
                  <BookOpen className="w-4 h-4 text-gold-champagne shrink-0" />
                  <span className="whitespace-nowrap">{activeContent.cta.btnCourses}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3.5 h-3.5 text-gold-champagne shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-gold-champagne shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </Link>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>

    </article>
  );
}

