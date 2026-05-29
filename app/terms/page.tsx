import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FileText, ArrowLeft, Scale, ShieldAlert, Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "EULA & Terms of Service | Damsera",
  description: "End User License Agreement (EULA) and Terms of Service for Damsera. Discover our licensing scope, local data responsibility, and financial disclaimers.",
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
              EULA &amp; Terms
            </span>

            <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Terms of Service
            </h1>
            <p className="mt-5 text-sm text-[#697077] font-bold">
              Last Updated: May 30, 2026
            </p>
            <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
              Please read these End User License Agreement (&ldquo;EULA&rdquo;) and Terms of Service (&ldquo;Terms&rdquo;) carefully before downloading, installing, accessing, or using Damsera.
            </p>
            <p className="mt-4 text-base leading-7 text-[#5f6b73] font-semibold">
              By downloading, installing, or using Damsera, you agree to be bound by these Terms. If you do not agree with these Terms, do not use the application.
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
            
            {/* Section 1: Acceptance of Terms */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">1. Acceptance of Terms</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera is licensed, not sold, to you.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Your use of Damsera is subject to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>These Terms of Service</li>
                <li>This End User License Agreement</li>
                <li>Applicable Apple App Store Terms</li>
                <li>Applicable laws and regulations</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                You agree to use the application only in compliance with all applicable laws.
              </p>
            </div>

            {/* Section 2: License Grant */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">2. License Grant</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Subject to your compliance with these Terms, Damsera grants you a limited, personal, non-exclusive, non-transferable, revocable license to download, install, and use the application on Apple-authorized devices associated with your Apple ID.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                This license does not transfer ownership of the application or any intellectual property rights.
              </p>
            </div>

            {/* Section 3: Restrictions */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">3. Restrictions</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Copy, modify, or distribute the application except as permitted by law.</li>
                <li>Reverse engineer, decompile, disassemble, or attempt to derive source code except where expressly permitted by applicable law.</li>
                <li>Circumvent security features or technical protections.</li>
                <li>Use the application for unlawful purposes.</li>
                <li>Remove copyright, trademark, or proprietary notices.</li>
              </ul>
            </div>

            {/* Section 4: Ownership and Intellectual Property */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">4. Ownership and Intellectual Property</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera and all related software, designs, trademarks, logos, user interfaces, content, and intellectual property rights remain the exclusive property of Damsera and its licensors.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Nothing in these Terms grants ownership rights to the user.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                All rights not expressly granted are reserved.
              </p>
            </div>

            {/* Section 5: Local Data Responsibility */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">5. Local Data Responsibility</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera is designed as an offline-first application.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Financial information is primarily stored locally on your device and may optionally synchronize through Apple CloudKit if enabled by you.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Maintaining access to your Apple account.</li>
                <li>Managing your device security.</li>
                <li>Maintaining backups when appropriate.</li>
                <li>Protecting your login credentials and device access.</li>
              </ul>
              
              <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 flex gap-4">
                <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-amber-800">Critical Data Notice:</h4>
                  <p className="mt-1.5 text-xs leading-5 text-amber-700">
                    Damsera does not operate a centralized database containing users&apos; financial records and may be unable to recover data lost due to device failure, deletion, account changes, or circumstances outside our control.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6: Financial Information Disclaimer */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">6. Financial Information Disclaimer</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera is a personal finance management tool.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                The application may provide:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-[#5f6b73]">
                <li>Reports</li>
                <li>Insights</li>
                <li>Forecasts</li>
                <li>Spending trends</li>
                <li>Budget calculations</li>
                <li>Goal tracking</li>
                <li>Financial summaries</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Such information is provided solely for informational and organizational purposes.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera does not provide:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-[#5f6b73]">
                <li>Financial advice</li>
                <li>Investment advice</li>
                <li>Tax advice</li>
                <li>Accounting services</li>
                <li>Legal advice</li>
                <li>Professional consulting services</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                You should consult qualified professionals before making financial, tax, investment, legal, or business decisions.
              </p>
            </div>

            {/* Section 7: Subscriptions and Purchases */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">7. Subscriptions and Purchases</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Premium features may be offered through subscriptions or one-time purchases processed through Apple&apos;s App Store.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Purchases are managed through Apple&apos;s StoreKit platform.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Billing, renewals, cancellations, refunds, and payment processing are governed by Apple&apos;s policies and terms.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera does not process payment information directly.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                For subscription management, users should refer to their Apple Account settings.
              </p>
            </div>

            {/* Section 8: Availability and Updates */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">8. Availability and Updates</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                We may modify, improve, suspend, discontinue, or update portions of the application at any time.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>The application will always be available.</li>
                <li>The application will be error-free.</li>
                <li>The application will operate uninterrupted.</li>
                <li>All features will remain permanently available.</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Updates may be required to continue using certain features.
              </p>
            </div>

            {/* Section 9: Third-Party Services */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">9. Third-Party Services</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera may rely on services provided by third parties, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Apple App Store</li>
                <li>Apple StoreKit</li>
                <li>Apple iCloud</li>
                <li>Apple CloudKit</li>
                <li>Apple Authentication Services</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Your use of such services is governed by the applicable third-party terms and privacy policies.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera is not responsible for third-party systems or services beyond our reasonable control.
              </p>
            </div>

            {/* Section 10: Disclaimer of Warranties */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">10. Disclaimer of Warranties</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                To the maximum extent permitted by applicable law, Damsera is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                We make no warranties, express or implied, including but not limited to warranties regarding:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Availability</li>
                <li>Reliability</li>
                <li>Accuracy</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Some jurisdictions do not allow certain warranty exclusions, therefore some limitations may not apply to you.
              </p>
            </div>

            {/* Section 11: Limitation of Liability */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">11. Limitation of Liability</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                To the maximum extent permitted by applicable law, Damsera, its owners, developers, affiliates, licensors, and service providers shall not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Use of the application</li>
                <li>Inability to use the application</li>
                <li>Data loss</li>
                <li>Device failures</li>
                <li>Service interruptions</li>
                <li>Third-party service failures</li>
                <li>Financial decisions made by users</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Nothing in these Terms excludes liability that cannot be excluded under applicable law.
              </p>
            </div>

            {/* Section 12: Indemnification */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">12. Indemnification</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                You agree to defend, indemnify, and hold harmless Damsera and its affiliates from claims, liabilities, damages, losses, and expenses arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Your misuse of the application.</li>
                <li>Your violation of these Terms.</li>
                <li>Your violation of applicable laws.</li>
                <li>Your infringement of third-party rights.</li>
              </ul>
            </div>

            {/* Section 13: Termination */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">13. Termination</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                This license remains effective until terminated.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                We may suspend or terminate access if you violate these Terms.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Your rights under this license end immediately.</li>
                <li>You must discontinue use of the application.</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Sections that by their nature should survive termination shall continue to remain in effect.
              </p>
            </div>

            {/* Section 14: Governing Law */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">14. Governing Law</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                These Terms shall be governed by and interpreted in accordance with the laws applicable in the jurisdiction where Damsera operates, without regard to conflict-of-law principles.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Where required by local consumer protection laws, users may retain rights and remedies available under their local jurisdiction.
              </p>
            </div>

            {/* Section 15: Changes to These Terms */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">15. Changes to These Terms</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                We may update these Terms from time to time.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Updated versions will be published with a revised &ldquo;Last Updated&rdquo; date.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Continued use of Damsera after changes become effective constitutes acceptance of the revised Terms.
              </p>
            </div>

            {/* Section 16: Contact Information */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">16. Contact Information</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                For legal inquiries, licensing questions, partnership requests, or support matters, please contact:
              </p>
              <div className="bg-white rounded-3xl border border-black/5 p-6">
                <p className="text-base font-bold text-[#1f2428]">Damsera Support</p>
                <p className="mt-2 text-sm">
                  <a href="mailto:support@damseraapp.com" className="text-neutral-500 hover:text-[#1f2428] font-semibold underline decoration-2 transition">
                    support@damseraapp.com
                  </a>
                </p>
              </div>
              <p className="text-base leading-8 text-[#5f6b73]">
                We will make reasonable efforts to respond to inquiries in a timely manner.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
