'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Logo from '../brand/Logo';
import { Globe } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  const isRtl = locale === 'ar';

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = newLocale;
      const newPath = segments.join('/');
      router.push(newPath);
    } else {
      router.push(`/${newLocale}`);
    }
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
