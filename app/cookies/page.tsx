import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Cookie, ArrowLeft, ShieldCheck, Info, Check, EyeOff } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | Damsera",
  description: "Cookie Policy for Damsera. Discover how our website utilizes performance analytics, speed monitoring, and privacy-preserving cookies.",
};

export default function CookiePolicyPage() {
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
              <Cookie className="h-3.5 w-3.5 text-[#1f2428]" />
              Web Technologies
            </span>

            <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Cookie Policy
            </h1>
            <p className="mt-5 text-sm text-[#697077] font-bold">
              Last Updated: May 30, 2026
            </p>
            <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
              This Cookie Policy explains how Damsera (&ldquo;Damsera&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) uses cookies and similar technologies on our website.
            </p>
            <p className="mt-4 text-base leading-7 text-[#5f6b73]">
              This Cookie Policy applies solely to the Damsera website and related web services. The Damsera mobile and desktop applications do not use browser cookies.
            </p>
            <p className="mt-4 text-base leading-7 text-[#5f6b73]">
              By continuing to use our website, you acknowledge the use of cookies and similar technologies as described in this Policy, subject to your preferences and applicable legal requirements.
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
              <Cookie className="h-5 w-5 text-[#1f2428] mb-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">Essential Use</h4>
              <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                We use limited cookies strictly to remember visitor preferences, ensure rendering security, and optimize load balancing.
              </p>
            </div>

            <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-emerald-600 mb-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">Privacy Safeguard</h4>
              <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                No cookies have access to your personal finance database, budgets, balances, or iCloud synchronization keys.
              </p>
            </div>

            <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
              <EyeOff className="h-5 w-5 text-neutral-500 mb-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">Zero App Tracking</h4>
              <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                Our mobile and desktop apps are completely offline-first and contain zero browser tracking or cookie storage technologies.
              </p>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="mt-14 space-y-12 text-[#1f2428]">
            
            {/* Section 1: What Are Cookies? */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">1. What Are Cookies?</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Cookies are small text files stored on your device when you visit a website.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Cookies help websites function properly, remember preferences, measure performance, and improve user experience.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                In addition to cookies, we may use similar technologies such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Local Storage</li>
                <li>Session Storage</li>
                <li>Analytics Tags</li>
                <li>Pixels</li>
                <li>Performance Monitoring Technologies</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                For simplicity, all such technologies are referred to as &ldquo;Cookies&rdquo; throughout this Policy.
              </p>
            </div>

            {/* Section 2: How We Use Cookies */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">2. How We Use Cookies</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>Ensure website functionality.</li>
                <li>Improve website performance.</li>
                <li>Understand website traffic patterns.</li>
                <li>Analyze visitor interactions.</li>
                <li>Maintain website security.</li>
                <li>Optimize content and user experience.</li>
                <li>Monitor technical issues and page performance.</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73] font-semibold">
                We do not use cookies to access or monitor financial records stored within the Damsera application.
              </p>
            </div>

            {/* Section 3: Categories of Cookies We Use */}
            <div className="space-y-6 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">3. Categories of Cookies We Use</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">Essential Cookies</h3>
                <p className="text-base leading-8 text-[#5f6b73]">
                  These cookies are necessary for the operation and security of the website.
                </p>
                <p className="text-base leading-8 text-[#5f6b73]">
                  Examples may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                  <li>Session management</li>
                  <li>Security protections</li>
                  <li>Load balancing</li>
                  <li>Website functionality</li>
                  <li>Preference storage</li>
                </ul>
                <p className="text-base leading-8 text-[#5f6b73]">
                  Disabling these cookies may impact website functionality.
                </p>
              </div>

              <div className="space-y-4 border-t border-[#e4e7ea]/50 pt-6">
                <h3 className="text-xl font-bold tracking-tight">Analytics and Performance Cookies</h3>
                <p className="text-base leading-8 text-[#5f6b73]">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <p className="text-base leading-8 text-[#5f6b73]">
                  Information collected may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                  <li>Page visits</li>
                  <li>Navigation paths</li>
                  <li>Device type</li>
                  <li>Browser type</li>
                  <li>Operating system</li>
                  <li>Country or region</li>
                  <li>Traffic sources</li>
                  <li>Performance metrics</li>
                  <li>Loading times</li>
                </ul>
                <p className="text-base leading-8 text-[#5f6b73]">
                  Analytics information is generally aggregated and used to improve our website and documentation.
                </p>
              </div>

              <div className="space-y-4 border-t border-[#e4e7ea]/50 pt-6">
                <h3 className="text-xl font-bold tracking-tight">Functional Cookies</h3>
                <p className="text-base leading-8 text-[#5f6b73]">
                  Functional cookies help remember user preferences and improve convenience during future visits.
                </p>
                <p className="text-base leading-8 text-[#5f6b73]">
                  Examples may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                  <li>Language preferences</li>
                  <li>Theme preferences</li>
                  <li>Cookie consent choices</li>
                  <li>Interface settings</li>
                </ul>
              </div>
            </div>

            {/* Section 4: Analytics Providers */}
            <div className="space-y-6 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">4. Analytics Providers</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                We may use trusted third-party providers to help us understand website performance and visitor behavior.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                These providers may include:
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-black/5 bg-white p-6 space-y-2">
                  <h4 className="text-sm font-bold text-[#1f2428]">Vercel Analytics</h4>
                  <p className="text-xs leading-5 text-[#5f6b73]">
                    Used to understand website traffic, visitor counts, and overall website performance metrics.
                  </p>
                </div>

                <div className="rounded-3xl border border-black/5 bg-white p-6 space-y-2">
                  <h4 className="text-sm font-bold text-[#1f2428]">Vercel Speed Insights</h4>
                  <p className="text-xs leading-5 text-[#5f6b73]">
                    Used to monitor page loading speed, responsiveness, and Core Web Vitals parameters.
                  </p>
                </div>

                <div className="rounded-3xl border border-black/5 bg-white p-6 space-y-2">
                  <h4 className="text-sm font-bold text-[#1f2428]">Google Analytics</h4>
                  <p className="text-xs leading-5 text-[#5f6b73]">
                    Used to understand website usage patterns, audience demographics, geographic regions, and content layout performance. Google may process information according to its own privacy rules.
                  </p>
                </div>

                <div className="rounded-3xl border border-black/5 bg-white p-6 space-y-2">
                  <h4 className="text-sm font-bold text-[#1f2428]">Microsoft Clarity</h4>
                  <p className="text-xs leading-5 text-[#5f6b73]">
                    Used to inspect anonymous user interactions, scroll behaviors, clicks, and general usability patterns. Microsoft may process information according to its own privacy rules.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5: Information Collected Through Cookies */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">5. Information Collected Through Cookies</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Depending on your settings and browser configuration, cookies may collect information such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Screen resolution</li>
                <li>Referring URLs</li>
                <li>Website interactions</li>
                <li>Session duration</li>
                <li>General geographic region</li>
                <li>Performance metrics</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73] font-semibold">
                We do not use cookies to collect:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white rounded-3xl border border-black/5 p-6 text-sm text-[#5f6b73]">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Financial records</li>
                  <li>Transaction histories</li>
                  <li>Budget information</li>
                  <li>Account balances</li>
                </ul>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Debt records</li>
                  <li>Subscription records</li>
                  <li>Financial reports</li>
                  <li>Data stored within the Damsera application</li>
                </ul>
              </div>
            </div>

            {/* Section 6: Managing Cookie Preferences */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">6. Managing Cookie Preferences</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                You can manage or disable cookies through your browser settings.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>View stored cookies</li>
                <li>Delete cookies</li>
                <li>Block cookies</li>
                <li>Restrict third-party cookies</li>
                <li>Configure cookie permissions</li>
              </ul>
              <p className="text-base leading-8 text-[#5f6b73]">
                Please note that disabling certain cookies may affect website functionality and performance.
              </p>
            </div>

            {/* Section 7: Consent */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">7. Consent</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Where required by applicable laws, including GDPR and the ePrivacy Directive, we will request your consent before placing non-essential cookies on your device.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                You may withdraw or modify your consent preferences at any time through available website controls or browser settings.
              </p>
            </div>

            {/* Section 8: International Users */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">8. International Users</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Our website may be accessed from multiple countries and jurisdictions.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Where required, we take reasonable measures to comply with applicable privacy and cookie regulations, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-[#5f6b73]">
                <li>GDPR</li>
                <li>UK GDPR</li>
                <li>ePrivacy Directive</li>
                <li>CCPA</li>
                <li>CPRA</li>
                <li>Other applicable privacy laws</li>
              </ul>
            </div>

            {/* Section 9: Third-Party Websites */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">9. Third-Party Websites</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                Our website may contain links to third-party websites and services.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                We are not responsible for the cookie practices, privacy policies, or content of third-party websites.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                We encourage users to review the privacy and cookie policies of any external services they visit.
              </p>
            </div>

            {/* Section 10: Changes to This Cookie Policy */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">10. Changes to This Cookie Policy</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                We may update this Cookie Policy periodically to reflect legal, technical, or operational changes.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Updated versions will be published on this page with a revised &ldquo;Last Updated&rdquo; date.
              </p>
              <p className="text-base leading-8 text-[#5f6b73]">
                Continued use of the website after changes become effective constitutes acceptance of the updated Policy.
              </p>
            </div>

            {/* Section 11: Contact Us */}
            <div className="space-y-4 border-t border-[#e4e7ea] pt-8">
              <h2 className="text-2xl font-semibold tracking-tight">11. Contact Us</h2>
              <p className="text-base leading-8 text-[#5f6b73]">
                If you have questions regarding this Cookie Policy or our use of cookies and similar technologies, please contact:
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
