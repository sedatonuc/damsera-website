import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FileText, ArrowLeft, Scale, ShieldAlert, Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Damsera",
  description: "Comprehensive Terms of Service and End User License Agreement (EULA) for Damsera. Discover our licensing scope, self-custodial database disclaimers, and governing jurisdictions.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f5f6f7] text-[#1f2428]">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-28 pt-40">
        {/* Soft premium ambient background blurs */}
        <div className="pointer-events-none absolute left-1/2 top-20 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-white/80 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10rem] top-44 h-[34rem] w-[34rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#697077] hover:text-[#1f2428] transition mb-8"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="border-b border-[#e4e7ea] pb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d7dce0] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#697077] shadow-sm mb-6">
              <Scale className="h-3.5 w-3.5 text-[#1f2428]" />
              End User License Agreement (EULA)
            </span>

            <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Terms of Service
            </h1>
            <p className="mt-5 text-sm text-[#697077] font-bold">
              Last Updated: May 26, 2026 • Version 1.1.0 • EULA Compliance
            </p>
            <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
              Welcome to Damsera. By downloading, installing, or accessing this application, you agree to comply with and 
              be bound by the following comprehensive Terms of Service and EULA. Please review these parameters carefully.
            </p>
          </div>

          {/* Quick legal checklist */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 rounded-[32px] border border-neutral-200 bg-white p-6 sm:p-8">
            {[
              "Self-custodial database ownership",
              "Zero developer access to your files",
              "Standard App Store EULA scope",
              "No investment or tax advice disclaimer",
              "User-managed backup responsibilities",
              "Apple billing & license boundaries"
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-xs font-semibold text-[#5f6b73]">{text}</span>
              </div>
            ))}
          </div>

          {/* Detailed Legal Clauses */}
          <div className="mt-14 space-y-12 text-[#1f2428]">
            
            {/* Clause 1 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">1. Scope of the Application License</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera grants you a personal, non-transferable, revocable, and non-exclusive EULA license to download, install, 
                and run the application on authorized Apple devices (iPhone, iPad, Mac) linked to your personal Apple ID.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                You may not rent, lease, lend, sell, redistribute, or sublicense the application codebase. You shall not attempt 
                to reverse-engineer, decompile, or extract proprietary database structures, design templates, or simulated algorithms 
                associated with the dashboard modules.
              </p>
            </div>

            {/* Clause 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">2. Absolute Data Self-Custody Disclaimer</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera is a **self-custodial, offline-first local application**. This means that all transaction sub-ledgers, 
                budgets limits, and reports compiled exist exclusively inside your device's private SQLite container or iCloud CloudKit container.
              </p>
              <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 flex gap-4">
                <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-amber-800">Critical Data Notice:</h4>
                  <p className="mt-1.5 text-xs leading-5 text-amber-700">
                    We do not hold backups, database snapshots, or recovery files on our servers. You are solely responsible 
                    for generating regular backups of your SQLite files via the Control Center System settings panel. Damsera 
                    cannot recover lost or corrupted files resulting from local hardware failures, accidental deletions, or Apple ID logouts.
                  </p>
                </div>
              </div>
            </div>

            {/* Clause 3 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">3. Algorithmic Intelligence & No Financial Advice</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                The automated advisory signals, monthly spending trend graphs, estimated savings metrics, and repayment calculations 
                generated by Damsera's local algorithms (including the *Insights* and *Calendar* modules) are provided **strictly for 
                planning and educational purposes**.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera is not a certified public accountant, financial planner, or tax advisor. The software does not provide 
                binding investment strategies, tax filing guidelines, or corporate audits. You should consult a qualified financial professional 
                before executing major financing prepayments or balance consolidations.
              </p>
            </div>

            {/* Clause 4 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">4. Payments, Licensing & StoreKit Compliance</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Subscribing to Damsera’s full chronological plan or obtaining lifetime workspace access is handled exclusively via 
                Apple In-App Purchases (StoreKit).
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Billing, auto-renewal parameters, pricing structures, and refund requests are governed entirely by Apple's App Store 
                Terms and Conditions. We do not process transactions directly and possess no power to modify billing states or issue refunds.
              </p>
            </div>

            {/* Clause 5 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">5. Disclaimer of Warranties & Liabilities</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                DAMSERA IS PROVIDED "AS IS" AND "AS AVAILABLE" WITH ALL FAULTS AND WITHOUT WARRANTIES OF ANY KIND. 
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                TO THE MAXIMUM EXTENT PERMITTED BY GOVERNING LAW, DAMSERA SHALL NOT BE HELD LIABLE FOR PERSONAL INJURY, 
                PROPERTY DAMAGE, OR ANY INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING DATABASE CORRUPTION, 
                LOSS OF BALANCES, TRANSACTION RECORD ERRORS, OR DISCREPANCIES RESULTING FROM OFFLINE DISRUPTIONS.
              </p>
            </div>

            {/* Clause 6 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">6. Indemnification</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                You agree to indemnify, defend, and hold harmless Damsera, its developers, and contributors from and against any 
                and all claims, damages, obligations, losses, liabilities, costs, or debts arising from your use of the application, 
                your self-custody data handling, or your violation of these licensing terms.
              </p>
            </div>

            {/* Clause 7 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">7. Governing Law & Arbitrary Jurisdictions</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                These Terms of Service and EULA shall be governed by, and construed in accordance with, the laws of your local jurisdiction, 
                excluding its conflict of law rules. Any legal litigation, dispute resolution, or arbitration arising from EULA compliance 
                shall be settled exclusively in courts within that designated territory.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">8. Legal & EULA Inquiries</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                For legal compliance, business partnership queries, or further clarifications regarding our EULA licensing guidelines, 
                contact us at **terms@damsera.com**.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
