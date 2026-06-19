import React from 'react';
import { setRequestLocale } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  return (
    <section className="bg-parchment-fade min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Star pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-start">
        <h1 className={`text-display text-midnight font-bold mb-10 text-center ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
          {isRtl ? 'شروط الخدمة والاستخدام' : 'Terms of Service'}
        </h1>

        <div className={`bg-ivory border border-gold-muted/15 rounded-lg p-8 sm:p-10 shadow-sm space-y-6 text-sm text-stone leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
          <p>
            {isRtl
              ? 'يرجى قراءة شروط الخدمة هذه بعناية قبل حجز أي حصة أو الاشتراك في العضويات الشهرية لأكاديمية إسلام تبيان.'
              : 'Please read these terms carefully before scheduling classes or subscribing to monthly memberships at Islam Tebyan Academy.'}
          </p>

          <h2 className={`text-heading font-bold text-midnight pt-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? '1. سياسة الإلغاء والتعويض' : '1. Cancellation & Makeup Policy'}
          </h2>
          <p>
            {isRtl
              ? 'يحق للطالب إلغاء الحصة أو إعادة جدولتها دون أي تكلفة إضافية، بشرط إخطار الإدارة أو المعلم قبل الموعد المقرر بـ 24 ساعة على الأقل. الحصص التي تلغى في أقل من 24 ساعة تحتسب كحصة مكتملة ولا تعوض.'
              : 'Students can reschedule or cancel any session free of charge up to 24 hours before the scheduled time. Cancellations made with less than 24 hours notice are considered completed and are not eligible for a makeup session.'}
          </p>

          <h2 className={`text-heading font-bold text-midnight pt-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? '2. إيقاف الاشتراكات والتعليق' : '2. Pausing Memberships'}
          </h2>
          <p>
            {isRtl
              ? 'يمكن للطلاب تعليق عضوياتهم الشهرية مؤقتاً في حالات السفر أو الإجازات لمدة تصل إلى 30 يوماً متواصلة. يتم حفظ جدول الحصص والمواعيد الخاصة بالطالب فور استئناف الاشتراك.'
              : 'Memberships can be paused for up to 30 days. During this period, your weekly time slots and assigned scholar will be reserved and lock-in for your return.'}
          </p>

          <h2 className={`text-heading font-bold text-midnight pt-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? '3. ضمان استرداد الأموال' : '3. Refund Guarantee'}
          </h2>
          <p>
            {isRtl
              ? 'نوفر ضمان استرداد الأموال بنسبة 100٪ لأي حصص متبقية غير مستخدمة في الاشتراك الشهري الحالي في حال رغبة الطالب في التوقف.'
              : 'We provide a 100% money-back guarantee for any unused, remaining sessions in your current billing cycle if you decide to pause or discontinue learning.'}
          </p>
        </div>
      </div>
    </section>
  );
}
