'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Image as ImageIcon, Upload, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { uploadMedia } from '@/app/actions/media';

interface MediaUploadFormProps {
  locale: string;
  isRtl: boolean;
}

export default function MediaUploadForm({ locale, isRtl }: MediaUploadFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    setSuccess(false);
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError(isRtl ? 'عذراً، يسمح برفع ملفات الصور فقط.' : 'Only image files are allowed.');
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Simulating upload/optimization steps
  useEffect(() => {
    if (!pending) {
      setCurrentStep(0);
      return;
    }

    // Step 0: Optimizing image preview & preparing chunk (0 to 1s)
    // Step 1: Uploading to Supabase bucket (1s to 2.5s)
    // Step 2: Processing and refreshing catalog (2.5s+)
    const t1 = setTimeout(() => {
      setCurrentStep(1);
    }, 1000);

    const t2 = setTimeout(() => {
      setCurrentStep(2);
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pending]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setError(isRtl ? 'يرجى اختيار ملف أولاً.' : 'Please select a file first.');
      return;
    }

    setPending(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('mediaFile', selectedFile);
    formData.append('locale', locale);

    try {
      const res = await uploadMedia(null, formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.url) {
        setSuccess(true);
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // Force Next.js to refresh server-rendered data listing
        router.refresh();
        // Hide success alert after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(isRtl ? 'فشل رفع الملف.' : 'Failed to upload file.');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-6 rounded-2xl space-y-4 shadow-[0_8px_30px_rgba(139,115,85,0.05)] relative overflow-hidden font-ui">
      {/* Dynamic Gold Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-muted/10 via-gold to-gold-muted/10 opacity-70" />

      <h3 className="font-semibold text-midnight text-sm flex items-center gap-2 font-primary border-b border-gold-muted/15 pb-3">
        <Upload size={16} className="text-gold" />
        <span>{isRtl ? 'رفع صورة جديدة' : 'Upload New Media'}</span>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Upload Dropzone Container */}
        <div className="border border-dashed border-gold-muted/20 hover:border-gold/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all bg-white relative min-h-[160px]">
          {previewUrl ? (
            <div className="relative group w-32 h-32 rounded-xl overflow-hidden shadow-inner border border-gold/15 bg-[#FDFAF3]/30 animate-fade-in animate-duration-300">
              <img src={previewUrl} alt="Upload preview" className="w-full h-full object-cover" />
              {!pending && (
                <button
                  type="button"
                  onClick={handleClearFile}
                  title={isRtl ? 'حذف الملف المختار' : 'Clear selected file'}
                  className="absolute top-1.5 right-1.5 p-1 bg-rose-600/90 text-white hover:bg-rose-700 rounded-lg shadow transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
              {pending && (
                <div className="absolute inset-0 bg-midnight/70 flex items-center justify-center backdrop-blur-[1px]">
                  <Loader2 className="animate-spin text-gold w-6 h-6" />
                </div>
              )}
            </div>
          ) : (
            <>
              <ImageIcon size={32} className="text-gold/80 mb-2 animate-pulse" />
              <label htmlFor="mediaFile" className="sr-only">
                {isRtl ? 'اختر ملف الصورة' : 'Choose image file'}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                id="mediaFile"
                name="mediaFile"
                accept="image/*"
                onChange={handleFileChange}
                required
                title={isRtl ? 'اختر ملف الصورة' : 'Choose image file'}
                className="w-full text-center text-stone text-xs file:bg-gold/10 file:border-none file:text-gold file:px-3 file:py-1.5 file:rounded-lg file:mr-3 focus:outline-none file:cursor-pointer font-ui file:font-semibold"
              />
              <p className="text-[9px] text-stone/40 mt-2.5">
                {isRtl ? 'الصيغ المدعومة: PNG, JPG, WEBP, GIF (الصور فقط)' : 'Supported formats: PNG, JPG, WEBP, GIF (Images only)'}
              </p>
            </>
          )}
        </div>

        {/* Selected file info */}
        {selectedFile && !pending && (
          <div className="bg-[#FDFAF3]/40 border border-gold/10 p-3 rounded-xl flex items-center justify-between text-[10px] animate-fade-in text-stone">
            <span className="truncate font-semibold max-w-[180px]">{selectedFile.name}</span>
            <span className="font-mono bg-gold/10 px-1.5 py-0.5 rounded text-gold-hi shrink-0">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[10px] font-semibold flex items-center gap-1.5 animate-fade-in font-ui text-start">
            <AlertCircle size={13} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-[10px] font-bold flex items-center gap-1.5 animate-fade-in font-ui text-start">
            <CheckCircle2 size={13} className="shrink-0" />
            <span>{isRtl ? 'تم رفع الصورة بنجاح وتحديث المكتبة!' : 'Image uploaded successfully! Library synced.'}</span>
          </div>
        )}

        {/* Action Button / Progress Steps */}
        {pending ? (
          <div className="bg-[#0d1624] border border-gold/10 p-3 rounded-xl space-y-2 text-start font-ui animate-fade-in">
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin text-gold w-4 h-4 shrink-0" />
              <span className="text-[10px] font-semibold text-white">
                {currentStep === 0 && (isRtl ? 'جاري تهيئة وتحسين الصورة...' : 'Preparing & optimizing image...')}
                {currentStep === 1 && (isRtl ? 'جاري رفع الملف إلى Supabase Storage...' : 'Uploading image to Supabase storage...')}
                {currentStep === 2 && (isRtl ? 'جاري حفظ الرابط وتحديث البيانات...' : 'Saving URL and refreshing catalog...')}
              </span>
            </div>
            {/* Simulated progress bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gold transition-all duration-700 ${
                  currentStep === 0 
                    ? 'w-[30%]' 
                    : currentStep === 1 
                      ? 'w-[70%]' 
                      : 'w-[95%]'
                }`}
              />
            </div>
          </div>
        ) : (
          <button
            type="submit"
            disabled={!selectedFile}
            className="w-full bg-gold hover:bg-gold-hi disabled:bg-gold-muted/5 disabled:text-stone/40 disabled:border-gold-muted/15 border border-transparent disabled:cursor-not-allowed text-midnight font-bold py-3 px-4 rounded-xl text-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-center shadow-md shadow-gold/10"
          >
            {isRtl ? 'رفع الصورة إلى المكتبة' : 'Upload Image'}
          </button>
        )}
      </form>
    </div>
  );
}
