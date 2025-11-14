import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ExerciseNavigator } from "@/components/ExerciseNavigator";
import { CodeEditor } from "@/components/CodeEditor";
import { ConsolePanel } from "@/components/ConsolePanel";
import { IDEHeader } from "@/components/IDEHeader";
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
        const newProgress = {
          ...progress,
          completedExercises: progress.completedExercises.includes(currentExercise.id)
            ? progress.completedExercises
            : [...progress.completedExercises, currentExercise.id],
          currentExercise: currentExercise.id,
        };
        setProgress(newProgress);
        localStorage.setItem("rustlings-progress", JSON.stringify(newProgress));
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentExercise, code, compileMutation.isPending]);

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

  const currentExerciseIndex = exercises && currentExercise
    ? exercises.findIndex(ex => ex.id === currentExercise.id)
    : -1;
  const hasNextExercise = currentExerciseIndex >= 0 && currentExerciseIndex < (exercises?.length || 0) - 1;
  const hasPreviousExercise = currentExerciseIndex > 0;

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
    </div>
  );
}
