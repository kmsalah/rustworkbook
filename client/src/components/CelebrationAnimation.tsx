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
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; rotation: number; color: string }[]>([]);

  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -100 - 20,
        rotation: Math.random() * 360,
        color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
      }));
      setConfetti(particles);

      // Auto-dismiss after 5 seconds if not manually dismissed
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={onDismiss}
            data-testid="celebration-overlay"
          >
            {/* Confetti */}
            {confetti.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  x: '50vw',
                  y: '20vh',
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x: `calc(50vw + ${particle.x}vw)`,
                  y: `calc(100vh + ${particle.y}vh)`,
                  opacity: 0,
                  rotate: particle.rotation,
                }}
                transition={{
                  duration: 2 + Math.random(),
                  ease: "easeOut",
                }}
                className="absolute w-3 h-3 rounded-sm"
                style={{ backgroundColor: particle.color }}
              />
            ))}

            {/* Success Card */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-card border border-border rounded-lg shadow-2xl p-8 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
              data-testid="celebration-card"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                {/* Success Icon with Pulse */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="relative"
                >
                  <CheckCircle2 className="w-16 h-16 text-primary" data-testid="icon-success" />
                  <Sparkles className="w-6 h-6 text-primary absolute -top-1 -right-1" />
                </motion.div>

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
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
