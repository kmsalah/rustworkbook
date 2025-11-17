export function RustWorkbookLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 240 40" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Clean > symbol */}
      <text 
        x="5" 
        y="28" 
        fontSize="28" 
        fontWeight="bold" 
        fill="currentColor"
        fontFamily="JetBrains Mono, monospace"
      >
        &gt;
      </text>
      
      {/* Simple book/square icon */}
      <rect 
        x="35" 
        y="12" 
        width="16" 
        height="16" 
        fill="currentColor" 
        rx="2"
      />
      
      {/* Text: Rust Workbook */}
      <text 
        x="65" 
        y="28" 
        fontSize="22" 
        fontWeight="600" 
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Rust Workbook
      </text>
    </svg>
  );
}