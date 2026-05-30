import fs from "fs";
import path from "path";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import DashboardFocus from "@/app/components/DashboardFocus";
import TransactionsFocus from "@/app/components/TransactionsFocus";
import BudgetsFocus from "@/app/components/BudgetsFocus";
import CashflowFocus from "@/app/components/CashflowFocus";
import CalendarFocus from "@/app/components/CalendarFocus";
import SubscriptionsFocus from "@/app/components/SubscriptionsFocus";
import DebtsFocus from "@/app/components/DebtsFocus";
import LoansFocus from "@/app/components/LoansFocus";
import GoalsFocus from "@/app/components/GoalsFocus";
import ReportsFocus from "@/app/components/ReportsFocus";
import SystemFocus from "@/app/components/SystemFocus";
import InsightsFocus from "@/app/components/InsightsFocus";
import NotificationsFocus from "@/app/components/NotificationsFocus";
import {
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  CreditCard,
  Landmark,
  LayoutDashboard,
  LineChart,
  Monitor,
  ReceiptText,
  Repeat,
  Shield,
  Smartphone,
  Tablet,
  Target,
  WalletCards,
} from "lucide-react";
import { notFound } from "next/navigation";

const modules = {
  dashboard: {
    label: "Dashboard Module",
    imagePath: "/images/Dashboard/MacBook-iPhone-Dashboard.png",
    title: "Your entire financial life. One intelligent overview.",
    description:
      "Dashboard brings income, expenses, savings, cashflow and key financial signals into one calm Apple-native workspace.",
    pills: ["Real-time summaries", "Cross-device workspace", "Smart insights"],
    previewTitle: "Financial Overview",
    sectionTitle: "See what matters before it becomes noise.",
    sectionDescription:
      "The dashboard reduces financial clutter by surfacing trends, summaries, alerts and progress in one focused workspace.",
    features: [
      "Real-time analytics",
      "Interactive charts",
      "Financial widgets",
      "Monthly snapshots",
      "Offline-first",
      "Cross-device sync",
    ],
    icon: LayoutDashboard,
  },

  transactions: {
    label: "Transactions Module",
    imagePath: "/images/Transactions/MacBook-iPhone-Transactions.png",
    title: "Every transaction organized with clarity.",
    description:
      "Track income, expenses and transfers with clean categorization, filters and a fast daily entry workflow.",
    pills: ["Fast entry", "Smart filters", "Clean history"],
    previewTitle: "Transactions",
    sectionTitle: "Track every movement without losing focus.",
    sectionDescription:
      "Transactions are structured for daily use with categories, notes, dates, accounts and clear financial context.",
    features: [
      "Income tracking",
      "Expense tracking",
      "Transfer records",
      "Category filters",
      "Searchable history",
      "Offline-first",
    ],
    icon: ReceiptText,
  },

  budgets: {
    label: "Budgets Module",
    imagePath: "/images/Budgets/MacBook-iPhone-Budgets.png",
    title: "Plan spending before it happens.",
    description:
      "Create monthly budgets, monitor category limits and understand where your money is going.",
    pills: ["Monthly limits", "Category control", "Progress tracking"],
    previewTitle: "Budgets",
    sectionTitle: "Turn spending control into a calm routine.",
    sectionDescription:
      "Budgets help users stay intentional with money by showing limits, progress and remaining capacity.",
    features: [
      "Monthly budgets",
      "Category limits",
      "Progress cards",
      "Spending alerts",
      "Budget snapshots",
      "Cross-device sync",
    ],
    icon: WalletCards,
  },

  cashflow: {
    label: "Cashflow Module",
    imagePath: "/images/Cashflow/MacBook-iPhone-Cashflow.png",
    title: "Understand how money moves over time.",
    description:
      "Visualize inflows, outflows and net movement with a clean cashflow command center.",
    pills: ["Inflow tracking", "Outflow tracking", "Net movement"],
    previewTitle: "Cashflow",
    sectionTitle: "See your financial rhythm clearly.",
    sectionDescription:
      "Cashflow helps users understand timing, pressure points and monthly money movement.",
    features: [
      "Cashflow charts",
      "Income flow",
      "Expense flow",
      "Monthly comparison",
      "Net balance",
      "Trend overview",
    ],
    icon: LineChart,
  },

  calendar: {
    label: "Calendar Module",
    imagePath: "/images/Calendar/MacBook-iPhone-Calendar.png",
    title: "Read your finances through time.",
    description:
      "Calendar transforms income, expenses, payments and financial events into a daily, weekly and monthly planning view.",
    pills: ["Daily view", "Payment tracking", "Timeline planning"],
    previewTitle: "Calendar",
    sectionTitle: "Plan your money around real dates.",
    sectionDescription:
      "Calendar helps users understand financial activity on a time axis with daily details, upcoming payments, category filters and cashflow patterns.",
    features: [
      "Daily calendar view",
      "Weekly overview",
      "Monthly planning",
      "Date-based transactions",
      "Upcoming payments",
      "Category filters",
    ],
    icon: CalendarDays,
  },

  subscriptions: {
    label: "Subscriptions Module",
    imagePath: "/images/Subscriptions/MacBook-iPhone-Subscriptions.png",
    title: "Keep recurring payments under control.",
    description:
      "Track subscriptions, upcoming renewals and recurring charges before they surprise you.",
    pills: ["Renewal tracking", "Recurring payments", "Cost awareness"],
    previewTitle: "Subscriptions",
    sectionTitle: "Never lose track of recurring costs.",
    sectionDescription:
      "Subscriptions centralizes recurring payments so users can see what renews, when and how much it costs.",
    features: [
      "Renewal dates",
      "Recurring costs",
      "Monthly totals",
      "Payment reminders",
      "Service tracking",
      "Cost visibility",
    ],
    icon: Repeat,
  },

  debts: {
    label: "Debts Module",
    imagePath: "/images/Debts/MacBook-iPhone-Debts.png",
    title: "Manage debts with a clear repayment view.",
    description:
      "Track debt balances, payment progress and upcoming obligations in one organized module.",
    pills: ["Balance tracking", "Payment progress", "Debt overview"],
    previewTitle: "Debts",
    sectionTitle: "Make repayment progress visible.",
    sectionDescription:
      "Debts helps users understand remaining balances, payments and long-term repayment structure.",
    features: [
      "Debt balances",
      "Payment history",
      "Progress tracking",
      "Due dates",
      "Debt summaries",
      "Financial clarity",
    ],
    icon: CreditCard,
  },

  loans: {
    label: "Loans Module",
    imagePath: "/images/Loans/MacBook-iPhone-Loans.png",
    title: "Track loans with structure and confidence.",
    description:
      "Manage loan details, repayment plans and installment visibility across your workspace.",
    pills: ["Loan tracking", "Installments", "Payment planning"],
    previewTitle: "Loans",
    sectionTitle: "Keep every loan organized.",
    sectionDescription:
      "Loans gives users a clean way to monitor loan obligations, payment schedules and remaining amounts.",
    features: [
      "Loan records",
      "Installment tracking",
      "Payment schedule",
      "Remaining balance",
      "Due dates",
      "Overview cards",
    ],
    icon: Landmark,
  },

  goals: {
    label: "Goals Module",
    imagePath: "/images/Goals/MacBook-iPhone-Goals.png",
    title: "Build financial goals you can actually follow.",
    description:
      "Create saving goals, track progress and stay focused on long-term financial milestones.",
    pills: ["Saving goals", "Progress tracking", "Milestones"],
    previewTitle: "Goals",
    sectionTitle: "Turn plans into visible progress.",
    sectionDescription:
      "Goals helps users connect daily financial behavior with larger outcomes and milestones.",
    features: [
      "Saving goals",
      "Target amounts",
      "Progress bars",
      "Milestones",
      "Goal summaries",
      "Motivation cards",
    ],
    icon: Target,
  },

  reports: {
    label: "Reports Module",
    imagePath: "/images/Reports/MacBook-iPhone-Reports.png",
    title: "Turn financial activity into clean reports.",
    description:
      "Generate structured summaries for income, expenses, savings and long-term financial review.",
    pills: ["PDF reports", "Monthly review", "Clean summaries"],
    previewTitle: "Reports",
    sectionTitle: "Review your finances with confidence.",
    sectionDescription:
      "Reports transforms financial data into clear summaries designed for monthly and yearly review.",
    features: [
      "PDF preview",
      "Monthly reports",
      "Income summaries",
      "Expense summaries",
      "Savings review",
      "Export-ready layout",
    ],
    icon: BarChart3,
  },

  insights: {
    label: "Insights Module",
    imagePath: "/images/Insights/MacBook-iPhone-Insights.png",
    title: "Smarter signals for better financial decisions.",
    description:
      "Discover patterns, trends and meaningful financial signals without reading endless charts.",
    pills: ["Smart signals", "Trend detection", "Financial awareness"],
    previewTitle: "Insights",
    sectionTitle: "Understand the story behind the numbers.",
    sectionDescription:
      "Insights helps users notice important changes and patterns across their financial behavior.",
    features: [
      "Trend insights",
      "Spending signals",
      "Financial highlights",
      "Pattern detection",
      "Monthly intelligence",
      "Focused alerts",
    ],
    icon: BrainCircuit,
  },

  notifications: {
    label: "Notifications Module",
    imagePath: "/images/Notifications/MacBook-iPhone-Notifications.png",
    title: "Stay informed at the right time.",
    description:
      "Receive daily summaries, reminders and important financial alerts without opening the app constantly.",
    pills: ["Daily summaries", "Smart reminders", "Notification center"],
    previewTitle: "Notifications",
    sectionTitle: "Awareness without distraction.",
    sectionDescription:
      "Notifications are designed to keep users informed while preserving a calm, focused experience.",
    features: [
      "Daily summaries",
      "Report reminders",
      "Payment alerts",
      "Insight alerts",
      "Notification center",
      "Custom controls",
    ],
    icon: Bell,
  },

  system: {
    label: "System Module",
    imagePath: "/images/System/MacBook-iPhone-System.png",
    title: "Control the workspace around your own workflow.",
    description:
      "Manage app settings, security, appearance, backup, restore and workspace behavior from one control center.",
    pills: ["Security", "Customization", "Backup tools"],
    previewTitle: "System",
    sectionTitle: "A complete control center for Damsera.",
    sectionDescription:
      "System settings keep the entire app flexible, secure and personalized for different user workflows.",
    features: [
      "Security settings",
      "Appearance controls",
      "Backup tools",
      "Restore options",
      "Workspace settings",
      "Support tools",
    ],
    icon: Shield,
  },
} as const;

type ModuleSlug = keyof typeof modules;

const deviceCards = [
  {
    title: "iPhone",
    description: "Quick daily access with compact summaries and focused actions.",
    icon: Smartphone,
  },
  {
    title: "iPad",
    description: "Spacious interactive canvas optimized for mobile budgeting and reports.",
    icon: Tablet,
  },
  {
    title: "Mac",
    description: "A full workspace experience for deeper analysis and long sessions.",
    icon: Monitor,
  },
];

export function generateStaticParams() {
  return Object.keys(modules).map((slug) => ({ slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const currentModule = modules[slug as ModuleSlug];

  if (!currentModule) {
    notFound();
  }

  const ModuleIcon = currentModule.icon;

  const imagePathOnDisk = path.join(process.cwd(), "public", currentModule.imagePath);
  const resolvedImagePath = fs.existsSync(imagePathOnDisk)
    ? currentModule.imagePath
    : "/images/Dashboard/MacBook-iPhone-Dashboard.png";

  return (
    <main className="min-h-screen bg-[#f5f6f7] text-[#1f2428]">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-0 pt-40">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-white/90 blur-3xl" />
        <div className="pointer-events-none absolute right-[-14rem] top-52 h-[32rem] w-[32rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-[24px] bg-white shadow-xl">
              <ModuleIcon className="h-8 w-8 text-[#1f2428]" />
            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
              {currentModule.label}
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {currentModule.title}
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#5f6b73]">
              {currentModule.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {currentModule.pills.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/5 bg-white/75 px-5 py-3 text-sm font-semibold text-[#1f2428] shadow-sm backdrop-blur-xl"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-6 max-w-6xl">
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 w-full max-w-[880px]">
                <Image
                  src={resolvedImagePath}
                  alt={`Damsera MacBook & iPhone ${currentModule.label} Preview`}
                  width={2800}
                  height={1700}
                  priority
                  className="relative h-auto w-full object-contain drop-shadow-[0_35px_90px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {slug === "dashboard" ? (
        <DashboardFocus />
      ) : slug === "transactions" ? (
        <TransactionsFocus />
      ) : slug === "budgets" ? (
        <BudgetsFocus />
      ) : slug === "cashflow" ? (
        <CashflowFocus />
      ) : slug === "calendar" ? (
        <CalendarFocus />
      ) : slug === "subscriptions" ? (
        <SubscriptionsFocus />
      ) : slug === "debts" ? (
        <DebtsFocus />
      ) : slug === "loans" ? (
        <LoansFocus />
      ) : slug === "goals" ? (
        <GoalsFocus />
      ) : slug === "reports" ? (
        <ReportsFocus />
      ) : slug === "system" ? (
        <SystemFocus />
      ) : slug === "insights" ? (
        <InsightsFocus />
      ) : slug === "notifications" ? (
        <NotificationsFocus />
      ) : (
        <>
          <section className="px-6 py-24">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
                  Smart Workflow
                </p>

                <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  {currentModule.sectionTitle}
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6b73]">
                  {currentModule.sectionDescription}
                </p>
              </div>

              <div className="grid gap-4">
                {currentModule.pills.map((item) => (
                  <div
                    key={item}
                    className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_24px_80px_rgba(31,36,40,0.07)]"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f2f3]">
                      <ModuleIcon className="h-5 w-5" />
                    </div>

                    <h3 className="text-xl font-semibold tracking-[-0.03em]">
                      {item}
                    </h3>

                    <p className="mt-3 leading-7 text-[#5f6b73]">
                      Designed to keep the experience focused, useful and easy to
                      understand across every device.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
                  Cross Device Experience
                </p>

                <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Same clarity. Perfectly adapted to every Apple device.
                </h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
                {deviceCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_24px_80px_rgba(31,36,40,0.07)]"
                    >
                      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#f0f2f3]">
                        <Icon className="h-8 w-8" strokeWidth={2.2} />
                      </div>

                      <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                        {item.title}
                      </h3>

                      <p className="mt-4 leading-7 text-[#5f6b73]">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-6 py-24">
            <div className="mx-auto max-w-7xl rounded-[44px] border border-black/5 bg-white p-8 shadow-[0_30px_100px_rgba(31,36,40,0.08)] sm:p-12">
              <div className="mb-10 max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
                  Premium Features
                </p>

                <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Built for daily clarity and long-term control.
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentModule.features.map((item) => (
                  <div key={item} className="rounded-[28px] bg-[#f8f9fa] p-6">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <ModuleIcon className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-semibold tracking-[-0.03em]">
                      {item}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-24">
            <div className="mx-auto max-w-7xl rounded-[44px] bg-[#1f2428] p-10 text-center text-white shadow-2xl sm:p-16">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
                {currentModule.label}
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Built for clarity. Designed for focus.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
                A premium financial workspace for users who want to understand their
                money without feeling overwhelmed.
              </p>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}