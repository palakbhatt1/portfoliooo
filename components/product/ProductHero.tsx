"use client";

import React from "react";
import Image from "next/image";
import { HoldButton } from "@/components/ui/HoldButton";

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

        {/* Bio Paragraphs */}
        <div className="space-y-3 text-xs sm:text-[12px] text-neutral-700 leading-relaxed font-mono">
          <p>
            I enjoy working at the intersection of AI, design, and product development, combining
            technical exploration, product thinking, and user-centered design to turn ideas into
            meaningful digital experiences.
          </p>
          <p>
            Driven by curiosity, I enjoy exploring AI/ML, understanding user needs, and building
            thoughtful, useful products that solve real-world problems.
          </p>
        </div>

        {/* Action Button: EXPLORE MY WORK (Hold to Activate) */}
        <div className="pt-2">
          <HoldButton
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
          >
            <span>EXPLORE MY WORK</span>
            <span className="text-sm leading-none">↗</span>
          </HoldButton>
        </div>
      </div>

      {/* Right Column: Candid Speaking Photo in Chamfered Frame (Width ~52%) */}
      <div className="w-full md:w-[52%] flex items-center justify-center md:justify-end py-2 md:py-0">
        {/* Photo Container */}
        <div className="relative w-full max-w-[350px] sm:max-w-[385px] aspect-[0.98/1]">
          {/* Curved Photo Frame */}
          <div className="w-full h-full rounded-[48px] sm:rounded-[56px] overflow-hidden bg-neutral-100 relative">
            <Image
              src="/palak_speaking.jpeg"
              alt="Palak Bhatt"
              fill
              priority
              unoptimized
              sizes="(max-width: 640px) 350px, 385px"
              className="object-cover object-[center_top]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
