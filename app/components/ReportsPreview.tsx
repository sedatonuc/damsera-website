import Reveal from "./Reveal";

const reportCards = [
  { title: "Monthly Summary", value: "Ready" },
  { title: "Income vs Expense", value: "+$4,220" },
  { title: "Category Analysis", value: "18 groups" },
];

export default function ReportsPreview() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-24">
      <Reveal>
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white/60 p-5 shadow-[0_40px_120px_rgba(31,36,40,0.12)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-[#f8fafc] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280]">Reports</p>
                  <h3 className="text-2xl font-semibold text-[#1f2428]">
                    Financial Report
                  </h3>
                </div>

                <button className="rounded-full bg-[#1f2428] px-5 py-2.5 text-sm font-semibold text-white">
                  Export PDF
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {reportCards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm text-[#6b7280]">{item.title}</p>
                    <p className="mt-3 text-xl font-semibold text-[#1f2428]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.65fr_0.35fr]">
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#1f2428]">
                      Income vs Expense
                    </p>
                    <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-[#6b7280]">
                      12 months
                    </span>
                  </div>

                  <div className="flex h-56 items-end gap-3">
                    {[68, 42, 72, 48, 78, 52, 84, 57, 88, 61, 92, 64].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex flex-1 items-end gap-1"
                        >
                          <div
                            className="w-1/2 rounded-t-xl bg-[#1f2937]"
                            style={{ height: `${height}%` }}
                          />
                          <div
                            className="w-1/2 rounded-t-xl bg-[#cbd5e1]"
                            style={{ height: `${Math.max(height - 24, 18)}%` }}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-[#1f2428]">
                    Report Library
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      "Monthly report",
                      "Cashflow report",
                      "Budget report",
                      "Loan report",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#4b5563]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
              Reports & Export
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] md:text-5xl">
              Turn your financial data into clear reports.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#6b7280]">
              Generate elegant financial summaries, analyze income and expenses,
              review category contribution, and export professional PDF reports.
            </p>

            <div className="mt-10 grid gap-3">
              {[
                "PDF-ready financial summaries",
                "Income and expense analytics",
                "Category contribution insights",
                "CSV export for deeper analysis",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/5 bg-white/55 px-5 py-4 text-sm font-medium text-[#4b5563] shadow-sm backdrop-blur-xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}