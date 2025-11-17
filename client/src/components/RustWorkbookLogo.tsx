export function RustWorkbookLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 240 36" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Prompt/terminal symbol > */}
      <text 
        x="4" 
        y="26" 
        fontSize="24" 
        fontWeight="600" 
        fill="currentColor"
        fontFamily="'JetBrains Mono', 'Courier New', monospace"
      >
        &gt;
      </text>
      
      {/* Book icon - cleaner design with pages */}
      <g transform="translate(30, 10)">
        {/* Book cover/binding */}
        <rect 
          x="0" 
          y="0" 
          width="18" 
          height="20" 
          fill="currentColor" 
          rx="1"
        />
        {/* Book pages lines */}
        <rect 
          x="3" 
          y="3" 
          width="12" 
          height="1.5" 
          fill="white" 
          opacity="0.8"
        />
        <rect 
          x="3" 
          y="6" 
          width="12" 
          height="1.5" 
          fill="white" 
          opacity="0.8"
        />
        <rect 
          x="3" 
          y="9" 
          width="8" 
          height="1.5" 
          fill="white" 
          opacity="0.8"
        />
      </g>
      
      {/* Text: Rust Workbook */}
      <text 
        x="58" 
        y="26" 
        fontSize="20" 
        fontWeight="500" 
        fill="currentColor"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        letterSpacing="-0.3"
      >
        Rust Workbook
      </text>
    </svg>
  );
}