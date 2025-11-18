import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Github, ExternalLink } from "lucide-react";
import logoUrl from "@/assets/logo.png";

export function AboutModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          data-testid="button-about"
          title="About"
        >
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" data-testid="dialog-about">
        <DialogHeader>
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logoUrl} alt="Rust Workbook" className="h-12 w-12" />
            <span className="text-2xl font-bold">Rust Workbook</span>
          </div>
          <DialogTitle className="text-center">Online Rust Coding Workbook</DialogTitle>
        </DialogHeader>
        <div className="text-left space-y-4 mt-4 text-sm text-muted-foreground">
          <p>
            Practice Rust in a browser-based coding workbook. Write and run code on every page, 
            starting with Rustlings exercises—no setup needed.
          </p>
          
          <div className="p-3 bg-muted rounded-lg border border-border">
            <h3 className="font-semibold mb-2 text-foreground">Important Disclaimer</h3>
            <p className="text-xs">
              <strong>Rust Workbook is an independent educational platform.</strong> We are NOT affiliated with, 
              endorsed by, or associated with:
            </p>
            <ul className="list-disc list-inside mt-2 text-xs space-y-1">
              <li>The Rust Foundation or the official Rust project</li>
              <li>The Rust Programming Language Book</li>
              <li>The Rustlings project or its maintainers</li>
              <li>Mozilla Foundation or any Rust core team members</li>
            </ul>
            <p className="text-xs mt-2">
              Rust® and the Rust logo are trademarks of the Rust Foundation. We use exercises from the 
              open-source Rustlings project under the MIT License.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Learning Resources</h3>
            <p>
              We recommend using <a 
                href="https://doc.rust-lang.org/book/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
                data-testid="link-rust-book"
              >
                The Rust Programming Language Book
                <ExternalLink className="h-3 w-3" />
              </a> alongside these exercises for comprehensive Rust learning.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Exercise Source</h3>
            <p>
              Exercises are sourced from the open-source Rustlings project:
            </p>
            <a 
              href="https://github.com/rust-lang/rustlings" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline mt-2"
            >
              <Github className="h-4 w-4" />
              github.com/rust-lang/rustlings
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Code Execution</h3>
            <p>
              Rust code is compiled and executed securely using the Piston API, 
              providing sandboxed execution without requiring local Rust installation.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}