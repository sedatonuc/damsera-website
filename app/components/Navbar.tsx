"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  CreditCard,
  Home,
  Landmark,
  LayoutDashboard,
  LineChart,
  ReceiptText,
  Repeat,
  Shield,
  Target,
  WalletCards,
} from "lucide-react";
import Logo from "./Logo";

const homeLinks = [
  { label: "Overview", href: "/overview" },
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const moduleLinks = [
  { label: "Dashboard", href: "/modules/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/modules/transactions", icon: ReceiptText },
  { label: "Budgets", href: "/modules/budgets", icon: WalletCards },
  { label: "Cashflow", href: "/modules/cashflow", icon: LineChart },
  { label: "Calendar", href: "/modules/calendar", icon: CalendarDays },
  { label: "Subscriptions", href: "/modules/subscriptions", icon: Repeat },
  { label: "Debts", href: "/modules/debts", icon: CreditCard },
  { label: "Loans", href: "/modules/loans", icon: Landmark },
  { label: "Goals", href: "/modules/goals", icon: Target },
  { label: "Reports", href: "/modules/reports", icon: BarChart3 },
  { label: "Insights", href: "/modules/insights", icon: BrainCircuit },
  { label: "Notifications", href: "/modules/notifications", icon: Bell },
  { label: "System", href: "/modules/system", icon: Shield },
];

function NavPillButton({
  href,
  label,
  icon,
  isActive = false,
  compact = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`group relative flex h-10 items-center justify-center overflow-hidden rounded-full text-sm font-semibold transition-all duration-300 ${
        compact ? "w-10 md:hover:w-[152px]" : "w-10 md:hover:w-[140px]"
      } ${
        isActive
          ? "bg-[#1f2428] text-white"
          : "bg-transparent text-[#1f2428] hover:bg-[#1f2428]/6"
      }`}
    >
      <span className="absolute transition-all duration-300 md:group-hover:-translate-x-12 md:group-hover:opacity-0">
        {icon}
      </span>

      <span
        className={`hidden whitespace-nowrap opacity-0 transition-all duration-300 md:block ${
          compact
            ? "translate-x-8 md:group-hover:translate-x-0 md:group-hover:opacity-100"
            : "translate-x-6 md:group-hover:translate-x-0 md:group-hover:opacity-100"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

function NavbarSeparator() {
  return <div className="mx-2 hidden h-6 w-px bg-[#1f2428]/15 md:block" />;
}

function ModuleButtonList({ pathname }: { pathname: string }) {
  return (
    <div className="hidden items-center gap-2 xl:flex">
      {moduleLinks.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <NavPillButton
            key={item.label}
            href={item.href}
            label={item.label}
            isActive={isActive}
            icon={<Icon className="h-4 w-4" strokeWidth={2.2} />}
          />
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isOverview = pathname === "/overview";
  const isModulePage = pathname.startsWith("/modules");

  const resolveHref = (href: string) => {
    if (href.startsWith("#") && !isHome && !isOverview) {
      return `/${href}`;
    }

    return href;
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-6 py-5">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-7 w-7 text-[#1f2428]" />

          <span className="text-sm font-semibold tracking-tight text-[#1f2428]">
            Damsera
          </span>
        </Link>

        {isModulePage ? (
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
            <NavPillButton
              href="/overview"
              label="Back to Overview"
              icon={<ArrowLeft className="h-4 w-4" />}
              compact
            />

            <NavPillButton
              href="/"
              label="Back to Main Page"
              icon={<Home className="h-4 w-4" />}
              compact
            />

            <NavbarSeparator />

            <ModuleButtonList pathname={pathname} />
          </div>
        ) : (
          <div className="hidden items-center gap-8 text-sm font-medium text-[#697077] md:flex">
            {isOverview ? (
              <>
                <NavPillButton
                  href="/"
                  label="Back Home"
                  icon={<ArrowLeft className="h-4 w-4" />}
                  compact
                />

                <NavbarSeparator />

                <ModuleButtonList pathname={pathname} />
              </>
            ) : (
              homeLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-[#1f2428]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={resolveHref(link.href)}
                    className="transition hover:text-[#1f2428]"
                  >
                    {link.label}
                  </a>
                )
              )
            )}
          </div>
        )}

        {!isModulePage && (
          <Link
            href={isHome ? "#pricing" : "/#pricing"}
            className="rounded-full bg-[#1f2428] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
          >
            Download
          </Link>
        )}

        {isModulePage && <div className="h-10 w-[92px]" />}
      </nav>
    </header>
  );
}