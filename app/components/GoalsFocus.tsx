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
  ArrowRight,
  Clock,
  Target,
  Coins,
  ShieldCheck,
  Search
} from "lucide-react";

// Types
interface Goal {
  id: string;
  title: string;
  category: string;
  targetAmount: number;
  savedAmount: number;
  targetDate: string; // "YYYY-MM-DD" or "Cleared"
  priority: "Urgent" | "High" | "Medium" | "Low";
  monthlyPace: number; // monthly recommended saving amount
  note: string;
}

const initialGoals: Goal[] = [
  {
    id: "gl-1",
    title: "Emergency Stability Fund",
    category: "Stability",
    targetAmount: 15000,
    savedAmount: 7500,
    targetDate: "2026-12-31",
    priority: "High",
    monthlyPace: 750,
    note: "6 months of primary living expenses for financial safety net"
  },
  {
    id: "gl-2",
    title: "Summer Family Vacation",
    category: "Lifestyle",
    targetAmount: 5000,
    savedAmount: 4500,
    targetDate: "2026-07-15",
    priority: "Medium",
    monthlyPace: 250,
    note: "Summer travel bookings, flights, and accommodations"
  },
  {
    id: "gl-3",
    title: "Postgraduate Tech Hardware",
    category: "Career",
    targetAmount: 4000,
    savedAmount: 1200,
    targetDate: "2026-09-01",
    priority: "Medium",
    monthlyPace: 400,
    note: "Next-gen developer workstation and studio display upgrade"
  },
  {
    id: "gl-4",
    title: "Tax Liabilities Settle",
    category: "Fiscal",
    targetAmount: 3000,
    savedAmount: 3000,
    targetDate: "Cleared",
    priority: "Urgent",
    monthlyPace: 0,
    note: "Prior fiscal year tax balance settlement (FULLY CLEARED!)"
  }
];

const AVAILABLE_CATEGORIES = [
  "Stability",
  "Lifestyle",
  "Career",
  "Fiscal",
  "Property",
  "Education",
  "Other"
];

const PRIORITIES = ["Urgent", "High", "Medium", "Low"] as const;

export default function GoalsFocus() {
  // State
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [searchText, setSearchText] = useState("");
  const [timeframeFilter, setTimeframeFilter] = useState<"all" | "short" | "long">("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Modal Control
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [viewingGoal, setViewingGoal] = useState<Goal | null>(null);

  // Form States (New / Edit)
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState(AVAILABLE_CATEGORIES[0]);
  const [formTargetAmount, setFormTargetAmount] = useState<number | "">("");
  const [formSavedAmount, setFormSavedAmount] = useState<number | "">("");
  const [formTargetDate, setFormTargetDate] = useState("");
  const [formPriority, setFormPriority] = useState<Goal["priority"]>("Medium");
  const [formMonthlyPace, setFormMonthlyPace] = useState<number | "">("");
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
    setTimeframeFilter("all");
    setPriorityFilter("all");
    showNotification("All filters successfully reset", "success");
  };

  // Filter Logic
  const filteredGoals = useMemo(() => {
    return goals.filter((g) => {
      // Search text
      if (searchText) {
        const query = searchText.toLowerCase();
        const matchesTitle = g.title.toLowerCase().includes(query);
        const matchesCategory = g.category.toLowerCase().includes(query);
        const matchesNote = g.note.toLowerCase().includes(query);

        if (!matchesTitle && !matchesCategory && !matchesNote) return false;
      }

      // Timeframe Filter (Short Term <= 6 months, Long Term > 6 months)
      if (timeframeFilter !== "all" && g.targetDate !== "Cleared") {
        const targetDateObj = new Date(g.targetDate);
        const today = new Date();
        const diffTime = Math.max(0, targetDateObj.getTime() - today.getTime());
        const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44);

        if (timeframeFilter === "short" && diffMonths > 6) return false;
        if (timeframeFilter === "long" && diffMonths <= 6) return false;
      }

      // Priority
      if (priorityFilter !== "all" && g.priority !== priorityFilter) return false;

      return true;
    });
  }, [goals, searchText, timeframeFilter, priorityFilter]);

  // Statistics Calculations
  const stats = useMemo(() => {
    let totalTarget = 0;
    let totalSaved = 0;
    let remainingGap = 0;
    let recommendedPace = 0;

    filteredGoals.forEach((g) => {
      const isCleared = g.targetDate === "Cleared" || g.savedAmount >= g.targetAmount;

      totalTarget += g.targetAmount;
      totalSaved += g.savedAmount;

      if (!isCleared) {
        remainingGap += (g.targetAmount - g.savedAmount);
        recommendedPace += g.monthlyPace;
      }
    });

    const completionRate = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

    return {
      totalTarget,
      totalSaved,
      remainingGap,
      recommendedPace,
      completionRate,
      count: filteredGoals.length
    };
  }, [filteredGoals]);

  // Modal triggers
  const openAddModal = () => {
    setEditingGoal(null);
    setFormTitle("");
    setFormCategory(AVAILABLE_CATEGORIES[0]);
    setFormTargetAmount("");
    setFormSavedAmount("");
    setFormTargetDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString().split("T")[0]); // default to 6 months out
    setFormPriority("Medium");
    setFormMonthlyPace("");
    setFormNote("");
    setShowFormModal(true);
  };

  const openEditModal = (g: Goal) => {
    setEditingGoal(g);
    setFormTitle(g.title);
    setFormCategory(g.category);
    setFormTargetAmount(g.targetAmount);
    setFormSavedAmount(g.savedAmount);
    setFormTargetDate(g.targetDate === "Cleared" ? new Date().toISOString().split("T")[0] : g.targetDate);
    setFormPriority(g.priority);
    setFormMonthlyPace(g.monthlyPace);
    setFormNote(g.note);
    setShowFormModal(true);
    setShowDetailModal(false);
  };

  const handleOpenDetail = (g: Goal) => {
    setViewingGoal(g);
    setShowDetailModal(true);
  };

  // Submit Add or Edit Form
  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Please provide a goal title.");
      return;
    }
    if (!formTargetAmount || Number(formTargetAmount) <= 0) {
      alert("Please provide a valid target savings amount.");
      return;
    }

    const targetNum = Number(formTargetAmount);
    const savedNum = formSavedAmount ? Number(formSavedAmount) : 0;
    const isFullySaved = savedNum >= targetNum;

    // Estimate dynamic monthly contribution pace if not specified
    let calculatedPace = Number(formMonthlyPace) || 0;
    if (!calculatedPace && !isFullySaved) {
      const targetDateObj = new Date(formTargetDate);
      const today = new Date();
      const diffTime = Math.max(0, targetDateObj.getTime() - today.getTime());
      const diffMonths = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.44)));
      calculatedPace = Math.round((targetNum - savedNum) / diffMonths);
    }

    const goalData: Goal = {
      id: editingGoal ? editingGoal.id : `gl-${Date.now()}`,
      title: formTitle,
      category: formCategory,
      targetAmount: targetNum,
      savedAmount: Math.min(savedNum, targetNum), // saved amount shouldn't exceed target
      targetDate: isFullySaved ? "Cleared" : formTargetDate,
      priority: formPriority,
      monthlyPace: isFullySaved ? 0 : calculatedPace,
      note: formNote || "N/A"
    };

    if (editingGoal) {
      setGoals((prev) =>
        prev.map((g) => (g.id === editingGoal.id ? goalData : g))
      );
      showNotification(`"${formTitle}" savings goal updated successfully!`, "success");
    } else {
      setGoals((prev) => [goalData, ...prev]);
      showNotification(`"${formTitle}" savings goal registered successfully!`, "success");
    }

    setShowFormModal(false);
    setEditingGoal(null);
  };

  // Delete Goal
  const handleDeleteGoal = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the savings goal "${title}"?`)) {
      setGoals((prev) => prev.filter((g) => g.id !== id));
      setShowDetailModal(false);
      showNotification(`"${title}" deleted successfully.`, "danger");
    }
  };

  return (
    <section
      id="goals-focus"
      className="relative overflow-hidden bg-[#f5f6f7] px-6 pt-16 pb-28 text-[#1f2428]"
    >
      {/* Decorative ambient blur elements */}
      <div className="pointer-events-none absolute left-1/4 top-16 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      {/* Floating Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 scale-100 ${notification.type === "success"
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
            Control Center: Goals Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Convert abstract savings intentions into robust, time-bound financial roadmaps.
            Monitor target distances, track monthly contribution dynamics, configure category priorities,
            and balance liquid resource allocations under a premium calm layout.
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
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Target Deck</span>
                  </div>

                  {/* Add Goal Button */}
                  <button
                    onClick={openAddModal}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f2428] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#343a40] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Register Saving Goal
                  </button>
                </div>

                {/* Text Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Title, category, notes..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full rounded-2xl border border-[#e1e5e8] bg-white pl-10 pr-4 py-2.5 text-xs text-[#1f2428] shadow-sm outline-none transition focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Timeframe selector Filter */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Goal Timeframe</label>
                  <div className="grid grid-cols-3 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "all", label: "All" },
                      { key: "short", label: "Short Term" },
                      { key: "long", label: "Long Term" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setTimeframeFilter(item.key as any)}
                        className={`rounded-xl py-1.5 text-[9px] font-bold uppercase tracking-wider transition ${timeframeFilter === item.key
                          ? "bg-[#1f2428] text-white shadow-sm"
                          : "text-[#697077] hover:bg-[#f1f3f5]"
                          }`}
                        title={item.key === "short" ? "Target <= 6 months" : item.key === "long" ? "Target > 6 months" : "All dates"}
                      >
                        {item.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority Filter */}
                <div className="space-y-1.5 pt-2 border-t border-[#e1e5e8]">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Priority Ranking</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                  >
                    <option value="all">All Priorities</option>
                    {PRIORITIES.map((pri) => (
                      <option key={pri} value={pri}>{pri} Priority</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="mt-8 pt-4 border-t border-[#e1e5e8] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#697077]">
                  <span className="font-semibold">Matching:</span>
                  <span className="rounded-full bg-[#1f2428] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    {goals.filter((g) => filteredGoals.map(fg => fg.id).includes(g.id)).length}
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
                      label: "Total Targets Goal",
                      val: `$${stats.totalTarget.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                      color: "text-[#1f2428] bg-[#f8f9fa] border-neutral-200",
                      icon: Target
                    },
                    {
                      label: "Savings Contributed",
                      val: `+$${stats.totalSaved.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                      color: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
                      icon: Coins
                    },
                    {
                      label: "Remaining Target Gap",
                      val: `$${stats.remainingGap.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                      color: "text-indigo-700 bg-indigo-50/50 border-indigo-100",
                      icon: ArrowRight
                    },
                    {
                      label: "Recommended Saving Pace",
                      val: `$${stats.recommendedPace.toLocaleString(undefined, { minimumFractionDigits: 2 })}/mo`,
                      color: "text-amber-700 bg-amber-50/50 border-amber-100",
                      icon: Clock
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

                {/* Overall payoff progress tracker */}
                <div className="mb-6 rounded-3xl border border-[#e1e5e8] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1f2428] mb-2">
                    <span className="uppercase tracking-widest text-[#8b949b] text-[10px]">savings goal completion rate</span>
                    <span>{stats.completionRate.toFixed(1)}% Cleared</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-neutral-100 overflow-hidden relative border border-black/5">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>

                {/* Goals Grid */}
                <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-4 sm:p-6 min-h-[400px]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Goals Catalog Directory</h3>
                    <span className="rounded-full bg-white border border-[#e1e5e8] px-3.5 py-0.5 text-[10px] font-semibold text-[#5f6b73] shadow-sm">
                      Active: {goals.filter((g) => g.savedAmount < g.targetAmount).length} objectives
                    </span>
                  </div>

                  {filteredGoals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-[#e1e5e8] shadow-md text-neutral-400 mb-4 animate-pulse">
                        <AlertCircle className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428]">No goals matched</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-sm">
                        Adjust search filters or add a new saving target to initialize active tracking metrics.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {filteredGoals.map((g) => {
                        const percent = g.targetAmount > 0 ? (g.savedAmount / g.targetAmount) * 100 : 0;
                        const isCleared = g.targetDate === "Cleared" || g.savedAmount >= g.targetAmount;

                        let colorText = "text-neutral-500";
                        let colorBg = "bg-neutral-100 border-neutral-300 text-neutral-600";
                        let colorBar = "bg-neutral-500";
                        let statusText = "Cleared";

                        if (!isCleared) {
                          if (g.priority === "Urgent") {
                            colorText = "text-red-600";
                            colorBg = "bg-red-50 border-red-200 text-red-600 animate-pulse";
                            colorBar = "bg-red-500";
                            statusText = "Urgent";
                          } else if (g.priority === "High") {
                            colorText = "text-amber-600";
                            colorBg = "bg-amber-50 border-amber-200 text-amber-600";
                            colorBar = "bg-amber-500";
                            statusText = "High Priority";
                          } else {
                            colorText = "text-indigo-600";
                            colorBg = "bg-indigo-50 border-indigo-200 text-indigo-600";
                            colorBar = "bg-indigo-500";
                            statusText = "Active Target";
                          }
                        } else {
                          colorText = "text-emerald-600";
                          colorBg = "bg-emerald-50 border-emerald-200 text-emerald-600";
                          colorBar = "bg-emerald-500";
                        }

                        return (
                          <div
                            key={g.id}
                            onClick={() => handleOpenDetail(g)}
                            className="group flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-5 shadow-sm hover:border-[#1f2428] transition duration-200 cursor-pointer active:scale-[0.99]"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="rounded bg-neutral-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                                  {g.category}
                                </span>

                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-widest border ${colorBg}`}>
                                  <span className={`h-1 w-1 rounded-full ${isCleared ? "bg-emerald-500" : g.priority === "Urgent" ? "bg-red-500" : g.priority === "High" ? "bg-amber-500" : "bg-indigo-500"
                                    }`} />
                                  {statusText}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-[#1f2428] group-hover:text-black transition-colors line-clamp-1">
                                {g.title}
                              </h4>

                              {/* Subtitle description */}
                              <p className="mt-1 text-[9.5px] text-neutral-400 line-clamp-1 italic">
                                {g.note}
                              </p>
                            </div>

                            <div className="mt-6 space-y-2.5">
                              {/* Saved ratios */}
                              <div className="flex items-end justify-between text-xs">
                                <div>
                                  <span className="text-[8px] uppercase font-bold text-neutral-400 block tracking-wider">Savings Distance</span>
                                  <span className="font-extrabold text-[#1f2428]">
                                    ${g.savedAmount.toLocaleString()}
                                  </span>
                                  <span className="text-neutral-400 font-semibold text-[10px]">
                                    {" "}saved of ${g.targetAmount.toLocaleString()}
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
                                  style={{ width: `${percent}%` }}
                                />
                              </div>

                              {/* Target pacing information */}
                              <div className="flex justify-between items-center text-[9px] text-neutral-400 border-t border-neutral-50 pt-2 font-semibold">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 shrink-0" />
                                  {isCleared ? (
                                    <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                                      <ShieldCheck className="h-3 w-3 shrink-0" /> Fully Completed
                                    </span>
                                  ) : (
                                    `Target Date: ${g.targetDate}`
                                  )}
                                </span>
                                <span className="font-bold text-[#1f2428]">
                                  {isCleared ? "No Contribution" : `$${g.monthlyPace.toLocaleString()}/mo pace`}
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
                    Savings Objectives Assessment
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Currently managing <span className="font-semibold text-neutral-800">{stats.count} financial goals</span>.
                    Your overall targeted sum totals <span className="font-semibold text-neutral-800">${stats.totalTarget.toLocaleString()}</span>,
                    with <span className="font-semibold text-emerald-600">${stats.totalSaved.toLocaleString()}</span> successfully contributed so far.
                    {stats.remainingGap > 0 ? (
                      <span> To satisfy all active milestones before target deadlines, we recommend allocating a collective cash contribution of <span className="font-semibold text-amber-600">${stats.recommendedPace.toLocaleString()}/mo</span>, which integrates into bimonthly liquid plans.</span>
                    ) : (
                      " All active savings targets and milestones are fully completed and reached."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Goal Form Modal */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f2f3] text-[#1f2428]">
                    <Target className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#1f2428]">
                    {editingGoal ? "Modify Savings Goal" : "New Savings Goal Registration"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveGoal} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Goal Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emergency Fund, New Car Downpayment"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                  />
                </div>

                {/* Category & Priority Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Category</label>
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

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Priority Level</label>
                    <select
                      value={formPriority}
                      onChange={(e) => setFormPriority(e.target.value as Goal["priority"])}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      {PRIORITIES.map((pri) => (
                        <option key={pri} value={pri}>{pri}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Target Amount & Saved Amount Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Target savings Amount ($)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="0.00"
                      value={formTargetAmount}
                      onChange={(e) => setFormTargetAmount(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Savings Contributed ($)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formSavedAmount}
                      onChange={(e) => setFormSavedAmount(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Target Date & Monthly Payout Pace Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Target Date</label>
                    <input
                      type="date"
                      value={formTargetDate}
                      onChange={(e) => setFormTargetDate(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Monthly saving Pace ($)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Auto-calculated"
                      value={formMonthlyPace}
                      onChange={(e) => setFormMonthlyPace(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Notes Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Notes & Description</label>
                  <textarea
                    rows={2}
                    placeholder="Enter short contextual details about this savings objective..."
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] resize-none"
                  />
                </div>

                {/* Form Buttons */}
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
                    Save Savings Goal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Drill-down Detail Modal */}
        {showDetailModal && viewingGoal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                  <Layers className="h-3 w-3" />
                  Savings Specifications
                </span>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Amount Display Header */}
              <div className="text-center py-6 border-b border-neutral-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Remaining Savings Target Gap</span>
                <h4 className="mt-2 text-3xl font-black text-[#1f2428] tracking-tight">
                  ${(viewingGoal.targetAmount - viewingGoal.savedAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h4>
                <p className="mt-1.5 text-xs text-neutral-500 font-bold capitalize">
                  {((viewingGoal.savedAmount / viewingGoal.targetAmount) * 100).toFixed(0)}% Saved • {viewingGoal.title}
                </p>
              </div>

              {/* Metadata details table */}
              <div className="mt-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Category Type:</span>
                  <span className="font-bold text-[#1f2428] bg-neutral-100 px-2 py-0.5 rounded">
                    {viewingGoal.category}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Priority Level:</span>
                  <span className="font-bold text-[#1f2428]">
                    {viewingGoal.priority} Priority
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Target Savings Goal:</span>
                  <span className="font-bold text-[#1f2428]">
                    ${viewingGoal.targetAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Savings Contributed:</span>
                  <span className="font-bold text-emerald-600">
                    ${viewingGoal.savedAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Target Deadline:</span>
                  <span className="font-bold text-[#1f2428] flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                    {viewingGoal.targetDate === "Cleared" ? "Fully Completed" : viewingGoal.targetDate}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Suggested Saving Rate:</span>
                  <span className="font-bold text-[#1f2428]">
                    {viewingGoal.targetDate === "Cleared" ? "N/A" : `$${viewingGoal.monthlyPace.toLocaleString()}/mo pace`}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Context Notes:</span>
                  <p className="rounded-xl bg-neutral-50 p-2.5 text-xs text-neutral-600 leading-relaxed border border-black/5 italic">
                    {viewingGoal.note}
                  </p>
                </div>
              </div>

              {/* Action Operations */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleDeleteGoal(viewingGoal.id, viewingGoal.title)}
                  className="w-1/3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-100 transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(viewingGoal)}
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
                The Goals control center changes static saving accounts into visually structured timelines, helping you allocate liquid assets effectively and build savings discipline.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Structure emergency reserve, lifestyle vacation, and hardware saving metrics",
                "Log dynamic savings milestones and time-bound targeted goal totals",
                "Track contributed funds vs. outstanding savings gap reactively in real-time",
                "Evaluate the monthly savings rate needed to reach goals before deadlines",
                "Prioritize multiple saving objectives (Urgent, High, Medium, Low categories)",
                "Segment target lines by short-term timeframe and long-term milestones",
                "Analyze cumulative targeted parameters across all active saving products",
                "Add, modify, clear, or delete goals dynamically with client-side reactive speed"
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
          <h4 className="text-lg font-bold">Goals Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Goals provides structured planning pathways. It sets clear, measurable timelines, recommends monthly savings tempos, tracks completion metrics, and aligns daily cashflow habits with future capital outcomes. Let progress keep you motivated.
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
      title: "1. Savings Objective Creator",
      desc: "Register new saving plans, target dates, priority ranking, and starting balances dynamically in seconds.",
      icon: Plus
    },
    {
      title: "2. Goal Progress Tracking",
      desc: "Observe saved contributions vs. target sums on progress tracks. Completion percentages update reactively.",
      icon: TrendingUp
    },
    {
      title: "3. Suggested Contribution Pace",
      desc: "Estimate recommended monthly saving tempos automatically based on target timelines and outstanding gap balances.",
      icon: Clock
    },
    {
      title: "4. Multi-Criteria Search",
      desc: "Filter objectives dynamically by name, description, priority categories, and timeframe boundaries.",
      icon: Search
    },
    {
      title: "5. Short & Long Term splits",
      desc: "Isolate goals by timeframe. Distinguish short-term timelines (< 6 months) from long-term capital milestones easily.",
      icon: Calendar
    },
    {
      title: "6. Priority Allocation Tagging",
      desc: "Assign priority ranking tags (Urgent, High, Medium, Low) to keep high-urgency liquid targets prominently visible.",
      icon: Tag
    },
    {
      title: "7. Drilled-Down Inspectors",
      desc: "Click any goal card to display comprehensive statistics, progress metrics, notes, and CRUD modifiers.",
      icon: Layers
    },
    {
      title: "8. Unified Liquid Registry",
      desc: "Assemble emergency reserves, lifestyle travel budgets, career investments, and debt funds in one panel.",
      icon: Target
    },
    {
      title: "9. Offline Continuity Security",
      desc: "Retain total local privacy over saving milestones with zero external database tracking and iCloud support.",
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
