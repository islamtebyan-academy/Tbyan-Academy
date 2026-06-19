'use client';

import React, { useActionState } from 'react';
import { useLocale } from 'next-intl';
import { Shield, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { login } from '@/app/actions/auth';

export default function LoginPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen bg-[#060a0f] text-slate-100 flex flex-col items-center justify-center p-6 relative">
      {/* Background glowing highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-[url('/images/pattern-8star.svg')] bg-contain opacity-[0.02] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 items-center justify-center text-gold mb-2 shadow-inner">
            <Shield size={32} className="text-gold" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-cormorant">
            {isRtl ? 'بوابة الإشراف والأكاديمية' : 'Scholarly CMS Portal'}
          </h1>
          <p className="text-xs text-gold uppercase tracking-widest font-bold font-dm">
            {isRtl ? 'أكاديمية إسلام تبيان' : 'Islam Tebyan Academy'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#091017] border border-gold-muted/15 rounded-3xl p-8 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Shimmer top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-muted/10 via-gold-hi/50 to-gold-muted/10" />

          <form action={formAction} className="space-y-6 text-start">
            <input type="hidden" name="locale" value={locale} />

            {/* Error Message */}
            {state?.error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-3">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span className="font-semibold leading-normal">{state.error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {isRtl ? 'البريد الإلكتروني للمسؤول' : 'Administrator Email'}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-500`}>
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@islamtebyan.com"
                  className={`w-full bg-[#05080c] border border-white/[0.08] text-white py-3.5 ${
                    isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'
                  } rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 placeholder:text-slate-600`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {isRtl ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-500`}>
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className={`w-full bg-[#05080c] border border-white/[0.08] text-white py-3.5 ${
                    isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'
                  } rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 placeholder:text-slate-600`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gold hover:bg-gold-hi text-midnight font-bold py-3.5 px-4 rounded-xl text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/10"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{isRtl ? 'جاري التحقق...' : 'Verifying...'}</span>
                </>
              ) : (
                <span>{isRtl ? 'دخول لوحة الإشراف' : 'Sign In to Portal'}</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-slate-500 text-center font-semibold">
          {isRtl 
            ? 'هذه البوابة مخصصة للمشرفين المعتمدين فقط. يتم تسجيل كافة محاولات الدخول.' 
            : 'Authorized access only. All authentication attempts are logged.'}
        </p>
      </div>
    </div>
  );
}
