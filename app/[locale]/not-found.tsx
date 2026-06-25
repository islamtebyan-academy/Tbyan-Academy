'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Compass, ArrowLeft, ArrowRight } from 'lucide-react';

export default function LocalNotFound() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const content = {
    ar: {
      title: '٤٠٤ — الصفحة غير موجودة',
      desc: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها لمكان آخر.',
      btn: 'العودة للرئيسية',
    },
    en: {
      title: '404 — Page Not Found',
      desc: 'Sorry, the page you are looking for does not exist or has been moved.',
      btn: 'Go Back Home',
    },
    fr: {
      title: '404 — Page Non Trouvée',
      desc: 'Désolé, la page que vous recherchez n\'existe pas ou a été déplacée.',
      btn: 'Retour à l\'accueil',
    }
  };

  const current = content[locale as keyof typeof content] || content.en;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-[#FDFAF3] text-midnight">
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.015] pointer-events-none" />
      
      <div className="relative z-10 max-w-md mx-auto space-y-8 flex flex-col items-center">
        {/* Animated Compass Icon */}
        <div className="p-5 bg-gold/10 border border-gold/20 rounded-full text-gold-hi animate-bounce duration-1000">
          <Compass size={48} className="stroke-[1.5]" />
        </div>

        <div className="space-y-3">
          <h1 className={`text-3xl md:text-4xl font-bold tracking-tight text-midnight ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-bold'}`}>
            {current.title}
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-hi to-transparent mx-auto my-4" />
          <p className={`text-stone/60 text-sm leading-relaxed max-w-sm mx-auto ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {current.desc}
          </p>
        </div>

        <Link
          href={`/${locale}`}
          className={`btn-gold px-8 py-3.5 rounded-full text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isRtl ? 'font-cairo' : 'font-dm'}`}
        >
          {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          <span>{current.btn}</span>
        </Link>
      </div>
    </div>
  );
}
