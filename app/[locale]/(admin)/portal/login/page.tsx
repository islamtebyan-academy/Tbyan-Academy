'use client';

import React, { useActionState, useState } from 'react';
import { useLocale } from 'next-intl';
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { login } from '@/app/actions/auth';

export default function LoginPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [state, formAction, isPending] = useActionState(login, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCFAF5] via-[#FAF6EC] to-[#F1E8D2] text-[#0d1624] flex flex-col items-center justify-center p-6 relative overflow-hidden font-ui">
      {/* Global CSS style block to override default browser autofill background & text colors for light theme */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #fcfaf7 inset !important;
          -webkit-text-fill-color: #0d1624 !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* Double manuscript-like border outlining the viewport (luxurious framing) */}
      <div className="absolute inset-4 pointer-events-none border-double border-[6px] border-[#D4A843]/20 rounded-2xl z-0" />
      <div className="absolute inset-6 pointer-events-none border border-[#B8841A]/10 rounded-xl z-0" />

      {/* Decorative luxury backgrounds (glowing gold points & geometric star watermark) */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_center,rgba(253,250,243,0.95),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_55%)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(24,35,53,0.05),transparent_55%)] rounded-full blur-3xl pointer-events-none" />
      
      {/* Islamic geometric pattern backdrop */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-repeat bg-[size:50px_50px] opacity-[0.022] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6 animate-fade-in flex flex-col items-center">
        {/* Luxury Academy Logo & Big Title */}
        <div className="text-center space-y-4 w-full">
          <div className="relative inline-flex items-center justify-center">
            {/* Circular double-ring frame for the logo */}
            <div className="absolute inset-[-8px] border border-[#D4A843]/30 rounded-full animate-pulse" />
            <div className="absolute inset-[-14px] border border-[#B8841A]/10 rounded-full" />
            <div className="absolute inset-0 bg-[#B8841A]/5 rounded-full blur-md" />
            <img 
              src="/logo-new.webp" 
              alt="Islam Tebyan Academy Logo" 
              className="h-20 md:h-24 w-auto object-contain relative z-10 filter drop-shadow-[0_8px_20px_rgba(139,115,85,0.16)] hover:scale-105 transition-all duration-500 select-none" 
            />
          </div>
          
          <div className="space-y-1">
            {/* Prominent main title (no redundant Tebyan text) */}
            <h1 className="text-xl md:text-2xl font-extrabold text-[#182335] font-primary px-4 leading-normal select-none">
              {isRtl ? 'أكاديمية إسلام تبيان للعلوم الشرعية والقرآن' : 'Islam Tebyan Academy'}
            </h1>
            <p className="text-[10px] md:text-xs text-[#8C6D27] font-bold uppercase tracking-[0.25em] select-none font-ui">
              {isRtl ? 'بوابة الإشراف والمحتوى الدراسي' : 'Portal & Study Content Gateway'}
            </p>
          </div>

          {/* Premium Vector Gold Separator Ornament */}
          <div className="py-2 flex items-center justify-center gap-3 opacity-60">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#B8841A]" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#B8841A]">
              <path d="M12 2L15 9H9L12 2Z" fill="currentColor"/>
              <path d="M12 22L9 15H15L12 22Z" fill="currentColor"/>
              <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
            </svg>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#B8841A]" />
          </div>
        </div>

        {/* High-Contrast Light Editorial Card */}
        <div className="bg-white/85 backdrop-blur-md border border-[#E2D2B5] rounded-[2.5rem] p-8 md:p-10 shadow-[0_45px_100px_-20px_rgba(139,115,85,0.18)] relative overflow-hidden w-full">
          {/* Inner Golden border lines inside the card */}
          <div className="absolute inset-3 border border-[#E5DCC6] rounded-[2rem] pointer-events-none z-0" />
          <div className="absolute inset-4 border border-[#B8841A]/10 rounded-[1.8rem] pointer-events-none z-0" />

          {/* Top Gold Shimmer Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#7A5C12]/20 via-[#B8841A] to-[#D4A843]/20 opacity-80 z-10" />

          {/* Heading context */}
          <div className="text-center pb-5 border-b border-[#E5DCC6] mb-6 relative z-10">
            <h2 className="text-sm md:text-base font-bold text-[#182335] uppercase tracking-wider flex items-center justify-center gap-1.5 font-primary">
              <Sparkles size={14} className="text-[#B8841A] animate-pulse" />
              <span>{isRtl ? 'تسجيل دخول المشرفين' : 'Authorized Access'}</span>
            </h2>
            <p className="text-[10px] text-[#8C7A68] mt-1.5 font-ui">
              {isRtl ? 'يرجى إدخال البريد الإلكتروني للمشرف وكلمة المرور' : 'Provide administrative credentials below'}
            </p>
          </div>

          <form action={formAction} className="space-y-5 text-start relative z-10">
            <input type="hidden" name="locale" value={locale} />

            {/* Error Message Alert Box */}
            {state?.error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs flex items-start gap-2.5 animate-fade-in font-ui">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span className="font-semibold leading-normal">{state.error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-[#8C7A68] font-ui">
                {isRtl ? 'البريد الإلكتروني للمشرف' : 'Admin Email'}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-[#B8841A]`}>
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="username@islamtebyan.com"
                  className={`w-full bg-[#FCFAF7] border border-[#D9CDAD] text-[#0d1624] py-4 ${
                    isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'
                  } rounded-xl text-sm focus:outline-none focus:border-[#B8841A] focus:ring-1 focus:ring-[#B8841A]/35 focus:shadow-[0_0_12px_rgba(212,175,55,0.15)] transition-all duration-300 placeholder:text-stone/30 font-ui`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest text-[#8C7A68] font-ui">
                  {isRtl ? 'كلمة المرور للمسؤول' : 'Portal Password'}
                </label>
              </div>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-[#B8841A]`}>
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className={`w-full bg-[#FCFAF7] border border-[#D9CDAD] text-[#0d1624] py-4 ${
                    isRtl ? 'pr-12 pl-12' : 'pl-12 pr-12'
                  } rounded-xl text-sm focus:outline-none focus:border-[#B8841A] focus:ring-1 focus:ring-[#B8841A]/35 focus:shadow-[0_0_12px_rgba(212,175,55,0.15)] transition-all duration-300 placeholder:text-stone/30 font-ui`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  title={showPassword ? (isRtl ? 'إخفاء كلمة المرور' : 'Hide Password') : (isRtl ? 'إظهار كلمة المرور' : 'Show Password')}
                  className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center text-[#8C7A68]/60 hover:text-[#B8841A] transition-colors cursor-pointer`}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-[#8C6D27] via-[#B8841A] to-[#D4A843] hover:from-[#7A5C12] hover:via-[#A87413] hover:to-[#C69833] text-white font-bold py-4 px-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#B8841A]/15 hover:shadow-[0_8px_25px_rgba(184,132,26,0.3)] disabled:opacity-50 disabled:cursor-not-allowed font-ui border border-[#D4A843]/20 relative z-10"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{isRtl ? 'جاري التحقق والمصادقة...' : 'Verifying Credentials...'}</span>
                </>
              ) : (
                <span>{isRtl ? 'دخول لوحة التحكم' : 'Sign In'}</span>
              )}
            </button>
          </form>
        </div>

        {/* Security / Logging Warning Footer */}
        <p className="text-[10px] text-[#8C7A68] text-center leading-relaxed max-w-sm">
          {isRtl 
            ? 'تنبيه أمني: هذه البوابة مخصصة للمشرفين المعتمدين بـ تبيان فقط. يتم تسجيل وحظر محاولات الاختراق تلقائياً.' 
            : 'Security Notice: This portal is strictly restricted to certified Tebyan administrators. Unauthorized entry attempts are audited.'}
        </p>
      </div>
    </div>
  );
}
