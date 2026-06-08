import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  const faqs = [
    {
      q: isRtl ? 'كيف تجري الحصص الخاصة وما هي الأدوات المطلوبة؟' : 'How do the private classes work and what tools do I need?',
      a: isRtl
        ? 'تجري جميع الدروس في بث حي مباشر 1-على-1 عبر برنامج Zoom. تحتاج فقط لجهاز كمبيوتر أو جهاز لوحي (تابلت)، واتصال جيد بالإنترنت وسماعة رأس مع ميكروفون لسهولة الاستماع والتلقي.'
        : 'All sessions are conducted live 1-on-1 on Zoom. You only need a computer or tablet, a stable internet connection, and a headset with a microphone to communicate clearly with your scholar.',
    },
    {
      q: isRtl ? 'هل يمكنني اختيار جنس المعلم المفضل؟' : 'Can I select my preferred teacher gender?',
      a: isRtl
        ? 'نعم، بكل تأكيد. يمكنك تحديد تفضيلك لمعلم (رجل) أو معلمة (امرأة) أثناء تعبئة استمارة حجز الحصة التجريبية، وسيقوم المنسق بتعيين المعلم المناسب لتفضيلك تماماً.'
        : 'Yes, absolutely. You can specify whether you prefer a male or female scholar when filling out the free trial booking form, and our coordinators will match you accordingly.',
    },
    {
      q: isRtl ? 'ما هي سياسة الإلغاء وجدولة الحصص التعويضية؟' : 'What is your cancellation and makeup class policy?',
      a: isRtl
        ? 'تتميز الأكاديمية بالمرونة الكاملة. يمكنك إلغاء أي حصة أو إعادة جدولتها مجاناً دون أي رسوم، شريطة إخطار المنسق أو المعلم قبل موعد الحصة بـ 24 ساعة على الأقل.'
        : 'We offer full flexibility. You can cancel or reschedule any session with no fees, provided you notify your coordinator or teacher at least 24 hours in advance of the scheduled class time.',
    },
    {
      q: isRtl ? 'هل يمكنني إيقاف اشتراكي مؤقتاً أثناء الإجازات؟' : 'Can I pause my subscription during vacations?',
      a: isRtl
        ? 'نعم، يتيح نظامنا إيقاف الاشتراك مؤقتاً لمدة تصل إلى 30 يوماً متواصلة خلال العام الدراسي دون خسارة مواعيدك المفضلة أو المعلم المعين لك.'
        : 'Yes, you can pause your monthly membership for up to 30 days during vacations or busy periods. Your slots and assigned teacher will be reserved for you.',
    },
  ];

  return (
    <section className="bg-parchment-fade min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Star pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-start">
        {/* Title */}
        <div className="text-center mb-16">
          <span className={`inline-block text-xs uppercase tracking-widest text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'الأسئلة الشائعة' : 'COMMON QUESTIONS'}
          </span>
          <h1 className={`text-display text-midnight font-bold mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? 'الأسئلة الشائعة والإجابات' : 'Frequently Asked Questions'}
          </h1>
        </div>

        {/* Q&A List */}
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-ivory border border-gold-muted/15 rounded-lg p-8 shadow-sm">
              <h2 className={`text-base font-bold text-midnight mb-3 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
                {faq.q}
              </h2>
              <p className={`text-xs text-stone leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-navy-deep text-parchment border border-gold/20 rounded-lg p-10 mt-16 text-center shadow-xl">
          <h3 className={`text-heading font-bold text-gold-champagne mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? 'هل لديك أسئلة أخرى لم نجب عليها؟' : 'Still have questions?'}
          </h3>
          <p className={`text-xs text-parchment/65 leading-relaxed max-w-lg mx-auto mb-8 ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'فريق التنسيق الأكاديمي لدينا جاهز للرد على جميع استفساراتك ومساعدتك في اختيار الخطة المناسبة.'
              : 'Our academic coordinators are here to assist you. Contact us directly or book your free assessment session.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-3.5 rounded text-xs uppercase tracking-wider font-semibold border border-parchment/20 text-parchment hover:border-gold-champagne hover:bg-navy-sapphire/20 transition-all text-center"
            >
              {isRtl ? 'اتصل بنا مباشرة' : 'Contact Support'}
            </Link>
            <Link
              href={`/${locale}/book`}
              className="btn-gold px-8 py-3.5 rounded text-xs uppercase tracking-wider font-semibold text-center"
            >
              {isRtl ? 'احجز حصة تجريبية مجانية' : 'Book Free Trial'}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
