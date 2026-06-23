'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Settings, 
  FileText, 
  Globe, 
  Check, 
  HelpCircle 
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
      } else {
        // Success: reload path or redirect to admin catalog page
        router.push(`/${locale}/admin/courses`);
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={`fixed top-0 bottom-0 z-30 flex items-center justify-center p-5 bg-[#0d1624]/75 backdrop-blur-md animate-fade-in ${
      isRtl 
        ? 'right-0 md:right-68 lg:right-76 left-0' 
        : 'left-0 md:left-68 lg:left-76 right-0'
    }`}>
      {/* Backdrop dismiss */}
      <Link 
        href={`/${locale}/admin/courses`}
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
            href={`/${locale}/admin/courses`}
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
            <span>{isRtl ? 'بيانات الكارت' : 'Card Settings'}</span>
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
            <span>{isRtl ? 'محتوى الصفحة' : 'Page Content'}</span>
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
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col min-h-0 relative z-10">
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
                  {selectedCourse?.image_url && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gold/20 shadow-inner bg-white">
                      <img src={selectedCourse.image_url} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-grow space-y-1">
                    <input
                      type="file"
                      id="imageFile"
                      name="imageFile"
                      accept="image/*"
                      title={isRtl ? 'صورة الكورس أو البرنامج' : 'Course Thumbnail Image'}
                      className="w-full text-xs text-stone/65 file:bg-gold/15 file:hover:bg-gold/20 file:border-none file:text-gold-hi file:px-3 file:py-1.5 file:rounded-lg file:mr-3 file:font-semibold file:cursor-pointer focus:outline-none font-ui"
                    />
                    <span className="block text-[9px] text-stone/40 font-ui">
                      {isRtl ? 'يفضل مقاس 1200x800 بكسل' : 'Recommended resolution: 1200x800px'}
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

              {/* 2. Outcomes (Trilingual) */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'المخرجات التعليمية (العنوان | الوصف - سطر لكل مخرج)' : 'Learning Outcomes (Title | Description - One per line)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <textarea
                      name="outcomesAr"
                      rows={5}
                      placeholder="إتقان التجويد | إتقان كافة الأحكام العملية بالتلاوة\nحفظ وتثبيت | حفظ الأجزاء المقررة بالسند"
                      defaultValue={getKeyValueString('outcomes', 'ar')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <textarea
                      name="outcomesEn"
                      rows={5}
                      placeholder="Tajweed Mastery | Master all recitation rules\nIjaza path | Prepare student for connected isnad"
                      defaultValue={getKeyValueString('outcomes', 'en')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <textarea
                      name="outcomesFr"
                      rows={5}
                      placeholder="Maîtrise du Tajwid | Appliquer avec rigueur les règles\nPréparation à l'Ijaza | Se préparer à la transmission orale"
                      defaultValue={getKeyValueString('outcomes', 'fr')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Study Plan Roadmap (Trilingual) */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                  {isRtl ? 'الخطة الزمنية / المنهج الدراسي (المرحلة | التفاصيل - سطر لكل مرحلة)' : 'Study Plan / Curriculum (Stage | Details - One per line)'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</span>
                    <textarea
                      name="studyPlanAr"
                      rows={5}
                      placeholder="المرحلة الأولى | ضبط مخارج الحروف وحركاتها\nالمرحلة الثانية | أحكام المدود والتنوين المتنوعة"
                      defaultValue={getKeyValueString('study_plan', 'ar')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</span>
                    <textarea
                      name="studyPlanEn"
                      rows={5}
                      placeholder="Stage 1 | Mastering letters pronunciation\nStage 2 | Study the advanced rules of elongation"
                      defaultValue={getKeyValueString('study_plan', 'en')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</span>
                    <textarea
                      name="studyPlanFr"
                      rows={5}
                      placeholder="Étape 1 | Articulation et phonétique de base\nÉtape 2 | Les règles complexes des allongements"
                      defaultValue={getKeyValueString('study_plan', 'fr')}
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                    />
                  </div>
                </div>
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
              href={`/${locale}/admin/courses`}
              className="px-6 py-3.5 bg-gold-muted/5 hover:bg-gold-muted/10 text-stone border border-gold-muted/15 rounded-xl text-xs font-semibold text-center transition-colors font-ui"
            >
              {isRtl ? 'إلغاء' : 'Cancel'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
