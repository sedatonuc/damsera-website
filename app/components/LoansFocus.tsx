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
  Landmark,
  ShieldCheck,
  Search,
  Coins
} from "lucide-react";

// Types
interface Loan {
  id: string;
  title: string;
  lender: string;
  principal: number;
  paid: number;
  term: number; // in months
  paidMonths: number;
  interest: number; // APR %
  dueDate: string; // "YYYY-MM-DD" or "Cleared"
  installment: number; // monthly payment
  note: string;
}

const initialLoans: Loan[] = [
  {
    id: "ln-1",
    title: "Real Estate Mortgage",
    lender: "Chase Mortgage",
    principal: 150000,
    paid: 30000,
    term: 180,
    paidMonths: 36,
    interest: 4.8,
    dueDate: "2026-05-28",
    installment: 1200,
    note: "Primary family residence fixed-rate mortgage contract"
  },
  {
    id: "ln-2",
    title: "Tesla Model 3 Auto Loan",
    lender: "Wells Fargo Auto",
    principal: 35000,
    paid: 14000,
    term: 60,
    paidMonths: 24,
    interest: 3.5,
    dueDate: "2026-05-25",
    installment: 650,
    note: "Electric sedan purchase financing package"
  },
  {
    id: "ln-3",
    title: "Personal Student Bank Loan",
    lender: "Citibank",
    principal: 15000,
    paid: 3000,
    term: 120,
    paidMonths: 24,
    interest: 6.2,
    dueDate: "2026-06-05",
    installment: 180,
    note: "Higher postgraduate academic studies refinancing"
  },
  {
    id: "ln-4",
    title: "Apple Mac Studio Finance",
    lender: "Barclays Finance",
    principal: 3600,
    paid: 3600,
    term: 12,
    paidMonths: 12,
    interest: 0,
    dueDate: "Cleared",
    installment: 0,
    note: "Developer hardware workstation zero-interest plan (FULLY CLEARED!)"
  }
];

const AVAILABLE_LENDERS = [
  "Chase Mortgage",
  "Wells Fargo Auto",
  "Citibank",
  "Barclays Finance",
  "Bank of America",
  "Ally Financial",
  "Other"
];

export default function LoansFocus() {
  // State
  const [loans, setLoans] = useState<Loan[]>(initialLoans);
  const [searchText, setSearchText] = useState("");
  const [durationFilter, setDurationFilter] = useState<"all" | "short" | "long">("all");
  const [lenderFilter, setLenderFilter] = useState("all");

  // Modal Control
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null);
  const [viewingLoan, setViewingLoan] = useState<Loan | null>(null);

  // Form States (New / Edit)
  const [formTitle, setFormTitle] = useState("");
  const [formLender, setFormLender] = useState(AVAILABLE_LENDERS[0]);
  const [formPrincipal, setFormPrincipal] = useState<number | "">("");
  const [formPaid, setFormPaid] = useState<number | "">("");
  const [formTerm, setFormTerm] = useState<number | "">("");
  const [formPaidMonths, setFormPaidMonths] = useState<number | "">("");
  const [formInterest, setFormInterest] = useState<number | "">("");
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
    setDurationFilter("all");
    setLenderFilter("all");
    showNotification("All filters successfully reset", "success");
  };

  // Filter Logic
  const filteredLoans = useMemo(() => {
    return loans.filter((ln) => {
      // Search text
      if (searchText) {
        const query = searchText.toLowerCase();
        const matchesTitle = ln.title.toLowerCase().includes(query);
        const matchesLender = ln.lender.toLowerCase().includes(query);
        const matchesNote = ln.note.toLowerCase().includes(query);

        if (!matchesTitle && !matchesLender && !matchesNote) return false;
      }

      // Duration Filter
      if (durationFilter !== "all") {
        if (durationFilter === "short") {
          if (ln.term > 24) return false; // short term <= 24 months
        } else if (durationFilter === "long") {
          if (ln.term <= 24) return false; // long term > 24 months
        }
      }

      // Lender
      if (lenderFilter !== "all" && ln.lender !== lenderFilter) return false;

      return true;
    });
  }, [loans, searchText, durationFilter, lenderFilter]);

  // Statistics Calculations
  const stats = useMemo(() => {
    let monthlyLoad = 0;
    let outstandingPrincipal = 0;
    let totalPaid = 0;
    let totalPrincipal = 0;
    let interestCost = 0;

    filteredLoans.forEach((ln) => {
      const isCleared = ln.dueDate === "Cleared" || ln.paidMonths >= ln.term;
      
      totalPrincipal += ln.principal;
      totalPaid += ln.paid;

      if (!isCleared) {
        monthlyLoad += ln.installment;
        outstandingPrincipal += (ln.principal - ln.paid);
        // Estimate interest cost payload: Principal * APR% * remaining term ratio
        const remainingMonths = ln.term - ln.paidMonths;
        const estimatedInterest = (ln.principal * (ln.interest / 100) * (remainingMonths / 12));
        interestCost += Math.max(0, estimatedInterest);
      }
    });

    const payoffRate = totalPrincipal > 0 ? (totalPaid / totalPrincipal) * 100 : 0;

    return {
      monthlyLoad,
      outstandingPrincipal,
      interestCost,
      payoffRate,
      count: filteredLoans.length
    };
  }, [filteredLoans]);

  // Modal triggers
  const openAddModal = () => {
    setEditingLoan(null);
    setFormTitle("");
    setFormLender(AVAILABLE_LENDERS[0]);
    setFormPrincipal("");
    setFormPaid("");
    setFormTerm("");
    setFormPaidMonths("");
    setFormInterest("");
    setFormDueDate(new Date().toISOString().split("T")[0]);
    setFormInstallment("");
    setFormNote("");
    setShowFormModal(true);
  };

  const openEditModal = (ln: Loan) => {
    setEditingLoan(ln);
    setFormTitle(ln.title);
    setFormLender(ln.lender);
    setFormPrincipal(ln.principal);
    setFormPaid(ln.paid);
    setFormTerm(ln.term);
    setFormPaidMonths(ln.paidMonths);
    setFormInterest(ln.interest);
    setFormDueDate(ln.dueDate === "Cleared" ? new Date().toISOString().split("T")[0] : ln.dueDate);
    setFormInstallment(ln.installment);
    setFormNote(ln.note);
    setShowFormModal(true);
    setShowDetailModal(false);
  };

  const handleOpenDetail = (ln: Loan) => {
    setViewingLoan(ln);
    setShowDetailModal(true);
  };

  // Submit Add or Edit Form
  const handleSaveLoan = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Please provide a loan title.");
      return;
    }
    if (!formPrincipal || Number(formPrincipal) <= 0) {
      alert("Please provide a valid total principal amount.");
      return;
    }
    if (!formTerm || Number(formTerm) <= 0) {
      alert("Please provide a valid loan term in months.");
      return;
    }

    const principalNum = Number(formPrincipal);
    const termNum = Number(formTerm);
    const paidMonthsNum = formPaidMonths ? Number(formPaidMonths) : 0;
    const isFullyPaid = paidMonthsNum >= termNum;

    // Auto-calculate paid principal ratio based on months paid if not specified
    const calculatedPaid = isFullyPaid 
      ? principalNum 
      : formPaid 
        ? Number(formPaid) 
        : Math.round((paidMonthsNum / termNum) * principalNum);

    const loanData: Loan = {
      id: editingLoan ? editingLoan.id : `ln-${Date.now()}`,
      title: formTitle,
      lender: formLender,
      principal: principalNum,
      paid: Math.min(calculatedPaid, principalNum),
      term: termNum,
      paidMonths: Math.min(paidMonthsNum, termNum),
      interest: Number(formInterest) || 0,
      dueDate: isFullyPaid ? "Cleared" : formDueDate,
      installment: isFullyPaid ? 0 : Number(formInstallment) || Math.round(principalNum / termNum),
      note: formNote || "N/A"
    };

    if (editingLoan) {
      setLoans((prev) =>
        prev.map((l) => (l.id === editingLoan.id ? loanData : l))
      );
      showNotification(`"${formTitle}" loan portfolio updated successfully!`, "success");
    } else {
      setLoans((prev) => [loanData, ...prev]);
      showNotification(`"${formTitle}" loan portfolio added successfully!`, "success");
    }

    setShowFormModal(false);
    setEditingLoan(null);
  };

  // Delete Loan
  const handleDeleteLoan = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the loan record "${title}"?`)) {
      setLoans((prev) => prev.filter((l) => l.id !== id));
      setShowDetailModal(false);
      showNotification(`"${title}" deleted successfully.`, "danger");
    }
  };

  return (
    <section
      id="loans-focus"
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
            Control Center: Loans Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's loans management workspace turns static debt schedules into an active planning command deck.
            Monitor remaining principals, track installment progress monthly, evaluate cumulative interest cost burdens,
            and structure prepayment decisions in a visual panel.
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
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Financing Hub</span>
                  </div>

                  {/* Add Loan Button */}
                  <button
                    onClick={openAddModal}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f2428] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#343a40] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Register Credit Loan
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

                {/* Duration Range Filter */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Loan Duration</label>
                  <div className="grid grid-cols-3 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "all", label: "All" },
                      { key: "short", label: "Short Term" },
                      { key: "long", label: "Long Term" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setDurationFilter(item.key as any)}
                        className={`rounded-xl py-1.5 text-[9px] font-bold uppercase tracking-wider transition ${
                          durationFilter === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                        title={item.key === "short" ? "Term <= 24 Months" : item.key === "long" ? "Term > 24 Months" : "All terms"}
                      >
                        {item.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lender select dropdown */}
                <div className="space-y-1.5 pt-2 border-t border-[#e1e5e8]">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Lender / Institution</label>
                  <select
                    value={lenderFilter}
                    onChange={(e) => setLenderFilter(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                  >
                    <option value="all">All Lenders</option>
                    {AVAILABLE_LENDERS.map((lend) => (
                      <option key={lend} value={lend}>{lend}</option>
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
                      label: "Installments Load (MRR)",
                      val: `-$${stats.monthlyLoad.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo`,
                      color: "text-red-700 bg-red-50/50 border-red-100",
                      icon: WalletCards
                    },
                    {
                      label: "Outstanding Principal",
                      val: `$${stats.outstandingPrincipal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-[#1f2428] bg-neutral-50 border-neutral-200",
                      icon: Landmark
                    },
                    {
                      label: "Est. Interest Burden",
                      val: `$${stats.interestCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                      color: "text-amber-700 bg-amber-50/50 border-amber-100",
                      icon: Percent
                    },
                    {
                      label: "Repayment Progress",
                      val: `${stats.payoffRate.toFixed(1)}%`,
                      color: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
                      icon: Coins
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

                {/* Overall repayment progress tracker */}
                <div className="mb-6 rounded-3xl border border-[#e1e5e8] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1f2428] mb-2">
                    <span className="uppercase tracking-widest text-[#8b949b] text-[10px]">repayment complete rate</span>
                    <span>{stats.payoffRate.toFixed(1)}% Cleared</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-neutral-100 overflow-hidden relative border border-black/5">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${stats.payoffRate}%` }}
                    />
                  </div>
                </div>

                {/* Loans Grid */}
                <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-4 sm:p-6 min-h-[400px]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Credit Financing Directory</h3>
                    <span className="rounded-full bg-white border border-[#e1e5e8] px-3.5 py-0.5 text-[10px] font-semibold text-[#5f6b73] shadow-sm">
                      Active: {loans.filter((l) => l.dueDate !== "Cleared").length} accounts
                    </span>
                  </div>

                  {filteredLoans.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-[#e1e5e8] shadow-md text-neutral-400 mb-4 animate-pulse">
                        <AlertCircle className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-semibold text-[#1f2428]">No loans matched</p>
                      <p className="mt-1.5 text-xs text-[#697077] max-w-sm">
                        Adjust search filters or add a new credit account to initialize loan tracking logs.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {filteredLoans.map((ln) => {
                        const percentMonths = ln.term > 0 ? (ln.paidMonths / ln.term) * 100 : 0;
                        const isCleared = ln.dueDate === "Cleared" || ln.paidMonths >= ln.term;

                        let colorText = "text-neutral-500";
                        let colorBg = "bg-neutral-100 border-neutral-300 text-neutral-600";
                        let colorBar = "bg-neutral-500";
                        let statusText = "Cleared";

                        if (!isCleared) {
                          colorText = "text-indigo-600";
                          colorBg = "bg-indigo-50 border-indigo-200 text-indigo-600";
                          colorBar = "bg-indigo-500";
                          statusText = `${ln.term - ln.paidMonths} mths left`;
                        } else {
                          colorText = "text-emerald-600";
                          colorBg = "bg-emerald-50 border-emerald-200 text-emerald-600";
                          colorBar = "bg-emerald-500";
                        }

                        return (
                          <div
                            key={ln.id}
                            onClick={() => handleOpenDetail(ln)}
                            className="group flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-5 shadow-sm hover:border-[#1f2428] transition duration-200 cursor-pointer active:scale-[0.99]"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="rounded bg-neutral-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                                  {ln.lender}
                                </span>

                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-widest border ${colorBg}`}>
                                  <span className={`h-1 w-1 rounded-full ${isCleared ? "bg-emerald-500" : "bg-indigo-500"}`} />
                                  {statusText}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-[#1f2428] group-hover:text-black transition-colors line-clamp-1">
                                {ln.title}
                              </h4>
                              
                              {/* Subtitle description */}
                              <p className="mt-1 text-[9.5px] text-neutral-400 line-clamp-1 italic">
                                {ln.note}
                              </p>
                            </div>

                            <div className="mt-6 space-y-2.5">
                              {/* Spending ratio numbers */}
                              <div className="flex items-end justify-between text-xs">
                                <div>
                                  <span className="text-[8px] uppercase font-bold text-neutral-400 block tracking-wider">Installments Progress</span>
                                  <span className="font-extrabold text-[#1f2428]">
                                    {ln.paidMonths}
                                  </span>
                                  <span className="text-neutral-400 font-semibold text-[10px]">
                                    {" "}of {ln.term} months paid
                                  </span>
                                </div>

                                <div className="text-right">
                                  <span className={`font-black ${colorText}`}>
                                    {percentMonths.toFixed(0)}% term
                                  </span>
                                </div>
                              </div>

                              {/* Progress bar */}
                              <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden relative border border-black/5">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${colorBar}`}
                                  style={{ width: `${percentMonths}%` }}
                                />
                              </div>

                              {/* Remaining limit visual indication */}
                              <div className="flex justify-between items-center text-[9px] text-neutral-400 border-t border-neutral-50 pt-2 font-semibold">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 shrink-0" />
                                  {isCleared ? (
                                    <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                                      <ShieldCheck className="h-3 w-3 shrink-0" /> Fully Settled
                                    </span>
                                  ) : (
                                    `Due: ${ln.dueDate}`
                                  )}
                                </span>
                                <span className="font-bold text-[#1f2428]">
                                  {isCleared ? "No Payment" : `$${ln.installment.toLocaleString('en-US')}/mo • ${ln.interest}% APR`}
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
                    Credit Financing Assessment
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Your dynamic loan registry compiles <span className="font-semibold text-neutral-800">{stats.count} credit lines</span>. 
                    Your outstanding principal is <span className="font-semibold text-neutral-800">${stats.outstandingPrincipal.toLocaleString('en-US')}</span>, 
                    creating an estimated cumulative interest load of <span className="font-semibold text-amber-600">${stats.interestCost.toLocaleString('en-US')}</span>. 
                    {stats.monthlyLoad > 0 ? (
                      <span> Your total monthly installments load requires <span className="font-semibold text-red-600">${stats.monthlyLoad.toLocaleString('en-US')}/mo</span>, which is integrated directly into cashflow planning limits.</span>
                    ) : (
                      " All active financing product lines are fully settled and cleared."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Loan Form Modal */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f2f3] text-[#1f2428]">
                    <Landmark className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#1f2428]">
                    {editingLoan ? "Modify Loan Financing" : "New Financing Registration"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveLoan} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Financing Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mortgage, Tesla Auto Loan"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                  />
                </div>

                {/* Lender select dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Lender / Creditor</label>
                  <select
                    value={formLender}
                    onChange={(e) => setFormLender(e.target.value)}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                  >
                    {AVAILABLE_LENDERS.map((lend) => (
                      <option key={lend} value={lend}>{lend}</option>
                    ))}
                  </select>
                </div>

                {/* Principal & Paid Grid */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Principal ($)</label>
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
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Paid Principal ($)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Auto"
                      value={formPaid}
                      onChange={(e) => setFormPaid(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Interest APR (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.0%"
                      value={formInterest}
                      onChange={(e) => setFormInterest(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Term & Paid Months Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Total Term (Months)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 60, 180"
                      value={formTerm}
                      onChange={(e) => setFormTerm(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Months Paid to Date</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formPaidMonths}
                      onChange={(e) => setFormPaidMonths(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Due Date & Monthly payment Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Monthly Installment ($)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Auto"
                      value={formInstallment}
                      onChange={(e) => setFormInstallment(e.target.value ? Number(e.target.value) : "")}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Installment Due Date</label>
                    <input
                      type="date"
                      value={formDueDate}
                      onChange={(e) => setFormDueDate(e.target.value)}
                      className="w-full rounded-xl border border-[#e1e5e8] px-3.5 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428]"
                    />
                  </div>
                </div>

                {/* Notes Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8b949b]">Notes & Description</label>
                  <textarea
                    rows={2}
                    placeholder="Enter short contextual details about this financing structure..."
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
                    Save Financing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Drill-down Detail Modal */}
        {showDetailModal && viewingLoan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border border-[#e1e5e8] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                  <Layers className="h-3 w-3" />
                  Financing Specifications
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Outstanding Principal</span>
                <h4 className="mt-2 text-3xl font-black text-[#1f2428] tracking-tight">
                  ${(viewingLoan.principal - viewingLoan.paid).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h4>
                <p className="mt-1.5 text-xs text-neutral-500 font-bold capitalize">
                  {((viewingLoan.paidMonths / viewingLoan.term) * 100).toFixed(0)}% Term Progress • {viewingLoan.title}
                </p>
              </div>

              {/* Metadata details table */}
              <div className="mt-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Lender/Creditor:</span>
                  <span className="font-bold text-[#1f2428] bg-neutral-100 px-2 py-0.5 rounded">
                    {viewingLoan.lender}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Original Principal:</span>
                  <span className="font-bold text-[#1f2428]">
                    ${viewingLoan.principal.toLocaleString('en-US')}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Total Paid to Date:</span>
                  <span className="font-bold text-[#1f2428] text-emerald-600 font-bold">
                    ${viewingLoan.paid.toLocaleString('en-US')}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Interest Rate (APR):</span>
                  <span className="font-bold text-[#1f2428]">
                    {viewingLoan.interest}% APR
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Months Paid / Term:</span>
                  <span className="font-bold text-[#1f2428]">
                    {viewingLoan.paidMonths} of {viewingLoan.term} months paid ({viewingLoan.term - viewingLoan.paidMonths} remaining)
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Next Installment Due:</span>
                  <span className="font-bold text-[#1f2428] flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                    {viewingLoan.dueDate === "Cleared" ? "Fully Settled" : viewingLoan.dueDate}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Monthly Installment:</span>
                  <span className="font-bold text-[#1f2428]">
                    {viewingLoan.dueDate === "Cleared" ? "N/A" : `$${viewingLoan.installment.toLocaleString('en-US')}/mo`}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 border-b border-neutral-50 pb-2">
                  <span className="text-neutral-400 font-semibold">Context Notes:</span>
                  <p className="rounded-xl bg-neutral-50 p-2.5 text-xs text-neutral-600 leading-relaxed border border-black/5 italic">
                    {viewingLoan.note}
                  </p>
                </div>
              </div>

              {/* Action Operations */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleDeleteLoan(viewingLoan.id, viewingLoan.title)}
                  className="w-1/3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-100 transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(viewingLoan)}
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
                The Loans control center converts complex amortization schedules into visual milestones designed to keep installments on schedule and plan cost mitigation early.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Consolidate mortgages, auto financing, and bank loans in one view",
                "Log dynamic amortization structures and monthly installment schedules",
                "Monitor outstanding principals vs. completed monthly milestones",
                "Spot approaching critical due dates to align monthly cash allocations",
                "Evaluate total estimated interest costs and APR percentages easily",
                "Determine actual total true financing cost (principal + interest total)",
                "Identify high-pressure monthly installments that strain liquidity",
                "Register, edit, or clear financing accounts dynamically in a few clicks"
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
          <h4 className="text-lg font-bold">Loans Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Loans goes beyond listing outstanding figures. It provides structured progress tracks, isolates high-interest cost centers, and visualizes cashflow pressure. Keep cash outflows optimal, reduce interest loads, and plan repayment success.
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
      desc: "Assemble home mortgages, auto financing, bank loans, and workstation plans under a unified credit deck.",
      icon: Layers
    },
    {
      title: "2. Installment Term Progress",
      desc: "Observe paid-off months vs remaining term on individual cards. Term percentage tracks update reactively.",
      icon: Percent
    },
    {
      title: "3. Due Date Alarms",
      desc: "Isolate monthly installment due dates. Approaching due dates flag visual countdown alerts automatically.",
      icon: Clock
    },
    {
      title: "4. Est. Interest Burdens",
      desc: "Check cumulative estimated interest loads across active lines. Visualise the true costs of bank financing early.",
      icon: TrendingDown
    },
    {
      title: "5. Institutional Mappings",
      desc: "Map credit lines to designated lenders (Chase Mortgage, Wells Fargo Auto, Citibank) for structured financing catalogs.",
      icon: Landmark
    },
    {
      title: "6. Scheduled Installments Load",
      desc: "Configure monthly payout budgets per ledger card. Understand recurring cash outflow pressures in advance.",
      icon: WalletCards
    },
    {
      title: "7. Custom Financing Creator",
      desc: "Register new credit lines, principals, APR interest percentages, term months, and paid history in seconds.",
      icon: Plus
    },
    {
      title: "8. Drill-Down Inspectors",
      desc: "Select a card to reveal specifications, interest or payoff notations, and direct CRUD editing controls.",
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
