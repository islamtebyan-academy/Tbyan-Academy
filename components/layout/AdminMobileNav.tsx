'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, ExternalLink, User } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import AdminSidebarNav from './AdminSidebarNav';

interface AdminMobileNavProps {
  locale: string;
  isRtl: boolean;
  isSuperAdmin: boolean;
  profileName: string;
  profileRole: string;
}

export default function AdminMobileNav({
  locale,
  isRtl,
  isSuperAdmin,
  profileName,
  profileRole
}: AdminMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Top Navbar Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#22314b] border-b border-gold/15 z-20 text-ivory shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isRtl ? 'فتح القائمة' : 'Open Menu'}
            title={isRtl ? 'القائمة' : 'Menu'}
            className="p-2 text-ivory hover:text-gold-hi focus:outline-none transition-colors cursor-pointer"
          >
            <Menu size={22} />
          </button>
          <Logo variant="horizontal" light={true} className="h-8 w-auto" />
        </div>

        {/* Quick logout & public links */}
        <div className="flex items-center gap-2">
          <a
            href={`/${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            title={isRtl ? 'الموقع العام' : 'Public Site'}
            aria-label={isRtl ? 'الموقع العام' : 'Public Site'}
            className="p-2 text-gold-hi bg-gold/5 rounded-lg border border-gold/20 hover:bg-gold/10 transition-colors"
          >
            <ExternalLink size={14} />
          </a>
          <form action={`/api/auth/signout`} method="POST" className="inline">
            <button
              type="submit"
              title={isRtl ? 'تسجيل الخروج' : 'Sign Out'}
              aria-label={isRtl ? 'تسجيل الخروج' : 'Sign Out'}
              className="p-2 text-rose-400 bg-rose-400/5 rounded-lg border border-rose-500/10 hover:bg-rose-400/10 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
            </button>
          </form>
        </div>
      </header>

      {/* Drawer Overlay Backdrop */}
      {isOpen && (
        <div 
          onClick={toggleMenu}
          className="md:hidden fixed inset-0 bg-[#0d1624]/80 backdrop-blur-sm z-40 animate-fade-in"
        />
      )}

      {/* Slide-in Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 bottom-0 w-72 bg-gradient-to-b from-[#22314b] to-[#091521] p-6 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen 
            ? 'translate-x-0' 
            : isRtl 
              ? 'translate-x-full' 
              : '-translate-x-full'
        } ${
          isRtl ? 'right-0 border-l border-gold/20' : 'left-0 border-r border-gold/20'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gold/15 shrink-0">
          <Logo variant="horizontal" light={true} className="h-8 w-auto" />
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isRtl ? 'إغلاق القائمة' : 'Close Menu'}
            className="w-8 h-8 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-ivory hover:text-gold-hi transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer User Card */}
        <div className="mb-6 p-3.5 rounded-xl bg-white/[0.03] border border-gold/15 flex items-center justify-between gap-3 relative overflow-hidden shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/25 to-gold/5 border border-gold/30 flex items-center justify-center text-gold-hi shadow-md shrink-0">
              <User size={16} />
            </div>
            <div className="min-w-0 text-start">
              <p className="text-xs font-bold text-ivory truncate">{profileName}</p>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider bg-gold/10 text-gold-hi font-bold mt-1 border border-gold/20">
                {profileRole === 'super_admin' ? (isRtl ? 'مشرف عام' : 'Super Admin') : (isRtl ? 'محرر' : 'Editor')}
              </span>
            </div>
          </div>
          
          <form action={`/api/auth/signout`} method="POST" className="shrink-0">
            <button
              type="submit"
              title={isRtl ? 'تسجيل الخروج' : 'Sign Out'}
              aria-label={isRtl ? 'تسجيل الخروج' : 'Sign Out'}
              className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-300 cursor-pointer"
            >
              <LogOut size={14} />
            </button>
          </form>
        </div>

        {/* Drawer Nav links - closes drawer on click */}
        <div className="flex-grow overflow-y-auto no-scrollbar mb-6" onClick={() => setIsOpen(false)}>
          <AdminSidebarNav locale={locale} isRtl={isRtl} isSuperAdmin={isSuperAdmin} />
        </div>

        {/* Drawer Footer */}
        <div className="mt-auto pt-6 border-t border-gold/10 space-y-2.5 shrink-0">
          <a
            href={`/${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-gold-hi hover:text-ivory bg-gold/5 hover:bg-gold/10 border border-gold/20 hover:border-gold/30 transition-all duration-300 shadow-sm"
          >
            <span>{isRtl ? 'الموقع العام للمنصة' : 'Public Platform'}</span>
            <ExternalLink size={12} className="text-gold-hi" />
          </a>

          <form action={`/api/auth/signout`} method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10 transition-all duration-300 cursor-pointer text-start font-ui"
            >
              <LogOut size={16} />
              <span>{isRtl ? 'تسجيل الخروج' : 'Sign Out'}</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
