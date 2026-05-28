"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Search,
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
  Wallet
} from "lucide-react";

// Types
type TransactionType = "inflow" | "outflow" | "transfer";
type TransactionStatus = "Completed" | "Pending";

interface Transaction {
  id: string;
  title: string;
  type: TransactionType;
  category: string;
  subcategory: string;
  amount: number;
  date: string;
  source: string;
  target?: string; // only for transfers
  status: TransactionStatus;
  tag: string;
  note: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    title: "TechCorp Monthly Salary",
    type: "inflow",
    category: "Salary",
    subcategory: "Full-Time",
    amount: 5400,
    date: "2026-05-15",
    source: "Checking Account",
    status: "Completed",
    tag: "Primary",
    note: "Regular monthly payroll"
  },
  {
    id: "tx-2",
    title: "Apartment Rent Payment",
    type: "outflow",
    category: "Housing",
    subcategory: "Rent",
    amount: 1800,
    date: "2026-05-01",
    source: "Checking Account",
    status: "Completed",
    tag: "Living",
    note: "May monthly rental charge"
  },
  {
    id: "tx-3",
    title: "Starbucks Coffee & Snacks",
    type: "outflow",
    category: "Food & Dining",
    subcategory: "Coffee Shop",
    amount: 18.5,
    date: "2026-05-23",
    source: "Credit Card",
    status: "Completed",
    tag: "Personal",
    note: "Double espresso and bakery breakfast"
  },
  {
    id: "tx-4",
    title: "Transfer to Savings Fund",
    type: "transfer",
    category: "Savings",
    subcategory: "Emergency Fund",
    amount: 1000,
    date: "2026-05-20",
    source: "Checking Account",
    target: "High-Yield Savings",
    status: "Completed",
    tag: "Savings",
    note: "Monthly strategic savings sweep"
  },
  {
    id: "tx-5",
    title: "Netflix Premium Subscription",
    type: "outflow",
    category: "Subscriptions",
    subcategory: "Streaming",
    amount: 22.99,
    date: "2026-05-22",
    source: "Credit Card",
    status: "Completed",
    tag: "Personal",
    note: "Automatic monthly subscription renewal"
  },
  {
    id: "tx-6",
    title: "Electricity & Gas Bill",
    type: "outflow",
    category: "Bills & Utilities",
    subcategory: "Power & Heat",
    amount: 124.5,
    date: "2026-05-28",
    source: "Checking Account",
    status: "Pending",
    tag: "Living",
    note: "Projected monthly utilities payment schedule"
  },
  {
    id: "tx-7",
    title: "Dividend Payout (AAPL)",
    type: "inflow",
    category: "Investments",
    subcategory: "Dividends",
    amount: 145.0,
    date: "2026-05-18",
    source: "Investment Account",
    status: "Completed",
    tag: "Passive",
    note: "Quarterly AAPL share equity payout"
  },
  {
    id: "tx-8",
    title: "Weekly Grocery Provisions",
    type: "outflow",
    category: "Food & Dining",
    subcategory: "Supermarket",
    amount: 185.4,
    date: "2026-05-21",
    source: "Credit Card",
    status: "Completed",
    tag: "Living",
    note: "Organic fresh food and home essentials"
  },
  {
    id: "tx-9",
    title: "Freelance UI Design",
    type: "inflow",
    category: "Salary",
    subcategory: "Freelance",
    amount: 1200.0,
    date: "2026-05-25",
    source: "Checking Account",
    status: "Pending",
    tag: "Project X",
    note: "First milestone release for startup client website project"
  }
];

const AVAILABLE_ACCOUNTS = [
  "Checking Account",
  "Credit Card",
  "Cash",
  "High-Yield Savings",
  "Investment Account"
];

const AVAILABLE_TAGS = [
  "Primary",
  "Living",
  "Personal",
  "Savings",
  "Passive",
  "Project X",
  "Vacation"
];

const CATEGORIES_BY_TYPE = {
  inflow: ["Salary", "Investments", "Refund", "Gifts", "Other"],
  outflow: [
    "Housing",
    "Food & Dining",
    "Bills & Utilities",
    "Subscriptions",
    "Shopping",
    "Transport",
    "Other"
  ],
  transfer: ["Savings", "Investment", "Internal Transfer"]
};

export default function TransactionsFocus() {
  // State
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchText, setSearchText] = useState("");
  const [flowFilter, setFlowFilter] = useState<"all" | TransactionType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | TransactionStatus>("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [minAmount, setMinAmount] = useState<number | "">("");
  const [maxAmount, setMaxAmount] = useState<number | "">("");

  // Modal Control States
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null);

  // Form States (New / Edit)
  const [formType, setFormType] = useState<TransactionType>("outflow");
  const [formTitle, setFormTitle] = useState("");
  const [formAmount, setFormAmount] = useState<number | "">("");
  const [formDate, setFormDate] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formSubcategory, setFormSubcategory] = useState("");
  const [formSource, setFormSource] = useState(AVAILABLE_ACCOUNTS[0]);
  const [formTarget, setFormTarget] = useState(AVAILABLE_ACCOUNTS[3]); // Default High-Yield Savings
  const [formStatus, setFormStatus] = useState<TransactionStatus>("Completed");
  const [formTag, setFormTag] = useState(AVAILABLE_TAGS[1]); // Default Living
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
    setFlowFilter("all");
    setStatusFilter("all");
    setSourceFilter("all");
    setTagFilter("all");
    setCategoryFilter("all");
    setMinAmount("");
    setMaxAmount("");
    showNotification("All filters successfully reset", "success");
  };

  // Filter Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search text
      if (searchText) {
        const query = searchText.toLowerCase();
        const matchesTitle = tx.title.toLowerCase().includes(query);
        const matchesCategory = tx.category.toLowerCase().includes(query);
        const matchesNote = tx.note.toLowerCase().includes(query);
        const matchesSource = tx.source.toLowerCase().includes(query);
        const matchesTarget = tx.target?.toLowerCase().includes(query) || false;
        const matchesTag = tx.tag.toLowerCase().includes(query);

        if (!matchesTitle && !matchesCategory && !matchesNote && !matchesSource && !matchesTarget && !matchesTag) {
          return false;
        }
      }

      // Flow type
      if (flowFilter !== "all" && tx.type !== flowFilter) return false;

      // Status
      if (statusFilter !== "all" && tx.status !== statusFilter) return false;

      // Source Account
      if (sourceFilter !== "all") {
        if (tx.type === "transfer") {
          if (tx.source !== sourceFilter && tx.target !== sourceFilter) return false;
        } else {
          if (tx.source !== sourceFilter) return false;
        }
      }

      // Tag
      if (tagFilter !== "all" && tx.tag !== tagFilter) return false;

      // Category
      if (categoryFilter !== "all" && tx.category !== categoryFilter) return false;

      // Min/Max Amounts
      if (minAmount !== "" && tx.amount < minAmount) return false;
      if (maxAmount !== "" && tx.amount > maxAmount) return false;

      return true;
    });
  }, [transactions, searchText, flowFilter, statusFilter, sourceFilter, tagFilter, categoryFilter, minAmount, maxAmount]);

  // Statistics Calculations
  const stats = useMemo(() => {
    let inflow = 0;
    let outflow = 0;
    let transferSum = 0;
    let pendingCount = 0;

    filteredTransactions.forEach((tx) => {
      if (tx.status === "Pending") pendingCount++;

      if (tx.type === "inflow") {
        inflow += tx.amount;
      } else if (tx.type === "outflow") {
        outflow += tx.amount;
      } else if (tx.type === "transfer") {
        transferSum += tx.amount;
      }
    });

    return {
      inflow,
      outflow,
      net: inflow - outflow,
      transferSum,
      pendingCount,
      count: filteredTransactions.length
    };
  }, [filteredTransactions]);

  // All categories present in dataset for dropdown filter
  const allAvailableCategories = useMemo(() => {
    const set = new Set<string>();
    transactions.forEach((tx) => set.add(tx.category));
    return Array.from(set);
  }, [transactions]);

  // Modal Triggers
  const openAddModal = () => {
    setEditingTransaction(null);
    setFormType("outflow");
    setFormTitle("");
    setFormAmount("");
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormCategory(CATEGORIES_BY_TYPE.outflow[0]);
    setFormSubcategory("");
    setFormSource(AVAILABLE_ACCOUNTS[0]);
    setFormTarget(AVAILABLE_ACCOUNTS[3]);
    setFormStatus("Completed");
    setFormTag(AVAILABLE_TAGS[1]);
    setFormNote("");
    setShowFormModal(true);
  };

  const openEditModal = (tx: Transaction) => {
    setEditingTransaction(tx);
    setFormType(tx.type);
    setFormTitle(tx.title);
    setFormAmount(tx.amount);
    setFormDate(tx.date);
    setFormCategory(tx.category);
    setFormSubcategory(tx.subcategory);
    setFormSource(tx.source);
    if (tx.target) setFormTarget(tx.target);
    setFormStatus(tx.status);
    setFormTag(tx.tag);
    setFormNote(tx.note);
    setShowFormModal(true);
    setShowDetailModal(false);
  };

  const handleOpenDetail = (tx: Transaction) => {
    setViewingTransaction(tx);
    setShowDetailModal(true);
  };

  // Submit Add or Edit Form
  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Please provide a transaction title.");
      return;
    }
    if (!formAmount || Number(formAmount) <= 0) {
      alert("Please provide a valid transaction amount.");
      return;
    }
    if (!formDate) {
      alert("Please choose a date.");
      return;
    }

    const transactionData: Transaction = {
      id: editingTransaction ? editingTransaction.id : `tx-${Date.now()}`,
      title: formTitle,
      type: formType,
      category: formCategory,
      subcategory: formSubcategory || "General",
      amount: Number(formAmount),
      date: formDate,
      source: formSource,
      status: formStatus,
      tag: formTag,
      note: formNote || "N/A",
      ...(formType === "transfer" ? { target: formTarget } : {})
    };

    if (editingTransaction) {
      // Edit
      setTransactions((prev) =>
        prev.map((t) => (t.id === editingTransaction.id ? transactionData : t))
      );
      showNotification(`"${formTitle}" transaction updated successfully!`, "success");
    } else {
      // Add
      setTransactions((prev) => [transactionData, ...prev]);
      showNotification(`"${formTitle}" transaction created successfully!`, "success");
    }

    setShowFormModal(false);
    setEditingTransaction(null);
  };

  // Delete Transaction
  const handleDeleteTransaction = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the transaction "${title}"?`)) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      setShowDetailModal(false);
      showNotification(`"${title}" deleted successfully.`, "danger");
    }
  };

  return (
    <section
      id="transactions-focus"
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
            Control Center: Transactions Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's transactions workspace operates as the core ledger system.
            Record daily cash flows, group items with deep tagging systems, inspect
            details via drill-downs, and audit error records instantly in one place.
          </p>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="mt-16 overflow-hidden rounded-[42px] border border-[#e1e5e8] bg-white p-5 shadow-[0_40px_120px_rgba(31,36,40,0.12)]  sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar Controls & Multi-Filters */}
            <div className="flex flex-col justify-between rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-5">
              <div className="space-y-6">
                <div>
                  <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Ledger Shell</span>
                  </div>

                  {/* Add New Transaction Button */}
                  <button
                    onClick={openAddModal}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f2428] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#343a40] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Add Transaction
                  </button>
                </div>

                {/* Text Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Title, notes, accounts..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full rounded-2xl border border-[#e1e5e8] bg-white pl-10 pr-4 py-2.5 text-xs text-[#1f2428] shadow-sm outline-none transition focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Flow Filter Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Flow Filter</label>
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "all", label: "All" },
                      { key: "inflow", label: "Inflow" },
                      { key: "outflow", label: "Outflow" },
                      { key: "transfer", label: "Transfer" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setFlowFilter(item.key as any)}
                        className={`rounded-xl py-1.5 text-[11px] font-semibold transition ${flowFilter === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Dropdown Filters */}
                <div className="space-y-4 pt-2 border-t border-[#e1e5e8]">
                  {/* Account/Channel Filter */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Account Channel</label>
                    <select
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="all">All Accounts</option>
                      {AVAILABLE_ACCOUNTS.map((acc) => (
                        <option key={acc} value={acc}>{acc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Category Group</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      {allAvailableCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  {/* Tag Filter */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Tag Group</label>
                    <select
                      value={tagFilter}
                      onChange={(e) => setTagFilter(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="all">All Tags</option>
                      {AVAILABLE_TAGS.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>

                  {/* Min / Max Amount */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Amount Range</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value ? Number(e.target.value) : "")}
                        className="w-1/2 rounded-xl border border-[#e1e5e8] bg-white px-2.5 py-1.5 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value ? Number(e.target.value) : "")}
                        className="w-1/2 rounded-xl border border-[#e1e5e8] bg-white px-2.5 py-1.5 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer Operations */}
              <div className="mt-8 pt-4 border-t border-[#e1e5e8] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#697077]">
                  <span className="font-semibold">Match Results:</span>
                  <span className="rounded-full bg-[#1f2428] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    {stats.count}
                  </span>
                </div>

                <button
                  onClick={resetFilters}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d7dce0] bg-white px-4 py-2.5 text-xs font-semibold text-[#5f6b73] hover:bg-neutral-50 hover:text-[#1f2428] shadow-sm transition active:scale-98"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset All Filters
                </button>
              </div>
            </div>

            {/* Main Listing & Dashboard View */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Micro KPIs Totals */}
                <div className="mb-6 grid gap-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Filtered Inflow",
                      val: `+$${stats.inflow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                      color: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
                      icon: TrendingUp
                    },
                    {
                      label: "Filtered Outflow",
                      val: `-$${stats.outflow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                      color: "text-red-600 bg-red-50/50 border-red-100",
                      icon: TrendingDown
                    },
                    {
                      label: "Net Balance Flow",
                      val: `${stats.net >= 0 ? "+" : ""}$${stats.net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                      color: stats.net >= 0 ? "text-[#1f2428] bg-neutral-50 border-neutral-200" : "text-red-700 bg-red-50 border-red-200",
                      icon: DollarSign
                    },
                    {
                      label: "Pending Operations",
                      val: `${stats.pendingCount} Items`,
                      color: stats.pendingCount > 0 ? "text-amber-700 bg-amber-50/60 border-amber-100" : "text-slate-500 bg-slate-50/50 border-slate-100",
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

                {/* Ledger Listing Body */}
                <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-4 sm:p-6 min-h-[460px] flex flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Ledger Book Activity</h3>
                    <div className="flex gap-2">
                      <span className="rounded-full bg-white border border-[#e1e5e8] px-3.5 py-1 text-[10px] font-semibold text-[#5f6b73] shadow-sm">
                        Total Pool: {transactions.length} records
                      </span>
                    </div>
                  </div>

                  {filteredTransactions.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center text-center p-12">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-[#e1e5e8] shadow-md text-neutral-400 mb-4 animate-pulse">
                        <AlertCircle className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428]">No matching transactions found</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-sm">
                        Adjust search strings or reset filter categories to view baseline finance records.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="mt-5 rounded-xl bg-[#1f2428] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-[#343a40] transition active:scale-95"
                      >
                        Clear Active Filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                      {filteredTransactions.map((tx) => {
                        const isIncome = tx.type === "inflow";
                        const isExpense = tx.type === "outflow";
                        const isTransfer = tx.type === "transfer";

                        return (
                          <div
                            key={tx.id}
                            onClick={() => handleOpenDetail(tx)}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-sm hover:border-[#1f2428] transition duration-200 cursor-pointer active:scale-[0.99]"
                          >
                            <div className="flex items-center gap-4">
                              {/* Dynamic Icon */}
                              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm ${isIncome
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  : isExpense
                                    ? "bg-red-50 text-red-600 border border-red-100"
                                    : "bg-purple-50 text-purple-600 border border-purple-100"
                                }`}>
                                {isIncome && <ArrowUpRight className="h-5 w-5" />}
                                {isExpense && <ArrowDownLeft className="h-5 w-5" />}
                                {isTransfer && <ArrowLeftRight className="h-5 w-5" />}
                              </div>

                              <div>
                                <h4 className="text-xs font-bold text-[#1f2428] group-hover:text-black transition-colors">
                                  {tx.title}
                                </h4>
                                <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
                                  <span className="font-semibold text-neutral-400">{tx.date}</span>
                                  <span className="h-1 w-1 rounded-full bg-neutral-300" />
                                  <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-500 font-bold uppercase tracking-wider">{tx.category}</span>
                                  {tx.subcategory && (
                                    <>
                                      <span className="h-1 w-1 rounded-full bg-neutral-300" />
                                      <span className="text-neutral-400 italic">{tx.subcategory}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-5">
                              {/* Account Target Info */}
                              <div className="text-left sm:text-right text-[10px]">
                                <span className="block font-bold text-[#5f6b73]">
                                  {isTransfer ? (
                                    <span className="flex items-center gap-1.5">
                                      {tx.source} <ArrowRight className="h-3 w-3 text-neutral-400" /> {tx.target}
                                    </span>
                                  ) : (
                                    tx.source
                                  )}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded bg-neutral-100/80 border border-black/5 px-1.5 mt-0.5 text-[8.5px] font-bold text-neutral-500 uppercase tracking-widest">
                                  <Tag className="h-2 w-2" />
                                  {tx.tag}
                                </span>
                              </div>

                              {/* Amount & Status */}
                              <div className="text-right">
                                <span className={`block font-black text-sm tracking-tight ${isIncome
                                    ? "text-emerald-600"
                                    : isExpense
                                      ? "text-red-600"
                                      : "text-purple-600"
                                  }`}>
                                  {isIncome ? "+" : isExpense ? "-" : ""}
                                  ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>

                                <span className={`inline-flex items-center gap-1 mt-0.5 rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest border ${tx.status === "Completed"
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                    : "bg-amber-50 border-amber-200 text-amber-600"
                                  }`}>
                                  <span className={`h-1 w-1 rounded-full ${tx.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`} />
                                  {tx.status}
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
                    Ledger Summary & Insight
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Currently analyzing <span className="font-semibold text-neutral-800">{stats.count} filtered movements</span>.
                    Your total inflow captures <span className="font-semibold text-emerald-600">${stats.inflow.toLocaleString('en-US')}</span>,
                    while utility or other outbound settlements equal <span className="font-semibold text-red-600">${stats.outflow.toLocaleString('en-US')}</span>.
                    {stats.pendingCount > 0 ? (
                      <span className="text-amber-600"> Note: There are {stats.pendingCount} pending items that need approval.</span>
                    ) : (
                      " All filtered movements are fully cleared and reconciled."
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
            <div className="relative w-full max-w-lg overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f2f3] text-[#1f2428]">
                    <Activity className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#1f2428]">
                    {editingTransaction ? "Edit Transaction" : "New Transaction Entry"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTransaction} className="space-y-4">
                {/* Transaction Type Select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Transaction Type</label>
                  <div className="grid grid-cols-3 gap-1 rounded-2xl border border-[#e1e5e8] bg-neutral-50 p-1">
                    {[
                      { key: "outflow", label: "Expense (Outflow)" },
                      { key: "inflow", label: "Income (Inflow)" },
                      { key: "transfer", label: "Transfer" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => {
                          setFormType(item.key as TransactionType);
                          setFormCategory(CATEGORIES_BY_TYPE[item.key as TransactionType][0]);
                        }}
                        className={`rounded-xl py-2 text-[10px] font-bold uppercase tracking-wider transition ${formType === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-white hover:text-black"
                          }`}
                      >
                        {item.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title & Amount Grid */}
                <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Title / Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Weekly Grocery Run"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Amount ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      min="0.01"
                      placeholder="0.00"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] font-bold"
                    />
                  </div>
                </div>

                {/* Date & Category Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Date</label>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      {CATEGORIES_BY_TYPE[formType].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Accounts / Channels Setup (Dynamic based on transfer or single flow) */}
                {formType === "transfer" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">From Account</label>
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
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">To Account</label>
                      <select
                        value={formTarget}
                        onChange={(e) => setFormTarget(e.target.value)}
                        className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                      >
                        {AVAILABLE_ACCOUNTS.map((acc) => (
                          <option key={acc} value={acc}>{acc}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Payment Source / Account</label>
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
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Subcategory (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Coffee, Rent"
                        value={formSubcategory}
                        onChange={(e) => setFormSubcategory(e.target.value)}
                        className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                      />
                    </div>
                  </div>
                )}

                {/* Tags & Status Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Tag Group</label>
                    <select
                      value={formTag}
                      onChange={(e) => setFormTag(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      {AVAILABLE_TAGS.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Reconciliation Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as TransactionStatus)}
                      className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                    >
                      <option value="Completed">Completed (Cleared)</option>
                      <option value="Pending">Pending (uncleared)</option>
                    </select>
                  </div>
                </div>

                {/* Notes Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Notes & Description</label>
                  <textarea
                    rows={2}
                    placeholder="Enter short contextual details about this transaction..."
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
                    {editingTransaction ? "Save Changes" : "Record Entry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Drill-down Detail Modal */}
        {showDetailModal && viewingTransaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                  <Layers className="h-3 w-3" />
                  Transaction Details
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Transaction Amount</span>
                <h4 className={`mt-2 text-3xl font-black tracking-tight ${viewingTransaction.type === "inflow"
                    ? "text-emerald-600"
                    : viewingTransaction.type === "outflow"
                      ? "text-red-600"
                      : "text-purple-600"
                  }`}>
                  {viewingTransaction.type === "inflow" ? "+" : viewingTransaction.type === "outflow" ? "-" : ""}
                  ${viewingTransaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h4>
                <p className="mt-1 text-sm font-semibold text-neutral-800">{viewingTransaction.title}</p>
              </div>

              {/* Metadata details table */}
              <div className="mt-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Ledger Date:</span>
                  <span className="font-bold text-[#1f2428] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                    {viewingTransaction.date}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Type:</span>
                  <span className={`font-extrabold uppercase tracking-widest text-[10px] ${viewingTransaction.type === "inflow" ? "text-emerald-600" : viewingTransaction.type === "outflow" ? "text-red-600" : "text-purple-600"
                    }`}>
                    {viewingTransaction.type}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Category Group:</span>
                  <span className="font-bold text-[#1f2428] bg-neutral-100 px-2 py-0.5 rounded">
                    {viewingTransaction.category} {viewingTransaction.subcategory ? `> ${viewingTransaction.subcategory}` : ""}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">
                    {viewingTransaction.type === "transfer" ? "From / To Account:" : "Payment Source Account:"}
                  </span>
                  <span className="font-bold text-[#1f2428] text-right">
                    {viewingTransaction.type === "transfer" ? (
                      <span className="flex items-center gap-1">
                        {viewingTransaction.source} <ArrowRight className="h-3 w-3 text-neutral-400" /> {viewingTransaction.target}
                      </span>
                    ) : (
                      viewingTransaction.source
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Tag Reference:</span>
                  <span className="font-bold text-[#1f2428] flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5 text-neutral-400" />
                    {viewingTransaction.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Clearing Status:</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold border ${viewingTransaction.status === "Completed"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : "bg-amber-50 border-amber-200 text-amber-600"
                    }`}>
                    {viewingTransaction.status}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Context Notes:</span>
                  <p className="rounded-xl bg-neutral-50 p-2.5 text-xs text-neutral-600 leading-relaxed border border-black/5 italic">
                    {viewingTransaction.note}
                  </p>
                </div>
              </div>

              {/* Action Operations */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleDeleteTransaction(viewingTransaction.id, viewingTransaction.title)}
                  className="w-1/3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-100 transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(viewingTransaction)}
                  className="w-2/3 rounded-2xl bg-[#1f2428] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#343a40] transition flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Edit2 className="h-4 w-4" />
                  Modify Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feature Grid Block */}
        <FeatureGrid />

        {/* Applied Freedom Checklist */}
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
                The Transactions module isn't just a static display index. It serves as a comprehensive
                financial ledger workspace designed to handle complex flows with absolute structural clarity.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Record daily outbound expenses on-the-go",
                "Log dynamic recurring salary and investment assets",
                "Map transfers between checking, cash, and high-yield vaults",
                "Assign high-level tag categories (e.g. project-x, travel)",
                "Isolate tax-deductible groups via multi-criteria selectors",
                "Flag projected utility settlements as uncleared pending",
                "Drill down into individual records for instant metadata review",
                "Correct erroneous ledgers instantly with quick modify actions"
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

        {/* Closing summary footer note */}
        <div className="mt-20 rounded-[38px] border border-[#e1e5e8] bg-[#1f2428] p-8 text-center text-white shadow-[0_35px_100px_rgba(31,36,40,0.2)] sm:p-12">
          <h4 className="text-lg font-bold">Transactions Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            The Transactions module provides full lifecycle control of your capital movements. Keep history organized,
            ensure reconciliation with clearing states, and secure a granular accounting breakdown of your financial story.
          </p>
        </div>
      </div>
    </section>
  );
}

// 9-Item Features Grid component
function FeatureGrid() {
  const items = [
    {
      title: "1. Centralized Finance Hub",
      desc: "Monitor income assets, outbound living expenses, and internal bank transfers in a single unified registry.",
      icon: Layers
    },
    {
      title: "2. Dynamic Ledger Entry",
      desc: "Create and modify transactions using intelligent forms that adapt fields on the fly depending on flow type.",
      icon: Plus
    },
    {
      title: "3. Smart Accounting System",
      desc: "Implement structured accounting schemes with parent categories, nested subcategories, and descriptive notations.",
      icon: HelpCircle
    },
    {
      title: "4. Multi-Channel Mappings",
      desc: "Tie operations to accounts or cards. Select source-destination channels during inter-account transfers.",
      icon: Wallet
    },
    {
      title: "5. High-Fidelity Filters",
      desc: "Narrow down records by matching query text, flow directions, accounts, date states, tags, and amounts.",
      icon: Filter
    },
    {
      title: "6. Operational Control",
      desc: "Evaluate matching records instantly. Reset all criteria with a single tap to return to baseline figures.",
      icon: RotateCcw
    },
    {
      title: "7. Granular Drill-Downs",
      desc: "Select a record card to reveal complete metadata details, notes, tag summaries, and instant deletion hooks.",
      icon: ChevronDown
    },
    {
      title: "8. Timing & Pending Toggles",
      desc: "Flag projected or scheduled payments as pending. Distinguish pending bills from cleared ledger movements.",
      icon: Clock
    },
    {
      title: "9. Advanced Labeling",
      desc: "Tag operations to group them under distinct themes, including holidays, specific clients, or tax scopes.",
      icon: Tag
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
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1f3f5] text-[#1f2428] transition duration-300 group-hover:bg-[#1f2428] group-hover:text-white animate-in">
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
