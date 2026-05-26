"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
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
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  BellRing,
  Trash2,
  CalendarDays,
  Filter,
  Check,
  Tag,
  Percent
} from "lucide-react";

// Types
type CalTransactionType = "inflow" | "outflow" | "transfer";
type CalTransactionStatus = "Completed" | "Pending";

interface CalTransaction {
  id: string;
  title: string;
  type: CalTransactionType;
  category: string;
  amount: number;
  date: string; // "YYYY-MM-DD"
  source: string;
  target?: string;
  status: CalTransactionStatus;
  tag: string;
  note: string;
}

const initialCalTransactions: CalTransaction[] = [
  {
    id: "ctx-1",
    title: "Apartment Rent Payment",
    type: "outflow",
    category: "Housing",
    amount: 1800,
    date: "2026-05-01",
    source: "Checking Account",
    status: "Completed",
    tag: "Living",
    note: "May monthly rental contract sweep"
  },
  {
    id: "ctx-2",
    title: "TechCorp Monthly Salary",
    type: "inflow",
    category: "Salary",
    amount: 5400,
    date: "2026-05-15",
    source: "Checking Account",
    status: "Completed",
    tag: "Primary",
    note: "Regular payroll deposit"
  },
  {
    id: "ctx-3",
    title: "Dividend Payout (AAPL)",
    type: "inflow",
    category: "Investments",
    amount: 145.0,
    date: "2026-05-18",
    source: "Investment Account",
    status: "Completed",
    tag: "Passive",
    note: "Quarterly stock equity payout"
  },
  {
    id: "ctx-4",
    title: "Transfer to Savings Sweep",
    type: "transfer",
    category: "Savings",
    amount: 1000,
    date: "2026-05-20",
    source: "Checking Account",
    target: "High-Yield Savings",
    status: "Completed",
    tag: "Savings",
    note: "Strategic monthly sweeps"
  },
  {
    id: "ctx-5",
    title: "Weekly Grocery Provisions",
    type: "outflow",
    category: "Food & Dining",
    amount: 185.4,
    date: "2026-05-21",
    source: "Credit Card",
    status: "Completed",
    tag: "Living",
    note: "Fresh organic food supplies"
  },
  {
    id: "ctx-6",
    title: "Netflix Premium Subscription",
    type: "outflow",
    category: "Subscriptions",
    amount: 22.99,
    date: "2026-05-22",
    source: "Credit Card",
    status: "Completed",
    tag: "Personal",
    note: "Streaming subscription renewal"
  },
  {
    id: "ctx-7",
    title: "Starbucks Coffee & Bakery",
    type: "outflow",
    category: "Food & Dining",
    amount: 18.5,
    date: "2026-05-23",
    source: "Credit Card",
    status: "Completed",
    tag: "Personal",
    note: "Double espresso and quick breakfast pastries"
  },
  {
    id: "ctx-8",
    title: "Freelance UI Design",
    type: "inflow",
    category: "Salary",
    amount: 1200.0,
    date: "2026-05-25",
    source: "Checking Account",
    status: "Pending",
    tag: "Project X",
    note: "Client web design milestone check release"
  },
  {
    id: "ctx-9",
    title: "Electricity & Gas Bill",
    type: "outflow",
    category: "Bills & Utilities",
    amount: 124.5,
    date: "2026-05-28",
    source: "Checking Account",
    status: "Pending",
    tag: "Living",
    note: "Projected monthly utility billing charge"
  }
];

const AVAILABLE_ACCOUNTS = [
  "Checking Account",
  "Credit Card",
  "Cash",
  "High-Yield Savings",
  "Investment Account"
];

const AVAILABLE_CATEGORIES = [
  "Housing",
  "Food & Dining",
  "Subscriptions",
  "Transport",
  "Shopping",
  "Savings",
  "Investments",
  "Salary",
  "Bills & Utilities",
  "Other"
];

// Helper to determine starting slots for May 2026 (Starts on a Friday)
const STARTING_PADDING_CELLS = 5; // Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5
const DAYS_IN_MAY = 31;

export default function CalendarFocus() {
  // State
  const [transactions, setTransactions] = useState<CalTransaction[]>(initialCalTransactions);
  const [selectedDateStr, setSelectedDateStr] = useState("2026-05-15");
  const [typeFilter, setTypeFilter] = useState<"all" | CalTransactionType>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Modal control
  const [showAddModal, setShowAddModal] = useState(false);

  // Form States
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState<CalTransactionType>("outflow");
  const [formCategory, setFormCategory] = useState(AVAILABLE_CATEGORIES[0]);
  const [formAmount, setFormAmount] = useState<number | "">("");
  const [formSource, setFormSource] = useState(AVAILABLE_ACCOUNTS[0]);
  const [formTarget, setFormTarget] = useState(AVAILABLE_ACCOUNTS[3]);
  const [formStatus, setFormStatus] = useState<CalTransactionStatus>("Completed");
  const [formTag, setFormTag] = useState("Living");
  const [formNote, setFormNote] = useState("");

  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Filter transactions for dots and list matches
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (typeFilter !== "all" && tx.type !== typeFilter) return false;
      if (categoryFilter !== "all" && tx.category !== categoryFilter) return false;
      if (sourceFilter !== "all") {
        if (tx.type === "transfer") {
          if (tx.source !== sourceFilter && tx.target !== sourceFilter) return false;
        } else {
          if (tx.source !== sourceFilter) return false;
        }
      }
      return true;
    });
  }, [transactions, typeFilter, categoryFilter, sourceFilter]);

  // Group transactions by Date String for quick cell lookup
  const transactionsByDate = useMemo(() => {
    const map: Record<string, CalTransaction[]> = {};
    filteredTransactions.forEach((tx) => {
      if (!map[tx.date]) {
        map[tx.date] = [];
      }
      map[tx.date].push(tx);
    });
    return map;
  }, [filteredTransactions]);

  // Selected Date Info
  const selectedDayActivity = useMemo(() => {
    return transactionsByDate[selectedDateStr] || [];
  }, [transactionsByDate, selectedDateStr]);

  const selectedDayStats = useMemo(() => {
    let inflow = 0;
    let outflow = 0;
    selectedDayActivity.forEach((tx) => {
      if (tx.type === "inflow") inflow += tx.amount;
      else if (tx.type === "outflow") outflow += tx.amount;
    });
    return {
      inflow,
      outflow,
      net: inflow - outflow
    };
  }, [selectedDayActivity]);

  // Overall Month Statistics
  const monthStats = useMemo(() => {
    let earned = 0;
    let spent = 0;
    let obligations = 0;

    transactions.forEach((tx) => {
      if (tx.status === "Pending") obligations++;
      if (tx.type === "inflow") earned += tx.amount;
      else if (tx.type === "outflow") spent += tx.amount;
    });

    return {
      earned,
      spent,
      net: earned - spent,
      obligations
    };
  }, [transactions]);

  // List of upcoming obligations with alerts (Pending status items)
  const upcomingObligations = useMemo(() => {
    return transactions.filter((tx) => tx.status === "Pending").sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions]);

  // Modal triggers
  const handleOpenAddModal = () => {
    setFormTitle("");
    setFormType("outflow");
    setFormCategory(AVAILABLE_CATEGORIES[0]);
    setFormAmount("");
    setFormSource(AVAILABLE_ACCOUNTS[0]);
    setFormTarget(AVAILABLE_ACCOUNTS[3]);
    setFormStatus("Completed");
    setFormTag("Living");
    setFormNote("");
    setShowAddModal(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Please provide an event title.");
      return;
    }
    if (!formAmount || Number(formAmount) <= 0) {
      alert("Please provide a valid amount.");
      return;
    }

    const newTx: CalTransaction = {
      id: `ctx-${Date.now()}`,
      title: formTitle,
      type: formType,
      category: formCategory,
      amount: Number(formAmount),
      date: selectedDateStr,
      source: formSource,
      tag: formTag,
      status: formStatus,
      note: formNote || "N/A",
      ...(formType === "transfer" ? { target: formTarget } : {})
    };

    setTransactions((prev) => [...prev, newTx]);
    setShowAddModal(false);
    triggerNotification(`Event "${formTitle}" successfully scheduled!`);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (confirm(`Delete the scheduled event "${title}"?`)) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      triggerNotification(`Event "${title}" has been deleted.`);
    }
  };

  const handleResetFilters = () => {
    setTypeFilter("all");
    setCategoryFilter("all");
    setSourceFilter("all");
    triggerNotification("Calendar filters reset to default");
  };

  return (
    <section
      id="calendar-focus"
      className="relative overflow-hidden bg-[#f5f6f7] px-6 pt-16 pb-28 text-[#1f2428]"
    >
      {/* Decors blur */}
      <div className="pointer-events-none absolute left-1/4 top-16 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      {/* Floating Alert Notifications */}
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
            Control Center: Calendar Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's calendar module transforms standard database records into a dynamic,
            date-driven planning center. Navigate monthly cashflow maps, inspect daily sub-ledgers,
            and monitor upcoming payment obligations ahead of time.
          </p>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="mt-16 overflow-hidden rounded-[42px] border border-[#e1e5e8] bg-white/80 p-5 shadow-[0_40px_120px_rgba(31,36,40,0.12)] backdrop-blur-2xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.8fr_1.2fr]">

            {/* Left Column: Interactive Monthly Grid Map */}
            <div className="flex flex-col justify-between rounded-[32px] border border-[#e1e5e8] bg-white p-5">
              <div>
                {/* Calendar Grid Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1f2428] text-white">
                      <CalendarDays className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Chronological Rhythm</h3>
                      <h4 className="text-sm font-black text-[#1f2428] tracking-tight">May 2026</h4>
                    </div>
                  </div>

                  {/* Multi-Filters Trigger buttons */}
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value as any)}
                      className="rounded-xl border border-[#e1e5e8] bg-neutral-50 px-2.5 py-1.5 text-[10px] font-bold text-[#5f6b73] outline-none shadow-sm cursor-pointer"
                    >
                      <option value="all">All Types</option>
                      <option value="inflow">Inflow</option>
                      <option value="outflow">Outflow</option>
                      <option value="transfer">Transfer</option>
                    </select>

                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="rounded-xl border border-[#e1e5e8] bg-neutral-50 px-2.5 py-1.5 text-[10px] font-bold text-[#5f6b73] outline-none shadow-sm cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      {AVAILABLE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <button
                      onClick={handleResetFilters}
                      className="rounded-xl border border-[#d7dce0] bg-white p-2.5 hover:bg-neutral-50 shadow-sm transition"
                      title="Reset Filters"
                    >
                      <RotateCcw className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center font-bold text-[#8b949b] text-[9.5px] uppercase tracking-widest mb-2.5">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Monthly Days Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Starting padding cells (empty spaces prior to Friday May 1st) */}
                  {Array.from({ length: STARTING_PADDING_CELLS }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="aspect-square rounded-2xl bg-neutral-50/50 border border-transparent opacity-20"
                    />
                  ))}

                  {/* May Days grid loop */}
                  {Array.from({ length: DAYS_IN_MAY }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateStr = `2026-05-${dayNum < 10 ? `0${dayNum}` : dayNum}`;
                    const isSelected = selectedDateStr === dateStr;
                    const dayEvents = transactionsByDate[dateStr] || [];

                    // Categorize events present on that day
                    const hasInflow = dayEvents.some((tx) => tx.type === "inflow");
                    const hasOutflow = dayEvents.some((tx) => tx.type === "outflow");
                    const hasTransfer = dayEvents.some((tx) => tx.type === "transfer");

                    return (
                      <div
                        key={`day-${dayNum}`}
                        onClick={() => setSelectedDateStr(dateStr)}
                        className={`aspect-square rounded-[22px] border p-2 flex flex-col justify-between cursor-pointer transition relative group active:scale-[0.98] ${isSelected
                            ? "bg-[#1f2428] border-[#1f2428] text-white shadow-md shadow-black/10"
                            : "bg-[#f8f9fa] border-black/5 hover:border-neutral-400 text-neutral-800"
                          }`}
                      >
                        {/* Day number */}
                        <span className="text-xs font-black tracking-tight">{dayNum}</span>

                        {/* Event Indicators */}
                        {dayEvents.length > 0 && (
                          <div className="flex justify-center gap-1 mt-auto">
                            {hasInflow && (
                              <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : "bg-emerald-500"}`} />
                            )}
                            {hasOutflow && (
                              <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white/80" : "bg-red-500 animate-pulse"}`} />
                            )}
                            {hasTransfer && (
                              <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white/60" : "bg-purple-500"}`} />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monthly stats metrics bar */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-neutral-100 pt-5">
                {[
                  { label: "May Earnings", val: `+$${monthStats.earned.toLocaleString('en-US')}`, col: "text-emerald-600" },
                  { label: "May Outbounds", val: `-$${monthStats.spent.toLocaleString('en-US')}`, col: "text-red-600" },
                  { label: "Net Monthly Pool", val: `${monthStats.net >= 0 ? "+" : ""}$${monthStats.net.toLocaleString('en-US')}`, col: monthStats.net >= 0 ? "text-[#1f2428]" : "text-red-700" }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-black/5 bg-[#f8f9fa] p-3.5 shadow-sm">
                    <span className="block text-[8.5px] uppercase tracking-widest text-[#8b949b] font-bold">{stat.label}</span>
                    <span className={`block mt-1 text-sm font-extrabold tracking-tight ${stat.col}`}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Selected Day Inspector & Upcoming Obligations */}
            <div className="space-y-6 flex flex-col justify-between">

              {/* Daily Inspector */}
              <div className="rounded-[32px] border border-[#e1e5e8] bg-white p-5 shadow-sm min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400">Day Inspector</span>
                      <h4 className="text-xs font-black text-[#1f2428] tracking-tight">{selectedDateStr}</h4>
                    </div>

                    {/* Day Net Impact */}
                    <div className="text-right">
                      <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-neutral-400 block">Daily Net Cash</span>
                      <span className={`text-xs font-black tracking-tight ${selectedDayStats.net > 0 ? "text-emerald-600" : selectedDayStats.net < 0 ? "text-red-600" : "text-neutral-500"
                        }`}>
                        {selectedDayStats.net > 0 ? "+" : ""}${selectedDayStats.net.toLocaleString('en-US')}
                      </span>
                    </div>
                  </div>

                  {/* Selected Day list */}
                  {selectedDayActivity.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-8 text-neutral-400">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-100 mb-3 text-neutral-300">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-bold text-[#1f2428]">No activity scheduled</p>
                      <p className="mt-1 text-[10px] text-[#697077] max-w-[200px]">
                        No outbounds or deposits are registered on this calendar date.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {selectedDayActivity.map((tx) => {
                        const isIncome = tx.type === "inflow";
                        const isExpense = tx.type === "outflow";
                        return (
                          <div key={tx.id} className="flex items-center justify-between rounded-xl border border-black/5 bg-[#f8f9fa] p-3 relative group">
                            <div className="flex items-center gap-2.5">
                              <div className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center ${isIncome ? "bg-emerald-50 text-emerald-600" : isExpense ? "bg-red-50 text-red-600" : "bg-purple-50 text-purple-600"
                                }`}>
                                {isIncome && <ArrowUpRight className="h-4.5 w-4.5" />}
                                {isExpense && <ArrowDownLeft className="h-4.5 w-4.5" />}
                                {!isIncome && !isExpense && <ArrowLeftRight className="h-4.5 w-4.5" />}
                              </div>
                              <div>
                                <span className="block text-[11px] font-bold text-neutral-800 line-clamp-1">{tx.title}</span>
                                <span className="inline-block text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 bg-neutral-100/50 border border-black/5 px-1 rounded mt-0.5">{tx.category}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`text-[11px] font-black tracking-tight ${isIncome ? "text-emerald-600" : isExpense ? "text-red-600" : "text-purple-600"
                                }`}>
                                {isIncome ? "+" : isExpense ? "-" : ""}${tx.amount.toLocaleString('en-US')}
                              </span>
                              <button
                                onClick={() => handleDeleteEvent(tx.id, tx.title)}
                                className="rounded-lg p-1 text-red-400 hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition duration-200 shrink-0"
                                title="Delete Scheduled Event"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Add Event quick button */}
                <button
                  onClick={handleOpenAddModal}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#e1e5e8] bg-[#f8f9fa] px-4 py-3 text-xs font-extrabold uppercase tracking-widest text-[#1f2428] hover:bg-neutral-50 hover:-translate-y-0.5 shadow-sm active:translate-y-0 transition duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Schedule Event
                </button>
              </div>

              {/* Upcoming Obligations widget */}
              <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-neutral-200/50 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <BellRing className="h-4.5 w-4.5 text-neutral-400" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b949b]">Upcoming Obligations</span>
                  </div>
                  <span className="rounded bg-neutral-200 px-2 py-0.5 text-[9px] font-black text-neutral-700">
                    {upcomingObligations.length} items
                  </span>
                </div>

                {upcomingObligations.length === 0 ? (
                  <p className="text-center py-6 text-[10px] text-neutral-400 italic">No upcoming pending obligations scheduled.</p>
                ) : (
                  <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                    {upcomingObligations.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between text-xs border-b border-neutral-100 pb-2.5 last:border-b-0 last:pb-0">
                        <div>
                          <span className="block font-bold text-neutral-800">{tx.title}</span>
                          <span className="block mt-0.5 text-[9px] text-neutral-400 font-semibold">
                            Due on {tx.date} • {tx.source}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block font-black text-neutral-800">${tx.amount.toLocaleString('en-US')}</span>
                          <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[7.5px] font-extrabold uppercase tracking-widest text-amber-600 mt-0.5">
                            <Clock className="h-2 w-2" />
                            Pending
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Dynamic Schedule Event Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f2f3] text-[#1f2428]">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#1f2428]">Schedule Planned Event</h3>
                    <span className="text-[10px] text-neutral-400 font-semibold">Date: {selectedDateStr}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Event Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Subscriptions, Salary"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                  />
                </div>

                {/* Amount & Type */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Value Amount ($)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="0.00"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Event Type</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as CalTransactionType)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="outflow">Outflow (Expense)</option>
                      <option value="inflow">Inflow (Income)</option>
                      <option value="transfer">Transfer</option>
                    </select>
                  </div>
                </div>

                {/* Category & Status */}
                <div className="grid gap-4 sm:grid-cols-2">
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

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Initial Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as CalTransactionStatus)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="Completed">Completed (Reconciled)</option>
                      <option value="Pending">Pending (obligation/planned)</option>
                    </select>
                  </div>
                </div>

                {/* Account Source */}
                <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
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
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Living, Tax"
                      value={formTag}
                      onChange={(e) => setFormTag(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Description / Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Short summary notations..."
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-xs font-bold text-neutral-500 hover:bg-neutral-50 hover:text-black transition active:scale-98"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 rounded-2xl bg-[#1f2428] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#343a40] transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Schedule Event
                  </button>
                </div>
              </form>
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
                The Calendar page structures your financial data on a clear temporal axis, helping you connect cash movements with real calendar dates.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Inspect total liquid outbounds on a daily basis",
                "Monitor overall weekly financial speeds and velocity",
                "Detect recurring spending pressure peaks on specific dates",
                "Ensure timely settlement for upcoming scheduled bills",
                "Plan cash flow reserves in advance of projected obligations",
                "Filter monthly calendars dynamically to isolate noise",
                "Examine granular sub-ledgers for any selected day",
                "Delete or schedule entries cleanly in a cohesive timeline layout"
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
          <h4 className="text-lg font-bold">Calendar Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            The Calendar page turns passive records into active chronological insights. Plan your outbounds around real days, avoid payment surprises, and build a healthy temporal balance for your financial journey.
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
      title: "1. Time-Focused Financial Outlook",
      desc: "Observe incomes, expenses, and sweeps dynamically distributed on an elegant Monthly Grid layout (May 2026).",
      icon: Calendar
    },
    {
      title: "2. Daily Transaction Tracking",
      desc: "Select any calendar cell to instantly reveal scheduled items. View daily transaction names and net totals.",
      icon: Layers
    },
    {
      title: "3. Periodic Cash Flow Reading",
      desc: "Correlate financial load with specific dates, allowing you to isolate weekend spikes from regular weekday sweeps.",
      icon: TrendingUp
    },
    {
      title: "4. Multi-Criteria Noise Filters",
      desc: "Filter grid dots instantly by category, source channel, or transaction type. Isolate high-noise shopping bills.",
      icon: Filter
    },
    {
      title: "5. Upcoming Obligations Widget",
      desc: "Never miss a bill renewal. Dedicated list display tracks uncleared bills and scheduled sweeps with countdowns.",
      icon: Clock
    },
    {
      title: "6. Interactive Scheduler Drawer",
      desc: "Tap a date to pre-fill dynamic event schedules. Instantly register items in calendar lists and dot nodes.",
      icon: Plus
    },
    {
      title: "7. Visual Timeline Rhythms",
      desc: "Observe process behaviors rather than isolated transactions. Track chronological loops to understand spending habits.",
      icon: Activity
    },
    {
      title: "8. Operational Operations Integration",
      desc: "Delete or adjust scheduled outbounds directly from the Selected Day inspector card in a few clicks.",
      icon: Trash2
    },
    {
      title: "9. Monthly Asset Summaries",
      desc: "Verify baseline month calculations (Earnings, Outbounds, Net Monthly Pools) displayed at the bottom of the grid.",
      icon: Percent
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
