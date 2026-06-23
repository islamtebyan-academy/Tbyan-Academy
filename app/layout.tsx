import React from 'react';
import { Metadata } from 'next';
import { Cormorant_Garamond, Lora, Plus_Jakarta_Sans, Amiri, Noto_Naskh_Arabic, Cairo } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

// Load English/French fonts
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-cormorant-next',
  display: 'swap',
  preload: false,
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lora-next',
  display: 'swap',
  preload: false,
});

const plusJakartaUi = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans-next',
  display: 'swap',
  preload: false,
});

// Load Arabic fonts
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri-next',
  display: 'swap',
  preload: false,
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-arabic-next',
  display: 'swap',
  preload: false,
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  variable: '--font-cairo-next',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Islam Tebyan Academy',
  description: 'Quran & Arabic Classes',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const isRtl = locale === 'ar';
  const direction = isRtl ? 'rtl' : 'ltr';

  const fontClasses = isRtl
    ? `${amiri.variable} ${notoArabic.variable} ${cairo.variable}`
    : `${cormorantGaramond.variable} ${lora.variable} ${plusJakartaUi.variable}`;

  return (
    <html lang={locale} dir={direction} className={fontClasses}>
      <body className="bg-ivory text-ink min-h-screen flex flex-col justify-between selection:bg-gold/20 selection:text-gold-muted antialiased">
        {children}
      </body>
    </html>
  );
}

