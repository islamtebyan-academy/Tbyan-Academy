'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function updateStudentSubscription(formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const status = formData.get('status') as string;
  const subscriptionPlan = formData.get('subscriptionPlan') as string;
  const subscriptionStatus = formData.get('subscriptionStatus') as string;
  const startsAt = formData.get('startsAt') as string;
  const endsAt = formData.get('endsAt') as string;
  const locale = formData.get('locale') as string || 'en';

  if (!studentId) {
    return { error: 'Student ID is required.' };
  }

  const supabase = await createClient();

  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const updateData: any = {
    status,
    subscription_plan: subscriptionPlan,
    subscription_status: subscriptionStatus,
    subscription_starts_at: startsAt ? new Date(startsAt).toISOString() : null,
    subscription_ends_at: endsAt ? new Date(endsAt).toISOString() : null,
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase
    .from('students')
    .update(updateData)
    .eq('id', studentId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/${locale}/admin/students`);
  return { success: true };
}

export async function deleteStudent(studentId: string, locale: string = 'en') {
  if (!studentId) {
    return { error: 'Student ID is required.' };
  }

  const supabase = await createClient();

  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', studentId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/${locale}/admin/students`);
  return { success: true };
}
