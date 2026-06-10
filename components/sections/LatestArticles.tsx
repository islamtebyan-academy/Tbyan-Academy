'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

export default function LatestArticles() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const content = {
    ar: {
      tag: 'المقالات والأبحاث الأكاديمية',
      title: 'دراسات تخصصية بأقلام علماء الأكاديمية',
      desc: 'باقة من البحوث والمقالات المحكّمة التي تعالج مسائل علمية دقيقة في العلوم الشرعية، اللسانيات العربية، والتاريخ الإسلامي.',
      readTime: 'دقائق قراءة',
      btnRead: 'اقرأ المقال كامل',
      btnAll: 'عرض المدونة الأكاديمية',
      articles: [
        {
          slug: 'history-of-quranic-recitations',
          category: 'علوم القرآن',
          title: 'تاريخ القراءات القرآنية ونشأتها الأكاديمية',
          excerpt: 'دراسة علمية متخصصة في تواتر القراءات السبع والعشر، والفرق بين الأحرف السبعة والقراءات، مع استعراض مناهج الأئمة القراء وأسانيدهم المتصلة بالنبي ﷺ.',
          date: '٢٨ مايو ٢٠٢٦',
          readTime: 8,
          image: '/images/article_qiraat.png',
        },
        {
          slug: 'practice-of-madinah-maliki-fiqh',
          category: 'أصول الفقه',
          title: 'عمل أهل المدينة كأصل تشريعي في المذهب المالكي',
          excerpt: 'استقصاء أكاديمي لمنهج الإمام مالك في الاحتجاج بعمل أهل المدينة، وتقديمه على خبر الواحد في الاستنباط الفقهي، مع تحليل الفروق بين العمل النقلي والاجتهادي.',
          date: '١٥ مايو ٢٠٢٦',
          readTime: 12,
          image: '/images/article_madinah.png',
        },
        {
          slug: 'basra-kufa-grammatical-schools',
          category: 'اللسانيات العربية',
          title: 'المدارس النحوية: التناظر العلمي بين البصرة والكوفة',
          excerpt: 'تحليل أصول الخلاف النحوي بين مدرستي البصرة بقيادة سيبويه والكوفة بقيادة الكسائي، وأثر هذا التناظر في تقعيد اللغة العربية وتأصيل قواعد النحو والصرف.',
          date: '٠٢ مايو ٢٠٢٦',
          readTime: 10,
          image: '/images/article_grammar.png',
        },
        {
          slug: 'ashari-maturidi-theology-methodology',
          category: 'العقيدة الإسلامية',
          title: 'منهج الأشاعرة والماتريدية في تقرير العقائد الإسلامية',
          excerpt: 'قراءة منهجية في التوفيق بين العقل والنقل عند أهل السنة والجماعة، ودور المدرسة الأشعرية والماتريدية في رد الشبهات العقلية وتثبيت العقيدة الصحيحة.',
          date: '٢٠ أبريل ٢٠٢٦',
          readTime: 11,
          image: '/images/article_theology.png',
        },
        {
          slug: 'al-ghazali-integration-of-logic-usul',
          category: 'علم المنطق',
          title: 'تقنين المنطق في أصول الفقه عند الإمام الغزالي',
          excerpt: 'استعراض تاريخي وفلسفي لكتاب المستصفى للإمام الغزالي، وكيف جعل علم المنطق مقدمة لا غنى عنها لكل العلوم الشرعية، ممهداً لقبوله في الأوساط العلمية.',
          date: '٠٨ أبريل ٢٠٢٦',
          readTime: 9,
          image: '/images/article_logic.png',
        },
        {
          slug: 'al-jurjani-theory-of-structure-nazhm',
          category: 'البلاغة والأدب',
          title: 'نظرية النظم عند عبد القاهر الجرجاني وإعجاز القرآن',
          excerpt: 'دراسة تحليلية لنظرية النظم في كتاب "دلائل الإعجاز"، وكيف أسس الجرجاني لفهم إعجاز القرآن البياني من خلال الترابط النحوي والدلالي بين الكلمات.',
          date: '٢٥ مارس ٢٠٢٦',
          readTime: 14,
          image: '/images/article_rhetoric.png',
        },
      ]
    },
    en: {
      tag: 'ACADEMIC PAPERS & ARTICLES',
      title: 'Scholarly Insights by Our Faculty Scholars',
      desc: 'Explore rigorous essays and research papers covering advanced issues in jurisprudence, Arabic linguistics, and Islamic history.',
      readTime: 'min read',
      btnRead: 'Read Full Article',
      btnAll: 'View Academic Blog',
      articles: [
        {
          slug: 'history-of-quranic-recitations',
          category: 'Quranic Sciences',
          title: 'The History of Quranic Recitations and Qira\'at',
          excerpt: 'A detailed scholarly study on the transmission of the Seven and Ten Qira\'at, the distinction between the Ahruf and recitations, and the chains of narration back to the Prophet ﷺ.',
          date: 'May 28, 2026',
          readTime: 8,
          image: '/images/article_qiraat.png',
        },
        {
          slug: 'practice-of-madinah-maliki-fiqh',
          category: 'Islamic Jurisprudence',
          title: 'The Practice of Madinah as a Source of Law in Maliki Fiqh',
          excerpt: 'An academic inquiry into Imam Malik\'s methodology in utilizing the Practice of Madinah as a primary legal source, detailing its authority over isolated Hadiths.',
          date: 'May 15, 2026',
          readTime: 12,
          image: '/images/article_madinah.png',
        },
        {
          slug: 'basra-kufa-grammatical-schools',
          category: 'Arabic Linguistics',
          title: 'Grammatical Schools: The Duel Between Basra and Kufa',
          excerpt: 'Analysing the core grammatical disputes between the school of Basra (led by Sibawayh) and Kufa (led by Al-Kisa\'i), and its profound impact on standardizing the language.',
          date: 'May 02, 2026',
          readTime: 10,
          image: '/images/article_grammar.png',
        },
        {
          slug: 'ashari-maturidi-theology-methodology',
          category: 'Islamic Creed',
          title: 'The Ash\'ari and Maturidi Methodology in Sunni Theology',
          excerpt: 'A systematic reading on reconciling intellect (Aql) and tradition (Naql) in Sunni theology, exploring how these schools defended orthodox beliefs.',
          date: 'Apr 20, 2026',
          readTime: 11,
          image: '/images/article_theology.png',
        },
        {
          slug: 'al-ghazali-integration-of-logic-usul',
          category: 'Islamic Logic',
          title: 'Al-Ghazali and the Integration of Logic in Usul al-Fiqh',
          excerpt: 'A historical and philosophical review of Imam Al-Ghazali\'s "Al-Mustasfa", exploring how he integrated Aristotelian logic into jurisprudence as an essential tool.',
          date: 'Apr 08, 2026',
          readTime: 9,
          image: '/images/article_logic.png',
        },
        {
          slug: 'al-jurjani-theory-of-structure-nazhm',
          category: 'Literature & Rhetoric',
          title: 'Al-Jurjani\'s Theory of Structure (Nazhm) & Quranic Inimitability',
          excerpt: 'An analytical study on the Theory of Structure in Al-Jurjani\'s "Dala\'il al-I\'jaz", exploring how grammar and semantics combine to form the literary miracle of the Quran.',
          date: 'Mar 25, 2026',
          readTime: 14,
          image: '/images/article_rhetoric.png',
        },
      ]
    },
    fr: {
      tag: 'ARTICLES & RECHERCHES ACADÉMIQUES',
      title: 'Études Spécialisées par les Savants de l\'Académie',
      desc: 'Une sélection de recherches et d\'articles rédigés par nos professeurs pour traiter des questions académiques précises en sciences islamiques et linguistiques.',
      readTime: 'min de lecture',
      btnRead: 'Lire l\'article complet',
      btnAll: 'Voir le Blog Académique',
      articles: [
        {
          slug: 'history-of-quranic-recitations',
          category: 'Sciences du Coran',
          title: 'L\'Histoire des Récitations Coraniques et des Qira\'at',
          excerpt: 'Une étude scientifique sur la transmission des sept et dix Qira\'at, la distinction entre les sept Ahruf et les récitations, et les chaînes de transmission remontant au Prophète ﷺ.',
          date: '28 Mai 2026',
          readTime: 8,
          image: '/images/article_qiraat.png',
        },
        {
          slug: 'practice-of-madinah-maliki-fiqh',
          category: 'Jurisprudence Islamique',
          title: 'La Pratique de Médine comme Source de Loi en Fiqh Malikite',
          excerpt: 'Une enquête académique sur la méthodologie de l\'Imam Malik utilisant la Pratique des Gens de Médine comme source juridique principale, face aux Hadiths isolés.',
          date: '15 Mai 2026',
          readTime: 12,
          image: '/images/article_madinah.png',
        },
        {
          slug: 'basra-kufa-grammatical-schools',
          category: 'Linguistique Arabe',
          title: 'Écoles de Grammaire : Le Duel Intellectuel entre Bassora et Koufa',
          excerpt: 'Analyse des disputes grammaticales fondamentales entre l\'école de Bassora (menée par Sibawayh) et celle de Koufa (menée par Al-Kisa\'i), et son impact sur la langue.',
          date: '02 Mai 2026',
          readTime: 10,
          image: '/images/article_grammar.png',
        },
        {
          slug: 'ashari-maturidi-theology-methodology',
          category: 'Dogme Islamique',
          title: 'La Méthodologie Ash\'arite et Maturidite dans la Théologie Sunnite',
          excerpt: 'Une lecture systématique sur la réconciliation entre intellect (Aql) et tradition (Naql) dans la théologie sunnite face aux défis philosophiques.',
          date: '20 Avr 2026',
          readTime: 11,
          image: '/images/article_theology.png',
        },
        {
          slug: 'al-ghazali-integration-of-logic-usul',
          category: 'Logique Islamique',
          title: 'Al-Ghazali et la Codification de la Logique en Usul al-Fiqh',
          excerpt: 'Une revue historique du travail juridique de l\'Imam Al-Ghazali "Al-Mustasfa", explorant l\'intégration de la logique aristotélicienne comme outil indispensable.',
          date: '08 Avr 2026',
          readTime: 9,
          image: '/images/article_logic.png',
        },
        {
          slug: 'al-jurjani-theory-of-structure-nazhm',
          category: 'Littérature & Rhétorique',
          title: 'La Théorie de la Structure (Nazhm) d\'Al-Jurjani et l\'Inimitabilité',
          excerpt: 'Une étude analytique sur la théorie de la structure d\'Al-Jurjani, explorant comment la grammaire et la sémantique s\'unissent pour former le miracle du Coran.',
          date: '25 Mar 2026',
          readTime: 14,
          image: '/images/article_rhetoric.png',
        },
      ]
    }
  };

  const activeContent = content[locale as keyof typeof content] || content.en;

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 70, damping: 15 }
    }
  };

  return (
    <section className="bg-gradient-to-b from-white via-ivory/10 to-parchment/30 py-24 relative z-10 border-b border-gold-muted/10 overflow-hidden text-midnight">
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:60px_60px] opacity-[0.015] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={`inline-flex items-center gap-2 bg-navy/5 border border-navy/8 rounded-full px-4.5 py-1.5 mb-4 text-[10px] uppercase tracking-widest font-bold text-navy ${isRtl ? 'font-cairo' : 'font-dm'}`}>
              <BookOpen size={12} className="text-gold" />
              {activeContent.tag}
            </span>
            <h2 className={`text-title text-midnight font-bold max-w-3xl mx-auto mb-4 ${isRtl ? 'font-amiri font-bold leading-[1.4]' : 'font-cormorant font-semibold leading-tight'}`}>
              {activeContent.title}
            </h2>
            <p className={`text-sm text-[#3A332A] max-w-2xl mx-auto leading-relaxed font-normal description-justify ${isRtl ? 'font-noto' : 'font-lora'}`}>
              {activeContent.desc}
            </p>
          </motion.div>
        </div>

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
        >
          {activeContent.articles.map((article, idx) => (
            <motion.article
              key={article.slug}
              className="flex flex-col bg-white rounded-3xl border border-gold-muted/10 overflow-hidden shadow-[0_12px_40px_rgba(139,115,85,0.04)] hover:shadow-[0_20px_50px_rgba(139,115,85,0.09)] hover:border-gold-muted/20 group transition-all duration-300"
              variants={cardVariants}
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-stone/5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 via-transparent to-transparent pointer-events-none" />
                <span className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} bg-white/95 backdrop-blur-sm border border-gold-muted/15 text-navy font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {article.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Meta info */}
                <div className={`flex items-center gap-4 text-[10px] text-stone/50 mb-3 font-semibold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-gold" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-gold" />
                    {article.readTime} {activeContent.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-lg text-midnight font-bold mb-3 group-hover:text-gold transition-colors duration-200 ${isRtl ? 'font-amiri font-bold leading-[1.4]' : 'font-cormorant font-semibold leading-snug'}`}>
                  <Link href={`/${locale}/blog/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className={`text-sm text-[#3A332A]/85 leading-relaxed mb-6 flex-1 font-normal description-justify-start ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {article.excerpt}
                </p>

                {/* Read Link */}
                <div className="pt-4 border-t border-stone/5 mt-auto">
                  <Link
                    href={`/${locale}/blog/${article.slug}`}
                    className={`inline-flex items-center gap-1.5 text-navy text-[11px] font-bold uppercase tracking-wider hover:text-gold transition-colors duration-200 group-hover:underline ${isRtl ? 'font-cairo' : 'font-dm'}`}
                  >
                    <span>{activeContent.btnRead}</span>
                    {isRtl ? <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> : <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA Academic Blog */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href={`/${locale}/blog`}
              className="btn-gold px-8 py-4 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2.5 shadow-lg shadow-gold/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group"
            >
              <BookOpen size={14} />
              <span>{activeContent.btnAll}</span>
              <span className={`transition-transform duration-300 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
