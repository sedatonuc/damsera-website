import { Cloud, LayoutGrid, ShieldCheck } from "lucide-react";

function AppleLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-[#111827]"
      aria-hidden="true"
    >
      <path d="M16.365 1.43c0 1.14-.465 2.223-1.243 3.03-.82.848-2.16 1.5-3.32 1.406-.145-1.117.424-2.313 1.192-3.11.798-.83 2.184-1.42 3.37-1.326zM20.54 17.16c-.57 1.302-.84 1.884-1.573 3.038-1.02 1.605-2.46 3.605-4.24 3.62-1.58.014-1.988-1.03-4.133-1.018-2.146.012-2.595 1.037-4.176 1.023-1.78-.016-3.143-1.82-4.163-3.426-2.855-4.496-3.157-9.77-1.393-12.49 1.253-1.94 3.233-3.08 5.095-3.08 1.897 0 3.09 1.043 4.657 1.043 1.52 0 2.446-1.045 4.644-1.045 1.66 0 3.42.9 4.67 2.45-4.11 2.255-3.44 8.14.612 9.885z" />
    </svg>
  );
}

const items = [
  {
    title: "Built for Apple",
    description: "Native experience across iPhone, iPad and Mac.",
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
                  <Icon className="h-5 w-5 text-[#111827]" />
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