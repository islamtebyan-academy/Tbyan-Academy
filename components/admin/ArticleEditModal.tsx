'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Settings, 
  FileText, 
  Globe, 
  Check, 
  HelpCircle,
  Loader2
} from 'lucide-react';
import { saveArticle } from '@/app/actions/articles';

interface ArticleEditModalProps {
  selectedArticle: any;
  isNew: boolean;
  locale: string;
  initialTab?: 'general' | 'content';
  existingCategories?: string[];
}

export default function ArticleEditModal({ selectedArticle, isNew, locale, initialTab, existingCategories = [] }: ArticleEditModalProps) {
  const router = useRouter();
  const isRtl = locale === 'ar';
  const [activeTab, setActiveTab] = useState<'general' | 'content'>(initialTab || 'general');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(selectedArticle?.image_url || null);
  const [imageSelected, setImageSelected] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [closedLocally, setClosedLocally] = useState(false);

  const standardCategories = ['quran', 'arabic', 'islamic', 'kids'];
  const mergedCategories = Array.from(new Set([...standardCategories, ...existingCategories]));

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    quran: { ar: 'علوم القرآن الكريم والتجويد', en: 'Quran & Tajweed' },
    arabic: { ar: 'اللسانيات واللغة العربية', en: 'Arabic Linguistics' },
    islamic: { ar: 'العلوم الشرعية والدراسات الإسلامية', en: 'Islamic Studies & Shariah' },
    kids: { ar: 'مسار النشء والشباب', en: 'Youth & Kids Path' },
    fiqh: { ar: 'أصول الفقه التشريعي', en: 'Jurisprudence (Fiqh)' },
    aqidah: { ar: 'العقيدة والتوحيد', en: 'Islamic Creed (Aqidah)' },
    logic: { ar: 'المنطق والبحث العلمي', en: 'Islamic Logic & Scholasticism' },
    literature: { ar: 'الأدب والبلاغة العربية', en: 'Rhetoric & Literature' },
    history: { ar: 'التاريخ الإسلامي والسير', en: 'Islamic History' }
  };

  // Sections state initialization
  const [sections, setSections] = useState<{
    ar: { subtitle: string; body: string; quote: string };
    en: { subtitle: string; body: string; quote: string };
    fr: { subtitle: string; body: string; quote: string };
  }[]>(() => {
    const arSecs = selectedArticle?.content?.ar?.sections || [];
    const enSecs = selectedArticle?.content?.en?.sections || [];
    const frSecs = selectedArticle?.content?.fr?.sections || [];
    const maxLen = Math.max(arSecs.length, enSecs.length, frSecs.length);
    
    const initial: any[] = [];
    for (let i = 0; i < maxLen; i++) {
      initial.push({
        ar: { 
          subtitle: arSecs[i]?.subtitle || '', 
          body: arSecs[i]?.body || '', 
          quote: arSecs[i]?.quote || '' 
        },
        en: { 
          subtitle: enSecs[i]?.subtitle || '', 
          body: enSecs[i]?.body || '', 
          quote: enSecs[i]?.quote || '' 
        },
        fr: { 
          subtitle: frSecs[i]?.subtitle || '', 
          body: frSecs[i]?.body || '', 
          quote: frSecs[i]?.quote || '' 
        }
      });
    }
    
    if (initial.length === 0) {
      initial.push({
        ar: { subtitle: '', body: '', quote: '' },
        en: { subtitle: '', body: '', quote: '' },
        fr: { subtitle: '', body: '', quote: '' }
      });
    }
    return initial;
  });

  // Category state initialization
  const [categorySelect, setCategorySelect] = useState(() => {
    const existing = selectedArticle?.category_key || 'quran';
    return standardCategories.includes(existing) ? existing : 'custom';
  });
  const [customCategory, setCustomCategory] = useState(() => {
    const existing = selectedArticle?.category_key || '';
    return standardCategories.includes(existing) ? '' : existing;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImageSelected(true);
    }
  };


  // Helper to convert DB content back to textarea strings
  const getSectionsString = (lang: string) => {
    if (!selectedArticle?.content?.[lang]?.sections) return '';
    const sections = selectedArticle.content[lang].sections;
    if (Array.isArray(sections)) {
      return sections.map((sec: any) => {
        const subtitle = sec.subtitle || '';
        const body = sec.body || '';
        const quote = sec.quote || '';
        return `${subtitle} | ${body} ${quote ? `| ${quote}` : ''}`;
      }).join('\n');
    }
    return '';
  };

  const getReferencesString = (lang: string) => {
    if (!selectedArticle?.content?.[lang]?.references) return '';
    const refs = selectedArticle.content[lang].references;
    if (Array.isArray(refs)) {
      return refs.join('\n');
    }
    return '';
  };

  // Setup animated progress steps during save
  useEffect(() => {
    if (!pending) {
      setCurrentStep(0);
      return;
    }

    if (imageSelected) {
      // Step 0: Optimize (duration: 1.2s)
      // Step 1: Upload (duration: 2.0s)
      // Step 2: Save database
      const t1 = setTimeout(() => {
        setCurrentStep(1);
      }, 1200);

      const t2 = setTimeout(() => {
        setCurrentStep(2);
      }, 3200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      // No image, start directly at step 0 (Save database)
      setCurrentStep(0);
    }
  }, [pending, imageSelected]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await saveArticle(formData);
      if (result?.error) {
        setError(result.error);
        setPending(false);
      } else {
        // Success: hide instantly locally for premium feedback feel
        setClosedLocally(true);
        router.push(`/${locale}/portal/articles`);
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
      setPending(false);
    }
  };

  if (closedLocally) return null;

  return (
    <div className={`fixed top-0 bottom-0 z-30 flex items-center justify-center p-0 bg-[#0d1624]/75 backdrop-blur-md animate-fade-in ${
      isRtl 
        ? 'right-0 md:right-68 lg:right-76 left-0' 
        : 'left-0 md:left-68 lg:left-76 right-0'
    }`}>
      {/* Backdrop dismiss */}
      <Link 
        href={`/${locale}/portal/articles`}
        className="absolute inset-0 cursor-default"
      />

      {/* Modal Panel taking full remaining screen space with padding */}
      <div className="w-full h-full bg-gradient-to-b from-white to-[#FDFAF3] rounded-none relative flex flex-col text-start overflow-hidden animate-fade-up pattern-overlay">
        {/* Top Accent Gold Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-80 z-20" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gold/15 bg-white relative z-10 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-midnight font-primary">
              {isNew ? (isRtl ? 'إضافة مقال جديد للمدونة' : 'Create New Blog Post') : (isRtl ? 'تعديل بيانات المقال' : 'Edit Blog Post')}
            </h3>
            <p className="text-[10px] text-gold uppercase tracking-widest font-bold font-mono mt-0.5">
              {isNew ? (isRtl ? 'أبحاث ومقالات جديدة' : 'Knowledge Article') : `ID: ${selectedArticle.id.substring(0, 8)}...`}
            </p>
          </div>
          <Link
            href={`/${locale}/portal/articles`}
            className="w-9 h-9 rounded-full bg-gold/5 border border-gold/20 hover:bg-gold/10 flex items-center justify-center text-stone hover:text-midnight transition-colors"
          >
            <X size={16} />
          </Link>
        </div>

        {/* Tab Bar Navigation */}
        <div className="flex border-b border-gold/10 bg-[#FDFAF3]/50 px-6 shrink-0 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 py-4 px-4 text-xs font-bold font-ui transition-all border-b-2 -mb-[1px] ${
              activeTab === 'general'
                ? 'border-gold text-gold-hi'
                : 'border-transparent text-stone/60 hover:text-midnight'
            }`}
          >
            <Settings size={14} />
            <span>{isRtl ? 'البيانات العامة للمقال' : 'General Details'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 py-4 px-4 text-xs font-bold font-ui transition-all border-b-2 -mb-[1px] ${
              activeTab === 'content'
                ? 'border-gold text-gold-hi'
                : 'border-transparent text-stone/60 hover:text-midnight'
            }`}
          >
            <FileText size={14} />
            <span>{isRtl ? 'محتوى المقال والأبحاث' : 'Article Body Content'}</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mx-8 mt-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl relative z-10 shrink-0 font-ui flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-600 font-bold">✕</button>
          </div>
        )}

        {/* Form Wrap */}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex-grow flex flex-col min-h-0 relative z-10">
          {selectedArticle && <input type="hidden" name="articleId" value={selectedArticle.id} />}
          <input type="hidden" name="locale" value={locale} />
          {selectedArticle?.image_url && <input type="hidden" name="existingImageUrl" value={selectedArticle.image_url} />}

          {/* Form Body (Scrollable & Scrollbar-free) */}
          <div className="flex-grow overflow-y-auto no-scrollbar p-6 md:p-8 space-y-6">
            
            {/* --- TAB A: General Settings --- */}
            <div className={activeTab === 'general' ? 'space-y-6' : 'hidden'}>
              
              {/* Slug, Category, Date, Read Time, Booking Topic, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'رابط المقال (Slug) *' : 'Article URL Slug *'}
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="e.g. history-of-recitations"
                    defaultValue={selectedArticle?.slug || ''}
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3 px-4 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category-select" className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'التصنيف العلمي (Category) *' : 'Academic Category *'}
                  </label>
                  <select
                    id="category-select"
                    value={categorySelect}
                    onChange={(e) => setCategorySelect(e.target.value)}
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3.5 px-4 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui cursor-pointer"
                  >
                    {mergedCategories.map(cat => {
                      const label = categoryLabels[cat]
                        ? (isRtl ? categoryLabels[cat].ar : categoryLabels[cat].en)
                        : cat;
                      return (
                        <option key={cat} value={cat}>
                          {label} ({cat})
                        </option>
                      );
                    })}
                    <option value="custom">{isRtl ? '+ إضافة تصنيف جديد...' : '+ Add Custom Category...'}</option>
                  </select>
                  {categorySelect === 'custom' && (
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'اكتب اسم التصنيف بالإنجليزية (مثال: hadith)' : 'Enter custom category key (e.g. hadith)'}
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full bg-white border border-gold text-midnight mt-2 py-3 px-4 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
                    />
                  )}
                  <input type="hidden" name="categoryKey" value={categorySelect === 'custom' ? customCategory : categorySelect} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="status-select" className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'حالة النشر' : 'Publication Status'}
                  </label>
                  <select
                    id="status-select"
                    name="status"
                    title={isRtl ? 'حالة النشر' : 'Publication Status'}
                    defaultValue={selectedArticle?.status || 'published'}
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3.5 px-4 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui cursor-pointer"
                  >
                    <option value="published">{isRtl ? 'منشور (يظهر للجميع)' : 'Published'}</option>
                    <option value="draft">{isRtl ? 'مسودة (مخفي)' : 'Hidden (Draft)'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'تاريخ النشر' : 'Publication Date'}
                  </label>
                  <input
                    type="text"
                    name="date"
                    placeholder="e.g. 28 May 2026"
                    defaultValue={selectedArticle?.date || new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3 px-4 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'وقت القراءة (بالدقائق)' : 'Read Time (Minutes)'}
                  </label>
                  <input
                    type="number"
                    name="readTime"
                    placeholder="e.g. 8"
                    defaultValue={selectedArticle?.read_time || 5}
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3 px-4 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="booking-topic-select" className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'موضوع الحجز المرتبط (Booking Topic)' : 'Connected Booking Topic'}
                  </label>
                  <select
                    id="booking-topic-select"
                    name="bookingTopic"
                    title={isRtl ? 'موضوع الحجز المرتبط (Booking Topic)' : 'Connected Booking Topic'}
                    defaultValue={selectedArticle?.booking_topic || 'general'}
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3.5 px-4 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui cursor-pointer"
                  >
                    <option value="quran">{isRtl ? 'قرآن كريم وتجويد' : 'Quran & Tajweed'}</option>
                    <option value="fiqh">{isRtl ? 'علوم فقهية وشرعية' : 'Shariah & Jurisprudence'}</option>
                    <option value="arabic">{isRtl ? 'لغة عربية ونحو' : 'Arabic & Grammar'}</option>
                    <option value="aqidah">{isRtl ? 'عقيدة وتوحيد' : 'Islamic Creed'}</option>
                    <option value="logic">{isRtl ? 'منطق وفلسفة' : 'Logic & Theology'}</option>
                    <option value="literature">{isRtl ? 'بلاغة وأدب' : 'Rhetoric & Literature'}</option>
                    <option value="history">{isRtl ? 'تاريخ إسلامي' : 'Islamic History'}</option>
                    <option value="parenting">{isRtl ? 'تربية واستشارات' : 'Parenting'}</option>
                    <option value="general">{isRtl ? 'عام' : 'General Inquiry'}</option>
                  </select>
                </div>
              </div>

              {/* Trilingual Titles */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'عنوان المقال باللغات الثلاث *' : 'Article Titles (Trilingual) *'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic *</span>
                    <input
                      type="text"
                      name="titleAr"
                      required
                      placeholder="تاريخ القراءات القرآنية"
                      defaultValue={selectedArticle?.title?.ar || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English *</span>
                    <input
                      type="text"
                      name="titleEn"
                      required
                      placeholder="History of Quranic Recitations"
                      defaultValue={selectedArticle?.title?.en || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French *</span>
                    <input
                      type="text"
                      name="titleFr"
                      required
                      placeholder="L'Histoire des Récitations Coraniques"
                      defaultValue={selectedArticle?.title?.fr || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                </div>
              </div>

              {/* Trilingual Excerpts */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'الوصف المختصر باللغات الثلاث (المعاينة بالصفحة الرئيسية)' : 'Excerpts (Trilingual)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <textarea
                      name="excerptAr"
                      rows={3}
                      placeholder="وصف مختصر للمقال يظهر بالمدونة الرئيسية..."
                      defaultValue={selectedArticle?.excerpt?.ar || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <textarea
                      name="excerptEn"
                      rows={3}
                      placeholder="Short excerpt showing in main blog listing..."
                      defaultValue={selectedArticle?.excerpt?.en || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <textarea
                      name="excerptFr"
                      rows={3}
                      placeholder="Résumé court affiché dans le catalogue..."
                      defaultValue={selectedArticle?.excerpt?.fr || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Thumbnail Image Upload */}
              <div className="space-y-2">
                <label htmlFor="article-image-file" className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                  {isRtl ? 'صورة غلاف المقال' : 'Cover Image / Illustration'}
                </label>
                <div className="flex items-center gap-4 bg-[#FDFAF3]/30 p-4 border border-gold/10 rounded-2xl">
                  {previewUrl && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gold/20 shadow-inner bg-white">
                      <img src={previewUrl} alt="Cover" className="w-full h-full object-cover" />
                      {imageSelected && (
                        <div className="absolute inset-0 bg-gold/10 flex items-center justify-center backdrop-blur-[0.5px]">
                          <span className="bg-gold text-midnight text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                            {isRtl ? 'جديدة' : 'New'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex-grow space-y-1">
                    <input
                      type="file"
                      id="article-image-file"
                      name="imageFile"
                      accept="image/*"
                      onChange={handleImageChange}
                      title={isRtl ? 'صورة غلاف المقال' : 'Cover Image / Illustration'}
                      className="w-full text-xs text-stone/65 file:bg-gold/15 file:hover:bg-gold/20 file:border-none file:text-gold-hi file:px-3 file:py-1.5 file:rounded-lg file:mr-3 file:font-semibold file:cursor-pointer focus:outline-none font-ui"
                    />
                    <span className="block text-[9px] text-stone/45 font-ui">
                      {imageSelected 
                        ? (isRtl ? 'تم اختيار الصورة وجاهزة للحفظ والرفع تلقائياً' : 'Image selected and ready for upload.')
                        : (isRtl ? 'يفضل مقاس 1200x800 بكسل' : 'Recommended resolution: 1200x800px')
                      }
                    </span>
                  </div>
                </div>
              </div>


              {/* Trilingual CTA messages */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'رسالة التسجيل الخاصة بالمقال (CTA Message)' : 'CTA Direct Booking Message (Trilingual)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <input
                      type="text"
                      name="ctaAr"
                      placeholder="ابدأ رحلة ضبط تلاوتك الآن بالسند المتصل..."
                      defaultValue={selectedArticle?.cta_message?.ar || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <input
                      type="text"
                      name="ctaEn"
                      placeholder="Begin your journey of perfect recitation..."
                      defaultValue={selectedArticle?.cta_message?.en || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <input
                      type="text"
                      name="ctaFr"
                      placeholder="Commencez votre voyage d'étude du Coran..."
                      defaultValue={selectedArticle?.cta_message?.fr || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* --- TAB B: Article Content --- */}
            <div className={activeTab === 'content' ? 'space-y-6' : 'hidden'}>
              
              {/* Guidelines */}
              <div className="bg-[#FDFAF3] border border-gold-hi/20 rounded-2xl p-4 text-xs leading-relaxed text-[#3A332A] font-ui space-y-2 text-start">
                <div className="font-bold text-gold-hi flex items-center gap-1.5">
                  <HelpCircle size={14} />
                  <span>{isRtl ? 'كيفية تنسيق محتوى المقالات والبحوث' : 'Article Body Content Guidelines'}</span>
                </div>
                <p>
                  {isRtl 
                    ? '1. المقدمة والخاتمة: اكتب فقرة تقديمية شاملة وفقرة تلخيصية ختامية.'
                    : '1. Introduction & Conclusion: Enter a comprehensive introductory paragraph and a concluding summary.'}
                </p>
                <p>
                  {isRtl 
                    ? '2. فقرات المقال الوسطى (Sections): اكتبها بصيغة "العنوان الجانبي | محتوى الفقرة | اقتباس كلامي اختيارياً" (كل فقرة في سطر منفصل يفصل بين أجزائها الرمز |).' 
                    : '2. Middle Sections: Enter them in the format "Subtitle | Body Paragraph Text | Optional Quote Text" (write one section per line, separated by |).'}
                </p>
                <p>
                  {isRtl 
                    ? '3. المصادر والمراجع: اكتب كل مصدر أو مرجع في سطر منفصل.' 
                    : '3. References: Enter each book or source document on a separate line.'}
                </p>
                <div className="font-mono bg-white border border-gold/10 p-2 rounded-lg text-[10px] text-stone/75 select-all">
                  {isRtl ? 'الأحرف السبعة والقراءات العشر | يكثر الخلط بين المفهومين... | «إن هذا العلم دين...» — الإمام سيرين' : 'Reconciling Reason & Revelation | The theological methodology rests on... | "Intellect establishes..." — Al-Ash\'ari'}
                </div>
              </div>

              {/* Trilingual Intros */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'مقدمة المقال (Introduction)' : 'Article Introduction (Trilingual)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <textarea
                      name="introAr"
                      rows={3}
                      placeholder="إن القرآن الكريم نزل بلسان عربي مبين..."
                      defaultValue={selectedArticle?.content?.ar?.intro || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <textarea
                      name="introEn"
                      rows={3}
                      placeholder="The Holy Quran was revealed in a clear Arabic tongue..."
                      defaultValue={selectedArticle?.content?.en?.intro || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <textarea
                      name="introFr"
                      rows={3}
                      placeholder="Le Saint Coran a été révélé dans une langue arabe claire..."
                      defaultValue={selectedArticle?.content?.fr?.intro || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Paragraph Block Editor */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gold-muted/10 pb-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                    {isRtl ? 'فقرات المقال الرئيسية' : 'Main Paragraph Sections'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSections([...sections, {
                        ar: { subtitle: '', body: '', quote: '' },
                        en: { subtitle: '', body: '', quote: '' },
                        fr: { subtitle: '', body: '', quote: '' }
                      }]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold/10 hover:bg-gold text-gold hover:text-midnight border border-gold/20 hover:border-gold font-bold text-[10px] uppercase font-ui transition-all"
                  >
                    <span>+ {isRtl ? 'إضافة فقرة جديدة' : 'Add Section Block'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {sections.map((sec, idx) => (
                    <div key={idx} className="bg-white border border-gold-muted/20 p-5 rounded-2xl shadow-sm relative group">
                      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                        <button
                          type="button"
                          onClick={() => {
                            if (sections.length === 1) return;
                            const next = [...sections];
                            next.splice(idx, 1);
                            setSections(next);
                          }}
                          disabled={sections.length === 1}
                          className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 hover:bg-rose-100 flex items-center justify-center text-rose-500 hover:text-rose-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title={isRtl ? 'حذف هذه الفقرة' : 'Remove Section'}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <h5 className="font-bold text-midnight text-xs font-primary mb-4 pb-2 border-b border-gold-muted/10">
                        {isRtl ? `القسم / الفقرة رقم ${idx + 1}` : `Section #${idx + 1}`}
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Arabic translation */}
                        <div className="space-y-3 bg-[#FCFAF7] border border-gold-muted/10 p-3 rounded-xl">
                          <span className="block text-[9px] font-bold text-gold font-ui uppercase">اللغة العربية</span>
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="العنوان الجانبي"
                              value={sec.ar.subtitle}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx].ar.subtitle = e.target.value;
                                setSections(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <textarea
                              placeholder="محتوى الفقرة"
                              rows={3}
                              value={sec.ar.body}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx].ar.body = e.target.value;
                                setSections(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <input
                              type="text"
                              placeholder="اقتباس كلامي (اختياري)"
                              value={sec.ar.quote}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx].ar.quote = e.target.value;
                                setSections(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                          </div>
                        </div>

                        {/* English translation */}
                        <div className="space-y-3 bg-[#FCFAF7] border border-gold-muted/10 p-3 rounded-xl">
                          <span className="block text-[9px] font-bold text-gold font-ui uppercase">English</span>
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Subtitle"
                              value={sec.en.subtitle}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx].en.subtitle = e.target.value;
                                setSections(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <textarea
                              placeholder="Body Paragraph text"
                              rows={3}
                              value={sec.en.body}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx].en.body = e.target.value;
                                setSections(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <input
                              type="text"
                              placeholder="Quote (optional)"
                              value={sec.en.quote}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx].en.quote = e.target.value;
                                setSections(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                          </div>
                        </div>

                        {/* French translation */}
                        <div className="space-y-3 bg-[#FCFAF7] border border-gold-muted/10 p-3 rounded-xl">
                          <span className="block text-[9px] font-bold text-gold font-ui uppercase">Français</span>
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Sous-titre"
                              value={sec.fr.subtitle}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx].fr.subtitle = e.target.value;
                                setSections(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <textarea
                              placeholder="Texte du paragraphe"
                              rows={3}
                              value={sec.fr.body}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx].fr.body = e.target.value;
                                setSections(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <input
                              type="text"
                              placeholder="Citation (optionnel)"
                              value={sec.fr.quote}
                              onChange={(e) => {
                                const next = [...sections];
                                next[idx].fr.quote = e.target.value;
                                setSections(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                <input type="hidden" name="sectionsAr" value={sections.map(s => `${s.ar.subtitle || ''} | ${s.ar.body || ''} ${s.ar.quote ? `| ${s.ar.quote}` : ''}`).join('\n')} />
                <input type="hidden" name="sectionsEn" value={sections.map(s => `${s.en.subtitle || ''} | ${s.en.body || ''} ${s.en.quote ? `| ${s.en.quote}` : ''}`).join('\n')} />
                <input type="hidden" name="sectionsFr" value={sections.map(s => `${s.fr.subtitle || ''} | ${s.fr.body || ''} ${s.fr.quote ? `| ${s.fr.quote}` : ''}`).join('\n')} />
              </div>

              {/* Trilingual Conclusions */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'خاتمة المقال (Conclusion)' : 'Article Conclusion (Trilingual)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <textarea
                      name="conclusionAr"
                      rows={3}
                      placeholder="يبقى علم القراءات شاهداً حياً..."
                      defaultValue={selectedArticle?.content?.ar?.conclusion || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <textarea
                      name="conclusionEn"
                      rows={3}
                      placeholder="Sunni theology remains the cornerstone..."
                      defaultValue={selectedArticle?.content?.en?.conclusion || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <textarea
                      name="conclusionFr"
                      rows={3}
                      placeholder="La méthodologie orthodoxe reste le pilier..."
                      defaultValue={selectedArticle?.content?.fr?.conclusion || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                    />
                  </div>
                </div>
              </div>

              {/* Trilingual References */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'المصادر والمراجع (مصدر في كل سطر)' : 'Scholarly References (One per line)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <textarea
                      name="referencesAr"
                      rows={4}
                      placeholder="ابن الجزري، النشر في القراءات العشر.\nالسيوطي، الإتقان..."
                      defaultValue={getReferencesString('ar')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <textarea
                      name="referencesEn"
                      rows={4}
                      placeholder="Ibn al-Jazari, Al-Nashr...\nAl-Suyuti, Al-Itqan..."
                      defaultValue={getReferencesString('en')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <textarea
                      name="referencesFr"
                      rows={4}
                      placeholder="Al-Tabari, Tarikh al-Rusul...\nAl-Suyuti, Al-Itqan..."
                      defaultValue={getReferencesString('fr')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gold/15 bg-[#FDFAF3]/30 shrink-0 relative z-10 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
            <div className="flex flex-col sm:flex-row gap-3 flex-grow sm:flex-grow-0">
              <button
                type="submit"
                disabled={pending}
                className="bg-gold hover:bg-gold-hi text-midnight font-bold py-3.5 px-7 rounded-xl text-xs transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer text-center font-ui shadow-md shadow-gold/10 inline-flex items-center justify-center gap-2"
              >
                {pending ? (
                  <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
                ) : (
                  <>
                    <Check size={14} />
                    <span>{isRtl ? 'حفظ ونشر المقال' : 'Save & Publish Post'}</span>
                  </>
                )}
              </button>

              {!isNew && selectedArticle && (
                <a
                  href={`/${locale}/blog/${selectedArticle.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 bg-navy text-white hover:bg-[#182234] border border-[#1e2e46] rounded-xl text-xs font-semibold text-center transition-all font-ui inline-flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Globe size={13} />
                  <span>{isRtl ? 'معاينة المقال الحي' : 'Preview Live Post'}</span>
                </a>
              )}
            </div>
            <Link
              href={`/${locale}/portal/articles`}
              className="px-6 py-3.5 bg-gold-muted/5 hover:bg-gold-muted/10 text-stone border border-gold-muted/15 rounded-xl text-xs font-semibold text-center transition-colors font-ui"
            >
              {isRtl ? 'إلغاء' : 'Cancel'}
            </Link>
          </div>
        </form>

        {/* Premium Step-by-Step Loading Overlay */}
        {pending && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#0d1624]/90 backdrop-blur-md animate-fade-in font-ui text-center">
            <div className="max-w-xs w-full space-y-6">
              <Loader2 className="animate-spin text-gold w-12 h-12 mx-auto" />
              
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-primary">
                  {isRtl ? 'جاري حفظ البيانات وتحديث الموقع' : 'Saving Changes & Updating Post'}
                </h4>
                <p className="text-[10px] text-gold uppercase font-mono tracking-widest">
                  {isRtl ? 'منصة تعليم التبيان' : 'Tebyan Academy Cms'}
                </p>
              </div>

              {/* Step Indicators */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-start space-y-3">
                {imageSelected ? (
                  <>
                    {/* Step 1: Optimize */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                        currentStep > 0 
                          ? 'bg-gold text-midnight' 
                          : currentStep === 0 
                            ? 'bg-gold/20 text-gold animate-pulse border border-gold/40' 
                            : 'bg-white/10 text-white/40'
                      }`}>
                        {currentStep > 0 ? '✓' : '1'}
                      </div>
                      <span className={currentStep === 0 ? 'text-gold font-semibold' : currentStep > 0 ? 'text-white/60' : 'text-white/40'}>
                        {isRtl ? 'جاري معالجة وتحسين الصورة...' : 'Compressing & optimizing image...'}
                      </span>
                    </div>

                    {/* Step 2: Upload */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                        currentStep > 1 
                          ? 'bg-gold text-midnight' 
                          : currentStep === 1 
                            ? 'bg-gold/20 text-gold animate-pulse border border-gold/40' 
                            : 'bg-white/10 text-white/40'
                      }`}>
                        {currentStep > 1 ? '✓' : '2'}
                      </div>
                      <span className={currentStep === 1 ? 'text-gold font-semibold' : currentStep > 1 ? 'text-white/60' : 'text-white/40'}>
                        {isRtl ? 'جاري رفع غلاف المقال إلى التخزين السحابي...' : 'Uploading image to cloud storage...'}
                      </span>
                    </div>

                    {/* Step 3: Database Save */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                        currentStep === 2 
                          ? 'bg-gold/20 text-gold animate-pulse border border-gold/40' 
                          : 'bg-white/10 text-white/40'
                      }`}>
                        {currentStep === 2 ? '●' : '3'}
                      </div>
                      <span className={currentStep === 2 ? 'text-gold font-semibold' : 'text-white/40'}>
                        {isRtl ? 'جاري حفظ التعديلات ونشر المقال...' : 'Saving database records...'}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold bg-gold/20 text-gold animate-pulse border border-gold/40">
                      ●
                    </div>
                    <span className="text-gold font-semibold">
                      {isRtl ? 'جاري حفظ التعديلات ونشر المقال...' : 'Saving database records...'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
