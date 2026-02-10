import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, BookOpen, Trophy, Users, ArrowRight, Monitor, Zap, CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoUrl from "@/assets/logo.png";

interface Stats {
  totalUsers: number;
  monthlyUsers: number;
  dailyUsers: number;
}

export default function Welcome() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  useEffect(() => {
    document.title = t("welcomePageTitle");
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-6" data-testid="welcome-hero">
          <div className="flex justify-center">
            <img src={logoUrl} alt={t("rustWorkbook")} className="h-20 w-20" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight" data-testid="text-welcome-title">
            {t("rustWorkbook")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-welcome-subtitle">
            {t("welcomeSubtitle")}
          </p>
          {stats && stats.totalUsers > 0 && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span data-testid="text-welcome-users">{t("peopleUsed", { count: stats.totalUsers.toLocaleString() })}</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => setLocation("/")}
              data-testid="button-welcome-start"
            >
              {t("welcomeStartCoding")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="space-y-6" data-testid="welcome-features">
          <h2 className="text-2xl font-bold text-center">{t("welcomeHowItWorks")}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Monitor className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium">{t("welcomeStep1Title")}</p>
                <p className="text-sm text-muted-foreground">{t("welcomeStep1Desc")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium">{t("welcomeStep2Title")}</p>
                <p className="text-sm text-muted-foreground">{t("welcomeStep2Desc")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium">{t("welcomeStep3Title")}</p>
                <p className="text-sm text-muted-foreground">{t("welcomeStep3Desc")}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6" data-testid="welcome-highlights">
          <h2 className="text-2xl font-bold text-center">{t("welcomeWhatsInside")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{t("learnFeature1Title")}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t("learnFeature1Desc")}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{t("learnFeature4Title")}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t("learnFeature4Desc")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6" data-testid="welcome-use-cases">
          <h2 className="text-2xl font-bold text-center">{t("perfectFor")}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center space-y-2">
                <Code className="w-8 h-8 text-primary mx-auto" />
                <p className="font-medium">{t("useCase1")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-2">
                <Trophy className="w-8 h-8 text-primary mx-auto" />
                <p className="font-medium">{t("useCase2")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-2">
                <BookOpen className="w-8 h-8 text-primary mx-auto" />
                <p className="font-medium">{t("useCase3")}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center space-y-4" data-testid="welcome-cta">
          <h2 className="text-2xl font-bold">{t("welcomeReadyTitle")}</h2>
          <p className="text-muted-foreground">{t("welcomeReadyDesc")}</p>
          <Button
            size="lg"
            onClick={() => setLocation("/")}
            data-testid="button-welcome-start-bottom"
          >
            {t("welcomeStartCoding")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        <footer className="text-center text-sm text-muted-foreground pb-8">
          <p>{t("rustWorkbook")} &mdash; {t("learnSubtitle")}</p>
        </footer>
      </div>
    </div>
  );
}
