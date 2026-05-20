import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white shadow-xl">
            <Image src="/logo.png" alt="Damsera Logo" width={56} height={56} priority />
          </div>

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            Premium personal finance app
          </p>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Your entire financial life, beautifully organized.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f6b73]">
            Damsera helps you manage transactions, budgets, accounts, credit
            cards, subscriptions, loans, reports and your financial calendar
            across iPhone, iPad and Mac.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a className="rounded-full bg-[#1f2428] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-black">
              Coming Soon
            </a>

            <a
              href="#features"
              className="rounded-full border border-[#d7dce0] bg-white px-7 py-4 text-center text-sm font-semibold text-[#1f2428] transition hover:border-[#1f2428]"
            >
              Explore Features
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#dfe3e6] blur-3xl" />

          <div className="relative mx-auto max-w-sm rounded-[44px] bg-[#1f2428] p-3 shadow-2xl">
            <div className="rounded-[36px] bg-[#f5f6f7] p-5">
              <div className="mx-auto mb-5 h-1.5 w-20 rounded-full bg-[#c7ccd1]" />

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#697077]">Total Balance</p>
                  <h2 className="mt-1 text-3xl font-semibold">₺128,450</h2>
                </div>

                <div className="rounded-full bg-[#e8f3ee] px-3 py-1 text-xs font-semibold text-[#0f7a4f]">
                  +12.4%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Income", "₺42,800"],
                  ["Expense", "₺18,250"],
                  ["Savings", "₺15,000"],
                  ["Debt", "₺9,700"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-[#697077]">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Upcoming Payments</p>
                  <span className="text-xs text-[#697077]">May</span>
                </div>

                <div className="space-y-3">
                  {[
                    ["Mortgage", "May 12", "₺8,500"],
                    ["Credit Card", "May 18", "₺4,250"],
                    ["Netflix", "May 21", "₺229"],
                  ].map(([name, date, amount]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-2xl bg-[#f5f6f7] px-3 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-[#697077]">{date}</p>
                      </div>
                      <p className="text-sm font-semibold">{amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}