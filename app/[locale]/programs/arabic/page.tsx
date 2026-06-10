import { redirect } from 'next/navigation';

interface RedirectProps {
  params: Promise<{ locale: string }>;
}

export default async function ArabicRedirectPage({ params }: RedirectProps) {
  const { locale } = await params;
  redirect(`/${locale}/programs?track=arabic`);
}
