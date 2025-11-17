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
import { RustWorkbookLogo } from "./RustWorkbookLogo";

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
          <div className="flex justify-center mb-4">
            <RustWorkbookLogo className="h-10 w-52 text-primary" />
          </div>
          <DialogTitle className="text-center">Online Rust Coding Workbook</DialogTitle>
          <DialogDescription className="text-left space-y-4 mt-4">
            <p>
              Practice Rust in a browser-based coding workbook. Write and run code on every page, 
              starting with Rustlings exercises and moving into advanced tracks—no setup needed.
            </p>
            
            <div>
              <h3 className="font-semibold mb-2">Recommended Learning Resource</h3>
              <p>
                We highly recommend <a 
                  href="https://doc.rust-lang.org/book/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                  data-testid="link-rust-book"
                >
                  The Rust Programming Language Book
                  <ExternalLink className="h-3 w-3" />
                </a> for comprehensive Rust learning alongside these exercises.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Attribution & Credits</h3>
              <p>
                Built on the excellent open-source <strong>Rustlings project (MIT License)</strong>.
                This platform is <strong>unofficial and not affiliated</strong> with the Rust Foundation, 
                Mozilla, or the official Rust project.
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
              <h3 className="font-semibold mb-2">Code Execution</h3>
              <p>
                Rust code is compiled and executed securely using the Piston API, 
                providing sandboxed execution without requiring local Rust installation.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}