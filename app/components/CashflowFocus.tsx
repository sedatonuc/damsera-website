"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  ChevronDown,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
  Clock,
  Percent,
  RefreshCw,
  Sliders,
  Wallet
} from "lucide-react";

// Types
type CashPeriod = "weekly" | "monthly" | "yearly" | "custom";
type CashViewMode = "flow" | "chart";

interface FlowItem {
  title: string;
  value: number;
  percent: number;
}

interface OutflowItem {
  title: string;
  value: number;
  percent: number;
  sub: { name: string; value: number }[];
  status: "Optimal" | "Strained" | "Critical";
  tip: string;
}

const cashflowDataset = {
  weekly: {
    inflow: 1850,
    outflow: 1120,
    net: 730,
    savingsRate: 39.4,
    inflowItems: [
      { title: "Primary Salary", value: 1500, percent: 81 },
      { title: "Investment Dividends", value: 200, percent: 11 },
      { title: "Freelance UI Project", value: 150, percent: 8 }
    ],
    outflowItems: [
      {
        title: "Housing",
        value: 450,
        percent: 40,
        sub: [
          { name: "Rent", value: 350 },
          { name: "Utility Bills", value: 100 }
        ],
        status: "Optimal" as const,
        tip: "Housing costs are fully cleared and stable for this weekly cycle."
      },
      {
        title: "Food & Dining",
        value: 280,
        percent: 25,
        sub: [
          { name: "Groceries", value: 180 },
          { name: "Restaurants", value: 100 }
        ],
        status: "Strained" as const,
        tip: "Restaurant dining out is slightly high. Consider shifting $40 to grocery sweep."
      },
      {
        title: "Transport",
        value: 90,
        percent: 8,
        sub: [
          { name: "Public Transit", value: 50 },
          { name: "Fuel & Cabs", value: 40 }
        ],
        status: "Optimal" as const,
        tip: "Transit costs are well within normal limits."
      },
      {
        title: "Subscriptions",
        value: 20,
        percent: 2,
        sub: [
          { name: "Streaming Media", value: 15 },
          { name: "Cloud Storage", value: 5 }
        ],
        status: "Optimal" as const,
        tip: "Automatic renewals are fully reconciled."
      },
      {
        title: "Shopping",
        value: 280,
        percent: 25,
        sub: [
          { name: "Leisure Shopping", value: 200 },
          { name: "Miscellaneous", value: 80 }
        ],
        status: "Critical" as const,
        tip: "Spontaneous leisure shopping has breached threshold. Limit shopping for 7 days."
      }
    ]
  },
  monthly: {
    inflow: 7400,
    outflow: 4480,
    net: 2920,
    savingsRate: 39.4,
    inflowItems: [
      { title: "Primary Salary", value: 6000, percent: 81 },
      { title: "Investment Dividends", value: 800, percent: 11 },
      { title: "Freelance UI Project", value: 600, percent: 8 }
    ],
    outflowItems: [
      {
        title: "Housing",
        value: 1800,
        percent: 40,
        sub: [
          { name: "Rent Contract", value: 1400 },
          { name: "Electricity & Heating", value: 400 }
        ],
        status: "Optimal" as const,
        tip: "Fixed monthly housing costs are fully cleared and within safe limits."
      },
      {
        title: "Food & Dining",
        value: 1120,
        percent: 25,
        sub: [
          { name: "Supermarket Groceries", value: 720 },
          { name: "Restaurant Outings", value: 400 }
        ],
        status: "Strained" as const,
        tip: "Restaurant meals represent 35% of food expenses. Swapping 2 meals to home cooking saves $150."
      },
      {
        title: "Transport",
        value: 360,
        percent: 8,
        sub: [
          { name: "Smart Card Refills", value: 200 },
          { name: "Vehicle Fuel", value: 160 }
        ],
        status: "Optimal" as const,
        tip: "Transit metrics are normal. Commute balances are well managed."
      },
      {
        title: "Subscriptions",
        value: 80,
        percent: 2,
        sub: [
          { name: "Software SaaS", value: 60 },
          { name: "Entertainment Renewals", value: 20 }
        ],
        status: "Optimal" as const,
        tip: "No duplicate renewals found. Subscription channels are healthy."
      },
      {
        title: "Shopping",
        value: 1120,
        percent: 25,
        sub: [
          { name: "Fashion & Clothes", value: 800 },
          { name: "Tech Gadgets", value: 320 }
        ],
        status: "Critical" as const,
        tip: "High discretionary purchase volume. We recommend delaying non-essential shopping until next month."
      }
    ]
  },
  yearly: {
    inflow: 88800,
    outflow: 53760,
    net: 35040,
    savingsRate: 39.4,
    inflowItems: [
      { title: "Primary Salary", value: 72000, percent: 81 },
      { title: "Investment Dividends", value: 9600, percent: 11 },
      { title: "Freelance UI Projects", value: 7200, percent: 8 }
    ],
    outflowItems: [
      {
        title: "Housing",
        value: 21600,
        percent: 40,
        sub: [
          { name: "Yearly Rental Payments", value: 16800 },
          { name: "Power & Power Bills", value: 4800 }
        ],
        status: "Optimal" as const,
        tip: "Annual housing commitments are structured stably."
      },
      {
        title: "Food & Dining",
        value: 13440,
        percent: 25,
        sub: [
          { name: "Yearly Grocery Supplies", value: 8640 },
          { name: "Dinner Gatherings", value: 4800 }
        ],
        status: "Strained" as const,
        tip: "Yearly dining expenses are tracking above budget thresholds."
      },
      {
        title: "Transport",
        value: 4320,
        percent: 8,
        sub: [
          { name: "Train & Flights", value: 2400 },
          { name: "Fuel & Servicing", value: 1920 }
        ],
        status: "Optimal" as const,
        tip: "Yearly travel allocations are highly optimal."
      },
      {
        title: "Subscriptions",
        value: 960,
        percent: 2,
        sub: [
          { name: "Annual SaaS Licenses", value: 720 },
          { name: "Media Packages", value: 240 }
        ],
        status: "Optimal" as const,
        tip: "Annual payments have successfully locked in 15% discount sweep."
      },
      {
        title: "Shopping",
        value: 13440,
        percent: 25,
        sub: [
          { name: "Apparel & Retail", value: 9600 },
          { name: "Electronics Sweeps", value: 3840 }
        ],
        status: "Critical" as const,
        tip: "Leisure allocations have exceeded limits by $1,800. Revise discretionary parameters."
      }
    ]
  },
  custom: {
    inflow: 5120,
    outflow: 3210,
    net: 1910,
    savingsRate: 37.3,
    inflowItems: [
      { title: "Primary Salary", value: 4120, percent: 80 },
      { title: "Investment Dividends", value: 600, percent: 12 },
      { title: "Freelance UI Project", value: 400, percent: 8 }
    ],
    outflowItems: [
      {
        title: "Housing",
        value: 1200,
        percent: 37,
        sub: [
          { name: "Rent Allocation", value: 900 },
          { name: "Bills Reconciled", value: 300 }
        ],
        status: "Optimal" as const,
        tip: "Custom period housing costs are successfully cleared."
      },
      {
        title: "Food & Dining",
        value: 890,
        percent: 28,
        sub: [
          { name: "Food Provisions", value: 590 },
          { name: "Dining Reserves", value: 300 }
        ],
        status: "Strained" as const,
        tip: "Eating out represents 33.7% of total custom food ledger."
      },
      {
        title: "Transport",
        value: 250,
        percent: 8,
        sub: [
          { name: "Train Tickets", value: 150 },
          { name: "Fuel Refill", value: 100 }
        ],
        status: "Optimal" as const,
        tip: "Custom travel logs align with safety targets."
      },
      {
        title: "Subscriptions",
        value: 70,
        percent: 2,
        sub: [
          { name: "SaaS Renewals", value: 50 },
          { name: "Entertainment", value: 20 }
        ],
        status: "Optimal" as const,
        tip: "Standard subscriptions remain safe."
      },
      {
        title: "Shopping",
        value: 800,
        percent: 25,
        sub: [
          { name: "Discretionary Buy", value: 600 },
          { name: "Other Outbounds", value: 200 }
        ],
        status: "Critical" as const,
        tip: "Discretionary custom shopping is stoking outflow pressure."
      }
    ]
  }
};

export default function CashflowFocus() {
  // State
  const [selectedPeriod, setSelectedPeriod] = useState<CashPeriod>("monthly");
  const [viewMode, setViewMode] = useState<CashViewMode>("flow");
  const [drilldownCategory, setDrilldownCategory] = useState<OutflowItem | null>(null);
  const [showDrilldownModal, setShowDrilldownModal] = useState(false);
  const [customDateStart, setCustomDateStart] = useState("2026-05-01");
  const [customDateEnd, setCustomDateEnd] = useState("2026-05-24");

  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleRefresh = () => {
    triggerNotification("Cashflow simulation database reloaded successfully!");
  };

  const handleReset = () => {
    setSelectedPeriod("monthly");
    setViewMode("flow");
    setDrilldownCategory(null);
    triggerNotification("Cashflow parameters reset to default");
  };

  // Get Current Period Data
  const currentData = useMemo(() => {
    return cashflowDataset[selectedPeriod];
  }, [selectedPeriod]);

  const openDrilldown = (item: OutflowItem) => {
    setDrilldownCategory(item);
    setShowDrilldownModal(true);
  };

  return (
    <section
      id="cashflow-focus"
      className="relative overflow-hidden bg-[#f5f6f7] px-6 pt-16 pb-28 text-[#1f2428]"
    >
      {/* Ambient backgrounds */}
      <div className="pointer-events-none absolute left-1/4 top-16 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      {/* Floating Notification banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-400 bg-emerald-500/90 px-5 py-4 text-white shadow-xl backdrop-blur-md transition-all duration-300 transform scale-100">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">{notification}</p>
        </div>
      )}

      <div className="relative mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d7dce0] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#697077] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#1f2428]" />
            Module Focus
          </span>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Control Center: Cashflow Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's cashflow analytics hub helps you track, distribution-map, and understand
            the rhythm of capital movements. Toggle interactive flows, dissect category pools,
            and inspect deep subcategory breakdowns through state-driven drill-downs.
          </p>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="mt-16 overflow-hidden rounded-[42px] border border-[#e1e5e8] bg-white/80 p-5 shadow-[0_40px_120px_rgba(31,36,40,0.12)] backdrop-blur-2xl sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar Controls & Parameters */}
            <div className="flex flex-col justify-between rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-5">
              <div className="space-y-6">
                <div>
                  <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Flow Engine</span>
                  </div>

                  {/* Mode Toggles */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">View Mode</label>
                    <div className="space-y-2">
                      {[
                        { key: "flow", label: "Flow Mode", icon: Activity },
                        { key: "chart", label: "Chart Mode", icon: Sliders }
                      ].map((mode) => {
                        const ModeIcon = mode.icon;
                        return (
                          <button
                            key={mode.key}
                            onClick={() => setViewMode(mode.key as CashViewMode)}
                            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition ${
                              viewMode === mode.key
                                ? "bg-[#1f2428] text-white shadow-lg shadow-black/10"
                                : "text-[#5f6b73] bg-white hover:bg-neutral-50 hover:text-black border border-[#e1e5e8] shadow-sm"
                            }`}
                          >
                            <ModeIcon className="h-4 w-4" />
                            {mode.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Period Select */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Time Period</label>
                  <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "weekly", label: "Weekly" },
                      { key: "monthly", label: "Monthly" },
                      { key: "yearly", label: "Yearly" },
                      { key: "custom", label: "Custom" }
                    ].map((period) => (
                      <button
                        key={period.key}
                        onClick={() => setSelectedPeriod(period.key as CashPeriod)}
                        className={`rounded-xl py-2 text-[10.5px] font-bold uppercase tracking-wider transition ${
                          selectedPeriod === period.key
                            ? "bg-[#1f2428] text-white"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional Custom Date Picker */}
                {selectedPeriod === "custom" && (
                  <div className="space-y-3.5 p-3 rounded-2xl border border-[#e1e5e8] bg-white shadow-inner animate-in fade-in duration-200">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Tarih Aralığı</span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-neutral-400">Start:</span>
                        <input
                          type="date"
                          value={customDateStart}
                          onChange={(e) => setCustomDateStart(e.target.value)}
                          className="border border-[#e1e5e8] rounded-lg px-2 py-0.5 outline-none focus:border-black"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-neutral-400">End:</span>
                        <input
                          type="date"
                          value={customDateEnd}
                          onChange={(e) => setCustomDateEnd(e.target.value)}
                          className="border border-[#e1e5e8] rounded-lg px-2 py-0.5 outline-none focus:border-black"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Action Buttons */}
              <div className="mt-8 pt-4 border-t border-[#e1e5e8] space-y-2.5">
                <button
                  onClick={handleRefresh}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d7dce0] bg-white px-4 py-2.5 text-xs font-semibold text-[#5f6b73] hover:bg-neutral-50 hover:text-black shadow-sm transition active:scale-98"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Refresh Database
                </button>
                <button
                  onClick={handleReset}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-neutral-200/50 px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 hover:text-black transition active:scale-98"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset Settings
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Metric Summary Cards */}
                <div className="mb-6 grid gap-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Total Inflow Assets",
                      val: `+$${currentData.inflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
                      icon: TrendingUp
                    },
                    {
                      label: "Total Outflow Spent",
                      val: `-$${currentData.outflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-red-600 bg-red-50/50 border-red-100",
                      icon: TrendingDown
                    },
                    {
                      label: "Net Liquid Balance",
                      val: `+$${currentData.net.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-[#1f2428] bg-neutral-50 border-neutral-200",
                      icon: DollarSign
                    },
                    {
                      label: "Period Savings Rate",
                      val: `${currentData.savingsRate.toFixed(1)}%`,
                      color: "text-purple-700 bg-purple-50/40 border-purple-100",
                      icon: Percent
                    }
                  ].map((metric) => {
                    const MetricIcon = metric.icon;
                    return (
                      <div
                        key={metric.label}
                        className={`rounded-3xl border p-4 shadow-sm relative overflow-hidden transition-all duration-300 ${metric.color}`}
                      >
                        <p className="text-[9px] uppercase tracking-[0.15em] font-bold opacity-75">
                          {metric.label}
                        </p>
                        <p className="mt-2.5 text-lg font-black tracking-tight leading-none">
                          {metric.val}
                        </p>
                        <MetricIcon className="absolute right-3.5 bottom-3 h-5 w-5 opacity-15" />
                      </div>
                    );
                  })}
                </div>

                {/* Primary Interactive Workspace */}
                <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-5 sm:p-6 min-h-[460px] flex flex-col justify-center">
                  
                  {viewMode === "flow" ? (
                    /* FLOW MODE (Sankey-style flow connection) */
                    <div className="animate-in fade-in duration-300">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Liquidity Flow Connections</h3>
                        <span className="rounded-full bg-white border border-[#e1e5e8] px-3.5 py-1 text-[10px] font-semibold text-[#5f6b73]">
                          Period: {selectedPeriod.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr]">
                        {/* Inflow stack */}
                        <div className="space-y-3">
                          <span className="block text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 text-center mb-1">Inbound Streams</span>
                          {currentData.inflowItems.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-xs shadow-sm flex items-center justify-between">
                              <div>
                                <span className="font-extrabold text-[#1f2428] block">{item.title}</span>
                                <span className="text-[10px] text-emerald-600 font-bold">+${item.value.toLocaleString('en-US')}</span>
                              </div>
                              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-black text-white">{item.percent}%</span>
                            </div>
                          ))}
                        </div>

                        {/* Arrow 1 */}
                        <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-[#a0a7ad] lg:rotate-0 animate-pulse shrink-0" />

                        {/* Central Liquidity Net Pool */}
                        <div className="rounded-[36px] border border-[#d7dce0] bg-white p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-center items-center">
                          <div className="absolute inset-0 bg-emerald-50/10 pointer-events-none animate-pulse" />
                          <div className="relative z-10">
                            <span className="rounded bg-neutral-100 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-widest text-neutral-500">Central Cash Pool</span>
                            <h4 className="mt-3 text-lg font-black text-[#1f2428] tracking-tight">Liquid Treasury</h4>
                            <p className="mt-1 text-base font-extrabold text-emerald-600 tracking-tight">+${currentData.net.toLocaleString('en-US')}</p>
                            
                            <div className="mt-4 flex gap-1 justify-center">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" />
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce delay-100" />
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>

                        {/* Arrow 2 */}
                        <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-[#a0a7ad] lg:rotate-0 animate-pulse shrink-0" />

                        {/* Outflow Stack */}
                        <div className="space-y-3">
                          <span className="block text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 text-center mb-1">Outbound Pools</span>
                          {currentData.outflowItems.map((item) => {
                            let colorText = "text-neutral-500";
                            let colorBg = "bg-white border-neutral-200";
                            let colorBar = "bg-emerald-500";

                            if (item.status === "Critical") {
                              colorText = "text-red-600";
                              colorBg = "bg-red-50/40 border-red-100";
                              colorBar = "bg-red-500";
                            } else if (item.status === "Strained") {
                              colorText = "text-amber-600";
                              colorBg = "bg-amber-50/40 border-amber-100";
                              colorBar = "bg-amber-500";
                            }

                            return (
                              <div
                                key={item.title}
                                onClick={() => openDrilldown(item)}
                                className={`rounded-2xl border p-4 text-xs shadow-sm flex items-center justify-between cursor-pointer hover:border-black transition active:scale-[0.99] ${colorBg}`}
                              >
                                <div>
                                  <span className="font-extrabold text-[#1f2428] block">{item.title}</span>
                                  <span className={`text-[10px] font-bold ${colorText}`}>-${item.value.toLocaleString('en-US')}</span>
                                </div>
                                <div className="text-right flex items-center gap-2">
                                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-black text-white ${colorBar}`}>
                                    {item.percent}%
                                  </span>
                                  <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* CHART MODE (Interactive expense distributions) */
                    <div className="animate-in fade-in duration-300">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Annual 5-Period Cash Overview</h3>
                        <span className="rounded-full bg-white border border-[#e1e5e8] px-3.5 py-1 text-[10px] font-semibold text-[#5f6b73]">
                          Period: {selectedPeriod.toUpperCase()}
                        </span>
                      </div>

                      {/* Cashflow Bar Chart Simulator */}
                      <div className="flex h-36 items-end justify-around gap-4 px-4 border-b border-[#e1e5e8] pb-4 mb-8">
                        {[
                          { period: "Jan", inflow: 72, outflow: 48 },
                          { period: "Feb", inflow: 86, outflow: 54 },
                          { period: "Mar", inflow: 78, outflow: 58 },
                          { period: "Apr", inflow: 92, outflow: 60 },
                          { period: "May", inflow: 88, outflow: 55 }
                        ].map((d) => (
                          <div key={d.period} className="flex flex-1 flex-col items-center">
                            <div className="flex h-28 w-full items-end justify-center gap-1.5">
                              <div
                                className="w-3 rounded-t-md bg-[#059669] sm:w-5 shadow-sm"
                                style={{ height: `${d.inflow}%` }}
                              />
                              <div
                                className="w-3 rounded-t-md bg-[#dc2626] sm:w-5 shadow-sm"
                                style={{ height: `${d.outflow}%` }}
                              />
                            </div>
                            <span className="mt-2 text-[9px] font-extrabold uppercase tracking-widest text-[#8b949b]">
                              {d.period}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Expense distribution progressive list */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b949b] mb-1">Expense Distributions</h4>
                        {currentData.outflowItems.map((item) => {
                          let colorBar = "bg-emerald-500";
                          let colorText = "text-emerald-600";

                          if (item.status === "Critical") {
                            colorBar = "bg-red-500";
                            colorText = "text-red-600 font-bold";
                          } else if (item.status === "Strained") {
                            colorBar = "bg-amber-500";
                            colorText = "text-amber-600 font-semibold";
                          }

                          return (
                            <div
                              key={item.title}
                              onClick={() => openDrilldown(item)}
                              className="group bg-white border border-[#e1e5e8] rounded-2xl p-4 shadow-sm hover:border-[#1f2428] transition duration-200 cursor-pointer"
                            >
                              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                                <span className="text-[#1f2428]">{item.title}</span>
                                <div>
                                  <span className="text-neutral-400 font-semibold">${item.value.toLocaleString('en-US')} of ${currentData.outflow.toLocaleString('en-US')}</span>
                                  <span className={`ml-2.5 text-right font-black ${colorText}`}>{item.percent}%</span>
                                </div>
                              </div>

                              <div className="h-2 w-full rounded-full bg-neutral-100 relative overflow-hidden border border-black/5">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${colorBar}`}
                                  style={{ width: `${item.percent}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Bottom Smart summary card */}
              <div className="mt-6 flex items-start gap-4 rounded-[32px] border border-[#e1e5e8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1f2428] text-white">
                  <Activity className="h-5 w-5" />
                </div>

                <div>
                  <span className="rounded-full bg-[#f1f3f5] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#697077]">
                    Cashflow Stability Assessment
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Your liquid net position sits at <span className="font-semibold text-emerald-600">+${currentData.net.toLocaleString('en-US')}</span>. 
                    This creates an overall savings yield of <span className="font-semibold text-purple-600">{currentData.savingsRate.toFixed(1)}%</span>. 
                    Under outbound allocations, <span className="font-semibold text-red-600">Shopping</span> represents the highest volatility risk, 
                    while <span className="font-semibold text-neutral-800">Housing</span> fixed commitments remain extremely safe and settled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drill-down Detail Modal */}
        {showDrilldownModal && drilldownCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                  <Layers className="h-3 w-3" />
                  Category Breakdown
                </span>
                <button
                  onClick={() => setShowDrilldownModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Amount Display */}
              <div className="text-center py-5 border-b border-neutral-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Spent this Period</span>
                <h4 className="mt-2 text-3xl font-black text-[#1f2428] tracking-tight">
                  ${drilldownCategory.value.toLocaleString()}
                </h4>
                <p className="mt-1.5 text-xs text-neutral-500 font-bold">
                  {drilldownCategory.title} represents <span className="text-[#1f2428]">{drilldownCategory.percent}%</span> of outflows
                </p>
              </div>

              {/* Subcategories list */}
              <div className="mt-5 space-y-3.5">
                <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b949b] mb-1">Nested Subcategories</h5>
                {drilldownCategory.sub.map((subItem) => {
                  const subPercent = drilldownCategory.value > 0 ? (subItem.value / drilldownCategory.value) * 100 : 0;
                  return (
                    <div key={subItem.name} className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-neutral-500">{subItem.name}</span>
                        <span className="text-[#1f2428]">${subItem.value.toLocaleString('en-US')} ({subPercent.toFixed(0)}%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-neutral-100 relative overflow-hidden border border-black/5">
                        <div
                          className="h-full rounded-full bg-[#1f2428]"
                          style={{ width: `${subPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Risk Alert & AI Recommendation */}
              <div className="mt-6 p-4 rounded-2xl border border-black/5 bg-[#f8f9fa] space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest border ${
                    drilldownCategory.status === "Optimal"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : drilldownCategory.status === "Strained"
                        ? "bg-amber-50 border-amber-200 text-amber-600"
                        : "bg-red-50 border-red-200 text-red-600"
                  }`}>
                    {drilldownCategory.status} State
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed italic">
                  "{drilldownCategory.tip}"
                </p>
              </div>

              {/* Close Button */}
              <div className="mt-6">
                <button
                  onClick={() => setShowDrilldownModal(false)}
                  className="w-full rounded-2xl bg-[#1f2428] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#343a40] transition active:scale-98"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feature Grid Panel Block */}
        <FeatureGrid />

        {/* Applied Freedom Grid */}
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
                The Cashflow command center visualizes the movement of capital in real-time, giving you total transparency over inflows and outbound streams.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Reconcile monthly inflows against outbound commitments",
                "Pinpoint category-specific spending velocity",
                "Trace from macro category totals to root subcategories",
                "Track savings ratios against strategic plans",
                "Identify short-term liquidity shifts early",
                "Evaluate net cash positioning across rolling periods",
                "Generate custom interval reports (e.g. weekly checks)",
                "Optimize cash streams to increase discretionary safety margins"
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-start gap-4 rounded-2xl border border-[#e1e5e8] bg-[#f8f9fa] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-xs font-semibold leading-5 text-[#1f2428]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing summary footer */}
        <div className="mt-20 rounded-[38px] border border-[#e1e5e8] bg-[#1f2428] p-8 text-center text-white shadow-[0_35px_100px_rgba(31,36,40,0.2)] sm:p-12">
          <h4 className="text-lg font-bold">Cashflow Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Cashflow goes beyond basic tracking. It exposes structural warnings, visualizes liquidity pools, and provides actionable recommendations to protect your net position. Keep capital streams healthy, optimize savings margins, and plan with data-backed confidence.
          </p>
        </div>
      </div>
    </section>
  );
}

// 9-Grid feature descriptors
function FeatureGrid() {
  const items = [
    {
      title: "1. Nakit Akışı Bütün Resmi",
      desc: "Monitor total inflows, outflows, net balances, and savings yields in a single comprehensive dashboard.",
      icon: Layers
    },
    {
      title: "2. Visual Flow Mapping",
      desc: "Switch to Flow Mode to inspect capital movement from inbound sources to outbound streams under visual Sankey layouts.",
      icon: ArrowRight
    },
    {
      title: "3. Rolling Trend Analytics",
      desc: "Compare incomes vs. spending pools over rolling periods. Identify monthly growth or strain ratios instantly.",
      icon: TrendingUp
    },
    {
      title: "4. Periodic Context Selection",
      desc: "Filter contexts by weekly, monthly, or yearly ranges. Configure custom date brackets for tailored cash evaluations.",
      icon: Calendar
    },
    {
      title: "5. Distribution Percentages",
      desc: "Dissect category outbounds with expense distribution metrics. Learn exactly which categories create the highest outflow pressure.",
      icon: Percent
    },
    {
      title: "6. Root-Cause Drill-Downs",
      desc: "Tap any category in the distribution list to isolate subcategory splits. Trace outbounds from primary totals to nested items.",
      icon: Sliders
    },
    {
      title: "7. AI Cashflow Intelligence",
      desc: "Receive automated assessments. Check optimal, strained, or critical states with custom tailored spending tips.",
      icon: Sparkles
    },
    {
      title: "8. Live Database Refresh",
      desc: "Reload mock data parameters instantly to simulate real-time updates. Reset values back to defaults with a single tap.",
      icon: RotateCcw
    },
    {
      title: "9. Cross-Device Continuity",
      desc: "Visual layouts scale perfectly. Tracks cash flows comfortably on small iPhone viewports as well as wide Mac workspaces.",
      icon: Clock
    }
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
