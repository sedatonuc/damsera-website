const plans = [
  {
    name: "Monthly",
    price: "₺100",
    description: "Flexible access for everyday users.",
    features: [
      "All core finance modules",
      "iPhone, iPad and Mac access",
      "Secure local storage",
      "Monthly financial insights",
    ],
  },
  {
    name: "Yearly",
    price: "₺900",
    description: "Best value for serious planning.",
    popular: true,
    features: [
      "Everything in Monthly",
      "Full reporting tools",
      "Calendar-based planning",
      "Priority feature updates",
    ],
  },
  {
    name: "Lifetime",
    price: "₺2500",
    description: "One-time payment. Long-term ownership.",
    features: [
      "Lifetime access",
      "Premium finance suite",
      "Future platform updates",
      "No recurring subscription",
    ],
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
            Simple plans for a premium finance system.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
            Start with the plan that fits your financial workflow. Upgrade as
            your money system becomes more advanced.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[36px] border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-[#1f2428] bg-[#1f2428] text-white"
                  : "border-[#e4e7ea] bg-[#f8f9fa] text-[#1f2428]"
              }`}
            >
              {plan.popular && (
                <div className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1f2428]">
                  Popular
                </div>
              )}

              <h3 className="text-2xl font-semibold">{plan.name}</h3>

              <p
                className={`mt-3 leading-7 ${
                  plan.popular ? "text-white/65" : "text-[#5f6b73]"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-8">
                <span className="text-5xl font-semibold tracking-tight">
                  {plan.price}
                </span>
              </div>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        plan.popular ? "bg-white" : "bg-[#1f2428]"
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

              <a
                href="#"
                className={`mt-9 block rounded-full px-6 py-4 text-center text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-white text-[#1f2428] hover:bg-[#f0f2f3]"
                    : "bg-[#1f2428] text-white hover:bg-black"
                }`}
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}