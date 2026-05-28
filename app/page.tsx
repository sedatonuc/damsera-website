"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Lazy-loaded components below the fold to boost initial mobile FCP and LCP metrics
const TrustBar = dynamic(() => import("./components/TrustBar"), { ssr: false });
const Features = dynamic(() => import("./components/Features"), { ssr: false });
const Modules = dynamic(() => import("./components/Modules"), { ssr: false });
const Security = dynamic(() => import("./components/Security"), { ssr: false });
const Pricing = dynamic(() => import("./components/Pricing"), { ssr: false });
const FullFeatureList = dynamic(() => import("./components/FullFeatureList"), { ssr: false });
const FAQ = dynamic(() => import("./components/FAQ"), { ssr: false });
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });

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
    <main className="relative min-h-screen overflow-hidden bg-[#f5f6f7] text-[#1f2428]">
      <AmbientBackground />

      <Navbar />

      <Hero />

      <TrustBar />

      <Features />
      
      <Modules />

      <Security />

      <Pricing />
      
      <FullFeatureList />

      <FAQ />

      <Footer />
    </main>
  );
}