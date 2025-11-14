import { useEffect } from "react";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CelebrationAnimationProps {
  show: boolean;
  exerciseName: string;
  onDismiss: () => void;
  onNextExercise?: () => void;
  hasNextExercise?: boolean;
}

export function CelebrationAnimation({
  show,
  exerciseName,
  onDismiss,
  onNextExercise,
  hasNextExercise = false,
}: CelebrationAnimationProps) {
  useEffect(() => {
    if (show) {
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onDismiss}
      data-testid="celebration-overlay"
    >
      {/* Success Card */}
      <div
        className="bg-card border border-border rounded-lg shadow-2xl p-8 max-w-md mx-4 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
        data-testid="celebration-card"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Success Icon */}
          <div className="relative">
            <CheckCircle2 className="w-16 h-16 text-primary animate-pulse" data-testid="icon-success" />
            <Sparkles className="w-6 h-6 text-primary absolute -top-1 -right-1" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Excellent Work!
            </h2>
            <p className="text-muted-foreground">
              You've successfully completed <span className="font-semibold text-foreground">{exerciseName}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col w-full gap-2 mt-4">
            {hasNextExercise && onNextExercise && (
              <Button
                onClick={() => {
                  onNextExercise();
                  onDismiss();
                }}
                className="w-full gap-2"
                data-testid="button-next-exercise"
              >
                Next Exercise
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            <Button
              onClick={onDismiss}
              variant={hasNextExercise ? "outline" : "default"}
              className="w-full"
              data-testid="button-continue"
            >
              Continue Practicing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
