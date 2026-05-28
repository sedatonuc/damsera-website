"use client";

import { useState } from "react";
import {
  TrendingUp,
  Activity,
  Coins,
  BrainCircuit,
  Zap,
  LayoutGrid,
  Monitor,
  Lightbulb,
  CheckCircle2,
  Wallet,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function DashboardFocus() {
  const [cashflowMode, setCashflowMode] = useState<"flow" | "chart">("flow");
  const [selectedPeriod, setSelectedPeriod] = useState<
    "weekly" | "monthly" | "yearly"
  >("monthly");

  return (
    <section
      id="dashboard-focus"
      className="relative overflow-hidden bg-[#f5f6f7] px-6 pt-16 pb-28 text-[#1f2428]"
    >
      <div className="pointer-events-none absolute left-1/4 top-16 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d7dce0] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#697077] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#1f2428]" />
            Module Focus
          </span>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Control Center: Dashboard Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            The Dashboard module works as Damsera’s control center. It gives
            users a clear financial overview, smart insights and fast access to
            every important action.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-[42px] border border-[#e1e5e8] bg-white p-5 shadow-[0_40px_120px_rgba(31,36,40,0.12)]  sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <div className="flex flex-col justify-between rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-6">
              <div>
                <div className="mb-8 flex items-center gap-2.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>

                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">
                  Cashflow Explorer
                </p>

                <div className="space-y-2">
                  {[
                    { key: "flow", label: "Flow Mode", icon: Activity },
                    { key: "chart", label: "Chart Mode", icon: TrendingUp },
                  ].map((item) => {
                    const Icon = item.icon;
                    const active = cashflowMode === item.key;

                    return (
                      <button
                        key={item.key}
                        onClick={() =>
                          setCashflowMode(item.key as "flow" | "chart")
                        }
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          active
                            ? "bg-[#1f2428] text-white shadow-lg shadow-black/10"
                            : "text-[#5f6b73] hover:bg-white hover:text-[#1f2428]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                <p className="mb-4 mt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">
                  Period Select
                </p>

                <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                  {(["weekly", "monthly", "yearly"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`rounded-xl py-2 text-[11px] font-semibold capitalize transition ${
                        selectedPeriod === period
                          ? "bg-[#1f2428] text-white"
                          : "text-[#697077] hover:bg-[#f1f3f5]"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[#e1e5e8] bg-white p-4 text-[11px] leading-relaxed text-[#697077]">
                <span className="font-semibold text-[#1f2428]">
                  Live Simulation:
                </span>{" "}
                Toggle periods and modes to preview data flow.
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-6 grid gap-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Total Income",
                      val:
                        selectedPeriod === "weekly"
                          ? "$1,850"
                          : selectedPeriod === "monthly"
                            ? "$7,400"
                            : "$88,800",
                      color: "text-[#059669]",
                    },
                    {
                      label: "Total Expenses",
                      val:
                        selectedPeriod === "weekly"
                          ? "$1,120"
                          : selectedPeriod === "monthly"
                            ? "$4,480"
                            : "$53,760",
                      color: "text-[#dc2626]",
                    },
                    {
                      label: "Net Balance",
                      val:
                        selectedPeriod === "weekly"
                          ? "+$730"
                          : selectedPeriod === "monthly"
                            ? "+$2,920"
                            : "+$35,040",
                      color: "text-[#1f2428]",
                    },
                    {
                      label: "Savings Rate",
                      val: "39.4%",
                      color: "text-[#d97706]",
                    },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-3xl border border-[#e1e5e8] bg-white p-4 shadow-sm"
                    >
                      <p className="text-[10px] uppercase tracking-[0.12em] text-[#8b949b]">
                        {metric.label}
                      </p>
                      <p
                        className={`mt-2 text-xl font-bold tracking-tight ${metric.color}`}
                      >
                        {metric.val}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex min-h-[280px] flex-col justify-center rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-6">
                  {cashflowMode === "flow" ? (
                    <div>
                      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b949b]">
                        Cashflow Explorer: Flow Mode
                      </p>

                      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
                        <div className="space-y-3">
                          <FlowCard label="Primary Salary" value="82%" tone="green" />
                          <FlowCard label="Investment Income" value="18%" tone="green" />
                        </div>

                        <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-[#a0a7ad] sm:rotate-0" />

                        <div className="rounded-3xl border border-[#d7dce0] bg-white p-5 text-center shadow-sm">
                          <p className="text-[10px] uppercase tracking-widest text-[#8b949b]">
                            Central Pool
                          </p>
                          <p className="mt-1 text-lg font-bold">Net Cash</p>
                          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#d7dce0]" />
                        </div>

                        <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-[#a0a7ad] sm:rotate-0" />

                        <div className="space-y-3">
                          <FlowCard label="Housing & Bills" value="42%" tone="red" />
                          <FlowCard label="Food & Living" value="18%" tone="red" />
                          <FlowCard label="Savings / Goals" value="40%" tone="amber" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b949b]">
                        Cashflow Explorer: Chart Mode
                      </p>

                      <div className="flex h-40 items-end justify-around gap-4">
                        {[
                          { month: "Jan", inflow: 70, outflow: 45 },
                          { month: "Feb", inflow: 85, outflow: 52 },
                          { month: "Mar", inflow: 78, outflow: 58 },
                          { month: "Apr", inflow: 92, outflow: 60 },
                          { month: "May", inflow: 88, outflow: 54 },
                        ].map((d) => (
                          <div key={d.month} className="flex flex-1 flex-col items-center">
                            <div className="flex h-32 w-full items-end justify-center gap-1.5">
                              <div
                                className="w-3 rounded-t-md bg-[#059669] sm:w-5"
                                style={{ height: `${d.inflow}%` }}
                              />
                              <div
                                className="w-3 rounded-t-md bg-[#dc2626] sm:w-5"
                                style={{ height: `${d.outflow}%` }}
                              />
                            </div>
                            <span className="mt-3 text-[10px] font-semibold text-[#8b949b]">
                              {d.month}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-start gap-4 rounded-[32px] border border-[#e1e5e8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1f2428] text-white">
                  <BrainCircuit className="h-5 w-5" />
                </div>

                <div>
                  <span className="rounded-full bg-[#f1f3f5] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#697077]">
                    Smart Summary & Insight
                  </span>

                  <p className="mt-3 text-sm leading-6 text-[#5f6b73]">
                    This month, your expenses are moving{" "}
                    <span className="font-semibold text-[#059669]">
                      12.4% more balanced
                    </span>{" "}
                    compared to the previous period. You also have{" "}
                    <span className="font-semibold text-[#d97706]">
                      1 active renewal
                    </span>{" "}
                    approaching in subscription costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FeatureGrid />

        <div className="mt-24 rounded-[42px] border border-[#e1e5e8] bg-white/80 p-8 shadow-[0_30px_90px_rgba(31,36,40,0.08)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#697077]">
                Applied Freedom
              </p>
              <h3 className="text-3xl font-semibold tracking-[-0.04em]">
                What You Can Do in Practice
              </h3>
              <p className="mt-4 leading-7 text-[#5f6b73]">
                The Dashboard is not just a passive display panel. It is an
                active workspace for reviewing your financial position and
                taking immediate action.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Check your financial health in seconds",
                "Analyze weekly, monthly and yearly trends",
                "Track inflow versus outflow balance",
                "Pinpoint high-cost spending categories",
                "Track savings rate and goal performance",
                "Spot budget risks early",
                "Navigate to modules for quick actions",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-start gap-4 rounded-2xl border border-[#e1e5e8] bg-[#f8f9fa] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#059669]" />
                  <p className="text-xs font-semibold leading-5 text-[#1f2428]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 rounded-[38px] border border-[#e1e5e8] bg-[#1f2428] p-8 text-center text-white shadow-[0_35px_100px_rgba(31,36,40,0.2)] sm:p-12">
          <h4 className="text-lg font-bold">Dashboard Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            The Dashboard is Damsera’s main management layer. It helps users
            understand, prioritize and act on their financial data faster.
          </p>
        </div>
      </div>
    </section>
  );
}

function FlowCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "red" | "amber";
}) {
  const styles = {
    green: "border-[#bbf7d0] bg-[#ecfdf5] text-[#059669]",
    red: "border-[#fecaca] bg-[#fef2f2] text-[#dc2626]",
    amber: "border-[#fde68a] bg-[#fffbeb] text-[#d97706]",
  };

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${styles[tone]}`}
    >
      <span className="text-xs font-semibold text-[#1f2428]">{label}</span>
      <span className="text-xs font-bold">{value}</span>
    </div>
  );
}

function FeatureGrid() {
  const items = [
    {
      title: "1. Financial Summary",
      desc: "Monthly income, expenses, net balance and savings rate in one clear overview.",
      icon: Wallet,
    },
    {
      title: "2. Cashflow Explorer",
      desc: "Analyze income and expense flows with flow and chart-based views.",
      icon: Activity,
    },
    {
      title: "3. KPI & Status Cards",
      desc: "Clickable cards for inflow, outflow, net balance and savings rate.",
      icon: Coins,
    },
    {
      title: "4. Smart Insight Layer",
      desc: "Transforms raw numbers into practical financial insight.",
      icon: BrainCircuit,
    },
    {
      title: "5. Quick Actions",
      desc: "Fast navigation to transactions, budgets, reports and other modules.",
      icon: Zap,
    },
    {
      title: "6. Trend Panels",
      desc: "Compare financial performance across previous periods.",
      icon: TrendingUp,
    },
    {
      title: "7. Modular Structure",
      desc: "A flexible dashboard composed of dynamic, customizable blocks.",
      icon: LayoutGrid,
    },
    {
      title: "8. Cross-Device Layout",
      desc: "Optimized experience across iPhone, iPad and Mac.",
      icon: Monitor,
    },
    {
      title: "9. Insight Ecosystem",
      desc: "Connects dashboard states with notifications and smart recommendations.",
      icon: Lightbulb,
    },
  ];

  return (
    <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-[32px] border border-[#e1e5e8] bg-white/80 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(31,36,40,0.1)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1f3f5] text-[#1f2428] transition duration-300 group-hover:bg-[#1f2428] group-hover:text-white">
              <Icon className="h-5 w-5" strokeWidth={2.2} />
            </div>

            <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1f2428]">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5f6b73]">
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}