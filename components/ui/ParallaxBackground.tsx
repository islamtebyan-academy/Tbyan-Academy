'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  src: string;
  className?: string;
}

export default function ParallaxBackground({ src, className = '' }: ParallaxBackgroundProps) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <motion.div
      style={{
        y: yBg,
        backgroundImage: `url('${src}')`,
      }}
      className={`absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 scale-110 ${className}`}
    />
  );
}
