import React from 'react';
import { useLocale } from 'next-intl';

interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon';
  className?: string;
  light?: boolean;
}

export default function Logo({ variant = 'horizontal', className = '', light = false }: LogoProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  if (variant === 'icon') {
    return (
      <div
        className={`relative overflow-hidden rounded-lg border border-gold-muted/20 shadow-sm flex items-center justify-center shrink-0 w-10 h-10 ${className}`}
      >
        <img
          src="/logo-new.webp"
          alt="Islam Tebyan Icon"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center justify-center text-center gap-2 ${className}`}>
        {/* Icon portion - clean rendering without border container */}
        <img 
          src="/logo-new.webp" 
          alt="Islam Tebyan Academy" 
          className="h-16 w-auto object-contain rendering-crisp" 
        />
        {/* Text portion */}
        {isRtl ? (
          <div className="flex flex-col items-center justify-center">
            <span className={`font-cairo text-base font-bold ${light ? 'text-parchment' : 'text-navy-brand'} leading-none`}>
              إسلام تبيان
            </span>
            <span className="font-cairo text-[9px] tracking-[0.2em] text-gold font-bold uppercase leading-none mt-1">
              أكاديمية
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className={`font-dm text-sm font-extrabold ${light ? 'text-parchment' : 'text-navy-brand'} tracking-wider uppercase leading-none`}>
              Islam Tebyan
            </span>
            <span className="font-dm text-[8px] tracking-[0.25em] text-gold font-bold uppercase leading-none mt-1">
              {locale === 'fr' ? 'Académie' : 'Academy'}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default to horizontal variant
  const hasHeight = className.split(' ').some(cls => cls.startsWith('h-') || cls.startsWith('max-h-'));
  const heightClass = hasHeight ? '' : 'h-10 md:h-12';

  return (
    <div className={`flex items-center gap-3 ${heightClass} ${className}`}>
      {/* Icon portion - clean rendering without border container */}
      <img 
        src="/logo-new.webp" 
        alt="Islam Tebyan Academy" 
        className="h-full w-auto object-contain rendering-crisp" 
      />
      {/* Text portion */}
      {isRtl ? (
        <div className="flex flex-col text-start justify-center">
          <span className={`font-cairo text-sm md:text-base font-bold ${light ? 'text-parchment' : 'text-navy-brand'} leading-none`}>
            إسلام تبيان
          </span>
          <span className="font-cairo text-[8px] md:text-[9px] tracking-[0.15em] text-gold font-bold uppercase leading-none mt-0.5">
            أكاديمية
          </span>
        </div>
      ) : (
        <div className="flex flex-col text-start justify-center">
          <span className={`font-dm text-xs md:text-sm font-extrabold ${light ? 'text-parchment' : 'text-navy-brand'} tracking-wider uppercase leading-none`}>
            Islam Tebyan
          </span>
          <span className="font-dm text-[8px] md:text-[9px] tracking-[0.2em] text-gold font-bold uppercase leading-none mt-1">
            {locale === 'fr' ? 'Académie' : 'Academy'}
          </span>
        </div>
      )}
    </div>
  );
}
