import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Database, ArrowLeft, Download, Trash2, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Data Rights | Damsera",
  description: "Exhaustive Data Rights framework for Damsera. Discover our step-by-step self-custody portability guides, absolute erasure procedures, and GDPR compliance maps.",
};

export default function DataRightsPage() {
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
              <Database className="h-3.5 w-3.5 text-[#1f2428]" />
              Data Sovereignty
            </span>

            <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Your Data Rights
            </h1>
            <p className="mt-5 text-sm text-[#697077] font-bold">
              Last Updated: May 26, 2026 • Version 1.1.0 • GDPR & CCPA Compliance
            </p>
            <p className="mt-6 text-lg leading-8 text-[#5f6b73]">
              Damsera operates on a local-first philosophy. Since we never hold or collect your private financial records, 
              your data rights are hardcoded parameters of our application architecture. Below is an exhaustive overview 
              of your rights and self-custodial control guides.
            </p>
          </div>

          {/* Core Rights Catalog */}
          <div className="mt-12 space-y-8 text-[#1f2428]">
            <h2 className="text-2xl font-semibold tracking-tight">Your Data Rights under Global Frameworks (GDPR & CCPA)</h2>
            <p className="text-base leading-8 text-[#5f6b73]">
              Even though Damsera has no backend databases to harvest your profiles, we empower you to fully exercise your 
              rights under the GDPR, CCPA, and CPRA through localized client-side mechanics:
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">1. Right to Access & Know</h4>
                <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                  You have immediate, zero-latency access to your complete financial registries 24/7 on your local device. 
                  No internet connection is required to display your transactions history.
                </p>
              </div>

              <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">2. Right to Correction</h4>
                <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                  You retain absolute power to adjust or correct any ledger entries, budget limits, or metadata fields. 
                  All updates are processed instantly inside your local database.
                </p>
              </div>

              <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">3. Right to Portability</h4>
                <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                  You have the right to export your financial data at any time. Our app includes easy self-service CSV and SQLite database export options.
                </p>
              </div>

              <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1f2428]">4. Right to Deletion (Erasure)</h4>
                <p className="mt-2 text-xs leading-5 text-[#5f6b73]">
                  You have the right to request deletion of your database. Since we do not store it, you can delete it directly and completely yourself.
                </p>
              </div>
            </div>
          </div>

          {/* Action Guides Section */}
          <div className="mt-14 space-y-8 border-t border-[#e4e7ea] pt-8">
            <h2 className="text-2xl font-semibold tracking-tight">Step-by-Step Data Control & Erasure Guides</h2>
            <p className="text-base leading-8 text-[#5f6b73]">
              To help you maintain absolute control over your financial records, below are step-by-step instructions on how to manage, 
              port, and erase your data inside Damsera:
            </p>

            <div className="space-y-6">
              {/* Guide 1 */}
              <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-xs font-bold text-[#1f2428]">1</span>
                  <h3 className="text-base font-bold text-[#1f2428]">How to Export Database & CSV Backups</h3>
                </div>
                <p className="text-xs leading-5 text-[#5f6b73] pl-10">
                  To export your transaction logs or generate a full backup file:
                </p>
                <ol className="list-decimal pl-16 text-xs space-y-2 text-[#5f6b73]">
                  <li>Navigate to the <strong>System Module</strong> (Control Center) tab on the sidebar.</li>
                  <li>Click <strong>Backup &amp; Export Tools</strong>.</li>
                  <li>Choose <strong>Export CSV</strong> (for spreadsheet software like Excel or Numbers) or <strong>Export SQLite Database</strong> (for the raw encrypted database file).</li>
                  <li>Use the native Apple Share Sheet to save the file securely to your local Desktop, iCloud Drive, or external storage keys.</li>
                </ol>
              </div>

              {/* Guide 2 */}
              <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-xs font-bold text-red-600">2</span>
                  <h3 className="text-base font-bold text-[#1f2428]">How to Perform Absolute Data Deletion</h3>
                </div>
                <p className="text-xs leading-5 text-[#5f6b73] pl-10">
                  Because your data is self-custodied locally on your device and iCloud container, you do not need to contact us to delete your data. 
                  You can purge all records instantly using these steps:
                </p>
                <ol className="list-decimal pl-16 text-xs space-y-2 text-[#5f6b73]">
                  <li><strong>Device-Level Purge:</strong> On your iPhone or Mac, delete the Damsera application. This instantly deletes the local database container and all transaction caches.</li>
                  <li><strong>iCloud Purge (if iCloud sync was active):</strong> Go to your <strong>Apple Device Settings</strong> &gt; Tap <strong>Your Name / Apple ID</strong> &gt; <strong>iCloud</strong> &gt; <strong>Manage Account Storage</strong>. Select <strong>Damsera</strong> and click <strong>Delete Documents &amp; Data</strong> to completely wipe all encrypted CloudKit backups from Apple's servers.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Compliance & Contact */}
          <div className="mt-14 space-y-4 border-t border-[#e4e7ea] pt-8 text-[#1f2428]">
            <h2 className="text-2xl font-semibold tracking-tight">Need Assistance?</h2>
            <p className="text-base leading-8 text-[#5f6b73]">
              Since we have zero access to your database records, we cannot execute backups or erasures on your behalf. However, 
              if you need technical guidance on managing your iCloud CloudKit containers, exporting CSV transcripts, or have questions 
              about our privacy engineering benchmarks, contact our team at **datarights@damsera.com**.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
