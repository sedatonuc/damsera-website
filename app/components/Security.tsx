const securityItems = [
  {
    title: "Offline-first by default",
    description:
      "Your financial data stays available even without an internet connection.",
  },
  {
    title: "Optional iCloud sync",
    description:
      "Sync across iPhone, iPad and Mac when you choose to use iCloud.",
  },
  {
    title: "Face ID & passcode lock",
    description:
      "Protect access to your financial workspace with device-level security.",
  },
];

export default function Security() {
  return (
    <section id="security" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[44px] bg-[#1f2428] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
                Privacy & Security
              </p>

              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Your money data should feel private, fast and protected.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                Damsera is designed with a local-first architecture, optional
                iCloud synchronization and secure access controls for a
                premium Apple-native finance experience.
              </p>
            </div>

            <div className="space-y-4">
              {securityItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6"
                >
                  <div className="mb-5 h-10 w-10 rounded-2xl bg-white/10" />

                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <p className="mt-2 leading-7 text-white/60">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}