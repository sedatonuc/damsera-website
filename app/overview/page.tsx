import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import FullArchitectureTabs from "../components/FullArchitectureTabs";
import {
  Bell,
  Clock,
  ListChecks,
  Monitor,
  Settings2,
  Smartphone,
} from "lucide-react";

const highlights = [
  "Apple-native experience",
  "Offline-first architecture",
  "Optional iCloud sync",
  "Full premium feature access",
];

const totalFeatureCount = 240;

export default function OverviewPage() {
  return (
    <main className="min-h-screen bg-[#f5f6f7] text-[#1f2428]">
      <Navbar />

      <section id="intro" className="relative overflow-hidden px-6 pb-24 pt-40">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/80 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10rem] top-44 h-[30rem] w-[30rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white shadow-xl">
              <Logo className="h-14 w-14 text-[#1f2428]" />
            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
              Damsera Overview
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              A complete finance system from A to Z.
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#5f6b73]">
              Damsera brings daily money tracking, cashflow intelligence,
              budgeting, reporting, planning, insights and Apple-native security
              into one modular premium workspace.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-[28px] border border-black/5 bg-white/75 px-5 py-5 text-center text-sm font-semibold text-[#1f2428] shadow-sm backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="px-6 py-10">
        <div className="mx-auto max-w-7xl rounded-[44px] border border-black/5 bg-white p-8 shadow-[0_30px_100px_rgba(31,36,40,0.08)] sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
                Complete Feature Map
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Every module. Every system. Fully included.
              </h2>

              <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
                This overview summarizes the full Damsera feature architecture.
                Every pricing plan includes the complete premium feature set.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] bg-[#1f2428] p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                  Total Scope
                </p>

                <p className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
                  {totalFeatureCount}+
                </p>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  included features
                </p>
              </div>

              <div className="rounded-[28px] bg-[#f8f9fa] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#697077]">
                  Systems
                </p>

                <p className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
                  13
                </p>

                <p className="mt-3 text-sm leading-6 text-[#5f6b73]">
                  architecture sections
                </p>
              </div>

              <div className="rounded-[28px] bg-[#f8f9fa] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#697077]">
                  Access
                </p>

                <p className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
                  All
                </p>

                <p className="mt-3 text-sm leading-6 text-[#5f6b73]">
                  plans include everything
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FullArchitectureTabs />

      <section id="notifications" className="px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[44px] border border-black/5 bg-white shadow-[0_30px_100px_rgba(31,36,40,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-10 sm:p-14">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
                Notification Center
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
                Stay informed without opening the app every time.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6b73]">
                Damsera keeps users aware of important financial activity with
                daily summaries, insight alerts, report reminders and a
                centralized notification center.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  "Daily finance summaries",
                  "Insight-based alerts",
                  "Report reminders",
                  "Custom notification settings",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-black/5 bg-[#f8f9fa] px-5 py-4 text-sm font-semibold text-[#1f2428]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative bg-[#1f2428] p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-white/10 blur-3xl" />

              <div className="relative grid gap-4">
                {[
                  {
                    title: "Daily summaries",
                    description:
                      "Morning and end-of-day financial summary notifications.",
                    icon: Bell,
                  },
                  {
                    title: "Report reminders",
                    description:
                      "Weekly or monthly reminders for financial review routines.",
                    icon: Clock,
                  },
                  {
                    title: "Notification center",
                    description:
                      "View, mark as read, clear and manage all notifications from one place.",
                    icon: ListChecks,
                  },
                  {
                    title: "Personalized control",
                    description:
                      "Customize notification types, frequency and preferred delivery time.",
                    icon: Settings2,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                        <Icon className="h-5 w-5" strokeWidth={2.2} />
                      </div>

                      <h3 className="text-xl font-semibold tracking-[-0.03em]">
                        {item.title}
                      </h3>

                      <p className="mt-3 leading-7 text-white/60">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workspace-preview" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
                Workspace Preview
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
                One connected financial workspace across every device.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6b73]">
                Damsera combines dashboards, cashflow intelligence, budgets,
                reports, subscriptions, goals and planning tools into one
                synchronized Apple-native environment.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  "Unified financial system",
                  "Cross-device continuity",
                  "Offline-first architecture",
                  "Premium modular experience",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-black/5 bg-white px-5 py-4 text-sm font-medium text-[#1f2428] shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute h-[34rem] w-[34rem] rounded-full bg-[#dfe3e6]/60 blur-3xl" />

              {/* Combined MacBook & iPhone Dashboard Preview */}
              <div className="relative z-10 w-full max-w-[920px]">
                <Image
                  src="/images/Overview/MacBook-iPhone-Dashboard.png"
                  alt="Damsera MacBook & iPhone Workspace Overview"
                  width={2800}
                  height={1700}
                  priority
                  className="relative h-auto w-full object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="apple-ecosystem" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
                Apple Ecosystem
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
                Built for iPhone. Powerful on Mac.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6b73]">
                Damsera is designed around the Apple ecosystem to deliver a
                focused, native and premium finance experience across every
                screen size.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "iPhone",
                  description: "Fast daily tracking and quick financial decisions.",
                  icon: Smartphone,
                },
                {
                  title: "Mac",
                  description:
                    "Powerful workspace for reports, analytics and long sessions.",
                  icon: Monitor,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_24px_80px_rgba(31,36,40,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_100px_rgba(31,36,40,0.12)]"
                  >
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#f0f2f3] text-[#1f2428]">
                      <Icon className="h-8 w-8" strokeWidth={2.2} />
                    </div>

                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#1f2428]">
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
        </div>
      </section>

      <section id="control-center" className="px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[44px] border border-black/5 bg-white shadow-[0_30px_100px_rgba(31,36,40,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-10 sm:p-14">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
                Control Center
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
                Customize Damsera around your own workflow.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6b73]">
                Damsera includes a complete system settings layer that allows
                users to personalize interface behavior, notifications,
                security, layouts, backups and workspace controls.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  "Theme & appearance controls",
                  "Notification management",
                  "Workspace customization",
                  "Backup & restore tools",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[24px] border border-black/5 bg-[#f8f9fa] px-5 py-4 text-sm font-semibold text-[#1f2428]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative bg-[#1f2428] p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-white/10 blur-3xl" />

              <div className="relative grid gap-4">
                {[
                  {
                    title: "Workspace personalization",
                    description:
                      "Customize layouts, visible modules, quick actions and interface behavior.",
                  },
                  {
                    title: "Security controls",
                    description:
                      "Manage app lock, protection settings and secure workspace access.",
                  },
                  {
                    title: "Backup & restore",
                    description:
                      "Export, backup and restore your financial workspace safely.",
                  },
                  {
                    title: "Diagnostics & support",
                    description:
                      "Access maintenance tools, diagnostics, version info and support resources.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6"
                  >
                    <div className="mb-5 h-2 w-14 rounded-full bg-white/30" />

                    <h3 className="text-xl font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white/60">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="planning" className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[44px] bg-[#1f2428] p-10 text-white shadow-2xl sm:p-14">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
                Product Philosophy
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Powerful when you need it. Calm when you do not.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                Damsera is modular by design. Users can keep the workspace
                simple or activate advanced systems like cashflow analysis,
                reports, loans, debts, recurring rules and insights.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Modular workspace",
                "Full premium access",
                "Apple ecosystem focus",
                "Private by design",
                "Offline-first",
                "Built for long-term planning",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-medium text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}