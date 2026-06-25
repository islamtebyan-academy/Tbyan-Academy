import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Globe, 
  Clock, 
  Calendar,
  MessageSquare
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import ArticleEditModal from '@/components/admin/ArticleEditModal';
import DeleteConfirmButton from '@/components/admin/DeleteConfirmButton';

interface ArticlesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    id?: string;
    new?: string;
    tab?: string;
  }>;
}

export default async function ArticlesPage({ params, searchParams }: ArticlesPageProps) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  
  const resolvedSearchParams = await searchParams;
  const editId = resolvedSearchParams.id || '';
  const isNew = resolvedSearchParams.new === 'true';
  const tab = resolvedSearchParams.tab || 'general';

  const supabase = await createClient();

  // 1. Fetch articles from Supabase (or return empty if query fails/table not migrated yet)
  let articles: any[] = [];
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      articles = data;
    }
  } catch (err) {
    console.error('Error loading articles list:', err);
  }

  // 2. Fetch selected article for editing
  let selectedArticle = null;
  if (editId) {
    try {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('id', editId)
        .single();
      selectedArticle = data;
    } catch (err) {
      console.error('Error fetching single article for edit:', err);
    }
  }

  const getLocalizedValue = (obj: any, key: string) => {
    if (!obj) return '';
    return obj[key] || obj['en'] || '';
  };

  return (
    <div className="space-y-8 relative">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-start border-b border-gold/15 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-midnight font-primary">
            {isRtl ? 'إدارة المقالات والبحوث العلمية' : 'Articles & Research Portal'}
          </h2>
          <p className="text-stone/70 text-xs mt-1.5 font-ui">
            {isRtl ? 'كتابة وتدقيق الأبحاث الإسلامية والمقالات المنهجية لطلاب العلم وتصنيفها علمياً' : 'Create, edit, classify, and publish scholarly articles and blog posts.'}
          </p>
        </div>

        <Link
          href={`/${locale}/portal/articles?new=true`}
          className="btn-gold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2.5 shadow-lg shadow-gold/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-ui cursor-pointer"
        >
          <Plus size={15} />
          <span>{isRtl ? 'كتابة مقال جديد' : 'Write New Article'}</span>
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-start">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <div 
              key={article.id} 
              className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-3xl p-0 shadow-[0_8px_30px_rgba(139,115,85,0.1)] hover:border-gold hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(139,115,85,0.18)] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Accent top gold line */}
              <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              <div>
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-[1.4rem]">
                  {article.image_url ? (
                    <img 
                      src={article.image_url} 
                      alt={getLocalizedValue(article.title, locale)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sand/45 bg-gold-muted/5">
                      <FileText size={48} className="stroke-[1] text-gold-hi" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent pointer-events-none" />
                  
                  {/* Category Badge overlay */}
                  <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-gold-muted/30 bg-navy/80 backdrop-blur-sm text-gold-hi font-dm z-10">
                    {article.category_key}
                  </span>

                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
                    {article.status === 'published' ? (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-sm font-ui backdrop-blur-sm">
                        {isRtl ? 'منشور' : 'Published'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-stone/10 text-stone/70 border border-gold/10 shadow-sm font-ui backdrop-blur-sm">
                        {isRtl ? 'مسودة' : 'Draft'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content wrapper */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className={`text-[1.2rem] text-midnight font-bold leading-snug group-hover:text-gold-hi transition-colors duration-300 line-clamp-2 ${
                      isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                    }`}>
                      {getLocalizedValue(article.title, locale)}
                    </h3>
                  </div>

                  {/* Slug Route */}
                  <p className="text-[10px] text-stone/40 font-mono font-semibold mb-3 truncate">
                    /{locale}/blog/{article.slug}
                  </p>

                  {/* Excerpt */}
                  <p className={`text-xs text-[#3A332A]/85 leading-relaxed mb-6 font-normal line-clamp-2 h-9 ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}>
                    {getLocalizedValue(article.excerpt, locale)}
                  </p>

                  {/* Metadata Stats */}
                  <div className="flex items-center justify-between border-t border-gold-muted/15 pt-4 text-stone/50 text-[10px] font-semibold font-dm">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} />
                      <span>{article.read_time} {isRtl ? 'دقائق قراءة' : 'min read'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 border-t border-gold/10 flex items-center justify-between gap-3 relative z-10">
                <Link
                  href={`/${locale}/portal/articles?id=${article.id}&tab=general`}
                  title={isRtl ? 'تعديل المقال' : 'Edit Article'}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg text-[10px] font-bold bg-gold/5 hover:bg-gold text-gold hover:text-midnight border border-gold/20 hover:border-gold transition-all duration-300 shadow-sm font-ui"
                >
                  <Edit3 size={11} />
                  <span>{isRtl ? 'تعديل المقال' : 'Edit Article'}</span>
                </Link>

                <Link
                  href={`/${locale}/portal/articles?id=${article.id}&tab=content`}
                  title={isRtl ? 'تعديل المحتوى والفقرات' : 'Edit Article Body Content'}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg text-[10px] font-bold bg-navy/5 hover:bg-navy text-navy hover:text-white border border-navy/20 hover:border-navy transition-all duration-300 shadow-sm font-ui"
                >
                  <FileText size={11} />
                  <span>{isRtl ? 'محتوى المقال' : 'Content'}</span>
                </Link>
                
                {/* Delete article form */}
                <form action={async () => {
                  'use server';
                  const { deleteArticle } = require('@/app/actions/articles');
                  await deleteArticle(article.id, locale);
                }}>
                  <DeleteConfirmButton 
                    isRtl={isRtl}
                    titleText={isRtl ? 'حذف المقال' : 'Delete Article'}
                    confirmMessage={isRtl 
                      ? 'هل أنت متأكد من رغبتك في حذف هذا المقال نهائياً؟ لا يمكن التراجع عن هذا الإجراء.' 
                      : 'Are you sure you want to permanently delete this article? This action cannot be undone.'
                    }
                  />
                </form>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center py-20 border border-dashed border-gold/20 rounded-2xl text-stone/50 text-xs font-semibold bg-[#FDFAF3]/30 font-ui">
            {isRtl ? 'لا توجد مقالات مضافة بقاعدة البيانات حتى الآن. يرجى تشغيل السكربت أو إضافة مقال.' : 'No articles found in the database catalog. Execute seeds or create one.'}
          </div>
        )}
      </div>

      {/* Centered Dynamic Modal Dialog */}
      {(isNew || selectedArticle) && (
        <ArticleEditModal
          selectedArticle={selectedArticle}
          isNew={isNew}
          locale={locale}
          initialTab={tab as 'general' | 'content'}
        />
      )}
    </div>
  );
}
