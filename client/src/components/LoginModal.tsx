import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, Github, Mail } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const handleLogin = () => {
    // Open login in a popup window
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(
      "/api/login",
      "replit-login",
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,location=0,menubar=0,scrollbars=1`
    );
    
    // Check if popup was opened successfully
    if (popup) {
      // Close modal after opening popup
      onOpenChange(false);
      
      // Check periodically if the popup is closed
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          // Reload the page to refresh auth state
          window.location.reload();
        }
      }, 500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-login">
        <DialogHeader>
          <DialogTitle>Sign in Required</DialogTitle>
          <DialogDescription>
            Sign in to access all 30 Rustlings exercises and save your progress.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-sm text-muted-foreground">
            <p className="mb-3">✨ Free tier includes first 3 exercises</p>
            <p>🚀 Sign in for full access to all chapters</p>
          </div>
          
          <Button 
            onClick={handleLogin} 
            className="w-full" 
            size="lg"
            data-testid="button-login-modal"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign in with Replit
          </Button>
          
          <div className="text-xs text-muted-foreground text-center">
            Supports Google, GitHub, X, Apple, and email
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}