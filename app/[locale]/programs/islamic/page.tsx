import React from 'react';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

interface ProgramDetailProps {
  params: Promise<{ locale: string }>;
}

export default async function IslamicPage({ params }: ProgramDetailProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  const disciplines = [
    {
      num: '01',
      name: isRtl ? 'علم الفقه الإسلامي' : 'Fiqh (Islamic Jurisprudence)',
      desc: isRtl
        ? 'دراسة الأحكام العملية المتعلقة بالعبادات (الطهارة، الصلاة، الصيام، الزكاة، الحج) والمعاملات وفق المذاهب الفقهية الأربعة المعتمدة.'
        : 'Detailed study of the rules of worship (Taharah, Salah, Fasting, Zakah, Hajj) and transactions according to the established jurisprudential schools.',
    },
    {
      num: '02',
      name: isRtl ? 'علم العقيدة الإسلامية' : 'Aqeedah (Islamic Creed)',
      desc: isRtl
        ? 'بناء فهم عقدي سليم وواضح قائم على القرآن الكريم والسنة النبوية الشريفة وأصول أهل السنة والجماعة.'
        : 'Build a solid theological understanding based on the Quran, Prophetic Sunnah, and the consensus of orthodox scholars.',
    },
    {
      num: '03',
      name: isRtl ? 'السيرة النبوية المطهرة' : 'Seerah & Prophetic Biography',
      desc: isRtl
        ? 'دراسة حياة النبي صلى الله عليه وسلم وأحداثها والدروس والعبر التربوية والتشريعية المستفادة منها، بالإضافة للشمائل المحمدية.'
        : 'Systematic study of the life of Prophet Muhammad (PBUH), prophetic events, seerah lessons, and his refined character traits (Shama\'il).',
    },
    {
      num: '04',
      name: isRtl ? 'أصول التفسير والحديث' : 'Tafsir & Hadith Studies',
      desc: isRtl
        ? 'دراسة معاني الآيات وأسباب النزول، بالإضافة لشرح الكتب المعتمدة في الحديث الشريف (مثل الأربعين النووية).'
        : 'Unlocking the meanings of the Quranic text through authoritative commentaries, paired with study of major Hadith text collections.',
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
            {isRtl ? 'العلوم الشرعية' : 'Islamic Studies'}
          </h1>
          <span className="block font-amiri text-lg text-gold mb-6 tracking-wide">العلوم الشرعية</span>
          <p className={`text-sm text-parchment/70 max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'تلقى الفهم الصحيح للشريعة الغراء والعقيدة الصافية على أيدي علماء متخصصين مجازين، بأسلوب علمي ومنهجي.'
              : 'Develop a clear, structured understanding of Islamic creed, law, biography, and scripture under the guidance of qualified academic mentors.'}
          </p>
        </div>
      </div>

      {/* Curriculum Outline */}
      <div className="max-w-4xl mx-auto px-6 mt-20 relative z-10 text-start">
        <h2 className={`text-title text-midnight font-bold mb-12 text-center ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
          {isRtl ? 'منهجية مسار العلوم الشرعية' : 'Curriculum Structure'}
        </h2>

        <div className="space-y-8">
          {disciplines.map((disc) => (
            <div
              key={disc.num}
              className="bg-parchment/35 border border-gold-muted/15 rounded-lg p-6 flex gap-6 hover:border-gold/30 transition-all duration-300"
            >
              <span className="font-cormorant text-2xl font-bold text-gold shrink-0 mt-1">
                {disc.num}
              </span>
              <div>
                <h3 className={`text-base font-bold text-midnight mb-2 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                  {disc.name}
                </h3>
                <p className={`text-xs text-stone leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
                  {disc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="bg-navy-deep text-parchment border border-gold/20 rounded-lg p-10 mt-16 text-center shadow-xl">
          <h3 className={`text-heading font-bold text-gold-champagne mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? 'ابدأ دراستك المنهجية للشريعة الإسلامية' : 'Start Your Structured Shariah Study'}
          </h3>
          <p className={`text-xs text-parchment/65 leading-relaxed max-w-lg mx-auto mb-8 ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'احجز جلستك التجريبية المجانية اليوم البالغة 30 دقيقة للتعرف على المنهج، ومناقشة تفضيلاتك في الفقه والعقيدة والسيرة مع معلمك.'
              : 'Schedule your complimentary 30-minute session to discuss your current level, goals, and preferred topics with a scholar.'}
          </p>
          <Link
            href={`/${locale}/book`}
            className="btn-gold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold inline-block"
          >
            {isRtl ? 'احجز حصتك التجريبية الآن' : 'Schedule Free Trial Session'}
          </Link>
        </div>
      </div>
    </section>
  );
}
