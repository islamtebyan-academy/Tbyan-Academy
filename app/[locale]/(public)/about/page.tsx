import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import AboutClient from '@/components/sections/AboutClient';
import { createClient } from '@/lib/supabase/server';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  // Set the locale for static rendering optimization
  setRequestLocale(locale);

  // Fetch content settings from Supabase
  const settings: Record<string, any> = {};

  try {
    const supabase = await createClient();
    const { data: dbSettings } = await supabase
      .from('settings')
      .select('*');

    if (dbSettings) {
      dbSettings.forEach((s) => {
        settings[s.key] = s.value;
      });
    }
  } catch (error) {
    console.error('Error loading about page settings from Supabase:', error);
  }

  return <AboutClient settings={settings} locale={locale} />;
}
