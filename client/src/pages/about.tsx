import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Github, ExternalLink, BookOpen } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to IDE Button */}
        <Link href="/ide">
          <Button variant="ghost" className="mb-6" data-testid="button-back-to-ide">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to IDE
          </Button>
        </Link>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-12 w-12 text-primary" />
              <span className="text-5xl font-bold">&gt;_</span>
            </div>
            <h1 className="text-4xl font-bold">Rust Coding Exercises Web IDE</h1>
            <p className="text-xl text-muted-foreground">
              Practice and learn Rust in your browser with interactive exercises
            </p>
          </div>

          {/* About Card */}
          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">About This Project</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This web-based IDE provides an interactive way to learn Rust programming through hands-on exercises. 
                  Built on the excellent open-source <strong>Rustlings project (MIT License)</strong>, we've added 
                  a browser-based development environment, progress tracking, and interactive hints to enhance your learning experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Attribution & Credits</h2>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    This project is <strong>unofficial and independent</strong>, created with respect for the Rust community.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-medium">Original Rustlings Project:</p>
                    <a 
                      href="https://github.com/rust-lang/rustlings" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                      data-testid="link-rustlings-github"
                    >
                      <Github className="h-4 w-4" />
                      github.com/rust-lang/rustlings
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      Licensed under MIT License - Copyright (c) 2019 rust-lang team
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Features</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Browser-based Rust code editor with syntax highlighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Real-time compilation and execution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Progress tracking (with account)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Interactive hints for each exercise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>30 exercises covering Rust fundamentals</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Usage</h2>
                <p className="text-muted-foreground">
                  You can try the first 3 exercises without an account. To track your progress and access all 30 exercises,
                  please sign in with your preferred method.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Technical Details</h2>
                <p className="text-muted-foreground">
                  Code execution is handled securely through the Piston API, a production-grade sandboxed execution environment.
                  Your code runs in isolated containers with resource limits, ensuring a safe learning experience.
                </p>
              </section>

              <section className="border-t pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  This is an independent project created for educational purposes. 
                  We are not affiliated with the Rust Foundation or the official Rustlings project.
                  All trademarks belong to their respective owners.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}