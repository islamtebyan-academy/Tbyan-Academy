import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Calendar, Clock, GraduationCap, ArrowLeft, ArrowRight, BookOpen, Sparkles, Bookmark
} from 'lucide-react';
import { locales } from '@/i18n';
import { createStaticClient } from '@/lib/supabase/server';
import { Article, ARTICLES_DATA, BASE_ARTICLES } from '../data';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return BASE_ARTICLES.flatMap((art) => 
    locales.map((locale) => ({
      locale,
      slug: art.slug,
    }))
  );
}

const getCategoryLabel = (key: string, locale: string) => {
  const categories: Record<string, Record<string, string>> = {
    ar: {
      quran: 'علوم القرآن',
      fiqh: 'أصول الفقه',
      arabic: 'اللسانيات العربية',
      aqidah: 'العقيدة والتوحيد',
      logic: 'المنطق والبحث',
      literature: 'الأدب والبلاغة',
      history: 'التاريخ الإسلامي',
      kids: 'تربية الأطفال'
    },
    en: {
      quran: 'Quranic Sciences',
      fiqh: 'Jurisprudence (Fiqh)',
      arabic: 'Arabic Linguistics',
      aqidah: 'Islamic Creed',
      logic: 'Islamic Logic',
      literature: 'Rhetoric & Literature',
      history: 'Islamic History',
      kids: 'Islamic Parenting'
    },
    fr: {
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
  return categories[locale]?.[key] || categories.en[key] || key;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  
  let title = '';
  let excerpt = '';

  try {
    const supabase = createStaticClient();
    const { data: dbArticle } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (dbArticle) {
      title = dbArticle.title?.[locale] || dbArticle.title?.en || '';
      excerpt = dbArticle.excerpt?.[locale] || dbArticle.excerpt?.en || '';
    }
  } catch (err) {
    console.error('Metadata DB fetch failed, using static fallback:', err);
  }

  if (!title) {
    const articleTrans = ARTICLES_DATA[locale]?.[slug] || ARTICLES_DATA.en?.[slug];
    if (articleTrans) {
      title = articleTrans.title;
      excerpt = articleTrans.excerpt;
    }
  }

  if (!title) {
    return {
      title: 'Article Not Found — Islam Tebyan Academy',
    };
  }

  return {
    title: `${title} — Islam Tebyan Academy`,
    description: excerpt,
    openGraph: {
      title: `${title} — Islam Tebyan Academy`,
      description: excerpt,
      type: 'article',
      images: [
        {
          url: `/images/article_${slug.replace(/-/g, '_')}.png`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    }
  };
}

const labelsMap = {
  ar: {
    backToList: 'العودة إلى المدونة',
    readTime: 'دقائق قراءة',
    author: 'هيئة علماء الأزهر',
    references: 'المراجع والمصادر الأكاديمية',
    relatedTitle: 'أبحاث ودراسات ذات صلة',
    btnBook: 'احجز حصة تقييم مجانية في هذا العلم',
    home: 'الرئيسية',
    blog: 'المدونة',
    btnRead: 'اقرأ المقال',
  },
  en: {
    backToList: 'Back to Blog',
    readTime: 'min read',
    author: 'Al-Azhar Faculty Board',
    references: 'Academic References & Bibliography',
    relatedTitle: 'Related Research & Studies',
    btnBook: 'Book a Free Assessment Class in this Subject',
    home: 'Home',
    blog: 'Blog',
    btnRead: 'Read',
  },
  fr: {
    backToList: 'Retour au Blog',
    readTime: 'min de lecture',
    author: 'Conseil de la Faculté d\'Al-Azhar',
    references: 'Références & Bibliographie Académique',
    relatedTitle: 'Recherches & Études Connexes',
    btnBook: 'Réserver un cours d\'essai gratuit dans cette science',
    home: 'Accueil',
    blog: 'Blog',
    btnRead: 'Lire',
  }
};

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const isRtl = locale === 'ar';
  
  const labels = labelsMap[locale as keyof typeof labelsMap] || labelsMap.en;
  
  // 1. Fetch from Supabase first
  const supabase = createStaticClient();
  let dbArticle = null;
  try {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();
    dbArticle = data;
  } catch (err) {
    console.error('Error fetching article from database:', err);
  }

  // 2. Fallback to static
  let article: Article | null = null;
  const baseArticle = BASE_ARTICLES.find(art => art.slug === slug);
  const articleTrans = ARTICLES_DATA[locale]?.[slug] || ARTICLES_DATA.en?.[slug];

  if (dbArticle) {
    article = {
      slug: dbArticle.slug,
      categoryKey: dbArticle.category_key,
      image: dbArticle.image_url || '/images/article_default.png',
      date: dbArticle.date,
      readTime: dbArticle.read_time,
      translation: {
        category: getCategoryLabel(dbArticle.category_key, locale),
        title: dbArticle.title?.[locale] || dbArticle.title?.en || '',
        excerpt: dbArticle.excerpt?.[locale] || dbArticle.excerpt?.en || '',
        ctaMessage: dbArticle.cta_message?.[locale] || dbArticle.cta_message?.en || '',
        bookingTopic: dbArticle.booking_topic || 'general',
        content: {
          intro: dbArticle.content?.[locale]?.intro || '',
          sections: dbArticle.content?.[locale]?.sections || [],
          conclusion: dbArticle.content?.[locale]?.conclusion || '',
          references: dbArticle.content?.[locale]?.references || []
        }
      }
    };
  } else if (baseArticle && articleTrans) {
    article = {
      ...baseArticle,
      translation: articleTrans
    };
  }

  if (!article) {
    notFound();
  }

  // Find related articles (same category or others, excluding current)
  let allArticles: Article[] = [];
  try {
    const { data: dbArticles } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published');

    if (dbArticles && dbArticles.length > 0) {
      allArticles = dbArticles.map((item: any) => ({
        slug: item.slug,
        categoryKey: item.category_key,
        image: item.image_url || '/images/article_default.png',
        date: item.date,
        readTime: item.read_time,
        translation: {
          category: getCategoryLabel(item.category_key, locale),
          title: item.title?.[locale] || item.title?.en || '',
          excerpt: item.excerpt?.[locale] || item.excerpt?.en || '',
          ctaMessage: item.cta_message?.[locale] || item.cta_message?.en || '',
          bookingTopic: item.booking_topic || 'general',
          content: {
            intro: item.content?.[locale]?.intro || '',
            sections: item.content?.[locale]?.sections || [],
            conclusion: item.content?.[locale]?.conclusion || '',
            references: item.content?.[locale]?.references || []
          }
        }
      }));
    }
  } catch (err) {
    console.error('Error fetching dynamic articles for related list:', err);
  }

  if (allArticles.length === 0) {
    allArticles = BASE_ARTICLES.map(art => ({
      ...art,
      translation: ARTICLES_DATA[locale]?.[art.slug] || ARTICLES_DATA.en?.[art.slug]
    }));
  }

  const relatedList = allArticles
    .filter(art => art.slug !== slug)
    .sort((a, b) => {
      if (a.categoryKey === article!.categoryKey && b.categoryKey !== article!.categoryKey) return -1;
      if (b.categoryKey === article!.categoryKey && a.categoryKey !== article!.categoryKey) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-ivory text-midnight selection:bg-gold-hi/30">
      
      {/* ── BREADCRUMB & BACK NAVIGATION ── */}
      <div className="bg-navy-brand border-b border-gold-hi/10 pt-28 pb-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-parchment/60 font-semibold">
          <Link 
            href={`/${locale}/blog`}
            className={`flex items-center gap-1.5 hover:text-gold transition-colors ${isRtl ? 'font-cairo' : 'font-dm'}`}
          >
            {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            <span>{labels.backToList}</span>
          </Link>
          
          <div className={`hidden sm:flex items-center gap-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            <Link href={`/${locale}`} className="hover:text-gold">{labels.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-gold">{labels.blog}</Link>
            <span>/</span>
            <span className="text-gold-champagne font-bold">{article.translation.category}</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: EDITORIAL HEADER HERO ── */}
      <header className="relative bg-navy-brand text-parchment pt-16 pb-24 border-b border-gold-hi/20 overflow-hidden">
        {/* Background Subtle Overlay Pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.025] filter invert pointer-events-none z-0" />
        
        {/* Background Shading Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#091521]/90 to-[#091521] pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          {/* Article Category Badge */}
          <span className={`inline-block text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold-champagne font-bold mb-4 border border-gold-hi/30 px-4 py-1.5 rounded-full ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {article.translation.category}
          </span>
          
          {/* Main Scholarly Title */}
          <h1 className={`text-3xl md:text-4xl lg:text-[44px] leading-tight text-parchment font-bold mb-8 ${isRtl ? 'font-amiri font-bold leading-normal' : 'font-cormorant font-bold'}`}>
            {article.translation.title}
          </h1>

          {/* Authorship Metadata Block */}
          <div className={`flex flex-wrap items-center justify-center gap-6 text-xs text-parchment/65 font-medium border-t border-b border-gold-hi/15 py-4 max-w-2xl mx-auto ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-gold-hi" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-gold-hi" />
              {article.readTime} {labels.readTime}
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap size={14} className="text-gold-hi" />
              {labels.author}
            </span>
          </div>
        </div>
      </header>

      {/* ── SECTION 2: EDITORIAL MAIN ARTICLE CONTAINER ── */}
      <section className="bg-ivory py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Wide Editorial Image Block inside Content */}
          <div className="lg:col-span-12 max-w-4xl mx-auto w-full -mt-28 mb-10 z-20 relative">
            <div className="bg-white p-3 rounded-[32px] border border-gold-hi/20 shadow-xl shadow-midnight/5">
              <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-sand/10">
                <Image 
                  src={article.image}
                  alt={article.translation.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 896px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="lg:col-span-8 lg:col-start-3 max-w-3xl mx-auto w-full text-start">
            <article className="prose prose-stone max-w-none">
              
              {/* Introduction Paragraph - Large Lead text with customized line-height */}
              <div className={`text-stone/90 text-base md:text-lg border-gold/45 mb-10 font-medium ${
                isRtl 
                  ? 'border-r-4 pr-6 leading-[1.95] md:leading-[2.2] font-noto' 
                  : 'border-l-4 pl-6 leading-[1.85] font-lora first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-gold first-letter:font-cormorant'
              }`}>
                {article.translation.content.intro}
              </div>

              {/* Loop inside sections */}
              <div className="space-y-10">
                {article.translation.content.sections.map((section, index) => (
                  <div key={index} className="pt-6 border-t border-gold-muted/10">
                    <h2 className={`text-xl md:text-2xl text-navy-brand font-bold mb-4 ${isRtl ? 'font-amiri font-bold leading-normal' : 'font-cormorant font-semibold'}`}>
                      {section.subtitle}
                    </h2>
                    
                    <p className={`text-stone/85 text-[15px] md:text-base leading-relaxed ${isRtl ? 'font-noto leading-[1.95]' : 'font-lora leading-[1.8]'}`}>
                      {section.body}
                    </p>
                    
                    {section.quote && (
                      <div className={`my-8 p-6 md:p-8 rounded-2xl bg-white border ${
                        isRtl 
                          ? 'border-r-4 border-r-gold border-l-0 pr-8' 
                          : 'border-l-4 border-l-gold border-r-0 pl-8'
                      } border-gold-muted/12 text-navy-brand font-medium italic shadow-sm ${
                        isRtl ? 'font-amiri text-lg md:text-xl leading-[1.8]' : 'font-lora text-sm md:text-base leading-relaxed'
                      }`}>
                        <span className="text-3xl text-gold/30 block mb-2 select-none">“</span>
                        <p className="-mt-4 inline">{section.quote.replace(/[«»]/g, '')}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conclusion paragraph */}
              <div className="pt-10 border-t border-gold-muted/15 mt-12">
                <p className={`text-midnight font-bold text-base md:text-lg ${isRtl ? 'font-noto leading-[1.9]' : 'font-lora leading-relaxed'}`}>
                  {article.translation.content.conclusion}
                </p>
              </div>

              {/* References Block */}
              {article.translation.content.references && (
                <div className="mt-16 bg-white border border-gold-muted/15 rounded-3xl p-6 md:p-8">
                  <h4 className={`text-sm md:text-base font-bold text-navy-brand mb-4 flex items-center gap-2 pb-2 border-b border-stone/5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    <BookOpen size={16} className="text-gold" />
                    {labels.references}
                  </h4>
                  <ul className="list-decimal list-inside space-y-2 text-xs md:text-sm text-stone/60 leading-relaxed font-dm">
                    {article.translation.content.references.map((ref, rIdx) => (
                      <li key={rIdx} className="hover:text-gold transition-colors">{ref}</li>
                    ))}
                  </ul>
                </div>
              )}

            </article>

            {/* ── CONTEXTUAL BOOKING CALLOUT CTA ── */}
            <div className="mt-16 bg-gradient-to-br from-[#122038] to-[#091521] border border-gold-hi/20 rounded-[32px] p-8 md:p-10 relative overflow-hidden text-center text-parchment shadow-xl shadow-navy-brand/10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gold-hi/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-navy-pressed/20 rounded-full blur-3xl pointer-events-none" />
              
              <Sparkles className="w-8 h-8 text-gold-hi mx-auto mb-5" />
              
              <p className={`text-sm md:text-base text-parchment/85 leading-relaxed max-w-lg mx-auto mb-8 ${isRtl ? 'font-noto leading-[1.95]' : 'font-lora'}`}>
                {article.translation.ctaMessage}
              </p>
              
              <Link
                href={`/${locale}/book?topic=${article.translation.bookingTopic}`}
                className={`btn-gold px-8 py-4 rounded-full text-xs md:text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isRtl ? 'font-cairo' : 'font-dm'}`}
              >
                <span>{labels.btnBook}</span>
                {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: RELATED ARTICLES GRID ── */}
      <section className="bg-white py-20 border-t border-gold-muted/12 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="flex items-center gap-3 mb-10 border-b border-gold-muted/12 pb-4">
            <div className="w-1.5 h-6 bg-gold rounded-full" />
            <h3 className={`text-xl md:text-2xl text-navy-brand font-bold ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
              {labels.relatedTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedList.map((relArt) => (
              <article 
                key={relArt.slug}
                className="flex flex-col bg-ivory rounded-3xl border border-gold-muted/12 overflow-hidden shadow-sm hover:shadow-md hover:border-gold-hi/25 transition-all duration-300 group"
              >
                <div className="relative h-44 w-full overflow-hidden bg-sand/5">
                  <Image 
                    src={relArt.image}
                    alt={relArt.translation.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/10 via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow justify-between text-start">
                  <div>
                    <span className={`inline-block text-[9px] uppercase tracking-wider text-gold-muted font-bold mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {relArt.translation.category}
                    </span>
                    <h4 className={`text-sm md:text-base font-bold text-navy-brand leading-snug mb-3 group-hover:text-gold transition-colors duration-200 line-clamp-2 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                      <Link href={`/${locale}/blog/${relArt.slug}`}>
                        {relArt.translation.title}
                      </Link>
                    </h4>
                  </div>
                  
                  <div className="pt-4 border-t border-gold-muted/10 mt-4">
                    <Link 
                      href={`/${locale}/blog/${relArt.slug}`}
                      className={`inline-flex items-center gap-1 text-[10px] text-navy font-bold uppercase tracking-wider hover:text-gold transition-colors ${isRtl ? 'font-cairo' : 'font-dm'}`}
                    >
                      <span>{labels.btnRead}</span>
                      {isRtl ? <ArrowLeft size={10} /> : <ArrowRight size={10} />}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
