'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function uploadMedia(prevState: any, formData: FormData) {
  const supabase = await createClient();

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const mediaFile = formData.get('mediaFile') as File;
  const locale = formData.get('locale') as string || 'en';

  if (!mediaFile || mediaFile.size === 0) {
    return { error: 'No file selected for upload.' };
  }

  // Check file type (images only)
  if (!mediaFile.type.startsWith('image/')) {
    return { error: 'Only image files are allowed.' };
  }

  // Generate unique filename
  const cleanName = mediaFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
  const fileName = `${Date.now()}_${cleanName}`;

  // Upload to media bucket under 'uploads/' folder
  const { data, error: uploadError } = await supabase.storage
    .from('media')
    .upload(`uploads/${fileName}`, mediaFile, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}` };
  }

  revalidatePath(`/${locale}/admin/media`);
  return { success: true };
}

export async function deleteMedia(filePath: string, locale: string = 'en') {
  const supabase = await createClient();

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const { error } = await supabase.storage
    .from('media')
    .remove([filePath]);

  if (error) {
    return { error: `Delete failed: ${error.message}` };
  }

  revalidatePath(`/${locale}/admin/media`);
  return { success: true };
}
