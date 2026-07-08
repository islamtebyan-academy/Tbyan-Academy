'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  className?: string;
  isRtl?: boolean;
}

export default function SubmitButton({ className, isRtl }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} ${pending ? 'opacity-80 pointer-events-none cursor-wait' : ''} flex items-center justify-center gap-2`}
    >
      {pending && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
      <span>
        {pending 
          ? (isRtl ? 'جاري الحفظ...' : 'Saving...') 
          : (isRtl ? 'حفظ التعديلات' : 'Save Changes')
        }
      </span>
    </button>
  );
}
