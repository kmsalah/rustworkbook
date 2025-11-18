import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ExerciseNavigator } from "@/components/ExerciseNavigator";
import { CodeEditor } from "@/components/CodeEditor";
import { ConsolePanel } from "@/components/ConsolePanel";
import { IDEHeader } from "@/components/IDEHeader";
import { KeyboardShortcutsDialog } from "@/components/KeyboardShortcutsDialog";
// Removed CelebrationAnimation - using inline feedback instead
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Code, Terminal, List } from "lucide-react";
import type { Exercise, CompilationResult, User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import LoginModal from "@/components/LoginModal";
import { saveExerciseCode, loadExerciseCode, clearExerciseCode } from "@/lib/localStorage";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Home() {
  const { isAuthenticated, isLoading, user: authUser } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Media queries for responsive design
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  
  // Mobile tab state
  const [mobileActiveTab, setMobileActiveTab] = useState("editor");

  // Allow anonymous users - no redirect

  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [code, setCode] = useState("");
  const [originalCode, setOriginalCode] = useState("");
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
  const [showShortcutsDialog, setShowShortcutsDialog] = useState(false);
  // Removed showCelebration state - using inline feedback
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [localProgress, setLocalProgress] = useState<string[]>(() => {
    // Load anonymous progress from localStorage on mount
    try {
      const saved = localStorage.getItem("rustlings-progress");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure it's an array
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage:', e);
    }
    return [];
  });
  const filterInputRef = useRef<HTMLInputElement>(null);
  const user = authUser as User | undefined;

  const { data: exercises, isLoading: exercisesLoading } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  // Load user progress from database - only when authenticated
  const { data: progressData, isLoading: progressLoading, refetch: refetchProgress } = useQuery<{ completedExercises: string[] }>({
    queryKey: ["/api/progress"],
    enabled: isAuthenticated,
    retry: false,
  });

  // State to track if we've already merged local progress
  const [hasMergedLocalProgress, setHasMergedLocalProgress] = useState(false);

  // Merge local and database progress - ensure it's always an array
  const completedExercises: string[] = isAuthenticated 
    ? (Array.isArray(progressData?.completedExercises) ? progressData.completedExercises : [])
    : localProgress;
  const dataLoading = exercisesLoading || progressLoading;

  const markCompleteMutation = useMutation({
    mutationFn: async (exerciseId: string) => {
      return apiRequest("POST", `/api/progress/${exerciseId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      });
    },
  });

  const compileMutation = useMutation({
    mutationFn: async (data: { code: string; mode: "compile" | "test"; exerciseId: string }) => {
      return apiRequest<CompilationResult>("POST", "/api/compile", data);
    },
    onSuccess: (result) => {
      setCompilationResult(result);
      
      if (result.success && currentExercise) {
        const isFirstCompletion = !completedExercises.includes(currentExercise.id);
        
        console.log('[Progress] Exercise completed:', currentExercise.id);
        console.log('[Progress] Currently completed:', completedExercises);
        console.log('[Progress] Is first completion:', isFirstCompletion);
        
        if (isAuthenticated) {
          // Save progress for authenticated users in database
          markCompleteMutation.mutate(currentExercise.id);
        } else {
          // Save progress for anonymous users in localStorage
          if (isFirstCompletion) {
            const newProgress = [...localProgress, currentExercise.id];
            setLocalProgress(newProgress);
            localStorage.setItem("rustlings-progress", JSON.stringify(newProgress));
            console.log('[Progress] Saved to localStorage:', newProgress);
          }
        }
        
        // Show success feedback using toast for first completion
        if (isFirstCompletion) {
          toast({
            title: "🎉 Excellent Work!",
            description: `You've successfully completed ${currentExercise.name}`,
          });
        }
      }
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        // Check if error is due to session limit reached
        if (error instanceof Error && error.message.includes("maximum number of free runs")) {
          setShowLoginModal(true);
          return;
        }
        // Show login modal for authentication errors
        setShowLoginModal(true);
        return;
      }
      setCompilationResult({
        success: false,
        output: "",
        stderr: error instanceof Error ? error.message : "Unknown compilation error",
        exitCode: 1,
      });
    },
  });

  // Merge local progress when user signs in
  useEffect(() => {
    const mergeProgress = async () => {
      if (!isAuthenticated || hasMergedLocalProgress || !progressData) return;
      
      // Check if there's local progress to merge
      const savedLocal = localStorage.getItem("rustlings-progress");
      if (!savedLocal) {
        setHasMergedLocalProgress(true);
        return;
      }
      
      try {
        const localExercises = JSON.parse(savedLocal);
        if (!Array.isArray(localExercises) || localExercises.length === 0) {
          setHasMergedLocalProgress(true);
          return;
        }
        
        console.log('[Progress] User signed in, merging local progress...');
        console.log('[Progress] Local progress:', localExercises);
        console.log('[Progress] Database progress:', progressData.completedExercises);
        
        // Find exercises that are in local but not in database
        const dbProgress = progressData.completedExercises || [];
        const exercisesToAdd = localExercises.filter(id => !dbProgress.includes(id));
        
        if (exercisesToAdd.length > 0) {
          console.log('[Progress] Adding to database:', exercisesToAdd);
          
          // Submit each new exercise to the database
          const results = await Promise.allSettled(
            exercisesToAdd.map(exerciseId => 
              apiRequest("POST", `/api/progress/${exerciseId}`, {})
            )
          );
          
          const succeeded = results.filter(r => r.status === 'fulfilled').length;
          console.log(`[Progress] Successfully synced ${succeeded}/${exercisesToAdd.length} exercises`);
          
          // Clear local storage after merge attempt
          localStorage.removeItem("rustlings-progress");
          setLocalProgress([]);
          
          // Show toast with appropriate message
          if (succeeded > 0) {
            toast({
              title: "✅ Progress Synced",
              description: `Added ${succeeded} exercise${succeeded > 1 ? 's' : ''} from your local progress to your account.`,
            });
            // Refetch progress to get the updated list
            await refetchProgress();
          }
        } else {
          console.log('[Progress] No new exercises to add from local progress');
          // Still clear localStorage since user is now signed in
          localStorage.removeItem("rustlings-progress");
          setLocalProgress([]);
        }
      } catch (error) {
        console.error('[Progress] Error merging progress:', error);
      } finally {
        setHasMergedLocalProgress(true);
      }
    };
    
    mergeProgress();
  }, [isAuthenticated, hasMergedLocalProgress, progressData, refetchProgress, toast]);

  useEffect(() => {
    if (exercises && exercises.length > 0 && !currentExercise) {
      // Load last viewed exercise from localStorage (for session persistence)
      const lastViewedId = localStorage.getItem("rustlings-last-exercise");
      const lastExercise = lastViewedId
        ? exercises.find(ex => ex.id === lastViewedId)
        : null;
      setCurrentExercise(lastExercise || exercises[0]);
    }
  }, [exercises, currentExercise]);

  // Auto-save code to localStorage with debounce
  useEffect(() => {
    if (!currentExercise) return;
    
    const saveTimeout = setTimeout(() => {
      // Only save if code is different from original template
      if (code !== currentExercise.code) {
        saveExerciseCode(currentExercise.id, code);
      }
    }, 250); // 250ms debounce
    
    return () => clearTimeout(saveTimeout);
  }, [code, currentExercise]);

  useEffect(() => {
    if (currentExercise) {
      // Try to load saved code from localStorage
      const savedCode = loadExerciseCode(currentExercise.id);
      if (savedCode) {
        setCode(savedCode);
      } else {
        setCode(currentExercise.code);
      }
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
    // Save last viewed exercise to localStorage for session persistence
    localStorage.setItem("rustlings-last-exercise", exercise.id);
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
      // Clear localStorage for this exercise
      if (currentExercise) {
        clearExerciseCode(currentExercise.id);
      }
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
      localStorage.setItem("rustlings-last-exercise", nextExercise.id);
    }
  };

  const handlePreviousExercise = () => {
    if (!exercises || !currentExercise) return;
    const currentIndex = exercises.findIndex(ex => ex.id === currentExercise.id);
    if (currentIndex > 0) {
      const prevExercise = exercises[currentIndex - 1];
      setCurrentExercise(prevExercise);
      localStorage.setItem("rustlings-last-exercise", prevExercise.id);
    }
  };

  if (dataLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background" data-testid="loading-app">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading Rustlings exercises...</p>
        </div>
      </div>
    );
  }

  // Mobile Layout
  if (isMobile) {
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
          user={user}
          isMobile={true}
        />
        
        <div className="flex-1 overflow-hidden">
          <Tabs value={mobileActiveTab} onValueChange={setMobileActiveTab} className="h-full flex flex-col">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="exercises" className="flex-1 data-[state=active]:bg-primary/10">
                <List className="h-4 w-4 mr-1" />
                Exercises
              </TabsTrigger>
              <TabsTrigger value="editor" className="flex-1 data-[state=active]:bg-primary/10">
                <Code className="h-4 w-4 mr-1" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="console" className="flex-1 data-[state=active]:bg-primary/10">
                <Terminal className="h-4 w-4 mr-1" />
                Console
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="exercises" className="flex-1 overflow-hidden m-0">
              <ExerciseNavigator
                ref={filterInputRef}
                exercises={exercises || []}
                currentExerciseId={currentExercise?.id || null}
                completedExercises={completedExercises}
                onSelectExercise={(exercise) => {
                  handleSelectExercise(exercise);
                  setMobileActiveTab("editor");
                }}
              />
            </TabsContent>
            
            <TabsContent value="editor" className="flex-1 overflow-hidden m-0">
              <CodeEditor
                value={code}
                onChange={(value) => setCode(value || "")}
                fileName={currentExercise?.name ? `${currentExercise.name}.rs` : "untitled.rs"}
                compilationResult={compilationResult}
              />
            </TabsContent>
            
            <TabsContent value="console" className="flex-1 overflow-hidden m-0">
              <ConsolePanel
                compilationResult={compilationResult}
                isCompiling={compileMutation.isPending}
                onClear={handleClearConsole}
              />
            </TabsContent>
          </Tabs>
        </div>

        <KeyboardShortcutsDialog
          open={showShortcutsDialog}
          onOpenChange={setShowShortcutsDialog}
        />

        <LoginModal
          open={showLoginModal}
          onOpenChange={setShowLoginModal}
        />
      </div>
    );
  }

  // Tablet Layout
  if (isTablet) {
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
          user={user}
        />

        <div className="flex-1 flex">
          <div className="flex-[60] min-w-0 flex flex-col">
            {/* Exercise selector dropdown for tablet */}
            <div className="border-b border-border p-2">
              <select 
                className="w-full p-2 bg-background border border-input rounded-md text-sm"
                value={currentExercise?.id || ""}
                onChange={(e) => {
                  const exercise = exercises?.find(ex => ex.id === e.target.value);
                  if (exercise) handleSelectExercise(exercise);
                }}
                data-testid="select-exercise-tablet"
              >
                {exercises?.map(exercise => {
                  const isCompleted = completedExercises.includes(exercise.id);
                  const chapterMatch = exercise.name.match(/^(.+?)_/);
                  const chapterName = chapterMatch ? chapterMatch[1] : "misc";
                  return (
                    <option key={exercise.id} value={exercise.id}>
                      {isCompleted ? "✓ " : "○ "}{chapterName}/{exercise.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex-1">
              <CodeEditor
                value={code}
                onChange={(value) => setCode(value || "")}
                fileName={currentExercise?.name ? `${currentExercise.name}.rs` : "untitled.rs"}
                compilationResult={compilationResult}
              />
            </div>
          </div>

          <div className="w-px bg-border" />

          <div className="flex-[40] min-w-0">
            <ConsolePanel
              compilationResult={compilationResult}
              isCompiling={compileMutation.isPending}
              onClear={handleClearConsole}
            />
          </div>
        </div>

        <KeyboardShortcutsDialog
          open={showShortcutsDialog}
          onOpenChange={setShowShortcutsDialog}
        />

        <LoginModal
          open={showLoginModal}
          onOpenChange={setShowLoginModal}
        />
      </div>
    );
  }

  // Desktop Layout (default)
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
        user={user}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1" autoSaveId="rustlings-panel-layout">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} id="navigator">
          <ExerciseNavigator
            ref={filterInputRef}
            exercises={exercises || []}
            currentExerciseId={currentExercise?.id || null}
            completedExercises={completedExercises}
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

      {/* Celebration animation removed - using inline toast feedback instead */}

      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </div>
  );
}
