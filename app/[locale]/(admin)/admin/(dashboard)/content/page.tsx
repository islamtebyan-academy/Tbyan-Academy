import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Layout, 
  HelpCircle, 
  Save, 
  Languages, 
  HeartHandshake
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { saveSettings } from '@/app/actions/settings';

interface ContentPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  const supabase = await createClient();

  // 1. Fetch current settings keys
  const { data: dbSettings } = await supabase
    .from('settings')
    .select('*');

  // Convert database array list to a helper object dictionary
  const settingsMap: Record<string, any> = {};
  if (dbSettings) {
    dbSettings.forEach((item) => {
      settingsMap[item.key] = item.value;
    });
  }

  // Pre-configured list of editable website text segments
  const cmsFields = [
    {
      key: 'hero_tagline',
      label: isRtl ? 'شعار الهيرو (Tagline)' : 'Hero Section Tagline',
      placeholder: 'e.g. A Scholarly Institution for Classical Islamic...',
      type: 'text'
    },
    {
      key: 'hero_headline',
      label: isRtl ? 'عنوان الهيرو الرئيسي (Headline)' : 'Hero Main Headline',
      placeholder: 'e.g. Pairing Traditional Isnad with Academic Specialization',
      type: 'text'
    },
    {
      key: 'hero_description',
      label: isRtl ? 'وصف الهيرو التعريفي (Description)' : 'Hero Paragraph Description',
      placeholder: 'e.g. Receive verified Islamic sciences live on Zoom...',
      type: 'textarea'
    },
    {
      key: 'about_teaser_title',
      label: isRtl ? 'عنوان النبذة التعريفية (About Teaser Title)' : 'About Us Teaser Title',
      placeholder: 'e.g. Traditional Foundations for Modern Seekers',
      type: 'text'
    },
    {
      key: 'about_teaser_description',
      label: isRtl ? 'وصف النبذة التعريفية (About Teaser Description)' : 'About Us Teaser Paragraph',
      placeholder: 'e.g. Islam Tebyan Academy was founded to preserve...',
      type: 'textarea'
    },
    {
      key: 'footer_verse',
      label: isRtl ? 'الآية القرآنية في ذيل الصفحة (Footer Verse)' : 'Quranic Verse in Footer',
      placeholder: 'e.g. "And We have sent down to you the Book as a clarification..."',
      type: 'textarea'
    }
  ];

  return (
    <div className="space-y-8 text-start">
      {/* Title */}
      <div className="border-b border-gold/15 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-midnight font-primary">
          {isRtl ? 'إدارة نصوص ومحتوى الموقع (CMS)' : 'Dynamic Content Manager (CMS)'}
        </h2>
        <p className="text-stone/70 text-xs mt-1.5 font-ui">
          {isRtl ? 'تعديل نصوص الصفحة الرئيسية والتعريفية وقسم الإسناد باللغات الثلاث' : 'Update homepage marketing copies and footer details in Arabic, English, and French.'}
        </p>
      </div>

      {/* Warning/Guide banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 flex items-start gap-3 shadow-sm">
        <Languages size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-normal font-semibold">
          {isRtl 
            ? 'تنبيه: التعديلات في هذا القسم ستقوم بالكتابة فوق الترجمات الثابتة لنموذج الموقع بالخادم العام. يُرجى توفير الترجمات بدقة في الحقول الثلاثة لتفادي إظهار نصوص فارغة.'
            : 'Important: Values updated here will override local language JSON definitions. Please provide inputs for all three languages to prevent empty text sections.'}
        </div>
      </div>

      {/* Main CMS Form */}
      <form action={saveSettings as any} className="space-y-8">
        <input type="hidden" name="locale" value={locale} />

        <div className="space-y-6">
          {cmsFields.map((field) => {
            const currentValues = settingsMap[field.key] || {};
            return (
              <div 
                key={field.key} 
                className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-6 rounded-2xl space-y-4 shadow-[0_8px_30px_rgba(139,115,85,0.05)] pattern-overlay"
              >
                {/* Field Label Header */}
                <div className="flex items-center gap-2 pb-3 border-b border-gold-muted/15">
                  <FileText size={16} className="text-gold" />
                  <span className="text-sm font-bold text-midnight">{field.label}</span>
                </div>

                {/* Trilingual inputs grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Arabic */}
                  <div className="space-y-2">
                    <span className="inline-flex px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-200">
                      Arabic (العربية)
                    </span>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={`${field.key}__ar`}
                        defaultValue={currentValues.ar || ''}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none transition-all font-ui"
                      />
                    ) : (
                      <input
                        type="text"
                        name={`${field.key}__ar`}
                        defaultValue={currentValues.ar || ''}
                        placeholder={field.placeholder}
                        className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                      />
                    )}
                  </div>

                  {/* English */}
                  <div className="space-y-2">
                    <span className="inline-flex px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide bg-indigo-50 text-indigo-800 border border-indigo-200">
                      English
                    </span>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={`${field.key}__en`}
                        defaultValue={currentValues.en || ''}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none transition-all font-ui"
                      />
                    ) : (
                      <input
                        type="text"
                        name={`${field.key}__en`}
                        defaultValue={currentValues.en || ''}
                        placeholder={field.placeholder}
                        className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                      />
                    )}
                  </div>

                  {/* French */}
                  <div className="space-y-2">
                    <span className="inline-flex px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide bg-rose-50 text-rose-800 border border-rose-200">
                      French
                    </span>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={`${field.key}__fr`}
                        defaultValue={currentValues.fr || ''}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none transition-all font-ui"
                      />
                    ) : (
                      <input
                        type="text"
                        name={`${field.key}__fr`}
                        defaultValue={currentValues.fr || ''}
                        placeholder={field.placeholder}
                        className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3 rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Submission */}
        <div className="flex justify-end pt-4 border-t border-gold-muted/15">
          <button
            type="submit"
            className="btn-gold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2.5 shadow-lg shadow-gold/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-ui cursor-pointer"
          >
            <Save size={16} />
            <span>{isRtl ? 'حفظ ونشر التعديلات الفورية' : 'Save & Publish Copy'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
