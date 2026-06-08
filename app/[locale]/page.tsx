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

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Set the locale for static rendering optimization
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Credibility />
      <ProgramsShowcase />
      <AboutTeaser />
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
