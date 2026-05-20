export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M45 38H105C158 38 190 70 190 114C190 158 158 190 105 190H42L80 152H105C133 152 151 137 151 114C151 91 133 76 105 76H80L45 38Z"
      />
    </svg>
  );
}