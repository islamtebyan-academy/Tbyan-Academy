'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  ShieldAlert,
  LucideIcon
} from 'lucide-react';

interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface AdminSidebarNavProps {
  locale: string;
  isRtl: boolean;
  isSuperAdmin: boolean;
}

export default function AdminSidebarNav({ locale, isRtl, isSuperAdmin }: AdminSidebarNavProps) {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      label: isRtl ? 'الرئيسية' : 'Overview',
      href: `/${locale}/admin`,
      icon: LayoutDashboard,
    },
    {
      label: isRtl ? 'الطلاب والاشتراكات' : 'Students & Subscriptions',
      href: `/${locale}/admin/students`,
      icon: Users,
    },
    {
      label: isRtl ? 'إدارة الكورسات' : 'Course Catalog',
      href: `/${locale}/admin/courses`,
      icon: BookOpen,
    },
    {
      label: isRtl ? 'إدارة المحتوى (CMS)' : 'Content Manager',
      href: `/${locale}/admin/content`,
      icon: FileText,
    },
    {
      label: isRtl ? 'مكتبة الوسائط' : 'Media Library',
      href: `/${locale}/admin/media`,
      icon: ImageIcon,
    },
  ];

  if (isSuperAdmin) {
    menuItems.push({
      label: isRtl ? 'إدارة المشرفين' : 'Administrators',
      href: `/${locale}/admin/settings`,
      icon: ShieldAlert,
    });
  }

  return (
    <nav className="flex-1 space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        // Match exact or sub-routes
        const isActive = pathname === item.href || (item.href !== `/${locale}/admin` && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 relative border ${
              isActive 
                ? 'bg-gradient-to-r from-gold/10 to-gold/0 border-gold/25 text-gold-hi shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                : 'border-transparent text-sand/70 hover:text-ivory hover:bg-navy/30 hover:border-gold/10'
            }`}
          >
            {/* Active indicators */}
            {isActive && (
              <span className={`absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-gold-hi rounded-full ${
                isRtl ? 'left-0' : 'right-0'
              }`} />
            )}
            
            <Icon 
              size={18} 
              className={`transition-colors duration-300 ${
                isActive ? 'text-gold-hi' : 'text-gold-muted/70 group-hover:text-gold-hi'
              }`} 
            />
            <span className="font-ui">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
