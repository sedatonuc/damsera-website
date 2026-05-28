const sharedFeatures = [
  "All premium finance modules included",
  "Dashboard, transactions, budgets and reports",
  "Cashflow, calendar, subscriptions, debts and loans",
  "iPhone and Mac access",
  "Local-first secure data storage",
  "Optional iCloud sync",
  "Future feature updates included",
];

const plans = [
  {
    name: "Monthly",
    price: "$3.99",
    period: "/ month",
    description: "Flexible access with the full premium experience.",
  },
  {
    name: "Yearly",
    price: "$31.99",
    period: "/ year",
    description: "Best value for long-term financial planning.",
    popular: true,
  },
  {
    name: "Lifetime",
    price: "$99.99",
    period: " one-time",
    description: "Pay once and keep lifetime premium access.",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            Pricing
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
            One premium experience. Choose how you want to pay.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
            Every plan unlocks the complete Damsera experience. Monthly, yearly
            or lifetime — all features are included.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[36px] border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${plan.popular
                ? "border-[#1f2428] bg-[#1f2428] text-white"
                : "border-[#e4e7ea] bg-[#f8f9fa] text-[#1f2428]"
                }`}
            >
              {plan.popular && (
                <div className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1f2428]">
                  Best Value
                </div>
              )}

              <h3 className="text-2xl font-semibold">{plan.name}</h3>

              <p
                className={`mt-3 min-h-[56px] leading-7 ${plan.popular ? "text-white/65" : "text-[#5f6b73]"
                  }`}
              >
                {plan.description}
              </p>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight">
                  {plan.price}
                </span>

                <span
                  className={`pb-1 text-sm font-medium ${plan.popular ? "text-white/55" : "text-[#697077]"
                    }`}
                >
                  {plan.period}
                </span>
              </div>

              <div
                className={`mt-7 rounded-2xl px-4 py-3 text-sm font-medium ${plan.popular
                  ? "bg-white/10 text-white/75"
                  : "bg-white text-[#5f6b73]"
                  }`}
              >
                Unlimited access to all Pro features
              </div>

              <div className="mt-8 flex-1 space-y-4">
                {sharedFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span
                      className={`mt-2 h-2 w-2 shrink-0 rounded-full ${plan.popular ? "bg-white" : "bg-[#1f2428]"
                        }`}
                    />

                    <p
                      className={
                        plan.popular ? "text-white/75" : "text-[#5f6b73]"
                      }
                    >
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}