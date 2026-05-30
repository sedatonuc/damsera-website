"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const content = (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Premium Apple-Style Logo squircle container */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-neutral-100/80 transition-transform duration-300 hover:scale-[1.03]">
        <Logo className="h-13 w-13 text-[#1f2428]" />
      </div>

      {/* Live Badge for Premium Tag */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1f2428] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1f2428]"></span>
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5f6b73]">
          Premium Personal Finance
        </span>
      </div>

      {/* Elegant Typography with metallic Charcoal Gradient */}
      <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-[#1f2428] sm:text-6xl lg:text-7xl !leading-[1.1]">
        Your entire financial life,<br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-[#1f2428] via-[#5f6b73] to-[#1f2428] bg-clip-text text-transparent">
          beautifully organized.
        </span>
      </h1>

      {/* Structured Paragraph */}
      <p className="mt-8 max-w-2xl text-[17px] leading-8 text-[#5f6b73] mx-auto font-normal">
        Damsera helps you manage transactions, budgets, accounts, credit
        cards, subscriptions, loans, reports and your financial calendar
        across iPhone, iPad and Mac.
      </p>

      {/* Polished Call to Actions with subtle scale and shadow lift */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center items-center w-full">
        <a
          href="#pricing"
          className="w-full sm:w-auto rounded-full bg-[#1f2428] px-8 py-4 text-center text-sm font-semibold text-white shadow-[0_12px_30px_rgba(31,36,40,0.12)] transition-all duration-300 hover:bg-black hover:shadow-[0_18px_36px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          Download App
        </a>

        <a
          href="#features"
          className="w-full sm:w-auto rounded-full border border-[#d7dce0] bg-white/70 px-8 py-4 text-center text-sm font-semibold text-[#1f2428] shadow-[0_4px_12px_rgba(0,0,0,0.01)] backdrop-blur-md transition-all duration-300 hover:border-[#1f2428] hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:translate-y-0"
        >
          Explore Features
        </a>
      </div>
    </div>
  );

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(245,246,247,1))] px-6 py-10">
      {/* Organic Background Ambient Glows */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-white/80 blur-[100px]" />
      <div className="pointer-events-none absolute right-[-10%] top-1/3 h-96 w-96 rounded-full bg-[#dfe3e6]/60 blur-[120px]" />
      <div className="pointer-events-none absolute left-[-10%] bottom-10 h-80 w-80 rounded-full bg-[#dfe3e6]/40 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-4xl flex flex-col items-center justify-center">
        {isMobile ? (
          content
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center"
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
}