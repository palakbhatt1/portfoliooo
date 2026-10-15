"use client";

import React from "react";
import {
  GithubIcon,
  LinkedinIcon,
  LeetCodeIcon,
  BehanceIcon,
  InstagramIcon,
} from "@/components/ui/Icons";

export const ProductWorkWithConnect: React.FC = () => {
  const socialLogos = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/palakbhatt1",
      icon: <LinkedinIcon className="w-4 h-4" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/palakbhatt1",
      icon: <GithubIcon className="w-4 h-4" />,
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/palakbhatt01",
      icon: <LeetCodeIcon className="w-4 h-4" />,
    },
    {
      name: "Behance",
      href: "https://www.behance.net/palakbhatt13",
      icon: <BehanceIcon className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/_palakbhatt__",
      icon: <InstagramIcon className="w-4 h-4" />,
    },
  ];

  return (
    <section id="contact" className="border-t border-neutral-200 pt-10 sm:pt-12 font-space-mono">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
        {/* Main Connect Content */}
        <div className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <h2 className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-neutral-900">
              LET&apos;S CONNECT
            </h2>
            <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-mono">
              Have an idea worth exploring? Open for new opportunities, creative collaborations, or
              just a friendly chat.
            </p>
          </div>

          {/* Action Stack: Social Logos on top, then direct Mail below */}
          <div className="flex flex-col items-start gap-3 pt-1">
            {/* Social Logos for LinkedIn, GitHub, LeetCode, Behance, Instagram */}
            <div className="flex items-center gap-2">
              {socialLogos.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className="w-10 h-10 border border-neutral-300 bg-white flex items-center justify-center text-neutral-800 hover:text-white hover:bg-neutral-900 hover:border-neutral-900 transition-all shadow-2xs group"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            {/* Direct Email (below logos, 0 space between email and arrow) */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=bhattpalak234@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send email via Gmail"
              className="group inline-flex items-center text-xs sm:text-[13px] font-bold text-neutral-900 hover:text-neutral-600 transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 font-mono pt-1"
            >
              <span>bhattpalak234@gmail.com</span><span className="text-sm font-normal leading-none transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>
        </div>

        {/* Animated Pixel Frog Mascot (Idle squish loop) */}
        <div className="flex-shrink-0 self-end md:self-end select-none pb-1 group">
          <div
            className="relative w-36 h-24 sm:w-42 sm:h-28 md:w-48 md:h-32 overflow-hidden select-none transition-transform group-hover:scale-105"
            title="Ribbit! 🐸"
          >
            <div
              className="w-[400%] h-full animate-frog-idle"
              style={{
                backgroundImage: "url('/frog_tight_spritesheet_8x.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
