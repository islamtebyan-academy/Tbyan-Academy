import React from 'react';
import { 
  Settings, 
  ShieldAlert, 
  UserPlus, 
  KeyRound, 
  Lock, 
  User, 
  Mail, 
  Activity,
  CheckCircle,
  XCircle,
  Calendar,
  LockKeyhole
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

interface SettingsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  const supabase = await createClient();

  // 1. Get logged-in user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // 2. Fetch logged-in user profile
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) return null;

  const isSuperAdmin = profile.role === 'super_admin';

  // 3. If Super Admin, fetch all admin profiles
  let adminProfiles = null;
  if (isSuperAdmin) {
    const { data } = await supabase
      .from('admin_profiles')
      .select('*')
      .order('created_at', { ascending: true });
    adminProfiles = data;
  }

  const formatLastLogin = (dateStr: string | null) => {
    if (!dateStr) return isRtl ? 'لم يسجل دخول بعد' : 'Never logged in';
    return new Date(dateStr).toLocaleString(locale, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-10 text-start">
      {/* Title */}
      <div className="border-b border-gold/15 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-midnight font-primary">
          {isRtl ? 'إعدادات النظام والحسابات' : 'System & Profile Settings'}
        </h2>
        <p className="text-stone/70 text-xs mt-1.5 font-ui">
          {isRtl ? 'تحديث كلمة المرور الشخصية، وإدارة مشرفي المنصة وصلاحياتهم' : 'Change password, manage administrator credentials, and set roles.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Password Change & Profile info */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Overview */}
          <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-6 rounded-xl space-y-4 shadow-[0_8px_30px_rgba(139,115,85,0.05)] relative overflow-hidden pattern-overlay">
            <h3 className="font-bold text-midnight text-sm flex items-center gap-2 font-primary border-b border-gold-muted/15 pb-3">
              <User size={16} className="text-gold" />
              <span>{isRtl ? 'حسابك الحالي' : 'Personal Profile'}</span>
            </h3>
            
            <div className="space-y-3 font-ui text-start">
              <div>
                <span className="text-[10px] text-stone/60 uppercase font-bold tracking-wider">{isRtl ? 'الاسم' : 'Name'}</span>
                <p className="text-sm font-bold text-midnight mt-0.5">{profile.name}</p>
              </div>
              <div>
                <span className="text-[10px] text-stone/60 uppercase font-bold tracking-wider">{isRtl ? 'البريد الإلكتروني' : 'Email'}</span>
                <p className="text-xs text-stone font-mono mt-0.5">{profile.email}</p>
              </div>
              <div>
                <span className="text-[10px] text-stone/60 uppercase font-bold tracking-wider">{isRtl ? 'الدور والصلاحية' : 'Role / Privilege'}</span>
                <div className="mt-1.5">
                  <span className={`inline-flex px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    profile.role === 'super_admin' ? 'bg-gold/10 text-gold border border-gold/25' : 'bg-[#F2ECD8]/45 text-stone border border-gold-muted/20'
                  }`}>
                    {profile.role === 'super_admin' ? (isRtl ? 'مشرف عام' : 'Super Admin') : (isRtl ? 'محرر محتوى' : 'Editor')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Form */}
          <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-6 rounded-xl shadow-[0_8px_30px_rgba(139,115,85,0.05)] relative overflow-hidden pattern-overlay">
            <h3 className="font-bold text-midnight text-sm flex items-center gap-2 mb-6 font-primary border-b border-gold-muted/15 pb-3">
              <KeyRound size={16} className="text-gold" />
              <span>{isRtl ? 'تغيير كلمة المرور' : 'Change Password'}</span>
            </h3>

            {/* Password form uses Server Action */}
            <form action={async (formData) => {
              'use server';
              const { updatePassword } = require('@/app/actions/auth');
              await updatePassword(null, formData);
            }} className="space-y-4 font-ui">
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-stone/75">
                  {isRtl ? 'كلمة المرور الحالية' : 'Current Password'}
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-4 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-stone/75">
                  {isRtl ? 'كلمة المرور الجديدة' : 'New Password'}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-4 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-stone/75">
                  {isRtl ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-4 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/40"
                />
              </div>

              <button
                type="submit"
                className="btn-gold w-full text-midnight font-bold py-2.5 px-4 rounded-lg text-xs transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-gold/10 mt-4"
              >
                <LockKeyhole size={13} />
                <span>{isRtl ? 'تحديث كلمة المرور' : 'Update Password'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Admin profiles list & Add Admin - Super Admin Only */}
        {isSuperAdmin && adminProfiles && (
          <div className="lg:col-span-2 space-y-8">
            {/* Create Admin Form */}
            <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-6 rounded-xl shadow-[0_8px_30px_rgba(139,115,85,0.05)] relative overflow-hidden pattern-overlay">
              <h3 className="font-bold text-midnight text-sm flex items-center gap-2 mb-6 font-primary border-b border-gold-muted/15 pb-3">
                <UserPlus size={16} className="text-gold" />
                <span>{isRtl ? 'إضافة مشرف / محرر جديد' : 'Register New Administrator'}</span>
              </h3>

              <form action={async (formData) => {
                'use server';
                const { createAdminAccount } = require('@/app/actions/auth');
                await createAdminAccount(null, formData);
              }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-ui">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-stone/75">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ahmed Al-Azhari"
                    className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-4 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-stone/75">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="editor@islamtebyan.com"
                    className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-4 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-stone/75">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="•••••••• (min 8 chars)"
                    className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-4 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/40"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="role-select" className="text-[9px] font-bold uppercase tracking-widest text-stone/75">Permission Role</label>
                  <select
                    id="role-select"
                    name="role"
                    defaultValue="editor"
                    title={isRtl ? 'الدور والصلاحية' : 'Permission Role'}
                    className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                  >
                    <option value="editor">{isRtl ? 'محرر محتوى (Editor)' : 'Content Editor'}</option>
                    <option value="super_admin">{isRtl ? 'مشرف عام (Super Admin)' : 'Super Administrator'}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-2 btn-gold text-midnight font-bold py-3 px-4 rounded-lg text-xs transition-all hover:scale-[1.02] cursor-pointer text-center mt-2 shadow-md shadow-gold/10"
                >
                  {isRtl ? 'تسجيل المشرف الجديد وتأكيده' : 'Provision Admin Account'}
                </button>
              </form>
            </div>

            {/* Administrators list table */}
            <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-6 rounded-xl shadow-[0_8px_30px_rgba(139,115,85,0.05)] relative overflow-hidden pattern-overlay space-y-4">
              <h3 className="font-bold text-midnight text-sm flex items-center gap-2 font-primary border-b border-gold-muted/15 pb-3">
                <ShieldAlert size={16} className="text-gold" />
                <span>{isRtl ? 'سجل مسؤولي المنصة' : 'Platform Administrator Directory'}</span>
              </h3>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gold-muted/15 bg-gradient-to-r from-[#FDFAF3] to-white text-stone/85 text-[9px] uppercase font-bold tracking-wider font-ui">
                      <th className="py-3 px-2 text-start">{isRtl ? 'المسؤول' : 'Name / Email'}</th>
                      <th className="py-3 px-2 text-start">{isRtl ? 'الدور' : 'Role'}</th>
                      <th className="py-3 px-2 text-start">{isRtl ? 'آخر دخول' : 'Last Session'}</th>
                      <th className="py-3 px-2 text-start">{isRtl ? 'الحالة' : 'Status'}</th>
                      <th className="py-3 px-2 text-end">{isRtl ? 'الإجراءات' : 'Toggle Access'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-muted/10 text-xs text-stone/90 font-ui">
                    {adminProfiles.map((adm) => (
                      <tr key={adm.id} className="hover:bg-[#FDFAF3]/60 border-b border-gold-muted/5 transition-colors">
                        <td className="py-3 px-2">
                          <div className="font-bold text-midnight font-primary text-sm">{adm.name}</div>
                          <div className="text-[10px] text-stone/55 font-mono">{adm.email}</div>
                        </td>
                        <td className="py-3 px-2 font-semibold uppercase text-[10px]">
                          {adm.role === 'super_admin' ? (
                            <span className="text-gold font-bold">Super Admin</span>
                          ) : (
                            <span className="text-stone/80">Editor</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-[10px] text-stone/70 font-mono">
                          {formatLastLogin(adm.last_login)}
                        </td>
                        <td className="py-3 px-2">
                          {adm.active ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                              <CheckCircle size={11} />
                              <span>{isRtl ? 'فعال' : 'Active'}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone/50">
                              <XCircle size={11} />
                              <span>{isRtl ? 'معطل' : 'Disabled'}</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-end">
                          {user.id !== adm.id ? (
                            <form action={async () => {
                              'use server';
                              const { toggleAdminStatus } = require('@/app/actions/auth');
                              await toggleAdminStatus(adm.id, !adm.active);
                            }}>
                              <button
                                type="submit"
                                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                                  adm.active 
                                    ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100' 
                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                }`}
                              >
                                {adm.active ? (isRtl ? 'تعطيل الحساب' : 'Disable') : (isRtl ? 'تفعيل الحساب' : 'Enable')}
                              </button>
                            </form>
                          ) : (
                            <span className="text-[10px] text-gold font-bold italic">{isRtl ? 'أنت' : 'You'}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
