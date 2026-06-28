'use client';

import React from 'react';
import Image from 'next/image';
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
      }}
      className={`absolute inset-0 pointer-events-none z-0 scale-110 ${className}`}
    >
      <Image
        src={src}
        alt="Academy Background"
        fill
        priority
        sizes="100vw"
        quality={75}
        className="object-cover object-center"
      />
    </motion.div>
  );
}
