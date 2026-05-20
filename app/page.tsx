"use client";

import { useEffect } from "react";

import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import IntroLoader from "./components/IntroLoader";
import Modules from "./components/Modules";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Security from "./components/Security";

export default function Home() {
  useEffect(() => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
}, []);

  return (
    <main className="min-h-screen bg-[#f5f6f7] text-[#1f2428]">
      <IntroLoader />
      <Navbar />
      <Hero />
      <Features />
      <Modules />
      <Security />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}