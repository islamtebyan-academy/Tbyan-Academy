'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface PortalButtonProps {
  href: string;
  className?: string;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function PortalButton({ href, className, title, children, icon }: PortalButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPending) return;
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`${className} ${isPending ? 'opacity-75 pointer-events-none cursor-wait' : ''}`}
      title={title}
      type="button"
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
