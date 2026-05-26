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
  WalletCards,
  Percent,
  ShieldAlert,
  CreditCard,
  Coins,
  ShieldCheck,
  Search
} from "lucide-react";

// Types
type CalUrgency = "all" | "Urgent" | "Active" | "Cleared";

interface Debt {
  id: string;
  title: string;
  creditor: string;
  principal: number;
  paid: number;
  dueDate: string; // "YYYY-MM-DD" or "Cleared"
  installment: number;
  note: string;
}

const initialDebts: Debt[] = [
  {
    id: "db-1",
    title: "Sapphire Outstanding CC",
    creditor: "Chase Bank",
    principal: 5000,
    paid: 1800,
    dueDate: "2026-05-28",
    installment: 250,
    note: "Chase Sapphire credit card outstanding billing balance"
  },
  {
    id: "db-2",
    title: "Moving Expense Loan",
    creditor: "Friend Mark",
    principal: 2000,
    paid: 1000,
    dueDate: "2026-06-01",
    installment: 200,
    note: "Interest-free moving loan sweep support"
  },
  {
    id: "db-3",
    title: "Toyota Corolla Finance",
    creditor: "Toyota Financial",
    principal: 18000,
    paid: 5400,
    dueDate: "2026-05-25",
    installment: 380,
    note: "Auto finance leasing contract"
  },
  {
    id: "db-4",
    title: "Federal Student Aid",
    creditor: "Federal Government",
    principal: 12000,
    paid: 2400,
    dueDate: "2026-06-15",
    installment: 150,
    note: "Higher education public funding program"
  },
  {
    id: "db-5",
    title: "IRS Residual Liabilities",
    creditor: "Tax Authority",
    principal: 3500,
    paid: 3500,
    dueDate: "Cleared",
    installment: 0,
    note: "Residual fiscal tax settlement (FULLY CLEARED!)"
  }
];

const AVAILABLE_CREDITORS = [
  "Chase Bank",
  "Toyota Financial",
  "Federal Government",
  "Tax Authority",
  "Friend Mark",
  "Bank of America",
  "Other"
];

export default function DebtsFocus() {
  // State
  const [debts, setDebts] = useState<Debt[]>(initialDebts);
  const [searchText, setSearchText] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState<CalUrgency>("all");
  const [creditorFilter, setCreditorFilter] = useState("all");

  // Modal Control
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [viewingDebt, setViewingDebt] = useState<Debt | null>(null);

  // Form States (New / Edit)
  const [formTitle, setFormTitle] = useState("");
  const [formCreditor, setFormCreditor] = useState(AVAILABLE_CREDITORS[0]);
  const [formPrincipal, setFormPrincipal] = useState<number | "">("");
  const [formPaid, setFormPaid] = useState<number | "">("");
  const [formDueDate, setFormDueDate] = useState("");
  const [formInstallment, setFormInstallment] = useState<number | "">("");
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
    setUrgencyFilter("all");
    setCreditorFilter("all");
    showNotification("All filters successfully reset", "success");
  };

  // Filter Logic
  const filteredDebts = useMemo(() => {
    return debts.filter((db) => {
      // Search text
      if (searchText) {
        const query = searchText.toLowerCase();
        const matchesTitle = db.title.toLowerCase().includes(query);
        const matchesCreditor = db.creditor.toLowerCase().includes(query);
        const matchesNote = db.note.toLowerCase().includes(query);

        if (!matchesTitle && !matchesCreditor && !matchesNote) return false;
      }

      // Urgency Filter
      if (urgencyFilter !== "all") {
        const isCleared = db.dueDate === "Cleared" || db.paid >= db.principal;
        
        if (urgencyFilter === "Cleared") {
          if (!isCleared) return false;
        } else if (urgencyFilter === "Urgent") {
          // Urgent: due in May 2026 (due date starts with 2026-05) and not cleared
          if (isCleared) return false;
          const isUrgent = db.dueDate.startsWith("2026-05");
          if (!isUrgent) return false;
        } else if (urgencyFilter === "Active") {
          if (isCleared) return false;
        }
      }

      // Creditor
      if (creditorFilter !== "all" && db.creditor !== creditorFilter) return false;

      return true;
    });
  }, [debts, searchText, urgencyFilter, creditorFilter]);

  // Statistics Calculations
  const stats = useMemo(() => {
    let totalPrincipal = 0;
    let totalPaid = 0;
    let urgentCount = 0;
    let clearedCount = 0;

    filteredDebts.forEach((db) => {
      const isCleared = db.dueDate === "Cleared" || db.paid >= db.principal;
      
      totalPrincipal += db.principal;
      totalPaid += db.paid;

      if (isCleared) {
        clearedCount++;
      } else {
        const isUrgent = db.dueDate.startsWith("2026-05");
        if (isUrgent) urgentCount++;
      }
    });

    const outstanding = totalPrincipal - totalPaid;
    const progressRate = totalPrincipal > 0 ? (totalPaid / totalPrincipal) * 100 : 0;

    return {
      totalPrincipal,
      totalPaid,
      outstanding,
      progressRate,
      urgentCount,
      clearedCount,
      count: filteredDebts.length
    };
  }, [filteredDebts]);

  // Modal triggers
  const openAddModal = () => {
    setEditingDebt(null);
    setFormTitle("");
    setFormCreditor(AVAILABLE_CREDITORS[0]);
    setFormPrincipal("");
    setFormPaid("");
    setFormDueDate(new Date().toISOString().split("T")[0]);
    setFormInstallment("");
    setFormNote("");
    setShowFormModal(true);
  };

  const openEditModal = (db: Debt) => {
    setEditingDebt(db);
    setFormTitle(db.title);
    setFormCreditor(db.creditor);
    setFormPrincipal(db.principal);
    setFormPaid(db.paid);
    setFormDueDate(db.dueDate === "Cleared" ? new Date().toISOString().split("T")[0] : db.dueDate);
    setFormInstallment(db.installment);
    setFormNote(db.note);
    setShowFormModal(true);
    setShowDetailModal(false);
  };

  const handleOpenDetail = (db: Debt) => {
    setViewingDebt(db);
    setShowDetailModal(true);
  };

  // Submit Add or Edit Form
  const handleSaveDebt = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Please provide a debt title.");
      return;
    }
    if (!formPrincipal || Number(formPrincipal) <= 0) {
      alert("Please provide a valid total principal amount.");
      return;
    }

    const principalNum = Number(formPrincipal);
    const paidNum = formPaid ? Number(formPaid) : 0;
    const isFullyPaid = paidNum >= principalNum;

    const debtData: Debt = {
      id: editingDebt ? editingDebt.id : `db-${Date.now()}`,
      title: formTitle,
      creditor: formCreditor,
      principal: principalNum,
      paid: Math.min(paidNum, principalNum), // paid amount shouldn't exceed principal
      dueDate: isFullyPaid ? "Cleared" : formDueDate,
      installment: isFullyPaid ? 0 : Number(formInstallment) || 0,
      note: formNote || "N/A"
    };

    if (editingDebt) {
      setDebts((prev) =>
        prev.map((d) => (d.id === editingDebt.id ? debtData : d))
      );
      showNotification(`"${formTitle}" debt ledger updated successfully!`, "success");
    } else {
      setDebts((prev) => [debtData, ...prev]);
      showNotification(`"${formTitle}" debt ledger added successfully!`, "success");
    }

    setShowFormModal(false);
    setEditingDebt(null);
  };

  // Delete Debt
  const handleDeleteDebt = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the debt record "${title}"?`)) {
      setDebts((prev) => prev.filter((d) => d.id !== id));
      setShowDetailModal(false);
      showNotification(`"${title}" deleted successfully.`, "danger");
    }
  };

  return (
    <section
      id="debts-focus"
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
            Control Center: Debts Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's debts workspace centralises fragmented liabilities into one cohesive planner.
            Map outstanding principals, track payments reactively, monitor critical due alarms,
            and establish structured repayment plans in a beautiful dashboard.
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
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Liabilities Deck</span>
                  </div>

                  {/* Add Debt Button */}
                  <button
                    onClick={openAddModal}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f2428] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#343a40] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Create Debt Record
                  </button>
                </div>

                {/* Text Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Title, notes..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full rounded-2xl border border-[#e1e5e8] bg-white pl-10 pr-4 py-2.5 text-xs text-[#1f2428] shadow-sm outline-none transition focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Urgency Filter Tab */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Repayment Urgency</label>
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "all", label: "All" },
                      { key: "Active", label: "Active" },
                      { key: "Urgent", label: "Urgent" },
                      { key: "Cleared", label: "Cleared" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setUrgencyFilter(item.key as CalUrgency)}
                        className={`rounded-xl py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                          urgencyFilter === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                        title={item.key === "Urgent" ? "Due this month" : item.key}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Creditor select dropdown */}
                <div className="space-y-1.5 pt-2 border-t border-[#e1e5e8]">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Creditor / Institution</label>
                  <select
                    value={creditorFilter}
                    onChange={(e) => setCreditorFilter(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                  >
                    <option value="all">All Creditors</option>
                    {AVAILABLE_CREDITORS.map((cred) => (
                      <option key={cred} value={cred}>{cred}</option>
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
                      label: "Total Debt principal",
                      val: `$${stats.totalPrincipal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-[#1f2428] bg-neutral-50 border-neutral-200",
                      icon: WalletCards
                    },
                    {
                      label: "Total Amount Paid Off",
                      val: `+$${stats.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
                      icon: Coins
                    },
                    {
                      label: "Net Outstanding payload",
                      val: `$${stats.outstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-red-700 bg-red-50/50 border-red-100",
                      icon: CreditCard
                    },
                    {
                      label: "Impending Due Payments",
                      val: `${stats.urgentCount} Debts`,
                      color: stats.urgentCount > 0 ? "text-amber-700 bg-amber-50/60 border-amber-100 shadow-sm animate-pulse" : "text-slate-500 bg-slate-50/50 border-slate-100",
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

                {/* Overall Payoff progress bar */}
                <div className="mb-6 rounded-3xl border border-[#e1e5e8] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1f2428] mb-2">
                    <span className="uppercase tracking-widest text-[#8b949b] text-[10px]">Repayment Completion rate</span>
                    <span>{stats.progressRate.toFixed(1)}% Cleared</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-neutral-100 overflow-hidden relative border border-black/5">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${stats.progressRate}%` }}
                    />
                  </div>
                </div>

                {/* Debts Cards Grid */}
                <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-4 sm:p-6 min-h-[400px]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Liabilities Directory</h3>
                    <span className="rounded-full bg-white border border-[#e1e5e8] px-3.5 py-0.5 text-[10px] font-semibold text-[#5f6b73] shadow-sm">
                      Active: {debts.filter((d) => d.dueDate !== "Cleared").length} ledger items
                    </span>
                  </div>

                  {filteredDebts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-[#e1e5e8] shadow-md text-neutral-400 mb-4 animate-pulse">
                        <AlertCircle className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428]">No debts matched</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-sm">
                        Adjust search filters or add a new debt entry to populate liabilities tracking logs.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {filteredDebts.map((db) => {
                        const percent = db.principal > 0 ? (db.paid / db.principal) * 100 : 0;
                        const isCleared = db.dueDate === "Cleared" || db.paid >= db.principal;
                        const isUrgent = !isCleared && db.dueDate.startsWith("2026-05");

                        let colorText = "text-neutral-500";
                        let colorBg = "bg-neutral-100 border-neutral-300 text-neutral-600";
                        let colorBar = "bg-neutral-500";
                        let statusText = "Cleared";

                        if (!isCleared) {
                          if (isUrgent) {
                            colorText = "text-amber-600";
                            colorBg = "bg-amber-50 border-amber-200 text-amber-600 animate-pulse";
                            colorBar = "bg-amber-500";
                            statusText = "Urgent";
                          } else {
                            colorText = "text-indigo-600";
                            colorBg = "bg-indigo-50 border-indigo-200 text-indigo-600";
                            colorBar = "bg-indigo-500";
                            statusText = "Active Repayment";
                          }
                        } else {
                          colorText = "text-emerald-600";
                          colorBg = "bg-emerald-50 border-emerald-200 text-emerald-600";
                          colorBar = "bg-emerald-500";
                        }

                        return (
                          <div
                            key={db.id}
                            onClick={() => handleOpenDetail(db)}
                            className="group flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-5 shadow-sm hover:border-[#1f2428] transition duration-200 cursor-pointer active:scale-[0.99]"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="rounded bg-neutral-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                                  {db.creditor}
                                </span>

                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest border ${colorBg}`}>
                                  <span className={`h-1 w-1 rounded-full ${
                                    isCleared ? "bg-emerald-500" : isUrgent ? "bg-amber-500" : "bg-indigo-500"
                                  }`} />
                                  {statusText}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-[#1f2428] group-hover:text-black transition-colors line-clamp-1">
                                {db.title}
                              </h4>
                              
                              {/* Subtitle description */}
                              <p className="mt-1 text-[9.5px] text-neutral-400 line-clamp-1 italic">
                                {db.note}
                              </p>
                            </div>

                            <div className="mt-6 space-y-2.5">
                              {/* Spending ratio numbers */}
                              <div className="flex items-end justify-between text-xs">
                                <div>
                                  <span className="text-[8px] uppercase font-bold text-neutral-400 block tracking-wider">Remaining Balance</span>
                                  <span className="font-extrabold text-[#1f2428]">
                                    ${(db.principal - db.paid).toLocaleString()}
                                  </span>
                                  <span className="text-neutral-400 font-semibold text-[10px]">
                                    {" "}outstanding of ${db.principal.toLocaleString()}
                                  </span>
                                </div>

                                <div className="text-right">
                                  <span className={`font-black ${colorText}`}>
                                    {percent.toFixed(0)}% paid
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

                              {/* Remaining limit visual indication */}
                              <div className="flex justify-between items-center text-[9px] text-neutral-400 border-t border-neutral-50 pt-2 font-semibold">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 shrink-0" />
                                  {isCleared ? (
                                    <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                                      <ShieldCheck className="h-3 w-3 shrink-0" /> Fully Reconciled
                                    </span>
                                  ) : (
                                    `Due: ${db.dueDate}`
                                  )}
                                </span>
                                <span className="font-bold text-[#1f2428]">
                                  {isCleared ? "No Payment" : `$${db.installment}/mo`}
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
                    Debt Liability Assessment
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Currently tracking <span className="font-semibold text-neutral-800">{stats.count} liabilities</span>. 
                    Your total principal burden registers at <span className="font-semibold text-neutral-800">${stats.totalPrincipal.toLocaleString()}</span>, 
                    with <span className="font-semibold text-emerald-600">${stats.totalPaid.toLocaleString()}</span> successfully cleared off. 
                    {stats.urgentCount > 0 ? (
                      <span className="text-amber-600 font-bold"> Note: You have {stats.urgentCount} critical due dates approaching in May 2026. Make sure to settle active payments on time.</span>
                    ) : (
                      " All active liabilities are settled within scheduled due dates."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Debt Form Modal */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f2f3] text-[#1f2428]">
                    <CreditCard className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#1f2428]">
                    {editingDebt ? "Edit Liability Details" : "New Debt Registration"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveDebt} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Debt / Platform Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sapphire Credit Card, Auto Loan"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                  />
                </div>

                {/* Creditor select dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Creditor / Institution</label>
                  <select
                    value={formCreditor}
                    onChange={(e) => setFormCreditor(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                  >
                    {AVAILABLE_CREDITORS.map((cred) => (
                      <option key={cred} value={cred}>{cred}</option>
                    ))}
                  </select>
                </div>

                {/* Principal & Paid Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Total Principal ($)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="0.00"
                      value={formPrincipal}
                      onChange={(e) => setFormPrincipal(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Amount Paid Off ($)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0.00"
                      value={formPaid}
                      onChange={(e) => setFormPaid(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Due Date & Monthly payment Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Next Due Date</label>
                    <input
                      type="date"
                      value={formDueDate}
                      onChange={(e) => setFormDueDate(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Monthly installment ($)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0.00"
                      value={formInstallment}
                      onChange={(e) => setFormInstallment(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Notes Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Notes & Description</label>
                  <textarea
                    rows={2}
                    placeholder="Enter short contextual details about this liability..."
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
                    {editingDebt ? "Save Changes" : "Register Liability"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Drill-down Detail Modal */}
        {showDetailModal && viewingDebt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                  <Layers className="h-3 w-3" />
                  Liability Specifications
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Outstanding Balance</span>
                <h4 className="mt-2 text-3xl font-black text-red-600 tracking-tight">
                  ${(viewingDebt.principal - viewingDebt.paid).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h4>
                <p className="mt-1.5 text-xs text-neutral-500 font-bold capitalize">
                  {((viewingDebt.paid / viewingDebt.principal) * 100).toFixed(0)}% Payoff Progress • {viewingDebt.title}
                </p>
              </div>

              {/* Metadata details table */}
              <div className="mt-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Creditor/Institution:</span>
                  <span className="font-bold text-[#1f2428] bg-neutral-100 px-2 py-0.5 rounded">
                    {viewingDebt.creditor}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Original Principal:</span>
                  <span className="font-bold text-[#1f2428]">
                    ${viewingDebt.principal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Total Paid to Date:</span>
                  <span className="font-bold text-[#1f2428] text-emerald-600 font-bold">
                    ${viewingDebt.paid.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Next Payment Due:</span>
                  <span className="font-bold text-[#1f2428] flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                    {viewingDebt.dueDate === "Cleared" ? "Fully Settled" : viewingDebt.dueDate}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Monthly installment:</span>
                  <span className="font-bold text-[#1f2428]">
                    {viewingDebt.dueDate === "Cleared" ? "N/A" : `$${viewingDebt.installment}/mo`}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Context Notes:</span>
                  <p className="rounded-xl bg-neutral-50 p-2.5 text-xs text-neutral-600 leading-relaxed border border-black/5 italic">
                    {viewingDebt.note}
                  </p>
                </div>
              </div>

              {/* Action Operations */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleDeleteDebt(viewingDebt.id, viewingDebt.title)}
                  className="w-1/3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-100 transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(viewingDebt)}
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
                The Debts control center converts complex repayment schedules into visual milestones designed to keep payments on schedule and reduce cumulative liabilities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Consolidate fragmented public and private debt items in one view",
                "Log dynamic monthly repayment plans and installment targets",
                "Monitor visually outstanding balances vs. principal targets",
                "Spot approaching critical due dates to avoid penalty fees",
                "Prioritize high-interest card balances over interest-free sweeping",
                "Flag residual liabilities as fully cleared and reconciled",
                "Track complete repayment progress via the top payoff meter",
                "Register, edit, or wipe records dynamically in a few clicks"
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
          <h4 className="text-lg font-bold">Debts Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Debts goes beyond tracking outstanding figures. It provides structured progress tracks, isolates high-volatility payment windows, and reinforces repayment disciplines. Keep cash outflows optimal, reduce stress, and visualse complete payoff success.
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
      desc: "Assemble credit cards, student financing, auto leases, and personal sweeps under one visual command deck.",
      icon: Layers
    },
    {
      title: "2. Visual Repayment meters",
      desc: "Observe paid-off ratios vs outstanding principals on individual cards. Progress calculations adjust reactively.",
      icon: Percent
    },
    {
      title: "3. Impending Due Alarms",
      desc: "Isolate active due dates. approaching dates flag amber or pulse red automatically to prevent late penalties.",
      icon: Clock
    },
    {
      title: "4. Payoff Completion rate",
      desc: "Check cumulative repayment progress on the top visual tracker. Watch the dial sweep forward as you log payments.",
      icon: TrendingUp
    },
    {
      title: "5. Instutitional Mappings",
      desc: "Map outstanding pools to designated creditors (Chase Bank, Toyota Financial, IRS) for structured portfolios.",
      icon: CreditCard
    },
    {
      title: "6. Scheduled Installments",
      desc: "Configure monthly payout budgets per ledger card. Understand recurring cash outflow pressures in advance.",
      icon: WalletCards
    },
    {
      title: "7. Custom Debt Creator",
      desc: "Register new debt accounts, original principals, historical paid volumes, periodicities, and notes in seconds.",
      icon: Plus
    },
    {
      title: "8. Drill-Down Inspectors",
      desc: "Select a card to reveal specifications, interest or payout notations, and direct CRUD editing controls.",
      icon: ChevronDown
    },
    {
      title: "9. Offline Continuity Security",
      desc: "Maintain complete local privacy over outstanding assets with offline continuity and iCloud sync integrations.",
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
