import React from 'react';
import { Languages } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import CmsEditor from '@/components/admin/CmsEditor';

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

  // 2. Fetch existing media files for the editor selector library
  let allMedia: string[] = [];
  try {
    const { data: uploadsFiles } = await supabase.storage
      .from('media')
      .list('uploads', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    const { data: coursesFiles } = await supabase.storage
      .from('media')
      .list('courses', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    if (uploadsFiles) {
      uploadsFiles.forEach((file: any) => {
        if (file.name === '.emptyFolderPlaceholder') return;
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(`uploads/${file.name}`);
        allMedia.push(publicUrl);
      });
    }

    if (coursesFiles) {
      coursesFiles.forEach((file: any) => {
        if (file.name === '.emptyFolderPlaceholder') return;
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(`courses/${file.name}`);
        allMedia.push(publicUrl);
      });
    }
  } catch (err) {
    console.error('Error fetching media files for editor:', err);
  }

  return (
    <div className="space-y-8 text-start">
      {/* Title */}
      <div className="border-b border-gold/15 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-midnight font-primary">
          {isRtl ? 'إدارة نصوص ومحتوى الموقع (CMS)' : 'Dynamic Content Manager (CMS)'}
        </h2>
        <p className="text-stone/70 text-xs mt-1.5 font-ui">
          {isRtl ? 'تعديل نصوص الصفحة الرئيسية وتذييل الصفحات باللغات الثلاث' : 'Update homepage content and footer details in Arabic, English, and French.'}
        </p>
      </div>

      {/* Warning/Guide banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 flex items-start gap-3 shadow-sm">
        <Languages size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-normal font-semibold">
          {isRtl 
            ? 'ملاحظة: يمكنك تعديل وحفظ كل قسم على حدة بالضغط على زر "حفظ هذا القسم فقط". سيتم نشر التحديثات فورياً ولن تؤثر على باقي الأقسام.'
            : 'Note: You can edit and save each section independently by clicking "Save Section". Updates will publish instantly without affecting other sections.'}
        </div>
      </div>

      {/* CMS Editor Tabs & Sections Component */}
      <CmsEditor initialSettings={settingsMap} locale={locale} initialMedia={allMedia} />
    </div>
  );
}

