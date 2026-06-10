'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Logo from '../brand/Logo';
import {
  Menu, X, Globe, ChevronDown, Home, Users, Mail, FileText,
  BookOpen, Award, GraduationCap, CreditCard
} from 'lucide-react';

export default function Header() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  // Detect scroll to add slight shadow adjustment
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAboutActive = pathname === `/${locale}/about` || pathname === `/${locale}/method` || pathname === `/${locale}/teachers`;

  const getCoursesData = () => {
    if (locale === 'ar') {
      return [
        {
          category: "القرآن والتجويد",
          href: `/ar/programs?track=quran`,
          description: "حفظ وإتقان كتاب الله بالأسانيد المتصلة",
          items: [
            { name: "حفظ القرآن الكريم وتثبيته", href: `/ar/programs?track=quran` },
            { name: "ضبط المخارج وأحكام التجويد", href: `/ar/programs?track=quran` },
            { name: "القراءات المتواترة والإجازات", href: `/ar/programs?track=quran` }
          ]
        },
        {
          category: "اللغة العربية",
          href: `/ar/programs?track=arabic`,
          description: "فهم لغة التنزيل وبناء الملكة اللغوية",
          items: [
            { name: "التأسيس اللغوي ونور البيان", href: `/ar/programs?track=arabic` },
            { name: "قواعد النحو والصرف (الآجرومية)", href: `/ar/programs?track=arabic` },
            { name: "البلاغة والآداب الكلاسيكية", href: `/ar/programs?track=arabic` }
          ]
        },
        {
          category: "العلوم الشرعية",
          href: `/ar/programs?track=islamic`,
          description: "تحصيل منهجية متينة في الفقه والعقيدة",
          items: [
            { name: "الفقه المذهبي (الشافعي، الحنفي، المالكي)", href: `/ar/programs?track=islamic` },
            { name: "العقيدة الإسلامية والتوحيد", href: `/ar/programs?track=islamic` },
            { name: "الحديث الشريف ومتون السنة", href: `/ar/programs?track=islamic` }
          ]
        }
      ];
    } else if (locale === 'fr') {
      return [
        {
          category: "Coran & Tajwid",
          href: `/fr/programs?track=quran`,
          description: "Mémorisation et récitation avec chaînes de transmission.",
          items: [
            { name: "Mémorisation & Hifz du Coran", href: `/fr/programs?track=quran` },
            { name: "Règles du Tajwid & Makharij", href: `/fr/programs?track=quran` },
            { name: "Récitations & Ijazat certifiées", href: `/fr/programs?track=quran` }
          ]
        },
        {
          category: "Langue Arabe",
          href: `/fr/programs?track=arabic`,
          description: "Maîtriser la grammaire et la phonétique classique.",
          items: [
            { name: "Bases & Récitation Nour Al-Bayan", href: `/fr/programs?track=arabic` },
            { name: "Grammaire & Morphologie (Nahw/Sarf)", href: `/fr/programs?track=arabic` },
            { name: "Rhétorique & Littérature Classique", href: `/fr/programs?track=arabic` }
          ]
        },
        {
          category: "Sciences Islamiques",
          href: `/fr/programs?track=islamic`,
          description: "Jurisprudence, théologie et études de textes sacrés.",
          items: [
            { name: "Jurisprudence (Fiqh des 4 écoles)", href: `/fr/programs?track=islamic` },
            { name: "Théologie Islamique (Aqidah)", href: `/fr/programs?track=islamic` },
            { name: "Sciences du Hadith & Exégèse (Tafsir)", href: `/fr/programs?track=islamic` }
          ]
        }
      ];
    } else {
      return [
        {
          category: "Quran & Tajweed",
          href: `/en/programs?track=quran`,
          description: "Memorization and perfect recitation with chains of transmission.",
          items: [
            { name: "Quran Memorization & Hifz", href: `/en/programs?track=quran` },
            { name: "Tajweed Rules & Articulation", href: `/en/programs?track=quran` },
            { name: "Ten Qira'at & Certified Ijazat", href: `/en/programs?track=quran` }
          ]
        },
        {
          category: "Classical Arabic",
          href: `/en/programs?track=arabic`,
          description: "Understand the language of the Quran and build linguistics.",
          items: [
            { name: "Foundations & Nour Al-Bayan", href: `/en/programs?track=arabic` },
            { name: "Grammar & Syntax (Nahw & Sarf)", href: `/en/programs?track=arabic` },
            { name: "Classical Rhetoric & Literature", href: `/en/programs?track=arabic` }
          ]
        },
        {
          category: "Islamic Sciences",
          href: `/en/programs?track=islamic`,
          description: "Build a structured foundation in Fiqh, Aqeedah, and texts.",
          items: [
            { name: "Madhhab Jurisprudence (Fiqh)", href: `/en/programs?track=islamic` },
            { name: "Orthodox Islamic Creed (Aqeedah)", href: `/en/programs?track=islamic` },
            { name: "Hadith Studies & Prophetic Seerah", href: `/en/programs?track=islamic` }
          ]
        }
      ];
    }
  };

  // Helper to change locale in pathname
  const switchLocale = (newLocale: string) => {
    setLangDropdownOpen(false);
    const segments = pathname.split('/');
    const locales = ['en', 'fr', 'ar'];
    const defaultLocale = 'en';

    if (segments.length > 1 && locales.includes(segments[1])) {
      if (newLocale === defaultLocale) {
        segments.splice(1, 1);
      } else {
        segments[1] = newLocale;
      }
    } else {
      if (newLocale !== defaultLocale) {
        segments.splice(1, 0, newLocale);
      }
    }

    let newPath = segments.join('/') || '/';
    if (newPath.endsWith('/') && newPath.length > 1) {
      newPath = newPath.slice(0, -1);
    }

    const search = typeof window !== 'undefined' ? window.location.search : '';
    if (search) {
      newPath = `${newPath}${search}`;
    }

    router.push(newPath);
  };

  const getLanguageLabel = (l: string) => {
    switch (l) {
      case 'ar': return 'العربية';
      case 'fr': return 'Français';
      default: return 'English';
    }
  };

  const isRtl = locale === 'ar';

  return (
    <header
      className="fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6"
    >
      <div
        className={`max-w-7xl mx-auto bg-[#FDFAF3]/85 backdrop-blur-xl border border-gold-muted/20 shadow-[0_8px_32px_rgba(6,13,22,0.06)] flex flex-col transition-all duration-300 ${mobileMenuOpen ? 'rounded-2xl py-5 px-6 gap-6' : 'rounded-full py-2.5 px-6'
          } ${scrolled ? 'shadow-[0_12px_40px_rgba(6,13,22,0.1)] bg-[#FDFAF3]/92 py-2 border-gold-muted/30' : 'py-3'
          }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="focus:outline-none">
              <Logo 
                variant="horizontal" 
                className={`transition-all duration-300 ${
                  scrolled 
                    ? 'h-8 md:h-10' 
                    : 'h-10 md:h-12'
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-6 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {/* Home Link */}
            <Link
              href={`/${locale}`}
              className={`text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 font-semibold group ${
                pathname === `/${locale}` || pathname === `/${locale}/`
                  ? 'text-gold font-bold'
                  : 'text-navy-brand/80 hover:text-gold hover:translate-y-[-0.5px]'
              }`}
            >
              <Home size={13} className={`transition-colors duration-300 ${pathname === `/${locale}` || pathname === `/${locale}/` ? 'text-gold' : 'text-navy-brand/40 group-hover:text-gold'}`} />
              <span>{t('home')}</span>
            </Link>

            {/* About Us Dropdown */}
            <div className="relative group py-2">
              <Link
                href={`/${locale}/about`}
                className={`text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 font-semibold cursor-pointer group ${
                  isAboutActive
                    ? 'text-gold font-bold'
                    : 'text-navy-brand/80 hover:text-gold'
                }`}
              >
                <Users size={13} className={`transition-colors duration-300 ${isAboutActive ? 'text-gold' : 'text-navy-brand/40 group-hover:text-gold'}`} />
                <span>{t('about')}</span>
                <ChevronDown size={11} className="transition-transform duration-300 group-hover:rotate-180 text-navy-brand/30 group-hover:text-gold" />
              </Link>
              
              {/* Dropdown menu */}
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-[26px] w-48 bg-[#FDFAF3]/98 backdrop-blur-md border border-gold-muted/20 shadow-[0_12px_40px_rgba(6,13,22,0.12)] rounded-xl py-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden before:content-[''] before:absolute before:bottom-full before:left-0 before:right-0 before:h-[32px]"
              >
                {/* Gold Highlight Line */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
                
                <Link
                  href={`/${locale}/about`}
                  className={`px-4 py-2.5 text-[11px] uppercase tracking-wider font-semibold hover:bg-gold-champagne/10 hover:text-gold transition-colors flex items-center gap-2.5 ${
                    pathname === `/${locale}/about` ? 'text-gold bg-gold-champagne/[0.05]' : 'text-navy-brand/75'
                  }`}
                >
                  <Users size={13} className={pathname === `/${locale}/about` ? 'text-gold' : 'text-navy-brand/40'} />
                  <span>{t('about')}</span>
                </Link>
                <Link
                  href={`/${locale}/method`}
                  className={`px-4 py-2.5 text-[11px] uppercase tracking-wider font-semibold hover:bg-gold-champagne/10 hover:text-gold transition-colors flex items-center gap-2.5 ${
                    pathname === `/${locale}/method` ? 'text-gold bg-gold-champagne/[0.05]' : 'text-navy-brand/75'
                  }`}
                >
                  <Award size={13} className={pathname === `/${locale}/method` ? 'text-gold' : 'text-navy-brand/40'} />
                  <span>{t('method')}</span>
                </Link>
                <Link
                  href={`/${locale}/teachers`}
                  className={`px-4 py-2.5 text-[11px] uppercase tracking-wider font-semibold hover:bg-gold-champagne/10 hover:text-gold transition-colors flex items-center gap-2.5 ${
                    pathname === `/${locale}/teachers` ? 'text-gold bg-gold-champagne/[0.05]' : 'text-navy-brand/75'
                  }`}
                >
                  <GraduationCap size={13} className={pathname === `/${locale}/teachers` ? 'text-gold' : 'text-navy-brand/40'} />
                  <span>{t('teachers')}</span>
                </Link>
              </div>
            </div>

            {/* Courses Mega Menu Dropdown */}
            <div className="relative group py-2">
              <Link
                href={`/${locale}/programs`}
                className={`text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 font-semibold cursor-pointer group ${
                  pathname === `/${locale}/programs` || pathname.startsWith(`/${locale}/programs/`)
                    ? 'text-gold font-bold'
                    : 'text-navy-brand/80 hover:text-gold'
                }`}
              >
                <BookOpen size={13} className={`transition-colors duration-300 ${pathname.startsWith(`/${locale}/programs`) ? 'text-gold' : 'text-navy-brand/40 group-hover:text-gold'}`} />
                <span>{t('programs')}</span>
                <ChevronDown size={11} className="transition-transform duration-300 group-hover:rotate-180 text-navy-brand/30 group-hover:text-gold" />
              </Link>
              
              {/* Mega Menu Container */}
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-[26px] w-[840px] bg-[#FDFAF3]/98 backdrop-blur-md border border-gold-muted/20 shadow-[0_16px_48px_rgba(6,13,22,0.15)] rounded-2xl p-6 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden before:content-[''] before:absolute before:bottom-full before:left-0 before:right-0 before:h-[32px]"
              >
                {/* Gold Highlight Line */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
                
                {/* 3-Column Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {getCoursesData().map((col, index) => {
                    const ColIcon = index === 0 ? BookOpen : index === 1 ? GraduationCap : Award;
                    return (
                      <div key={index} className="flex flex-col text-start">
                        {/* Column Header */}
                        <Link 
                          href={col.href}
                          className="group/col flex items-center gap-2 mb-2 focus:outline-none"
                        >
                          <div className="p-1.5 rounded-lg bg-gold-champagne/10 text-gold group-hover/col:bg-gold-champagne group-hover/col:text-navy-brand transition-all duration-300">
                            <ColIcon size={14} />
                          </div>
                          <span className={`text-[13px] font-bold text-navy-brand group-hover/col:text-gold transition-colors ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                            {col.category}
                          </span>
                        </Link>
                        
                        <p className={`text-[10px] text-navy-brand/60 leading-relaxed mb-3 ${isRtl ? 'font-noto' : 'font-lora'}`}>
                          {col.description}
                        </p>
                        
                        {/* Divider Line */}
                        <div className="h-[1px] bg-gold-muted/15 mb-3" />
                        
                        {/* Sub-courses List */}
                        <ul className="flex flex-col gap-2">
                          {col.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                href={item.href}
                                className={`text-[11px] text-navy-brand/80 hover:text-gold transition-all duration-200 flex items-center gap-1.5 group/item ${isRtl ? 'font-cairo' : 'font-dm'}`}
                              >
                                <span className="w-1 h-1 rounded-full bg-gold opacity-40 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-200" />
                                <span className="group-hover/item:translate-x-0.5 group-hover/item:ps-0.5 transition-all duration-200">
                                  {item.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Banner */}
                <div className="mt-6 pt-4 border-t border-gold-muted/15 flex items-center justify-between">
                  <div className={`text-[10px] text-navy-brand/50 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                    {isRtl ? "هل تحتاج لمساعدة في تحديد مستواك الدراسي؟" : "Need help determining your academic level?"}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/${locale}/programs`}
                      className={`border border-gold-hi/30 text-navy-brand hover:text-gold hover:border-gold py-2 px-4 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 ${isRtl ? 'font-cairo' : 'font-dm'}`}
                    >
                      {isRtl ? "استكشف كافة البرامج" : "Explore All Programs"}
                    </Link>
                    <Link
                      href={`/${locale}/book`}
                      className={`btn-gold py-2 px-5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${isRtl ? 'font-cairo' : 'font-dm'}`}
                    >
                      {isRtl ? "احجز جلسة تقييم مجانية" : "Book Free Assessment"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing/Subscriptions Link */}
            <Link
              href={`/${locale}/pricing`}
              className={`text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 font-semibold group ${
                pathname === `/${locale}/pricing`
                  ? 'text-gold font-bold'
                  : 'text-navy-brand/80 hover:text-gold hover:translate-y-[-0.5px]'
              }`}
            >
              <CreditCard size={13} className={`transition-colors duration-300 ${pathname === `/${locale}/pricing` ? 'text-gold' : 'text-navy-brand/40 group-hover:text-gold'}`} />
              <span>{t('pricing')}</span>
            </Link>

            {/* Articles Link */}
            <Link
              href={`/${locale}/blog`}
              className={`text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 font-semibold group ${
                pathname === `/${locale}/blog`
                  ? 'text-gold font-bold'
                  : 'text-navy-brand/80 hover:text-gold hover:translate-y-[-0.5px]'
              }`}
            >
              <FileText size={13} className={`transition-colors duration-300 ${pathname === `/${locale}/blog` ? 'text-gold' : 'text-navy-brand/40 group-hover:text-gold'}`} />
              <span>{t('blog')}</span>
            </Link>

            {/* Contact Link */}
            <Link
              href={`/${locale}/contact`}
              className={`text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 font-semibold group ${
                pathname === `/${locale}/contact`
                  ? 'text-gold font-bold'
                  : 'text-navy-brand/80 hover:text-gold hover:translate-y-[-0.5px]'
              }`}
            >
              <Mail size={13} className={`transition-colors duration-300 ${pathname === `/${locale}/contact` ? 'text-gold' : 'text-navy-brand/40 group-hover:text-gold'}`} />
              <span>{t('contact')}</span>
            </Link>
          </nav>

          {/* Actions (Language + Socials + CTA) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Socials Capsule */}
            <div className="bg-navy-brand/[0.03] px-3.5 py-1.5 rounded-full flex items-center gap-3.5 border border-navy-brand/10 shadow-sm shadow-midnight/2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-brand/60 hover:text-gold transition-colors duration-150 flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-brand/60 hover:text-gold transition-colors duration-150 flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-brand/60 hover:text-gold transition-colors duration-150 flex items-center justify-center"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-navy-brand/80 hover:text-gold border border-navy-brand/10 hover:border-gold/30 bg-navy-brand/[0.03] hover:bg-navy-brand/[0.06] px-3.5 py-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer shadow-sm shadow-midnight/2"
              >
                <Globe size={14} className="text-gold" />
                <span>{getLanguageLabel(locale)}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div
                  className={`absolute mt-[26px] w-32 rounded-xl bg-[#FDFAF3]/98 backdrop-blur-md border border-gold-muted/20 shadow-[0_12px_40px_rgba(6,13,22,0.12)] py-2 z-50 overflow-hidden ${
                    isRtl ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
                  }`}
                >
                  {/* Gold Highlight Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
                  
                  {['en', 'fr', 'ar'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => switchLocale(lang)}
                      className={`w-full text-start px-4 py-2.5 text-[11px] uppercase tracking-wider hover:bg-gold-champagne/10 hover:text-gold transition-colors duration-150 cursor-pointer ${
                        locale === lang ? 'text-gold font-semibold bg-gold-champagne/[0.05]' : 'text-navy-brand/75'
                      } ${lang === 'ar' ? 'font-cairo text-right' : 'font-dm'}`}
                    >
                      {getLanguageLabel(lang)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Language Button */}
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="text-navy-brand/80 p-2 focus:outline-none cursor-pointer border border-navy-brand/10 rounded-full hover:border-gold transition-colors"
              aria-label="Select Language"
              title="Select Language"
            >
              <Globe size={16} className="text-gold" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-navy-brand p-2 focus:outline-none cursor-pointer border border-navy-brand/10 rounded-full hover:border-gold transition-colors"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              title={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Language dropdown fallback */}
        {langDropdownOpen && (
          <div className="md:hidden absolute top-16 right-6 bg-white border border-gold-muted/20 rounded-md shadow-xl py-1 w-36 z-50">
            {['en', 'fr', 'ar'].map((lang) => (
              <button
                key={lang}
                onClick={() => switchLocale(lang)}
                className="w-full text-left px-4 py-2 text-xs text-navy-brand/70 hover:bg-[#FDFAF3] hover:text-gold transition-colors duration-150 cursor-pointer"
              >
                {getLanguageLabel(lang)}
              </button>
            ))}
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full border-t border-gold-muted/10 pt-4 animate-fade-in">
            <nav className={`flex flex-col gap-4 ${isRtl ? 'font-cairo text-right' : 'font-dm text-left'}`}>
              {/* Home Link */}
              <Link
                href={`/${locale}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-navy-brand/5 transition-colors ${
                  pathname === `/${locale}` || pathname === `/${locale}/` ? 'text-gold font-semibold' : 'text-navy-brand/85 hover:text-gold'
                }`}
              >
                <Home size={15} className={pathname === `/${locale}` || pathname === `/${locale}/` ? 'text-gold' : 'text-navy-brand/40'} />
                <span>{t('home')}</span>
              </Link>

              {/* About Us Expandable Menu */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className={`text-sm flex items-center justify-between py-1 px-2 rounded-lg hover:bg-navy-brand/5 transition-colors w-full cursor-pointer ${
                    isAboutActive ? 'text-gold font-semibold' : 'text-navy-brand/85 hover:text-gold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Users size={15} className={isAboutActive ? 'text-gold' : 'text-navy-brand/40'} />
                    <span>{t('about')}</span>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileAboutOpen && (
                  <div className="flex flex-col gap-2 ps-6 border-s border-gold-muted/20 ms-4 animate-fade-in">
                    <Link
                      href={`/${locale}/about`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xs uppercase tracking-wider py-1 px-2 rounded-lg hover:bg-navy-brand/5 transition-colors flex items-center gap-2 ${
                        pathname === `/${locale}/about` ? 'text-gold font-semibold' : 'text-navy-brand/75 hover:text-gold'
                      }`}
                    >
                      <Users size={13} className={pathname === `/${locale}/about` ? 'text-gold' : 'text-navy-brand/40'} />
                      <span>{t('about')}</span>
                    </Link>
                    <Link
                      href={`/${locale}/method`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xs uppercase tracking-wider py-1 px-2 rounded-lg hover:bg-navy-brand/5 transition-colors flex items-center gap-2 ${
                        pathname === `/${locale}/method` ? 'text-gold font-semibold' : 'text-navy-brand/75 hover:text-gold'
                      }`}
                    >
                      <Award size={13} className={pathname === `/${locale}/method` ? 'text-gold' : 'text-navy-brand/40'} />
                      <span>{t('method')}</span>
                    </Link>
                    <Link
                      href={`/${locale}/teachers`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xs uppercase tracking-wider py-1 px-2 rounded-lg hover:bg-navy-brand/5 transition-colors flex items-center gap-2 ${
                        pathname === `/${locale}/teachers` ? 'text-gold font-semibold' : 'text-navy-brand/75 hover:text-gold'
                      }`}
                    >
                      <GraduationCap size={13} className={pathname === `/${locale}/teachers` ? 'text-gold' : 'text-navy-brand/40'} />
                      <span>{t('teachers')}</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Programs/Courses Expandable Menu */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                  className={`text-sm flex items-center justify-between py-1 px-2 rounded-lg hover:bg-navy-brand/5 transition-colors w-full cursor-pointer ${
                    pathname.startsWith(`/${locale}/programs`) ? 'text-gold font-semibold' : 'text-navy-brand/85 hover:text-gold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={15} className={pathname.startsWith(`/${locale}/programs`) ? 'text-gold' : 'text-navy-brand/40'} />
                    <span>{t('programs')}</span>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileProgramsOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileProgramsOpen && (
                  <div className="flex flex-col gap-3 ps-6 border-s border-gold-muted/20 ms-4 animate-fade-in text-start">
                    <Link
                      href={`/${locale}/programs`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xs font-bold text-gold uppercase tracking-wider hover:underline flex items-center gap-2 mb-2 pb-1 border-b border-gold-muted/10 ${isRtl ? 'font-cairo' : 'font-dm'}`}
                    >
                      <BookOpen size={13} />
                      <span>{isRtl ? "عرض كافة البرامج والكورسات ➔" : "View All Courses & Programs ➔"}</span>
                    </Link>
                    {getCoursesData().map((col, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <Link
                          href={col.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-xs font-bold hover:text-gold transition-colors flex items-center gap-2 ${
                            pathname === col.href ? 'text-gold' : 'text-navy-brand/90'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span>{col.category}</span>
                        </Link>
                        <div className="flex flex-col gap-1 ps-4 border-s border-gold-muted/10 ms-0.5">
                          {col.items.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`text-[11px] text-navy-brand/70 hover:text-gold transition-colors py-0.5 ${
                                pathname === item.href ? 'text-gold' : ''
                              }`}
                            >
                              • {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing/Subscriptions Link */}
              <Link
                href={`/${locale}/pricing`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-navy-brand/5 transition-colors ${
                  pathname === `/${locale}/pricing` ? 'text-gold font-semibold' : 'text-navy-brand/85 hover:text-gold'
                }`}
              >
                <CreditCard size={15} className={pathname === `/${locale}/pricing` ? 'text-gold' : 'text-navy-brand/40'} />
                <span>{t('pricing')}</span>
              </Link>

              {/* Articles Link */}
              <Link
                href={`/${locale}/blog`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-navy-brand/5 transition-colors ${
                  pathname === `/${locale}/blog` ? 'text-gold font-semibold' : 'text-navy-brand/85 hover:text-gold'
                }`}
              >
                <FileText size={15} className={pathname === `/${locale}/blog` ? 'text-gold' : 'text-navy-brand/40'} />
                <span>{t('blog')}</span>
              </Link>

              {/* Contact Link */}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-navy-brand/5 transition-colors ${
                  pathname === `/${locale}/contact` ? 'text-gold font-semibold' : 'text-navy-brand/85 hover:text-gold'
                }`}
              >
                <Mail size={15} className={pathname === `/${locale}/contact` ? 'text-gold' : 'text-navy-brand/40'} />
                <span>{t('contact')}</span>
              </Link>

              <hr className="border-gold-muted/10 my-1" />

              {/* Socials Capsule for Mobile */}
              <div className="flex items-center justify-between">
                <div className="bg-navy-brand/5 px-3.5 py-1.5 rounded-full flex items-center gap-4 border border-navy-brand/5 w-fit">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-navy-brand/60 hover:text-gold transition-colors" aria-label="Instagram" title="Instagram">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-navy-brand/60 hover:text-gold transition-colors" aria-label="Facebook" title="Facebook">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-navy-brand/60 hover:text-gold transition-colors" aria-label="Twitter" title="Twitter">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
