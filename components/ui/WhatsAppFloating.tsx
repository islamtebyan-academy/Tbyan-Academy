'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppFloating() {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  // Custom tooltips depending on active language
  const tooltipText = 
    locale === 'ar' ? 'تواصل معنا عبر واتساب' : 
    locale === 'fr' ? 'Discuter sur WhatsApp' : 
    'Chat with us on WhatsApp';

  const whatsappNumber = '201019281416';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 flex-row-reverse"
    >
      {/* Tooltip Label */}
      <AnimatePresence>
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`hidden sm:flex px-4 py-2 bg-[#FDFAF3] text-navy-brand border border-gold-muted/30 shadow-[0_8px_24px_rgba(139,115,85,0.12)] rounded-full text-xs font-bold items-center gap-1.5 hover:border-gold hover:text-gold hover:shadow-[0_12px_32px_rgba(139,115,85,0.18)] transition-all duration-300 ${
            isRtl ? 'font-cairo' : 'font-dm'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{tooltipText}</span>
        </motion.a>
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        title={tooltipText}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0px 20px 40px rgba(37, 211, 102, 0.3)" 
        }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(37,211,102,0.25)] relative focus:outline-none cursor-pointer"
      >
        {/* Pulsing Outer Rings for Premium Aesthetic */}
        <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-20 animate-ping pointer-events-none" />
        <span className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#25D366]/40 to-[#128C7E]/40 opacity-10 animate-pulse pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg 
          className="w-7 h-7 relative z-10 filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path d="M12.031 2C6.479 2 2 6.478 2 12.029c0 1.91.536 3.693 1.463 5.23L2 22l4.908-1.428c1.464.843 3.142 1.328 4.937 1.328 5.551 0 10.03-4.478 10.03-10.029C22.062 6.478 17.582 2 12.03 2zm6.604 14.148c-.273.766-1.584 1.393-2.185 1.463-.547.062-1.258.093-2.032-.156-.475-.152-1.077-.384-1.848-.718-3.238-1.4-5.323-4.66-5.485-4.878-.162-.218-1.309-1.745-1.309-3.328 0-1.584.829-2.361 1.127-2.673.3-.312.656-.39.875-.39.219 0 .438.001.625.01.2.01.469-.077.734.56.28.673.969 2.373 1.053 2.54.084.167.141.362.031.583-.11.22-.162.36-.328.553-.167.193-.35.43-.5.58-.168.167-.343.349-.147.684.197.336.877 1.444 1.879 2.336 1.292 1.152 2.378 1.509 2.715 1.677.337.168.536.14.734-.093.2-.234.86-.998 1.09-1.342.23-.343.46-.28.77-.168.312.112 1.977.93 2.321 1.099.343.169.57.252.654.394.084.14.084.812-.19 1.578z"/>
        </svg>
      </motion.a>
    </div>
  );
}
