import { Play, HelpCircle, RotateCcw, Moon, Sun, ChevronLeft, ChevronRight, LogOut, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import type { User } from "@shared/schema";

interface IDEHeaderProps {
  exerciseName: string;
  exerciseMode: "compile" | "test";
  hint: string;
  onRunCode: () => void;
  onReset: () => void;
  isCompiling: boolean;
  onPreviousExercise?: () => void;
  onNextExercise?: () => void;
  hasPreviousExercise?: boolean;
  hasNextExercise?: boolean;
  user?: User;
}

export function IDEHeader({
  exerciseName,
  exerciseMode,
  hint,
  onRunCode,
  onReset,
  isCompiling,
  onPreviousExercise,
  onNextExercise,
  hasPreviousExercise = false,
  hasNextExercise = false,
  user,
}: IDEHeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="h-14 border-b border-border bg-background px-6 flex items-center justify-between flex-shrink-0" data-testid="header-ide">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">Rustlings IDE</h1>
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onPreviousExercise}
            disabled={!hasPreviousExercise}
            className="h-8 w-8"
            data-testid="button-previous-exercise"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-sm font-medium text-foreground truncate max-w-xs" data-testid="text-exercise-name">
            {exerciseName || "No exercise selected"}
          </h2>
          {exerciseName && (
            <Badge variant="outline" className="text-xs capitalize" data-testid="badge-mode">
              {exerciseMode}
            </Badge>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={onNextExercise}
            disabled={!hasNextExercise}
            className="h-8 w-8"
            data-testid="button-next-exercise"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onRunCode}
          disabled={isCompiling || !exerciseName}
          className="gap-2"
          data-testid="button-run-code"
        >
          <Play className="h-4 w-4" />
          {isCompiling ? "Compiling..." : "Run Code"}
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              disabled={!exerciseName}
              className="gap-2"
              data-testid="button-show-hint"
            >
              <HelpCircle className="h-4 w-4" />
              Hint
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-hint">
            <DialogHeader>
              <DialogTitle>Exercise Hint</DialogTitle>
              <DialogDescription className="text-sm mt-4 whitespace-pre-wrap">
                {hint || "No hint available for this exercise."}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          onClick={onReset}
          disabled={!exerciseName}
          className="gap-2"
          data-testid="button-reset-code"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>

        <div className="h-6 w-px bg-border mx-1" />

        <Button
          size="icon"
          variant="ghost"
          onClick={() => window.location.href = "/about"}
          data-testid="button-about"
          title="About"
        >
          <Info className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {user && (
          <>
            <div className="h-6 w-px bg-border mx-1" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2 gap-2" data-testid="button-user-menu">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.profileImageUrl || undefined} alt={user.email || "User"} />
                    <AvatarFallback>
                      {user.firstName?.[0] || user.email?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">
                    {user.firstName || user.email || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" data-testid="menu-user">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                {user.email && (
                  <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                    {user.email}
                  </DropdownMenuLabel>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => window.location.href = "/api/logout"}
                  data-testid="menuitem-logout"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
}
