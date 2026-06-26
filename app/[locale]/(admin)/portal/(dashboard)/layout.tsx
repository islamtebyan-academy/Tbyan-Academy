import React from 'react';
import { redirect } from 'next/navigation';
import { 
  LogOut, 
  ExternalLink,
  User
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import AdminSidebarNav from '@/components/layout/AdminSidebarNav';
import Logo from '@/components/brand/Logo';
import AdminMobileNav from '@/components/layout/AdminMobileNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { locale } = await params;
  const supabase = await createClient();

  // 1. Verify authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect(`/${locale}/portal/login`);
  }

  // 2. Fetch admin profile details
  const { data: profile, error: profileError } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('ADMIN LAYOUT - Profile Fetch Error:', profileError);
  }
  console.log('ADMIN LAYOUT - User ID:', user.id, 'Fetched Profile:', profile);

  if (profileError || !profile || !profile.active) {
    // If profile is inactive or deleted, sign out and redirect
    await supabase.auth.signOut();
    redirect(`/${locale}/portal/login?error=inactive`);
  }

  const isRtl = locale === 'ar';
  const isSuperAdmin = profile.role === 'super_admin';

  return (
    <div className="min-h-screen bg-ivory text-ink flex flex-col md:flex-row relative font-ui antialiased">
      {/* Hide scrollbar globally inside portal dashboard but keep scrolling active */}
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none !important;
        }
      `}} />

      {/* Background radial highlights for high-end light glow contrast */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-navy/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle repeating background pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:80px_80px] opacity-[0.025] pointer-events-none z-0" />

      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex flex-col w-68 lg:w-76 h-screen fixed top-0 bottom-0 z-40 bg-gradient-to-b from-[#22314b] to-[#091521] p-6 shrink-0 dark-pattern-overlay text-ivory ${
        isRtl ? 'right-0 border-l border-gold/20' : 'left-0 border-r border-gold/20'
      }`}>
        {/* Shimmer top border line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-hi/40 to-transparent" />

        {/* Brand Logo Header */}
        <div className="mb-10 relative shrink-0">
          <Logo variant="horizontal" light={true} className="h-10 w-auto" />
        </div>

        {/* User Card */}
        <div className="mb-8 p-4 rounded-xl bg-white/[0.03] border border-gold/15 flex items-center justify-between gap-3 relative overflow-hidden backdrop-blur-md shrink-0">
          <div className="absolute top-0 right-0 w-12 h-12 bg-gold/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/25 to-gold/5 border border-gold/30 flex items-center justify-center text-gold-hi shadow-md shrink-0">
              <User size={18} />
            </div>
            <div className="min-w-0 text-start">
              <p className="text-xs font-bold text-ivory truncate">{profile.name}</p>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider bg-gold/10 text-gold-hi font-bold mt-1 border border-gold/20">
                {profile.role === 'super_admin' ? (isRtl ? 'مشرف عام' : 'Super Admin') : (isRtl ? 'محرر' : 'Editor')}
              </span>
            </div>
          </div>

          <form action={`/api/auth/signout`} method="POST" className="shrink-0">
            <button
              type="submit"
              title={isRtl ? 'تسجيل الخروج' : 'Sign Out'}
              aria-label={isRtl ? 'تسجيل الخروج' : 'Sign Out'}
              className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/10 transition-all duration-300 cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </form>
        </div>

        {/* Sidebar Nav - Scrollable internally */}
        <div className="flex-1 overflow-y-auto no-scrollbar mb-6">
          <AdminSidebarNav locale={locale} isRtl={isRtl} isSuperAdmin={isSuperAdmin} />
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto pt-6 border-t border-gold/10 space-y-2.5 shrink-0">
          {/* Public Site Link */}
          <a
            href={`/${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-gold-hi hover:text-ivory bg-gold/5 hover:bg-gold/10 border border-gold/20 hover:border-gold/30 transition-all duration-300 shadow-sm"
          >
            <span>{isRtl ? 'الموقع العام للمنصة' : 'Public Platform'}</span>
            <ExternalLink size={12} className="text-gold-hi" />
          </a>

          {/* Logout Action */}
          <form action={`/api/auth/signout`} method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10 transition-all duration-300 cursor-pointer text-start"
            >
              <LogOut size={18} />
              <span className="font-ui">{isRtl ? 'تسجيل الخروج' : 'Sign Out'}</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Navigation and Header */}
      <AdminMobileNav 
        locale={locale} 
        isRtl={isRtl} 
        isSuperAdmin={isSuperAdmin}
        profileName={profile.name}
        profileRole={profile.role}
      />

      {/* Main Content Area */}
      <main className={`flex-grow flex flex-col min-w-0 relative z-10 ${
        isRtl ? 'md:mr-68 lg:mr-76' : 'md:ml-68 lg:ml-76'
      }`}>
        <div className="p-6 md:p-10 lg:p-12 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
