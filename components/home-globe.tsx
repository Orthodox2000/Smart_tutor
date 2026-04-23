"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";

import { RevealOnScroll } from "@/components/reveal-on-scroll";

declare global {
  interface Window {
    VANTA?: {
      GLOBE: (options: Record<string, unknown>) => { destroy?: () => void };
    };
    THREE?: unknown;
  }
}

type PointerState = {
  x: number;
  y: number;
};

export function HomeGlobe() {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<{ destroy?: () => void } | null>(null);
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });
  const topperRows = useMemo(
    () => [
      {
        name: "Ritamvara",
        exam: "SBI PO",
        result: "Selected",
        year: "2025",
        left: "10%",
        top: "23%",
        position: "12% 41%",
        depth: 16,
      },
      {
        name: "Abhishek",
        exam: "Income Tax",
        result: "Officer",
        year: "2025",
        left: "45%",
        top: "18%",
        position: "30% 41%",
        depth: 20,
      },
      {
        name: "Aditya",
        exam: "IIM Kozhikode",
        result: "MBA",
        year: "2024",
        left: "14%",
        top: "60%",
        position: "63% 42%",
        depth: 12,
      },
      {
        name: "Praveen",
        exam: "CGST",
        result: "Inspector",
        year: "2024",
        left: "47%",
        top: "56%",
        position: "82% 42%",
        depth: 18,
      },
    ],
    [],
  );

  useEffect(() => {
    const initialize = () => {
      if (!globeRef.current || !window.VANTA?.GLOBE || !window.THREE) {
        return;
      }

      if (effectRef.current?.destroy) {
        effectRef.current.destroy();
      }

      effectRef.current = window.VANTA.GLOBE({
        el: globeRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0x702dff,
        color2: 0x8f61ff,
        backgroundColor: 0xf6f7fb,
        size: 0.95,
      });
    };

    const timeout = window.setTimeout(initialize, 120);

    return () => {
      window.clearTimeout(timeout);

      if (effectRef.current?.destroy) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = stageRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setPointer({
      x: x * 2,
      y: y * 2,
    });
  }

  function resetPointer() {
    setPointer({ x: 0, y: 0 });
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
        strategy="afterInteractive"
      />

      <section className="section-shell py-10">
        <RevealOnScroll className="surface overflow-hidden rounded-[2rem] p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-2 text-center lg:text-left">
            <p className="section-label">Interactive Results</p>
            <h2 className="section-title mt-0">Smart Tutor achievers in motion</h2>
            <p className="max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
              A live visual field of recent performers, major exams, and result
              outcomes inside one full-width interactive stage.
            </p>
          </div>

          <div
            ref={stageRef}
            className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)]"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <div ref={globeRef} className="home-globe-shell h-[420px] sm:h-[500px] lg:h-[560px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(246,247,251,0.1)_100%)]" />

            <div className="pointer-events-none absolute inset-x-5 top-5 flex flex-wrap items-start justify-between gap-3">
              <div className="rounded-[1.3rem] border border-white/14 bg-[rgba(14,20,34,0.58)] px-4 py-3 text-left text-white backdrop-blur-md">
                <p className="text-[11px] font-semibold tracking-[0.1em] text-white/70">
                  Result wall
                </p>
                <p className="mt-1 text-lg font-semibold">Top performers 2024-25</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/14 bg-[rgba(14,20,34,0.48)] px-4 py-3 text-right text-white backdrop-blur-md">
                <p className="text-[11px] font-semibold tracking-[0.1em] text-white/70">
                  SmartIQ Academy
                </p>
                <p className="mt-1 text-sm font-semibold text-white/86">
                  Exams | Selection | Performance
                </p>
              </div>
            </div>

            {topperRows.map((row, index) => (
              <div
                key={`${row.name}-${row.exam}`}
                className="topper-anchor absolute w-[min(15rem,calc(100%-2.5rem))] max-w-[15rem]"
                style={{ left: row.left, top: row.top }}
              >
                <div
                  className="floating-topper-card rounded-[1.35rem] border border-white/14 bg-[rgba(14,20,34,0.62)] p-3 text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-md"
                  style={{
                    transform: `translate(${pointer.x * row.depth}px, ${pointer.y * row.depth}px)`,
                    transition: "transform 220ms ease",
                    animationDelay: `${index * 220}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/18 bg-white/10">
                      <Image
                        src="/image.png"
                        alt={`${row.name} result profile`}
                        fill
                        className="object-cover scale-[1.35]"
                        style={{ objectPosition: row.position }}
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{row.name}</p>
                      <p className="truncate text-xs text-white/70">{row.exam}</p>
                    </div>
                  </div>

                  <div className="topper-meta mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/8 px-3 py-2">
                      <p className="text-white/56">Result</p>
                      <p className="mt-1 font-semibold text-[#ffe27a]">{row.result}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/8 px-3 py-2">
                      <p className="text-white/56">Year</p>
                      <p className="mt-1 font-semibold text-white/86">{row.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
