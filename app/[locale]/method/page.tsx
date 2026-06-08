import React from 'react';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { ShieldAlert, BookOpen, Star, Compass } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MethodPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  const pillars = [
    {
      icon: <BookOpen className="text-gold w-6 h-6" />,
      title: isRtl ? 'أصالة السند والتلقي' : 'Isnad-Rooted Transmission',
      desc: isRtl
        ? 'نلتزم بنظام الإسناد والتلقي الفردي الشفهي المباشر كما توارثته الأجيال. لا نعتمد على الفيديوهات المسجلة، بل يتلقى الطالب العلم سماعاً ومشافهة من عالم مجاز ومؤهل.'
        : 'We preserve the authentic system of oral transmission (Isnad). Knowledge is received directly from a qualified, certified scholar through live 1-on-1 dialogue, ensuring proper reception and correction.',
    },
    {
      icon: <ShieldAlert className="text-gold w-6 h-6" />,
      title: isRtl ? 'التدقيق الصارم والمقابلة' : 'Rigorous Faculty Selection',
      desc: isRtl
        ? 'نقبل أقل من 5% من المعلمين المتقدمين. يمر كل مرشح بمقابلة علمية دقيقة واختبارات لأحكام التجويد واللغة، واختبار كفاءة للتواصل بالإنجليزية أو الفرنسية لغير العرب.'
        : 'We enforce strict vetting. Fewer than 5% of applying teachers are accepted. Every candidate undergoes rigorous recitation checks, academic exams, and mock teaching trials in English or French.',
    },
    {
      icon: <Compass className="text-gold w-6 h-6" />,
      title: isRtl ? 'البرنامج الدراسي المخصص' : 'Bespoke Curriculums',
      desc: isRtl
        ? 'كل طالب لديه مساره الخاص. بعد الحصة التجريبية وتقييم المستوى، يبني المعلم بالتعاون مع المنسق خطة دراسية تتناسب مع وقت الطالب وسرعة استيعابه وأهدافه الشخصية.'
        : 'Every student travels on a personalized track. Following the initial trial session, the scholar and coordinator craft a curriculum that matches the student\'s age, background, and speed.',
    },
  ];

  return (
    <section className="bg-parchment-fade min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Star pattern watermark */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-start">
        {/* Header */}
        <div className="text-center mb-20">
          <span className={`inline-block text-xs uppercase tracking-widest text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'المنهجية التعليمية' : 'OUR PEDAGOGY'}
          </span>
          <h1 className={`text-display text-midnight font-bold mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? 'كيف نعمل: منهج تبيان الأكاديمي' : 'The Tebyan Method'}
          </h1>
          <p className={`text-sm text-stone max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'مزاوجة بين الرصانة العلمية العريقة للتعليم التقليدي وأحدث أدوات التواصل التفاعلي الرقمي لتقديم تجربة تعليمية متميزة.'
              : 'Synthesizing traditional Islamic scholarship with modern virtual learning tools to deliver structured, high-contrast education.'}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((p, i) => (
            <div key={i} className="bg-ivory border border-gold-muted/15 rounded-lg p-8 shadow-sm hover:border-gold/30 transition-all duration-300">
              <div className="w-12 h-12 bg-parchment rounded-full flex items-center justify-center border border-gold-muted/20 mb-6">
                {p.icon}
              </div>
              <h2 className={`text-heading font-bold text-midnight mb-3 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
                {p.title}
              </h2>
              <p className={`text-xs text-stone leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quality Section */}
        <div className="bg-navy-deep text-parchment border border-gold/20 rounded-lg p-10 mt-16 text-center shadow-xl">
          <h3 className={`text-heading font-bold text-gold-champagne mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? 'تتبع التقدم وتقارير الأداء' : 'Continuous Quality Assurance'}
          </h3>
          <p className={`text-xs text-parchment/65 leading-relaxed max-w-2xl mx-auto mb-8 ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'لا نترك شيئاً للصدفة. يكتب المعلم تقريراً مختصراً عقب كل حصة، ونوفر تقارير شهرية شاملة توضح المحتوى المنجز ومستوى التلاوة والحفظ، وملاحظات المعلم للتطوير.'
              : 'Every session is tracked. Scholars log key progress notes after every class, and our coordinators compile comprehensive monthly reports detailing lessons covered, Tajweed progress, and custom focus points.'}
          </p>
          <Link
            href={`/${locale}/book`}
            className="btn-gold px-8 py-3.5 rounded text-xs uppercase tracking-wider font-semibold inline-block"
          >
            {isRtl ? 'احجز حصة تجريبية مجانية' : 'Book a Trial Session'}
          </Link>
        </div>
      </div>
    </section>
  );
}
