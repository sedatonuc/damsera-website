"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Plus,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  Tag,
  ChevronDown,
  Edit2,
  Trash2,
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
  ShieldAlert,
  BrainCircuit,
  Lightbulb,
  Zap
} from "lucide-react";

// Types
interface Signal {
  id: string;
  title: string;
  domain: "Risk Alerts" | "Savings & Habits" | "Action Plan";
  urgency: "Critical / High" | "Medium / Info";
  impactScore: number; // estimated monthly savings in USD
  impactDescription: string;
  suggestedAction: string;
  connectedModule: string;
  status: "Active" | "Applied";
  note: string;
}

const initialSignals: Signal[] = [
  {
    id: "sig-1",
    title: "Mortgage Refinancing Arbitrage",
    domain: "Action Plan",
    urgency: "Critical / High",
    impactScore: 350,
    impactDescription: "Chase Mortgage interest rate is 4.8% APR. Market standard sits at 3.95%. Refinancing will reduce long-term burden.",
    suggestedAction: "Evaluate Mortgage Refinance",
    connectedModule: "loans",
    status: "Active",
    note: "Chase Mortgage fixed-rate contract amortization audit alert"
  },
  {
    id: "sig-2",
    title: "Leisure SaaS Subscription Bleed",
    domain: "Risk Alerts",
    urgency: "Medium / Info",
    impactScore: 60,
    impactDescription: "iCloud sync and Adobe CC have zero usage flags registered in the last 30 days. Recommend cancellation sweep.",
    suggestedAction: "Perform Subscription Review",
    connectedModule: "subscriptions",
    status: "Active",
    note: "Zero-usage billing cycle detectors triggered in background"
  },
  {
    id: "sig-3",
    title: "Groceries Dining Surge Profile",
    domain: "Savings & Habits",
    urgency: "Medium / Info",
    impactScore: 180,
    impactDescription: "Weekly food outflows spike 42% on Friday-Sunday compared to weekdays. Weekend meal prep will mitigate budget strain.",
    suggestedAction: "Audit Transaction Categories",
    connectedModule: "transactions",
    status: "Active",
    note: "Bimonthly category contribution spike observed"
  },
  {
    id: "sig-4",
    title: "Rent-to-Inflow Exposure Threshold",
    domain: "Risk Alerts",
    urgency: "Critical / High",
    impactScore: 250,
    impactDescription: "Residential rent takes 38% of your gross inflows. stability benchmark is 30%. Restructure workspace allocations.",
    suggestedAction: "Restructure Budget Categories",
    connectedModule: "budgets",
    status: "Active",
    note: "Budget cap ratio threshold warnings exceeded"
  },
  {
    id: "sig-5",
    title: "Emergency Savings Milestone Sweeper",
    domain: "Savings & Habits",
    urgency: "Medium / Info",
    impactScore: 0,
    impactDescription: "Savings ratio is 34.4% complete. Emergency Fund is pacing perfectly to hit Q4 targets by December 2026.",
    suggestedAction: "Check Saving Milestones",
    connectedModule: "goals",
    status: "Active",
    note: "Liquid asset savings speed index complies fully"
  }
];

const DOMAINS = ["All Domains", "Risk Alerts", "Savings & Habits", "Action Plan"] as const;

export default function InsightsFocus() {
  // State
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [searchText, setSearchText] = useState("");
  const [domainFilter, setDomainFilter] = useState<string>("All Domains");
  const [urgencyFilter, setUrgencyFilter] = useState<"all" | "high" | "info">("all");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  // Simulated cashflow analyzer sweep
  const handleAnalyzeMatrix = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      showNotification("Deep cashflow sweep completed. AI guide profiles updated!", "success");
    }, 1200);
  };

  // Switch loading state briefly when filters change
  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [domainFilter, urgencyFilter]);

  // Toast Notification
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchText("");
    setDomainFilter("All Domains");
    setUrgencyFilter("all");
  };

  // Filter signals list
  const filteredSignals = useMemo(() => {
    return signals.filter((s) => {
      // Keyword query match
      if (searchText) {
        const query = searchText.toLowerCase();
        const matchesTitle = s.title.toLowerCase().includes(query);
        const matchesDesc = s.impactDescription.toLowerCase().includes(query);
        const matchesAction = s.suggestedAction.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesAction) return false;
      }

      // Domain Filter mapping
      if (domainFilter !== "All Domains" && s.domain !== domainFilter) return false;

      // Urgency Filter mapping
      if (urgencyFilter !== "all") {
        if (urgencyFilter === "high" && s.urgency !== "Critical / High") return false;
        if (urgencyFilter === "info" && s.urgency !== "Medium / Info") return false;
      }

      return true;
    });
  }, [signals, searchText, domainFilter, urgencyFilter]);

  // KPI summaries calculations
  const stats = useMemo(() => {
    let activePatterns = 0;
    let savingsImpact = 0;

    signals.forEach((s) => {
      if (s.status === "Active") {
        activePatterns++;
        savingsImpact += s.impactScore;
      }
    });

    return {
      activePatterns,
      savingsImpact
    };
  }, [signals]);

  // Apply Optimization state mutation
  const handleApplyOptimization = (id: string, title: string) => {
    setSignals((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Applied" as const } : s))
    );
    setSelectedSignal((prev) => prev && prev.id === id ? { ...prev, status: "Applied" as const } : prev);
    showNotification(`"${title}" pattern optimized! Estimated savings adjusted.`, "success");
  };

  return (
    <section
      id="insights-focus"
      className="relative overflow-hidden bg-[#f5f6f7] px-6 pt-16 pb-28 text-[#1f2428]"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute left-1/4 top-16 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      {/* Floating Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 scale-100 ${
          notification.type === "success"
            ? "bg-emerald-500/90 border-emerald-400 text-white"
            : "bg-indigo-500/90 border-indigo-400 text-white"
        }`}>
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">{notification.message}</p>
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
            Control Center: Insights Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's smart intelligence Briefs turn static ledger balances into active advice metrics.
            Isolate spending leaks, identify interest-mitigating prepayments, sweeps patterns, and apply savings optimizations instantly.
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
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Guide Hub</span>
                  </div>

                  {/* Sweep Matrix button */}
                  <button
                    onClick={handleAnalyzeMatrix}
                    disabled={isAnalyzing}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f2428] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#343a40] disabled:opacity-75 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <BrainCircuit className={`h-4 w-4 ${isAnalyzing ? "animate-spin" : ""}`} />
                    {isAnalyzing ? "Analyzing Matrix..." : "Analyze Cashflow"}
                  </button>
                </div>

                {/* Text Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Keywords..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full rounded-2xl border border-[#e1e5e8] bg-white pl-10 pr-4 py-2.5 text-xs text-[#1f2428] outline-none transition focus:border-[#1f2428] shadow-sm"
                    />
                  </div>
                </div>

                {/* Domain selector Filter */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Focus Domain</label>
                  <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2.5 text-xs text-[#1f2428] outline-none shadow-sm cursor-pointer"
                  >
                    {DOMAINS.map((domain) => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>

                {/* Urgency selection filter */}
                <div className="space-y-1.5 pt-2 border-t border-[#e1e5e8]">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Signal Urgency</label>
                  <select
                    value={urgencyFilter}
                    onChange={(e) => setUrgencyFilter(e.target.value as any)}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                  >
                    <option value="all">All Urgency Tiers</option>
                    <option value="high">Critical / High Alerts</option>
                    <option value="info">Medium / Info Signals</option>
                  </select>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="mt-8 pt-4 border-t border-[#e1e5e8] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#697077]">
                  <span className="font-semibold">Matching:</span>
                  <span className="rounded-full bg-[#1f2428] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    {filteredSignals.length} signals
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
                      label: "Analyzed Inflow Index",
                      val: "$9,300.00",
                      color: "text-[#1f2428] bg-[#f8f9fa] border-neutral-200",
                      icon: DollarSign
                    },
                    {
                      label: "Spending Pressure",
                      val: "48% (Medium)",
                      color: "text-amber-700 bg-amber-50/50 border-amber-100",
                      icon: Activity
                    },
                    {
                      label: "Active Patterns Found",
                      val: `${stats.activePatterns} Warnings`,
                      color: stats.activePatterns > 0 ? "text-indigo-700 bg-indigo-50/50 border-indigo-100 shadow-sm animate-pulse" : "text-neutral-500 bg-neutral-50/50 border-neutral-100",
                      icon: BrainCircuit
                    },
                    {
                      label: "Est. Savings Yield",
                      val: `+$${stats.savingsImpact.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo`,
                      color: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
                      icon: Lightbulb
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

                {/* Overall completion bar */}
                <div className="mb-6 rounded-3xl border border-[#e1e5e8] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1f2428] mb-2">
                    <span className="uppercase tracking-widest text-[#8b949b] text-[10px]">Active Advice Compliance</span>
                    <span>{(((signals.filter(s => s.status === "Applied").length) / signals.length) * 100).toFixed(0)}% Optimized</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-neutral-100 overflow-hidden relative border border-black/5">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${((signals.filter(s => s.status === "Applied").length) / signals.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Signals Directory */}
                <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-4 sm:p-6 min-h-[400px]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Advisor Signal Directory</h3>
                    <span className="rounded-full bg-white border border-[#e1e5e8] px-3.5 py-0.5 text-[10px] font-semibold text-[#5f6b73] shadow-sm">
                      Outstanding: {stats.activePatterns} alerts
                    </span>
                  </div>

                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-indigo-100 shadow-md text-indigo-600 mb-4 animate-spin">
                        <Activity className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428] animate-pulse">Running deep diagnostics checks...</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-xs leading-5">
                        Please stand by while Damsera's advisor audits bimonthly ledgers, maps budgets limits, and indexes interest costs.
                      </p>
                    </div>
                  ) : filteredSignals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-[#e1e5e8] shadow-md text-neutral-400 mb-4 animate-pulse">
                        <AlertCircle className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428]">No advisor signals found</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-sm">
                        Adjust search filters or focus domains to refresh generated financial diagnostics advice.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {filteredSignals.map((sig) => {
                        const isApplied = sig.status === "Applied";

                        let colorText = "text-neutral-500";
                        let colorBg = "bg-neutral-100 border-neutral-300 text-neutral-600";
                        let colorBar = "bg-neutral-500";
                        let statusText = "Optimized";

                        if (!isApplied) {
                          if (sig.urgency === "Critical / High") {
                            colorText = "text-red-600";
                            colorBg = "bg-red-50 border-red-200 text-red-600 animate-pulse";
                            colorBar = "bg-red-500";
                            statusText = "High Alert";
                          } else {
                            colorText = "text-indigo-600";
                            colorBg = "bg-indigo-50 border-indigo-200 text-indigo-600";
                            colorBar = "bg-indigo-500";
                            statusText = "Habit Signal";
                          }
                        } else {
                          colorText = "text-emerald-600";
                          colorBg = "bg-emerald-50 border-emerald-200 text-emerald-600";
                          colorBar = "bg-emerald-500";
                        }

                        return (
                          <div
                            key={sig.id}
                            onClick={() => setSelectedSignal(sig)}
                            className="group flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-5 shadow-sm hover:border-[#1f2428] transition duration-200 cursor-pointer active:scale-[0.99]"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="rounded bg-neutral-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                                  {sig.domain}
                                </span>

                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-widest border ${colorBg}`}>
                                  <span className={`h-1 w-1 rounded-full ${
                                    isApplied ? "bg-emerald-500" : sig.urgency === "Critical / High" ? "bg-red-500" : "bg-indigo-500"
                                  }`} />
                                  {statusText}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-[#1f2428] group-hover:text-black transition-colors line-clamp-1">
                                {sig.title}
                              </h4>
                              
                              <p className="mt-1.5 text-[10px] text-neutral-400 italic line-clamp-2 leading-relaxed">
                                {sig.impactDescription}
                              </p>
                            </div>

                            <div className="mt-6 space-y-2.5">
                              <div className="flex justify-between items-center text-[9.5px] text-neutral-400 border-t border-neutral-50 pt-2.5 font-semibold">
                                <span className="flex items-center gap-1">
                                  <Zap className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                                  {sig.connectedModule.toUpperCase()} Module
                                </span>
                                <span className={`font-black text-xs ${colorText}`}>
                                  {isApplied ? (
                                    <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> Settle applied
                                    </span>
                                  ) : sig.impactScore > 0 ? (
                                    `+$${sig.impactScore}/mo yield`
                                  ) : (
                                    "No direct cost impact"
                                  )}
                                </span>
                              </div>
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
                    Financial Intelligence Advisor
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Currently flagging <span className="font-semibold text-neutral-800">{stats.activePatterns} active optimization guidelines</span> across underlying modules.
                    Applying suggested advisory adjustments holds a cumulative estimated savings potential of <span className="font-semibold text-emerald-600">${stats.savingsImpact.toLocaleString('en-US')}/mo</span>.
                    {stats.activePatterns > 0 ? (
                      <span> Sweep active signals, modify budgets limit caps, cancels inactive subscriptions, and prepay mortgages to minimize burdens.</span>
                    ) : (
                      " All financial indicators comply perfectly with safety benchmarks and stability standards."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signal Drill-down Modal Drawer */}
        {selectedSignal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                  <BrainCircuit className="h-3 w-3" />
                  Advisor Signal Specs
                </span>
                <button
                  onClick={() => setSelectedSignal(null)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Amount Display Header */}
              <div className="text-center py-6 border-b border-neutral-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Est. Monthly Savings Yield</span>
                <h4 className="mt-2 text-3xl font-black text-[#1f2428] tracking-tight">
                  {selectedSignal.impactScore > 0 ? `+$${selectedSignal.impactScore.toLocaleString('en-US')}/mo` : "N/A"}
                </h4>
                <p className="mt-1.5 text-xs text-neutral-500 font-bold capitalize">
                  {selectedSignal.domain} • {selectedSignal.urgency} Urgency
                </p>
              </div>

              {/* Metadata details table */}
              <div className="mt-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Signal Target:</span>
                  <span className="font-bold text-[#1f2428]">{selectedSignal.title}</span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Connected Workspace Module:</span>
                  <span className="font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase text-[9px]">
                    {selectedSignal.connectedModule} Module
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Signal Status:</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[9.5px] ${
                    selectedSignal.status === "Applied" ? "bg-emerald-50 border border-emerald-100 text-emerald-700" : "bg-red-50 border border-red-100 text-red-700"
                  }`}>
                    {selectedSignal.status === "Applied" ? "Optimized & Applied" : "Active & Unsolved"}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Signal Explanation & Impact:</span>
                  <p className="rounded-xl bg-neutral-50 p-2.5 text-xs text-neutral-600 leading-relaxed border border-black/5 italic">
                    {selectedSignal.impactDescription}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Suggested Action Pathway:</span>
                  <p className="font-bold text-[#1f2428] flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    {selectedSignal.suggestedAction}
                  </p>
                </div>
              </div>

              {/* Action Operations */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedSignal(null)}
                  className="w-1/3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-xs font-bold text-neutral-500 hover:bg-neutral-50 hover:text-black transition active:scale-98"
                >
                  Cancel
                </button>

                {selectedSignal.status === "Active" ? (
                  <button
                    onClick={() => handleApplyOptimization(selectedSignal.id, selectedSignal.title)}
                    className="w-2/3 rounded-2xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Check className="h-4 w-4" />
                    Apply Insight Optimization
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-2/3 rounded-2xl bg-neutral-100 text-neutral-400 px-4 py-3 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    Optimization Active
                  </button>
                )}
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
                The Insights command guide turns static ledger balances into active advice metrics, helping you isolate spending leaks, prepay mortgages, and sweep cashflow patterns.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Isolate mortgage refinancing arbitrage opportunities instantly",
                "Spot leisure SaaS subscription billing leaks before renewals",
                "Audit groceries weekend spent spikes compared to weekday bases",
                "Identify budget overlimit exposures threatening cash buffers",
                "Evaluate saving milestone compliance paces for emergency target reserves",
                "Filter advisor signals by specific domains (Risks, Habits, Actions)",
                "Distinguish Critical alert parameters from Informational indicators",
                "Mutate signal statuses dynamically to optimize Estimated Monthly Savings"
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
          <h4 className="text-lg font-bold">Insights Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Insights provides strategic control pathways. By highlighting budget overruns, auditing SaaS renewals, suggesting amortization cost mitigations, and showing savings compliance, Damsera turns static history into a financial tool.
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
      title: "1. Focus Domain filters",
      desc: "Segment advisory guidelines targeted at Risk Alerts, Savings & Habits, or Action Plan templates easily.",
      icon: Filter
    },
    {
      title: "2. Signal Urgency tags",
      desc: "Separate high Critical warnings from informational guidelines, keeping urgent items highly visible.",
      icon: Tag
    },
    {
      title: "3. Cashflow matrix sweepers",
      desc: "Initiate deep database queries. Analyzer sweeps plot glowing visual scanner animations dynamically.",
      icon: Activity
    },
    {
      title: "4. Dynamic savings impact",
      desc: "Audit the estimated monthly saving yields of outstanding items, plotted prominently inside top KPIs.",
      icon: DollarSign
    },
    {
      title: "5. Active Compliance meters",
      desc: "Monitor advice execution rates reactively. Compliance indicators plot progress parameters from 0% to 100%.",
      icon: TrendingUp
    },
    {
      title: "6. Extended signal inspectors",
      desc: "Click any signal card to display detailed explanations, associated workspaces, and pre-payment notations.",
      icon: Layers
    },
    {
      title: "7. Simulated action optimizers",
      desc: "Click Apply to settle signals dynamically. Cards transition to Applied state and savings totals adapt immediately.",
      icon: Zap
    },
    {
      title: "8. Cross-Module Connectors",
      desc: "Map advisor signals directly to designated workspace paths (Budgets, Subscriptions, Loans, Transactions).",
      icon: BrainCircuit
    },
    {
      title: "9. Offline Continuity Security",
      desc: "Process data securely. Financial diagnostics sweep local sandboxes locally with zero third-party database tracking.",
      icon: Sparkles
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
