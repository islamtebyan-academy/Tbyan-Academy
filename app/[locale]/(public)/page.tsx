import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Credibility from '@/components/sections/Credibility';
import ProgramsShowcase from '@/components/sections/ProgramsShowcase';
import AboutTeaser from '@/components/sections/AboutTeaser';
import Methodology from '@/components/sections/Methodology';
import FeaturedCourses from '@/components/sections/FeaturedCourses';
import TeachersSpotlight from '@/components/sections/TeachersSpotlight';
import Testimonials from '@/components/sections/Testimonials';
import HowItWorks from '@/components/sections/HowItWorks';
import PricingTeaser from '@/components/sections/PricingTeaser';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCTA from '@/components/sections/FinalCTA';
import { createClient } from '@/lib/supabase/server';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Set the locale for static rendering optimization
  setRequestLocale(locale);

  // Fetch content settings from Supabase
  const settings: Record<string, any> = {};

  try {
    const supabase = await createClient();
    const { data: dbSettings } = await supabase
      .from('settings')
      .select('*');

    if (dbSettings) {
      dbSettings.forEach((s) => {
        settings[s.key] = s.value;
      });
    }
  } catch (error) {
    console.error('Error loading homepage settings from Supabase:', error);
  }

  const getSetting = (key: string) => settings[key]?.[locale];

  return (
    <>
      <Hero 
        taglineOverride={getSetting('hero_tagline')}
        headlineOverride={getSetting('hero_headline')}
        descriptionOverride={getSetting('hero_description')}
        bgImageOverride={settings.hero_bg_image?.[locale] || settings.hero_bg_image?.['ar'] || settings.hero_bg_image?.['en']}
        ctaPrimaryOverride={getSetting('hero_cta_primary')}
        ctaSecondaryOverride={getSetting('hero_cta_secondary')}
        stat1ValueOverride={getSetting('hero_stat1_value')}
        stat1LabelOverride={getSetting('hero_stat1_label')}
        stat2ValueOverride={getSetting('hero_stat2_value')}
        stat2LabelOverride={getSetting('hero_stat2_label')}
        stat3ValueOverride={getSetting('hero_stat3_value')}
        stat3LabelOverride={getSetting('hero_stat3_label')}
        stat4ValueOverride={getSetting('hero_stat4_value')}
        stat4LabelOverride={getSetting('hero_stat4_label')}
      />
      <Credibility 
        titleOverride={getSetting('credibility_title')}
        diff1TitleOverride={getSetting('credibility_diff1_title')}
        diff1DescOverride={getSetting('credibility_diff1_desc')}
        diff2TitleOverride={getSetting('credibility_diff2_title')}
        diff2DescOverride={getSetting('credibility_diff2_desc')}
        diff3TitleOverride={getSetting('credibility_diff3_title')}
        diff3DescOverride={getSetting('credibility_diff3_desc')}
        diff4TitleOverride={getSetting('credibility_diff4_title')}
        diff4DescOverride={getSetting('credibility_diff4_desc')}
        diff5TitleOverride={getSetting('credibility_diff5_title')}
        diff5DescOverride={getSetting('credibility_diff5_desc')}
      />
      <ProgramsShowcase 
        taglineOverride={getSetting('programs_showcase_tag')}
        titleOverride={getSetting('programs_showcase_title')}
        subtitleOverride={getSetting('programs_showcase_desc')}
        quranTitleOverride={getSetting('programs_showcase_quran_title')}
        quranArabicOverride={getSetting('programs_showcase_quran_arabic')}
        quranDescOverride={getSetting('programs_showcase_quran_desc')}
        quranBooksOverride={getSetting('programs_showcase_quran_books')}
        arabicTitleOverride={getSetting('programs_showcase_arabic_title')}
        arabicArabicOverride={getSetting('programs_showcase_arabic_arabic')}
        arabicDescOverride={getSetting('programs_showcase_arabic_desc')}
        arabicBooksOverride={getSetting('programs_showcase_arabic_books')}
        islamicTitleOverride={getSetting('programs_showcase_islamic_title')}
        islamicArabicOverride={getSetting('programs_showcase_islamic_arabic')}
        islamicDescOverride={getSetting('programs_showcase_islamic_desc')}
        islamicBooksOverride={getSetting('programs_showcase_islamic_books')}
      />
      <AboutTeaser 
        titleOverride={getSetting('about_teaser_title')}
        subtitleOverride={getSetting('about_teaser_description')}
        buttonOverride={getSetting('about_teaser_btn')}
        tagOverride={getSetting('about_teaser_tag')}
        philosophyTitleOverride={getSetting('about_teaser_philosophy_title')}
        philosophyTextOverride={getSetting('about_teaser_philosophy_text')}
        pillar1TitleOverride={getSetting('about_teaser_pillar1_title')}
        pillar1TextOverride={getSetting('about_teaser_pillar1_text')}
        pillar2TitleOverride={getSetting('about_teaser_pillar2_title')}
        pillar2TextOverride={getSetting('about_teaser_pillar2_text')}
      />
      <Methodology 
        titleOverride={getSetting('methodology_title')}
        subtitleOverride={getSetting('methodology_subtitle')}
        pillar1TitleOverride={getSetting('methodology_pillar1_title')}
        pillar1DescOverride={getSetting('methodology_pillar1_desc')}
        pillar2TitleOverride={getSetting('methodology_pillar2_title')}
        pillar2DescOverride={getSetting('methodology_pillar2_desc')}
        pillar3TitleOverride={getSetting('methodology_pillar3_title')}
        pillar3DescOverride={getSetting('methodology_pillar3_desc')}
        pillar1ImageOverride={getSetting('methodology_pillar1_image')}
        pillar2ImageOverride={getSetting('methodology_pillar2_image')}
        pillar3ImageOverride={getSetting('methodology_pillar3_image')}
      />
      <FeaturedCourses 
        tagOverride={getSetting('featured_courses_tag')}
        titleOverride={getSetting('featured_courses_title')}
        descOverride={getSetting('featured_courses_desc')}
        btnAllOverride={getSetting('featured_courses_btn_all')}
        course1Title={getSetting('course1_title')}
        course1Tag={getSetting('course1_tag')}
        course1Desc={getSetting('course1_desc')}
        course1Duration={getSetting('course1_duration')}
        course1Level={getSetting('course1_level')}
        course1Syllabus={getSetting('course1_syllabus')}
        course2Title={getSetting('course2_title')}
        course2Tag={getSetting('course2_tag')}
        course2Desc={getSetting('course2_desc')}
        course2Duration={getSetting('course2_duration')}
        course2Level={getSetting('course2_level')}
        course2Syllabus={getSetting('course2_syllabus')}
        course3Title={getSetting('course3_title')}
        course3Tag={getSetting('course3_tag')}
        course3Desc={getSetting('course3_desc')}
        course3Duration={getSetting('course3_duration')}
        course3Level={getSetting('course3_level')}
        course3Syllabus={getSetting('course3_syllabus')}
      />
      <TeachersSpotlight 
        tagOverride={getSetting('teachers_spotlight_tag')}
        titleOverride={getSetting('teachers_spotlight_title')}
        subtitleOverride={getSetting('teachers_spotlight_subtitle')}
        viewAllOverride={getSetting('teachers_spotlight_btn_all')}
        teacher1Name={getSetting('teacher1_name')}
        teacher1Title={getSetting('teacher1_title')}
        teacher1Specialty={getSetting('teacher1_specialty')}
        teacher1Education={getSetting('teacher1_education')}
        teacher1Languages={getSetting('teacher1_languages')}
        teacher1Ijazah1={getSetting('teacher1_ijazah1')}
        teacher1Ijazah2={getSetting('teacher1_ijazah2')}
        teacher1Image={getSetting('teacher1_image')}
        teacher2Name={getSetting('teacher2_name')}
        teacher2Title={getSetting('teacher2_title')}
        teacher2Specialty={getSetting('teacher2_specialty')}
        teacher2Education={getSetting('teacher2_education')}
        teacher2Languages={getSetting('teacher2_languages')}
        teacher2Ijazah1={getSetting('teacher2_ijazah1')}
        teacher2Ijazah2={getSetting('teacher2_ijazah2')}
        teacher2Image={getSetting('teacher2_image')}
        teacher3Name={getSetting('teacher3_name')}
        teacher3Title={getSetting('teacher3_title')}
        teacher3Specialty={getSetting('teacher3_specialty')}
        teacher3Education={getSetting('teacher3_education')}
        teacher3Languages={getSetting('teacher3_languages')}
        teacher3Ijazah1={getSetting('teacher3_ijazah1')}
        teacher3Ijazah2={getSetting('teacher3_ijazah2')}
        teacher3Image={getSetting('teacher3_image')}
      />
      {(() => {
        const testimonialsActiveIdsStr = getSetting('testimonials_active_ids');
        let activeTestimonialIds = [1, 2, 3, 4, 5, 6];
        if (testimonialsActiveIdsStr) {
          const parsedIds = testimonialsActiveIdsStr
            .split(',')
            .map((id: string) => parseInt(id.trim(), 10))
            .filter(Number.isInteger);
          if (parsedIds.length > 0) {
            activeTestimonialIds = parsedIds;
          }
        }

        const dynamicTestimonialsList = activeTestimonialIds.map((id: number) => ({
          name: getSetting(`testimonial${id}_name`),
          role: getSetting(`testimonial${id}_role`),
          persona: getSetting(`testimonial${id}_persona`),
          quote: getSetting(`testimonial${id}_quote`),
        }));

        return (
          <Testimonials 
            tagOverride={getSetting('testimonials_tag')}
            titleOverride={getSetting('testimonials_title')}
            subtitleOverride={getSetting('testimonials_subtitle')}
            testimonialsList={dynamicTestimonialsList}
          />
        );
      })()}
      <HowItWorks 
        tagOverride={getSetting('how_it_works_tag')}
        whyTitleOverride={getSetting('how_it_works_why_title')}
        formTitleOverride={getSetting('how_it_works_form_title')}
        formSubtitleOverride={getSetting('how_it_works_form_subtitle')}
        btnSubmitOverride={getSetting('how_it_works_btn_submit')}
      />
      <PricingTeaser 
        titleOverride={getSetting('pricing_teaser_title')}
        subtitleOverride={getSetting('pricing_teaser_subtitle')}
        trialRefundPolicyTitleOverride={getSetting('pricing_teaser_trial_refund_policy_title')}
        trialRefundPolicyDescOverride={getSetting('pricing_teaser_trial_refund_policy_desc')}
        pricingPlan1Name={getSetting('pricing_plan1_name')}
        pricingPlan1Desc={getSetting('pricing_plan1_desc')}
        pricingPlan1Feat1={getSetting('pricing_plan1_feat1')}
        pricingPlan1Feat2={getSetting('pricing_plan1_feat2')}
        pricingPlan1Feat3={getSetting('pricing_plan1_feat3')}
        pricingPlan1Feat4={getSetting('pricing_plan1_feat4')}
        pricingPlan1Price30={getSetting('pricing_plan1_price_30')}
        pricingPlan1Price45={getSetting('pricing_plan1_price_45')}
        pricingPlan1Price60={getSetting('pricing_plan1_price_60')}
        pricingPlan2Name={getSetting('pricing_plan2_name')}
        pricingPlan2Desc={getSetting('pricing_plan2_desc')}
        pricingPlan2Feat1={getSetting('pricing_plan2_feat1')}
        pricingPlan2Feat2={getSetting('pricing_plan2_feat2')}
        pricingPlan2Feat3={getSetting('pricing_plan2_feat3')}
        pricingPlan2Feat4={getSetting('pricing_plan2_feat4')}
        pricingPlan2Price30={getSetting('pricing_plan2_price_30')}
        pricingPlan2Price45={getSetting('pricing_plan2_price_45')}
        pricingPlan2Price60={getSetting('pricing_plan2_price_60')}
        pricingPlan3Name={getSetting('pricing_plan3_name')}
        pricingPlan3Desc={getSetting('pricing_plan3_desc')}
        pricingPlan3Feat1={getSetting('pricing_plan3_feat1')}
        pricingPlan3Feat2={getSetting('pricing_plan3_feat2')}
        pricingPlan3Feat3={getSetting('pricing_plan3_feat3')}
        pricingPlan3Feat4={getSetting('pricing_plan3_feat4')}
        pricingPlan3Price30={getSetting('pricing_plan3_price_30')}
        pricingPlan3Price45={getSetting('pricing_plan3_price_45')}
        pricingPlan3Price60={getSetting('pricing_plan3_price_60')}
      />
      <LatestArticles 
        tagOverride={getSetting('latest_articles_tag')}
        titleOverride={getSetting('latest_articles_title')}
        subtitleOverride={getSetting('latest_articles_subtitle')}
        btnViewAllOverride={getSetting('latest_articles_btn_all')}
        article1Tag={getSetting('article1_tag')}
        article1Title={getSetting('article1_title')}
        article1Desc={getSetting('article1_desc')}
        article1Author={getSetting('article1_author')}
        article1Date={getSetting('article1_date')}
        article1Image={getSetting('article1_image')}
        article2Tag={getSetting('article2_tag')}
        article2Title={getSetting('article2_title')}
        article2Desc={getSetting('article2_desc')}
        article2Author={getSetting('article2_author')}
        article2Date={getSetting('article2_date')}
        article2Image={getSetting('article2_image')}
      />
      <FinalCTA 
        tagOverride={getSetting('final_cta_tag')}
        titleOverride={getSetting('final_cta_title')}
        descOverride={getSetting('final_cta_desc')}
        btnCoursesOverride={getSetting('final_cta_btn_courses')}
        btnContactOverride={getSetting('final_cta_btn_contact')}
      />
    </>
  );
}
