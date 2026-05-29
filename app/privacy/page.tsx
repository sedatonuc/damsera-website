import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, ArrowLeft, Lock, EyeOff, ServerOff, Cpu } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Damsera",
  description: "Privacy Policy for Damsera. Discover our privacy-first architecture, local SQLite sandbox encryption, secure iCloud CloudKit sync, and zero-telemetry design.",
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
              Last Updated: May 30, 2026
            </p>
            <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
              Damsera (&ldquo;Damsera&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how the Damsera application, our website, and related services handle information.
            </p>
            <p className="mt-4 text-lg leading-8 text-[#5f6b73]">
              Damsera is designed with a privacy-first architecture. Your financial records belong to you and remain under your control. The Damsera application operates primarily through local storage on your Apple devices and does not maintain a centralized database containing users&apos; financial information.
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
            
            {/* Section 1: Scope of This Privacy Policy */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">1. Scope of This Privacy Policy</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                This Privacy Policy applies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>The Damsera mobile and desktop applications.</li>
                <li>The Damsera website.</li>
                <li>Customer support communications.</li>
                <li>Related services provided by Damsera.</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                This Privacy Policy does not apply to third-party services operated by Apple or other providers whose services may be integrated into the application.
              </p>
            </div>

            {/* Section 2: Information We Do Not Collect */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">2. Information We Do Not Collect</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                The Damsera application does not collect, transmit, store, analyze, sell, rent, or share your financial records on Damsera-operated servers.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                This includes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white rounded-3xl border border-black/5 p-6 text-sm text-[#5f6b73]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Transaction records</li>
                  <li>Budgets</li>
                  <li>Financial reports</li>
                  <li>Categories and tags</li>
                  <li>Account balances</li>
                </ul>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Subscription records</li>
                  <li>Debt and loan records</li>
                  <li>Financial goals</li>
                  <li>Cash flow information</li>
                  <li>Calendar entries created within the application</li>
                </ul>
              </div>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera does not operate servers that receive or store this financial information.
              </p>
            </div>

            {/* Section 3: Local Data Storage */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">3. Local Data Storage</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Financial data entered into Damsera is stored locally on your device using Apple&apos;s application sandbox environment.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Your data is isolated from other applications through Apple&apos;s operating system security mechanisms.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Storage technologies may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Core Data</li>
                <li>SQLite databases</li>
                <li>Apple Keychain (where applicable)</li>
                <li>Apple Data Protection technologies</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                The exact security protections applied to your device depend on your device settings, operating system version, passcode configuration, and Apple&apos;s security architecture.
              </p>
            </div>

            {/* Section 4: iCloud Synchronization */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">4. iCloud Synchronization</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera may offer optional synchronization through Apple CloudKit.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                If you enable synchronization:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Data is transmitted directly between your device and Apple&apos;s iCloud infrastructure.</li>
                <li>Damsera does not operate intermediary synchronization servers.</li>
                <li>Damsera does not have access to your private iCloud data.</li>
                <li>Synchronization can be disabled at any time through application settings or Apple account settings.</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Data synchronized through CloudKit is protected using Apple&apos;s security infrastructure and encryption technologies. The level of protection depends on your Apple account configuration and iCloud security settings.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                For additional information regarding Apple&apos;s handling of iCloud data, please refer to Apple&apos;s privacy documentation.
              </p>
            </div>

            {/* Section 5: Authentication and Security Features */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">5. Authentication and Security Features</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera may provide optional security features such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Face ID</li>
                <li>Touch ID</li>
                <li>Application passcodes</li>
                <li>Device-level authentication</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Biometric information is processed exclusively by Apple through secure operating system APIs.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera does not receive, store, process, or access biometric data.
              </p>
            </div>

            {/* Section 6: Information We May Receive */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">6. Information We May Receive</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                In limited situations, we may receive information that you voluntarily provide.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Examples include:
              </p>
              <div className="bg-white rounded-3xl border border-black/5 p-6 space-y-3">
                <h3 className="text-lg font-semibold tracking-tight text-[#1f2428]">Customer Support Requests</h3>
                <p className="text-sm text-[#5f6b73]">When contacting support, we may receive:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-[#5f6b73]">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Device information you choose to provide</li>
                  <li>Diagnostic information you choose to provide</li>
                  <li>Support request details</li>
                </ul>
              </div>
              <p className="text-base leading-8 text-[#5f6b73]">
                This information is used solely to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Respond to support requests</li>
                <li>Diagnose technical issues</li>
                <li>Improve service quality</li>
                <li>Fulfill legal obligations</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                We do not use support communications for advertising purposes.
              </p>
            </div>

            {/* Section 7: Crash Reports and Diagnostics */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">7. Crash Reports and Diagnostics</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera does not include third-party crash reporting platforms such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Firebase Crashlytics</li>
                <li>Sentry</li>
                <li>Bugsnag</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Diagnostic information generated by your device generally remains within Apple&apos;s ecosystem unless you voluntarily provide it to us.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                If you voluntarily submit diagnostic logs for troubleshooting purposes, such information will be used solely for resolving the reported issue.
              </p>
            </div>

            {/* Section 8: In-App Purchases and Subscriptions */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">8. In-App Purchases and Subscriptions</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Premium subscriptions and purchases are processed exclusively through Apple&apos;s StoreKit framework and Apple App Store infrastructure.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera does not receive or store:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Credit card numbers</li>
                <li>Debit card numbers</li>
                <li>Security codes (CVV)</li>
                <li>Apple ID passwords</li>
                <li>Bank account credentials</li>
                <li>Payment card expiration dates</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Payment processing is performed by Apple according to Apple&apos;s own privacy and security policies.
              </p>
            </div>

            {/* Section 9: Website Analytics */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">9. Website Analytics</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                While the Damsera application itself does not collect financial records or usage analytics, our public website may use limited analytics and performance monitoring tools.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                These services may collect information such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Country or region</li>
                <li>Referring pages</li>
                <li>Page visits</li>
                <li>Website performance metrics</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Services may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Vercel Analytics</li>
                <li>Vercel Speed Insights</li>
                <li>Google Analytics</li>
                <li>Microsoft Clarity</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                These services are used exclusively to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Improve website performance</li>
                <li>Understand website usage trends</li>
                <li>Improve documentation and content quality</li>
                <li>Monitor website reliability</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                These services do not have access to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Your financial records</li>
                <li>Your local database</li>
                <li>Your iCloud data</li>
                <li>Your account balances</li>
                <li>Your transactions</li>
              </ul>
            </div>

            {/* Section 10: Cookies */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">10. Cookies</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Our website may use cookies and similar technologies provided by analytics and infrastructure providers.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Cookies may be used to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Remember preferences</li>
                <li>Measure website traffic</li>
                <li>Analyze website performance</li>
                <li>Improve user experience</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Where required by applicable law, cookie consent mechanisms may be presented before non-essential cookies are activated.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                You may control cookies through your browser settings.
              </p>
            </div>

            {/* Section 11: Data Sharing */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">11. Data Sharing</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                We do not sell personal information.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                We do not rent personal information.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                We do not share financial records with advertisers, brokers, data marketplaces, or marketing companies.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Information may only be disclosed when:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Required by law</li>
                <li>Required by court order</li>
                <li>Necessary to protect legal rights</li>
                <li>Necessary to investigate fraud or abuse</li>
                <li>Necessary to comply with regulatory obligations</li>
              </ul>
            </div>

            {/* Section 12: International Users */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">12. International Users</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera may be accessed from countries outside the jurisdiction in which it is operated.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Where personal information is processed, we take reasonable measures to ensure compliance with applicable privacy laws, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>GDPR</li>
                <li>UK GDPR</li>
                <li>CCPA</li>
                <li>CPRA</li>
                <li>Other applicable privacy regulations</li>
              </ul>
            </div>

            {/* Section 13: Children's Privacy */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">13. Children&apos;s Privacy</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Damsera is not directed toward children under the age of 13.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                We do not knowingly collect personal information from children.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                If you believe a child has provided personal information through our services, please contact us so that appropriate action can be taken.
              </p>
            </div>

            {/* Section 14: Data Retention */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">14. Data Retention</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Because financial records remain stored locally on your device or within your personal Apple iCloud account, Damsera generally does not retain such records on company-operated servers.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Support communications and voluntarily submitted information may be retained only for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Resolve support issues</li>
                <li>Fulfill legal obligations</li>
                <li>Protect legal rights</li>
                <li>Maintain operational records</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Afterward, such information may be deleted or anonymized.
              </p>
            </div>

            {/* Section 15: Data Deletion */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">15. Data Deletion</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                You remain in control of your financial information.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                You may delete your locally stored data by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Removing records within the application</li>
                <li>Deleting the application from your device</li>
                <li>Managing synchronized data through your Apple iCloud settings</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Because Damsera does not maintain centralized databases containing your financial records, most financial information remains under your direct control.
              </p>
            </div>

            {/* Section 16: Your Privacy Rights */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">16. Your Privacy Rights</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Depending on your jurisdiction, you may have rights including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Access</li>
                <li>Correction</li>
                <li>Deletion</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Requests may be submitted using the contact information below.
              </p>
            </div>

            {/* Section 17: Changes to This Privacy Policy */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">17. Changes to This Privacy Policy</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                If material changes are made, the updated version will be published on this page with a revised &ldquo;Last Updated&rdquo; date.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Continued use of Damsera after changes become effective constitutes acceptance of the updated Privacy Policy.
              </p>
            </div>

            {/* Section 18: Contact Information */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">18. Contact Information</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                For privacy-related inquiries, support requests, legal notices, or questions regarding this Privacy Policy, please contact:
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
                We will make reasonable efforts to respond to privacy-related inquiries in a timely manner.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
