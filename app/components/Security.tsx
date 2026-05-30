import {
  Cloud,
  LockKeyhole,
  WifiOff,
} from "lucide-react";

const securityItems = [
  {
    title: "Offline-first by default",
    description:
      "Your financial data stays available even without an internet connection.",
    icon: WifiOff,
  },
  {
    title: "Optional iCloud sync",
    description:
      "Sync across iPhone, iPad and Mac when you choose to use iCloud.",
    icon: Cloud,
  },
  {
    title: "Face ID & passcode lock",
    description:
      "Protect access to your financial workspace with device-level security.",
    icon: LockKeyhole,
  },
];

export default function Security() {
  return (
    <section id="security" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[44px] bg-[#1f2428] p-8 text-white shadow-[0_40px_120px_rgba(0,0,0,0.28)] sm:p-12 lg:p-16">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/45">
                Privacy & Security
              </p>

              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Your money data should feel private, fast and protected.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                Damsera is designed with a local-first architecture, optional
                iCloud synchronization and secure access controls for a premium
                Apple-native finance experience.
              </p>
            </div>

            <div className="space-y-5">
              {securityItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-[32px] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition duration-300 hover:border-white/15 hover:bg-white/[0.07]"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 group-hover:bg-white/[0.08]">
                      <Icon
                        className="h-6 w-6 text-white"
                        strokeWidth={2.2}
                      />
                    </div>

                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white/60">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}