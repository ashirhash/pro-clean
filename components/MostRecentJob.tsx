"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function MostRecentJob() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  const updatePosition = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    updatePosition(e.clientX);
  };

  return (
    <section className="bg-white text-ink py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <div className="text-[13px] font-bold tracking-[0.14em] uppercase text-ink/50 mb-3">
            End of Tenancy Cleaning
          </div>
          <h2 className="font-luckiest font-extrabold text-[clamp(28px,4vw,44px)] leading-[1.05] m-0">
            Kitchen Deep Clean
          </h2>
          <p className="mt-3 text-ink/60 text-base md:text-lg">
            Drag the slider to see the kind of results our end of tenancy
            cleans deliver.
          </p>
        </div>
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden select-none touch-none cursor-ew-resize"
      >
       <Image
            src="/dirty_kitchen.png"
            alt="Kitchen before Pro Clean Bristol's end of tenancy clean"
            fill
            priority
            draggable={false}
            sizes="100vw"
            className="object-cover pointer-events-none"
          />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          
           <Image
          src="/clean_kitchen.png"
          alt="Kitchen after Pro Clean Bristol's end of tenancy clean"
          fill
          priority
          draggable={false}
          sizes="100vw"
          className="object-cover pointer-events-none"
        />
        </div>

        <span className="absolute top-4 left-4 md:top-6 md:left-6 text-white text-xs font-bold uppercase tracking-[0.08em] bg-ink/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          Before
        </span>
        <span className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-xs font-bold uppercase tracking-[0.08em] bg-ink/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          After
        </span>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-ink">
              <path d="M8 7l-5 5 5 5V7z" />
              <path d="M16 7l5 5-5 5V7z" />
            </svg>
          </div>
        </div>
      </div>
      </div>

    </section>
  );
}
