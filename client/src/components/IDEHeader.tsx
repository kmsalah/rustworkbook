import { Play, HelpCircle, RotateCcw, Moon, Sun, ChevronLeft, ChevronRight, LogOut, LogIn, MoreVertical } from "lucide-react";
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
import { RustWorkbookLogo } from "./RustWorkbookLogo";
import { AboutModal } from "./AboutModal";
import { DonationModal } from "./DonationModal";

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
  isMobile?: boolean;
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
  isMobile = false,
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

  // Mobile header - simplified with essential controls
  if (isMobile) {
    return (
      <header className="h-14 border-b border-border bg-background px-2 flex items-center justify-between flex-shrink-0" data-testid="header-ide">
        <div className="flex items-center gap-1">
          <RustWorkbookLogo className="h-8 w-32 text-primary" />
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            onClick={onRunCode}
            disabled={isCompiling || !exerciseName}
            size="sm"
            className="gap-1"
            data-testid="button-run-code"
          >
            <Play className="h-3 w-3" />
            {isCompiling ? "..." : "Run"}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                data-testid="button-menu"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {exerciseName && (
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      const dialogButton = document.querySelector('[data-testid="button-show-hint"]') as HTMLButtonElement;
                      dialogButton?.click();
                    }}
                    data-testid="menuitem-hint"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Show Hint
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onReset}
                    data-testid="menuitem-reset"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Code
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              
              <DropdownMenuItem
                onClick={toggleTheme}
                data-testid="menuitem-theme"
              >
                {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {user ? (
                <>
                  <DropdownMenuLabel className="text-xs">
                    {user.firstName || user.email || "User"}
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => window.location.href = "/api/logout"}
                    data-testid="menuitem-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  onClick={() => window.location.href = "/api/login"}
                  data-testid="menuitem-login"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Hidden hint dialog that can be triggered from menu */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="hidden"
              data-testid="button-show-hint"
            />
          </DialogTrigger>
          <DialogContent data-testid="dialog-hint">
            <DialogHeader>
              <DialogTitle>Exercise Hint</DialogTitle>
            </DialogHeader>
            <div className="text-sm mt-4 whitespace-pre-wrap text-muted-foreground">
              {hint || "No hint available for this exercise."}
            </div>
          </DialogContent>
        </Dialog>
      </header>
    );
  }

  // Desktop header - full controls
  return (
    <header className="h-14 border-b border-border bg-background px-6 flex items-center justify-between flex-shrink-0" data-testid="header-ide">
      <div className="flex items-center gap-4">
        <RustWorkbookLogo className="h-9 w-48 text-primary" />
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

        <AboutModal />
        
        <DonationModal />

        <Button
          size="icon"
          variant="ghost"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <div className="h-6 w-px bg-border mx-1" />
        
        {user ? (
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
        ) : (
          <Button
            variant="ghost"
            className="h-8 px-2 gap-2"
            onClick={() => {
              // Use redirect-based login for Replit Auth
              window.location.href = "/api/login";
            }}
            data-testid="button-login"
          >
            <LogIn className="h-4 w-4" />
            <span className="text-sm">Sign In</span>
          </Button>
        )}
      </div>
    </header>
  );
}
