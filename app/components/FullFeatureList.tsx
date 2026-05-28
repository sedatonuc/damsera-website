"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";

const featureGroups = [
  {
    title: "Navigation & Workspace",
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
      "Theme and appearance settings",
      "Help section",
      "Quick Add action",
      "Compact / More menu",
      "Primary and secondary navigation",
      "Tab bar and More flow",
    ],
  },
  {
    title: "Dashboard & Analytics",
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
      "Safe no-data state",
      "Transaction calculations based on selected filters",
    ],
  },
  {
    title: "Transactions",
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
    title: "Subscriptions, Debts & Loans",
    items: [
      "Subscription summary cards",
      "Renewal timeline",
      "Spend by category",
      "Active subscriptions list",
      "Add, edit and delete subscriptions",
      "Monthly and yearly subscription cycle support",
      "Debt ledger",
      "Debt summary cards",
      "Debt analytics panel",
      "Balance by debt analysis",
      "Service mix analysis",
      "Pressure trajectory",
      "Debt CRUD flow",
      "Loan book",
      "Loan grouping by category or bank",
      "Loan summary cards",
      "Loan detail screen",
      "Terms and contract information",
      "Payment plan view",
      "Installment filters",
      "Related transaction matching",
      "Loan payment plan PDF preview / export",
      "Recalculate payment plan action",
      "Loan payoff strategy panel",
      "Loan CRUD flow",
    ],
  },
  {
    title: "Goals, Accounts, Cards & Banks",
    items: [
      "Goal portfolio list",
      "Goal progress calculations",
      "Goal summary cards",
      "Goal CRUD flow",
      "Quick goal creation",
      "Accounts management",
      "Credit card management",
      "Bank institution registry",
      "Bank account records",
      "Bank transfer sheet",
      "Loan-bank relationship fields",
    ],
  },
  {
    title: "Categories, Tags & Recurring Rules",
    items: [
      "Category management",
      "Subcategory management",
      "Tag library",
      "Create, edit and delete recurring rules",
      "Recurring layout screen",
    ],
  },
  {
    title: "Reports & Insights",
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
    title: "System & Settings",
    items: [
      "Page layout customization",
      "Section order customization",
      "Quick Actions manager",
      "Theme and appearance settings",
      "Security settings",
      "App lock infrastructure",
      "Reset workspace / app data",
      "Cloud sync layer",
      "Persistence and repository layer",
      "Notification center",
      "Insights panel",
      "Setup wizard",
      "Root app flow",
      "Workspace backup snapshot / restore",
    ],
  },
];

function FeatureModalContent({
  selected,
  onClose,
}: {
  selected: (typeof featureGroups)[number];
  onClose: () => void;
}) {
  return (
    <>
      <div className="sticky top-0 z-10 border-b border-black/5 bg-white/90 p-7 backdrop-blur-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#697077] transition hover:bg-[#e8ebee] hover:text-[#1f2428]"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#697077]">
          Feature Group
        </p>

        <h3 className="mt-3 pr-12 text-3xl font-semibold tracking-[-0.04em] text-[#111827]">
          {selected.title}
        </h3>

        <p className="mt-2 text-sm text-[#697077]">
          {selected.items.length} premium features included
        </p>
      </div>

      <div className="max-h-[56vh] overflow-y-auto p-7">
        <div className="grid gap-3 sm:grid-cols-2">
          {selected.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl bg-[#f8f9fa] px-4 py-3"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f2428]" />
              <p className="text-sm leading-6 text-[#5f6b73]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function FullFeatureList() {
  const [selected, setSelected] = useState<(typeof featureGroups)[number] | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="bg-white px-6 pb-28">
      <div className="mx-auto max-w-7xl rounded-[40px] border border-[#e4e7ea] bg-[#f8f9fa] p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            Complete Feature List
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
            Everything included in every plan.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
            Monthly, yearly or lifetime — Damsera gives you access to the full
            premium finance system.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureGroups.map((group) => (
            <button
              key={group.title}
              type="button"
              onClick={() => setSelected(group)}
              className="group rounded-[28px] border border-black/5 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(31,36,40,0.08)]"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1f2428]">
                    {group.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#697077]">
                    {group.items.length} included features
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-[#697077] transition duration-300 group-hover:bg-[#1f2428] group-hover:text-white">
                  <ChevronRight
                    className="h-5 w-5 transition duration-300 group-hover:translate-x-0.5"
                    strokeWidth={2.2}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        isMobile ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <button
              type="button"
              aria-label="Close feature list"
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-[#1f2428]/25 backdrop-blur-sm"
            />
            <div className="relative max-h-[82vh] w-full max-w-2xl overflow-hidden rounded-[36px] border border-black/5 bg-white shadow-[0_40px_120px_rgba(31,36,40,0.24)]">
              <FeatureModalContent selected={selected} onClose={() => setSelected(null)} />
            </div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                aria-label="Close feature list"
                onClick={() => setSelected(null)}
                className="absolute inset-0 bg-[#1f2428]/25 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-h-[82vh] w-full max-w-2xl overflow-hidden rounded-[36px] border border-black/5 bg-white shadow-[0_40px_120px_rgba(31,36,40,0.24)]"
              >
                <FeatureModalContent selected={selected} onClose={() => setSelected(null)} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )
      )}
    </section>
  );
}