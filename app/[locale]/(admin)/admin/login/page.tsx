'use client';

import React, { useActionState, useState } from 'react';
import { useLocale } from 'next-intl';
import { Shield, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { login } from '@/app/actions/auth';

export default function LoginPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [state, formAction, isPending] = useActionState(login, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#FAF8F5] via-[#FAF6EC] to-[#F3EDE0] text-slate-800 flex flex-col items-center justify-center p-6 relative overflow-hidden font-ui">
      {/* Global CSS style block to override default browser autofill background & text colors for light theme */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
          -webkit-text-fill-color: #0f172a !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* Decorative luxury backgrounds (glowing gold points & geometric star watermark) */}
      <div className="absolute top-1/4 left-1/4 w-[280px] h-[280px] bg-gold/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-gold/5 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Islamic geometric pattern backdrop */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-repeat bg-[size:40px_40px] opacity-[0.015] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6 animate-fade-in">
        {/* Luxury Gold Academy Logo */}
        <div className="text-center space-y-3">
          <div className="relative inline-flex items-center justify-center mb-1">
            {/* Concentric gold luxury rings */}
            <div className="absolute inset-0 rounded-full border border-gold/25 animate-spin animate-duration-10000" />
            <div className="absolute -inset-1 rounded-full border border-dashed border-gold/15" />
            <div className="w-16 h-16 rounded-full bg-white border border-gold/30 flex items-center justify-center text-gold shadow-md relative z-10">
              <Shield size={28} className="text-gold-hi animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-1">
            {/* Elegant Calligraphic-style Logo text */}
            <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#182335] via-[#2f425f] to-gold-hi font-primary">
              {isRtl ? 'التِّبْيَان' : 'TEBYAN'}
            </h1>
            <p className="text-[10px] text-gold-hi font-bold uppercase tracking-[0.2em]">
              {isRtl ? 'أكاديمية إسلام تبيان للعلوم الشرعية والقرآن' : 'Islam Tebyan Academy CMS'}
            </p>
          </div>
        </div>

        {/* High-Contrast Light Editorial Card */}
        <div className="bg-white border border-gold/25 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(139,115,85,0.06)] relative overflow-hidden">
          {/* Top Gold Shimmer Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold-muted/10 via-gold to-gold-muted/10 opacity-80" />

          {/* Heading context */}
          <div className="text-center pb-6 border-b border-gold/15 mb-6">
            <h2 className="text-sm font-bold text-[#182335] uppercase tracking-wider flex items-center justify-center gap-1.5 font-primary">
              <Sparkles size={12} className="text-gold-hi animate-pulse" />
              <span>{isRtl ? 'تسجيل دخول المشرفين' : 'Authorized Access'}</span>
            </h2>
            <p className="text-[9px] text-stone/50 mt-1">
              {isRtl ? 'يرجى إدخال البريد الإلكتروني للمشرف وكلمة المرور' : 'Provide administrative credentials below'}
            </p>
          </div>

          <form action={formAction} className="space-y-5 text-start">
            <input type="hidden" name="locale" value={locale} />

            {/* Error Message Alert Box */}
            {state?.error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs flex items-start gap-2.5 animate-fade-in font-ui">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span className="font-semibold leading-normal">{state.error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[9px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                {isRtl ? 'البريد الإلكتروني' : 'Admin Email'}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-gold-hi/70`}>
                  <Mail size={15} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="username@islamtebyan.com"
                  className={`w-full bg-[#FAF8F5]/60 border border-gold-hi/25 text-midnight py-3.5 ${
                    isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'
                  } rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 placeholder:text-stone/30`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-[9px] font-bold uppercase tracking-widest text-stone/60 font-ui">
                  {isRtl ? 'كلمة المرور للمسؤول' : 'Portal Password'}
                </label>
              </div>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-gold-hi/70`}>
                  <Lock size={15} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className={`w-full bg-[#FAF8F5]/60 border border-gold-hi/25 text-midnight py-3.5 ${
                    isRtl ? 'pr-11 pl-11' : 'pl-11 pr-11'
                  } rounded-xl text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 placeholder:text-stone/30`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  title={showPassword ? (isRtl ? 'إخفاء كلمة المرور' : 'Hide Password') : (isRtl ? 'إظهار كلمة المرور' : 'Show Password')}
                  className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center text-stone/40 hover:text-gold transition-colors cursor-pointer`}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gold hover:bg-gold-hi text-midnight font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-gold/10 disabled:opacity-50 disabled:cursor-not-allowed font-ui"
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>{isRtl ? 'جاري التحقق...' : 'Verifying...'}</span>
                </>
              ) : (
                <span>{isRtl ? 'دخول لوحة التحكم' : 'Sign In'}</span>
              )}
            </button>
          </form>
        </div>

        {/* Security / Logging Warning Footer */}
        <p className="text-[9px] text-stone/50 text-center leading-relaxed">
          {isRtl 
            ? 'تنبيه أمني: هذه البوابة مخصصة للمشرفين المعتمدين بـ تبيان فقط. يتم تسجيل وحظر محاولات الاختراق تلقائياً.' 
            : 'Security Notice: This portal is strictly restricted to certified Tebyan administrators. Unauthorized entry attempts are audited.'}
        </p>
      </div>
    </div>
  );
}
