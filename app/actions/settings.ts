'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function saveSettings(formData: FormData) {
  const supabase = await createClient();

  // 1. Verify auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const locale = formData.get('locale') as string || 'en';

  // We will iterate through keys submitted in formData
  const keys = Array.from(formData.keys()).filter(
    (k) => !k.startsWith('$') && k !== 'locale'
  );

  // Group fields by setting key. Fields are named like: "keyName__locale" (e.g. "hero_tagline__ar")
  const groupedData: Record<string, Record<string, string>> = {};

  for (const field of keys) {
    if (field.includes('__')) {
      const [keyName, lang] = field.split('__');
      if (!groupedData[keyName]) {
        groupedData[keyName] = {};
      }
      
      const val = formData.get(field);
      
      if (val instanceof File) {
        if (val.size > 0 && val.type.startsWith('image/')) {
          // Generate unique filename
          const cleanName = val.name.replace(/[^a-zA-Z0-9.]/g, '_');
          const fileName = `${Date.now()}_${cleanName}`;

          // Upload to storage
          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(`uploads/${fileName}`, val, {
              cacheControl: '3600',
              upsert: true
            });

          if (uploadError) {
            console.error("Upload error inside settings save:", uploadError);
            return { error: `Failed to upload image: ${uploadError.message}` };
          }

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(`uploads/${fileName}`);

          groupedData[keyName][lang] = publicUrl;
        }
      } else if (val !== undefined && val !== null && val.trim() !== '') {
        groupedData[keyName][lang] = val;
      }
    }
  }

  // Upsert each key/value into database
  for (const [keyName, langObj] of Object.entries(groupedData)) {
    // 1. Fetch existing value from DB
    const { data: existing } = await supabase
      .from('settings')
      .select('value')
      .eq('key', keyName)
      .single();

    const mergedValue = {
      ...(existing?.value || {}),
      ...langObj
    };

    const { error } = await supabase
      .from('settings')
      .upsert({
        key: keyName,
        value: mergedValue,
        updated_at: new Date().toISOString()
      });

    if (error) {
      return { error: `Failed to save ${keyName}: ${error.message}` };
    }
  }

  // Revalidate public layouts/pages
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/about`);
  revalidatePath(`/${locale}/teachers`);
  revalidatePath(`/${locale}/teachers/[slug]`);
  
  return { success: true };
}

