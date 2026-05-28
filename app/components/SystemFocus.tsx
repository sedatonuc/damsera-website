"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  FileText,
  ChevronDown,
  Download,
  Filter,
  Check,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
  Clock,
  ShieldCheck,
  Search,
  ShieldAlert,
  Monitor,
  Smartphone,
  Key,
  Settings,
  RefreshCw,
  Database
} from "lucide-react";

export default function SystemFocus() {
  // Config States
  const [baseCurrency, setBaseCurrency] = useState("USD ($)");
  const [appTheme, setAppTheme] = useState("Apple Dark");
  const [defaultView, setDefaultView] = useState("Dashboard");
  const [backupFreq, setBackupFreq] = useState("Weekly");
  const [passcodeEnabled, setPasscodeEnabled] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  // Diagnostic Utility States
  const [diagnosticState, setDiagnosticState] = useState<"idle" | "running" | "completed">("idle");
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);

  // Backup Stepper States
  const [backupState, setBackupState] = useState<"idle" | "loading" | "completed">("idle");
  const [backupProgress, setBackupProgress] = useState(0);

  // Modal Control
  const [showResetModal, setShowResetModal] = useState(false);

  // Notification Toast
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "danger" | "info";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "danger" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Run Health Diagnostics
  const handleRunDiagnostics = () => {
    setDiagnosticState("running");
    setDiagnosticProgress(0);
    setDiagnosticLogs([]);

    const logSteps = [
      { text: "Evaluating directory schemas and sandbox boundaries...", delay: 600, progress: 20 },
      { text: "Auditing local cache transaction checksum registries...", delay: 1200, progress: 45 },
      { text: "Verifying cross-module budget and category indices...", delay: 1800, progress: 70 },
      { text: "Running security transport port sweeps...", delay: 2400, progress: 90 },
      { text: "System Healthy: 0 errors detected. 100% responsive.", delay: 3000, progress: 100 }
    ];

    logSteps.forEach((step, idx) => {
      setTimeout(() => {
        setDiagnosticProgress(step.progress);
        setDiagnosticLogs((prev) => [...prev, step.text]);
        if (idx === logSteps.length - 1) {
          setDiagnosticState("completed");
          showNotification("Diagnostics check complete. All nodes verified!", "success");
        }
      }, step.delay);
    });
  };

  // Run Backup Simulation
  const handleInitiateBackup = () => {
    setBackupState("loading");
    setBackupProgress(0);

    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBackupState("completed");
          showNotification("iCloud backup compiled and downloaded successfully!", "success");
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  // Run Reset App Data
  const handleResetData = () => {
    setShowResetModal(false);
    showNotification("Simulated application database flushed and re-initialized.", "danger");
  };

  // Re-save config preference
  const handleSavePreferences = () => {
    showNotification("Preferences saved. Configuration compiled.", "info");
  };

  return (
    <section
      id="system-focus"
      className="relative overflow-hidden bg-[#f5f6f7] px-6 pt-16 pb-28 text-[#1f2428]"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute left-1/4 top-16 h-[34rem] w-[34rem] rounded-full bg-white/90 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[#dfe3e6]/70 blur-3xl" />

      {/* Floating Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 scale-100 ${
          notification.type === "success"
            ? "bg-emerald-500/90 border-emerald-400 text-white"
            : notification.type === "danger"
              ? "bg-red-500/90 border-red-400 text-white"
              : "bg-indigo-500/90 border-indigo-400 text-white"
        }`}>
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">{notification.message}</p>
        </div>
      )}

      <div className="relative mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d7dce0] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#697077] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#1f2428]" />
            Module Focus
          </span>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Control Center: System Settings
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5f6b73]">
            Damsera's system center allows users to configure underlying application rules.
            Optimize financial base parameters, customize default visual interfaces, sweeep system diagnostics,
            and secure offline databases from one cohesive Apple-native settings deck.
          </p>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="mt-16 overflow-hidden rounded-[42px] border border-[#e1e5e8] bg-white p-5 shadow-[0_40px_120px_rgba(31,36,40,0.12)]  sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar Controls & Parameters */}
            <div className="flex flex-col justify-between rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-5">
              <div className="space-y-6">
                <div>
                  <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-neutral-400">Settings Deck</span>
                  </div>

                  {/* Reset Trigger */}
                  <button
                    onClick={() => setShowResetModal(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-red-700 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset App Data
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Visual Theme</label>
                  <select
                    value={appTheme}
                    onChange={(e) => { setAppTheme(e.target.value); showNotification(`Theme updated to ${e.target.value}`, "info"); }}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2.5 text-xs text-[#1f2428] outline-none shadow-sm cursor-pointer"
                  >
                    <option value="Apple Dark">Apple Dark Mode</option>
                    <option value="Apple Light">Apple Light Mode</option>
                    <option value="Space Gray">Space Gray Classic</option>
                  </select>
                </div>

                {/* Backup Frequency */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Backup Intervals</label>
                  <div className="grid grid-cols-3 gap-1 rounded-2xl border border-[#e1e5e8] bg-white p-1">
                    {[
                      { key: "Daily", label: "Daily" },
                      { key: "Weekly", label: "Weekly" },
                      { key: "Monthly", label: "Monthly" }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => { setBackupFreq(item.key); showNotification(`Backup frequency scheduled: ${item.key}`, "info"); }}
                        className={`rounded-xl py-1.5 text-[9px] font-bold uppercase tracking-wider transition ${
                          backupFreq === item.key
                            ? "bg-[#1f2428] text-white shadow-sm"
                            : "text-[#697077] hover:bg-[#f1f3f5]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Base Currency Select */}
                <div className="space-y-1.5 pt-2 border-t border-[#e1e5e8]">
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b949b]">Base Finance Currency</label>
                  <select
                    value={baseCurrency}
                    onChange={(e) => { setBaseCurrency(e.target.value); showNotification(`Base currency updated to ${e.target.value}`, "info"); }}
                    className="w-full rounded-xl border border-[#e1e5e8] bg-white px-3 py-2 text-xs text-[#1f2428] outline-none shadow-sm focus:border-[#1f2428] cursor-pointer"
                  >
                    <option value="USD ($)">USD ($) United States</option>
                    <option value="EUR (€)">EUR (€) Eurozone</option>
                    <option value="GBP (£)">GBP (£) United Kingdom</option>
                    <option value="TRY (₺)">TRY (₺) Turkey</option>
                  </select>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="mt-8 pt-4 border-t border-[#e1e5e8] space-y-3">
                <button
                  onClick={handleSavePreferences}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/5 bg-[#1f2428] px-4 py-2.5 text-xs font-bold text-white shadow-md transition active:scale-98"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Cost calculators metrics widgets */}
                <div className="mb-6 grid gap-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Cache storage allocated",
                      val: "24.8 KB",
                      color: "text-[#1f2428] bg-[#f8f9fa] border-neutral-200",
                      icon: Database
                    },
                    {
                      label: "Diagnostics health score",
                      val: "100% Optimal",
                      color: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
                      icon: Activity
                    },
                    {
                      label: "Synchronized nodes",
                      val: "2 Nodes (iCloud)",
                      color: "text-indigo-700 bg-indigo-50/50 border-indigo-100",
                      icon: Layers
                    },
                    {
                      label: "Transport Encryption",
                      val: "AES-256 Bit",
                      color: "text-amber-700 bg-amber-50/50 border-amber-100",
                      icon: ShieldCheck
                    }
                  ].map((metric) => {
                    const MetricIcon = metric.icon;
                    return (
                      <div
                        key={metric.label}
                        className={`rounded-3xl border p-4 shadow-sm relative overflow-hidden transition-all duration-300 ${metric.color}`}
                      >
                        <p className="text-[9px] uppercase tracking-[0.15em] font-bold opacity-75">
                          {metric.label}
                        </p>
                        <p className="mt-2.5 text-lg font-black tracking-tight leading-none">
                          {metric.val}
                        </p>
                        <MetricIcon className="absolute right-3.5 bottom-3 h-5 w-5 opacity-15" />
                      </div>
                    );
                  })}
                </div>

                {/* Systems Preferences Grid & Toggles */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Preferences panel */}
                  <div className="rounded-3xl border border-[#e1e5e8] bg-white p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b] border-b border-neutral-50 pb-2">App Preferences</h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-400 block uppercase tracking-wider mb-1">Launch Focus View</label>
                        <select
                          value={defaultView}
                          onChange={(e) => { setDefaultView(e.target.value); showNotification(`Default module view updated: ${e.target.value}`, "info"); }}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#1f2428] cursor-pointer"
                        >
                          <option value="Dashboard">Dashboard Command Center</option>
                          <option value="Transactions">Transactions Ledger Directory</option>
                          <option value="Budgets">Budgets Capacity Tracker</option>
                          <option value="Cashflow">Cashflow sankey Visualizer</option>
                          <option value="Calendar">Calendar Timeline Planner</option>
                        </select>
                      </div>

                      <div className="pt-2 border-t border-neutral-50 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-[#1f2428] block">Passcode Lock protection</span>
                          <span className="text-[9.5px] text-neutral-400 italic">Require passcode on launching startup</span>
                        </div>
                        <button
                          onClick={() => { setPasscodeEnabled(!passcodeEnabled); showNotification(`Passcode lock ${!passcodeEnabled ? "enabled" : "disabled"}`, "info"); }}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none ${
                            passcodeEnabled ? "bg-[#1f2428]" : "bg-neutral-200"
                          }`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                            passcodeEnabled ? "translate-x-5" : "translate-x-0"
                          }`} />
                        </button>
                      </div>

                      <div className="pt-2 border-t border-neutral-50 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-[#1f2428] block">Local Database Encryption</span>
                          <span className="text-[9.5px] text-neutral-400 italic">Encrypt cache keys inside Apple Sandbox</span>
                        </div>
                        <button
                          onClick={() => { setEncryptionEnabled(!encryptionEnabled); showNotification(`Database encryption ${!encryptionEnabled ? "enabled" : "disabled"}`, "info"); }}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none ${
                            encryptionEnabled ? "bg-[#1f2428]" : "bg-neutral-200"
                          }`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                            encryptionEnabled ? "translate-x-5" : "translate-x-0"
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Systems Maintenance Check Diagnostics */}
                  <div className="rounded-3xl border border-[#e1e5e8] bg-white p-5 shadow-sm flex flex-col justify-between min-h-[250px]">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b] border-b border-neutral-50 pb-2 mb-3">Health & Maintenance</h3>
                      
                      {diagnosticState === "idle" && (
                        <div className="text-center py-6 text-neutral-400">
                          <Activity className="h-10 w-10 mx-auto opacity-30 animate-pulse mb-3" />
                          <p className="text-xs font-semibold">No active diagnostics running</p>
                          <p className="text-[10px] italic mt-1 leading-4 max-w-[200px] mx-auto">Sweep local directories and verify data checksum parameters.</p>
                        </div>
                      )}

                      {diagnosticState === "running" && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="uppercase text-neutral-400 tracking-wider">Sweeping Sandboxes...</span>
                            <span>{diagnosticProgress}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden relative border">
                            <div
                              className="h-full bg-indigo-600 transition-all duration-300"
                              style={{ width: `${diagnosticProgress}%` }}
                            />
                          </div>
                          <div className="rounded-xl border border-neutral-100 bg-[#f8f9fa] p-2 max-h-[80px] overflow-y-auto font-mono text-[9px] text-neutral-500 leading- relaxed">
                            {diagnosticLogs.map((log, idx) => (
                              <p key={idx} className="truncate">• {log}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {diagnosticState === "completed" && (
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-2.5 text-emerald-800 text-[10.5px]">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                            <span className="font-semibold">Diagnostics verified: System Healthy</span>
                          </div>
                          <div className="rounded-xl border border-neutral-100 bg-[#f8f9fa] p-2 max-h-[80px] overflow-y-auto font-mono text-[9px] text-neutral-500 leading- relaxed">
                            {diagnosticLogs.map((log, idx) => (
                              <p key={idx} className="truncate">• {log}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleRunDiagnostics}
                      disabled={diagnosticState === "running"}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-[#f8f9fa] px-4 py-2.5 text-xs font-bold text-[#1f2428] hover:bg-neutral-100 disabled:opacity-75 shadow-sm transition active:scale-98"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${diagnosticState === "running" ? "animate-spin" : ""}`} />
                      Execute Diagnostics Check
                    </button>
                  </div>
                </div>

                {/* Database backup visual segment */}
                <div className="mt-6 rounded-[32px] border border-[#e1e5e8] bg-[#f8f9fa] p-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#8b949b] mb-4">iCloud Secure Database Backup</h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="max-w-md">
                      <p className="text-xs leading-5 text-[#5f6b73]">
                        Compile application state registries (custom transaction lists, budgets, loans, and categories configurations) into a structured secure file format. Stored backups are encrypted with AES-256 keys.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {backupState === "loading" && (
                        <div className="w-40">
                          <div className="flex justify-between items-center text-[9px] font-bold text-[#1f2428] mb-1">
                            <span>COMPILING DATA...</span>
                            <span>{backupProgress}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden relative">
                            <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${backupProgress}%` }} />
                          </div>
                        </div>
                      )}

                      {backupState === "completed" && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full shadow-sm animate-pulse">
                          <Check className="h-4 w-4 shrink-0" />
                          Backup Generated
                        </span>
                      )}

                      <button
                        onClick={handleInitiateBackup}
                        disabled={backupState === "loading"}
                        className="flex items-center gap-1.5 rounded-2xl bg-[#1f2428] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#343a40] disabled:opacity-75 transition active:scale-98"
                      >
                        <Database className="h-4 w-4" />
                        Initiate iCloud Backup
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Assessment Insight */}
              <div className="mt-6 flex items-start gap-4 rounded-[32px] border border-[#e1e5e8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1f2428] text-white">
                  <Activity className="h-5 w-5" />
                </div>

                <div>
                  <span className="rounded-full bg-[#f1f3f5] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#697077]">
                    System Configuration Assessment
                  </span>

                  <p className="mt-3 text-xs leading-5 text-[#5f6b73]">
                    Currently tracking application settings under <span className="font-semibold text-neutral-800">{baseCurrency} base currency</span> and <span className="font-semibold text-neutral-800">{appTheme} preferences</span>. 
                    Your secure sandboxes allocate <span className="font-semibold text-neutral-800">24.8 KB</span> of local cache memory, sweeping database metrics automatically every week. 
                    All active transaction registries, credit portfolios, and budget limits are fully synchronized with 2 encrypted iCloud synch nodes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Confirmation warning modal */}
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-sm overflow-hidden rounded-[36px] border border-red-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-red-50 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <ShieldAlert className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-bold text-red-700">
                    Reset App Data Ledger?
                  </h3>
                </div>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs leading-5 text-[#5f6b73]">
                  Warning: You are preparing to flush the simulated frontend database. This operation will clear off all customized transactions, budgets limit segments, loan registers, and saving milestones you registered.
                </p>

                <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-2.5 text-red-700 text-[10.5px] leading-5 font-bold">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>This sweep cannot be undone once executed!</span>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="w-1/2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-xs font-bold text-neutral-500 hover:bg-neutral-50 hover:text-black transition active:scale-98"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetData}
                    className="w-1/2 rounded-2xl bg-red-600 px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-red-700 transition active:scale-95"
                  >
                    Reset Everything
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Grid Panel Block */}
        <FeatureGrid />

        {/* Applied Freedom Grid */}
        <div className="mt-24 rounded-[42px] border border-[#e1e5e8] bg-white/80 p-8 shadow-[0_30px_90px_rgba(31,36,40,0.08)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#697077]">
                Applied Freedom
              </p>
              <h3 className="text-3xl font-semibold tracking-[-0.04em]">
                What You Can Do in Practice
              </h3>
              <p className="mt-4 leading-7 text-[#5f6b73]">
                The System workspace turns complicated technical settings configurations into user-friendly checkboxes, helping you control default app scopes, diagnostics, and secure exports.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Toggle default base currency settings (USD, EUR, GBP, TRY formats)",
                "Switch Visual Themes matching Apple Dark, Apple Light, or Space Gray",
                "Configure startup default workspaces (Dashboard, Budgets, Ledger pages)",
                "Toggle security passcodes and local database transport encryption",
                "Execute active system diagnostics sweeps auditing storage schemas",
                "Initiate secure iCloud database backups exporting structured files",
                "Manage local cache allocations, diagnostics health, and synchronizations",
                "Reset simulated databases to clean default ledgers in one warning sweep"
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-start gap-4 rounded-2xl border border-[#e1e5e8] bg-[#f8f9fa] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-xs font-semibold leading-5 text-[#1f2428]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing summary footer */}
        <div className="mt-20 rounded-[38px] border border-[#e1e5e8] bg-[#1f2428] p-8 text-center text-white shadow-[0_35px_100px_rgba(31,36,40,0.2)] sm:p-12">
          <h4 className="text-lg font-bold">System Module in Summary</h4>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            System establishes absolute control. By unifying preference configurations, securing transport encryption lines, running regular diagnostic sweeps, and enabling secure database backup exports, Damsera helps you shape the app to your financial routine.
          </p>
        </div>
      </div>
    </section>
  );
}

// 9-Grid feature descriptors
function FeatureGrid() {
  const items = [
    {
      title: "1. Visual Themes selectors",
      desc: "Toggle between visual settings matching Apple Dark Mode, Apple Light Mode, or classic Space Gray Gray.",
      icon: Monitor
    },
    {
      title: "2. Startup Module views",
      desc: "Configure the launch workspace. Set default routing focus onto Dashboard, Transactions, or Budgets.",
      icon: Smartphone
    },
    {
      title: "3. Health diagnostics",
      desc: "Execute active diagnostics. Sweepers sweep sandbox directories, verify ledger checksums, and check for errors.",
      icon: Activity
    },
    {
      title: "4. Passcode startups",
      desc: "Secure daily ledgers. Require passcode verification checks on startup initialization parameters.",
      icon: Key
    },
    {
      title: "5. Transport Encriptings",
      desc: "Secure local database cache entries. Encryption uses AES-256 standard keys for secure sync profiles.",
      icon: ShieldCheck
    },
    {
      title: "6. iCloud Backup Exporters",
      desc: "Initiate secure database backups. Steppers compile files and trigger secure JSON downloads.",
      icon: Download
    },
    {
      title: "7. Clean state flusher",
      desc: "Reset application data. Double-confirm warning overlay alert triggers protect against accidental sweeps.",
      icon: RefreshCw
    },
    {
      title: "8. Base Currency Toggle",
      desc: "Toggle currencies. Sweeps adapt ledger metrics dynamically matching USD, EUR, GBP, or TRY parameters.",
      icon: DollarSign
    },
    {
      title: "9. Offline Continuity Security",
      desc: "Retain total local privacy. System preferences compile securely inside native sandboxes with zero tracking.",
      icon: Sparkles
    }
  ];

  return (
    <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-[32px] border border-[#e1e5e8] bg-white/80 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(31,36,40,0.1)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1f3f5] text-[#1f2428] transition duration-300 group-hover:bg-[#1f2428] group-hover:text-white">
              <Icon className="h-5 w-5" strokeWidth={2.2} />
            </div>

            <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1f2428]">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5f6b73]">
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
