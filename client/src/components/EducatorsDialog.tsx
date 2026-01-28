import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GraduationCap, CheckCircle } from "lucide-react";

interface EducatorsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EducatorsDialog({ open, onOpenChange }: EducatorsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="dialog-educators">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <GraduationCap className="h-6 w-6 text-primary" />
            For Educators
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Rust Workbook is designed for classroom and self-paced learning. Use it to supplement your Rust curriculum or as a standalone practice tool.
          </p>
          
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">No Setup Required</p>
                <p className="text-sm text-muted-foreground">Students start coding immediately - no install, no configuration</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">94 Progressive Exercises</p>
                <p className="text-sm text-muted-foreground">From variables to lifetimes, covering all core Rust concepts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Real Compiler Feedback</p>
                <p className="text-sm text-muted-foreground">Students learn from authentic rustc error messages</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = "mailto:hello@rustworkbook.com?subject=Rust%20Workbook%20for%20Educators"}
              data-testid="button-contact-educators"
            >
              Contact Us for Classroom Use
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
