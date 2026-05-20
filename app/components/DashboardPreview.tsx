import Reveal from "./Reveal";

const kpis = [
  { label: "Net Balance", value: "$14,280", change: "+12.4%" },
  { label: "Income", value: "$8,950", change: "+6.8%" },
  { label: "Expenses", value: "$4,730", change: "-3.1%" },
  { label: "Savings", value: "$2,180", change: "+18.2%" },
];

const activities = [
  "Subscription renewal tomorrow",
  "Budget risk detected in Lifestyle",
  "Loan installment due in 3 days",
];

export default function DashboardPreview() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-24">
      <Reveal>
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
            Dashboard Preview
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] md:text-5xl">
            A command center for your financial life.
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#6b7280]">
            See your balance, cash position, upcoming bills, budget risks,
            goals, recent activity and smart insights from one calm workspace.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white/60 p-4 shadow-[0_40px_120px_rgba(31,36,40,0.12)] backdrop-blur-xl">
          <div className="rounded-[1.5rem] bg-[#f8fafc] p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-sm text-[#6b7280]">May 2026</p>
                <h3 className="text-2xl font-semibold text-[#1f2428]">
                  Financial Dashboard
                </h3>
              </div>

              <button className="w-fit rounded-full bg-[#1f2428] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(31,36,40,0.18)]">
                Quick Add
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {kpis.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm text-[#6b7280]">{item.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-2xl font-semibold text-[#1f2428]">
                      {item.value}
                    </p>
                    <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#4f46e5]">
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#1f2428]">
                      Cash Position
                    </p>
                    <p className="text-sm text-[#6b7280]">
                      Income, expenses and savings trend
                    </p>
                  </div>

                  <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-[#6b7280]">
                    Monthly
                  </span>
                </div>

                <div className="flex h-64 items-end gap-3">
                  {[52, 68, 44, 74, 58, 86, 63, 92, 70, 78, 88, 64].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <div
                          className="w-full rounded-t-2xl bg-[#1f2937]"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[10px] text-[#9ca3af]">
                          {index + 1}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-[#1f2428]">
                    Today Focus
                  </p>

                  <div className="mt-4 space-y-3">
                    {activities.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#4b5563]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-[#1f2428]">
                    Goal Progress
                  </p>

                  <div className="mt-5 space-y-4">
                    {[
                      ["Emergency Fund", 72],
                      ["Mac Studio", 48],
                      ["Travel Budget", 36],
                    ].map(([label, value]) => (
                      <div key={label as string}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-[#4b5563]">{label}</span>
                          <span className="font-semibold text-[#1f2428]">
                            {value}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-[#e5e7eb]">
                          <div
                            className="h-2 rounded-full bg-[#1f2937]"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}