import {
  ArrowLeftRight,
  CalendarDays,
  ChartNoAxesCombined,
  FileText,
  LaptopMinimal,
  LayoutDashboard,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import Reveal from "./Reveal";

const features = [
  {
    title: "Smart Dashboard",
    description:
      "See income, expenses, savings, debt and monthly progress from one clean financial command center.",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    description:
      "Record and organize every financial movement with categories, tags, accounts and recurring rules.",
    icon: ArrowLeftRight,
  },
  {
    title: "Budgets",
    description:
      "Create monthly budgets, monitor limits and understand where your money is going before it is too late.",
    icon: Landmark,
  },
  {
    title: "Calendar Planning",
    description:
      "Track upcoming bills, installments, subscriptions and payment dates inside a financial calendar.",
    icon: CalendarDays,
  },
  {
    title: "Cashflow Intelligence",
    description:
      "Visualize how your income moves across expenses, savings, debts and long-term goals.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Reports",
    description:
      "Preview clean financial summaries and export professional PDF-style reports for every month.",
    icon: FileText,
  },
  {
    title: "Apple Ecosystem",
    description:
      "Designed for iPhone, iPad and Mac with a native, premium and privacy-first experience.",
    icon: LaptopMinimal,
  },
  {
    title: "Private by Design",
    description:
      "Your financial workspace is built around security, privacy and local-first data control.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative mx-auto w-full max-w-7xl px-6 py-28"
    >
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            Core Features
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
            Everything you need to understand and control your money.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
            Damsera combines daily money tracking, long-term planning, cashflow
            intelligence and advanced reporting in one modular finance system.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal key={feature.title} delay={index * 0.04}>
                <div className="group h-full rounded-[2rem] border border-black/5 bg-white/70 p-8 text-center shadow-[0_20px_60px_rgba(31,36,40,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_30px_80px_rgba(31,36,40,0.1)]">
                  <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f0f1f3] transition duration-300 group-hover:bg-[#e8ebee]">
                    <Icon
                      className="h-7 w-7 text-[#111827]"
                      strokeWidth={2.2}
                    />
                  </div>

                  <h3 className="min-h-[64px] text-2xl font-semibold tracking-[-0.03em] text-[#111827]">
                    {feature.title}
                  </h3>

                 <p className="mt-5 text-base leading-7 text-[#5f6b73]">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}