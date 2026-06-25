'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteConfirmButtonProps {
  isRtl: boolean;
  titleText?: string;
  confirmMessage?: string;
  size?: number;
}

export default function DeleteConfirmButton({ 
  isRtl, 
  titleText, 
  confirmMessage,
  size = 13 
}: DeleteConfirmButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (buttonRef.current && buttonRef.current.form) {
      buttonRef.current.form.requestSubmit();
    }
  };

  const title = titleText || (isRtl ? 'حذف' : 'Delete');
  const msg = confirmMessage || (isRtl
    ? 'هل أنت متأكد من رغبتك في حذف هذا العنصر نهائياً؟ لا يمكن التراجع عن هذا الإجراء.'
    : 'Are you sure you want to permanently delete this item? This action cannot be undone.');

  return (
    <>
      <button
        ref={buttonRef}
        type="submit"
        onClick={handleClick}
        title={title}
        aria-label={title}
        className="p-2 rounded-lg text-rose-600 hover:text-rose-100 hover:bg-rose-600 border border-gold/15 hover:border-rose-600 transition-all duration-300 cursor-pointer"
      >
        <Trash2 size={size} />
      </button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0d1624]/75 backdrop-blur-sm animate-fade-in font-ui">
          {/* Backdrop Dismiss */}
          <div className="absolute inset-0 cursor-default animate-fade-in" onClick={() => setIsOpen(false)} />

          {/* Dialog Container */}
          <div className="w-full max-w-md bg-gradient-to-b from-white to-[#FDFAF3] border border-rose-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-start animate-fade-up relative z-10 p-6 space-y-4">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-rose-500/20 via-rose-600 to-rose-500/20 opacity-80" />

            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-full shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-1.5 flex-grow">
                <h4 className="text-sm font-bold text-midnight font-primary">
                  {isRtl ? 'تأكيد عملية الحذف' : 'Confirm Deletion'}
                </h4>
                <p className="text-xs text-stone/75 leading-relaxed font-ui">
                  {msg}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 bg-gold-muted/5 hover:bg-gold-muted/10 text-stone border border-gold-muted/15 rounded-xl text-xs font-semibold cursor-pointer transition-colors font-ui"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/10 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-1.5 font-ui"
              >
                <Trash2 size={13} />
                <span>{isRtl ? 'تأكيد الحذف' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
