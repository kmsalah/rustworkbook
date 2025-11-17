export function RustWorkbookLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 60" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rust Crab as > symbol */}
      <g transform="translate(10, 15)">
        {/* Crab body (in shape of >) */}
        <path 
          d="M 5 10 L 25 20 L 5 30 L 10 20 Z" 
          fill="currentColor" 
          opacity="0.9"
        />
        {/* Crab details */}
        <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        <circle cx="12" cy="22" r="1.5" fill="currentColor" />
        {/* Crab claws */}
        <path 
          d="M 8 12 Q 5 10, 3 11 M 8 28 Q 5 30, 3 29" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none"
          strokeLinecap="round"
        />
        {/* Crab legs */}
        <path 
          d="M 15 16 L 18 14 M 15 20 L 19 20 M 15 24 L 18 26" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round"
        />
      </g>
      
      {/* > symbol where crab would be */}
      <text 
        x="40" 
        y="38" 
        fontSize="32" 
        fontWeight="bold" 
        fill="currentColor"
        fontFamily="JetBrains Mono, monospace"
      >
        &gt;
      </text>
      
      {/* Book icon instead of underscore */}
      <g transform="translate(65, 20)">
        {/* Book pages */}
        <rect x="0" y="5" width="20" height="15" fill="currentColor" opacity="0.2" rx="1" />
        <rect x="2" y="3" width="20" height="15" fill="currentColor" opacity="0.4" rx="1" />
        <rect x="4" y="1" width="20" height="15" fill="currentColor" opacity="0.9" rx="1" />
        {/* Book spine */}
        <line x1="4" y1="1" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" />
        {/* Page lines */}
        <line x1="8" y1="4" x2="20" y2="4" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      </g>
      
      {/* Text: Rust Workbook */}
      <text 
        x="100" 
        y="38" 
        fontSize="20" 
        fontWeight="600" 
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Rust Workbook
      </text>
    </svg>
  );
}