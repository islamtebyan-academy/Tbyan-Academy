import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { createStaticClient } from '@/lib/supabase/server';
import PricingClient from '@/components/sections/PricingClient';

export const revalidate = 600;

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;

  // Set the locale for static rendering optimization
  setRequestLocale(locale);

  // Fetch content settings from Supabase
  const settings: Record<string, any> = {};

  try {
    const supabase = createStaticClient();
    const { data: dbSettings } = await supabase
      .from('settings')
      .select('*');

    if (dbSettings) {
      dbSettings.forEach((s) => {
        settings[s.key] = s.value;
      });
    }
  } catch (error) {
    console.error('Error loading pricing page settings from Supabase:', error);
  }

  return <PricingClient settings={settings} locale={locale} />;
}
