'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials({
  tagOverride,
  titleOverride,
  subtitleOverride,
  testimonial1Name,
  testimonial1Role,
  testimonial1Persona,
  testimonial1Quote,
  testimonial2Name,
  testimonial2Role,
  testimonial2Persona,
  testimonial2Quote,
  testimonial3Name,
  testimonial3Role,
  testimonial3Persona,
  testimonial3Quote,
  testimonialsList,
}: {
  tagOverride?: string;
  titleOverride?: string;
  subtitleOverride?: string;
  testimonial1Name?: string;
  testimonial1Role?: string;
  testimonial1Persona?: string;
  testimonial1Quote?: string;
  testimonial2Name?: string;
  testimonial2Role?: string;
  testimonial2Persona?: string;
  testimonial2Quote?: string;
  testimonial3Name?: string;
  testimonial3Role?: string;
  testimonial3Persona?: string;
  testimonial3Quote?: string;
  testimonialsList?: Array<{
    name?: string;
    role?: string;
    persona?: string;
    quote?: string;
  }>;
}) {
  const t = useTranslations('Testimonials');
  const locale = useLocale();
  const isRtl = locale === 'ar';


  const mockTestimonials = [
    {
      quote: testimonial1Quote || (isRtl
        ? 'العثور على معلم يفهم كلاً من تجويد القرآن والسياق ثنائي اللغة لأطفالي كان أمراً غيّر حياتنا تماماً. الحصص تفاعلية للغاية وأطفالي يتطلعون إليها بشوق كل أسبوع.'
        : 'Finding a teacher who understands both Quranic Tajweed and my children\'s bilingual context has been life-changing. The lessons are deeply interactive, and my kids look forward to them every single week.'),
      name: testimonial1Name || (isRtl ? 'أميرة خليل' : 'Amira Khalil'),
      role: testimonial1Role || (isRtl ? 'لندن، المملكة المتحدة' : 'London, UK'),
      persona: testimonial1Persona || (isRtl ? 'أم محترفة' : 'French-Algerian Professional'),
    },
    {
      quote: testimonial2Quote || (isRtl
        ? 'المنهج الأكاديمي المتبع لتعليم قواعد اللغة العربية الفصحى استثنائي للغاية. المادة العلمية دقيقة ومنظمة والتعليم فردي تفاعلي، يختلف تماماً عن تطبيقات اللغات التقليدية.'
        : 'The academic approach to classical Arabic grammar here is exceptional. It\'s tailored, thorough, and highly structured, unlike typical language learning apps.'),
      name: testimonial2Name || (isRtl ? 'يوسف أحمد' : 'Yusuf Ahmad'),
      role: testimonial2Role || (isRtl ? 'تورونتو، كندا' : 'Toronto, Canada'),
      persona: testimonial2Persona || (isRtl ? 'مهندس برمجيات' : 'Software Developer'),
    },
    {
      quote: testimonial3Quote || (isRtl
        ? 'إن إتقان التجويد ودراسة متون التفسير على أيدي نخبة من علماء الأزهر عبر دروس فردية (1:1) قد عمّق فهمي لكتاب الله. جودة التعليم هنا ترقى لأعلى المستويات الأكاديمية.'
        : 'Perfecting my Tajweed and studying Tafsir with Al-Azhar scholars 1-on-1 has profoundly deepened my connection to the Mushaf. The caliber of instruction is truly elite.'),
      name: testimonial3Name || (isRtl ? 'فاطمة منصور' : 'Fatima Mansour'),
      role: testimonial3Role || (isRtl ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'),
      persona: testimonial3Persona || (isRtl ? 'طالبة دراسات عليا' : 'Postgraduate Student'),
    },
    {
      quote: isRtl
        ? 'بصفتي ولي أمر أعيش في نيو جيرسي، كنت قلقاً على ارتباط أطفالي باللغة العربية والقرآن الكريم. وفرت أكاديمية تبيان معلماً أزهرياً رائعاً يتواصل معهم بسلاسة، ومدى تقدمهم في مخارج الحروف مذهل حقاً.'
        : 'As a parent in New Jersey, I was worried about my children losing their connection to Arabic and the Quran. Islam Tebyan provided an incredible Azhari tutor who connects with them effortlessly. The progress in their pronunciation is remarkable.',
      name: isRtl ? 'د. طارق ياسين' : 'Dr. Tariq Yassin',
      role: isRtl ? 'نيو جيرسي، الولايات المتحدة' : 'New Jersey, USA',
      persona: isRtl ? 'طبيب قلب ووالد' : 'Cardiologist & Parent',
    },
    {
      quote: isRtl
        ? 'دراسة النصوص الفقهية والشرعية باللغتين الفرنسية والعربية في جلسات فردية منظمة تماماً كالحلقات العلمية الجامعية. الشيوخ هنا علماء أكاديميون حقيقيون يشجعون على البحث والفهم العميق.'
        : 'The 1-on-1 study of Islamic legal texts in French and Arabic is structured exactly like a university seminar. The teachers are true academic scholars who encourage deep intellectual inquiry.',
      name: isRtl ? 'سارة بن جلون' : 'Sarah Benjelloun',
      role: isRtl ? 'باريس، فرنسا' : 'Paris, France',
      persona: isRtl ? 'طالبة قانون' : 'Law Student',
    },
    {
      quote: isRtl
        ? 'تنوع المناهج الدراسية ومرونة الأوقات مكنتني من الموازنة بين دراستي الأكاديمية وحفظ القرآن الكريم بالتجويد الصحيح.'
        : 'The curriculum diversity and scheduling flexibility enabled me to balance my postgraduate studies with memorizing the Quran with proper Tajweed.',
      name: isRtl ? 'أحمد محمود' : 'Ahmad Mahmoud',
      role: isRtl ? 'برلين، ألمانيا' : 'Berlin, Germany',
      persona: isRtl ? 'طالب دكتوراه' : 'Ph.D. Candidate',
    },
  ];

  let testimonials = (testimonialsList && testimonialsList.length > 0)
    ? testimonialsList
      .filter(test => test.name || test.quote)
      .map((test, index) => {
        const fallback = mockTestimonials[index] || mockTestimonials[0];
        return {
          quote: test.quote || fallback.quote,
          name: test.name || fallback.name,
          role: test.role || fallback.role,
          persona: test.persona || fallback.persona,
        };
      })
    : mockTestimonials;

  // Ensure we always have at least 6 testimonials to maintain a professional flowing carousel
  if (testimonials.length < 6) {
    const needed = 6 - testimonials.length;
    const extraMocks = mockTestimonials.slice(testimonials.length, testimonials.length + needed);
    testimonials = [...testimonials, ...extraMocks];
    if (testimonials.length < 6) {
      const remaining = 6 - testimonials.length;
      testimonials = [...testimonials, ...mockTestimonials.slice(0, remaining)];
    }
  }

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [visibleCards, setVisibleCards] = React.useState(3);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCards);
  const safeIndex = Math.min(currentIndex, maxIndex);

  // Autoplay functionality
  React.useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex, currentIndex]);


  const nextSlide = () => {
    if (safeIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (safeIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(maxIndex);
    }
  };

  return (
    <section className="bg-parchment py-24 border-b border-gold-muted/10 relative z-10 overflow-hidden">
      {/* Repeating 8-star pattern background for premium texture */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.015] pointer-events-none" />

      {/* Subtle ambient light glows */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-gold-hi/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-xs uppercase tracking-widest text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'
              }`}
          >
            {tagOverride || (isRtl ? 'قصص الأثر والتلقي' : 'STUDENT VOICES')}
          </span>
          <h2
            className={`text-title text-midnight font-bold mb-4 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'
              }`}
          >
            {titleOverride || t('title')}
          </h2>
          <p
            className={`text-sm text-[#3A332A] max-w-xl mx-auto leading-relaxed font-normal description-justify ${isRtl ? 'font-noto' : 'font-lora'
              }`}
          >
            {subtitleOverride || t('subtitle')}
          </p>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative overflow-hidden w-full px-2 py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{
              x: `${isRtl ? '' : '-'}${safeIndex * (100 / visibleCards)}%`
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          >
            {testimonials.map((test, index) => (
              <div
                key={index}
                className="px-3 shrink-0 w-full sm:w-1/2 lg:w-1/3"
              >
                <motion.div
                  className="bg-gradient-to-br from-ivory via-ivory/95 to-ivory/85 backdrop-blur-lg border border-gold-muted/20 rounded-3xl p-8 hover:border-gold/60 hover:-translate-y-1.5 hover:shadow-[0_25px_55px_rgba(139,115,85,0.15)] transition-all duration-500 flex flex-col justify-between h-full min-h-[340px] shadow-[0_15px_30px_rgba(0,0,0,0.06)] group relative overflow-hidden"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: (index % visibleCards) * 0.12 }}
                >
                  {/* Decorative top-accent gold line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted/30 via-gold-hi to-gold-muted/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Logo watermark background overlay */}
                  <div className="absolute right-6 bottom-6 w-24 h-24 bg-[url('/logo-new.webp')] bg-contain bg-no-repeat opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-105 transition-all duration-700 pointer-events-none z-0" />

                  <div className="relative z-10 text-start flex flex-col justify-between h-full w-full" dir={isRtl ? 'rtl' : 'ltr'}>
                    <div>
                      {/* Editorial Quotation Mark */}
                      <div className={`text-gold/25 font-cormorant text-5xl leading-none mb-3 select-none ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isRtl ? '«' : '“'}
                      </div>

                      {/* Quote Text */}
                      <p
                        className={`text-sm text-ink leading-relaxed mb-6 group-hover:text-midnight transition-colors duration-300 description-justify-start ${isRtl ? 'font-noto' : 'font-lora italic'
                          }`}
                      >
                        {test.quote}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="border-t border-gold-muted/10 pt-4 flex flex-col mt-4 text-start">
                      <span
                        className={`text-sm font-bold text-midnight flex items-center gap-1.5 ${isRtl ? 'font-cairo' : 'font-dm'
                          }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {test.name}
                      </span>
                      <span className={`text-[10px] text-taupe tracking-wider uppercase font-medium mt-0.5 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                        {test.role && test.persona ? (
                          isRtl ? (
                            <>
                              {test.role} <span className="opacity-75">، {test.persona}</span>
                            </>
                          ) : (
                            <>
                              {test.role} <span className="opacity-75"> - {test.persona}</span>
                            </>
                          )
                        ) : (
                          test.role || test.persona || ''
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Controls */}
        {maxIndex > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 relative z-20">
            {/* Slide indicators (Dots) */}
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full h-2 ${idx === safeIndex ? 'w-6 bg-gold' : 'w-2 bg-gold/30 hover:bg-gold/50'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="bg-ivory border border-gold/30 hover:border-gold hover:bg-gold/10 text-gold transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95"
                aria-label="Previous slide"
              >
                {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              <button
                onClick={nextSlide}
                className="bg-ivory border border-gold/30 hover:border-gold hover:bg-gold/10 text-gold transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95"
                aria-label="Next slide"
              >
                {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
