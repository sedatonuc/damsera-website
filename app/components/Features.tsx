const features = [
  {
    title: "Smart Dashboard",
    description:
      "See income, expenses, savings, debt and your monthly progress from one clean financial command center.",
  },
  {
    title: "Transactions",
    description:
      "Record and organize every financial movement with categories, tags, accounts and recurring rules.",
  },
  {
    title: "Budgets",
    description:
      "Create monthly budgets, monitor limits and understand where your money is going before it is too late.",
  },
  {
    title: "Calendar Planning",
    description:
      "Track upcoming bills, installments, subscriptions and payment dates directly inside a financial calendar.",
  },
  {
    title: "Reports",
    description:
      "Preview clean financial summaries and export professional PDF-style reports for every month.",
  },
  {
    title: "Apple Ecosystem",
    description:
      "Designed for iPhone, iPad and Mac with a native, premium and privacy-first experience.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            Core Features
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-[#1f2428] sm:text-5xl">
            Everything you need to understand and control your money.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
            Damsera combines daily money tracking, long-term planning and
            advanced reporting in a single modular finance system.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[32px] border border-[#e3e6e8] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0f2f3]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1f2428]" />
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-[#1f2428]">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-[#5f6b73]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}