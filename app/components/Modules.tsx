const modules = [
  "Dashboard",
  "Transactions",
  "Budgets",
  "Accounts",
  "Credit Cards",
  "Subscriptions",
  "Loans",
  "Debts",
  "Reports",
  "Calendar",
  "Goals",
  "Categories",
];

export default function Modules() {
  return (
    <section
      id="modules"
      className="bg-white px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
              Modular System
            </p>

            <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
              Build your own financial workspace.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6b73]">
              Damsera is designed as a modular finance system.
              Enable only the tools you need and keep your
              experience clean, focused and personalized.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Enable or disable modules",
                "Customize your dashboard",
                "Track everything in one place",
                "Designed for Apple devices",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#1f2428]" />

                  <p className="font-medium text-[#1f2428]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {modules.map((module) => (
              <div
                key={module}
                className="rounded-[28px] border border-[#e4e7ea] bg-[#f8f9fa] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div className="mb-6 h-10 w-10 rounded-2xl bg-white shadow-sm" />

                <h3 className="font-semibold tracking-tight text-[#1f2428]">
                  {module}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
