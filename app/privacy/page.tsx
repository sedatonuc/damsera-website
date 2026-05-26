import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, ArrowLeft, Lock, EyeOff, ServerOff, Cpu } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Damsera",
  description: "Exhaustive, private-by-design Privacy Policy for Damsera. Discover our local SQLite sandbox encryption, secure iCloud CloudKit sync, and zero-telemetry architecture.",
};

export default function PrivacyPage() {
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
              <ShieldCheck className="h-3.5 w-3.5 text-[#1f2428]" />
              Data Sovereignty
            </span>

            <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-5 text-sm text-[#697077] font-bold">
              Last Updated: May 26, 2026 • Version 1.1.0 • EULA Compliance
            </p>
            <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
              Damsera is built on the belief that your financial data is personal, private, and belongs solely to you. 
              Our private-by-design architecture ensures that your financial records are never collected, aggregated, 
              tracked, or sold. Below is an exhaustive disclosure of how Damsera handles privacy.
            </p>
          </div>

          {/* Core Architecture Highlights (3-Columns) */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
              <Cpu className="h-5 w-5 text-[#1f2428] mb-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">Local Sandbox</h4>
              <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                Your transactions, accounts, and budgets are written directly to a private, localized SQLite database inside your Apple sandbox container.
              </p>
            </div>

            <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
              <ServerOff className="h-5 w-5 text-red-600 mb-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">Zero Cloud Servers</h4>
              <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                We run no intermediate backend databases. There are no server databases where your balance records or credentials could be compromised.
              </p>
            </div>

            <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
              <EyeOff className="h-5 w-5 text-emerald-600 mb-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">No Telemetry</h4>
              <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                Damsera contains no tracking SDKs, Firebase metrics, or marketing cookies. Your app interactions remain entirely anonymous.
              </p>
            </div>
          </div>

          {/* Comprehensive Disclosures */}
          <div className="mt-14 space-y-12 text-[#1f2428]">
            
            {/* Section 1: Detailed Data Map */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">1. Exhaustive Data Collection Disclosure</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                To provide absolute transparency, we explicitly state that we **DO NOT COLLECT, TRANSMIT, PROCESS, OR RETAIN** any of the following data categories:
              </p>
              <div className="rounded-3xl border border-black/5 bg-white p-6">
                <table className="w-full text-left text-xs leading-6">
                  <thead>
                    <tr className="border-b border-[#e4e7ea] text-neutral-400 font-bold uppercase tracking-wider">
                      <th className="pb-2">Data Category</th>
                      <th className="pb-2">Handling Method</th>
                      <th className="pb-2 text-right">Access Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#e4e7ea]/50">
                      <td className="py-3 font-semibold">Transactions & Ledgers</td>
                      <td className="py-3 text-neutral-500">Stored strictly in local SQLite Database</td>
                      <td className="py-3 text-right text-emerald-600 font-bold">User-Only</td>
                    </tr>
                    <tr className="border-b border-[#e4e7ea]/50">
                      <td className="py-3 font-semibold">Bank Accounts & Routing</td>
                      <td className="py-3 text-neutral-500">None. Manual registry or offline import</td>
                      <td className="py-3 text-right text-emerald-600 font-bold">User-Only</td>
                    </tr>
                    <tr className="border-b border-[#e4e7ea]/50">
                      <td className="py-3 font-semibold">Credentials & PINs</td>
                      <td className="py-3 text-neutral-500">None. Handled locally by Apple Keychain API</td>
                      <td className="py-3 text-right text-emerald-600 font-bold">User-Only</td>
                    </tr>
                    <tr className="border-b border-[#e4e7ea]/50">
                      <td className="py-3 font-semibold">iCloud Metadata</td>
                      <td className="py-3 text-neutral-500">Encrypted via Apple CloudKit Container</td>
                      <td className="py-3 text-right text-emerald-600 font-bold">User-Only</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold">Usage & App Behavior</td>
                      <td className="py-3 text-neutral-500">No analytics tracking. Zero cloud telemetry</td>
                      <td className="py-3 text-right text-emerald-600 font-bold">User-Only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: SQLite Sandbox Security details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">2. Local Sandbox Encryption Architecture</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Your database is isolated inside Apple's native application sandbox container. Under iOS and macOS security frameworks, 
                this ensures that no other third-party application installed on your device can audit, read, or alter your financial records.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                For hardware-level security, the local database utilizes **Apple's Data Protection API**, encrypting database files 
                automatically whenever your screen is locked. This ensures your financial history remains protected in the event of 
                physical device loss or theft.
              </p>
            </div>

            {/* Section 3: iCloud Sync & CloudKit Framework */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">3. iCloud CloudKit Synchronization Mechanics</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera provides cross-device continuity exclusively through <strong>Apple CloudKit</strong>. When you activate database synchronization:
              </p>
              <ul className="list-disc pl-6 space-y-3.5 text-base leading-7 text-[#5f6b73]">
                <li><strong>E2E Encryption:</strong> Your database is synced directly to your private iCloud container using end-to-end encryption. Apple's Advanced Data Protection protocols ensure that your data keys remain exclusively on your authenticated Apple devices.</li>
                <li><strong>Zero Intermediaries:</strong> Damsera does not operate intermediate relays, reverse-proxies, or cloud web servers. Your database travels directly from your local device to Apple's secure iCloud servers.</li>
                <li><strong>Self-Service Control:</strong> You can enable or disable iCloud synchronization at any time directly through your Apple System Settings under iCloud &gt; Damsera.</li>
              </ul>
            </div>

            {/* Section 4: Privacy Frameworks Compliance */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">4. Global Privacy Frameworks Compliance (GDPR, CCPA, CPRA)</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Although Damsera does not harvest personal details, we fully comply with major global data protection frameworks:
              </p>
              <ul className="list-disc pl-6 space-y-3.5 text-base leading-7 text-[#5f6b73]">
                <li><strong>GDPR (Europe):</strong> We act neither as a data controller nor processor on our servers, as we receive no data. Your right to control data is fully exercised locally.</li>
                <li><strong>CCPA / CPRA (California):</strong> Damsera does not meet the criteria of a business that "sells" or "shares" consumer personal information, as we possess no database of users.</li>
                <li><strong>COPPA (Children's Online Privacy):</strong> Because Damsera has no backend databases and collects no information, it is inherently compliant with children's privacy standards, as no child's metrics are ever stored by us.</li>
              </ul>
            </div>

            {/* Section 5: Crash Reporting & System Diagnostics */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">5. Crash Reporting & System Diagnostics</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                We do not include third-party crash reporters (such as Crashlytics or Sentry). If the application encounters an error, 
                diagnostics are generated locally inside your Apple Console log. 
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Any voluntary logs or diagnostic files that you choose to submit to our support team are audited solely for code troubleshooting 
                and are permanently purged immediately upon issue resolution.
              </p>
            </div>

            {/* Section 6: In-App Purchase Privacy */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">6. Subscription & In-App Purchase Transactions</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                All premium module licenses and subscription payments are handled through Apple In-App Purchases. Damsera does not 
                collect, store, or transmit your credit card numbers, billing addresses, CVVs, or Apple ID passwords. All checkout transactions 
                are managed securely inside the secure runtime environment provided by Apple StoreKit.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">7. Corporate Compliance & Inquiries</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera is committed to maintaining the highest privacy benchmarks. For corporate audits, legal EULA inquiries, or general 
                clarifications regarding our offline-first codebase architecture, contact our Data Protection Representative at **privacy@damsera.com**.
              </p>
            </div>

            {/* Section 8: Website Visitor Analytics & Performance Indicators */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">8. Website Visitor Analytics &amp; Page Performance</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                While the Damsera native application itself contains zero third-party telemetry scripts and operates fully offline, 
                our public-facing promotional website uses lightweight analytics services to optimize our design, inspect page loading speeds, and understand general user traffic patterns. These include:
              </p>
              <ul className="list-disc pl-6 space-y-3.5 text-base leading-7 text-[#5f6b73]">
                <li><strong>Vercel Analytics &amp; Speed Insights:</strong> Monitors page load times, layout stability, and basic anonymous visitor counts to keep our rendering speeds optimized.</li>
                <li><strong>Google Analytics:</strong> Collects generalized, non-personally identifiable metrics (such as device types, general regions, and page pathways) to optimize search discovery.</li>
                <li><strong>Microsoft Clarity:</strong> Analyzes user sessions on our web portal via anonymized scroll patterns and heatmaps to refine our interactive documentation layout.</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                None of these web analytics platforms have access to your local SQLite sandbox database, financial transaction ledgers, 
                or iCloud sync keys. They operate strictly on the public-facing promotional website container.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
