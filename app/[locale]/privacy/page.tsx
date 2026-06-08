import React from 'react';
import { setRequestLocale } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  return (
    <section className="bg-parchment-fade min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Star pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-start">
        <h1 className={`text-display text-midnight font-bold mb-10 text-center ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
          {isRtl ? 'سياسة الخصوصية وسرية البيانات' : 'Privacy Policy'}
        </h1>

        <div className={`bg-ivory border border-gold-muted/15 rounded-lg p-8 sm:p-10 shadow-sm space-y-6 text-sm text-stone leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
          <p>
            {isRtl
              ? 'تلتزم أكاديمية إسلام تبيان بحماية خصوصية بياناتك الشخصية وهويتك الرقمية بالكامل. نوضح هنا كيفية جمع البيانات واستخدامها وحفظها بأمان.'
              : 'At Islam Tebyan Academy, we are committed to safeguarding your private data. This policy outlines how we collect, store, and secure your personal and academic information.'}
          </p>
          
          <h2 className={`text-heading font-bold text-midnight pt-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? '1. البيانات التي نجمعها' : '1. Information We Collect'}
          </h2>
          <p>
            {isRtl
              ? 'نقوم بجمع البيانات اللازمة لجدولة الحصص مثل الاسم والبريد الإلكتروني والمنطقة الزمنية والتفضيلات الدراسية للطالب.'
              : 'We collect coordinates necessary to schedule your lessons, including name, email, time zone, preferred gender of the tutor, and learning goals.'}
          </p>

          <h2 className={`text-heading font-bold text-midnight pt-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? '2. سرية الدروس والتسجيلات' : '2. Session Privacy & Recording'}
          </h2>
          <p>
            {isRtl
              ? 'جميع الحصص الخاصة تجري عبر قنوات زووم مشفرة وآمنة. لا نقوم بتسجيل أي جلسة دراسية دون موافقة كتابية صريحة ومسبقة من الطالب أو ولي الأمر لأغراض المراجعة.'
              : 'All private classes are conducted over secure, encrypted Zoom lines. We do not record any academic sessions without the explicit, written consent of the student or parent for review purposes.'}
          </p>
        </div>
      </div>
    </section>
  );
}
