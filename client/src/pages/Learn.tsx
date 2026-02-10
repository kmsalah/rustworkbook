import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, BookOpen, Trophy, GraduationCap, Users, ArrowRight, Monitor, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoUrl from "@/assets/logo.png";

interface Stats {
  totalUsers: number;
  monthlyUsers: number;
  dailyUsers: number;
}

export default function Learn() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  useEffect(() => {
    document.title = t("learnPageTitle");
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-6" data-testid="learn-hero">
          <div className="flex justify-center">
            <img src={logoUrl} alt={t("rustWorkbook")} className="h-20 w-20" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight" data-testid="text-learn-title">
            {t("rustWorkbook")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-learn-subtitle">
            {t("learnSubtitle")}
          </p>
          {stats && stats.totalUsers > 0 && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span data-testid="text-learn-users">{t("peopleUsed", { count: stats.totalUsers.toLocaleString() })}</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => setLocation("/welcome")}
              data-testid="button-try-now"
            >
              {t("learnTryNow")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { window.location.href = "/api/login"; }}
              data-testid="button-learn-signin"
            >
              {t("signIn")}
            </Button>
          </div>
        </section>

        <section className="space-y-6" data-testid="learn-features">
          <h2 className="text-2xl font-bold text-center">{t("learnWhyTitle")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5 text-primary" />
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
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{t("learnFeature2Title")}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t("learnFeature2Desc")}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{t("learnFeature3Title")}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t("learnFeature3Desc")}</p>
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

        <section className="space-y-6" data-testid="learn-use-cases">
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

        <section className="space-y-6" data-testid="learn-educators">
          <Card>
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{t("forEducators")}</h2>
              </div>
              <p className="text-muted-foreground">{t("educatorsDescription")}</p>
              <p className="text-muted-foreground">{t("educatorsExercises")}</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>{t("eduBenefit1")}</li>
                <li>{t("eduBenefit2")}</li>
                <li>{t("eduBenefit3")}</li>
                <li>{t("eduBenefit4")}</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={() => setLocation("/welcome")}
                  data-testid="button-educators-try"
                >
                  {t("learnTryNow")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "mailto:hello@rustworkbook.com?subject=Rust%20Workbook%20for%20Educators"}
                  data-testid="button-educators-contact"
                >
                  {t("getInTouch")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="text-center text-sm text-muted-foreground pb-8">
          <p>{t("rustWorkbook")} &mdash; {t("learnSubtitle")}</p>
        </footer>
      </div>
    </div>
  );
}
