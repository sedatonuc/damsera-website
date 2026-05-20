const faqs = [
  {
    question: "What is Damsera?",
    answer:
      "Damsera is a premium personal finance app designed for iPhone, iPad and Mac. It helps you manage transactions, budgets, accounts, cards, debts, loans, subscriptions, reports and financial calendar planning.",
  },
  {
    question: "Does Damsera work offline?",
    answer:
      "Yes. Damsera is designed with an offline-first approach, so your financial workspace remains available even without an internet connection.",
  },
  {
    question: "Does Damsera sync across devices?",
    answer:
      "Damsera supports optional iCloud sync, allowing your data to stay available across Apple devices when sync is enabled.",
  },
  {
    question: "Is Damsera only for Apple devices?",
    answer:
      "Yes. Damsera is focused on the Apple ecosystem to deliver a polished native experience across iPhone, iPad and Mac.",
  },
];

export default function FAQ() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            FAQ
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
            Questions before launch.
          </h2>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-[28px] border border-[#e4e7ea] bg-white p-7 shadow-sm"
            >
              <h3 className="text-lg font-semibold tracking-tight text-[#1f2428]">
                {faq.question}
              </h3>

              <p className="mt-3 leading-7 text-[#5f6b73]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}