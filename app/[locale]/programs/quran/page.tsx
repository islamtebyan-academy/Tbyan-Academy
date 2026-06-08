import React from 'react';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Check } from 'lucide-react';

interface ProgramDetailProps {
  params: Promise<{ locale: string }>;
}

export default async function QuranPage({ params }: ProgramDetailProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  const levels = [
    {
      num: '01',
      name: isRtl ? 'المستوى التمهيدي: تصحيح التلاوة' : 'Level 1: Recitation Correction',
      desc: isRtl
        ? 'التركيز الكامل على مخارج الحروف العربية وصفاتها ومبادئ النطق السليم للآيات الكريمة.'
        : 'Focused correction of Arabic letters articulation, vowels, and primary phonetic pronunciation of Quranic text.',
    },
    {
      num: '02',
      name: isRtl ? 'المستوى المتوسط: أحكام التجويد' : 'Level 2: Applied Tajweed Rules',
      desc: isRtl
        ? 'دراسة وتطبيق أحكام المد، والغرّة، والإظهار، والإدغام، والإخفاء، وتطبيقها عملياً أثناء القراءة.'
        : 'Detailed study of Noon & Meem Sakinah rules, Madd extensions, stopping, and applying them systematically during recitation.',
    },
    {
      num: '03',
      name: isRtl ? 'المستوى المتقدم: الحفظ والتمكين' : 'Level 3: Hifz & Memorization',
      desc: isRtl
        ? 'الحفظ المنظم لقصار أو طوال السور مع المراجعة المستمرة وتثبيت المحفوظ بأسلوب علمي راسخ.'
        : 'Structured memorization schedules adapted to student goals, paired with active revision loops to lock verses in long-term memory.',
    },
    {
      num: '04',
      name: isRtl ? 'الإجازة والسند المتصل' : 'Ijaza & Isnad Pathway',
      desc: isRtl
        ? 'للطفل البالغ الخاتم لكتاب الله، التلقي الفردي للحصول على السند المتصل لرسول الله صلى الله عليه وسلم بقراءة حفص أو القراءات الأخرى.'
        : 'For advanced students who have memorized the Quran, private instruction to receive an Ijaza with chain of transmission (Isnad) back to the Prophet (PBUH).',
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
            {isRtl ? 'القرآن الكريم والتجويد' : 'Quran & Tajweed'}
          </h1>
          <span className="block font-amiri text-lg text-gold mb-6 tracking-wide">القرآن الكريم والتجويد</span>
          <p className={`text-sm text-parchment/70 max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'تلقى كتاب الله غضاً طرياً كما أُنزل، عبر تواصل خاص 1-على-1 مع نخبة من خيرة القراء والعلماء المجازين بالأزهر الشريف.'
              : 'Learn the correct recitation of the Quran, master Tajweed rules, and memorize under the private guidance of Ijaza-holding scholars.'}
          </p>
        </div>
      </div>

      {/* Curriculum Outline */}
      <div className="max-w-4xl mx-auto px-6 mt-20 relative z-10 text-start">
        <h2 className={`text-title text-midnight font-bold mb-12 text-center ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
          {isRtl ? 'منهجية مسار القرآن والتجويد' : 'Curriculum Structure'}
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
            {isRtl ? 'احجز حصة تجريبية مجانية لتقييم مستواك' : 'Assess Your Level with a Scholar'}
          </h3>
          <p className={`text-xs text-parchment/65 leading-relaxed max-w-lg mx-auto mb-8 ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'خلال الحصة التجريبية البالغة 30 دقيقة، سيستمع المعلم لتلاوتك ويحدد مخارج الحروف المناسبة ويضع معك خطة دراسية مخصصة.'
              : 'During your 30-minute free trial session, a scholar will assess your pronunciation, listen to your recitation, and draft your personalized learning path.'}
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
