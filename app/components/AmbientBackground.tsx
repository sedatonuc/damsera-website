export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f5f6f7]">
      <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#dfe7f3]/70 blur-3xl" />
      <div className="absolute right-[-12rem] top-[18rem] h-[34rem] w-[34rem] rounded-full bg-[#e7e2d8]/70 blur-3xl" />
      <div className="absolute bottom-[-16rem] left-[-12rem] h-[38rem] w-[38rem] rounded-full bg-[#d8e2dc]/60 blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.65),rgba(245,246,247,0.92)_45%,rgba(245,246,247,1))]" />

      <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#111827_1px,transparent_1px)] [background-size:18px_18px]" />
    </div>
  );
}