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
import { saveCourse } from '@/app/actions/courses';

interface CourseEditModalProps {
  selectedCourse: any;
  isNew: boolean;
  locale: string;
  initialTab?: 'general' | 'content';
}

export default function CourseEditModal({ selectedCourse, isNew, locale, initialTab }: CourseEditModalProps) {
  const router = useRouter();
  const isRtl = locale === 'ar';
  const [activeTab, setActiveTab] = useState<'general' | 'content'>(initialTab || 'general');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(selectedCourse?.image_url || null);
  const [imageSelected, setImageSelected] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [closedLocally, setClosedLocally] = useState(false);

  // Outcomes state initialization
  const [outcomes, setOutcomes] = useState<{
    ar: { title: string; desc: string };
    en: { title: string; desc: string };
    fr: { title: string; desc: string };
  }[]>(() => {
    const arOut = selectedCourse?.outcomes?.ar || [];
    const enOut = selectedCourse?.outcomes?.en || [];
    const frOut = selectedCourse?.outcomes?.fr || [];
    const maxLen = Math.max(arOut.length, enOut.length, frOut.length);
    
    const initial: any[] = [];
    for (let i = 0; i < maxLen; i++) {
      initial.push({
        ar: { title: arOut[i]?.title || '', desc: arOut[i]?.desc || '' },
        en: { title: enOut[i]?.title || '', desc: enOut[i]?.desc || '' },
        fr: { title: frOut[i]?.title || '', desc: frOut[i]?.desc || '' }
      });
    }
    
    if (initial.length === 0) {
      initial.push({
        ar: { title: '', desc: '' },
        en: { title: '', desc: '' },
        fr: { title: '', desc: '' }
      });
    }
    return initial;
  });

  // Study plan state initialization
  const [studyPlan, setStudyPlan] = useState<{
    ar: { title: string; desc: string };
    en: { title: string; desc: string };
    fr: { title: string; desc: string };
  }[]>(() => {
    const arPlan = selectedCourse?.study_plan?.ar || [];
    const enPlan = selectedCourse?.study_plan?.en || [];
    const frPlan = selectedCourse?.study_plan?.fr || [];
    const maxLen = Math.max(arPlan.length, enPlan.length, frPlan.length);
    
    const initial: any[] = [];
    for (let i = 0; i < maxLen; i++) {
      initial.push({
        ar: { title: arPlan[i]?.title || '', desc: arPlan[i]?.desc || '' },
        en: { title: enPlan[i]?.title || '', desc: enPlan[i]?.desc || '' },
        fr: { title: frPlan[i]?.title || '', desc: frPlan[i]?.desc || '' }
      });
    }
    
    if (initial.length === 0) {
      initial.push({
        ar: { title: '', desc: '' },
        en: { title: '', desc: '' },
        fr: { title: '', desc: '' }
      });
    }
    return initial;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImageSelected(true);
    }
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

  // Helper to convert DB arrays/JSON back to textarea line items
  const getWhatYouLearnString = (lang: string) => {
    if (!selectedCourse?.what_you_learn?.[lang]) return '';
    const arr = selectedCourse.what_you_learn[lang];
    if (Array.isArray(arr)) {
      return arr.join('\n');
    }
    return '';
  };

  const getKeyValueString = (fieldKey: 'outcomes' | 'study_plan', lang: string) => {
    if (!selectedCourse?.[fieldKey]?.[lang]) return '';
    const arr = selectedCourse[fieldKey][lang];
    if (Array.isArray(arr)) {
      return arr.map((item: any) => `${item.title || ''} | ${item.desc || ''}`).join('\n');
    }
    return '';
  };

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await saveCourse(formData);
      if (result?.error) {
        setError(result.error);
        setPending(false);
      } else {
        // Success: hide instantly locally for premium feedback feel
        setClosedLocally(true);
        router.push(`/${locale}/portal/courses`);
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
      setPending(false);
    }
  };

  if (closedLocally) return null;

  return (
    <div className={`fixed top-0 bottom-0 z-30 flex items-center justify-center p-5 bg-[#0d1624]/75 backdrop-blur-md animate-fade-in ${
      isRtl 
        ? 'right-0 md:right-68 lg:right-76 left-0' 
        : 'left-0 md:left-68 lg:left-76 right-0'
    }`}>
      {/* Backdrop dismiss */}
      <Link 
        href={`/${locale}/portal/courses`}
        className="absolute inset-0 cursor-default"
      />

      {/* Modal Panel taking full remaining screen space with padding */}
      <div className="w-full h-full bg-gradient-to-b from-white to-[#FDFAF3] border border-gold-muted/20 rounded-[2rem] shadow-2xl relative flex flex-col text-start overflow-hidden animate-fade-up pattern-overlay">
        {/* Top Accent Gold Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-80 z-20" />

        {/* 1. Header (Static) */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gold/15 bg-white relative z-10 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-midnight font-primary flex items-center gap-2.5">
              <span>{isNew ? (isRtl ? 'إضافة كورس جديد للمنصة' : 'Create New Course') : (isRtl ? 'تعديل بيانات الكورس' : 'Edit Course Details')}</span>
            </h3>
            <p className="text-[10px] text-gold uppercase tracking-widest font-bold font-mono mt-0.5">
              {isNew ? (isRtl ? 'مسودة كورس جديدة' : 'Syllabus Scaffolding') : `ID: ${selectedCourse.id.substring(0, 8)}...`}
            </p>
          </div>
          <Link
            href={`/${locale}/portal/courses`}
            className="w-9 h-9 rounded-full bg-gold/5 border border-gold/20 hover:bg-gold/10 flex items-center justify-center text-stone hover:text-midnight transition-colors"
          >
            <X size={16} />
          </Link>
        </div>

        {/* 2. Tab Bar Navigation (Static) */}
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
            <span>{isRtl ? 'بيانات الكورس' : 'Course Settings'}</span>
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
            <span>{isRtl ? 'محتوى الكورس' : 'Course Content'}</span>
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
          {selectedCourse && <input type="hidden" name="courseId" value={selectedCourse.id} />}
          <input type="hidden" name="locale" value={locale} />
          {selectedCourse?.image_url && <input type="hidden" name="existingImageUrl" value={selectedCourse.image_url} />}

          {/* 3. Form Body (Scrollable & Scrollbar-free) */}
          <div className="flex-grow overflow-y-auto no-scrollbar p-6 md:p-8 space-y-6">
            
            {/* --- TAB A: General Settings --- */}
            <div className={activeTab === 'general' ? 'space-y-6' : 'hidden'}>
              {/* Basic Route / Slug & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'رابط الكورس (Slug) *' : 'Course URL Slug *'}
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="e.g. quranic-tajweed"
                    defaultValue={selectedCourse?.slug || ''}
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3.5 px-4 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="status-select" className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'حالة النشر' : 'Publication Status'}
                  </label>
                  <select
                    id="status-select"
                    name="status"
                    title={isRtl ? 'حالة النشر' : 'Publication Status'}
                    defaultValue={selectedCourse?.status || 'hidden'}
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3.5 px-4 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui cursor-pointer"
                  >
                    <option value="published">{isRtl ? 'منشور (يظهر للجميع)' : 'Published'}</option>
                    <option value="hidden">{isRtl ? 'مسودة (مخفي)' : 'Hidden (Draft)'}</option>
                  </select>
                </div>
              </div>

              {/* Trilingual Titles */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'عنوان الكورس باللغات الثلاث *' : 'Course Titles (Trilingual) *'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic *</span>
                    <input
                      type="text"
                      name="titleAr"
                      required
                      placeholder="القرآن الكريم والتجويد"
                      defaultValue={selectedCourse?.title?.ar || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English *</span>
                    <input
                      type="text"
                      name="titleEn"
                      required
                      placeholder="Quran & Tajweed"
                      defaultValue={selectedCourse?.title?.en || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French *</span>
                    <input
                      type="text"
                      name="titleFr"
                      required
                      placeholder="Coran et Tajwid"
                      defaultValue={selectedCourse?.title?.fr || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                </div>
              </div>

              {/* Trilingual Short Descriptions */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'الوصف المختصر باللغات الثلاث' : 'Short Descriptions (Trilingual)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <textarea
                      name="shortDescAr"
                      rows={2}
                      placeholder="الوصف المختصر باللغة العربية"
                      defaultValue={selectedCourse?.short_description?.ar || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <textarea
                      name="shortDescEn"
                      rows={2}
                      placeholder="Short description in English"
                      defaultValue={selectedCourse?.short_description?.en || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <textarea
                      name="shortDescFr"
                      rows={2}
                      placeholder="Description courte en Français"
                      defaultValue={selectedCourse?.short_description?.fr || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Trilingual Full Descriptions */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'الوصف التفصيلي باللغات الثلاث' : 'Full Descriptions (Trilingual)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <textarea
                      name="fullDescAr"
                      rows={4}
                      placeholder="الوصف التفصيلي والمنهج الأكاديمي"
                      defaultValue={selectedCourse?.full_description?.ar || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <textarea
                      name="fullDescEn"
                      rows={4}
                      placeholder="Full academic detail and syllabus..."
                      defaultValue={selectedCourse?.full_description?.en || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <textarea
                      name="fullDescFr"
                      rows={4}
                      placeholder="Description détaillée du programme d'études..."
                      defaultValue={selectedCourse?.full_description?.fr || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Instructor & Duration Trilingual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Instructor */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'المعلم / الشيوخ باللغات الثلاث' : 'Instructor / Faculty (Trilingual)'}
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="instructorAr"
                      placeholder="شيوخ معتمدون من الأزهر"
                      defaultValue={selectedCourse?.instructor?.ar || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                    />
                    <input
                      type="text"
                      name="instructorEn"
                      placeholder="Azhari Scholars"
                      defaultValue={selectedCourse?.instructor?.en || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                    />
                    <input
                      type="text"
                      name="instructorFr"
                      placeholder="Scholars d'Al-Azhar"
                      defaultValue={selectedCourse?.instructor?.fr || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'المدة الزمنية باللغات الثلاث' : 'Duration (Trilingual)'}
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="durationAr"
                      placeholder="40 ساعة دراسية"
                      defaultValue={selectedCourse?.duration?.ar || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                    />
                    <input
                      type="text"
                      name="durationEn"
                      placeholder="40 Study Hours"
                      defaultValue={selectedCourse?.duration?.en || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                    />
                    <input
                      type="text"
                      name="durationFr"
                      placeholder="40 heures d'étude"
                      defaultValue={selectedCourse?.duration?.fr || ''}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                    />
                  </div>
                </div>
              </div>

              {/* Course Image Upload */}
              <div className="space-y-2">
                <label htmlFor="imageFile" className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                  {isRtl ? 'صورة الكورس أو البرنامج' : 'Course Thumbnail Image'}
                </label>
                <div className="flex items-center gap-4 bg-[#FDFAF3]/30 p-4 border border-gold/10 rounded-2xl">
                  {previewUrl && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gold/20 shadow-inner bg-white">
                      <img src={previewUrl} alt="Thumbnail" className="w-full h-full object-cover" />
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
                      id="imageFile"
                      name="imageFile"
                      accept="image/*"
                      onChange={handleImageChange}
                      title={isRtl ? 'صورة الكورس أو البرنامج' : 'Course Thumbnail Image'}
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


              {/* External Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'رابط التسجيل المباشر (Google Forms)' : 'Direct Registration URL'}
                  </label>
                  <input
                    type="url"
                    name="registrationLink"
                    defaultValue={selectedCourse?.registration_link || ''}
                    placeholder="https://docs.google.com/forms/..."
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3.5 px-4 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'رابط زووم الدراسي (Zoom Link)' : 'Zoom Classroom Link'}
                  </label>
                  <input
                    type="url"
                    name="zoomLink"
                    defaultValue={selectedCourse?.zoom_link || ''}
                    placeholder="https://zoom.us/j/..."
                    className="w-full bg-white border border-gold-hi/25 text-midnight py-3.5 px-4 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
                  />
                </div>
              </div>
            </div>

            {/* --- TAB B: Page Content --- */}
            <div className={activeTab === 'content' ? 'space-y-6' : 'hidden'}>
              
              {/* Info alert about syntax formatting */}
              <div className="bg-[#FDFAF3] border border-gold-hi/20 rounded-2xl p-4 text-xs leading-relaxed text-[#3A332A] font-ui space-y-2 text-start">
                <div className="font-bold text-gold-hi flex items-center gap-1.5">
                  <HelpCircle size={14} />
                  <span>{isRtl ? 'توجيهات تنسيق المحتوى التفصيلي' : 'Formatting Guidelines'}</span>
                </div>
                <p>
                  {isRtl 
                    ? '1. سكاشن (ماذا ستتعلم): اكتب كل نقطة في سطر منفصل.' 
                    : '1. What you learn: Type each bullet point on a separate line.'}
                </p>
                <p>
                  {isRtl 
                    ? '2. سكاشن (المخرجات التعليمية) و(الخطة الدراسية): اكتبها بتنسيق "العنوان الرئيسي | الشرح التفصيلي" (كل عنوان وشرح في سطر منفصل يفصل بينهما الرمز |).' 
                    : '2. Outcomes & Study Plan: Use the format "Title | Description", writing one item per line (separated by the | symbol).'}
                </p>
                <div className="font-mono bg-white border border-gold/10 p-2 rounded-lg text-[10px] text-stone/75 select-all">
                  {isRtl ? 'علم التجويد | دراسة أحكام النون الساكنة والتنوين بالتفصيل\nمخارج الحروف | التعرف على المخارج الصحيحة السبعة عشر' : 'Tajweed Science | Detail study of Noon and Tanween\nLetters Outlets | Learn the seventeen articulation points'}
                </div>
              </div>

              {/* 1. What you learn (Trilingual) */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'ماذا ستتعلم في هذا الكورس (سطر لكل نقطة)' : 'What Students Learn (One point per line)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <textarea
                      name="whatYouLearnAr"
                      rows={5}
                      placeholder="قراءة القرآن بالتجويد\nمخارج الحروف الصحيحة"
                      defaultValue={getWhatYouLearnString('ar')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <textarea
                      name="whatYouLearnEn"
                      rows={5}
                      placeholder="Reciting Quran with Tajweed\nCorrect Arabic pronunciation"
                      defaultValue={getWhatYouLearnString('en')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <textarea
                      name="whatYouLearnFr"
                      rows={5}
                      placeholder="Récitation correcte avec Tajwid\nPrononciation précise des lettres"
                      defaultValue={getWhatYouLearnString('fr')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Outcomes Editor */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gold-muted/10 pb-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                    {isRtl ? 'المخرجات التعليمية للكورس' : 'Learning Outcomes'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOutcomes([...outcomes, {
                        ar: { title: '', desc: '' },
                        en: { title: '', desc: '' },
                        fr: { title: '', desc: '' }
                      }]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold/10 hover:bg-gold text-gold hover:text-midnight border border-gold/20 hover:border-gold font-bold text-[10px] uppercase font-ui transition-all"
                  >
                    <span>+ {isRtl ? 'إضافة مخرج جديد' : 'Add Outcome'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {outcomes.map((item, idx) => (
                    <div key={idx} className="bg-white border border-gold-muted/20 p-5 rounded-2xl shadow-sm relative group">
                      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                        <button
                          type="button"
                          onClick={() => {
                            if (outcomes.length === 1) return;
                            const next = [...outcomes];
                            next.splice(idx, 1);
                            setOutcomes(next);
                          }}
                          disabled={outcomes.length === 1}
                          className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 hover:bg-rose-100 flex items-center justify-center text-rose-500 hover:text-rose-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title={isRtl ? 'حذف هذا المخرج' : 'Remove Outcome'}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <h5 className="font-bold text-midnight text-xs font-primary mb-4 pb-2 border-b border-gold-muted/10">
                        {isRtl ? `المخرج التعليمي رقم ${idx + 1}` : `Outcome #${idx + 1}`}
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Arabic translation */}
                        <div className="space-y-3 bg-[#FCFAF7] border border-gold-muted/10 p-3 rounded-xl">
                          <span className="block text-[9px] font-bold text-gold font-ui uppercase">اللغة العربية</span>
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="عنوان المخرج"
                              value={item.ar.title}
                              onChange={(e) => {
                                const next = [...outcomes];
                                next[idx].ar.title = e.target.value;
                                setOutcomes(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <textarea
                              placeholder="الشرح التفصيلي"
                              rows={3}
                              value={item.ar.desc}
                              onChange={(e) => {
                                const next = [...outcomes];
                                next[idx].ar.desc = e.target.value;
                                setOutcomes(next);
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
                              placeholder="Outcome Title"
                              value={item.en.title}
                              onChange={(e) => {
                                const next = [...outcomes];
                                next[idx].en.title = e.target.value;
                                setOutcomes(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <textarea
                              placeholder="Description details"
                              rows={3}
                              value={item.en.desc}
                              onChange={(e) => {
                                const next = [...outcomes];
                                next[idx].en.desc = e.target.value;
                                setOutcomes(next);
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
                              placeholder="Titre de l'objectif"
                              value={item.fr.title}
                              onChange={(e) => {
                                const next = [...outcomes];
                                next[idx].fr.title = e.target.value;
                                setOutcomes(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <textarea
                              placeholder="Détails de l'objectif"
                              rows={3}
                              value={item.fr.desc}
                              onChange={(e) => {
                                const next = [...outcomes];
                                next[idx].fr.desc = e.target.value;
                                setOutcomes(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                <input type="hidden" name="outcomesAr" value={outcomes.map(o => `${o.ar.title || ''} | ${o.ar.desc || ''}`).join('\n')} />
                <input type="hidden" name="outcomesEn" value={outcomes.map(o => `${o.en.title || ''} | ${o.en.desc || ''}`).join('\n')} />
                <input type="hidden" name="outcomesFr" value={outcomes.map(o => `${o.fr.title || ''} | ${o.fr.desc || ''}`).join('\n')} />
              </div>

              {/* Dynamic Study Plan Editor */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gold-muted/10 pb-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                    {isRtl ? 'المنهج الدراسي / الخطة الزمنية' : 'Study Plan Roadmap'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setStudyPlan([...studyPlan, {
                        ar: { title: '', desc: '' },
                        en: { title: '', desc: '' },
                        fr: { title: '', desc: '' }
                      }]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold/10 hover:bg-gold text-gold hover:text-midnight border border-gold/20 hover:border-gold font-bold text-[10px] uppercase font-ui transition-all"
                  >
                    <span>+ {isRtl ? 'إضافة مرحلة جديدة' : 'Add Stage'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {studyPlan.map((stage, idx) => (
                    <div key={idx} className="bg-white border border-gold-muted/20 p-5 rounded-2xl shadow-sm relative group">
                      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                        <button
                          type="button"
                          onClick={() => {
                            if (studyPlan.length === 1) return;
                            const next = [...studyPlan];
                            next.splice(idx, 1);
                            setStudyPlan(next);
                          }}
                          disabled={studyPlan.length === 1}
                          className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 hover:bg-rose-100 flex items-center justify-center text-rose-500 hover:text-rose-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title={isRtl ? 'حذف هذه المرحلة' : 'Remove Stage'}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <h5 className="font-bold text-midnight text-xs font-primary mb-4 pb-2 border-b border-gold-muted/10">
                        {isRtl ? `المرحلة الدراسية رقم ${idx + 1}` : `Stage #${idx + 1}`}
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Arabic translation */}
                        <div className="space-y-3 bg-[#FCFAF7] border border-gold-muted/10 p-3 rounded-xl">
                          <span className="block text-[9px] font-bold text-gold font-ui uppercase">اللغة العربية</span>
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="اسم المرحلة"
                              value={stage.ar.title}
                              onChange={(e) => {
                                const next = [...studyPlan];
                                next[idx].ar.title = e.target.value;
                                setStudyPlan(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <textarea
                              placeholder="تفاصيل المنهج"
                              rows={3}
                              value={stage.ar.desc}
                              onChange={(e) => {
                                const next = [...studyPlan];
                                next[idx].ar.desc = e.target.value;
                                setStudyPlan(next);
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
                              placeholder="Stage Title"
                              value={stage.en.title}
                              onChange={(e) => {
                                const next = [...studyPlan];
                                next[idx].en.title = e.target.value;
                                setStudyPlan(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <textarea
                              placeholder="Curriculum details"
                              rows={3}
                              value={stage.en.desc}
                              onChange={(e) => {
                                const next = [...studyPlan];
                                next[idx].en.desc = e.target.value;
                                setStudyPlan(next);
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
                              placeholder="Titre de l'étape"
                              value={stage.fr.title}
                              onChange={(e) => {
                                const next = [...studyPlan];
                                next[idx].fr.title = e.target.value;
                                setStudyPlan(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                            <textarea
                              placeholder="Détails du programme"
                              rows={3}
                              value={stage.fr.desc}
                              onChange={(e) => {
                                const next = [...studyPlan];
                                next[idx].fr.desc = e.target.value;
                                setStudyPlan(next);
                              }}
                              className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                <input type="hidden" name="studyPlanAr" value={studyPlan.map(p => `${p.ar.title || ''} | ${p.ar.desc || ''}`).join('\n')} />
                <input type="hidden" name="studyPlanEn" value={studyPlan.map(p => `${p.en.title || ''} | ${p.en.desc || ''}`).join('\n')} />
                <input type="hidden" name="studyPlanFr" value={studyPlan.map(p => `${p.fr.title || ''} | ${p.fr.desc || ''}`).join('\n')} />
              </div>

            </div>

          </div>

          {/* 4. Footer Actions (Static) */}
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
                    <span>{isRtl ? 'حفظ الكورس والمنهج' : 'Save Course & Syllabus'}</span>
                  </>
                )}
              </button>

              {!isNew && selectedCourse && (
                <a
                  href={`/${locale}/programs/${selectedCourse.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 bg-navy text-white hover:bg-[#182234] border border-[#1e2e46] rounded-xl text-xs font-semibold text-center transition-all font-ui inline-flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Globe size={13} />
                  <span>{isRtl ? 'معاينة صفحة الكورس الحية' : 'Preview Live Course'}</span>
                </a>
              )}
            </div>
            <Link
              href={`/${locale}/portal/courses`}
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
                  {isRtl ? 'جاري حفظ البيانات وتحديث الموقع' : 'Saving Changes & Updating Catalog'}
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
                        {isRtl ? 'جاري رفع الملف إلى التخزين السحابي...' : 'Uploading image to cloud storage...'}
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
                        {isRtl ? 'جاري حفظ التعديلات في قاعدة البيانات...' : 'Saving database records...'}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold bg-gold/20 text-gold animate-pulse border border-gold/40">
                      ●
                    </div>
                    <span className="text-gold font-semibold">
                      {isRtl ? 'جاري حفظ التعديلات في قاعدة البيانات...' : 'Saving database records...'}
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
