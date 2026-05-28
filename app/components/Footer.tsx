import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e4e7ea] bg-white px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Damsera Logo" width={34} height={34} />

          <div>
            <p className="font-semibold tracking-tight text-[#1f2428]">
              Damsera
            </p>
            <p className="text-sm text-[#697077]">
              Premium personal finance for Apple users.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 text-sm font-medium text-[#697077]">
          <a href="/overview" className="transition hover:text-[#1f2428]">
            Overview
          </a>
          <a href="/#features" className="transition hover:text-[#1f2428]">
            Features
          </a>
          <a href="/#modules" className="transition hover:text-[#1f2428]">
            Modules
          </a>
          <a href="/#security" className="transition hover:text-[#1f2428]">
            Security
          </a>
          <a href="/#pricing" className="transition hover:text-[#1f2428]">
            Pricing
          </a>
          <a href="/#faq" className="transition hover:text-[#1f2428]">
            FAQ
          </a>
          <a href="/#contact" className="transition hover:text-[#1f2428]">
            Contact
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-[#9099a1]">
        <div>© 2026 Damsera. All rights reserved.</div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy" className="transition hover:text-[#1f2428]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-[#1f2428]">
            Terms of Service
          </Link>
          <Link href="/data-rights" className="transition hover:text-[#1f2428]">
            Data Rights
          </Link>
        </div>
      </div>
    </footer>
  );
}