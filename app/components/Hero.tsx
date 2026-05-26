"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(245,246,247,1))] px-6 py-10">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-white/80 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#dfe3e6]/60 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white shadow-xl">
            <Logo className="h-14 w-14 text-[#1f2428]" />
          </div>

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            Premium personal finance app
          </p>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Your entire financial life, beautifully organized.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f6b73]">
            Damsera helps you manage transactions, budgets, accounts, credit
            cards, subscriptions, loans, reports and your financial calendar
            across iPhone and Mac.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="rounded-full bg-[#1f2428] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-black cursor-pointer"
            >
              Download
            </a>

            <a
              href="#features"
              className="rounded-full border border-[#d7dce0] bg-white px-7 py-4 text-center text-sm font-semibold text-[#1f2428] transition hover:border-[#1f2428]"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.08,
          }}
          className="relative flex min-h-[560px] items-center justify-center"
        >
          <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dfe3e6]/45 blur-[90px]" />
          <div className="absolute right-12 top-20 h-44 w-44 rounded-full bg-white/70 blur-[80px]" />

          {/* MacBook */}
          <div className="relative z-20 w-full max-w-[920px]">
            <div className="absolute left-1/2 top-1/2 h-[18rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dfe3e6]/25 blur-[120px]" />

            <Image
              src="/images/hero/Macbook-iPhone-Hero.svg"
              alt="Damsera MacBook Preview"
              width={2400}
              height={1500}
              priority
              className="relative h-auto w-full object-contain drop-shadow-[0_50px_140px_rgba(0,0,0,0.24)]"
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
}