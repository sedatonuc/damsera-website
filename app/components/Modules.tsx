"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  BadgeDollarSign,
  CalendarDays,
  ChartNoAxesCombined,
  CreditCard,
  FileText,
  Landmark,
  LayoutDashboard,
  PiggyBank,
  Repeat,
  Tags,
  Target,
  Wallet,
} from "lucide-react";

const modules = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    description:
      "Get a complete overview of your financial life with monthly summaries, cash position, upcoming bills, budget risks and smart insights.",
  },
  {
    title: "Transactions",
    icon: ArrowLeftRight,
    description:
      "Record income, expenses and transfers with categories, subcategories, tags, accounts and recurring rules.",
  },
  {
    title: "Budgets",
    icon: PiggyBank,
    description:
      "Create monthly budgets, monitor spending limits and understand where your money is going before it is too late.",
  },
  {
    title: "Accounts",
    icon: Wallet,
    description:
      "Manage your bank accounts, balances and account-level activity from one clean workspace.",
  },
  {
    title: "Credit Cards",
    icon: CreditCard,
    description:
      "Track card balances, spending, payment dates and upcoming credit card obligations.",
  },
  {
    title: "Subscriptions",
    icon: Repeat,
    description:
      "Follow recurring payments, renewal dates, monthly costs and subscription pressure.",
  },
  {
    title: "Loans",
    icon: Landmark,
    description:
      "Manage loan terms, payment plans, installments, related transactions and payoff strategy.",
  },
  {
    title: "Debts",
    icon: BadgeDollarSign,
    description:
      "Track debt balances, payment history, service pressure and repayment progress.",
  },
  {
    title: "Reports",
    icon: FileText,
    description:
      "Generate clean financial summaries, analyze income vs expense and export PDF-style reports.",
  },
  {
    title: "Cashflow",
    icon: ChartNoAxesCombined,
    description:
      "Visualize how income, expenses, savings and debts move through your financial life with flow-based analysis.",
  },
  {
    title: "Calendar",
    icon: CalendarDays,
    description:
      "See bills, installments, subscriptions, salary events and important financial dates in one calendar.",
  },
  {
    title: "Goals",
    icon: Target,
    description:
      "Create savings goals, monitor progress and keep long-term financial targets visible.",
  },
  {
    title: "Categories",
    icon: Tags,
    description:
      "Organize your financial data with categories, subcategories and reusable classification rules.",
  },
];

export default function Modules() {
  const [selected, setSelected] = useState(modules[0]);
  const SelectedIcon = selected.icon;

  return (
    <section id="modules" className="bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
              Modular System
            </p>

            <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
              Build your own financial workspace.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6b73]">
              Damsera is designed as a modular finance system. Enable only the
              tools you need and keep your experience clean, focused and
              personalized.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Enable or disable modules",
                "Customize your dashboard",
                "Track everything in one place",
                "Designed for Apple devices",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#1f2428]" />
                  <p className="font-medium text-[#1f2428]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/overview"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#1f2428] px-7 py-4 text-center text-sm font-semibold text-white shadow-[0_12px_24px_rgba(31,36,40,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_18px_36px_rgba(0,0,0,0.2)] active:translate-y-0"
              >
                <span>Explore Modules in Detail</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <div className="mt-10 rounded-[32px] border border-black/5 bg-[#f8f9fa] p-7 shadow-[0_20px_70px_rgba(31,36,40,0.07)]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                <SelectedIcon
                  className="h-6 w-6 text-[#111827]"
                  strokeWidth={2.2}
                />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#697077]">
                Selected Module
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#111827]">
                {selected.title}
              </h3>

              <p className="mt-4 text-base leading-7 text-[#5f6b73]">
                {selected.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = selected.title === module.title;

              return (
                <button
                  key={module.title}
                  type="button"
                  onClick={() => setSelected(module)}
                  className={`rounded-[28px] border p-5 text-left transition duration-300 ${isActive
                    ? "border-[#1f2428]/20 bg-white shadow-[0_20px_60px_rgba(31,36,40,0.12)]"
                    : "border-[#e4e7ea] bg-[#f8f9fa] hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    }`}
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition ${isActive
                      ? "bg-[#1f2428] text-white"
                      : "bg-white text-[#111827] shadow-sm"
                      }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>

                  <h3 className="font-semibold tracking-tight text-[#1f2428]">
                    {module.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}