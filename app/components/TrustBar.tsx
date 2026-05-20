const items = [
  "Built for iPhone, iPad and Mac",
  "Private by design",
  "iCloud sync ready",
  "Modular finance workspace",
];

export default function TrustBar() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 pb-10 pt-4">
      <div className="rounded-3xl border border-black/5 bg-white/55 px-6 py-5 shadow-[0_24px_80px_rgba(31,36,40,0.08)] backdrop-blur-xl">
        <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-black/5 bg-white/45 px-4 py-3 text-sm font-medium text-[#4b5563]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}