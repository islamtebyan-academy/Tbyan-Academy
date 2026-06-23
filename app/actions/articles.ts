'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function saveArticle(formData: FormData) {
  const supabase = await createClient();

  // 1. Verify auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const articleId = formData.get('articleId') as string;
  const slug = formData.get('slug') as string;
  const categoryKey = formData.get('categoryKey') as string;
  const date = formData.get('date') as string || new Date().toISOString().split('T')[0];
  const readTimeRaw = formData.get('readTime') as string;
  const readTime = parseInt(readTimeRaw, 10) || 5;
  const bookingTopic = formData.get('bookingTopic') as string || 'general';
  const status = formData.get('status') as string || 'published';
  const locale = formData.get('locale') as string || 'en';

  // Read trilingual basic text fields
  const titleAr = formData.get('titleAr') as string;
  const titleEn = formData.get('titleEn') as string;
  const titleFr = formData.get('titleFr') as string;

  const excerptAr = formData.get('excerptAr') as string;
  const excerptEn = formData.get('excerptEn') as string;
  const excerptFr = formData.get('excerptFr') as string;

  const ctaAr = formData.get('ctaAr') as string;
  const ctaEn = formData.get('ctaEn') as string;
  const ctaFr = formData.get('ctaFr') as string;

  // Read content block fields
  const introAr = formData.get('introAr') as string;
  const introEn = formData.get('introEn') as string;
  const introFr = formData.get('introFr') as string;

  const conclusionAr = formData.get('conclusionAr') as string;
  const conclusionEn = formData.get('conclusionEn') as string;
  const conclusionFr = formData.get('conclusionFr') as string;

  const sectionsAr = formData.get('sectionsAr') as string;
  const sectionsEn = formData.get('sectionsEn') as string;
  const sectionsFr = formData.get('sectionsFr') as string;

  const referencesAr = formData.get('referencesAr') as string;
  const referencesEn = formData.get('referencesEn') as string;
  const referencesFr = formData.get('referencesFr') as string;

  if (!slug) {
    return { error: 'Slug is required.' };
  }

  // Fetch existing article if editing
  let existingArticle: any = null;
  if (articleId) {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .single();
    existingArticle = data;
  }

  // Verify at least one title exists
  if (!existingArticle && !titleAr && !titleEn && !titleFr) {
    return { error: 'At least one title translation is required for new articles.' };
  }

  // Handle Image Upload if any
  const imageFile = formData.get('imageFile') as File;
  let imageUrl = formData.get('existingImageUrl') as string || '';

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${slug}-${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(`articles/${fileName}`, imageFile, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      return { error: `Image upload failed: ${uploadError.message}` };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(`articles/${fileName}`);

    imageUrl = publicUrl;
  }

  // Parsers
  const parseSections = (text: string) => {
    if (!text) return [];
    return text
      .split('\n')
      .map(line => {
        const parts = line.split('|');
        const subtitle = parts[0]?.trim() || '';
        const body = parts[1]?.trim() || '';
        const quote = parts[2]?.trim() || '';
        return {
          subtitle,
          body,
          ...(quote ? { quote } : {})
        };
      })
      .filter(item => item.subtitle.length > 0 || item.body.length > 0);
  };

  const parseReferences = (text: string) => {
    if (!text) return [];
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  // Helper to merge translation fields
  const mergeLocaleObject = (
    fieldKey: string, 
    formValues: { ar: string; en: string; fr: string }
  ) => {
    const existing = existingArticle ? existingArticle[fieldKey] : {};
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

  // Helper for full content object merging
  const mergeContentObject = () => {
    const existing = existingArticle ? existingArticle.content : {};
    const merged = { ...existing };

    // Arabic
    if (introAr !== undefined || conclusionAr !== undefined || sectionsAr !== undefined || referencesAr !== undefined) {
      merged.ar = {
        intro: introAr || existing?.ar?.intro || '',
        sections: sectionsAr !== undefined ? parseSections(sectionsAr) : (existing?.ar?.sections || []),
        conclusion: conclusionAr || existing?.ar?.conclusion || '',
        references: referencesAr !== undefined ? parseReferences(referencesAr) : (existing?.ar?.references || [])
      };
    }

    // English
    if (introEn !== undefined || conclusionEn !== undefined || sectionsEn !== undefined || referencesEn !== undefined) {
      merged.en = {
        intro: introEn || existing?.en?.intro || '',
        sections: sectionsEn !== undefined ? parseSections(sectionsEn) : (existing?.en?.sections || []),
        conclusion: conclusionEn || existing?.en?.conclusion || '',
        references: referencesEn !== undefined ? parseReferences(referencesEn) : (existing?.en?.references || [])
      };
    }

    // French
    if (introFr !== undefined || conclusionFr !== undefined || sectionsFr !== undefined || referencesFr !== undefined) {
      merged.fr = {
        intro: introFr || existing?.fr?.intro || '',
        sections: sectionsFr !== undefined ? parseSections(sectionsFr) : (existing?.fr?.sections || []),
        conclusion: conclusionFr || existing?.fr?.conclusion || '',
        references: referencesFr !== undefined ? parseReferences(referencesFr) : (existing?.fr?.references || [])
      };
    }

    return merged;
  };

  const payload = {
    slug,
    category_key: categoryKey,
    image_url: imageUrl,
    date,
    read_time: readTime,
    title: mergeLocaleObject('title', { ar: titleAr, en: titleEn, fr: titleFr }),
    excerpt: mergeLocaleObject('excerpt', { ar: excerptAr, en: excerptEn, fr: excerptFr }),
    cta_message: mergeLocaleObject('cta_message', { ar: ctaAr, en: ctaEn, fr: ctaFr }),
    booking_topic: bookingTopic,
    content: mergeContentObject(),
    status,
    updated_at: new Date().toISOString()
  };

  let dbError = null;

  if (articleId) {
    const { error } = await supabase
      .from('articles')
      .update(payload)
      .eq('id', articleId);
    dbError = error;
  } else {
    const { error } = await supabase
      .from('articles')
      .insert([payload]);
    dbError = error;
  }

  if (dbError) {
    return { error: dbError.message };
  }

  // Revalidate cache
  revalidatePath(`/${locale}/admin/articles`);
  revalidatePath(`/${locale}/blog`);
  revalidatePath(`/${locale}/blog/${slug}`);

  return { success: true };
}

export async function deleteArticle(articleId: string, locale: string = 'en') {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const { data: article } = await supabase
    .from('articles')
    .select('slug')
    .eq('id', articleId)
    .single();

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', articleId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/${locale}/admin/articles`);
  revalidatePath(`/${locale}/blog`);
  if (article?.slug) {
    revalidatePath(`/${locale}/blog/${article.slug}`);
  }

  return { success: true };
}
