import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloating from '@/components/ui/WhatsAppFloating';
import { createClient } from '@/lib/supabase/server';

interface PublicLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function PublicLayout({ children, params }: PublicLayoutProps) {
  const { locale } = await params;
  let footerVerse = undefined;

  try {
    const supabase = await createClient();
    const { data: setting } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'footer_verse')
      .single();

    if (setting && setting.value) {
      footerVerse = setting.value[locale] || setting.value['en'] || undefined;
    }
  } catch (e) {
    console.error('Failed to load footer verse from settings:', e);
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer verseOverride={footerVerse} />
      <WhatsAppFloating />
    </>
  );
}
