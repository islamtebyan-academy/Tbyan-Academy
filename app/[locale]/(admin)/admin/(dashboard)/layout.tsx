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
    redirect(`/${locale}/admin/login`);
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
    redirect(`/${locale}/admin/login?error=inactive`);
  }

  const isRtl = locale === 'ar';
  const isSuperAdmin = profile.role === 'super_admin';

  return (
    <div className="min-h-screen bg-ivory text-ink flex flex-col md:flex-row relative font-ui antialiased">
      {/* Background radial highlights for high-end light glow contrast */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-navy/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle repeating background pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:80px_80px] opacity-[0.025] pointer-events-none z-0" />

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-68 lg:w-76 bg-gradient-to-b from-[#22314b] to-[#091521] border-r border-gold/20 p-6 z-20 shrink-0 relative overflow-hidden dark-pattern-overlay text-ivory">
        {/* Shimmer top border line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-hi/40 to-transparent" />

        {/* Brand Logo Header */}
        <div className="mb-10 relative">
          <Logo variant="horizontal" light={true} className="h-10 w-auto" />
        </div>

        {/* User Card */}
        <div className="mb-8 p-4 rounded-xl bg-white/[0.03] border border-gold/15 flex items-center gap-3 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-12 h-12 bg-gold/5 rounded-full blur-xl pointer-events-none" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/25 to-gold/5 border border-gold/30 flex items-center justify-center text-gold-hi shadow-md">
            <User size={18} />
          </div>
          <div className="min-w-0 flex-1 text-start">
            <p className="text-xs font-bold text-ivory truncate">{profile.name}</p>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider bg-gold/10 text-gold-hi font-bold mt-1 border border-gold/20">
              {profile.role === 'super_admin' ? (isRtl ? 'مشرف عام' : 'Super Admin') : (isRtl ? 'محرر' : 'Editor')}
            </span>
          </div>
        </div>

        {/* Sidebar Nav */}
        <AdminSidebarNav locale={locale} isRtl={isRtl} isSuperAdmin={isSuperAdmin} />

        {/* Sidebar Footer */}
        <div className="mt-auto pt-6 border-t border-gold/10 space-y-2.5">
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

      {/* Mobile Top Navbar */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#22314b] border-b border-gold/15 z-20 text-ivory">
        <div className="flex items-center gap-2">
          <Logo variant="horizontal" light={true} className="h-8 w-auto" />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3">
          <a
            href={`/${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            title={isRtl ? 'الموقع العام' : 'Public Site'}
            aria-label={isRtl ? 'الموقع العام' : 'Public Site'}
            className="p-2.5 text-gold-hi bg-gold/5 rounded-lg border border-gold/20 hover:bg-gold/10 transition-colors"
          >
            <ExternalLink size={14} />
          </a>
          <form action={`/api/auth/signout`} method="POST" className="inline">
            <button
              type="submit"
              title={isRtl ? 'تسجيل الخروج' : 'Sign Out'}
              aria-label={isRtl ? 'تسجيل الخروج' : 'Sign Out'}
              className="p-2.5 text-rose-400 bg-rose-400/5 rounded-lg border border-rose-500/10 hover:bg-rose-400/10 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
            </button>
          </form>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 relative z-10 overflow-y-auto">
        <div className="p-6 md:p-10 lg:p-12 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
