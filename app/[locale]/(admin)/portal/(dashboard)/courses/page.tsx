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
import CourseEditModal from '@/components/admin/CourseEditModal';
import DeleteConfirmButton from '@/components/admin/DeleteConfirmButton';
import { COURSES_DATABASE, getStaticSlug } from '@/app/[locale]/(public)/programs/data';

interface CoursesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    id?: string;
    new?: string;
    tab?: string;
  }>;
}

export default async function CoursesPage({ params, searchParams }: CoursesPageProps) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  
  const resolvedSearchParams = await searchParams;
  const editId = resolvedSearchParams.id || '';
  const isNew = resolvedSearchParams.new === 'true';
  const tab = resolvedSearchParams.tab || 'general';

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
    
    if (data) {
      const staticSlug = getStaticSlug(data.slug);
      const staticCourseAr = COURSES_DATABASE.ar?.[staticSlug] || COURSES_DATABASE.en?.[staticSlug];
      const staticCourseEn = COURSES_DATABASE.en?.[staticSlug];
      const staticCourseFr = COURSES_DATABASE.fr?.[staticSlug] || COURSES_DATABASE.en?.[staticSlug];

      const dbWhatYouLearnAr = data.what_you_learn?.ar || [];
      const dbWhatYouLearnEn = data.what_you_learn?.en || [];
      const dbWhatYouLearnFr = data.what_you_learn?.fr || [];

      const mergedWhatYouLearn = {
        ar: dbWhatYouLearnAr.length > 0 ? dbWhatYouLearnAr : (staticCourseAr?.whatYouLearn || []),
        en: dbWhatYouLearnEn.length > 0 ? dbWhatYouLearnEn : (staticCourseEn?.whatYouLearn || []),
        fr: dbWhatYouLearnFr.length > 0 ? dbWhatYouLearnFr : (staticCourseFr?.whatYouLearn || [])
      };

      const dbOutcomesAr = data.outcomes?.ar || [];
      const dbOutcomesEn = data.outcomes?.en || [];
      const dbOutcomesFr = data.outcomes?.fr || [];

      const mergedOutcomes = {
        ar: dbOutcomesAr.length > 0 ? dbOutcomesAr : (staticCourseAr?.outcomes || []),
        en: dbOutcomesEn.length > 0 ? dbOutcomesEn : (staticCourseEn?.outcomes || []),
        fr: dbOutcomesFr.length > 0 ? dbOutcomesFr : (staticCourseFr?.outcomes || [])
      };

      const dbStudyPlanAr = data.study_plan?.ar || [];
      const dbStudyPlanEn = data.study_plan?.en || [];
      const dbStudyPlanFr = data.study_plan?.fr || [];

      const mergedStudyPlan = {
        ar: dbStudyPlanAr.length > 0 ? dbStudyPlanAr : (staticCourseAr?.studyPlan || []),
        en: dbStudyPlanEn.length > 0 ? dbStudyPlanEn : (staticCourseEn?.studyPlan || []),
        fr: dbStudyPlanFr.length > 0 ? dbStudyPlanFr : (staticCourseFr?.studyPlan || [])
      };

      selectedCourse = {
        ...data,
        what_you_learn: mergedWhatYouLearn,
        outcomes: mergedOutcomes,
        study_plan: mergedStudyPlan
      };
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
            {isRtl ? 'إدارة الكورسات والبرامج الأكاديمية' : 'Course Catalog Management'}
          </h2>
          <p className="text-stone/70 text-xs mt-1.5 font-ui">
            {isRtl ? 'إضافة وتعديل وحذف البرامج الأكاديمية والمناهج وتحديث روابط الزوم والتسجيل' : 'Add new academy course offerings, upload images, and control publication status.'}
          </p>
        </div>

        <Link
          href={`/${locale}/portal/courses?new=true`}
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
                  href={`/${locale}/portal/courses?id=${course.id}&tab=general`}
                  title={isRtl ? 'تعديل بيانات الكورس' : 'Edit Course Details'}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg text-[10px] font-bold bg-gold/5 hover:bg-gold text-gold hover:text-midnight border border-gold/20 hover:border-gold transition-all duration-300 shadow-sm font-ui"
                >
                  <Edit3 size={11} />
                  <span>{isRtl ? 'تعديل الكورس' : 'Edit Course'}</span>
                </Link>

                <Link
                  href={`/${locale}/portal/courses?id=${course.id}&tab=content`}
                  title={isRtl ? 'تعديل محتوى الكورس' : 'Edit Course Content'}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg text-[10px] font-bold bg-navy/5 hover:bg-navy text-navy hover:text-white border border-navy/20 hover:border-navy transition-all duration-300 shadow-sm font-ui"
                >
                  <FileText size={11} />
                  <span>{isRtl ? 'محتوى الكورس' : 'Course Content'}</span>
                </Link>
                
                {/* Delete course form */}
                <form action={async () => {
                  'use server';
                  const { deleteCourse } = require('@/app/actions/courses');
                  await deleteCourse(course.id, locale);
                }}>
                  <DeleteConfirmButton 
                    isRtl={isRtl}
                    titleText={isRtl ? 'حذف الكورس' : 'Delete Course'}
                    confirmMessage={isRtl 
                      ? 'هل أنت متأكد من رغبتك في حذف هذا الكورس نهائياً؟ لا يمكن التراجع عن هذا الإجراء.' 
                      : 'Are you sure you want to permanently delete this course? This action cannot be undone.'
                    }
                  />
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

      {/* Centered Dynamic Modal Dialog */}
      {(isNew || selectedCourse) && (
        <CourseEditModal
          key={selectedCourse?.id || 'new'}
          selectedCourse={selectedCourse}
          isNew={isNew}
          locale={locale}
          initialTab={tab as 'general' | 'content'}
        />
      )}
    </div>
  );
}
