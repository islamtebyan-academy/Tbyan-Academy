'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  src: string;
  className?: string;
}

function DesktopParallax({ src, className }: Required<ParallaxBackgroundProps>) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <motion.div style={{ y: yBg }} className={`absolute inset-0 pointer-events-none z-0 scale-110 hidden md:block ${className}`}>
      <Image src={src} alt="" fill priority sizes="100vw" quality={75} className="object-cover object-center" />
    </motion.div>
  );
}

export default function ParallaxBackground({ src, className = '' }: ParallaxBackgroundProps) {
  return (
    <>
      <div className={`absolute inset-0 pointer-events-none z-0 md:hidden ${className}`}>
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover object-center"
        />
      </div>
      <DesktopParallax src={src} className={className} />
    </>
  );
}
