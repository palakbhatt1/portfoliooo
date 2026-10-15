"use client";

import React from "react";
import Link from "next/link";

export const ProductFooter: React.FC = () => {
  return (
    <footer className="pt-14 mt-12 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-space-mono">
      <div className="flex items-center gap-4 text-neutral-900 font-bold">
        <a href="mailto:palakbhatt234@gmail.com" className="hover:underline">
          Email ↗
        </a>
        <span className="text-neutral-300">&bull;</span>
        <a
          href="https://linkedin.com/in/palak-bhatt"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn ↗
        </a>
        <span className="text-neutral-300">&bull;</span>
        <a
          href="https://github.com/palak-bhatt"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub ↗
        </a>
        <span className="text-neutral-300">&bull;</span>
        <Link href="/resume" className="hover:underline">
          Resume ↗
        </Link>
      </div>

      <div>Palak Bhatt &copy; 2026</div>
    </footer>
  );
};
