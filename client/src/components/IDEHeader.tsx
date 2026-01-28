import { Play, HelpCircle, RotateCcw, Moon, Sun, ChevronLeft, ChevronRight, LogOut, LogIn, MoreVertical, GraduationCap, Info, Languages } from "lucide-react";
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
import logoUrl from "@/assets/logo.png";
import { AboutModal } from "./AboutModal";
import { DonationModal } from "./DonationModal";
import { CompletionBadge } from "./CompletionBadge";
import { EducatorsDialog } from "./EducatorsDialog";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useI18n, localeNames, type Locale } from "@/lib/i18n";

// Feature flag for multi-language support
const ENABLE_LOCALIZATION = true;

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
  showInfoOnMount?: boolean;
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
  showInfoOnMount = false,
}: IDEHeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showEducatorsDialog, setShowEducatorsDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(showInfoOnMount);
  const { t, locale, setLocale } = useI18n();

  const availableLocales: Locale[] = ["en", "ar", "fr", "es"];

  // Fetch exercises to get total count
  const { data: exercises } = useQuery<any[]>({
    queryKey: ["/api/exercises", locale],
    queryFn: async () => {
      const response = await fetch(`/api/exercises?locale=${locale}`);
      if (!response.ok) throw new Error("Failed to fetch exercises");
      return response.json();
    },
  });

  // Fetch public stats
  const { data: stats } = useQuery<{ totalUsers: number; monthlyUsers: number; dailyUsers: number }>({
    queryKey: ["/api/stats"],
    staleTime: 60000, // Cache for 1 minute
  });

  // Fetch user progress if authenticated
  const { data: progressData, error: progressError } = useQuery<{ completedExercises: string[] }>({
    queryKey: ["/api/progress"],
    enabled: !!user,
    retry: false, // Don't retry on 401 errors
    staleTime: 0, // Always refetch on mount
    gcTime: 0, // Don't cache between mounts
  });

  // Calculate if user has completed all exercises
  // Only check completion if user is logged in and we have valid progress data (no errors)
  const totalExercises = exercises?.length || 0;
  const userCompletedCount = progressData?.completedExercises?.length || 0;
  const hasCompletedAll = user && !progressError && totalExercises > 0 && userCompletedCount >= totalExercises;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Open info dialog when showInfoOnMount changes to true
  useEffect(() => {
    if (showInfoOnMount) {
      setShowInfoDialog(true);
    }
  }, [showInfoOnMount]);

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
        <div className="flex items-center gap-2">
          <img src={logoUrl} alt={t("rustWorkbook")} className="h-8 w-8" />
          <span className="text-sm font-semibold">{t("rustWorkbook")}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={() => setShowInfoDialog(true)}
            data-testid="button-info-mobile"
          >
            <Info className="h-3 w-3" />
          </Button>
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
            {isCompiling ? "..." : t("run")}
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
                    <HelpCircle className="me-2 h-4 w-4" />
                    {t("showHint")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onReset}
                    data-testid="menuitem-reset"
                  >
                    <RotateCcw className="me-2 h-4 w-4" />
                    {t("resetCode")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              
              <DropdownMenuItem
                onClick={toggleTheme}
                data-testid="menuitem-theme"
              >
                {theme === "dark" ? <Sun className="me-2 h-4 w-4" /> : <Moon className="me-2 h-4 w-4" />}
                {theme === "dark" ? t("lightMode") : t("darkMode")}
              </DropdownMenuItem>
              
              {ENABLE_LOCALIZATION && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs">{t("language")}</DropdownMenuLabel>
                  {availableLocales.map((loc) => (
                    <DropdownMenuItem
                      key={loc}
                      onClick={() => setLocale(loc)}
                      data-testid={`menuitem-language-${loc}`}
                      className={locale === loc ? "bg-accent" : ""}
                    >
                      <Languages className="me-2 h-4 w-4" />
                      {localeNames[loc]}
                    </DropdownMenuItem>
                  ))}
                </>
              )}
              
              <DropdownMenuSeparator />
              
              {user ? (
                <>
                  <DropdownMenuLabel className="text-xs flex items-center gap-2">
                    <span>{user.firstName || user.email || t("user")}</span>
                    {hasCompletedAll && (
                      <CompletionBadge className="h-4 w-4 text-red-500" />
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      // Clear all query cache before logging out to ensure fresh state
                      queryClient.clear();
                      window.location.href = "/api/logout";
                    }}
                    data-testid="menuitem-logout"
                  >
                    <LogOut className="me-2 h-4 w-4" />
                    {t("logOut")}
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  onClick={() => window.location.href = "/api/login"}
                  data-testid="menuitem-login"
                >
                  <LogIn className="me-2 h-4 w-4" />
                  {t("signIn")}
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
              <DialogTitle>{t("exerciseHint")}</DialogTitle>
            </DialogHeader>
            <div className="text-sm mt-4 whitespace-pre-wrap text-muted-foreground">
              {hint || t("noHintAvailable")}
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Info dialog */}
        <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
          <DialogContent data-testid="dialog-info">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <img src={logoUrl} alt={t("rustWorkbook")} className="h-6 w-6" />
                {t("rustWorkbook")}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                {t("infoDescription", { count: totalExercises })}
              </p>
              
              {stats && stats.totalUsers > 0 && (
                <p className="text-muted-foreground">
                  {t("peopleUsed", { count: stats.totalUsers.toLocaleString() })}
                </p>
              )}
              
              <div className="pt-2 border-t space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setShowInfoDialog(false);
                    setShowEducatorsDialog(true);
                  }}
                  data-testid="button-educators-from-info"
                >
                  <GraduationCap className="me-2 h-4 w-4" />
                  {t("forEducators")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <EducatorsDialog
          open={showEducatorsDialog}
          onOpenChange={setShowEducatorsDialog}
        />
      </header>
    );
  }

  // Desktop header - full controls
  return (
    <header className="h-14 border-b border-border bg-background px-6 flex items-center justify-between flex-shrink-0" data-testid="header-ide">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt={t("rustWorkbook")} className="h-9 w-9" />
          <span className="text-lg font-semibold">{t("rustWorkbook")}</span>
          {stats && stats.totalUsers > 0 && (
            <span className="text-xs text-muted-foreground" data-testid="text-user-count">
              {stats.totalUsers.toLocaleString()} {t("users")}
            </span>
          )}
        </div>
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
            {exerciseName || t("noExerciseSelected")}
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
          {isCompiling ? t("compiling") : t("runCode")}
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
              {t("hint")}
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-hint">
            <DialogHeader>
              <DialogTitle>{t("exerciseHint")}</DialogTitle>
              <DialogDescription className="text-sm mt-4 whitespace-pre-wrap">
                {hint || t("noHintAvailable")}
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
          {t("reset")}
        </Button>

        <div className="h-6 w-px bg-border mx-1" />

        <AboutModal />
        
        <DonationModal />
        
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowEducatorsDialog(true)}
          title={t("forEducators")}
          data-testid="button-educators"
        >
          <GraduationCap className="h-4 w-4" />
        </Button>
        
        <EducatorsDialog
          open={showEducatorsDialog}
          onOpenChange={setShowEducatorsDialog}
        />

        <Button
          size="icon"
          variant="ghost"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        {ENABLE_LOCALIZATION && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                title={t("language")}
                data-testid="button-language-toggle"
              >
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("selectLanguage")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableLocales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => setLocale(loc)}
                  data-testid={`menuitem-language-${loc}`}
                  className={locale === loc ? "bg-accent" : ""}
                >
                  {localeNames[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="h-6 w-px bg-border mx-1" />
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-2 gap-2" data-testid="button-user-menu">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.profileImageUrl || undefined} alt={user.email || t("user")} />
                  <AvatarFallback>
                    {user.firstName?.[0] || user.email?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">
                  {user.firstName || user.email || t("user")}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" data-testid="menu-user">
              <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
              {user.email && (
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground flex items-center gap-2">
                  <span>{user.email}</span>
                  {hasCompletedAll && (
                    <CompletionBadge className="h-4 w-4 text-red-500" />
                  )}
                </DropdownMenuLabel>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // Clear all query cache before logging out to ensure fresh state
                  queryClient.clear();
                  window.location.href = "/api/logout";
                }}
                data-testid="menuitem-logout"
              >
                <LogOut className="me-2 h-4 w-4" />
                {t("logOut")}
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
            <span className="text-sm">{t("signIn")}</span>
          </Button>
        )}
      </div>
      
      {/* Info dialog for desktop - triggered by /contact route */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent data-testid="dialog-info">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <img src={logoUrl} alt={t("rustWorkbook")} className="h-6 w-6" />
              {t("rustWorkbook")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              {t("infoDescription", { count: totalExercises })}
            </p>
            
            {stats && stats.totalUsers > 0 && (
              <p className="text-muted-foreground">
                {t("peopleUsed", { count: stats.totalUsers.toLocaleString() })}
              </p>
            )}
            
            <div className="pt-2 border-t space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  setShowInfoDialog(false);
                  setShowEducatorsDialog(true);
                }}
                data-testid="button-educators-from-info"
              >
                <GraduationCap className="me-2 h-4 w-4" />
                {t("forEducators")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
