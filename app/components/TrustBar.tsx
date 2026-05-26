import { Cloud, LayoutGrid, ShieldCheck } from "lucide-react";

function AppleLogo() {
  return (
    <span
      className="text-[28px] leading-none text-[#111827]"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
      }}
      aria-hidden="true"
    >
      
    </span>
  );
}

const items = [
  {
    title: "Built for Apple",
    description: "Native experience across iPhone and Mac.",
    icon: AppleLogo,
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
                className="group rounded-[1.5rem] border border-black/5 bg-white/75 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_50px_rgba(31,36,40,0.08)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f1f3] transition duration-300 group-hover:bg-[#e8ebee]">
                  <Icon className="h-[18px] w-[18px] shrink-0 text-[#111827]" strokeWidth={2.2}/>
                </div>

                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#111827]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#5f6b73]">
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