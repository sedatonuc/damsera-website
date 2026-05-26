import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Damsera | Premium Personal Finance App",

  description:
    "Damsera is a premium personal finance app for iPhone and Mac. Manage transactions, budgets, accounts, credit cards, subscriptions, loans, reports and financial calendar planning.",

  keywords: [
    "Damsera",
    "personal finance app",
    "budget planner",
    "money management",
    "finance app for Mac",
    "finance app for iPhone",
    "budget app",
  ],

  authors: [{ name: "Damsera" }],

  openGraph: {
    title: "Damsera | Premium Personal Finance App",
    description:
      "Manage your entire financial life across iPhone and Mac.",
    type: "website",
    siteName: "Damsera",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}