import React from 'react';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';

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

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

