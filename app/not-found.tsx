'use client';

import React from 'react';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <title>Page Not Found — Islam Tebyan Academy</title>
      </head>
      <body className="font-sans flex flex-col items-center justify-center min-h-screen m-0 bg-[#FDFAF3] text-[#0d1624] antialiased">
        <h1 className="text-6xl font-bold my-0 mb-4">404</h1>
        <p className="m-0 mb-8 text-[#8b7355] text-lg font-medium">Page Not Found</p>
        <a 
          href="/" 
          className="text-white bg-[#8b7355] py-3 px-7 rounded-full no-underline font-bold text-sm shadow-[0_4px_12px_rgba(139,115,85,0.15)] hover:bg-[#725e45] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Go Home
        </a>
      </body>
    </html>
  );
}

