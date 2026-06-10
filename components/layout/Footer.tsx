'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Logo from '../brand/Logo';
import { Globe, Send } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  const isRtl = locale === 'ar';

  const switchLocale = (newLocale: string) => {
    // Set cookie to synchronize next-intl active locale preference
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }

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

  return (
    <footer className="bg-navy-deep text-parchment/60 py-16 border-t border-gold-muted/20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <Logo variant="horizontal" light={true} />
          <p className={`text-xs leading-relaxed max-w-sm italic ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {t('Footer.verse')}
          </p>
          
          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com/islamtebyan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gold-muted/30 bg-white/5 flex items-center justify-center text-parchment/60 hover:text-gold hover:border-gold hover:bg-white/10 transition-all duration-300"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://youtube.com/c/islamtebyan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gold-muted/30 bg-white/5 flex items-center justify-center text-parchment/60 hover:text-gold hover:border-gold hover:bg-white/10 transition-all duration-300"
              aria-label="YouTube"
              title="YouTube"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://instagram.com/islamtebyan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gold-muted/30 bg-white/5 flex items-center justify-center text-parchment/60 hover:text-gold hover:border-gold hover:bg-white/10 transition-all duration-300"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.054.937.04 1.612.189 2.186.411a4.87 4.87 0 012.026 2.026c.222.574.372 1.249.412 2.186.04.927.054 1.28.054 3.71 0 2.43-.01 2.784-.054 3.71-.04.937-.189 1.613-.412 2.186a4.87 4.87 0 01-2.026 2.026c-.574.222-1.249.372-2.186.412-.927.04-1.28.054-3.71.054s-2.784-.01-3.71-.054c-.937-.04-1.613-.189-2.186-.412a4.87 4.87 0 01-2.026-2.026c-.222-.574-.372-1.249-.412-2.186-.04-.927-.054-1.28-.054-3.71 0-2.43.01-2.784.054-3.71.04-.937.189-1.613.412-2.186a4.87 4.87 0 012.026-2.026c.574-.222 1.249-.372 2.186-.412.927-.04 1.28-.054 3.71-.054zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.827-8a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://x.com/islamtebyan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gold-muted/30 bg-white/5 flex items-center justify-center text-parchment/60 hover:text-gold hover:border-gold hover:bg-white/10 transition-all duration-300"
              aria-label="X / Twitter"
              title="X / Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://t.me/islamtebyan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gold-muted/30 bg-white/5 flex items-center justify-center text-parchment/60 hover:text-gold hover:border-gold hover:bg-white/10 transition-all duration-300"
              aria-label="Telegram"
              title="Telegram"
            >
              <Send size={12} className="rotate-[320deg] relative -top-0.5" />
            </a>
          </div>
        </div>

        {/* Programs Column */}
        <div className="flex flex-col gap-4">
          <h4 className={`text-xs uppercase tracking-widest text-gold font-bold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {t('Footer.quickLinks')}
          </h4>
          <ul className={`flex flex-col gap-2.5 text-xs ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            <li>
              <Link href={`/${locale}/programs`} className="hover:text-gold-champagne transition-colors duration-150">
                {t('Navigation.programs')}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/method`} className="hover:text-gold-champagne transition-colors duration-150">
                {t('Navigation.method')}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/teachers`} className="hover:text-gold-champagne transition-colors duration-150">
                {t('Navigation.teachers')}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/pricing`} className="hover:text-gold-champagne transition-colors duration-150">
                {t('Navigation.pricing')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-4">
          <h4 className={`text-xs uppercase tracking-widest text-gold font-bold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {t('Navigation.contact')}
          </h4>
          <ul className={`flex flex-col gap-2.5 text-xs ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-gold-champagne transition-colors duration-150">
                {t('Navigation.contact')}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/book`} className="text-gold-champagne hover:text-gold transition-colors duration-150 font-semibold">
                {t('Navigation.bookTrial')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Language & Local Switcher */}
        <div className="flex flex-col gap-4">
          <h4 className={`text-xs uppercase tracking-widest text-gold font-bold ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            Language Selector
          </h4>
          <div className="flex items-center gap-3">
            <Globe size={14} className="text-gold" />
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchLocale('en')}
                className={`text-xs transition-colors duration-150 py-1 px-2 rounded hover:bg-navy ${locale === 'en' ? 'text-gold-champagne font-bold' : 'text-parchment/50'
                  }`}
              >
                EN
              </button>
              <span className="text-gold-muted/30">|</span>
              <button
                onClick={() => switchLocale('fr')}
                className={`text-xs transition-colors duration-150 py-1 px-2 rounded hover:bg-navy ${locale === 'fr' ? 'text-gold-champagne font-bold' : 'text-parchment/50'
                  }`}
              >
                FR
              </button>
              <span className="text-gold-muted/30">|</span>
              <button
                onClick={() => switchLocale('ar')}
                className={`text-xs transition-colors duration-150 py-1 px-2 rounded hover:bg-navy font-cairo ${locale === 'ar' ? 'text-gold-champagne font-bold' : 'text-parchment/50'
                  }`}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gold-muted/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p className={isRtl ? 'font-cairo' : 'font-dm'}>
          {t('Footer.copyright', { year: currentYear })}
        </p>
        <div className={`flex items-center gap-6 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
          <Link href={`/${locale}/privacy`} className="hover:text-gold-champagne transition-colors duration-150">
            {t('Footer.privacy')}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-gold-champagne transition-colors duration-150">
            {t('Footer.terms')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
