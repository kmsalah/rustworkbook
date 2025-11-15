import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, BookOpen, Trophy, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Landing() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect authenticated users to IDE
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation("/ide");
    }
  }, [isAuthenticated, isLoading, setLocation]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Learn Rust, Right in Your Browser
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master Rust programming with interactive exercises. No setup required—just log in and start coding.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-login"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card>
              <CardHeader>
                <Code2 className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Interactive Editor</CardTitle>
                <CardDescription>
                  Write and run Rust code directly in your browser with syntax highlighting and auto-completion
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Trophy className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Your progress is saved automatically. Pick up right where you left off across all your devices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Real Compilation</CardTitle>
                <CardDescription>
                  Compile and run real Rust code with instant feedback from the Rust compiler
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-16 p-8 bg-muted/50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Based on Rustlings</h2>
            <p className="text-muted-foreground">
              This platform is built on{" "}
              <a
                href="https://rustlings.rust-lang.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Rustlings
              </a>
              , a collection of small exercises designed to get you familiar with reading and writing Rust code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
