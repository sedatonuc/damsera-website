import { Cloud, LayoutGrid, ShieldCheck, Smartphone } from "lucide-react";

const items = [
  {
    title: "Built for Apple",
    description: "Native experience across iPhone, iPad and Mac.",
    icon: Smartphone,
  },
  {
    title: "Private by design",
    description: "Your financial workspace stays under your control.",
    icon: ShieldCheck,
  },
  {
    title: "iCloud sync ready",
    description: "Keep your data aligned across your Apple devices.",
    icon: Cloud,
  },
  {
    title: "Modular workspace",
    description: "Enable only the finance modules you actually need.",
    icon: LayoutGrid,
  },
];

export default function TrustBar() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 pb-16">
      <div className="rounded-[2rem] border border-black/5 bg-white/70 p-5 shadow-[0_24px_80px_rgba(31,36,40,0.08)] backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex min-h-[210px] flex-col items-center justify-center rounded-[1.5rem] border border-black/5 bg-white/75 p-7 text-center transition duration-300 hover:bg-white hover:shadow-[0_18px_50px_rgba(31,36,40,0.06)]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f1f3]">
                  <Icon
                    className="block h-6 w-6 shrink-0 text-[#111827]"
                    strokeWidth={2.2}
                  />
                </div>

                <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#111827]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#5f6b73]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}