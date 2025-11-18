export function CompletionBadge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-label="All Exercises Completed"
    >
      {/* Crab body (shell) */}
      <ellipse
        cx="12"
        cy="11"
        rx="7"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Left claw arm */}
      <path
        d="M5 11 L2 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Left claw */}
      <circle
        cx="1.5"
        cy="8.5"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Right claw arm */}
      <path
        d="M19 11 L22 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right claw */}
      <circle
        cx="22.5"
        cy="8.5"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Left legs */}
      <path
        d="M7 14 L5 17 M8 14.5 L6.5 17.5 M9 15 L8 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      
      {/* Right legs */}
      <path
        d="M17 14 L19 17 M16 14.5 L17.5 17.5 M15 15 L16 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      
      {/* Eyes */}
      <circle cx="10" cy="9" r="0.8" fill="currentColor" />
      <circle cx="14" cy="9" r="0.8" fill="currentColor" />
    </svg>
  );
}