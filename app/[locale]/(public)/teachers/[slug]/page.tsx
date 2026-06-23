import React from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import TeacherProfileClient from '@/components/sections/TeacherProfileClient';

interface TeacherProfileProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const slugs = ['ahmed-yahya-zakaria', 'mohamed-badr', 'hamada-attia-nady'];
  const locales = ['en', 'fr', 'ar'];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export default async function TeacherDetailPage({ params }: TeacherProfileProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const slugs = ['ahmed-yahya-zakaria', 'mohamed-badr', 'hamada-attia-nady'];
  if (!slugs.includes(slug)) {
    notFound();
  }

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
    console.error('Error loading teacher details from Supabase settings:', error);
  }

  return (
    <TeacherProfileClient 
      settings={settings} 
      locale={locale} 
      slug={slug} 
    />
  );
}
