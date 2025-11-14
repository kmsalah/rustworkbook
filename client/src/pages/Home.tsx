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
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ExerciseNavigator
            exercises={exercises || []}
            currentExerciseId={currentExercise?.id || null}
            completedExercises={progress.completedExercises}
            onSelectExercise={handleSelectExercise}
          />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-border hover:bg-primary transition-colors" data-testid="handle-left" />

        <ResizablePanel defaultSize={50} minSize={30}>
          <CodeEditor
            value={code}
            onChange={(value) => setCode(value || "")}
            fileName={currentExercise?.name ? `${currentExercise.name}.rs` : "untitled.rs"}
          />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-border hover:bg-primary transition-colors" data-testid="handle-right" />

        <ResizablePanel defaultSize={30} minSize={20}>
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
