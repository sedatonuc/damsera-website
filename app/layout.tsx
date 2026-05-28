import type { Metadata } from "next";
import "./globals.css";
import RedirectHandler from "./components/RedirectHandler";

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
    url: "https://www.damseraapp.com",
    images: [
      {
        url: "https://www.damseraapp.com/icon.png",
        width: 512,
        height: 512,
        alt: "Damsera Premium Personal Finance Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Damsera | Premium Personal Finance App",
    description:
      "Manage your entire financial life across iPhone and Mac.",
    images: ["https://www.damseraapp.com/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <RedirectHandler />
        {children}
      </body>
    </html>
  );
}