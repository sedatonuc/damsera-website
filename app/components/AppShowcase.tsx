import Reveal from "./Reveal";

const stats = [
  { label: "Monthly Balance", value: "$8,420" },
  { label: "Savings Rate", value: "32%" },
  { label: "Upcoming Bills", value: "7" },
];

export default function AppShowcase() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-24">
      <Reveal>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-black/5 bg-white/60 px-4 py-2 text-sm font-medium text-[#6b7280] shadow-sm backdrop-blur-xl">
              Built for iPhone, iPad and Mac
            </div>

            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] md:text-5xl">
              Your complete financial workspace, beautifully connected.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#6b7280]">
              DAMSERA brings accounts, budgets, cashflow, subscriptions, debts,
              loans, reports and insights into one calm Apple-style experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#1f2428] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(31,36,40,0.18)] transition hover:scale-[1.02]">
                Download on the App Store
              </button>

              <button className="rounded-full border border-black/10 bg-white/55 px-6 py-3 text-sm font-semibold text-[#1f2428] backdrop-blur-xl transition hover:bg-white/80">
                View Features
              </button>
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dbeafe]/70 blur-3xl" />
            <div className="absolute right-6 top-10 h-72 w-72 rounded-full bg-[#e9d5ff]/60 blur-3xl" />

            <div className="absolute right-0 top-12 w-[86%] rounded-[2rem] border border-black/10 bg-[#111827] p-3 shadow-[0_40px_120px_rgba(31,36,40,0.28)]">
              <div className="rounded-[1.5rem] bg-[#f8fafc] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6b7280]">Dashboard</p>
                    <h3 className="text-2xl font-semibold text-[#1f2428]">
                      Financial Overview
                    </h3>
                  </div>
                  <div className="rounded-full bg-[#eef2ff] px-4 py-2 text-sm font-semibold text-[#4f46e5]">
                    May 2026
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
                    >
                      <p className="text-xs text-[#6b7280]">{stat.label}</p>
                      <p className="mt-2 text-xl font-semibold text-[#1f2428]">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#1f2428]">
                      Cashflow
                    </p>
                    <p className="text-xs text-[#6b7280]">Flow mode</p>
                  </div>

                  <div className="space-y-3">
                    {["Income", "Savings", "Housing", "Lifestyle"].map(
                      (item, index) => (
                        <div key={item}>
                          <div className="mb-2 flex justify-between text-xs text-[#6b7280]">
                            <span>{item}</span>
                            <span>{[92, 54, 38, 24][index]}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#e5e7eb]">
                            <div
                              className="h-2 rounded-full bg-[#1f2937]"
                              style={{ width: `${[92, 54, 38, 24][index]}%` }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-[240px] rounded-[2.4rem] border border-black/10 bg-[#111827] p-3 shadow-[0_35px_90px_rgba(31,36,40,0.25)]">
              <div className="rounded-[1.8rem] bg-[#f8fafc] p-4">
                <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-black/10" />

                <p className="text-xs text-[#6b7280]">Today Focus</p>
                <h3 className="mt-1 text-lg font-semibold text-[#1f2428]">
                  3 actions need attention
                </h3>

                <div className="mt-5 space-y-3">
                  {["Pay credit card", "Review budget risk", "Renewal soon"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-black/5 bg-white p-3 text-xs font-medium text-[#4b5563] shadow-sm"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="absolute left-10 top-10 rounded-2xl border border-black/5 bg-white/75 px-5 py-4 text-sm font-semibold text-[#1f2428] shadow-[0_20px_60px_rgba(31,36,40,0.12)] backdrop-blur-xl">
              Smart financial insights
            </div>

            <div className="absolute bottom-16 right-8 rounded-2xl border border-black/5 bg-white/75 px-5 py-4 text-sm font-semibold text-[#1f2428] shadow-[0_20px_60px_rgba(31,36,40,0.12)] backdrop-blur-xl">
              Private iCloud sync
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}