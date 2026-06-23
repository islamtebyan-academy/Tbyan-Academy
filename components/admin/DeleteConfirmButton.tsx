'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const msg = confirmMessage || (isRtl
      ? 'هل أنت متأكد من رغبتك في حذف هذا العنصر نهائياً؟ لا يمكن التراجع عن هذا الإجراء.'
      : 'Are you sure you want to permanently delete this item? This action cannot be undone.');
    
    if (!window.confirm(msg)) {
      e.preventDefault();
    }
  };

  const title = titleText || (isRtl ? 'حذف' : 'Delete');

  return (
    <button
      type="submit"
      onClick={handleClick}
      title={title}
      aria-label={title}
      className="p-2 rounded-lg text-rose-600 hover:text-rose-100 hover:bg-rose-600 border border-gold/15 hover:border-rose-600 transition-all duration-300 cursor-pointer"
    >
      <Trash2 size={size} />
    </button>
  );
}
