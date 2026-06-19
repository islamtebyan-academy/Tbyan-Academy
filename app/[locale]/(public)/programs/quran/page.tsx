import { redirect } from 'next/navigation';

interface RedirectProps {
  params: Promise<{ locale: string }>;
}

export default async function QuranRedirectPage({ params }: RedirectProps) {
  const { locale } = await params;
  redirect(`/${locale}/programs?track=quran`);
}
