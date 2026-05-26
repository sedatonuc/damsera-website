const faqs = [
  {
    question: "What is Damsera?",
    answer:
      "Damsera is a premium personal finance platform designed for iPhone and Mac. It helps users manage transactions, budgets, accounts, subscriptions, debts, loans, reports, cashflow and financial planning from one unified workspace.",
  },
  {
    question: "Does Damsera work offline?",
    answer:
      "Yes. Damsera is built with an offline-first architecture, meaning your financial workspace remains accessible even without an internet connection.",
  },
  {
    question: "Does Damsera support cloud sync?",
    answer:
      "Yes. Damsera supports optional iCloud synchronization so your financial data can stay available across your Apple devices when sync is enabled.",
  },
  {
    question: "Is Damsera available outside the Apple ecosystem?",
    answer:
      "No. Damsera is intentionally focused on Apple platforms to provide a highly optimized native experience across iPhone and Mac.",
  },
  {
    question: "Do all plans include every feature?",
    answer:
      "Yes. Monthly, yearly and lifetime plans all include the complete premium feature set. The only difference is the payment model.",
  },
  {
    question: "What can I manage with Damsera?",
    answer:
      "You can manage transactions, budgets, subscriptions, debts, loans, goals, recurring transactions, accounts, cards, reports, categories, tags, insights and your financial calendar.",
  },
  {
    question: "Is my financial data private?",
    answer:
      "Damsera is designed around privacy-first principles with local-first storage, optional sync controls, app lock infrastructure and secure Apple-native technologies.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            FAQ
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
            Questions before launch.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5f6b73]">
            Everything you should know about the Damsera experience, ecosystem,
            pricing model and platform philosophy.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="group rounded-[32px] border border-[#e4e7ea] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(31,36,40,0.08)]"
            >
              <div className="flex items-start gap-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f3f4f6] text-sm font-semibold text-[#1f2428] transition duration-300 group-hover:bg-[#1f2428] group-hover:text-white">
                  ?
                </div>

                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1f2428]">
                    {faq.question}
                  </h3>

                  <p className="mt-4 leading-7 text-[#5f6b73]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}