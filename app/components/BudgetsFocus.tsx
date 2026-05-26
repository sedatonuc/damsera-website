"use client";

import React, { useState, useMemo } from "react";
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
  Clock,
  WalletCards,
  Percent,
  ShieldAlert,
  ArrowRight,
  Search
} from "lucide-react";

// Types
type BudgetType = "expense" | "income"; // expense = limit, income = target goal
type BudgetPeriod = "weekly" | "monthly" | "yearly";

interface Budget {
  id: string;
  title: string;
  type: BudgetType;
  category: string;
  period: BudgetPeriod;
  limit: number;
  spent: number;
  note: string;
}

const initialBudgets: Budget[] = [
  {
    id: "bg-1",
    title: "Housing Rent & Utilities",
    type: "expense",
    category: "Housing",
    period: "monthly",
    limit: 2000,
    spent: 1800,
    note: "Covers monthly rental contract and baseline utility fees"
  },
  {
    id: "bg-2",
    title: "Monthly Grocery Provisions",
    type: "expense",
    category: "Food & Dining",
    period: "monthly",
    limit: 600,
    spent: 420.5,
    note: "Fresh grocery and organic dining purchases"
  },
  {
    id: "bg-3",
    title: "App Subscriptions & SaaS",
    type: "expense",
    category: "Subscriptions",
    period: "monthly",
    limit: 100,
    spent: 45.98,
    note: "Digital streaming services, cloud vaults and utility SaaS renewals"
  },
  {
    id: "bg-4",
    title: "Daily Transport & Fuel",
    type: "expense",
    category: "Transport",
    period: "monthly",
    limit: 250,
    spent: 90.0,
    note: "Public transit smart card top-ups, fuel, and cab rides"
  },
  {
    id: "bg-5",
    title: "Personal Leisure Shopping",
    type: "expense",
    category: "Shopping",
    period: "monthly",
    limit: 400,
    spent: 480.0,
    note: "Fashion wear, tech hardware and spontaneous shopping (LIMIT EXCEEDED ALERT!)"
  },
  {
    id: "bg-6",
    title: "High-Yield Savings sweep",
    type: "income",
    category: "Savings",
    period: "monthly",
    limit: 1000,
    spent: 750.0,
    note: "Target savings allocation goal transferred to high-yield sweep vault"
  },
  {
    id: "bg-7",
    title: "Weekend Dining allowance",
    type: "expense",
    category: "Food & Dining",
    period: "weekly",
    limit: 120,
    spent: 115.0,
    note: "Friday restaurant outings and social activities (CLOSE TO BREACH!)"
  }
];

const AVAILABLE_CATEGORIES = [
  "Housing",
  "Food & Dining",
  "Subscriptions",
  "Transport",
  "Shopping",
  "Savings",
  "Investments",
  "Other"
];

export default function BudgetsFocus() {
  // State
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | BudgetType>("all");
  const [periodFilter, setPeriodFilter] = useState<"all" | BudgetPeriod>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal Control States
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [viewingBudget, setViewingBudget] = useState<Budget | null>(null);

  // Form States (New / Edit)
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState<BudgetType>("expense");
  const [formCategory, setFormCategory] = useState(AVAILABLE_CATEGORIES[0]);
  const [formPeriod, setFormPeriod] = useState<BudgetPeriod>("monthly");
  const [formLimit, setFormLimit] = useState<number | "">("");
  const [formSpent, setFormSpent] = useState<number | "">("");
  const [formNote, setFormNote] = useState("");

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "danger" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchText("");
    setTypeFilter("all");
    setPeriodFilter("all");
    setCategoryFilter("all");
    showNotification("All filters successfully reset", "success");
  };

  // Filter Logic
  const filteredBudgets = useMemo(() => {
    return budgets.filter((bg) => {
      // Search text
      if (searchText) {
        const query = searchText.toLowerCase();
        const matchesTitle = bg.title.toLowerCase().includes(query);
        const matchesCategory = bg.category.toLowerCase().includes(query);
        const matchesNote = bg.note.toLowerCase().includes(query);

        if (!matchesTitle && !matchesCategory && !matchesNote) {
          return false;
        }
      }

      // Budget Type
      if (typeFilter !== "all" && bg.type !== typeFilter) return false;

      // Period
      if (periodFilter !== "all" && bg.period !== periodFilter) return false;

      // Category
      if (categoryFilter !== "all" && bg.category !== categoryFilter) return false;

      return true;
    });
  }, [budgets, searchText, typeFilter, periodFilter, categoryFilter]);

  // Statistics Calculations
  const stats = useMemo(() => {
    let totalLimit = 0;
    let totalSpent = 0;
    let warningCount = 0;
    let exceededCount = 0;

    filteredBudgets.forEach((bg) => {
      totalLimit += bg.limit;
      totalSpent += bg.spent;

      const percent = (bg.spent / bg.limit) * 100;
      if (bg.type === "expense") {
        if (percent >= 100) {
          exceededCount++;
        } else if (percent >= 75) {
          warningCount++;
        }
      }
    });

    const overallRate = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

    return {
      totalLimit,
      totalSpent,
      overallRate,
      warningCount,
      exceededCount,
      count: filteredBudgets.length
    };
  }, [filteredBudgets]);

  // Modal Triggers
  const openAddModal = () => {
    setEditingBudget(null);
    setFormTitle("");
    setFormType("expense");
    setFormCategory(AVAILABLE_CATEGORIES[0]);
    setFormPeriod("monthly");
    setFormLimit("");
    setFormSpent("");
    setFormNote("");
    setShowFormModal(true);
  };

  const openEditModal = (bg: Budget) => {
    setEditingBudget(bg);
    setFormTitle(bg.title);
    setFormType(bg.type);
    setFormCategory(bg.category);
    setFormPeriod(bg.period);
    setFormLimit(bg.limit);
    setFormSpent(bg.spent);
    setFormNote(bg.note);
    setShowFormModal(true);
    setShowDetailModal(false);
  };

  const handleOpenDetail = (bg: Budget) => {
    setViewingBudget(bg);
    setShowDetailModal(true);
  };

  // Submit Add or Edit Form
  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Please provide a budget title.");
      return;
    }
    if (!formLimit || Number(formLimit) <= 0) {
      alert("Please provide a valid budget limit amount.");
      return;
    }

    const budgetData: Budget = {
      id: editingBudget ? editingBudget.id : `bg-${Date.now()}`,
      title: formTitle,
      type: formType,
      category: formCategory,
      period: formPeriod,
      limit: Number(formLimit),
      spent: formSpent ? Number(formSpent) : 0,
      note: formNote || "No additional description"
    };

    if (editingBudget) {
      setBudgets((prev) =>
        prev.map((b) => (b.id === editingBudget.id ? budgetData : b))
      );
      showNotification(`"${formTitle}" budget updated successfully!`, "success");
    } else {
      setBudgets((prev) => [budgetData, ...prev]);
      showNotification(`"${formTitle}" budget created successfully!`, "success");
    }

    setShowFormModal(false);
    setEditingBudget(null);
  };

  // Delete Budget
  const handleDeleteBudget = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the budget "${title}"?`)) {
      setBudgets((prev) => prev.filter((b) => b.id !== id));
      setShowDetailModal(false);
      showNotification(`"${title}" deleted successfully.`, "danger");
    }
  };

  return (
    <section
      id="budgets-focus"
      className="relative overflow-hidden bg-[#f5f6f7] px-6 pt-16 pb-28 text-[#1f2428]"
    >
      {/* Decorative ambient blur elements */}
      <div className="pointer-events-none absolute left-1/4 top-16 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      {/* Floating Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 scale-100 ${
          notification.type === "success"
            ? "bg-emerald-500/90 border-emerald-400 text-white"
            : "bg-red-500/90 border-red-400 text-white"
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
            Control Center: Budgets Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's budgets workspace turns passive spend tracking into proactive
            allocation strategies. Structure weekly or monthly limits, configure custom target
            savings milestones, and visualise spending risk early in a premium adaptive panel.
          </p>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="mt-16 overflow-hidden rounded-[42px] border border-[#e1e5e8] bg-white/80 p-5 shadow-[0_40px_120px_rgba(31,36,40,0.12)] backdrop-blur-2xl sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar Controls & Filters */}
            <div className="flex flex-col justify-between rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-5">
              <div className="space-y-6">
                <div>
                  <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Budget Manager</span>
                  </div>

                  {/* Add New Budget Button */}
                  <button
                    onClick={openAddModal}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f2428] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#343a40] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Create Budget
                  </button>
                </div>

                {/* Text Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search budget title..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full rounded-2xl border border-[#e1e5e8] bg-white pl-10 pr-4 py-2.5 text-xs text-[#1f2428] shadow-sm outline-none transition focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Budget Type Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Budget Type</label>
                  <div className="grid grid-cols-3 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "all", label: "All" },
                      { key: "expense", label: "Expense" },
                      { key: "income", label: "Income" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setTypeFilter(item.key as any)}
                        className={`rounded-xl py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                          typeFilter === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Period Select */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Period</label>
                  <div className="grid grid-cols-4 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "all", label: "All" },
                      { key: "weekly", label: "Wk" },
                      { key: "monthly", label: "Mth" },
                      { key: "yearly", label: "Yr" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setPeriodFilter(item.key as any)}
                        className={`rounded-xl py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                          periodFilter === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Select */}
                <div className="space-y-1.5 pt-2 border-t border-[#e1e5e8]">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Category Group</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {AVAILABLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="mt-8 pt-4 border-t border-[#e1e5e8] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#697077]">
                  <span className="font-semibold">Matching:</span>
                  <span className="rounded-full bg-[#1f2428] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    {stats.count}
                  </span>
                </div>

                <button
                  onClick={resetFilters}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d7dce0] bg-white px-4 py-2.5 text-xs font-semibold text-[#5f6b73] hover:bg-neutral-50 hover:text-[#1f2428] shadow-sm transition active:scale-98"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Visual Overview KPI Summary Bar */}
                <div className="mb-6 grid gap-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Total Budget Limits",
                      val: `$${stats.totalLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-[#1f2428] bg-neutral-50 border-neutral-200",
                      icon: WalletCards
                    },
                    {
                      label: "Total Utilized / Progress",
                      val: `$${stats.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
                      icon: Activity
                    },
                    {
                      label: "Overall Utilization",
                      val: `${stats.overallRate.toFixed(1)}%`,
                      color: stats.overallRate > 80 ? "text-amber-700 bg-amber-50/50 border-amber-100" : "text-[#1f2428] bg-neutral-50 border-neutral-100",
                      icon: Percent
                    },
                    {
                      label: "Breached Budget Limits",
                      val: `${stats.exceededCount} Categories`,
                      color: stats.exceededCount > 0 ? "text-red-700 bg-red-50/70 border-red-150 shadow-sm animate-pulse" : "text-slate-500 bg-slate-50 border-slate-100",
                      icon: ShieldAlert
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

                {/* Progress bar container representing overall rate */}
                <div className="mb-6 rounded-3xl border border-[#e1e5e8] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1f2428] mb-2">
                    <span className="uppercase tracking-widest text-[#8b949b] text-[10px]">Overall Allocation Meter</span>
                    <span>{stats.overallRate.toFixed(1)}% Allocated</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-neutral-100 overflow-hidden relative border border-black/5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stats.overallRate > 90
                          ? "bg-red-500"
                          : stats.overallRate > 70
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(stats.overallRate, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Grid container for individual Budget Cards */}
                <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-4 sm:p-6 min-h-[400px]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Active Budgets Index</h3>
                    <span className="rounded-full bg-white border border-[#e1e5e8] px-3 py-0.5 text-[10px] font-semibold text-[#5f6b73]">
                      Showing {filteredBudgets.length} of {budgets.length} limits
                    </span>
                  </div>

                  {filteredBudgets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-[#e1e5e8] shadow-sm text-neutral-400 mb-4 animate-pulse">
                        <AlertCircle className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428]">No active budgets matched</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-sm">
                        Adjust search filters or add a new category limit to initialize budget tracking views.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {filteredBudgets.map((bg) => {
                        const percent = bg.limit > 0 ? (bg.spent / bg.limit) * 100 : 0;
                        const isIncome = bg.type === "income";

                        // Dynamic colors based on budget state
                        let colorBar = "bg-emerald-500";
                        let colorText = "text-emerald-600";
                        let colorBg = "bg-emerald-50 border-emerald-200";
                        let statusText = "Healthy";

                        if (!isIncome) {
                          if (percent >= 100) {
                            colorBar = "bg-red-500 animate-pulse";
                            colorText = "text-red-600";
                            colorBg = "bg-red-50 border-red-200";
                            statusText = "Exceeded";
                          } else if (percent >= 75) {
                            colorBar = "bg-amber-500";
                            colorText = "text-amber-600";
                            colorBg = "bg-amber-50 border-amber-200";
                            statusText = "Warning";
                          }
                        } else {
                          // For Income goals
                          if (percent >= 100) {
                            statusText = "Goal Met";
                          } else {
                            colorBar = "bg-purple-500";
                            colorText = "text-purple-600";
                            colorBg = "bg-purple-50 border-purple-200";
                            statusText = "Accumulating";
                          }
                        }

                        return (
                          <div
                            key={bg.id}
                            onClick={() => handleOpenDetail(bg)}
                            className="group flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-5 shadow-sm hover:border-[#1f2428] transition duration-200 cursor-pointer active:scale-[0.99]"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <span className="rounded bg-neutral-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                                    {bg.category}
                                  </span>
                                  <span className="ml-1.5 text-[9px] font-bold text-neutral-400 capitalize">
                                    • {bg.period}
                                  </span>
                                </div>

                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-widest border ${colorBg} ${colorText}`}>
                                  <span className={`h-1 w-1 rounded-full ${
                                    statusText === "Exceeded" ? "bg-red-500" : statusText === "Warning" ? "bg-amber-500" : isIncome ? "bg-purple-500" : "bg-emerald-500"
                                  }`} />
                                  {statusText}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-[#1f2428] group-hover:text-black transition-colors">
                                {bg.title}
                              </h4>
                              
                              {/* Subtitle description */}
                              <p className="mt-1 text-[10px] text-neutral-400 line-clamp-1 italic">
                                {bg.note}
                              </p>
                            </div>

                            <div className="mt-6 space-y-2">
                              {/* Spending ratio numbers */}
                              <div className="flex items-end justify-between text-xs">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                                    {isIncome ? "Target Saved" : "Total Consumed"}
                                  </span>
                                  <span className="font-extrabold text-[#1f2428]">
                                    ${bg.spent.toLocaleString('en-US')}
                                  </span>
                                  <span className="text-neutral-400 font-semibold text-[10px]">
                                    {" "}of ${bg.limit.toLocaleString('en-US')}
                                  </span>
                                </div>

                                <div className="text-right">
                                  <span className={`font-black ${colorText}`}>
                                    {percent.toFixed(0)}%
                                  </span>
                                </div>
                              </div>

                              {/* Progress bar */}
                              <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden relative border border-black/5">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${colorBar}`}
                                  style={{ width: `${Math.min(percent, 100)}%` }}
                                />
                              </div>

                              {/* Remaining limit visual indication */}
                              <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-1">
                                <span>
                                  {isIncome ? (
                                    percent >= 100 ? (
                                      <span className="text-purple-600 font-bold">Goal Fully Achieved!</span>
                                    ) : (
                                      <span>${(bg.limit - bg.spent).toLocaleString('en-US')} remaining to hit target</span>
                                    )
                                  ) : (
                                    bg.limit - bg.spent >= 0 ? (
                                      <span>${(bg.limit - bg.spent).toLocaleString('en-US')} safe remaining capacity</span>
                                    ) : (
                                      <span className="text-red-600 font-bold">Exceeded limit by ${(bg.spent - bg.limit).toLocaleString('en-US')}!</span>
                                    )
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

              {/* Bottom Insight Card */}
              <div className="mt-6 flex items-start gap-4 rounded-[32px] border border-[#e1e5e8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1f2428] text-white">
                  <Activity className="h-5 w-5" />
                </div>

                <div>
                  <span className="rounded-full bg-[#f1f3f5] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#697077]">
                    Budget Allocation Intelligence
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Analyzing <span className="font-semibold text-neutral-800">{stats.count} active budgets</span>. 
                    Overall limits configured at <span className="font-semibold text-neutral-800">${stats.totalLimit.toLocaleString('en-US')}</span> with 
                    average usage reaching <span className="font-semibold text-emerald-600">${stats.totalSpent.toLocaleString('en-US')}</span>. 
                    {stats.exceededCount > 0 ? (
                      <span className="text-red-600 font-bold"> Note: You have {stats.exceededCount} breached limits that require priority revision.</span>
                    ) : (
                      " All active categories are safely within budgeted risk parameters."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Budget Form Modal */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f2f3] text-[#1f2428]">
                    <WalletCards className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#1f2428]">
                    {editingBudget ? "Edit Budget Limit" : "New Budget Allocation"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveBudget} className="space-y-4">
                {/* Budget Type selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Budget Category Type</label>
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-[#e1e5e8] bg-neutral-50 p-1">
                    {[
                      { key: "expense", label: "Expense (Outbound Limit)" },
                      { key: "income", label: "Income (Saving Target)" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setFormType(item.key as BudgetType)}
                        className={`rounded-xl py-2 text-[10px] font-bold uppercase tracking-wider transition ${
                          formType === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-white hover:text-black"
                        }`}
                      >
                        {item.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Budget Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dining Out, Food Provisions"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                  />
                </div>

                {/* Limit & Spent Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">
                      {formType === "expense" ? "Monthly Limit ($)" : "Target Goal ($)"}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="0.00"
                      value={formLimit}
                      onChange={(e) => setFormLimit(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">
                      {formType === "expense" ? "Spent Amount ($)" : "Saved/Eearned ($)"}
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0.00"
                      value={formSpent}
                      onChange={(e) => setFormSpent(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Period & Category Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Time Period</label>
                    <select
                      value={formPeriod}
                      onChange={(e) => setFormPeriod(e.target.value as BudgetPeriod)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Category Group</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      {AVAILABLE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Note Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Budget Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short summary details..."
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="w-1/2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-xs font-bold text-neutral-500 hover:bg-neutral-50 hover:text-black transition active:scale-98"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 rounded-2xl bg-[#1f2428] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#343a40] transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Save Allocation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Drill-down Detail Modal */}
        {showDetailModal && viewingBudget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                  <Layers className="h-3 w-3" />
                  Budget Limit Details
                </span>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Utilisation display header */}
              <div className="text-center py-6 border-b border-neutral-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  {viewingBudget.type === "income" ? "Savings Target Progress" : "Budget Consumption Ratio"}
                </span>
                <h4 className="mt-2 text-3xl font-black tracking-tight text-[#1f2428]">
                  {((viewingBudget.spent / viewingBudget.limit) * 100).toFixed(1)}%
                </h4>
                <p className="mt-1 text-sm font-semibold text-neutral-800">{viewingBudget.title}</p>
              </div>

              {/* Metadata Details Table */}
              <div className="mt-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Classification:</span>
                  <span className="font-bold text-[#1f2428] bg-neutral-100 px-2 py-0.5 rounded capitalize">
                    {viewingBudget.category} Limit
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Budget Type:</span>
                  <span className={`font-extrabold uppercase tracking-widest text-[10px] ${
                    viewingBudget.type === "income" ? "text-purple-600" : "text-[#1f2428]"
                  }`}>
                    {viewingBudget.type === "income" ? "Saving Goal (Inbound Target)" : "Spending Control (Outbound Limit)"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Periodicity:</span>
                  <span className="font-bold text-[#1f2428] capitalize">
                    {viewingBudget.period}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Limit Value:</span>
                  <span className="font-bold text-[#1f2428]">
                    ${viewingBudget.limit.toLocaleString('en-US')}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Consumed/Met Amount:</span>
                  <span className="font-bold text-[#1f2428]">
                    ${viewingBudget.spent.toLocaleString('en-US')}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Remaining Space:</span>
                  <span className={`font-extrabold ${
                    viewingBudget.limit - viewingBudget.spent >= 0 ? "text-emerald-600" : "text-red-600 animate-pulse"
                  }`}>
                    {viewingBudget.limit - viewingBudget.spent >= 0
                      ? `$${(viewingBudget.limit - viewingBudget.spent).toLocaleString('en-US')} Safe`
                      : `$${(viewingBudget.spent - viewingBudget.limit).toLocaleString('en-US')} Overspent!`
                    }
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Context Notes:</span>
                  <p className="rounded-xl bg-neutral-50 p-2.5 text-xs text-neutral-600 leading-relaxed border border-black/5 italic">
                    {viewingBudget.note}
                  </p>
                </div>
              </div>

              {/* Action Operations */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleDeleteBudget(viewingBudget.id, viewingBudget.title)}
                  className="w-1/3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-100 transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(viewingBudget)}
                  className="w-2/3 rounded-2xl bg-[#1f2428] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#343a40] transition flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Edit2 className="h-4 w-4" />
                  Modify Limits
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feature Grid Panel Block */}
        <FeatureGrid />

        {/* Applied Freedom Card */}
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
                The Budgets manager acts as a strategic navigator for outbound cashflows, giving users the tools to reinforce disciplines in real-time.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Establish strict monthly category spending limits",
                "Increase financial discipline through explicit target brackets",
                "Isolate and capture budget breaches early before billing releases",
                "Revise and adjust budget plans dynamically mid-cycle",
                "Construct and test custom internal savings sweep scenarios",
                "Filter flows exclusively by expense limits or income target goals",
                "Examine actual usage vs. planned brackets at granular category levels",
                "Detect high-pressure subscription or transport triggers automatically"
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

        {/* Ending Summary Call Center Panel */}
        <div className="mt-20 rounded-[38px] border border-[#e1e5e8] bg-[#1f2428] p-8 text-center text-white shadow-[0_35px_100px_rgba(31,36,40,0.2)] sm:p-12">
          <h4 className="text-lg font-bold">Budgets Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Rather than simply noting 'how much has left the vault', the Budgets page answers 'how closely am I holding to my strategic plan?'. Keep allocations healthy, detect spending pressure early, and make saving targets an automated reality.
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
      title: "1. Budget Structuring",
      desc: "Create category-specific limits or comprehensive general budgets. Set periodicities to align with salary arrivals.",
      icon: Plus
    },
    {
      title: "2. Real-Time Consumption",
      desc: "Instantly compare outbound limits with actual expenditures. View usage ratios and left-over margins on the fly.",
      icon: WalletCards
    },
    {
      title: "3. Multi-Flow Alignment",
      desc: "Segregate expense limits from income saving targets. Focus on inbound growth targets or outbound safeguards as needed.",
      icon: Layers
    },
    {
      title: "4. Risk & Threshold Warnings",
      desc: "Spot category budget breaches instantly. Dynamic capsules turn red or amber as you approach critical threshold limits.",
      icon: ShieldAlert
    },
    {
      title: "5. Periodic Breakdown",
      desc: "Reorganize category limits across different durations, isolating weekly pocket limits from monthly fixed bills.",
      icon: Clock
    },
    {
      title: "6. Transaction Sync",
      desc: "Let transactions ledger updates flow instantly into bütçe records. Monitor planned vs. actual differences without manual lists.",
      icon: Activity
    },
    {
      title: "7. High-Fidelity Analytics",
      desc: "Visualise overall allocation ratios with curated green/amber progress bars and quick numeric metrics summaries.",
      icon: Percent
    },
    {
      title: "8. Drill-down Operations",
      desc: "Tap any budget record to trigger details summaries. Modify allocated target limits or delete obsolete items in seconds.",
      icon: Layers
    },
    {
      title: "9. Allocation Security",
      desc: "Designed to keep financial schedules modular and private, preserving full offline limits and iCloudcontinuity sync.",
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
