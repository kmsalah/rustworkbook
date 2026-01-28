import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "en" | "ar-JO";

const translations = {
  "en": {
    // Header
    "rustWorkbook": "Rust Workbook",
    "users": "users",
    "runCode": "Run Code",
    "compiling": "Compiling...",
    "run": "Run",
    "hint": "Hint",
    "reset": "Reset",
    "showHint": "Show Hint",
    "resetCode": "Reset Code",
    "lightMode": "Light Mode",
    "darkMode": "Dark Mode",
    "signIn": "Sign In",
    "logOut": "Log Out",
    "myAccount": "My Account",
    "noExerciseSelected": "No exercise selected",
    
    // Info dialog
    "infoDescription": "An interactive coding workbook for learning Rust. Work through {count} exercises covering variables, functions, ownership, lifetimes, and more.",
    "peopleUsed": "{count} people have used this workbook.",
    "forEducators": "For Educators",
    
    // Educators dialog
    "educatorsDescription": "Rust Workbook runs in the browser with no setup. Learners can start coding right away.",
    "educatorsExercises": "94 exercises from basics to advanced topics. Uses the real Rust compiler.",
    "getInTouch": "Get in touch",
    
    // Exercise hint dialog
    "exerciseHint": "Exercise Hint",
    "noHintAvailable": "No hint available for this exercise.",
    
    // About modal
    "about": "About",
    
    // Donate modal
    "donate": "Donate",
    
    // Console
    "console": "Console",
    "clear": "Clear",
    "readyToRun": "Ready to run your code...",
    
    // Exercise list
    "exercises": "Exercises",
    "completed": "completed",
    
    // Editor
    "editor": "Editor",
    
    // Language
    "language": "Language",
    "english": "English",
    "arabic": "العربية",
  },
  "ar-JO": {
    // Header
    "rustWorkbook": "كتاب تمارين رست",
    "users": "مستخدم",
    "runCode": "تشغيل الكود",
    "compiling": "جاري الترجمة...",
    "run": "تشغيل",
    "hint": "تلميح",
    "reset": "إعادة",
    "showHint": "عرض التلميح",
    "resetCode": "إعادة الكود",
    "lightMode": "الوضع الفاتح",
    "darkMode": "الوضع الداكن",
    "signIn": "تسجيل الدخول",
    "logOut": "تسجيل الخروج",
    "myAccount": "حسابي",
    "noExerciseSelected": "لم يتم اختيار تمرين",
    
    // Info dialog
    "infoDescription": "كتاب تمارين تفاعلي لتعلم رست. اعمل على {count} تمرين تغطي المتغيرات والدوال والملكية وغيرها.",
    "peopleUsed": "{count} شخص استخدم هذا الكتاب.",
    "forEducators": "للمعلمين",
    
    // Educators dialog
    "educatorsDescription": "كتاب تمارين رست يعمل في المتصفح بدون إعداد. يمكن للمتعلمين البدء بالبرمجة فوراً.",
    "educatorsExercises": "٩٤ تمرين من الأساسيات إلى المواضيع المتقدمة. يستخدم مترجم رست الحقيقي.",
    "getInTouch": "تواصل معنا",
    
    // Exercise hint dialog
    "exerciseHint": "تلميح التمرين",
    "noHintAvailable": "لا يوجد تلميح لهذا التمرين.",
    
    // About modal
    "about": "حول",
    
    // Donate modal
    "donate": "تبرع",
    
    // Console
    "console": "وحدة التحكم",
    "clear": "مسح",
    "readyToRun": "جاهز لتشغيل الكود...",
    
    // Exercise list
    "exercises": "التمارين",
    "completed": "مكتمل",
    
    // Editor
    "editor": "المحرر",
    
    // Language
    "language": "اللغة",
    "english": "English",
    "arabic": "العربية",
  }
} as const;

type TranslationKey = keyof typeof translations["en"];

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale") as Locale;
    return saved === "ar-JO" ? "ar-JO" : "en";
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  useEffect(() => {
    document.documentElement.dir = locale === "ar-JO" ? "rtl" : "ltr";
    document.documentElement.lang = locale === "ar-JO" ? "ar" : "en";
  }, [locale]);

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const dict = translations[locale] as Record<string, string>;
    const fallback = translations["en"] as Record<string, string>;
    let text = dict[key] || fallback[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const dir = locale === "ar-JO" ? "rtl" : "ltr";

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
