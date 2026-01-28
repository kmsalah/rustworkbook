import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface EducatorsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EducatorsDialog({ open, onOpenChange }: EducatorsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" data-testid="dialog-educators">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            For Educators
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            Rust Workbook runs in the browser with no setup. Learners can start coding right away.
          </p>
          
          <p className="text-muted-foreground">
            94 exercises from basics to advanced topics. Uses the real Rust compiler.
          </p>
          
          <div className="pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.location.href = "mailto:hello@rustworkbook.com?subject=Rust%20Workbook%20for%20Educators"}
              data-testid="button-contact-educators"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
