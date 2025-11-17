import { useState, forwardRef } from "react";
import { Search, CheckCircle2, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Exercise } from "@shared/schema";

interface ExerciseNavigatorProps {
  exercises: Exercise[];
  currentExerciseId: string | null;
  completedExercises: string[];
  onSelectExercise: (exercise: Exercise) => void;
}

export const ExerciseNavigator = forwardRef<HTMLInputElement, ExerciseNavigatorProps>(
  function ExerciseNavigator({
    exercises,
    currentExerciseId,
    completedExercises,
    onSelectExercise,
  }, ref) {
    const [searchQuery, setSearchQuery] = useState("");
    
    // Ensure completedExercises is always an array
    const safeCompletedExercises = Array.isArray(completedExercises) ? completedExercises : [];

  const groupedExercises = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.topic]) {
      acc[exercise.topic] = [];
    }
    acc[exercise.topic].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const filteredGroups = Object.entries(groupedExercises).reduce((acc, [topic, exs]) => {
    const filtered = exs.filter(ex =>
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[topic] = filtered;
    }
    return acc;
  }, {} as Record<string, Exercise[]>);

  const totalExercises = exercises.length;
  const completedCount = safeCompletedExercises.length;
  const progressPercent = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Exercises</h2>
          <Badge variant="secondary" className="text-xs" data-testid="text-progress-count">
            {completedCount}/{totalExercises}
          </Badge>
        </div>
        <Progress value={progressPercent} className="h-1 mb-4" data-testid="progress-exercises" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={ref}
            placeholder="Filter exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm"
            data-testid="input-search-exercises"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={Object.keys(groupedExercises)} className="px-2">
          {Object.entries(filteredGroups).map(([topic, topicExercises]) => {
            const topicCompleted = topicExercises.filter(ex => safeCompletedExercises.includes(ex.id)).length;
            return (
              <AccordionItem key={topic} value={topic} className="border-none">
                <AccordionTrigger className="py-2 px-3 hover-elevate rounded-md text-sm font-medium text-sidebar-foreground hover:no-underline" data-testid={`accordion-topic-${topic}`}>
                  <div className="flex items-center justify-between flex-1 mr-2">
                    <span className="capitalize">{topic.replace(/_/g, " ")}</span>
                    <Badge variant="outline" className="text-xs ml-2">
                      {topicCompleted}/{topicExercises.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="space-y-1 ml-2">
                    {topicExercises.map((exercise) => {
                      const isCompleted = safeCompletedExercises.includes(exercise.id);
                      const isCurrent = currentExerciseId === exercise.id;
                      return (
                        <button
                          key={exercise.id}
                          onClick={() => onSelectExercise(exercise)}
                          className={`
                            w-full flex items-center gap-2 px-3 h-9 rounded-md text-sm
                            hover-elevate active-elevate-2
                            ${isCurrent ? 'bg-sidebar-accent border-l-2 border-l-primary' : ''}
                          `}
                          data-testid={`button-exercise-${exercise.id}`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" data-testid={`icon-completed-${exercise.id}`} />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={`truncate text-left ${isCurrent ? 'text-sidebar-accent-foreground font-medium' : 'text-sidebar-foreground'}`}>
                            {exercise.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
              localStorage.removeItem("rustlings-progress");
              window.location.reload();
            }
          }}
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-destructive w-full justify-start h-8"
          data-testid="button-reset-progress"
        >
          Reset Progress
        </Button>
      </div>
    </div>
  );
});
