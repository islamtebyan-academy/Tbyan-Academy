import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Globe, 
  FileText, 
  Link as LinkIcon, 
  Video, 
  X,
  Layers,
  Clock,
  UserCheck
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { saveCourse } from '@/app/actions/courses';

interface CoursesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    id?: string;
    new?: string;
  }>;
}

export default async function CoursesPage({ params, searchParams }: CoursesPageProps) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  
  const resolvedSearchParams = await searchParams;
  const editId = resolvedSearchParams.id || '';
  const isNew = resolvedSearchParams.new === 'true';

  const supabase = await createClient();

  // 1. Fetch courses list
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  // 2. Fetch course to edit
  let selectedCourse = null;
  if (editId) {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('id', editId)
      .single();
    selectedCourse = data;
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
            {isRtl ? 'إدارة الكورسات والبرامج الأكاديمية' : 'Course Catalog Management'}
          </h2>
          <p className="text-stone/70 text-xs mt-1.5 font-ui">
            {isRtl ? 'إضافة وتعديل وحذف البرامج الأكاديمية والمناهج وتحديث روابط الزوم والتسجيل' : 'Add new academy course offerings, upload images, and control publication status.'}
          </p>
        </div>

        <Link
          href={`/${locale}/admin/courses?new=true`}
          className="btn-gold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2.5 shadow-lg shadow-gold/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-ui cursor-pointer"
        >
          <Plus size={15} />
          <span>{isRtl ? 'إضافة كورس جديد' : 'Create New Course'}</span>
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-start">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-3xl p-0 shadow-[0_8px_30px_rgba(139,115,85,0.1)] hover:border-gold hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(139,115,85,0.18)] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Top Accent Gold Bar */}
              <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              {/* Watermark in background */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[url('/images/pattern-8star.svg')] bg-contain bg-no-repeat opacity-[0.015] group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none filter sepia hue-rotate-15 brightness-95" />

              <div>
                {/* Course Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-[1.4rem]">
                  {course.image_url ? (
                    <img 
                      src={course.image_url} 
                      alt={getLocalizedValue(course.title, locale)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sand/45 bg-gold-muted/5">
                      <BookOpen size={48} className="stroke-[1] text-gold-hi" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent pointer-events-none" />
                  
                  {/* Category Badge overlay */}
                  <span className={`absolute top-4 left-4 rtl:left-auto rtl:right-4 text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-gold-muted/30 bg-navy/80 backdrop-blur-sm text-gold-hi font-dm z-10`}>
                    {isRtl ? 'مسار الأكاديمية' : 'Academy Track'}
                  </span>

                  {/* Status indicator on top of image (right side) */}
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
                    {course.status === 'published' ? (
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
                  {/* Icon & Title row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className={`text-[1.3rem] text-midnight font-bold leading-snug group-hover:text-gold-hi transition-colors duration-300 ${
                      isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
                    }`}>
                      {getLocalizedValue(course.title, locale)}
                    </h3>
                    <div className="p-2 bg-gold-muted/10 rounded-xl border border-gold/15 text-gold-hi transition-colors duration-300">
                      <BookOpen className="w-5 h-5 text-gold-hi" />
                    </div>
                  </div>

                  {/* Slug Route */}
                  <p className="text-[10px] text-stone/40 font-mono font-semibold mb-3 truncate">
                    /{locale}/programs/{course.slug}
                  </p>

                  {/* Description */}
                  <p className={`text-sm text-[#3A332A]/85 leading-relaxed mb-6 font-normal line-clamp-2 h-10 description-justify-start ${
                    isRtl ? 'font-noto' : 'font-lora'
                  }`}>
                    {getLocalizedValue(course.short_description, locale)}
                  </p>

                  {/* Syllabus Stats Metadata Section */}
                  <div className="grid grid-cols-2 gap-2 py-4 border-t border-b border-gold-muted/15 text-center bg-[#FDFAF3]/30 rounded-xl">
                    <div className="space-y-1 truncate px-2">
                      <span className="block text-[9px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                        {isRtl ? 'المعلم' : 'Faculty'}
                      </span>
                      <span className={`block text-xs text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {getLocalizedValue(course.instructor, locale) || (isRtl ? 'عضو هيئة تدريس أزهري' : 'Azhari Faculty')}
                      </span>
                    </div>
                    <div className="space-y-1 truncate px-2 border-l border-gold-muted/10">
                      <span className="block text-[9px] uppercase tracking-wider text-stone/50 font-bold font-dm">
                        {isRtl ? 'المدة' : 'Duration'}
                      </span>
                      <span className={`block text-xs text-gold font-bold leading-none ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {getLocalizedValue(course.duration, locale) || '40 Study Hours'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 border-t border-gold/10 flex items-center justify-between gap-3 relative z-10">
                <Link
                  href={`/${locale}/admin/courses?id=${course.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg text-xs font-bold bg-gold/5 hover:bg-gold text-gold hover:text-midnight border border-gold/20 hover:border-gold transition-all duration-300 shadow-sm font-ui"
                >
                  <Edit3 size={12} />
                  <span>{isRtl ? 'تعديل الكورس' : 'Edit Details'}</span>
                </Link>
                
                {/* Delete course form */}
                <form action={async () => {
                  'use server';
                  const { deleteCourse } = require('@/app/actions/courses');
                  await deleteCourse(course.id, locale);
                }}>
                  <button
                    type="submit"
                    title={isRtl ? 'حذف الكورس' : 'Delete Course'}
                    aria-label={isRtl ? 'حذف الكورس' : 'Delete Course'}
                    className="p-2 rounded-lg text-rose-600 hover:text-rose-100 hover:bg-rose-600 border border-gold/15 hover:border-rose-600 transition-all duration-300 cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </form>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center py-20 border border-dashed border-gold/20 rounded-2xl text-stone/50 text-xs font-semibold bg-[#FDFAF3]/30 font-ui">
            {isRtl ? 'لا توجد كورسات مضافة بقاعدة البيانات حتى الآن.' : 'No courses found in the Supabase catalog.'}
          </div>
        )}
      </div>

      {/* Add/Edit Dynamic Sidebar Drawer */}
      {(isNew || selectedCourse) && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-end animate-fade-in">
          {/* Backdrop dismiss */}
          <Link 
            href={`/${locale}/admin/courses`}
            className="absolute inset-0 cursor-default"
          />

          {/* Drawer Inner Panel */}
          <div className="w-full max-w-2xl h-full bg-gradient-to-b from-white to-[#FDFAF3] border-l border-gold/25 p-8 shadow-2xl relative flex flex-col text-start overflow-y-auto animate-slide-in pattern-overlay">
            {/* Top Accent Gold Bar */}
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-80" />

            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-gold/15 mb-6 relative z-10">
              <div>
                <h3 className="text-lg font-bold text-midnight font-primary">
                  {isNew ? (isRtl ? 'إضافة كورس جديد للمنصة' : 'Create New Course') : (isRtl ? 'تعديل بيانات الكورس' : 'Edit Course Details')}
                </h3>
                <p className="text-[10px] text-gold uppercase tracking-widest font-bold font-mono mt-0.5">
                  {isNew ? (isRtl ? 'مسودة كورس جديدة' : 'Syllabus Scaffolding') : `ID: ${selectedCourse.id.substring(0, 8)}...`}
                </p>
              </div>
              <Link
                href={`/${locale}/admin/courses`}
                className="w-8 h-8 rounded-full bg-gold/5 border border-gold/20 hover:bg-gold/10 flex items-center justify-center text-stone hover:text-midnight transition-colors"
              >
                <X size={15} />
              </Link>
            </div>

            {/* Form */}
            <form action={saveCourse as any} className="space-y-6 flex-grow flex flex-col justify-between relative z-10">
              {selectedCourse && <input type="hidden" name="courseId" value={selectedCourse.id} />}
              <input type="hidden" name="locale" value={locale} />
              {selectedCourse?.image_url && <input type="hidden" name="existingImageUrl" value={selectedCourse.image_url} />}

              <div className="space-y-6">
                {/* Basic Route / Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
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
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                    >
                      <option value="published">{isRtl ? 'منشور (يظهر للجميع)' : 'Published'}</option>
                      <option value="hidden">{isRtl ? 'مسودة (مخفي)' : 'Hidden (Draft)'}</option>
                    </select>
                  </div>
                </div>

                {/* 1. Trilingual Titles */}
                <div className="space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                    {isRtl ? 'عنوان الكورس باللغات الثلاث' : 'Course Titles (Trilingual)'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic *</span>
                      <input
                        type="text"
                        name="titleAr"
                        placeholder="القرآن الكريم والتجويد"
                        defaultValue={selectedCourse?.title?.ar || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">English *</span>
                      <input
                        type="text"
                        name="titleEn"
                        placeholder="Quran & Tajweed"
                        defaultValue={selectedCourse?.title?.en || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone/50 font-bold uppercase font-ui">French *</span>
                      <input
                        type="text"
                        name="titleFr"
                        placeholder="Coran et Tajwid"
                        defaultValue={selectedCourse?.title?.fr || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Trilingual Short Descriptions */}
                <div className="space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                    {isRtl ? 'الوصف المختصر باللغات الثلاث' : 'Short Descriptions (Trilingual)'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="shortDescAr" className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</label>
                      <textarea
                        id="shortDescAr"
                        name="shortDescAr"
                        rows={2}
                        title="Short description in Arabic"
                        placeholder="الوصف المختصر باللغة العربية"
                        defaultValue={selectedCourse?.short_description?.ar || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="shortDescEn" className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</label>
                      <textarea
                        id="shortDescEn"
                        name="shortDescEn"
                        rows={2}
                        title="Short description in English"
                        placeholder="Short description in English"
                        defaultValue={selectedCourse?.short_description?.en || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="shortDescFr" className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</label>
                      <textarea
                        id="shortDescFr"
                        name="shortDescFr"
                        rows={2}
                        title="Short description in French"
                        placeholder="Description courte en Français"
                        defaultValue={selectedCourse?.short_description?.fr || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Trilingual Full Descriptions */}
                <div className="space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gold font-ui">
                    {isRtl ? 'الوصف الكامل والمناهج بالتفصيل' : 'Full Descriptions / Curriculum Detail'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="fullDescAr" className="text-[9px] text-stone/50 font-bold uppercase font-ui">Arabic</label>
                      <textarea
                        id="fullDescAr"
                        name="fullDescAr"
                        rows={3}
                        title="Full description in Arabic"
                        placeholder="الوصف الكامل والمناهج بالتفصيل"
                        defaultValue={selectedCourse?.full_description?.ar || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="fullDescEn" className="text-[9px] text-stone/50 font-bold uppercase font-ui">English</label>
                      <textarea
                        id="fullDescEn"
                        name="fullDescEn"
                        rows={3}
                        title="Full description in English"
                        placeholder="Full curriculum detail in English"
                        defaultValue={selectedCourse?.full_description?.en || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="fullDescFr" className="text-[9px] text-stone/50 font-bold uppercase font-ui">French</label>
                      <textarea
                        id="fullDescFr"
                        name="fullDescFr"
                        rows={3}
                        title="Full description in French"
                        placeholder="Détails du programme d'études en Français"
                        defaultValue={selectedCourse?.full_description?.fr || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/30 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Instructor & Duration Trilingual */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Instructor */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                      {isRtl ? 'المعلم / الشيوخ' : 'Instructor / Faculty'}
                    </span>
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="instructorAr"
                        placeholder="شيوخ معتمدون من الأزهر (Ar)"
                        defaultValue={selectedCourse?.instructor?.ar || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                      />
                      <input
                        type="text"
                        name="instructorEn"
                        placeholder="Azhari scholars (En)"
                        defaultValue={selectedCourse?.instructor?.en || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                      />
                      <input
                        type="text"
                        name="instructorFr"
                        placeholder="Scholars diplômés (Fr)"
                        defaultValue={selectedCourse?.instructor?.fr || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                      {isRtl ? 'المدة / الخطة الزمنية' : 'Duration / Standard Timeframe'}
                    </span>
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="durationAr"
                        placeholder="40 ساعة دراسية (Ar)"
                        defaultValue={selectedCourse?.duration?.ar || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                      />
                      <input
                        type="text"
                        name="durationEn"
                        placeholder="40 Study Hours (En)"
                        defaultValue={selectedCourse?.duration?.en || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                      />
                      <input
                        type="text"
                        name="durationFr"
                        placeholder="40 heures d'étude (Fr)"
                        defaultValue={selectedCourse?.duration?.fr || ''}
                        className="w-full bg-white border border-gold-hi/25 text-midnight py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-ui placeholder:text-stone/35"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Course Image File Upload */}
                <div className="space-y-2">
                  <label htmlFor="imageFile" className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                    {isRtl ? 'صورة الكورس أو البرنامج (الوسائط)' : 'Course Image / Thumbnail'}
                  </label>
                  <div className="flex items-center gap-4">
                    {selectedCourse?.image_url && (
                      <div className="w-14 h-14 rounded-lg bg-gold-muted/5 overflow-hidden shrink-0 border border-gold/15">
                        <img src={selectedCourse.image_url} alt={selectedCourse.title?.en || "Course Image"} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input
                      type="file"
                      id="imageFile"
                      name="imageFile"
                      accept="image/*"
                      title={isRtl ? 'تحميل صورة الكورس' : 'Upload Course Image'}
                      placeholder={isRtl ? 'اختر ملف صورة' : 'Choose image file'}
                      className="w-full bg-white border border-gold-hi/25 text-stone/65 py-2.5 px-4 rounded-lg text-xs file:bg-gold/10 file:border-none file:text-gold file:px-3 file:py-1 file:rounded file:mr-3 focus:outline-none focus:border-gold font-ui"
                    />
                  </div>
                </div>

                {/* 6. External Links (Zoom and Register) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                      {isRtl ? 'رابط التسجيل المباشر (اختياري)' : 'Registration URL (Optional)'}
                    </label>
                    <input
                      type="url"
                      name="registrationLink"
                      defaultValue={selectedCourse?.registration_link || ''}
                      placeholder="https://docs.google.com/forms/..."
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                      {isRtl ? 'رابط زووم الدراسي (Zoom)' : 'Zoom Meeting Link'}
                    </label>
                    <input
                      type="url"
                      name="zoomLink"
                      defaultValue={selectedCourse?.zoom_link || ''}
                      placeholder="https://zoom.us/j/..."
                      className="w-full bg-white border border-gold-hi/25 text-midnight py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/30"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-gold/15 mt-8 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gold hover:bg-gold-hi text-midnight font-bold py-3.5 px-4 rounded-lg text-sm transition-all hover:scale-[1.02] cursor-pointer text-center font-ui shadow-md shadow-gold/10"
                >
                  {isRtl ? 'حفظ الكورس' : 'Publish Course'}
                </button>
                <Link
                  href={`/${locale}/admin/courses`}
                  className="px-5 py-3.5 bg-gold-muted/5 hover:bg-gold-muted/10 text-stone border border-gold-muted/15 rounded-lg text-sm font-semibold text-center transition-colors font-ui"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
