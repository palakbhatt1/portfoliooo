"use client";

import React, { useEffect, useRef, useState } from "react";

interface CardLightReflectionProps {
  className?: string;
  /** Initial angle in degrees (default 135) */
  initialAngle?: number;
  /** Multiplier for reflection intensity (default 1) */
  intensity?: number;
}

/**
 * CardLightReflection
 *
 * Implements a center-anchored semicircle light reflection on the Creative License card:
 * 1. Fixed Center: Rotation origin and center are fixed at 50% 50%. It never translates or slides.
 * 2. Semicircle Form: The curved perimeter of the semicircle points towards wherever the cursor is located.
 * 3. Major Focus on Diameter: Concentrated specular gleam along the straight diameter dividing line through the center.
 * 4. Subtle Specular Wash: A soft, delicate wash across the semicircle body creates a light difference on the card.
 * 5. Feathered Disguise: Outer curved boundary fades smoothly into the card graphics with no hard geometrical edge.
 * 6. Global Cursor Tracking: Responsive across the entire viewport, remaining visible when cursor stops or exits.
 * 7. Stationary Card: The reflection rotates smoothly around the center while the card stays stationary.
 * 8. Hydration Safe: Client-mounted rendering prevents SSR style serialization differences.
 */
export const CardLightReflection: React.FC<CardLightReflectionProps> = ({
  className = "",
  initialAngle = 135,
  intensity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Angle tracking refs
  const targetAngleRef = useRef(initialAngle);
  const currentAngleRef = useRef(initialAngle);
  const rafId = useRef<number | null>(null);

  // Directly apply transform rotation to the DOM node for 60/120fps performance
  const applyAngle = (angle: number) => {
    if (!layerRef.current) return;
    layerRef.current.style.transform = `translate(-50%, -50%) rotate(${angle.toFixed(2)}deg)`;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Set initial resting rotation
    applyAngle(currentAngleRef.current);

    // Smooth RAF lerp loop with shortest-arc angular distance
    const tick = () => {
      const target = targetAngleRef.current;
      let current = currentAngleRef.current;

      // Calculate shortest angular distance (-180 to +180)
      let diff = (target - current) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      if (Math.abs(diff) > 0.05) {
        current += diff * 0.18;
        currentAngleRef.current = current;
        applyAngle(current);
        rafId.current = requestAnimationFrame(tick);
      } else {
        currentAngleRef.current = target;
        applyAngle(target);
        rafId.current = null;
      }
    };

    const startAnimation = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(tick);
      }
    };

    // Track cursor across the entire viewport and calculate angle relative to card center
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;

      // Calculate card's exact center in viewport coordinates
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      const cursorX = e.clientX;
      const cursorY = e.clientY;

      // Calculate cursor's direction relative to card's center using atan2(cursorY - centerY, cursorX - centerX)
      const rad = Math.atan2(cursorY - centerY, cursorX - centerX);
      const deg = rad * (180 / Math.PI);

      // The curve of the semicircle points directly toward the cursor (e.g. bottom-right cursor -> bottom-right curve)
      targetAngleRef.current = deg + 90;

      startAnimation();
    };

    // Touch device fallback support
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      handlePointerMove({
        clientX: touch.clientX,
        clientY: touch.clientY,
      } as MouseEvent);
    };

    // Global viewport listeners
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isMounted]);

  // Specular opacity values: softer, refined white shade around diameter with subtle wash
  const coreGleam = Math.min(1, 0.68 * intensity);
  const diameterGleam = Math.min(1, 0.42 * intensity);
  const bodyWash = Math.min(1, 0.22 * intensity);
  const edgeWash = Math.min(1, 0.06 * intensity);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      {/*
        Center-anchored semicircle reflection (fixed at 50% 50%):
        - Curved perimeter points towards cursor position across viewport.
        - Straight diameter line cuts through the exact card center.
        - Major focus and gleam concentrated along the diameter edge.
        - Subtle, feathered wash across the semicircle body disguised into card graphics.
        - Outer boundary softly fades to avoid hard geometrical outline.
        - Rotates continuously around center; remains visible when cursor leaves card.
      */}
      {isMounted && (
        <div
          ref={layerRef}
          suppressHydrationWarning
          className="absolute pointer-events-none will-change-transform"
          style={{
            top: "50%",
            left: "50%",
            width: "clamp(190px, 42%, 260px)",
            height: "clamp(190px, 42%, 260px)",
            transform: `translate(-50%, -50%) rotate(${initialAngle}deg)`,
            transformOrigin: "50% 50%",
            borderRadius: "50%",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black 0%, black 50%, rgba(0,0,0,0.38) 75%, transparent 100%)",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 0%, black 50%, rgba(0,0,0,0.38) 75%, transparent 100%)",
            background: `linear-gradient(
              180deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, ${edgeWash}) 20%,
              rgba(255, 255, 255, ${bodyWash}) 42%,
              rgba(255, 255, 255, ${diameterGleam}) calc(50% - 3.5px),
              rgba(255, 255, 255, ${coreGleam}) 50%,
              rgba(255, 255, 255, 0) calc(50% + 2px),
              rgba(255, 255, 255, 0) 100%
            )`,
          }}
        />
      )}
    </div>
  );
};
