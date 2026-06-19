import React from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Copy, 
  File, 
  Grid,
  ExternalLink,
  FolderOpen,
  Info
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

interface MediaPageProps {
  params: Promise<{ locale: string }>;
}

interface MediaItem {
  name: string;
  id: string;
  created_at: string;
  metadata: {
    size: number;
    mimetype: string;
  };
  folder: string;
  url: string;
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  const supabase = await createClient();

  // 1. Fetch files from 'uploads/' and 'courses/' folders in the 'media' bucket
  let allMedia: MediaItem[] = [];
  
  try {
    const { data: uploadsFiles } = await supabase.storage
      .from('media')
      .list('uploads', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    const { data: coursesFiles } = await supabase.storage
      .from('media')
      .list('courses', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    if (uploadsFiles) {
      uploadsFiles.forEach((file: any) => {
        // Skip placeholder files or directories
        if (file.name === '.emptyFolderPlaceholder') return;
        
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(`uploads/${file.name}`);

        allMedia.push({
          ...file,
          folder: 'uploads',
          url: publicUrl
        });
      });
    }

    if (coursesFiles) {
      coursesFiles.forEach((file: any) => {
        if (file.name === '.emptyFolderPlaceholder') return;

        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(`courses/${file.name}`);

        allMedia.push({
          ...file,
          folder: 'courses',
          url: publicUrl
        });
      });
    }

    // Sort by creation date
    allMedia.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (err) {
    console.error('Error fetching media files:', err);
  }

  const formatSize = (bytes: number) => {
    if (!bytes) return '—';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-8 text-start">
      {/* Title */}
      <div className="border-b border-gold/15 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-midnight font-primary">
          {isRtl ? 'مكتبة الوسائط والصور' : 'Media & Asset Library'}
        </h2>
        <p className="text-stone/70 text-xs mt-1.5 font-ui">
          {isRtl ? 'رفع الصور وتحديث ملفات الكورسات ونسخ الروابط المباشرة لاستخدامها بالموقع' : 'Upload images, optimize file sizes, and retrieve public resource URLs.'}
        </p>
      </div>

      {/* Guide Card */}
      <div className="p-4 rounded-2xl bg-[#F2ECD8]/30 border border-gold-muted/15 flex items-start gap-3 shadow-sm">
        <Info size={16} className="text-gold shrink-0 mt-0.5" />
        <div className="text-[11px] text-stone leading-normal">
          {isRtl 
            ? 'تنبيه: قبل البدء برفع الصور، تأكد من إنشاء حاوية (Bucket) باسم "media" وتفعيل الصلاحية العامة (Public Access) لها في حساب Supabase الخاص بك لضمان ظهور الصور للجميع.'
            : 'Prerequisite: Please ensure a public storage bucket named "media" exists in your Supabase storage panel for image assets to load correctly.'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Upload form Panel */}
        <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-6 rounded-2xl space-y-4 shadow-[0_8px_30px_rgba(139,115,85,0.05)] pattern-overlay">
          <h3 className="font-semibold text-midnight text-sm flex items-center gap-2 font-primary border-b border-gold-muted/15 pb-3">
            <Upload size={16} className="text-gold" />
            <span>{isRtl ? 'رفع صورة جديدة' : 'Upload New Media'}</span>
          </h3>

          <form action={async (formData) => {
            'use server';
            const { uploadMedia } = require('@/app/actions/media');
            await uploadMedia(null, formData);
          }} className="space-y-4 font-ui">
            <input type="hidden" name="locale" value={locale} />
            
            <div className="border border-dashed border-gold-muted/20 hover:border-gold/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors bg-white">
              <ImageIcon size={36} className="text-gold mb-3 animate-pulse" />
              <label htmlFor="mediaFile" className="sr-only">
                {isRtl ? 'اختر ملف الصورة' : 'Choose image file'}
              </label>
              <input
                type="file"
                id="mediaFile"
                name="mediaFile"
                accept="image/*"
                required
                title={isRtl ? 'اختر ملف الصورة' : 'Choose image file'}
                className="w-full text-center text-stone text-xs file:bg-gold/10 file:border-none file:text-gold file:px-3 file:py-1.5 file:rounded-lg file:mr-3 focus:outline-none file:cursor-pointer"
              />
            </div>
            
            <button
              type="submit"
              className="btn-gold w-full text-midnight font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer text-center shadow-md shadow-gold/10"
            >
              {isRtl ? 'رفع الصورة إلى المكتبة' : 'Upload Image'}
            </button>
          </form>
        </div>

        {/* Media grid View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-6 rounded-2xl space-y-6 shadow-[0_8px_30px_rgba(139,115,85,0.05)] pattern-overlay">
            <h3 className="font-semibold text-midnight text-sm flex items-center gap-2 font-primary border-b border-gold-muted/15 pb-3">
              <FolderOpen size={16} className="text-gold" />
              <span>{isRtl ? 'الصور المرفوعة' : 'Uploaded Assets Library'}</span>
            </h3>

            {allMedia.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {allMedia.map((file) => (
                  <div 
                    key={file.id} 
                    className="group bg-white border border-gold-muted/15 hover:border-gold/30 rounded-xl overflow-hidden shadow-sm flex flex-col relative transition-all duration-300"
                  >
                    {/* Folder Badge */}
                    <span className="absolute top-2 left-2 z-10 inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold bg-navy text-gold-hi uppercase tracking-wider">
                      {file.folder}
                    </span>

                    {/* Image Preview Box */}
                    <div className="h-32 bg-navy border-b border-gold-muted/10 flex items-center justify-center overflow-hidden relative">
                      <img 
                        src={file.url} 
                        alt={file.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* File details */}
                    <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between font-ui">
                      <div className="min-w-0 text-start">
                        <p className="text-[10px] font-bold text-midnight truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-[9px] text-stone/60 font-mono mt-0.5 font-semibold">
                          Size: {formatSize(file.metadata?.size)}
                        </p>
                      </div>

                      {/* Operations */}
                      <div className="flex gap-1.5 pt-2 border-t border-gold-muted/10">
                        <a 
                          href={file.url}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 bg-[#F2ECD8]/40 hover:bg-gold hover:text-white text-[9px] font-bold text-stone rounded-lg border border-gold-muted/20 transition-colors"
                        >
                          <ExternalLink size={10} />
                          <span>View</span>
                        </a>

                        {/* Delete media form */}
                        <form action={async () => {
                          'use server';
                          const { deleteMedia } = require('@/app/actions/media');
                          await deleteMedia(`${file.folder}/${file.name}`, locale);
                        }}>
                          <button
                            type="submit"
                            title={isRtl ? 'حذف الملف' : 'Delete file'}
                            aria-label={isRtl ? 'حذف الملف' : 'Delete file'}
                            className="p-1.5 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 border border-gold-muted/20 hover:border-rose-600 transition-all cursor-pointer"
                          >
                            <Trash2 size={10} />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-stone/50 text-xs font-semibold border border-dashed border-gold-muted/20 bg-white rounded-xl">
                {isRtl ? 'مكتبة الصور فارغة حالياً. قم برفع صورتك الأولى باليمين.' : 'The asset library is empty. Upload your first image to get started.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
