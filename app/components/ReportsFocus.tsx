"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Plus,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  FileText,
  ChevronDown,
  Download,
  Eye,
  Filter,
  Check,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
  Clock,
  ShieldCheck,
  Search,
  Printer,
  BarChart3,
  LineChart,
  PieChart
} from "lucide-react";

// Types
interface ReportItem {
  category: string;
  type: "Income" | "Expense" | "Savings";
  amount: number;
  share: number; // percentage share in its type
  note: string;
}

const all2026Items: ReportItem[] = [
  { category: "Primary Salary", type: "Income", amount: 7500, share: 75, note: "Monthly recurring engineering payroll transfers" },
  { category: "Freelance Design", type: "Income", amount: 1800, share: 18, note: "Ad-hoc client branding and UI packages" },
  { category: "Capital Investments", type: "Income", amount: 700, share: 7, note: "Quarterly stock dividend yields" },
  { category: "Residential Rent", type: "Expense", amount: 2500, share: 38, note: "Primary workspace apartment leasing cost" },
  { category: "Food & Dining", type: "Expense", amount: 1200, share: 18, note: "Weekly grocery baskets and premium restaurants" },
  { category: "Tech & Workstation", type: "Expense", amount: 1100, share: 17, note: "Server SaaS, API tokens, and developer gear" },
  { category: "Travel & Transit", type: "Expense", amount: 960, share: 15, note: "Electric car lease loading, charging, and Uber rides" },
  { category: "Entertainment & Leisure", type: "Expense", amount: 800, share: 12, note: "Regular theater, gym membership, and visual media subscriptions" },
  { category: "Emergency Stability", type: "Savings", amount: 2000, share: 58, note: "Safety net deposits" },
  { category: "Vacation Reserve", type: "Savings", amount: 1440, share: 42, note: "Summer holiday travel fund" }
];

const weeklyMayItems: ReportItem[] = [
  { category: "Primary Salary", type: "Income", amount: 1875, share: 75, note: "Weekly installment of recurring payroll transfer" },
  { category: "Freelance Design", type: "Income", amount: 450, share: 18, note: "Ad-hoc client branding deposit" },
  { category: "Capital Investments", type: "Income", amount: 175, share: 7, note: "Stock dividend payout fraction" },
  { category: "Residential Rent", type: "Expense", amount: 625, share: 45, note: "Prerated rent portion" },
  { category: "Food & Dining", type: "Expense", amount: 300, share: 21, note: "Weekly grocery basket" },
  { category: "Tech & Workstation", type: "Expense", amount: 250, share: 18, note: "Weekly SaaS and hardware depreciation" },
  { category: "Travel & Transit", type: "Expense", amount: 125, share: 9, note: "EV charging and local transport" },
  { category: "Entertainment & Leisure", type: "Expense", amount: 100, share: 7, note: "SaaS stream portions" },
  { category: "Emergency Stability", type: "Savings", amount: 650, share: 59, note: "Savings sweep" },
  { category: "Vacation Reserve", type: "Savings", amount: 450, share: 41, note: "Holiday bucket contributions" }
];

const monthlyQ1Items: ReportItem[] = [
  { category: "Primary Salary", type: "Income", amount: 6000, share: 73, note: "Q1 total payroll payouts" },
  { category: "Freelance Design", type: "Income", amount: 1500, share: 18, note: "Postgrad project deposits" },
  { category: "Capital Investments", type: "Income", amount: 700, share: 9, note: "Investments dividends" },
  { category: "Residential Rent", type: "Expense", amount: 2000, share: 39, note: "Rent load" },
  { category: "Food & Dining", type: "Expense", amount: 950, share: 19, note: "Q1 grocery total" },
  { category: "Tech & Workstation", type: "Expense", amount: 850, share: 17, note: "Workstation upgrades" },
  { category: "Travel & Transit", type: "Expense", amount: 700, share: 14, note: "EV loading fees" },
  { category: "Entertainment & Leisure", type: "Expense", amount: 600, share: 11, note: "Streaming subscriptions" },
  { category: "Emergency Stability", type: "Savings", amount: 1800, share: 58, note: "Q1 security fund sweep" },
  { category: "Vacation Reserve", type: "Savings", amount: 1300, share: 42, note: "Q1 travel savings" }
];

export default function ReportsFocus() {
  // State
  const [timeframe, setTimeframe] = useState<"all" | "weekly" | "q1">("all");
  const [scope, setScope] = useState<"all" | "income" | "expense" | "savings">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [downloadStep, setDownloadStep] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState("");

  // Simulated live report compilation triggers
  const handleCompileReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  // Trigger loading state whenever time period or scope switches to mimic live DB queries
  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [timeframe, scope]);

  // Load dataset dynamically based on timeframe state
  const rawItems = useMemo(() => {
    if (timeframe === "weekly") return weeklyMayItems;
    if (timeframe === "q1") return monthlyQ1Items;
    return all2026Items;
  }, [timeframe]);

  // Filter items based on Scope parameter and Search Query keyword
  const filteredItems = useMemo(() => {
    return rawItems.filter((item) => {
      // Scope mapping
      if (scope !== "all") {
        if (scope === "income" && item.type !== "Income") return false;
        if (scope === "expense" && item.type !== "Expense") return false;
        if (scope === "savings" && item.type !== "Savings") return false;
      }

      // Keyword query match
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesType = item.type.toLowerCase().includes(query);
        const matchesNote = item.note.toLowerCase().includes(query);
        if (!matchesCategory && !matchesType && !matchesNote) return false;
      }

      return true;
    });
  }, [rawItems, scope, searchQuery]);

  // Dynamic calculations for KPI summary widgets
  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    let savings = 0;

    rawItems.forEach((i) => {
      if (i.type === "Income") income += i.amount;
      if (i.type === "Expense") expense += i.amount;
      if (i.type === "Savings") savings += i.amount;
    });

    const netYield = income - expense;
    const savingsRatio = income > 0 ? (savings / income) * 100 : 0;

    return {
      income,
      expense,
      netYield,
      savingsRatio
    };
  }, [rawItems]);

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setTimeframe("all");
    setScope("all");
  };

  // Mock PDF Exporter Stepper
  const triggerPdfExport = () => {
    setShowPrintModal(true);
    setDownloadStep(0);
    setDownloadProgress("Compiling statement parameters...");

    const steps = [
      { text: "Compiling statement parameters...", delay: 600 },
      { text: "Building high-fidelity ledger layouts...", delay: 1200 },
      { text: "Formatting financial vectors and grid scales...", delay: 2000 },
      { text: "Verifying checksum encryption transport...", delay: 2800 },
      { text: "Finished! File download triggered.", delay: 3500 }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setDownloadStep(idx + 1);
        setDownloadProgress(step.text);
      }, step.delay);
    });
  };

  return (
    <section
      id="reports-focus"
      className="relative overflow-hidden bg-[#f5f6f7] px-6 pt-16 pb-28 text-[#1f2428]"
    >
      {/* Ambient background gradients */}
      <div className="pointer-events-none absolute left-1/4 top-16 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d7dce0] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#697077] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#1f2428]" />
            Module Focus
          </span>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Control Center: Reports Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's reports engine synthesizes raw transaction matrices into presentation-ready, visual intelligence briefs.
            Perform comparative trend checks, map category distribution weights, audit cost drivers, and export premium A4 financial statements.
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
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Statement Hub</span>
                  </div>

                  {/* Generate Trigger */}
                  <button
                    onClick={handleCompileReport}
                    disabled={isGenerating}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f2428] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#343a40] disabled:opacity-70 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Activity className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                    {isGenerating ? "Querying Matrix..." : "Generate Fresh Report"}
                  </button>
                </div>

                {/* Text Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Category, details..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-2xl border border-[#e1e5e8] bg-white pl-10 pr-4 py-2.5 text-xs text-[#1f2428] outline-none transition focus:border-[#1f2428] shadow-sm"
                    />
                  </div>
                </div>

                {/* Time Period filter Tab */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Timeframe Period</label>
                  <div className="grid grid-cols-3 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "all", label: "Year 2026" },
                      { key: "weekly", label: "Weekly May" },
                      { key: "q1", label: "Quarter 1" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setTimeframe(item.key as any)}
                        className={`rounded-xl py-1.5 text-[9px] font-bold uppercase tracking-wider transition ${
                          timeframe === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                      >
                        {item.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope Selection */}
                <div className="space-y-1.5 pt-2 border-t border-[#e1e5e8]">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Report Target Scope</label>
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value as any)}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                  >
                    <option value="all">All Scope Profiles</option>
                    <option value="income">Income Statement Only</option>
                    <option value="expense">Expense Breakdown Only</option>
                    <option value="savings">Savings & Yield Allocations</option>
                  </select>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="mt-8 pt-4 border-t border-[#e1e5e8] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#697077]">
                  <span className="font-semibold">Elements Match:</span>
                  <span className="rounded-full bg-[#1f2428] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    {filteredItems.length}
                  </span>
                </div>

                <button
                  onClick={resetFilters}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d7dce0] bg-white px-4 py-2.5 text-xs font-semibold text-[#5f6b73] hover:bg-neutral-50 hover:text-[#1f2428] shadow-sm transition active:scale-98"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset Parameters
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Cost calculators metrics widgets */}
                <div className="mb-6 grid gap-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Total Net Revenue",
                      val: `+$${stats.income.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
                      icon: TrendingUp
                    },
                    {
                      label: "Total Net Expenditure",
                      val: `-$${stats.expense.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-red-700 bg-red-50/50 border-red-100",
                      icon: TrendingDown
                    },
                    {
                      label: "Net Capital Yield",
                      val: `${stats.netYield >= 0 ? "+" : ""}$${stats.netYield.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-[#1f2428] bg-neutral-50 border-neutral-200",
                      icon: DollarSign
                    },
                    {
                      label: "Liquid Savings Ratio",
                      val: `${stats.savingsRatio.toFixed(1)}%`,
                      color: "text-indigo-700 bg-indigo-50/50 border-indigo-100",
                      icon: PieChart
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

                {/* Multi-Period Income vs Expense Chart */}
                <div className="mb-6 rounded-3xl border border-[#e1e5e8] bg-white p-5 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <span className="uppercase tracking-widest text-[#8b949b] text-[10px] font-bold">comparative historical profile</span>
                      <h4 className="text-xs font-bold text-[#1f2428] mt-1">Revenues vs Expenditures (Last 6 Periods)</h4>
                    </div>

                    <span className="rounded-full bg-[#f3f4f6] px-3.5 py-1 text-[10px] font-bold text-[#5f6b73] border border-black/5">
                      Prerated Aggregates
                    </span>
                  </div>

                  <div className="flex h-44 items-end gap-5 px-2">
                    {[
                      { period: "Nov 2025", inc: 65, exp: 40 },
                      { period: "Dec 2025", inc: 72, exp: 48 },
                      { period: "Jan 2026", inc: 80, exp: 52 },
                      { period: "Feb 2026", inc: 76, exp: 49 },
                      { period: "Mar 2026", inc: 85, exp: 55 },
                      { period: "Apr 2026", inc: 92, exp: 60 }
                    ].map((d, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center gap-2">
                        <div className="flex w-full items-end gap-1.5 h-32 relative">
                          <div
                            className="w-1/2 rounded-t-lg bg-[#1f2428] transition-all duration-300 hover:bg-[#343a40]"
                            style={{ height: `${d.inc}%` }}
                            title={`Revenue index: ${d.inc}`}
                          />
                          <div
                            className="w-1/2 rounded-t-lg bg-neutral-300 transition-all duration-300 hover:bg-neutral-400"
                            style={{ height: `${d.exp}%` }}
                            title={`Expenditure index: ${d.exp}`}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-[#697077] tracking-tighter truncate max-w-full">
                          {d.period.split(" ")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ledger Sheet Panel */}
                <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-4 sm:p-6 min-h-[400px]">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Ledger Document Sheet</h3>
                    
                    <button
                      onClick={triggerPdfExport}
                      className="flex items-center gap-1.5 rounded-full bg-white border border-[#e1e5e8] px-3.5 py-1.5 text-[10px] font-bold text-[#1f2428] shadow-sm hover:border-[#1f2428] hover:-translate-y-0.5 transition active:translate-y-0 active:scale-98"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Export Report Document
                    </button>
                  </div>

                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-indigo-100 shadow-md text-indigo-600 mb-4 animate-spin">
                        <LoaderIcon />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428] animate-pulse">Compiling balance registries...</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-xs leading-5">
                        Please stand by while Damsera's analyzer sweeps transactional indexes and compiles ledger statements.
                      </p>
                    </div>
                  ) : filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-[#e1e5e8] shadow-md text-neutral-400 mb-4 animate-pulse">
                        <AlertCircle className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428]">No statements matching criteria</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-sm">
                        Adjust search filters or period selections to refresh generated statement ledger items.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredItems.map((item, index) => {
                        let colorText = "text-neutral-500";
                        let colorBg = "bg-neutral-100 border-neutral-300";
                        let colorBar = "bg-neutral-500";

                        if (item.type === "Income") {
                          colorText = "text-emerald-600";
                          colorBg = "bg-emerald-50 border-emerald-200 text-emerald-600";
                          colorBar = "bg-emerald-500";
                        } else if (item.type === "Expense") {
                          colorText = "text-red-600";
                          colorBg = "bg-red-50 border-red-200 text-red-600";
                          colorBar = "bg-red-500";
                        } else {
                          colorText = "text-indigo-600";
                          colorBg = "bg-indigo-50 border-indigo-200 text-indigo-600";
                          colorBar = "bg-indigo-500";
                        }

                        return (
                          <div
                            key={index}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm hover:border-[#1f2428] transition duration-200"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-xs font-bold text-[#1f2428]">{item.category}</span>
                                <span className={`inline-flex rounded px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider border ${colorBg}`}>
                                  {item.type}
                                </span>
                              </div>
                              <p className="text-[9.5px] text-neutral-400 italic line-clamp-1">
                                {item.note}
                              </p>
                            </div>

                            <div className="sm:w-60 space-y-1.5">
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="text-neutral-400 font-bold">Statement Share</span>
                                <span className={`font-black ${colorText}`}>{item.share}%</span>
                              </div>

                              <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden relative border border-black/5">
                                <div
                                  className={`h-full rounded-full ${colorBar}`}
                                  style={{ width: `${item.share}%` }}
                                />
                              </div>
                            </div>

                            <div className="text-left sm:text-right min-w-[100px] border-t sm:border-t-0 border-neutral-100 pt-2 sm:pt-0">
                              <span className="text-[8px] uppercase font-bold text-neutral-400 block tracking-wider">Statement Value</span>
                              <span className={`font-black text-xs ${colorText}`}>
                                {item.type === "Expense" ? "-" : "+"}${item.amount.toLocaleString('en-US')}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Insight Footer Card */}
              <div className="mt-6 flex items-start gap-4 rounded-[32px] border border-[#e1e5e8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1f2428] text-white">
                  <Activity className="h-5 w-5" />
                </div>

                <div>
                  <span className="rounded-full bg-[#f1f3f5] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#697077]">
                    Automated Analyzer Assessment
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Your financial statement contains <span className="font-semibold text-neutral-800">{rawItems.length} active ledgers</span>.
                    During this timeframe, net revenues registered <span className="font-semibold text-emerald-600">${stats.income.toLocaleString('en-US')}</span>,
                    whilst total expenditures reached <span className="font-semibold text-red-600">${stats.expense.toLocaleString('en-US')}</span>,
                    creating a Net Capital Yield of <span className="font-semibold text-neutral-800">${stats.netYield.toLocaleString('en-US')}</span>.
                    You preserved an overall savings ratio yield of <span className="font-semibold text-indigo-600">{stats.savingsRatio.toFixed(1)}%</span>, keeping assets highly optimal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mock PDF Printable Simulation Drawer */}
        {showPrintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f2f3] text-[#1f2428]">
                    <Printer className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#1f2428]">
                    Document Exporter Panel
                  </h3>
                </div>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Progress Tracker bar */}
              <div className="mb-6 rounded-2xl border border-neutral-100 bg-[#f8f9fa] p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-[#1f2428] mb-1.5 uppercase tracking-wider">
                    <span>Exporting Document State</span>
                    <span>{downloadStep === 5 ? "Download Ready" : `${downloadStep * 20}%`}</span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden relative">
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${downloadStep * 20}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-neutral-400 block mt-1.5 font-semibold italic">
                    {downloadProgress}
                  </span>
                </div>

                {downloadStep === 5 && (
                  <button
                    onClick={() => {
                      alert("PDF document downloaded successfully to desktop storage.");
                      setShowPrintModal(false);
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-indigo-700 transition active:scale-98"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download File
                  </button>
                )}
              </div>

              {/* Simulated Printable Document sheet */}
              <div className="border border-neutral-200 bg-neutral-50 p-6 rounded-3xl min-h-[400px] shadow-inner text-[#1f2428] font-serif max-w-xl mx-auto">
                <div className="border-b-2 border-neutral-800 pb-4 mb-6 flex justify-between items-end">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">DAMSERA FINANCIALS</h1>
                    <p className="text-[9px] uppercase tracking-widest font-sans font-extrabold text-neutral-400 mt-1">Official Treasury Ledger Document</p>
                  </div>
                  <div className="text-right text-[10px] font-sans font-semibold">
                    <p className="font-bold text-neutral-800">Date Range: Q1 2026</p>
                    <p className="text-neutral-500">Statement ID: #DS-2026-0921</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-[11px] font-sans">
                  <div>
                    <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">RECIPIENT ACCOUNT</p>
                    <p className="font-bold mt-1">Damsera Work Station</p>
                    <p className="text-neutral-500">Damsera Premium Command Deck</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">STATEMENT COMPILATION</p>
                    <p className="font-bold mt-1">Offline Local Synchronization</p>
                    <p className="text-neutral-500">iCloud Secure Cryptography</p>
                  </div>
                </div>

                {/* Table list */}
                <table className="w-full text-left border-collapse text-[10.5px] font-sans">
                  <thead>
                    <tr className="border-b border-neutral-400 text-neutral-400 font-bold text-[8px] tracking-wider uppercase">
                      <th className="py-2">STATEMENT CATEGORY</th>
                      <th className="py-2 text-center">TYPE</th>
                      <th className="py-2 text-right">VALUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-neutral-200">
                        <td className="py-2.5 font-semibold text-neutral-800">{item.category}</td>
                        <td className="py-2.5 text-center font-bold text-[8px] uppercase tracking-wider text-neutral-500">{item.type}</td>
                        <td className="py-2.5 text-right font-black">
                          {item.type === "Expense" ? "-" : "+"}${item.amount.toLocaleString('en-US')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Total Summary */}
                <div className="mt-6 border-t-2 border-neutral-800 pt-4 flex flex-col items-end text-xs font-sans">
                  <div className="flex justify-between w-48 mb-1.5">
                    <span className="text-neutral-400 font-bold">Gross Inflows:</span>
                    <span className="font-black text-emerald-600">+${stats.income.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between w-48 mb-1.5 border-b border-neutral-300 pb-1.5">
                    <span className="text-neutral-400 font-bold">Gross Outflows:</span>
                    <span className="font-black text-red-600">-${stats.expense.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between w-48 text-sm font-bold pt-1">
                    <span className="text-neutral-800 font-black">Net Yield:</span>
                    <span className="font-black">${stats.netYield.toLocaleString('en-US')}</span>
                  </div>
                </div>

                <div className="mt-12 text-center text-[8px] text-neutral-400 border-t border-neutral-200 pt-3 font-sans font-semibold uppercase tracking-wider">
                  Verified secure document compiled offline inside Apple-native core boundaries.
                </div>
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
                The Reports command deck maps transaction tables into readable statements, comparing income indexes, showing cost distributions, and creating sharing archives.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Compile weekly, monthly, quarterly, and rolling custom timeframes",
                "Isolate scope profiles targeting income sheets, expense summaries, or savings",
                "Analyze comparative historical charts plotting income vs outgoings",
                "Spot high-density spent items driving capital outflows automatically",
                "Evaluate gross revenues, gross expenditures, net yields, and savings ratios",
                "Export clean preraited statement sheets to physical archives or shareables",
                "Review category spent volumes, share weights, and transaction notes",
                "Run instant automated database scans using fresh reactive sliders"
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
          <h4 className="text-lg font-bold">Reports Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Reports resolves fragmented data overload. By summarizing daily ledgers into scoped summaries, comparing trends, and compiling PDF exports, Damsera helps users audit expenses, establish solid savings habits, and back plans with data.
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
      title: "1. Timeframe Selectors",
      desc: "Compile transaction ledgers by specific scopes (Weekly May, Q1, All 2026) dynamically in one click.",
      icon: Calendar
    },
    {
      title: "2. Target Scope Isolations",
      desc: "Switch scopes targeting Income Statements, Expense Breakdown, or Savings Yields with glassmorphic ease.",
      icon: Filter
    },
    {
      title: "3. Income vs. Expense Charts",
      desc: "Audit comparative bars plotting revenue aggregates against monthly outflows across historical windows.",
      icon: BarChart3
    },
    {
      title: "4. Cost Driver breakdowns",
      desc: "Spot category share percentages, contributed cash values, and context notes easily on card grids.",
      icon: PieChart
    },
    {
      title: "5. Simulated Generation Scanner",
      desc: "Simulate live database crawls and record compilations. Scanners trigger interactive loading animations.",
      icon: Activity
    },
    {
      title: "6. PDF Document Simulation",
      desc: "Open A4 proportioned printable statements showing official company seals, summaries, and recipient tables.",
      icon: FileText
    },
    {
      title: "7. Exporter Downloading Stepper",
      desc: "Trigger high-fidelity vector calculations and transpiles, complete with sequential step progress counters.",
      icon: Download
    },
    {
      title: "8. Unified Command Hub",
      desc: "Synthesize transaction logs, cashflow models, budget thresholds, and debt repayment schedules in one deck.",
      icon: Layers
    },
    {
      title: "9. Offline Continuity Security",
      desc: "Export statements securely inside Apple-native sandbox environments, with zero data leaks or external trackers.",
      icon: ShieldCheck
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

// Custom Loader Spinner
function LoaderIcon() {
  return (
    <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}
