import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function DonationModal() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const bitcoinAddress = "15X8fFBsvJgr9mJ68bdT2rZKhFkMYaZjYe";

  const handleCopy = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Bitcoin address copied to clipboard",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          data-testid="button-donate"
          title="Support"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]" data-testid="dialog-donate">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Support Rust Workbook
          </DialogTitle>
          <DialogDescription className="space-y-4 mt-4">
            <p>
              Thank you for using Rust Workbook! If you find it helpful, 
              consider supporting the site to keep it running.
            </p>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Bitcoin Address</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs break-all font-mono">
                  {bitcoinAddress}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  data-testid="button-copy-bitcoin"
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Every contribution helps maintain and improve the platform. Thank you! 🧡
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}