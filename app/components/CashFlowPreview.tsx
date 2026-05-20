import Reveal from "./Reveal";

const flows = [
  {
    title: "Income",
    amount: "$8,950",
    width: "100%",
  },
  {
    title: "Savings",
    amount: "$2,180",
    width: "72%",
  },
  {
    title: "Housing",
    amount: "$1,420",
    width: "58%",
  },
  {
    title: "Lifestyle",
    amount: "$860",
    width: "36%",
  },
  {
    title: "Subscriptions",
    amount: "$190",
    width: "18%",
  },
];

export default function CashFlowPreview() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-24">
      <Reveal>
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
              Cash Flow Intelligence
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] md:text-5xl">
              Understand how your money actually moves.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#6b7280]">
              DAMSERA visualizes your income, spending, savings and financial
              pressure through an intelligent flow-based experience.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Interactive financial flow analysis",
                "Expense distribution insights",
                "Savings rate visualization",
                "Forecast-based financial tracking",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/55 px-5 py-4 shadow-sm backdrop-blur-xl"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-[#1f2937]" />
                  <span className="text-sm font-medium text-[#4b5563]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dbeafe]/60 blur-3xl" />

            <div className="rounded-[2rem] border border-black/10 bg-white/60 p-5 shadow-[0_40px_120px_rgba(31,36,40,0.12)] backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-[#f8fafc] p-6">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6b7280]">Cashflow Explorer</p>
                    <h3 className="text-2xl font-semibold text-[#1f2428]">
                      Flow Mode
                    </h3>
                  </div>

                  <div className="rounded-full bg-[#eef2ff] px-4 py-2 text-sm font-semibold text-[#4f46e5]">
                    Monthly
                  </div>
                </div>

                <div className="space-y-5">
                  {flows.map((flow, index) => (
                    <div key={flow.title}>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-3 w-3 rounded-full ${
                              index === 0
                                ? "bg-[#1f2937]"
                                : "bg-[#6b7280]"
                            }`}
                          />

                          <span className="text-sm font-medium text-[#374151]">
                            {flow.title}
                          </span>
                        </div>

                        <span className="text-sm font-semibold text-[#1f2428]">
                          {flow.amount}
                        </span>
                      </div>

                      <div className="h-4 overflow-hidden rounded-full bg-[#e5e7eb]">
                        <div
                          className="h-4 rounded-full bg-[#1f2937] transition-all duration-700"
                          style={{
                            width: flow.width,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                    <p className="text-xs text-[#6b7280]">Net Balance</p>
                    <p className="mt-2 text-xl font-semibold text-[#1f2428]">
                      +$4,220
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                    <p className="text-xs text-[#6b7280]">Savings Rate</p>
                    <p className="mt-2 text-xl font-semibold text-[#1f2428]">
                      32%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                    <p className="text-xs text-[#6b7280]">Forecast</p>
                    <p className="mt-2 text-xl font-semibold text-[#1f2428]">
                      Stable
                    </p>
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