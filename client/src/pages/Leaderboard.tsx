import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useOnlineCount } from "@/hooks/useOnlineCount";
import logoUrl from "@/assets/logo.png";

interface LeaderboardEntry {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  completedCount: number;
  lastCompletedAt: string | null;
}

interface Stats {
  totalUsers: number;
  monthlyUsers: number;
  dailyUsers: number;
}

export default function Leaderboard() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const onlineCount = useOnlineCount();

  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
    staleTime: 30000,
  });

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
    staleTime: 60000,
  });

  const { data: exercises } = useQuery<any[]>({
    queryKey: ["/api/exercises"],
  });

  const totalExercises = exercises?.length || 94;

  useEffect(() => {
    document.title = t("leaderboardPageTitle");
  }, [t]);

  function getRankIcon(rank: number) {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm text-muted-foreground font-medium w-5 text-center">{rank}</span>;
  }

  function getDisplayName(entry: LeaderboardEntry) {
    if (entry.firstName && entry.lastName) {
      return `${entry.firstName} ${entry.lastName}`;
    }
    if (entry.firstName) return entry.firstName;
    const shortId = entry.userId.slice(-4);
    return `Rustacean #${shortId}`;
  }

  function getInitials(entry: LeaderboardEntry) {
    if (entry.firstName && entry.lastName) {
      return `${entry.firstName[0]}${entry.lastName[0]}`.toUpperCase();
    }
    if (entry.firstName) return entry.firstName[0].toUpperCase();
    return entry.userId.slice(-2).toUpperCase();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <img src={logoUrl} alt={t("rustWorkbook")} className="h-8 w-8" />
          <h1 className="text-2xl font-bold" data-testid="text-leaderboard-title">{t("leaderboard")}</h1>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {onlineCount > 0 && (
            <span className="flex items-center gap-1" data-testid="text-leaderboard-online">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              {onlineCount} {t("online")}
            </span>
          )}
          {stats && stats.totalUsers > 0 && (
            <span data-testid="text-leaderboard-total-users">
              {stats.totalUsers.toLocaleString()} {t("learners")}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-5 w-5 bg-muted rounded animate-pulse" />
                  <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : leaderboard && leaderboard.length > 0 ? (
          <div className="space-y-2" data-testid="leaderboard-list">
            {leaderboard.map((entry, index) => {
              const rank = index + 1;
              const progressPercent = Math.round((entry.completedCount / totalExercises) * 100);
              return (
                <Card key={entry.userId} data-testid={`leaderboard-entry-${rank}`}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(rank)}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.profileImageUrl || undefined} alt={getDisplayName(entry)} />
                      <AvatarFallback>{getInitials(entry)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" data-testid={`text-name-${rank}`}>
                        {getDisplayName(entry)}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-[120px]">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${Math.min(progressPercent, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {entry.completedCount}/{totalExercises} {t("completed")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold" data-testid={`text-score-${rank}`}>
                        {progressPercent}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground" data-testid="text-leaderboard-empty">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">{t("leaderboardEmpty")}</p>
              <p className="text-sm mt-1">{t("leaderboardEmptyDesc")}</p>
              <Button
                className="mt-4"
                onClick={() => setLocation("/")}
                data-testid="button-start-learning"
              >
                {t("getStarted")}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
