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
  ShieldCheck,
  Search,
  ShieldAlert,
  Bell,
  Eye,
  EyeOff,
  Settings,
  Inbox,
  Trash
} from "lucide-react";

// Types
interface NotificationItem {
  id: string;
  category: "System Alerts" | "Smart Insights" | "Budget Reminders" | "Daily Reports";
  title: string;
  date: string;
  details: string;
  connectedModule: string;
  status: "Unread" | "Read";
}

const initialNotifications: NotificationItem[] = [
  {
    id: "nt-1",
    category: "System Alerts",
    title: "Critical Due Alert: Sapphire CC",
    date: "Just Now",
    details: "Chase Sapphire card balance of $5,000 is due on May 28, 2026. Settle payment early to prevent interest loading.",
    connectedModule: "debts",
    status: "Unread"
  },
  {
    id: "nt-2",
    category: "Smart Insights",
    title: "Leisure SaaS Subscription Detected",
    date: "1 hour ago",
    details: "Adobe CC has logged zero usage signals in the last 30 days. Click cancel to shave off $60/mo in subscription weights.",
    connectedModule: "subscriptions",
    status: "Unread"
  },
  {
    id: "nt-3",
    category: "Budget Reminders",
    title: "Weekly Budget Limit Exhaustion",
    date: "3 hours ago",
    details: "Food & Dining monthly budget cap is 92% complete. Pulsing crimson warning triggers active.",
    connectedModule: "budgets",
    status: "Unread"
  },
  {
    id: "nt-4",
    category: "Daily Reports",
    title: "Monthly Q1 Report Document Compiled",
    date: "Yesterday",
    details: "Your detailed Q1 2026 statement ledger has compiled successfully. Print or download the official PDF document.",
    connectedModule: "reports",
    status: "Read"
  }
];

const PRESET_MOCK_ALERTS = [
  {
    category: "System Alerts" as const,
    title: "Tesla Model 3 Amortization Sweep",
    details: "Your bimonthly auto installment of $650 is scheduled to sweep Chase Accounts on May 25, 2026.",
    connectedModule: "loans"
  },
  {
    category: "Smart Insights" as const,
    title: "Mortgage Refinancing Opportunity",
    details: "Chase Mortgage fixed 4.8% APR qualifies for pre-approved refinancing at 3.95% APR. Savings impact: +$350/mo.",
    connectedModule: "insights"
  },
  {
    category: "Budget Reminders" as const,
    title: "Technology SaaS Budget sweep warning",
    details: "Server API and SaaS workstation limits sit at 86% usage metrics. Standard capacity has $140 left.",
    connectedModule: "budgets"
  },
  {
    category: "Daily Reports" as const,
    title: "Daily Ledger Balance Sheet Generated",
    details: "Your daily transactional inflows ($420) and outflows ($180) have compiled successfully.",
    connectedModule: "reports"
  }
];

export default function NotificationsFocus() {
  // Config state
  const [activeTab, setActiveTab] = useState<"Inbox" | "Preferences">("Inbox");
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [inboxFilter, setInboxFilter] = useState<"all" | "unread" | "read">("all");

  // Preferences configuration parameters
  const [dailyDigest, setDailyDigest] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [dueAlarms, setDueAlarms] = useState(true);
  const [deliveryTime, setDeliveryTime] = useState("09:00 AM");
  const [deliveryDay, setDeliveryDay] = useState("Friday");
  const [deliveryMode, setDeliveryMode] = useState("Detailed Outline");

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "danger" } | null>(null);

  const showToast = (message: string, type: "success" | "info" | "danger" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Filter Inbox alerts list
  const filteredNotifications = useMemo(() => {
    return notifications.filter((nt) => {
      // Keyword match
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = nt.title.toLowerCase().includes(query);
        const matchesDetails = nt.details.toLowerCase().includes(query);
        const matchesCategory = nt.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDetails && !matchesCategory) return false;
      }

      // Inbox Filter Read/Unread
      if (inboxFilter !== "all") {
        if (inboxFilter === "unread" && nt.status !== "Unread") return false;
        if (inboxFilter === "read" && nt.status !== "Read") return false;
      }

      return true;
    });
  }, [notifications, searchQuery, inboxFilter]);

  // unread stats computations
  const stats = useMemo(() => {
    const unreadCount = notifications.filter((nt) => nt.status === "Unread").length;
    return {
      unreadCount,
      totalCount: notifications.length
    };
  }, [notifications]);

  // Bulk Operations
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((nt) => ({ ...nt, status: "Read" as const })));
    showToast("All unread notifications marked as read.", "success");
  };

  const handleClearInbox = () => {
    if (confirm("Are you sure you want to flush all alerts from the inbox ledger?")) {
      setNotifications([]);
      showToast("Inbox ledger successfully cleared.", "danger");
    }
  };

  // Individual Operations
  const handleToggleRead = (id: string, currentStatus: "Read" | "Unread") => {
    const targetStatus = currentStatus === "Read" ? ("Unread" as const) : ("Read" as const);
    setNotifications((prev) =>
      prev.map((nt) => (nt.id === id ? { ...nt, status: targetStatus } : nt))
    );
    showToast(`Notification marked as ${targetStatus.toLowerCase()}.`, "info");
  };

  const handleDeleteAlert = (id: string, title: string) => {
    setNotifications((prev) => prev.filter((nt) => nt.id !== id));
    showToast(`"${title}" alert deleted.`, "danger");
  };

  // Test Generator Trigger
  const handleTriggerTestAlert = () => {
    const randomPreset = PRESET_MOCK_ALERTS[Math.floor(Math.random() * PRESET_MOCK_ALERTS.length)];
    const newAlert: NotificationItem = {
      id: `nt-${Date.now()}`,
      category: randomPreset.category,
      title: `Test Alert: ${randomPreset.title}`,
      date: "Just Now",
      details: randomPreset.details,
      connectedModule: randomPreset.connectedModule,
      status: "Unread"
    };

    setNotifications((prev) => [newAlert, ...prev]);
    showToast("Test signal successfully generated and delivered!", "success");
  };

  // Save Preferences Toast
  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Notifications delivery preferences successfully compiled.", "success");
  };

  return (
    <section
      id="notifications-focus"
      className="relative overflow-hidden bg-[#f5f6f7] px-6 pt-16 pb-28 text-[#1f2428]"
    >
      {/* Ambient background blur */}
      <div className="pointer-events-none absolute left-1/4 top-16 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      {/* Visual Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 scale-100 ${
          toast.type === "success"
            ? "bg-emerald-500/90 border-emerald-400 text-white"
            : toast.type === "danger"
              ? "bg-red-500/90 border-red-400 text-white"
              : "bg-indigo-500/90 border-indigo-400 text-white"
        }`}>
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">{toast.message}</p>
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
            Control Center: Notifications Module
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's notification system centralizes raw alert logs, daily reports briefs, and smart cashflow warnings.
            Personalize delivery schedules, sweep unread items, verify triggers, and jump directly into optimization modules.
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
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Inbox Deck</span>
                  </div>

                  {/* Test Generator trigger button */}
                  <button
                    onClick={handleTriggerTestAlert}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f2428] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#343a40] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Bell className="h-4 w-4" />
                    Test Signal Delivery
                  </button>
                </div>

                {/* View Toggles Tab */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Display View</label>
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "Inbox", label: "Inbox Alert" },
                      { key: "Preferences", label: "Preferences" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key as any)}
                        className={`rounded-xl py-1.5 text-[9px] font-bold uppercase tracking-wider transition ${
                          activeTab === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                      >
                        {item.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {activeTab === "Inbox" && (
                  <>
                    {/* Search */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Keywords..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full rounded-2xl border border-[#e1e5e8] bg-white pl-10 pr-4 py-2.5 text-xs text-[#1f2428] outline-none transition focus:border-[#1f2428] shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Inbox Read/Unread filters */}
                    <div className="space-y-1.5 pt-2 border-t border-[#e1e5e8]">
                      <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Status Filter</label>
                      <select
                        value={inboxFilter}
                        onChange={(e) => setInboxFilter(e.target.value as any)}
                        className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                      >
                        <option value="all">All Alerts</option>
                        <option value="unread">Unread Only</option>
                        <option value="read">Read Only</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar Footer Operations */}
              <div className="mt-8 pt-4 border-t border-[#e1e5e8] space-y-3">
                {activeTab === "Inbox" ? (
                  <>
                    <button
                      onClick={handleMarkAllRead}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d7dce0] bg-white px-4 py-2.5 text-xs font-semibold text-[#5f6b73] hover:bg-neutral-50 hover:text-[#1f2428] shadow-sm transition active:scale-98"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Mark All as Read
                    </button>
                    <button
                      onClick={handleClearInbox}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-100 shadow-sm transition active:scale-98"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear Inbox
                    </button>
                  </>
                ) : (
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 text-center py-2">
                    System Parameters Deck
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Cost calculators metrics widgets */}
                <div className="mb-6 grid gap-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Total Unread Alerts",
                      val: `${stats.unreadCount} Alerts`,
                      color: stats.unreadCount > 0 ? "text-amber-700 bg-amber-50/50 border-amber-100 shadow-sm animate-pulse" : "text-neutral-500 bg-neutral-50/50 border-neutral-100",
                      icon: Bell
                    },
                    {
                      label: "System delivery status",
                      val: "Enabled / Active",
                      color: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
                      icon: ShieldCheck
                    },
                    {
                      label: "Matching Ledger Items",
                      val: `${filteredNotifications.length} items`,
                      color: "text-[#1f2428] bg-[#f8f9fa] border-neutral-200",
                      icon: Inbox
                    },
                    {
                      label: "Scheduled summary digests",
                      val: `${deliveryTime} / ${deliveryDay.slice(0, 3)}`,
                      color: "text-indigo-700 bg-indigo-50/50 border-indigo-100",
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

                {activeTab === "Inbox" ? (
                  /* Visual Inbox Deck Screen */
                  <div className="rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-4 sm:p-6 min-h-[400px]">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Central inbox ledger</h3>
                      <span className="rounded-full bg-white border border-[#e1e5e8] px-3.5 py-0.5 text-[10px] font-semibold text-[#5f6b73] shadow-sm">
                        Inbox: {stats.totalCount} items
                      </span>
                    </div>

                    {filteredNotifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border border-[#e1e5e8] shadow-md text-neutral-400 mb-4 animate-pulse">
                          <AlertCircle className="h-7 w-7" />
                        </div>
                        <p className="text-sm font-semibold text-[#1f2428]">Inbox ledger is empty</p>
                        <p className="mt-1.5 text-xs text-[#697077] max-w-sm leading-5">
                          No alerts are currently tracked inside the sandbox. Trigger a **Test Signal Delivery** in the sidebar to populate mock notifications.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {filteredNotifications.map((nt) => {
                          const isUnread = nt.status === "Unread";
                          
                          let borderBg = "border-neutral-200 bg-white";
                          let dotColor = "bg-neutral-300";
                          let categoryColor = "bg-neutral-100 text-neutral-500 border-neutral-200";

                          if (isUnread) {
                            if (nt.category === "System Alerts") {
                              borderBg = "border-red-200 bg-white hover:border-red-400 shadow-sm";
                              dotColor = "bg-red-500 animate-ping";
                              categoryColor = "bg-red-50 text-red-600 border-red-100";
                            } else if (nt.category === "Smart Insights") {
                              borderBg = "border-emerald-200 bg-white hover:border-emerald-400 shadow-sm";
                              dotColor = "bg-emerald-500 animate-ping";
                              categoryColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
                            } else if (nt.category === "Budget Reminders") {
                              borderBg = "border-amber-200 bg-white hover:border-amber-400 shadow-sm";
                              dotColor = "bg-amber-500 animate-ping";
                              categoryColor = "bg-amber-50 text-amber-600 border-amber-100";
                            } else {
                              borderBg = "border-indigo-200 bg-white hover:border-indigo-400 shadow-sm";
                              dotColor = "bg-indigo-500 animate-ping";
                              categoryColor = "bg-indigo-50 text-indigo-600 border-indigo-100";
                            }
                          }

                          return (
                            <div
                              key={nt.id}
                              className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 shadow-sm transition duration-200 ${borderBg}`}
                            >
                              <div className="flex-1 space-y-1.5">
                                <div className="flex items-center gap-2">
                                  {isUnread && (
                                    <span className="relative flex h-2 w-2">
                                      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`} />
                                      <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor.split(" ")[0]}`} />
                                    </span>
                                  )}
                                  
                                  <span className={`rounded border px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider ${categoryColor}`}>
                                    {nt.category}
                                  </span>

                                  <span className="text-[9.5px] font-bold text-neutral-400 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {nt.date}
                                  </span>
                                </div>

                                <h4 className="text-xs font-bold text-[#1f2428]">
                                  {nt.title}
                                </h4>

                                <p className="text-[10px] text-neutral-500 leading-relaxed italic max-w-2xl">
                                  {nt.details}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                                {/* Toggle Read Icon */}
                                <button
                                  onClick={() => handleToggleRead(nt.id, nt.status)}
                                  className={`rounded-xl p-2 border transition ${
                                    isUnread
                                      ? "bg-indigo-50/50 border-indigo-100 text-indigo-600 hover:bg-indigo-100"
                                      : "bg-neutral-50 border-neutral-200 text-neutral-400 hover:bg-neutral-100 hover:text-[#1f2428]"
                                  }`}
                                  title={isUnread ? "Mark as Read" : "Mark as Unread"}
                                >
                                  {isUnread ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                </button>

                                {/* Delete Icon */}
                                <button
                                  onClick={() => handleDeleteAlert(nt.id, nt.title)}
                                  className="rounded-xl p-2 border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 transition"
                                  title="Delete Alert"
                                >
                                  <Trash className="h-4 w-4" />
                                </button>

                                {/* Deep-link action button */}
                                <a
                                  href={`/modules/${nt.connectedModule}`}
                                  className="flex items-center justify-center gap-1 rounded-xl bg-[#1f2428] px-3.5 py-2 text-[10px] font-bold text-white shadow-sm hover:bg-[#343a40] transition"
                                >
                                  Open
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Visual Preferences settings Screen */
                  <div className="rounded-[32px] border border-[#e1e5e8] bg-white p-6 shadow-sm min-h-[400px]">
                    <div className="border-b border-neutral-100 pb-3 mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b]">Preferences Settings parameters</h3>
                      <p className="text-[10px] text-[#5f6b73] mt-1 leading-4">Personalize the delivery frequency of bimonthly financial diagnostics reports and smart advice alerts.</p>
                    </div>

                    <form onSubmit={handleSavePreferences} className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Alert Toggles</h4>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-neutral-50">
                          <div>
                            <span className="text-xs font-bold text-[#1f2428] block">Daily Digest summaries</span>
                            <span className="text-[9.5px] text-neutral-400 italic">Generate end-of-day balances checklist report</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setDailyDigest(!dailyDigest); showToast(`Daily summaries ${!dailyDigest ? "enabled" : "disabled"}`, "info"); }}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none ${
                              dailyDigest ? "bg-[#1f2428]" : "bg-neutral-200"
                            }`}
                          >
                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                              dailyDigest ? "translate-x-5" : "translate-x-0"
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-neutral-50">
                          <div>
                            <span className="text-xs font-bold text-[#1f2428] block">Bimonthly Budget limit alerts</span>
                            <span className="text-[9.5px] text-neutral-400 italic">Send alarms when budget consumption exceeds 90%</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setBudgetAlerts(!budgetAlerts); showToast(`Budget alarms ${!budgetAlerts ? "enabled" : "disabled"}`, "info"); }}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none ${
                              budgetAlerts ? "bg-[#1f2428]" : "bg-neutral-200"
                            }`}
                          >
                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                              budgetAlerts ? "translate-x-5" : "translate-x-0"
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-neutral-50">
                          <div>
                            <span className="text-xs font-bold text-[#1f2428] block">Critical due date alarms</span>
                            <span className="text-[9.5px] text-neutral-400 italic">Deliver alerts 5 days prior to loan due dates</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setDueAlarms(!dueAlarms); showToast(`Critical due alarms ${!dueAlarms ? "enabled" : "disabled"}`, "info"); }}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none ${
                              dueAlarms ? "bg-[#1f2428]" : "bg-neutral-200"
                            }`}
                          >
                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                              dueAlarms ? "translate-x-5" : "translate-x-0"
                            }`} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Delivery Timings</h4>

                        <div className="space-y-1.5 pt-2 border-t border-neutral-50">
                          <label className="text-[10px] font-bold text-neutral-400 block uppercase tracking-wider">Digest Delivery Hour</label>
                          <select
                            value={deliveryTime}
                            onChange={(e) => { setDeliveryTime(e.target.value); showToast(`Delivery hour set to ${e.target.value}`, "info"); }}
                            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#1f2428] cursor-pointer"
                          >
                            <option value="09:00 AM">Morning (09:00 AM)</option>
                            <option value="01:00 PM">Noon (01:00 PM)</option>
                            <option value="06:00 PM">Evening (06:00 PM)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-neutral-400 block uppercase tracking-wider">Digest Delivery Weekday</label>
                          <select
                            value={deliveryDay}
                            onChange={(e) => { setDeliveryDay(e.target.value); showToast(`Delivery weekday set to ${e.target.value}`, "info"); }}
                            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#1f2428] cursor-pointer"
                          >
                            <option value="Monday">Monday Startup Digest</option>
                            <option value="Friday">Friday Weekend Digest</option>
                            <option value="Sunday">Sunday Amortization Digest</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-neutral-400 block uppercase tracking-wider">Alert Details Level</label>
                          <select
                            value={deliveryMode}
                            onChange={(e) => { setDeliveryMode(e.target.value); showToast(`Details level set to ${e.target.value}`, "info"); }}
                            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#1f2428] cursor-pointer"
                          >
                            <option value="Detailed Outline">Detailed Outline & Action Links</option>
                            <option value="Compact capsule">Compact capsule summaries only</option>
                          </select>
                        </div>
                      </div>

                      <div className="md:col-span-2 pt-4 border-t border-neutral-100 flex justify-end">
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 rounded-2xl bg-[#1f2428] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#343a40] transition hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
                        >
                          <Settings className="h-4 w-4" />
                          Apply Configuration Preferences
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Bottom Insight Footer Card */}
              <div className="mt-6 flex items-start gap-4 rounded-[32px] border border-[#e1e5e8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1f2428] text-white">
                  <Activity className="h-5 w-5" />
                </div>

                <div>
                  <span className="rounded-full bg-[#f1f3f5] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#697077]">
                    Notifications System Assessment
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Currently synchronizing <span className="font-semibold text-neutral-800">{stats.unreadCount} unread system notifications</span>.
                    System delivery is fully verified at <span className="font-semibold text-emerald-600">100% active operational state</span>.
                    Your preference profile schedules consolidated financial digests to compile automatically every <span className="font-semibold text-[#1f2428]">{deliveryDay} at {deliveryTime}</span> in <span className="font-semibold text-[#1f2428]">{deliveryMode}</span> settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                The Notifications center unifies disparate alarms into one cohesive command visual panel, helping you filter out noise, edit schedules, and execute optimizations.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Consolidate critical due dates, smart insights, and budget warning limits",
                "Toggle display tabs between Inbox ledger listings and Preferences config",
                "Generate custom mock alerts dynamically to verify signal deliveries",
                "Mark all unread notifications as read or clear the inbox completely",
                "Toggle parameters for daily digest summaries and due date warnings",
                "Adjust delivery timings selecting designated times and weekdays",
                "Wipe individual notifications or switch their read/unread statuses reactively",
                "Navigate directly to corresponding workspaces (Debts, Budgets, Reports)"
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
          <h4 className="text-lg font-bold">Notifications Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Notifications establishes structured awareness pathways. By organizing alerts, managing digests, adjusting schedules, and offering direct hooks into modules, Damsera keeps you informed exactly when it matters without clutter.
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
      title: "1. Central Inbox Ledger",
      desc: "Assemble critical system alarms, SaaS subscription warnings, and monthly statements under a clean inbox.",
      icon: Inbox
    },
    {
      title: "2. Dual Display Toggles",
      desc: "Switch display screens segmenting active notification listings from preferences configuration panels.",
      icon: Layers
    },
    {
      title: "3. Verification Tester",
      desc: "Trigger mock alert generators in the sidebar. Systems inject fresh custom cards dynamically on the fly.",
      icon: Sparkles
    },
    {
      title: "4. Preferences Toggles",
      desc: "Customize alerts. Toggle checkboxes for daily digests, budget threshold limit warnings, and loan due dates.",
      icon: Check
    },
    {
      title: "5. Timing Delivery Hours",
      desc: "Select delivery timelines. Adjust hours selecting Morning (09:00 AM), Noon (01:00 PM), or Evening formats.",
      icon: Clock
    },
    {
      title: "6. Weekly Digest Schedulers",
      desc: "Set digest weekdays. Schedule weekly consolidated summaries on Monday morning or Friday travel periods.",
      icon: Calendar
    },
    {
      title: "7. Bulk list Operations",
      desc: "Execute bulk operations. Mark all unread elements as read or flush inbox registries in a single click.",
      icon: Trash2
    },
    {
      title: "8. Deep Connection Hooks",
      desc: "Jump into connection routes. Clicking Open directs you instantly to corresponding workspaces.",
      icon: ArrowRight
    },
    {
      title: "9. Offline Continuity Security",
      desc: "Retain complete local privacy. Alert indices compile securely inside native core boundaries with zero tracking.",
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
