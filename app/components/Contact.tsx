"use client";

import { Mail, Shield, Globe, ArrowUpRight } from "lucide-react";

const contactCards = [
  {
    title: "General & Support Inquiries",
    description: "For general questions, feedback, or support with your workspace configuration.",
    email: "support@damseraapp.com",
    buttonText: "Email Support",
    icon: Mail,
  },
  {
    title: "Security & Privacy Engineering",
    description: "For inquiries regarding offline-first security benchmarks and iCloud CloudKit sync.",
    email: "support@damseraapp.com",
    buttonText: "Contact Privacy Team",
    icon: Shield,
  },
  {
    title: "Data Protection & Rights",
    description: "For account data rights, compliance inquiries, and GDPR guidelines.",
    email: "support@damseraapp.com",
    buttonText: "Contact Data Team",
    icon: Globe,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 overflow-hidden bg-gradient-to-b from-transparent to-[#f8f9fa]">
      {/* Subtle organic background glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#dfe3e6]/30 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#697077]">
            Get In Touch
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f2428] sm:text-5xl">
            We'd love to hear from you.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5f6b73]">
            Have questions about the app, partnership proposals, or need technical help? 
            Select the best way to reach out to our team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.email}
                className="group relative rounded-[32px] border border-[#e4e7ea] bg-white/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(31,36,40,0.08)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  {/* Glassmorphic Icon wrapper */}
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3f4f6] text-[#1f2428] transition-all duration-300 group-hover:bg-[#1f2428] group-hover:text-white group-hover:scale-[1.03]">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>

                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1f2428]">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-[#5f6b73]">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-neutral-100 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9099a1]">
                    Direct Email
                  </p>
                  
                  <a
                    href={`mailto:${card.email}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f2428] transition-all duration-300 hover:text-black group/link"
                  >
                    <span>{card.email}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
