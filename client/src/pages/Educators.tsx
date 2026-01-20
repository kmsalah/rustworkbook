import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Download,
  Globe,
  Shield,
  Cpu
} from "lucide-react";
import { Link } from "wouter";
import logoUrl from "@/assets/logo.png";

export default function Educators() {
  const handleDownloadPDF = () => {
    window.open("/api/educators/one-pager", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
            <img src={logoUrl} alt="Rust Workbook" className="h-8 w-8" />
            <span className="font-semibold">Rust Workbook</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" data-testid="link-home">Home</Button>
            </Link>
            <Button onClick={() => window.location.href = "/api/login"} data-testid="button-try-now">
              Try It Free
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          <section className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <GraduationCap className="h-4 w-4" />
              For Educators
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Rust is the Future of Systems Programming
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Prepare your students for the next generation of software development with 
              Rust Workbook—a free, browser-based learning platform used by developers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => window.location.href = "/api/login"} data-testid="button-get-started">
                <ArrowRight className="mr-2 h-5 w-5" />
                Try It Now - It's Free
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownloadPDF} data-testid="button-download-pdf">
                <Download className="mr-2 h-5 w-5" />
                Download One-Pager
              </Button>
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Why Rust Matters</h2>
              <p className="text-muted-foreground mt-2">Industry leaders are betting big on Rust</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Memory Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Rust eliminates entire classes of bugs at compile time—no more buffer overflows or null pointer errors.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <Cpu className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">High Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Zero-cost abstractions give the speed of C/C++ with the safety of modern languages.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <Globe className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Industry Adoption</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Used by Microsoft, Google, Amazon, Meta, Mozilla, Dropbox, Discord, and the Linux kernel.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <BarChart3 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Growing Demand</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    #1 most loved language on Stack Overflow for 8 years straight. Job demand is rapidly increasing.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Why Rust Workbook?</h2>
              <p className="text-muted-foreground mt-2">The easiest way to teach Rust</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">No Setup Required</h3>
                    <p className="text-muted-foreground">
                      Students can start coding immediately in their browser. No installations, 
                      no toolchain setup, no configuration headaches.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Complete Curriculum</h3>
                    <p className="text-muted-foreground">
                      96 exercises covering the full Rustlings curriculum—from basic syntax 
                      to advanced topics like lifetimes, smart pointers, and concurrency.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Progress Tracking</h3>
                    <p className="text-muted-foreground">
                      Students can track their progress across all exercises. 
                      Great for self-paced learning and homework assignments.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Real Rust Compiler</h3>
                    <p className="text-muted-foreground">
                      Code runs on actual rustc—students see real compiler errors and learn 
                      to work with Rust's legendary error messages.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Completely Free</h3>
                    <p className="text-muted-foreground">
                      No subscriptions, no paywalls. All 96 exercises are available 
                      to everyone at no cost.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Works Everywhere</h3>
                    <p className="text-muted-foreground">
                      Desktop, tablet, or mobile. Students can practice Rust 
                      on any device with a web browser.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">What's Covered</h2>
              <p className="text-muted-foreground mt-2">96 exercises across 22 topics</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                "Intro", "Variables", "Functions", "If Statements", 
                "Primitive Types", "Vectors", "Move Semantics", "Structs",
                "Enums", "Strings", "Modules", "HashMaps",
                "Options", "Error Handling", "Generics", "Traits",
                "Lifetimes", "Tests", "Iterators", "Smart Pointers",
                "Threads", "Macros"
              ].map((topic) => (
                <div 
                  key={topic}
                  className="px-3 py-2 bg-muted rounded-md text-center text-sm font-medium"
                >
                  {topic}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-muted/50 rounded-2xl p-8 md:p-12 text-center space-y-6">
            <Users className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-3xl font-bold">Ready to Bring Rust to Your Classroom?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start using Rust Workbook today. Share the link with your students and 
              they can begin learning immediately—no registration required to try it out.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => window.location.href = "/api/login"} data-testid="button-start-teaching">
                Start Teaching with Rust Workbook
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownloadPDF} data-testid="button-download-pdf-bottom">
                <Download className="mr-2 h-5 w-5" />
                Get the One-Pager
              </Button>
            </div>
          </section>

          <section className="text-center space-y-4 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Questions about using Rust Workbook in your classroom?
            </p>
            <p className="text-sm text-muted-foreground">
              Visit{" "}
              <a 
                href="https://rustworkbook.com" 
                className="text-primary hover:underline"
                data-testid="link-rustworkbook"
              >
                rustworkbook.com
              </a>
              {" "}to get started.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
