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
  let heroTagline = undefined;
  let heroHeadline = undefined;
  let heroDescription = undefined;
  let aboutTeaserTitle = undefined;
  let aboutTeaserDescription = undefined;

  try {
    const supabase = await createClient();
    const { data: dbSettings } = await supabase
      .from('settings')
      .select('*');

    if (dbSettings) {
      const settingsMap: Record<string, any> = {};
      dbSettings.forEach((s) => {
        settingsMap[s.key] = s.value;
      });

      heroTagline = settingsMap.hero_tagline?.[locale];
      heroHeadline = settingsMap.hero_headline?.[locale];
      heroDescription = settingsMap.hero_description?.[locale];
      aboutTeaserTitle = settingsMap.about_teaser_title?.[locale];
      aboutTeaserDescription = settingsMap.about_teaser_description?.[locale];
    }
  } catch (error) {
    console.error('Error loading homepage settings from Supabase:', error);
  }

  return (
    <>
      <Hero 
        taglineOverride={heroTagline}
        headlineOverride={heroHeadline}
        descriptionOverride={heroDescription}
      />
      <Credibility />
      <ProgramsShowcase />
      <AboutTeaser 
        titleOverride={aboutTeaserTitle}
        subtitleOverride={aboutTeaserDescription}
      />
      <Methodology />
      <FeaturedCourses />
      <TeachersSpotlight />
      <Testimonials />
      <HowItWorks />
      <PricingTeaser />
      <LatestArticles />
      <FinalCTA />
    </>
  );
}
