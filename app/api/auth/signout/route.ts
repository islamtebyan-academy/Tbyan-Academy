import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // Check active session
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase.auth.signOut();
  }

  // Determine redirect url (fallback to English locale)
  const url = new URL(request.url);
  return NextResponse.redirect(new URL(`/en/portal/login`, url.origin), {
    status: 302,
  });
}
