"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  CalendarDays,
  CreditCard,
  FileText,
  Landmark,
  LayoutDashboard,
  Repeat,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";

const featureGroups = [
  {
    title: "Navigation & Shell",
    subtitle: "Workspace foundation",
    icon: LayoutDashboard,
    description:
      "The structural layer of Damsera. It connects every financial module into one clean Apple-native workspace.",
    items: [
      "Dashboard home screen",
      "Transactions module",
      "Budgets module",
      "Accounts module",
      "Credit Cards module",
      "Subscriptions module",
      "Debts module",
      "Loans module",
      "Reports module",
      "Cashflow module",
      "Calendar module",
      "Goals module",
      "Categories module",
      "Tags module",
      "Recurring Transactions module",
      "Insights module",
      "Banks module",
      "Settings module",
      "Theme / Appearance section",
      "Help section",
      "Quick Add action",
      "Compact / More menu",
      "Primary and secondary navigation",
      "Tab bar and More flow",
    ],
  },
  {
    title: "Dashboard & Analytics",
    subtitle: "Command center",
    icon: BarChart3,
    description:
      "A high-level financial dashboard for daily awareness, monthly progress, risks, goals and insights.",
    items: [
      "Month Summary Bar",
      "Cash Position Strip",
      "Quick Capture Bar",
      "Action Center",
      "Today Focus",
      "KPI Summary Grid",
      "Upcoming Bills",
      "Budget Risk Strip",
      "Cashflow Explorer",
      "Net Worth Snapshot",
      "Spending Pulse",
      "Category Movers",
      "Forecast Panel",
      "Smart Insights list",
      "Account Health",
      "Subscription Pressure",
      "Debt & Loan Snapshot",
      "Change Since Last Period",
      "Pinned Goals",
      "Goal Progress",
      "Recent Transactions card",
      "Activity Timeline",
    ],
  },
  {
    title: "Cashflow Explorer",
    subtitle: "Money movement",
    icon: Wallet,
    description:
      "A visual cashflow intelligence system that explains how money moves through income, expenses, savings and debts.",
    items: [
      "Weekly, monthly, yearly and custom period selection",
      "Flow and chart mode",
      "Refresh action",
      "Reset action",
      "Custom date range selection",
      "Sankey / flow visualization",
      "Expense node drilldown",
      "Back to Main Flow action",
      "Net Balance card",
      "Savings Rate card",
      "Expense Distribution donut with legend",
      "Safe No Data state",
      "Filter-based transaction calculation",
    ],
  },
  {
    title: "Calendar",
    subtitle: "Time-based planning",
    icon: CalendarDays,
    description:
      "A financial calendar system that lets users read income, expenses, payments and financial events through daily, weekly and monthly time views.",
    items: [
      "Daily financial calendar view",
      "Weekly financial overview",
      "Monthly planning view",
      "Date-based income and expense tracking",
      "Transaction density by day",
      "Cashflow trend tracking on calendar",
      "Selected day transaction details",
      "Category-based calendar filtering",
      "Upcoming payments and financial events",
      "Timeline-style financial activity reading",
    ],
  },
  {
    title: "Transactions",
    subtitle: "Daily activity",
    icon: ArrowLeftRight,
    description:
      "A complete transaction layer for recording, editing, filtering and organizing every financial movement.",
    items: [
      "Add new transaction",
      "Edit transaction",
      "Delete transaction",
      "Transaction list",
      "Filtering screen",
      "Layout settings screen",
      "Pending / posted status management",
      "Category and subcategory linking",
      "Tag assignment",
      "Transfer group support",
    ],
  },
  {
    title: "Budgets",
    subtitle: "Planning intelligence",
    icon: BarChart3,
    description:
      "Advanced budget intelligence for limits, projections, utilization, spending pressure and financial control.",
    items: [
      "Budget KPI cards",
      "Allocation vs Spend",
      "Utilization heatmap",
      "Spend mix donut",
      "Burn trend",
      "Variance waterfall",
      "Monthly budget vs actual",
      "Overrun ranking",
      "Remaining budget projection",
      "Recurring vs variable spend",
      "Cashflow pressure timeline",
      "Savings opportunity",
      "Top merchant spend",
      "Stability heatmap",
      "Needs vs wants split",
      "Forecast confidence band",
      "Account-level consumption",
      "Active budgets list",
    ],
  },
  {
    title: "Subscriptions",
    subtitle: "Recurring payments",
    icon: Repeat,
    description:
      "Track renewals, recurring payments, subscription pressure and monthly or yearly cycles.",
    items: [
      "Subscription summary cards",
      "Renewal timeline",
      "Spend by category",
      "Active subscriptions list",
      "Add subscription",
      "Edit subscription",
      "Delete subscription",
      "Monthly and yearly cycle support",
    ],
  },
  {
    title: "Debts",
    subtitle: "Debt pressure",
    icon: Landmark,
    description:
      "Monitor debt balances, repayment pressure, analytics and long-term repayment movement.",
    items: [
      "Debt ledger",
      "Debt summary cards",
      "Debt analytics panel",
      "Balance by debt analysis",
      "Service mix analysis",
      "Pressure trajectory",
      "Debt CRUD flow",
    ],
  },
  {
    title: "Loans",
    subtitle: "Loan management",
    icon: Landmark,
    description:
      "A full loan book with payment plans, installment filters, contracts and payoff strategy.",
    items: [
      "Loan book",
      "Loan grouping by Category / Bank",
      "Loan summary cards",
      "Loan detail screen",
      "Terms / contract information",
      "Payment plan view",
      "Installment filters: All, Paid, Due, Overdue",
      "Related transaction matching",
      "Loan payment plan PDF preview / export",
      "Recalculate payment plan action",
      "Loan payoff strategy recommendation panel",
      "Loan CRUD flow",
    ],
  },
  {
    title: "Goals",
    subtitle: "Long-term targets",
    icon: Target,
    description:
      "Create and monitor savings goals, long-term targets and progress-based financial planning.",
    items: [
      "Goal portfolio list",
      "Goal progress calculations",
      "Goal summary cards",
      "Goal CRUD flow",
      "Quick goal creation flow",
    ],
  },
  {
    title: "Accounts, Cards & Banks",
    subtitle: "Financial sources",
    icon: CreditCard,
    description:
      "Manage bank accounts, cards, institutions, transfers and loan-bank relationships.",
    items: [
      "Accounts management",
      "Account list",
      "Add account",
      "Edit account",
      "Delete account",
      "Credit card management",
      "Bank institution registry",
      "Bank account records",
      "Bank transfer sheet component",
      "Loan-bank relationship fields",
    ],
  },
  {
    title: "Reports & Insights",
    subtitle: "Decision layer",
    icon: FileText,
    description:
      "Convert financial activity into reports, exports, signals, risks, anomalies and recommended actions.",
    items: [
      "Report summary cards",
      "Income vs Expense chart",
      "Category contribution chart",
      "Report library",
      "Financial report PDF service",
      "CSV export service",
      "AI Summary card",
      "Signal summary cards",
      "Risk summary cards",
      "Anomaly pressure visualization",
      "Confidence uplift",
      "Signal mix",
      "Merchant anomaly lens",
      "Highlights list",
      "Recommended actions list",
    ],
  },
  {
    title: "Notifications",
    subtitle: "Awareness system",
    icon: Bell,
    description:
      "A personalized notification system for summaries, reminders, insights, system updates and quick navigation.",
    items: [
      "Daily finance summary notifications",
      "Morning summary notifications",
      "End-of-day report notifications",
      "Weekly report reminders",
      "Monthly report reminders",
      "Insight notifications based on spending and balance",
      "System notifications for important app states",
      "Action recommendation notifications",
      "Central notification center",
      "Mark notification as read",
      "Mark all as read",
      "Clear notifications",
      "Tap notification to open related page",
      "Customize notification frequency",
      "Customize notification time",
      "Enable or disable notification types",
      "Report notification controls",
      "Reminder notification controls",
      "Insight notification controls",
    ],
  },
  {
    title: "System & Settings",
    subtitle: "Control layer",
    icon: Settings,
    description:
      "Workspace customization, security, sync, persistence, backup, restore and app-level infrastructure.",
    items: [
      "Application behavior personalization",
      "General workspace preferences",
      "Notification and alert management",
      "Security settings",
      "App lock system",
      "Theme and appearance settings",
      "Quick actions customization",
      "Interface behavior controls",
      "Page and screen layout customization",
      "Module visibility management",
      "Section order customization",
      "Workspace personalization",
      "Data export tools",
      "Backup system",
      "Restore workflow",
      "Workspace reset tools",
      "App data cleanup tools",
      "Maintenance utilities",
      "Diagnostic settings",
      "Support access",
      "About section",
      "Version information",
      "Legal documentation",
      "Cloud sync layer",
      "CloudKit configuration",
      "Persistence and repository layer",
      "Notification center",
      "Insights panel",
      "Setup wizard",
      "Root app flow",
      "Workspace backup snapshot / restore",
    ],
  },
];

export default function FullArchitectureTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = featureGroups[activeIndex];
  const ActiveIcon = activeGroup.icon;

  return (
    <section
      id="full-architecture"
      className="relative overflow-hidden px-6 py-24"
    >
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-[34rem] w-[34rem] rounded-full bg-white/80 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12rem] bottom-20 h-[34rem] w-[34rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            Full Architecture
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
            Explore every Damsera system.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
            Switch between product layers and review the complete feature set
            without scrolling through a long static list.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="h-fit rounded-[36px] border border-black/5 bg-white/70 p-3 shadow-[0_30px_100px_rgba(31,36,40,0.07)] backdrop-blur-xl lg:sticky lg:top-28">
            <div className="grid max-h-[720px] gap-2 overflow-y-auto pr-1">
              {featureGroups.map((group, index) => {
                const Icon = group.icon;
                const isActive = activeIndex === index;

                return (
                  <button
                    key={group.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group rounded-[26px] px-5 py-4 text-left transition duration-300 ${
                      isActive
                        ? "bg-[#1f2428] text-white shadow-[0_22px_70px_rgba(31,36,40,0.2)]"
                        : "bg-[#f8f9fa] text-[#1f2428] hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "bg-white text-[#1f2428] shadow-sm group-hover:bg-[#eef0f2]"
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2.2} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                            {group.title}
                          </p>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              isActive
                                ? "bg-white/15 text-white"
                                : "bg-white text-[#697077]"
                            }`}
                          >
                            {group.items.length}
                          </span>
                        </div>

                        <p
                          className={`mt-1 truncate text-xs ${
                            isActive ? "text-white/55" : "text-[#697077]"
                          }`}
                        >
                          {group.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[44px] border border-black/5 bg-white shadow-[0_30px_100px_rgba(31,36,40,0.08)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.title}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-8"
              >
                <div className="mb-8 overflow-hidden rounded-[34px] bg-[#f5f6f7] p-6">
                  <div className="rounded-[28px] bg-[#1f2428] p-5 text-white shadow-[0_30px_90px_rgba(31,36,40,0.18)]">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                          Damsera Preview
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                          {activeGroup.title}
                        </h3>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#1f2428]">
                        <ActiveIcon className="h-6 w-6" strokeWidth={2.2} />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {activeGroup.items.slice(0, 3).map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                        >
                          <div className="mb-4 h-2 w-12 rounded-full bg-white/25" />
                          <p className="text-sm leading-6 text-white/75">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#697077]">
                      Selected System
                    </p>

                    <h3 className="text-4xl font-semibold tracking-[-0.05em] text-[#1f2428]">
                      {activeGroup.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5f6b73]">
                      {activeGroup.description}
                    </p>
                  </div>

                  <div className="w-fit rounded-full bg-[#f8f9fa] px-4 py-2 text-sm font-semibold text-[#1f2428] shadow-sm">
                    {activeGroup.items.length} features
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {activeGroup.items.map((item) => (
                    <div
                      key={item}
                      className="group rounded-2xl bg-[#f8f9fa] px-4 py-3 text-sm leading-6 text-[#5f6b73] transition hover:bg-[#1f2428] hover:text-white"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[24px] bg-[#f8f9fa] p-5">
                    <Sparkles className="h-5 w-5 text-[#1f2428]" />
                    <p className="mt-4 text-sm font-semibold text-[#1f2428]">
                      Premium included
                    </p>
                  </div>

                  <div className="rounded-[24px] bg-[#f8f9fa] p-5">
                    <ShieldCheck className="h-5 w-5 text-[#1f2428]" />
                    <p className="mt-4 text-sm font-semibold text-[#1f2428]">
                      Private by design
                    </p>
                  </div>

                  <div className="rounded-[24px] bg-[#f8f9fa] p-5">
                    <CalendarDays className="h-5 w-5 text-[#1f2428]" />
                    <p className="mt-4 text-sm font-semibold text-[#1f2428]">
                      Built for planning
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}