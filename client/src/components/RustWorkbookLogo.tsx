import rustlingsLogo from "@/assets/rustlings-logo.png";

interface RustWorkbookLogoProps {
  size?: number;
}

export function RustWorkbookLogo({ size = 24 }: RustWorkbookLogoProps) {
  return (
    <img 
      src={rustlingsLogo} 
      alt="Rust Workbook" 
      width={size} 
      height={size}
      className="inline-block align-middle"
    />
  );
}