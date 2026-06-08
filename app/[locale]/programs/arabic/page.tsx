import React from 'react';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

interface ProgramDetailProps {
  params: Promise<{ locale: string }>;
}

export default async function ArabicPage({ params }: ProgramDetailProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  const levels = [
    {
      num: '01',
      name: isRtl ? 'المستوى الأول: التأسيس والقراءة' : 'Level 1: Arabic Foundation & Reading',
      desc: isRtl
        ? 'للمبتدئين تماماً. دراسة الحروف، الحركات، مهارات القراءة بطلاقة، والكتابة الإملائية السليمة.'
        : 'For absolute beginners. Focuses on the Arabic alphabet, phonetic signs (Harakat), spelling, and vocabulary acquisition.',
    },
    {
      num: '02',
      name: isRtl ? 'المستوى الثاني: قواعد النحو والصرف' : 'Level 2: Grammar & Morphology (Nahw & Sarf)',
      desc: isRtl
        ? 'دراسة قواعد تركيب الكلمات وبناء الجمل (علم النحو) وقواعد بنية الكلمة المفردة وتصريفها (علم الصرف).'
        : 'Build sentences accurately. Master grammatical rules (Nahw) and word structures/conjugations (Sarf) using classical texts.',
    },
    {
      num: '03',
      name: isRtl ? 'المستوى الثالث: البلاغة والأدب العربي' : 'Level 3: Eloquence & Literature (Balaghah)',
      desc: isRtl
        ? 'تذوق بلاغة القرآن الكريم وإعجازه البياني، ودراسة المعاني والبيان والبديع، وتحليل قصائد الشعر العربي الكلاسيكي.'
        : 'Appreciate literary eloquence. Explore core fields of Balaghah (Bayan, Ma\'ani, Badi\') and analyze classical Arabic poetry and prose.',
    },
  ];

  return (
    <section className="min-h-screen bg-ivory pb-24 pt-32 relative overflow-hidden">
      {/* Hero Header */}
      <div className="bg-hero py-20 text-center text-parchment relative border-b border-gold-muted/20">
        <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:90px_90px] opacity-[0.02] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className={`text-xs uppercase tracking-widest text-gold-champagne font-bold block mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'البرنامج التعليمي' : 'PROGRAM DETAILS'}
          </span>
          <h1 className={`text-display font-bold text-parchment mb-2 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? 'اللغة العربية الفصحى' : 'Classical Arabic'}
          </h1>
          <span className="block font-amiri text-lg text-gold mb-6 tracking-wide">اللغة العربية الفصحى</span>
          <p className={`text-sm text-parchment/70 max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'تلقى قواعد لغة الضاد وتذوق بلاغتها مباشرة على أيدي متخصصين مجازين، بأسلوب تفاعلي مصمم خصيصاً لك.'
              : 'Master classical Arabic grammar, sentence construction, and eloquence under the direct supervision of native language scholars.'}
          </p>
        </div>
      </div>

      {/* Curriculum Outline */}
      <div className="max-w-4xl mx-auto px-6 mt-20 relative z-10 text-start">
        <h2 className={`text-title text-midnight font-bold mb-12 text-center ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
          {isRtl ? 'منهجية مسار اللغة العربية' : 'Curriculum Structure'}
        </h2>

        <div className="space-y-8">
          {levels.map((level) => (
            <div
              key={level.num}
              className="bg-parchment/35 border border-gold-muted/15 rounded-lg p-6 flex gap-6 hover:border-gold/30 transition-all duration-300"
            >
              <span className="font-cormorant text-2xl font-bold text-gold shrink-0 mt-1">
                {level.num}
              </span>
              <div>
                <h3 className={`text-base font-bold text-midnight mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {level.name}
                </h3>
                <p className={`text-xs text-stone leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {level.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="bg-navy-deep text-parchment border border-gold/20 rounded-lg p-10 mt-16 text-center shadow-xl">
          <h3 className={`text-heading font-bold text-gold-champagne mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? 'احجز حصة تجريبية مجانية لتقييم مستواك' : 'Begin Your Language Assessment'}
          </h3>
          <p className={`text-xs text-parchment/65 leading-relaxed max-w-lg mx-auto mb-8 ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'خلال الحصة التجريبية البالغة 30 دقيقة، سيقوم مدرس متخصص بتقييم لغتك وتحديد المنهج المناسب وبناء خطة دراسية تلائم أهدافك.'
              : 'During your 30-minute free trial session, a native Arabic instructor will evaluate your skills, discuss your objectives, and customize your study map.'}
          </p>
          <Link
            href={`/${locale}/book`}
            className="btn-gold px-8 py-3.5 rounded text-xs uppercase tracking-wider font-semibold inline-block"
          >
            {isRtl ? 'احجز حصتك التجريبية الآن' : 'Schedule Free Trial Session'}
          </Link>
        </div>
      </div>
    </section>
  );
}
