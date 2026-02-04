import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Code, BookOpen, Trophy } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    document.title = "Welcome to Rust Workbook!";
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Welcome to Rust Workbook!
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Your account is ready. Let's start learning Rust!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Code className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">94 Interactive Exercises</p>
                <p className="text-sm text-muted-foreground">
                  Practice Rust from basics to advanced topics
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Hints & Guidance</p>
                <p className="text-sm text-muted-foreground">
                  Get help when you're stuck on any exercise
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Trophy className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Track Your Progress</p>
                <p className="text-sm text-muted-foreground">
                  Your progress is saved automatically
                </p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setLocation("/ide")} 
            className="w-full"
            size="lg"
            data-testid="button-start-learning"
          >
            Start Learning
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
