'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Logo from '../brand/Logo';
import { Globe } from 'lucide-react';

export default function Footer({ verseOverride }: { verseOverride?: string }) {
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
            {verseOverride || t('Footer.verse')}
          </p>
          
          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61590678633766"
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
              href="https://www.youtube.com/@TebianIslam"
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
              href="https://www.instagram.com/islamtebyan/"
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
              href="https://www.tiktok.com/@isalm_tebyan/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gold-muted/30 bg-white/5 flex items-center justify-center text-parchment/60 hover:text-gold hover:border-gold hover:bg-white/10 transition-all duration-300"
              aria-label="TikTok"
              title="TikTok"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .8.11V9.4a6.27 6.27 0 0 0-3.11.84 6.35 6.35 0 0 0-3.3 5.3 6.35 6.35 0 0 0 10.79 4.9 6.3 6.3 0 0 0 1.96-4.51V8.58a10.81 10.81 0 0 0 6.33 2.01V7.18a7.81 7.81 0 0 1-4.61-2.5z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/201019281416"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gold-muted/30 bg-white/5 flex items-center justify-center text-parchment/60 hover:text-gold hover:border-gold hover:bg-white/10 transition-all duration-300"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 2C6.479 2 2 6.478 2 12.029c0 1.91.536 3.693 1.463 5.23L2 22l4.908-1.428c1.464.843 3.142 1.328 4.937 1.328 5.551 0 10.03-4.478 10.03-10.029C22.062 6.478 17.582 2 12.03 2zm6.604 14.148c-.273.766-1.584 1.393-2.185 1.463-.547.062-1.258.093-2.032-.156-.475-.152-1.077-.384-1.848-.718-3.238-1.4-5.323-4.66-5.485-4.878-.162-.218-1.309-1.745-1.309-3.328 0-1.584.829-2.361 1.127-2.673.3-.312.656-.39.875-.39.219 0 .438.001.625.01.2.01.469-.077.734.56.28.673.969 2.373 1.053 2.54.084.167.141.362.031.583-.11.22-.162.36-.328.553-.167.193-.35.43-.5.58-.168.167-.343.349-.147.684.197.336.877 1.444 1.879 2.336 1.292 1.152 2.378 1.509 2.715 1.677.337.168.536.14.734-.093.2-.234.86-.998 1.09-1.342.23-.343.46-.28.77-.168.312.112 1.977.93 2.321 1.099.343.169.57.252.654.394.084.14.084.812-.19 1.578z"/>
              </svg>
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
            <li className="mt-2 border-t border-gold-muted/10 pt-2 flex flex-col gap-1.5 text-parchment/50">
              <a href="tel:+201019281416" className="hover:text-gold-champagne transition-colors duration-150 font-dm">
                +20 101 928 1416
              </a>
              <a href="mailto:islamtebyan@gmail.com" className="hover:text-gold-champagne transition-colors duration-150 font-dm break-all">
                support@islamtebyan.com
              </a>
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
