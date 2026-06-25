'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const locale = formData.get('locale') as string || 'en';

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Update last login timestamp in profile
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase
      .from('admin_profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);
  }

  redirect(`/${locale}/portal`);
}

export async function updatePassword(prevState: any, formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: 'All password fields are required.' };
  }

  if (newPassword !== confirmPassword) {
    return { error: 'New passwords do not match.' };
  }

  if (newPassword.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  const supabase = await createClient();

  // Verify session first
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized session.' };
  }

  // Verify old password by signing in again (Supabase does not have direct verifyCurrentPassword,
  // so we re-authenticate the current user to verify)
  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  });

  if (reauthError) {
    return { error: 'Incorrect current password.' };
  }

  // Update password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: updateError.message };
  }

  return { success: true };
}

export async function createAdminAccount(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const role = formData.get('role') as string || 'editor';

  if (!email || !password || !name) {
    return { error: 'All fields are required.' };
  }

  const supabase = await createClient();

  // Check if current user is Super Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'super_admin') {
    return { error: 'Only Super Admins can create other admin accounts.' };
  }

  // Sign up user via admin interface (using service role key so they are automatically confirmed)
  // Wait, to do this we can use supabase.auth.admin.createUser if using service role, but since createClient uses anonym key by default, we need a service client.
  // Wait! Let's check how we can create user using admin auth:
  // We can initialize a client with the SERVICE_ROLE_KEY to perform admin tasks!
  const serviceRoleClient = require('@supabase/supabase-js').createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  const { data: newUser, error: createError } = await serviceRoleClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role }
  });

  if (createError) {
    return { error: createError.message };
  }

  return { success: true };
}

export async function toggleAdminStatus(adminId: string, active: boolean) {
  const supabase = await createClient();

  // Check if current user is Super Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'super_admin') {
    return { error: 'Only Super Admins can toggle administrator status.' };
  }

  if (user.id === adminId) {
    return { error: 'You cannot disable your own account.' };
  }

  const { error } = await supabase
    .from('admin_profiles')
    .update({ active })
    .eq('id', adminId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
