"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(245,246,247,1))] px-6 py-10">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-white/80 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#dfe3e6]/60 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
            across iPhone, iPad and Mac.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a className="rounded-full bg-[#1f2428] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-black">
              Coming Soon
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
  initial={{ opacity: 0, scale: 0.92, y: 40 }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0,
  }}
  transition={{
    duration: 1,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative"
>
          <div className="absolute inset-0 rounded-full bg-[#dfe3e6] opacity-70 blur-3xl" />

          <div className="relative mx-auto max-w-sm rounded-[44px] bg-[#1f2428] p-3 shadow-2xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_40px_120px_rgba(0,0,0,0.18)]">
            <div className="rounded-[36px] bg-[#f5f6f7] p-5">
              <div className="mx-auto mb-5 h-1.5 w-20 rounded-full bg-[#c7ccd1]" />

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#697077]">Total Balance</p>
                  <h2 className="mt-1 text-3xl font-semibold">₺128,450</h2>
                </div>

                <div className="rounded-full bg-[#e8f3ee] px-3 py-1 text-xs font-semibold text-[#0f7a4f]">
                  +12.4%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Income", "₺42,800"],
                  ["Expense", "₺18,250"],
                  ["Savings", "₺15,000"],
                  ["Debt", "₺9,700"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-3xl bg-white p-4 shadow-sm"
                  >
                    <p className="text-xs text-[#697077]">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Upcoming Payments</p>
                  <span className="text-xs text-[#697077]">May</span>
                </div>

                <div className="space-y-3">
                  {[
                    ["Mortgage", "May 12", "₺8,500"],
                    ["Credit Card", "May 18", "₺4,250"],
                    ["Netflix", "May 21", "₺229"],
                  ].map(([name, date, amount]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-2xl bg-[#f5f6f7] px-3 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-[#697077]">{date}</p>
                      </div>
                      <p className="text-sm font-semibold">{amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}