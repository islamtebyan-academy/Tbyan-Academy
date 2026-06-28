import React from 'react';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Cormorant_Garamond, Lora, Plus_Jakarta_Sans, Amiri, Noto_Naskh_Arabic, Cairo } from 'next/font/google';
import { locales } from '@/i18n';
import Script from 'next/script';
import '../globals.css';

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' 
      ? 'أكاديمية إسلام تبيان — دروس مباشرة 1-على-1 في القرآن والعربية'
      : 'Islam Tebyan Academy — Live Quran & Arabic Classes',
    description: locale === 'ar'
      ? 'دروس مباشرة 1-على-1 في القرآن الكريم واللغة العربية والعلوم الشرعية مع نخبة من العلماء المعتمدين.'
      : 'Premium 1-on-1 Quran, Arabic & Islamic Studies. Live Zoom with certified scholars. Arabic, English & French.',
    icons: {
      icon: '/app-icon.webp',
      apple: '/app-icon.webp',
    },
    verification: {
      google: 'gROGakA0rcHUKX5mkUS6r9quBcKzf-iV-ColnrKnB8s',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Set the locale for static rendering optimization
  setRequestLocale(locale);

  // Fetch messages for next-intl provider
  const messages = await getMessages();

  const isRtl = locale === 'ar';
  const direction = isRtl ? 'rtl' : 'ltr';

  const fontClasses = isRtl
    ? `${amiri.variable} ${notoArabic.variable} ${cairo.variable}`
    : `${cormorantGaramond.variable} ${lora.variable} ${plusJakartaUi.variable}`;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={locale} dir={direction} className={fontClasses}>
      <body className="bg-ivory text-ink min-h-screen flex flex-col justify-between selection:bg-gold/20 selection:text-gold-muted antialiased">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


