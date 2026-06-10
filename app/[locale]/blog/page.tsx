'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Search, X, Calendar, Clock, Bookmark, ArrowLeft, ArrowRight
} from 'lucide-react';
import ParallaxBackground from '@/components/ui/ParallaxBackground';
import { Article, ARTICLES_DATA, BASE_ARTICLES } from './data';

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

export default function BlogPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Localization labels
  const labels = useMemo(() => {
    if (locale === 'ar') {
      return {
        tag: 'المدونة المعرفية والأبحاث',
        title: 'صرح الفكر الإسلامي والدراسات اللغوية',
        subtitle: 'استكشف أبحاثاً ودراسات معمقة بأقلام شيوخنا وعلمائنا الأزهريين في علوم الشريعة والعربية والمنطق.',
        searchPlaceholder: 'ابحث عن المقالات أو الكلمات المفتاحية...',
        allCategories: 'الكل',
        readTime: 'دقائق قراءة',
        btnRead: 'اقرأ المقال بالكامل',
        btnBack: 'العودة للمقالات',
        btnBookTrial: 'احجز حصة تقييم مجانية في هذا العلم',
        referencesTitle: 'المصادر والمراجع الأكاديمية:',
        noResults: 'لم يتم العثور على أي مقالات تطابق معايير البحث.',
        categories: {
          all: 'كل العلوم',
          quran: 'علوم القرآن',
          fiqh: 'أصول الفقه',
          arabic: 'اللسانيات العربية',
          aqidah: 'العقيدة والتوحيد',
          logic: 'المنطق والبحث',
          literature: 'الأدب والبلاغة',
          history: 'التاريخ الإسلامي',
          kids: 'تربية الأطفال'
        }
      };
    } else if (locale === 'fr') {
      return {
        tag: 'BLOG DE CONNAISSANCES & RECHERCHES',
        title: 'Études Académiques & Linguistiques',
        subtitle: 'Découvrez des recherches et analyses théologiques rédigées par notre faculté de savants d\'Al-Azhar.',
        searchPlaceholder: 'Rechercher un article ou un mot-clé...',
        allCategories: 'Tout',
        readTime: 'min de lecture',
        btnRead: 'Lire l\'article complet',
        btnBack: 'Retour aux articles',
        btnBookTrial: 'Réserver un cours d\'essai gratuit dans cette science',
        referencesTitle: 'Références & Bibliographie Académique :',
        noResults: 'Aucun article ne correspond à votre recherche.',
        categories: {
          all: 'Toutes disciplines',
          quran: 'Sciences du Coran',
          fiqh: 'Jurisprudence (Fiqh)',
          arabic: 'Linguistique Arabe',
          aqidah: 'Creed & Théologie',
          logic: 'Logique Islamique',
          literature: 'Rhétorique & Littérature',
          history: 'Histoire Islamique',
          kids: 'Éducation des Enfants'
        }
      };
    } else {
      return {
        tag: 'SCHOLARLY BLOG & RESEARCH PAPERS',
        title: 'The Academic Knowledge & Text Hub',
        subtitle: 'Explore deep-dive academic insights, papers, and essays written by our Al-Azhar graduate faculty.',
        searchPlaceholder: 'Search articles, keywords, authors...',
        allCategories: 'All',
        readTime: 'min read',
        btnRead: 'Read Full Article',
        btnBack: 'Back to Articles',
        btnBookTrial: 'Book a Free Assessment Class in this Subject',
        referencesTitle: 'Academic References & Bibliography:',
        noResults: 'No articles found matching your criteria.',
        categories: {
          all: 'All Fields',
          quran: 'Quranic Sciences',
          fiqh: 'Jurisprudence (Fiqh)',
          arabic: 'Arabic Linguistics',
          aqidah: 'Islamic Creed',
          logic: 'Islamic Logic',
          literature: 'Rhetoric & Literature',
          history: 'Islamic History',
          kids: 'Islamic Parenting'
        }
      };
    }
  }, [locale]);

  // Combine static configuration and local translations
  const articles: Article[] = useMemo(() => {
    return BASE_ARTICLES.map(art => {
      const trans = ARTICLES_DATA[locale]?.[art.slug] || ARTICLES_DATA.en[art.slug];
      return {
        ...art,
        translation: trans
      };
    });
  }, [locale]);

  // Handle Search & Filter logic
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'all' || article.categoryKey === selectedCategory;
      const matchesSearch = 
        article.translation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.translation.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.translation.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const countLabel = useMemo(() => {
    const count = filteredArticles.length;
    if (locale === 'ar') {
      return count === 1 ? 'مقال واحد' : count === 2 ? 'مقالان' : count >= 3 && count <= 10 ? `${count} مقالات` : `${count} مقالاً`;
    } else if (locale === 'fr') {
      return count > 1 ? `${count} articles` : `${count} article`;
    } else {
      return count > 1 ? `${count} articles` : `${count} article`;
    }
  }, [filteredArticles.length, locale]);

  return (
    <div className="min-h-screen bg-ivory text-midnight overflow-x-hidden selection:bg-gold-hi/30">
      
      {/* ── SECTION 1: HERO HEADER (DARK 100vh) ── */}
      <section className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 overflow-hidden border-b border-gold-hi/25">
        <ParallaxBackground src="/images/about-us-bg.webp" className="md:bg-[length:100%_100%]" />
        
        {/* Premium Dark Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b162c]/80 via-[#0e1d3a]/65 to-[#122548]/75 pointer-events-none z-0" />
        
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
              ﴿وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِكُلِّ شَيْءٍ﴾
            </div>
            <span className="text-[10px] text-parchment/40 uppercase tracking-wider font-semibold">
              {isRtl ? 'سورة النحل [89]' : 'Surah Al-Nahl [16:89]'}
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
          onClick={() => document.getElementById('articles-listing-section')?.scrollIntoView({ behavior: 'smooth' })}
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

      {/* ── SECTION 2: ARTICLES FILTER & LISTING (LIGHT CREAM) ── */}
      <section id="articles-listing-section" className="bg-[#FDFAF3] py-24 relative z-10 border-b border-gold-muted/15">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Search Box - Centered and Standalone */}
          <div className="max-w-md mx-auto mb-10 relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-stone/40 ${isRtl ? 'right-5' : 'left-5'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className={`w-full bg-white border border-gold-muted/15 text-midnight py-3 px-5 rounded-full text-xs shadow-sm shadow-midnight/3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-200 placeholder:text-stone/30 ${
                isRtl ? 'pr-12 pl-10 font-cairo' : 'pl-12 pr-10 font-dm'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 hover:text-red-500 text-stone/50 ${isRtl ? 'left-5' : 'right-5'}`}
                title={isRtl ? "مسح البحث" : "Clear search"}
                aria-label={isRtl ? "مسح البحث" : "Clear search"}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Category Tabs - Centered and Spaced (Self-Wrapping) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16 max-w-5xl mx-auto">
            {Object.entries(labels.categories).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === key
                    ? 'bg-navy text-parchment shadow-md shadow-navy/15 scale-105'
                    : 'bg-white text-stone/80 border border-gold-muted/15 hover:border-gold/30 hover:text-midnight shadow-sm shadow-midnight/2'
                } ${isRtl ? 'font-cairo' : 'font-dm'}`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Dynamic Category Title & Count */}
          <div className="mb-10 text-start border-b border-gold-muted/15 pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-gold rounded-full" />
              <h2 className={`text-xl md:text-2xl lg:text-3xl text-midnight font-bold tracking-tight ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                {labels.categories[selectedCategory as keyof typeof labels.categories]}
              </h2>
            </div>
            <span className={`text-xs text-stone/40 font-bold uppercase tracking-wider ${isRtl ? 'font-cairo' : 'font-dm'}`}>
              {countLabel}
            </span>
          </div>

          {/* Articles Grid layout */}
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {filteredArticles.map((article) => (
                  <motion.article
                    key={article.slug}
                    className="flex flex-col bg-white rounded-3xl border border-gold-muted/15 overflow-hidden shadow-[0_12px_40px_rgba(139,115,85,0.03)] hover:shadow-[0_24px_60px_rgba(139,115,85,0.08)] hover:border-gold-hi/30 transition-all duration-500 group"
                    variants={fadeInUp}
                    whileHover={{ y: -8 }}
                    layout
                  >
                    {/* Image frame */}
                    <div className="relative h-56 w-full overflow-hidden bg-[#FDFAF3]">
                      <Image
                        src={article.image}
                        alt={article.translation.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out animate-fade-in"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 via-transparent to-transparent pointer-events-none" />
                      <span className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} bg-white/95 backdrop-blur-sm border border-gold-muted/15 text-navy font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {article.translation.category}
                      </span>
                    </div>

                    {/* Card Description body */}
                    <div className="p-7 flex flex-col flex-1 text-start justify-between">
                      <div>
                        {/* Meta information */}
                        <div className={`flex items-center gap-4 text-[10px] text-stone/50 mb-3.5 font-bold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                          <span className="flex items-center gap-1">
                            <Bookmark size={12} className="text-gold" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-gold" />
                            {article.readTime} {labels.readTime}
                          </span>
                        </div>

                        <h3 className={`text-lg text-midnight font-bold leading-snug mb-3 group-hover:text-gold transition-colors duration-200 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                          <Link 
                            href={`/${locale}/blog/${article.slug}`}
                            className="text-start hover:underline cursor-pointer focus:outline-none"
                          >
                            {article.translation.title}
                          </Link>
                        </h3>

                        <p className={`text-stone/60 text-xs leading-relaxed mb-6 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                          {article.translation.excerpt}
                        </p>
                      </div>

                      <div className="pt-5 border-t border-stone/5 mt-auto">
                        <Link
                          href={`/${locale}/blog/${article.slug}`}
                          className={`inline-flex items-center gap-1.5 text-navy text-[11px] font-bold uppercase tracking-wider hover:text-gold transition-colors duration-200 group-hover:underline cursor-pointer ${isRtl ? 'font-cairo' : 'font-dm'}`}
                        >
                          <span>{labels.btnRead}</span>
                          {isRtl ? <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> : <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />}
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-20 bg-white border border-gold-muted/12 rounded-3xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Bookmark className="w-12 h-12 text-gold-muted/30 mx-auto mb-4" />
                <p className={`text-stone/60 text-sm ${isRtl ? 'font-cairo' : 'font-dm'}`}>{labels.noResults}</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

    </div>
  );
}
