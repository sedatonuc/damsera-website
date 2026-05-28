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
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
  Clock,
  WalletCards,
  Percent,
  ShieldAlert,
  Repeat,
  Pause,
  Play,
  Flame,
  Search
} from "lucide-react";

// Types
type SubBillingCycle = "monthly" | "yearly" | "weekly";
type SubStatus = "Active" | "Paused" | "To Cancel";

interface Subscription {
  id: string;
  title: string;
  cost: number;
  cycle: SubBillingCycle;
  status: SubStatus;
  date: string; // "YYYY-MM-DD" or "Paused"
  source: string;
  category: string;
  note: string;
  brandColor?: string; // e.g. "bg-red-500"
}

const initialSubscriptions: Subscription[] = [
  {
    id: "sub-1",
    title: "Netflix Premium Bundle",
    cost: 22.99,
    cycle: "monthly",
    status: "Active",
    date: "2026-05-22",
    source: "Credit Card",
    category: "Entertainment",
    note: "Automatic monthly 4K streaming bundle renewal",
    brandColor: "bg-red-600 text-white border-red-200"
  },
  {
    id: "sub-2",
    title: "Spotify Family Premium",
    cost: 16.99,
    cycle: "monthly",
    status: "Active",
    date: "2026-06-02",
    source: "Credit Card",
    category: "Entertainment",
    note: "Automatic family music streaming channels",
    brandColor: "bg-emerald-600 text-white border-emerald-200"
  },
  {
    id: "sub-3",
    title: "iCloud+ Storage 2TB",
    cost: 9.99,
    cycle: "monthly",
    status: "Active",
    date: "2026-06-02",
    source: "Checking Account",
    category: "Cloud Storage",
    note: "iCloud automatic storage backups and secure relay services",
    brandColor: "bg-sky-500 text-white border-sky-200"
  },
  {
    id: "sub-4",
    title: "ChatGPT Plus Pro",
    cost: 20.0,
    cycle: "monthly",
    status: "Active",
    date: "2026-05-28",
    source: "Credit Card",
    category: "AI Tools",
    note: "Advanced model reasoning and code interpreter tools",
    brandColor: "bg-teal-600 text-white border-teal-200"
  },
  {
    id: "sub-5",
    title: "Adobe Creative Cloud",
    cost: 54.99,
    cycle: "monthly",
    status: "To Cancel",
    date: "2026-05-30",
    source: "Checking Account",
    category: "Creative Tools",
    note: "Full suite license (Flagged for cancellation review!)",
    brandColor: "bg-amber-600 text-white border-amber-200"
  },
  {
    id: "sub-6",
    title: "Gold's Gym Membership",
    cost: 80.0,
    cycle: "monthly",
    status: "Paused",
    date: "Paused",
    source: "Cash",
    category: "Health & Fitness",
    note: "On hold temporarily during physical therapy recovery",
    brandColor: "bg-neutral-500 text-white border-neutral-200"
  },
  {
    id: "sub-7",
    title: "GitHub Copilot Pro",
    cost: 10.0,
    cycle: "monthly",
    status: "Active",
    date: "2026-06-15",
    source: "Credit Card",
    category: "Developer Tools",
    note: "AI autocompleter and pair programming assistant integration",
    brandColor: "bg-indigo-600 text-white border-indigo-200"
  }
];

const AVAILABLE_ACCOUNTS = [
  "Checking Account",
  "Credit Card",
  "Cash",
  "High-Yield Savings"
];

const AVAILABLE_CATEGORIES = [
  "Entertainment",
  "Cloud Storage",
  "AI Tools",
  "Creative Tools",
  "Health & Fitness",
  "Developer Tools",
  "Other"
];

export default function SubscriptionsFocus() {
  // State
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [searchText, setSearchText] = useState("");
  const [cycleFilter, setCycleFilter] = useState<"all" | SubBillingCycle>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | SubStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal Control
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [viewingSub, setViewingSub] = useState<Subscription | null>(null);

  // Form States (New / Edit)
  const [formTitle, setFormTitle] = useState("");
  const [formCost, setFormCost] = useState<number | "">("");
  const [formCycle, setFormCycle] = useState<SubBillingCycle>("monthly");
  const [formStatus, setFormStatus] = useState<SubStatus>("Active");
  const [formDate, setFormDate] = useState("");
  const [formSource, setFormSource] = useState(AVAILABLE_ACCOUNTS[0]);
  const [formCategory, setFormCategory] = useState(AVAILABLE_CATEGORIES[0]);
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
    setCycleFilter("all");
    setStatusFilter("all");
    setCategoryFilter("all");
    showNotification("All filters successfully reset", "success");
  };

  // Filter Logic
  const filteredSubs = useMemo(() => {
    return subscriptions.filter((sub) => {
      // Search text
      if (searchText) {
        const query = searchText.toLowerCase();
        const matchesTitle = sub.title.toLowerCase().includes(query);
        const matchesCategory = sub.category.toLowerCase().includes(query);
        const matchesNote = sub.note.toLowerCase().includes(query);

        if (!matchesTitle && !matchesCategory && !matchesNote) return false;
      }

      // Billing Cycle
      if (cycleFilter !== "all" && sub.cycle !== cycleFilter) return false;

      // Status
      if (statusFilter !== "all" && sub.status !== statusFilter) return false;

      // Category
      if (categoryFilter !== "all" && sub.category !== categoryFilter) return false;

      return true;
    });
  }, [subscriptions, searchText, cycleFilter, statusFilter, categoryFilter]);

  // Statistics Calculations (MRR & ARR Outbound impacts)
  const stats = useMemo(() => {
    let mrr = 0;
    let arr = 0;
    let activeCount = 0;
    let pausedCount = 0;
    let potentialSavings = 0;

    filteredSubs.forEach((sub) => {
      if (sub.status === "Active") activeCount++;
      else if (sub.status === "Paused") pausedCount++;

      // Convert cost to monthly/yearly equivalents
      let monthlyCost = sub.cost;
      if (sub.cycle === "yearly") {
        monthlyCost = sub.cost / 12;
      } else if (sub.cycle === "weekly") {
        monthlyCost = sub.cost * 4.33;
      }

      if (sub.status !== "Paused") {
        mrr += monthlyCost;
        arr += monthlyCost * 12;
      }

      // Calculate potential savings for subscriptions marked as "To Cancel"
      if (sub.status === "To Cancel") {
        potentialSavings += monthlyCost;
      }
    });

    return {
      mrr,
      arr,
      activeCount,
      pausedCount,
      potentialSavings,
      count: filteredSubs.length
    };
  }, [filteredSubs]);

  // Modal actions
  const openAddModal = () => {
    setEditingSub(null);
    setFormTitle("");
    setFormCost("");
    setFormCycle("monthly");
    setFormStatus("Active");
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormSource(AVAILABLE_ACCOUNTS[0]);
    setFormCategory(AVAILABLE_CATEGORIES[0]);
    setFormNote("");
    setShowFormModal(true);
  };

  const openEditModal = (sub: Subscription) => {
    setEditingSub(sub);
    setFormTitle(sub.title);
    setFormCost(sub.cost);
    setFormCycle(sub.cycle);
    setFormStatus(sub.status);
    setFormDate(sub.date === "Paused" ? new Date().toISOString().split("T")[0] : sub.date);
    setFormSource(sub.source);
    setFormCategory(sub.category);
    setFormNote(sub.note);
    setShowFormModal(true);
    setShowDetailModal(false);
  };

  const handleOpenDetail = (sub: Subscription) => {
    setViewingSub(sub);
    setShowDetailModal(true);
  };

  // Submit Add or Edit Form
  const handleSaveSubscription = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Please provide a subscription title.");
      return;
    }
    if (!formCost || Number(formCost) <= 0) {
      alert("Please provide a valid cost.");
      return;
    }

    const subData: Subscription = {
      id: editingSub ? editingSub.id : `sub-${Date.now()}`,
      title: formTitle,
      cost: Number(formCost),
      cycle: formCycle,
      status: formStatus,
      date: formStatus === "Paused" ? "Paused" : formDate,
      source: formSource,
      category: formCategory,
      note: formNote || "N/A"
    };

    // Assign generic brand color class based on category
    if (formCategory === "Entertainment") {
      subData.brandColor = "bg-red-600 text-white border-red-200";
    } else if (formCategory === "Cloud Storage") {
      subData.brandColor = "bg-sky-500 text-white border-sky-200";
    } else if (formCategory === "AI Tools") {
      subData.brandColor = "bg-teal-600 text-white border-teal-200";
    } else if (formCategory === "Creative Tools") {
      subData.brandColor = "bg-amber-600 text-white border-amber-200";
    } else if (formCategory === "Health & Fitness") {
      subData.brandColor = "bg-neutral-500 text-white border-neutral-200";
    } else if (formCategory === "Developer Tools") {
      subData.brandColor = "bg-indigo-600 text-white border-indigo-200";
    } else {
      subData.brandColor = "bg-slate-600 text-white border-slate-200";
    }

    if (editingSub) {
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === editingSub.id ? subData : s))
      );
      showNotification(`"${formTitle}" subscription updated successfully!`, "success");
    } else {
      setSubscriptions((prev) => [subData, ...prev]);
      showNotification(`"${formTitle}" subscription added successfully!`, "success");
    }

    setShowFormModal(false);
    setEditingSub(null);
  };

  // Delete Subscription
  const handleDeleteSub = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the subscription "${title}"?`)) {
      setSubscriptions((prev) => prev.filter((s) => s.id !== id));
      setShowDetailModal(false);
      showNotification(`"${title}" deleted successfully.`, "danger");
    }
  };

  return (
    <section
      id="subscriptions-focus"
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
            Control Center: Subscriptions Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's subscriptions control workspace aggregates scattered, recurring outbounds
            into a singular visual registry. Track billing frequencies, calculate monthly and annual cost loads,
            and pause or review duplicate memberships for proactive cost-optimization sweeps.
          </p>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="mt-16 overflow-hidden rounded-[42px] border border-[#e1e5e8] bg-white p-5 shadow-[0_40px_120px_rgba(31,36,40,0.12)]  sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar Controls & Parameters */}
            <div className="flex flex-col justify-between rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-5">
              <div className="space-y-6">
                <div>
                  <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Services Registry</span>
                  </div>

                  {/* Add Subscription Button */}
                  <button
                    onClick={openAddModal}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f2428] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#343a40] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Add Subscription
                  </button>
                </div>

                {/* Text Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search platform name..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full rounded-2xl border border-[#e1e5e8] bg-white pl-10 pr-4 py-2.5 text-xs text-[#1f2428] shadow-sm outline-none transition focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Billing Cycle Tab */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Billing Frequency</label>
                  <div className="grid grid-cols-3 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "all", label: "All" },
                      { key: "monthly", label: "Monthly" },
                      { key: "yearly", label: "Yearly" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setCycleFilter(item.key as any)}
                        className={`rounded-xl py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                          cycleFilter === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Plan Status</label>
                  <div className="grid grid-cols-4 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "all", label: "All" },
                      { key: "Active", label: "Act" },
                      { key: "Paused", label: "Psd" },
                      { key: "To Cancel", label: "Cxl" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setStatusFilter(item.key as any)}
                        className={`rounded-xl py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                          statusFilter === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                        title={item.key === "To Cancel" ? "Flagged for cancellation review" : item.key}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category select dropdown */}
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
                {/* Cost calculators metrics widgets */}
                <div className="mb-6 grid gap-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Total Monthly Load (MRR)",
                      val: `$${stats.mrr.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                      color: "text-[#1f2428] bg-neutral-50 border-neutral-200",
                      icon: Repeat
                    },
                    {
                      label: "Projected Annual Outflow",
                      val: `$${stats.arr.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                      color: "text-red-700 bg-red-50/50 border-red-100",
                      icon: TrendingUp
                    },
                    {
                      label: "Active Memberships",
                      val: `${stats.activeCount} Channels`,
                      color: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
                      icon: CheckCircle2
                    },
                    {
                      label: "Potential Cancel Savings",
                      val: stats.potentialSavings > 0 ? `$${stats.potentialSavings.toFixed(2)}/mo` : "$0.00/mo",
                      color: stats.potentialSavings > 0 ? "text-amber-700 bg-amber-50/60 border-amber-100 shadow-sm animate-pulse" : "text-slate-500 bg-slate-50/50 border-slate-100",
                      icon: Flame
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

                {/* Subscriptions Cards Grid */}
                <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-4 sm:p-6 min-h-[460px]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Active Portfolios Index</h3>
                    <span className="rounded-full bg-white border border-[#e1e5e8] px-3.5 py-0.5 text-[10px] font-semibold text-[#5f6b73] shadow-sm">
                      Total inventory: {subscriptions.length} services
                    </span>
                  </div>

                  {filteredSubs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-[#e1e5e8] shadow-md text-neutral-400 mb-4 animate-pulse">
                        <AlertCircle className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428]">No subscriptions matched</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-sm">
                        Adjust search filters or add a new recurring platform to populate portfolio tracking logs.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredSubs.map((sub) => {
                        const isActive = sub.status === "Active";
                        const isPaused = sub.status === "Paused";
                        const isToCancel = sub.status === "To Cancel";

                        let statusColor = "bg-emerald-50 border-emerald-200 text-emerald-600";
                        if (isPaused) {
                          statusColor = "bg-neutral-100 border-neutral-300 text-neutral-600";
                        } else if (isToCancel) {
                          statusColor = "bg-amber-50 border-amber-200 text-amber-600 animate-pulse";
                        }

                        // Determine default brand colors if not specified
                        const headerColor = sub.brandColor || "bg-slate-600 text-white";

                        return (
                          <div
                            key={sub.id}
                            onClick={() => handleOpenDetail(sub)}
                            className="group flex flex-col justify-between rounded-2xl border border-black/5 bg-white overflow-hidden shadow-sm hover:border-[#1f2428] transition duration-200 cursor-pointer active:scale-[0.99]"
                          >
                            {/* Brand Header Banner */}
                            <div className={`px-4 py-3 flex items-center justify-between ${headerColor}`}>
                              <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">
                                {sub.category}
                              </span>
                              <Repeat className="h-4 w-4 opacity-40 shrink-0" />
                            </div>

                            {/* Info Body */}
                            <div className="p-4 flex flex-col justify-between flex-1">
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-xs font-bold text-[#1f2428] group-hover:text-black transition-colors line-clamp-1">
                                    {sub.title}
                                  </h4>
                                </div>

                                <p className="text-[9.5px] text-neutral-400 line-clamp-1 italic mb-4">
                                  {sub.note}
                                </p>
                              </div>

                              <div className="space-y-3.5 pt-3 border-t border-neutral-50 mt-auto">
                                {/* Price details */}
                                <div className="flex items-end justify-between">
                                  <div>
                                    <span className="text-[8px] uppercase font-bold text-neutral-400 block tracking-wider">Recurring Fee</span>
                                    <span className="text-base font-black text-[#1f2428] tracking-tight">
                                      ${sub.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                    <span className="text-[10px] text-neutral-400 font-semibold lowercase">
                                      /{sub.cycle === "weekly" ? "wk" : sub.cycle === "yearly" ? "yr" : "mo"}
                                    </span>
                                  </div>

                                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest border ${statusColor}`}>
                                    <span className={`h-1 w-1 rounded-full ${
                                      isActive ? "bg-emerald-500" : isPaused ? "bg-neutral-500" : "bg-amber-500"
                                    }`} />
                                    {sub.status === "To Cancel" ? "Review" : sub.status}
                                  </span>
                                </div>

                                {/* Renewal details */}
                                <div className="flex justify-between items-center text-[9px] text-neutral-400 border-t border-neutral-50 pt-2 font-semibold">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3 shrink-0" />
                                    {isPaused ? "Billing Paused" : `Renews: ${sub.date}`}
                                  </span>
                                  <span className="font-bold text-[#1f2428]">
                                    {sub.source.split(" ")[0]}
                                  </span>
                                </div>
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
                    Subscription Portfolio Analytics
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Currently tracking <span className="font-semibold text-neutral-800">{stats.count} recurring items</span>. 
                    Your active monthly load represents <span className="font-semibold text-neutral-800">${stats.mrr.toFixed(2)}/mo</span>, 
                    creating a projected annual outflow of <span className="font-semibold text-red-600">${stats.arr.toFixed(2)}/yr</span>. 
                    {stats.potentialSavings > 0 ? (
                      <span className="text-amber-600 font-bold"> Note: Flagging Adobe CC and other review assets can instantly secure ${stats.potentialSavings.toFixed(2)}/mo in monthly savings.</span>
                    ) : (
                      " All recurring platform assets are active and reconciled under safe limits."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Form Modal (Add / Edit) */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f2f3] text-[#1f2428]">
                    <Repeat className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#1f2428]">
                    {editingSub ? "Edit Recurring Service" : "New Subscription Registration"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveSubscription} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Platform / Service Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Netflix, Figma, Spotify"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                  />
                </div>

                {/* Cost & Cycle Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Cost Value ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      min="0.01"
                      placeholder="0.00"
                      value={formCost}
                      onChange={(e) => setFormCost(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Billing Cycle</label>
                    <select
                      value={formCycle}
                      onChange={(e) => setFormCycle(e.target.value as SubBillingCycle)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                {/* Status & Next Renewal Date Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Plan Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as SubStatus)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="Active">Active (billing)</option>
                      <option value="Paused">Paused (on hold)</option>
                      <option value="To Cancel">To Cancel (under review)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Next Renewal Date</label>
                    <input
                      type="date"
                      required
                      disabled={formStatus === "Paused"}
                      value={formStatus === "Paused" ? "" : formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] disabled:bg-neutral-50 disabled:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Account Source & Category Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Payment Channel Source</label>
                    <select
                      value={formSource}
                      onChange={(e) => setFormSource(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      {AVAILABLE_ACCOUNTS.map((acc) => (
                        <option key={acc} value={acc}>{acc}</option>
                      ))}
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

                {/* Description Note */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Notes & Description</label>
                  <textarea
                    rows={2}
                    placeholder="Enter context notes (e.g. streaming tiers, sharing rules)..."
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] resize-none"
                  />
                </div>

                {/* Action buttons */}
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
                    {editingSub ? "Save Changes" : "Register Platform"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Drill-down Detail Modal */}
        {showDetailModal && viewingSub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                  <Layers className="h-3 w-3" />
                  Service Specifications
                </span>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Cost Header Display */}
              <div className="text-center py-6 border-b border-neutral-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Regular Subscription Fee</span>
                <h4 className="mt-2 text-3xl font-black text-[#1f2428] tracking-tight">
                  ${viewingSub.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h4>
                <p className="mt-1.5 text-xs text-neutral-500 font-bold capitalize">
                  Billed {viewingSub.cycle} • {viewingSub.title}
                </p>
              </div>

              {/* Metadata Details Table */}
              <div className="mt-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Classification Category:</span>
                  <span className="font-bold text-[#1f2428] bg-neutral-100 px-2 py-0.5 rounded">
                    {viewingSub.category}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Time Period Cycle:</span>
                  <span className="font-bold text-[#1f2428] capitalize">
                    {viewingSub.cycle}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Automatic Payment Account:</span>
                  <span className="font-bold text-[#1f2428]">
                    {viewingSub.source}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Next Scheduled Renewal:</span>
                  <span className="font-bold text-[#1f2428] flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                    {viewingSub.date === "Paused" ? "Paused (On Hold)" : viewingSub.date}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Status:</span>
                  <span className={`inline-flex items-center gap-1 rounded bg-neutral-100/80 border border-black/5 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest ${
                    viewingSub.status === "Active"
                      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                      : viewingSub.status === "Paused"
                        ? "text-neutral-600 bg-neutral-50 border-neutral-200"
                        : "text-amber-600 bg-amber-50 border-amber-200"
                  }`}>
                    {viewingSub.status}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Context Notes:</span>
                  <p className="rounded-xl bg-neutral-50 p-2.5 text-xs text-neutral-600 leading-relaxed border border-black/5 italic">
                    {viewingSub.note}
                  </p>
                </div>
              </div>

              {/* Action Operations */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleDeleteSub(viewingSub.id, viewingSub.title)}
                  className="w-1/3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-100 transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(viewingSub)}
                  className="w-2/3 rounded-2xl bg-[#1f2428] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#343a40] transition flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Edit2 className="h-4 w-4" />
                  Modify Details
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
                The Subscriptions portfolio tracker turns complex recurring cash leaks into an organized inventory designed for proactive cost reduction.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Consolidate scattered membership platforms in a single index",
                "Add and configure custom monthly or annual cycles",
                "Evaluate complete monthly (MRR) recurring cash outbounds",
                "Project annual financial load impacts of platform outlays",
                "Flag duplicate or redundant memberships as 'To Cancel'",
                "Temporarily pause active billing plans during low utility",
                "Isolate cloud, AI, and creative tool categories cleanly",
                "Edit details or delete obsolete service accounts in seconds"
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
          <h4 className="text-lg font-bold">Subscriptions Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Rather than letting small recurring payments drain your liquidity, the Subscriptions page maps out structural financial loads clearly. Keep platforms organized, pause under-used plans, and secure a lean, efficient subscription portfolio.
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
      title: "1. Consolidated Registry",
      desc: "Assemble all recurring memberships, cloud storages, and SaaS tools in a single unified command deck.",
      icon: Layers
    },
    {
      title: "2. Real-Time Cost Load",
      desc: "Evaluate overall monthly cost metrics (MRR) instantly. Toggles update values automatically to represent changes.",
      icon: DollarSign
    },
    {
      title: "3. Projected Annual Impacts",
      desc: "View projected yearly financial impacts (ARR) of active platforms. Expose cumulative outflow weights early.",
      icon: TrendingUp
    },
    {
      title: "4. Lifecycle Managers",
      desc: "Assign Active, Paused, or To Cancel statuses. Tag redundant items under review to earmark potential cash savings.",
      icon: Flame
    },
    {
      title: "5. Time-Triggered Renewals",
      desc: "Monitor upcoming renewal date countdowns. Avoid payment surprises and overdrafts on automatic renewals.",
      icon: Clock
    },
    {
      title: "6. Platform Classification",
      desc: "Organize portfolios by categories (AI Tools, Creative, Entertainment, SaaS). Track category budgets.",
      icon: Tag
    },
    {
      title: "7. Custom Platform Creator",
      desc: "Log custom platforms with title descriptions, payment sources, billing cycles, and next renewal dates.",
      icon: Plus
    },
    {
      title: "8. Drill-Down Inspectors",
      desc: "Tap any platform card to display full details, billing periodicity, source card, notes, and quick CRUD actions.",
      icon: ChevronDown
    },
    {
      title: "9. Offline Continuity Security",
      desc: "Preserve full offline inventory records and continuous cross-device continuity sweeps via iCloud sync.",
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
