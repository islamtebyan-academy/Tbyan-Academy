import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';

interface TeachersPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TeachersPage({ params }: TeachersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  const scholars = [
    {
      name: isRtl ? 'د. أنس الأزهري' : 'Dr. Anas Al-Azhari',
      title: isRtl ? 'دكتوراه في القراءات والتجويد' : 'PhD in Quranic Recitations',
      specialty: isRtl ? 'التجويد والقراءات العشر المتواترة' : 'Tajweed & 10 Qira\'at',
      education: isRtl ? 'جامعة الأزهر الشريف، القاهرة' : 'Al-Azhar University, Cairo',
      languages: isRtl ? 'العربية، الإنجليزية' : 'Arabic, English',
      image: '/images/teacher_anas.png',
      slug: 'anas-al-azhari',
      bio: isRtl 
        ? 'يحمل إجازات متصلة السند بالقراءات العشر الصغرى والكبرى، ولديه خبرة تزيد عن 12 عاماً في إرشاد وتعليم الطلاب غير الناطقين بالعربية.'
        : 'Holds Ijaza in the 10 minor and major recitations of the Quran, with over 12 years of experience teaching non-Arabic speakers globally.',
    },
    {
      name: isRtl ? 'الشيخ يوسف الفرنسي' : 'Sheikh Youssef Al-Faransi',
      title: isRtl ? 'ماجستير في النحو واللغويات العربية' : 'MA in Classical Arabic Grammar',
      specialty: isRtl ? 'النحو والصرف والبلاغة القديمة' : 'Arabic Grammar (Nahw & Sarf)',
      education: isRtl ? 'الجامعة الإسلامية بالمدينة المنورة' : 'Islamic University of Madinah',
      languages: isRtl ? 'العربية، الفرنسية' : 'Arabic, French',
      image: '/images/teacher_youssef.png',
      slug: 'youssef-al-faransi',
      bio: isRtl
        ? 'متخصص في شرح أمهات كتب القواعد والنحو العربي مثل الآجرومية وقطر الندى، مكرس جهوده لمساعدة الطلاب الفرانكوفونيين في فهم نصوص الوحي.'
        : 'Specializes in explaining classical grammar texts (Al-Ajrumiyyah, Qatr al-Nada) with a mission to help French-speaking students access classical sources.',
    },
    {
      name: isRtl ? 'د. مريم الأحمد' : 'Dr. Mariam Al-Ahmad',
      title: isRtl ? 'دكتوراه في الفقه الإسلامي وأصوله' : 'PhD in Islamic Jurisprudence',
      specialty: isRtl ? 'الفقه، أصول الفقه، العقيدة، والقرآن' : 'Fiqh, Aqeedah, & Quranic Sciences',
      education: isRtl ? 'كلية الدراسات الإسلامية بجامعة الأزهر' : 'Faculty of Islamic Studies, Al-Azhar',
      languages: isRtl ? 'العربية، الإنجليزية، الفرنسية' : 'Arabic, English, French',
      image: '/images/teacher_mariam.png',
      slug: 'mariam-al-ahmad',
      bio: isRtl
        ? 'باحثة ومفتية متخصصة في الفقه المقارن، وحاصلة على إجازة في حفظ القرآن الكريم برواية حفص وشعبة عن عاصم، ولديها خبرة طويلة في تدريس الأخوات والأطفال.'
        : 'A senior scholar in comparative jurisprudence and Islamic theology, holding multiple Ijazat in recitation (Hafs & Shu\'bah), with extensive pedagogical experience.',
    },
  ];

  return (
    <section className="bg-parchment-fade min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Star pattern backdrop */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:100px_100px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Page Title */}
        <div className="text-center mb-20">
          <span className={`inline-block text-xs uppercase tracking-widest text-gold font-bold mb-3 ${isRtl ? 'font-cairo' : 'font-dm'}`}>
            {isRtl ? 'هيئة التدريس' : 'ACADEMIC FACULTY'}
          </span>
          <h1 className={`text-display text-midnight font-bold mb-4 ${isRtl ? 'font-amiri' : 'font-cormorant'}`}>
            {isRtl ? 'نخبة من المعلمين والعلماء المجازين' : 'Meet Our Scholars'}
          </h1>
          <p className={`text-sm text-stone max-w-xl mx-auto leading-relaxed ${isRtl ? 'font-noto' : 'font-lora'}`}>
            {isRtl
              ? 'علماء مجازون من خريجي جامعة الأزهر الشريف والمؤسسات العريقة، ذوو تأهيل تربوي عالٍ وخبرة في إلقاء الدروس بثلاث لغات.'
              : 'Our faculty is comprised of verified, certified scholars who bring years of university instruction and deep pedagogical experience to your private Zoom session.'}
          </p>
        </div>

        {/* Scholars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          {scholars.map((teacher, index) => (
            <div
              key={index}
              className="bg-ivory border border-gold-muted/15 rounded-[2rem] overflow-hidden shadow-md hover:border-gold/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Frame with overlay and text */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Deep gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent pointer-events-none z-10" />

                  {/* Name & Credentials placed over the image */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 text-start">
                    <h2 className={`text-[1.35rem] font-bold text-parchment mb-1 ${isRtl ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}`}>
                      {teacher.name}
                    </h2>
                    <span className={`text-[10px] text-gold-hi uppercase tracking-widest font-semibold block ${isRtl ? 'font-cairo' : 'font-dm'}`}>
                      {teacher.title}
                    </span>
                  </div>
                </div>

                {/* Card Text Content with padding */}
                <div className="p-6 md:p-7">
                  {/* Short Bio */}
                  <p className={`text-xs text-stone leading-relaxed mb-5 italic ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    {teacher.bio}
                  </p>

                  {/* Details List */}
                  <div className={`space-y-2.5 mb-6 text-xs ${isRtl ? 'font-noto' : 'font-lora'}`}>
                    <div className="flex justify-between py-1.5 border-b border-gold-muted/10">
                      <span className="text-stone/60">{isRtl ? 'التخصص' : 'Specialty'}</span>
                      <span className="text-midnight font-bold text-end max-w-[170px]">{teacher.specialty}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gold-muted/10">
                      <span className="text-stone/60">{isRtl ? 'الشهادة' : 'Education'}</span>
                      <span className="text-midnight font-bold text-end max-w-[170px]">{teacher.education}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-stone/60">{isRtl ? 'اللغات' : 'Languages'}</span>
                      <span className="text-midnight font-bold">{teacher.languages}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Link */}
              <div className="px-6 pb-6">
                <Link
                  href={`/${locale}/teachers/${teacher.slug}`}
                  className="btn-gold text-center py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold block w-full relative z-10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  {isRtl ? 'عرض السيرة الذاتية والأوقات' : 'View Profile & Schedule'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
