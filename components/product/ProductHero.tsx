"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const ProductHero: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 pb-12 sm:pb-14">
      {/* Left Column: Pixel Logo + Bio + CTAs (Width ~46%) */}
      <div className="w-full md:w-[46%] space-y-4 sm:space-y-5 flex-shrink-0">
        {/* Exact Pixel Typography Logo from text.png */}
        <div className="select-none">
          <Image
            src="/text.png"
            alt="HI, I'M PALAK BHATT"
            width={240}
            height={48}
            priority
            unoptimized
            className="w-56 sm:w-60 h-auto"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Role Title */}
        <div className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-neutral-900">
          AI, DESIGN &amp; DEVELOPMENT
        </div>

        {/* Bio Paragraphs (Exact copy from mockup) */}
        <div className="space-y-3 text-xs sm:text-[12px] text-neutral-700 leading-relaxed font-mono">
          <p>
            I enjoy building products from concept to deployment, blending user research, product
            thinking, and technology to create meaningful, accessible digital experiences.
          </p>
          <p>
            I’m driven by curiosity and a desire to turn real user needs into products that are
            thoughtful, useful, and impactful.
          </p>
        </div>

        {/* Action Button: EXPLORE MY WORK */}
        <div className="pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all shadow-2xs"
          >
            <span>EXPLORE MY WORK</span>
            <span className="text-sm leading-none">↗</span>
          </Link>
        </div>
      </div>

      {/* Right Column: Candid Speaking Photo in Chamfered Frame with Decorations (Width ~52%) */}
      <div className="w-full md:w-[52%] flex items-center justify-center md:justify-end gap-4 py-2 md:py-0">
        {/* Photo Container with Top-Left Plus and Bottom-Right Pixel Cluster */}
        <div className="relative w-full max-w-[350px] sm:max-w-[385px] aspect-[0.98/1]">
          {/* Top-Left Decorative Green Plus */}
          <div className="absolute -top-3 -left-4 text-[#7ba56a] font-bold text-xl select-none leading-none z-10">
            +
          </div>

          {/* Bottom-Right Decorative Green Pixel Cluster */}
          <div className="absolute -bottom-2.5 -right-3 flex flex-col items-end gap-[2px] z-10 select-none">
            <div className="w-2.5 h-2.5 bg-[#7ba56a]" />
            <div className="w-3.5 h-3.5 border-2 border-[#7ba56a] bg-transparent translate-x-1" />
            <div className="w-2.5 h-2.5 bg-[#7ba56a] translate-x-2" />
          </div>

          {/* Curved Photo Frame */}
          <div className="w-full h-full rounded-[48px] sm:rounded-[56px] overflow-hidden bg-neutral-100 relative">
            <Image
              src="/palak_speaking.jpeg"
              alt="Palak Bhatt"
              fill
              priority
              className="object-cover object-[center_top]"
            />
          </div>
        </div>

        {/* 6 Small Square Hollow Green Glyphs Stacked Vertically on Far Right */}
        <div className="hidden sm:flex flex-col gap-3 py-4 select-none">
          <div className="w-3 h-3 border border-[#7ba56a]" />
          <div className="w-3 h-3 border border-[#7ba56a]" />
          <div className="w-3 h-3 border border-[#7ba56a]" />
          <div className="w-3 h-3 border border-[#7ba56a]" />
          <div className="w-3 h-3 border border-[#7ba56a]" />
          <div className="w-3 h-3 border border-[#7ba56a]" />
        </div>
      </div>
    </section>
  );
};
