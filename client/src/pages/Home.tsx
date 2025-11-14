import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ExerciseNavigator } from "@/components/ExerciseNavigator";
import { CodeEditor } from "@/components/CodeEditor";
import { ConsolePanel } from "@/components/ConsolePanel";
import { IDEHeader } from "@/components/IDEHeader";
import { KeyboardShortcutsDialog } from "@/components/KeyboardShortcutsDialog";
import { CelebrationAnimation } from "@/components/CelebrationAnimation";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Loader2 } from "lucide-react";
import type { Exercise, CompilationResult, Progress } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Home() {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [code, setCode] = useState("");
  const [originalCode, setOriginalCode] = useState("");
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
  const [progress, setProgress] = useState<Progress>({ completedExercises: [] });
  const [showShortcutsDialog, setShowShortcutsDialog] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const filterInputRef = useRef<HTMLInputElement>(null);

  const { data: exercises, isLoading } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const compileMutation = useMutation({
    mutationFn: async (data: { code: string; mode: "compile" | "test"; exerciseId: string }) => {
      return apiRequest<CompilationResult>("POST", "/api/compile", data);
    },
    onSuccess: (result) => {
      setCompilationResult(result);
      
      if (result.success && currentExercise) {
        // Check both state and localStorage to ensure we have the latest completion status
        const savedProgress = localStorage.getItem("rustlings-progress");
        const currentCompleted = savedProgress 
          ? JSON.parse(savedProgress).completedExercises || []
          : progress.completedExercises;
        
        const isFirstCompletion = !currentCompleted.includes(currentExercise.id);
        
        console.log('[Celebration] Exercise completed:', currentExercise.id);
        console.log('[Celebration] Currently completed:', currentCompleted);
        console.log('[Celebration] Is first completion:', isFirstCompletion);
        
        const newProgress = {
          ...progress,
          completedExercises: currentCompleted.includes(currentExercise.id)
            ? currentCompleted
            : [...currentCompleted, currentExercise.id],
          currentExercise: currentExercise.id,
        };
        setProgress(newProgress);
        localStorage.setItem("rustlings-progress", JSON.stringify(newProgress));
        
        // Show celebration animation only on first completion
        if (isFirstCompletion) {
          console.log('[Celebration] Showing celebration overlay');
          setShowCelebration(true);
        } else {
          console.log('[Celebration] Skipping celebration (already completed)');
        }
      }
    },
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem("rustlings-progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse saved progress:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (exercises && exercises.length > 0 && !currentExercise) {
      const lastExercise = progress.currentExercise
        ? exercises.find(ex => ex.id === progress.currentExercise)
        : null;
      setCurrentExercise(lastExercise || exercises[0]);
    }
  }, [exercises, currentExercise, progress.currentExercise]);

  useEffect(() => {
    if (currentExercise) {
      setCode(currentExercise.code);
      setOriginalCode(currentExercise.code);
      setCompilationResult(null);
    }
  }, [currentExercise]);

  // Calculate navigation state for use in keyboard shortcuts
  const currentExerciseIndex = exercises && currentExercise
    ? exercises.findIndex(ex => ex.id === currentExercise.id)
    : -1;
  const hasNextExercise = currentExerciseIndex >= 0 && currentExerciseIndex < (exercises?.length || 0) - 1;
  const hasPreviousExercise = currentExerciseIndex > 0;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts when typing in input fields (except for '?' which shows help)
      const isInputField = (e.target as HTMLElement)?.tagName === 'INPUT' || 
                          (e.target as HTMLElement)?.tagName === 'TEXTAREA';
      
      // '?' to show keyboard shortcuts (works even in input fields)
      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setShowShortcutsDialog(true);
        return;
      }
      
      // Skip other shortcuts when in input fields
      if (isInputField) return;
      
      // Cmd/Ctrl + Enter to run code
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (currentExercise && !compileMutation.isPending) {
          handleRunCode();
        }
      }
      
      // Cmd/Ctrl + R to reset code
      if ((e.metaKey || e.ctrlKey) && e.key === "r") {
        e.preventDefault();
        if (currentExercise) {
          handleReset();
        }
      }
      
      // Alt + N for next exercise
      if (e.altKey && e.key === "n") {
        e.preventDefault();
        if (hasNextExercise) {
          handleNextExercise();
        }
      }
      
      // Alt + P for previous exercise
      if (e.altKey && e.key === "p") {
        e.preventDefault();
        if (hasPreviousExercise) {
          handlePreviousExercise();
        }
      }
      
      // Cmd/Ctrl + K to focus filter
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        filterInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentExercise, code, compileMutation.isPending, hasNextExercise, hasPreviousExercise]);

  const handleSelectExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    // Save current exercise to progress
    const newProgress = {
      ...progress,
      currentExercise: exercise.id,
    };
    setProgress(newProgress);
    localStorage.setItem("rustlings-progress", JSON.stringify(newProgress));
  };

  const handleRunCode = () => {
    if (!currentExercise) return;
    compileMutation.mutate({
      code,
      mode: currentExercise.mode,
      exerciseId: currentExercise.id,
    });
  };

  const handleReset = () => {
    if (window.confirm("Reset code to original? This will discard your changes.")) {
      setCode(originalCode);
      setCompilationResult(null);
    }
  };

  const handleClearConsole = () => {
    setCompilationResult(null);
  };

  const handleNextExercise = () => {
    if (!exercises || !currentExercise) return;
    const currentIndex = exercises.findIndex(ex => ex.id === currentExercise.id);
    if (currentIndex >= 0 && currentIndex < exercises.length - 1) {
      const nextExercise = exercises[currentIndex + 1];
      setCurrentExercise(nextExercise);
      // Save to progress
      const newProgress = {
        ...progress,
        currentExercise: nextExercise.id,
      };
      setProgress(newProgress);
      localStorage.setItem("rustlings-progress", JSON.stringify(newProgress));
    }
  };

  const handlePreviousExercise = () => {
    if (!exercises || !currentExercise) return;
    const currentIndex = exercises.findIndex(ex => ex.id === currentExercise.id);
    if (currentIndex > 0) {
      const prevExercise = exercises[currentIndex - 1];
      setCurrentExercise(prevExercise);
      // Save to progress
      const newProgress = {
        ...progress,
        currentExercise: prevExercise.id,
      };
      setProgress(newProgress);
      localStorage.setItem("rustlings-progress", JSON.stringify(newProgress));
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background" data-testid="loading-app">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading Rustlings exercises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background" data-testid="page-home">
      <IDEHeader
        exerciseName={currentExercise?.name || ""}
        exerciseMode={currentExercise?.mode || "compile"}
        hint={currentExercise?.hint || ""}
        onRunCode={handleRunCode}
        onReset={handleReset}
        isCompiling={compileMutation.isPending}
        onPreviousExercise={handlePreviousExercise}
        onNextExercise={handleNextExercise}
        hasPreviousExercise={hasPreviousExercise}
        hasNextExercise={hasNextExercise}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1" autoSaveId="rustlings-panel-layout">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} id="navigator">
          <ExerciseNavigator
            ref={filterInputRef}
            exercises={exercises || []}
            currentExerciseId={currentExercise?.id || null}
            completedExercises={progress.completedExercises}
            onSelectExercise={handleSelectExercise}
          />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-border hover:bg-primary transition-colors" data-testid="handle-left" />

        <ResizablePanel defaultSize={50} minSize={30} id="editor">
          <CodeEditor
            value={code}
            onChange={(value) => setCode(value || "")}
            fileName={currentExercise?.name ? `${currentExercise.name}.rs` : "untitled.rs"}
            compilationResult={compilationResult}
          />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-border hover:bg-primary transition-colors" data-testid="handle-right" />

        <ResizablePanel defaultSize={30} minSize={20} id="console">
          <ConsolePanel
            compilationResult={compilationResult}
            isCompiling={compileMutation.isPending}
            onClear={handleClearConsole}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      <KeyboardShortcutsDialog
        open={showShortcutsDialog}
        onOpenChange={setShowShortcutsDialog}
      />

      <CelebrationAnimation
        show={showCelebration}
        exerciseName={currentExercise?.name || ""}
        onDismiss={() => setShowCelebration(false)}
        onNextExercise={handleNextExercise}
        hasNextExercise={hasNextExercise}
      />
    </div>
  );
}
