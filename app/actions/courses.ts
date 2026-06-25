'use server';

import { revalidatePath } from 'next/cache';
import sharp from 'sharp';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function saveCourse(formData: FormData) {
  const supabase = await createClient();

  // 1. Verify auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  // Verify active admin profile
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('active')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.active) {
    return { error: 'Unauthorized.' };
  }

  // Create service role client for writes (bypassing RLS constraints safely)
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const courseId = formData.get('courseId') as string;
  const slug = formData.get('slug') as string;
  const registrationLink = formData.get('registrationLink') as string;
  const zoomLink = formData.get('zoomLink') as string;
  const status = formData.get('status') as string || 'hidden';
  const locale = formData.get('locale') as string || 'en';

  // Read trilingual values
  const titleAr = formData.get('titleAr') as string;
  const titleEn = formData.get('titleEn') as string;
  const titleFr = formData.get('titleFr') as string;

  const shortDescAr = formData.get('shortDescAr') as string;
  const shortDescEn = formData.get('shortDescEn') as string;
  const shortDescFr = formData.get('shortDescFr') as string;

  const fullDescAr = formData.get('fullDescAr') as string;
  const fullDescEn = formData.get('fullDescEn') as string;
  const fullDescFr = formData.get('fullDescFr') as string;

  const instructorAr = formData.get('instructorAr') as string;
  const instructorEn = formData.get('instructorEn') as string;
  const instructorFr = formData.get('instructorFr') as string;

  const durationAr = formData.get('durationAr') as string;
  const durationEn = formData.get('durationEn') as string;
  const durationFr = formData.get('durationFr') as string;

  // Read dynamic single page content values
  const whatYouLearnAr = formData.get('whatYouLearnAr') as string;
  const whatYouLearnEn = formData.get('whatYouLearnEn') as string;
  const whatYouLearnFr = formData.get('whatYouLearnFr') as string;

  const outcomesAr = formData.get('outcomesAr') as string;
  const outcomesEn = formData.get('outcomesEn') as string;
  const outcomesFr = formData.get('outcomesFr') as string;

  const studyPlanAr = formData.get('studyPlanAr') as string;
  const studyPlanEn = formData.get('studyPlanEn') as string;
  const studyPlanFr = formData.get('studyPlanFr') as string;

  if (!slug) {
    return { error: 'Slug is required.' };
  }

  // Fetch existing course if editing
  let existingCourse: any = null;
  if (courseId) {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();
    existingCourse = data;
  }

  // Verify at least one title exists
  if (!existingCourse && !titleAr && !titleEn && !titleFr) {
    return { error: 'At least one title translation is required for new courses.' };
  }

  // Handle Image Upload if any
  const imageFile = formData.get('imageFile') as File;
  let imageUrl = formData.get('existingImageUrl') as string || '';

  if (imageFile && imageFile.size > 0) {
    try {
      // Convert File arrayBuffer to Buffer for sharp processing
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Convert to WebP and compress to 80% quality
      const webpBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();

      const fileName = `${slug}-${Date.now()}.webp`;
      
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('media')
        .upload(`courses/${fileName}`, webpBuffer, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        return { error: `Image upload failed: ${uploadError.message}` };
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('media')
        .getPublicUrl(`courses/${fileName}`);

      // If there is an existing image, delete it from storage to save space
      if (imageUrl) {
        const oldStoragePath = getStoragePathFromUrl(imageUrl, 'courses/');
        if (oldStoragePath) {
          try {
            await supabaseAdmin.storage
              .from('media')
              .remove([oldStoragePath]);
          } catch (deleteError) {
            console.error('Failed to delete old image:', deleteError);
          }
        }
      }

      imageUrl = publicUrl;
    } catch (sharpError: any) {
      return { error: `Image processing/upload failed: ${sharpError.message}` };
    }
  }

  // Helpers to parse lists
  const parseLineItems = (text: string) => {
    if (!text) return [];
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  const parseKeyValueItems = (text: string) => {
    if (!text) return [];
    return text
      .split('\n')
      .map(line => {
        const parts = line.split('|');
        const title = parts[0]?.trim() || '';
        const desc = parts[1]?.trim() || '';
        return { title, desc };
      })
      .filter(item => item.title.length > 0);
  };

  // Helper to merge translation fields
  const mergeLocaleObject = (
    fieldKey: string, 
    formValues: { ar: string; en: string; fr: string }
  ) => {
    const existing = existingCourse ? existingCourse[fieldKey] : {};
    const merged = { ...existing };
    
    if (formValues.ar !== undefined && formValues.ar !== null && formValues.ar.trim() !== '') {
      merged.ar = formValues.ar;
    }
    if (formValues.en !== undefined && formValues.en !== null && formValues.en.trim() !== '') {
      merged.en = formValues.en;
    }
    if (formValues.fr !== undefined && formValues.fr !== null && formValues.fr.trim() !== '') {
      merged.fr = formValues.fr;
    }
    
    return merged;
  };

  const mergeJsonLocaleObject = (
    fieldKey: string,
    formValues: { ar: any; en: any; fr: any }
  ) => {
    const existing = existingCourse ? existingCourse[fieldKey] : {};
    const merged = { ...existing };
    
    if (formValues.ar !== undefined && formValues.ar !== null) {
      merged.ar = formValues.ar;
    }
    if (formValues.en !== undefined && formValues.en !== null) {
      merged.en = formValues.en;
    }
    if (formValues.fr !== undefined && formValues.fr !== null) {
      merged.fr = formValues.fr;
    }
    
    return merged;
  };

  // Structure dynamic trilingual payload
  const payload = {
    title: mergeLocaleObject('title', { ar: titleAr, en: titleEn, fr: titleFr }),
    slug,
    short_description: mergeLocaleObject('short_description', { ar: shortDescAr, en: shortDescEn, fr: shortDescFr }),
    full_description: mergeLocaleObject('full_description', { ar: fullDescAr, en: fullDescEn, fr: fullDescFr }),
    image_url: imageUrl,
    instructor: mergeLocaleObject('instructor', { ar: instructorAr, en: instructorEn, fr: instructorFr }),
    duration: mergeLocaleObject('duration', { ar: durationAr, en: durationEn, fr: durationFr }),
    registration_link: registrationLink,
    zoom_link: zoomLink,
    status,
    what_you_learn: mergeJsonLocaleObject('what_you_learn', {
      ar: whatYouLearnAr !== undefined && whatYouLearnAr !== null ? parseLineItems(whatYouLearnAr) : undefined,
      en: whatYouLearnEn !== undefined && whatYouLearnEn !== null ? parseLineItems(whatYouLearnEn) : undefined,
      fr: whatYouLearnFr !== undefined && whatYouLearnFr !== null ? parseLineItems(whatYouLearnFr) : undefined
    }),
    outcomes: mergeJsonLocaleObject('outcomes', {
      ar: outcomesAr !== undefined && outcomesAr !== null ? parseKeyValueItems(outcomesAr) : undefined,
      en: outcomesEn !== undefined && outcomesEn !== null ? parseKeyValueItems(outcomesEn) : undefined,
      fr: outcomesFr !== undefined && outcomesFr !== null ? parseKeyValueItems(outcomesFr) : undefined
    }),
    study_plan: mergeJsonLocaleObject('study_plan', {
      ar: studyPlanAr !== undefined && studyPlanAr !== null ? parseKeyValueItems(studyPlanAr) : undefined,
      en: studyPlanEn !== undefined && studyPlanEn !== null ? parseKeyValueItems(studyPlanEn) : undefined,
      fr: studyPlanFr !== undefined && studyPlanFr !== null ? parseKeyValueItems(studyPlanFr) : undefined
    }),
    updated_at: new Date().toISOString()
  };

  let dbError = null;

  if (courseId) {
    // Update existing course
    const { error } = await supabaseAdmin
      .from('courses')
      .update(payload)
      .eq('id', courseId);
    dbError = error;
  } else {
    // Create new course
    const { error } = await supabaseAdmin
      .from('courses')
      .insert([payload]);
    dbError = error;
  }

  if (dbError) {
    return { error: dbError.message };
  }

  revalidatePath(`/${locale}/admin/courses`);
  revalidatePath(`/${locale}/programs`);
  revalidatePath(`/${locale}/programs/${slug}`);

  return { success: true };
}

export async function deleteCourse(courseId: string, locale: string = 'en') {
  const supabase = await createClient();

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  // Verify active admin profile
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('active')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.active) {
    return { error: 'Unauthorized.' };
  }

  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get slug and image to clean up
  const { data: course } = await supabaseAdmin
    .from('courses')
    .select('slug, image_url')
    .eq('id', courseId)
    .single();

  const { error } = await supabaseAdmin
    .from('courses')
    .delete()
    .eq('id', courseId);

  if (error) {
    return { error: error.message };
  }

  // Delete image from storage upon deleting the course to clean up space
  if (course?.image_url) {
    const imagePath = getStoragePathFromUrl(course.image_url, 'courses/');
    if (imagePath) {
      try {
        await supabaseAdmin.storage
          .from('media')
          .remove([imagePath]);
      } catch (deleteError) {
        console.error('Failed to delete image on course deletion:', deleteError);
      }
    }
  }

  revalidatePath(`/${locale}/admin/courses`);
  revalidatePath(`/${locale}/programs`);
  if (course?.slug) {
    revalidatePath(`/${locale}/programs/${course.slug}`);
  }

  return { success: true };
}

function getStoragePathFromUrl(url: string, prefix: string = 'courses/'): string | null {
  if (!url) return null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && url.includes(supabaseUrl)) {
    const part = `/storage/v1/object/public/media/${prefix}`;
    const idx = url.indexOf(part);
    if (idx !== -1) {
      const fileName = url.substring(idx + part.length);
      return `${prefix}${fileName}`;
    }
  }
  return null;
}
