import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-6 py-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur-xl">
        <a href="#" className="flex items-center gap-3">
          <Logo className="h-7 w-7 text-[#1f2428]" />

          <span className="text-sm font-semibold tracking-tight text-[#1f2428]">
            Damsera
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#697077] md:flex">
          <a href="#features" className="transition hover:text-[#1f2428]">
            Features
          </a>

          <a href="#modules" className="transition hover:text-[#1f2428]">
            Modules
          </a>

          <a href="#security" className="transition hover:text-[#1f2428]">
            Security
          </a>

          <a href="#pricing" className="transition hover:text-[#1f2428]">
            Pricing
          </a>
        </div>

        <a
          href="#"
          className="rounded-full bg-[#1f2428] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
        >
          Coming Soon
        </a>
      </nav>
    </header>
  );
}