import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "en" | "ar" | "fr" | "es";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
  es: "Español",
};

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
    "user": "User",
    
    // Info dialog
    "infoDescription": "An interactive coding workbook for learning Rust. Work through {count} exercises covering variables, functions, ownership, lifetimes, and more.",
    "peopleUsed": "{count} people have used this workbook.",
    "forEducators": "For Educators",
    "eduRates": "Educational institutions get special rates.",
    
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
    "output": "Output",
    "problems": "Problems",
    
    // Exercise list
    "exercises": "Exercises",
    "completed": "completed",
    "filterExercises": "Filter exercises...",
    "resetProgress": "Reset Progress",
    
    // Editor
    "editor": "Editor",
    
    // Language
    "language": "Language",
    "selectLanguage": "Select Language",
    
    // Exercise categories
    "intro": "Introduction",
    "variables": "Variables",
    "functions": "Functions",
    "if": "Conditionals",
    "primitive_types": "Primitive Types",
    "vecs": "Vectors",
    "move_semantics": "Move Semantics",
    "structs": "Structs",
    "enums": "Enums",
    "strings": "Strings",
    "modules": "Modules",
    "hashmaps": "HashMaps",
    "options": "Options",
    "error_handling": "Error Handling",
    "generics": "Generics",
    "traits": "Traits",
    "lifetimes": "Lifetimes",
    "tests": "Tests",
    "iterators": "Iterators",
    "smart_pointers": "Smart Pointers",
    "threads": "Threads",
    "macros": "Macros",
    "conversions": "Conversions",
  },
  "ar": {
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
    "user": "مستخدم",
    
    // Info dialog
    "infoDescription": "كتاب تمارين تفاعلي لتعلم رست. اعمل على {count} تمرين تغطي المتغيرات والدوال والملكية وغيرها.",
    "peopleUsed": "{count} شخص استخدم هذا الكتاب.",
    "forEducators": "للمعلمين",
    "eduRates": "المؤسسات التعليمية تحصل على أسعار خاصة.",
    
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
    "output": "المخرجات",
    "problems": "المشاكل",
    
    // Exercise list
    "exercises": "التمارين",
    "completed": "مكتمل",
    "filterExercises": "البحث في التمارين...",
    "resetProgress": "إعادة التقدم",
    
    // Editor
    "editor": "المحرر",
    
    // Language
    "language": "اللغة",
    "selectLanguage": "اختر اللغة",
    
    // Exercise categories
    "intro": "المقدمة",
    "variables": "المتغيرات",
    "functions": "الدوال",
    "if": "الشروط",
    "primitive_types": "الأنواع الأساسية",
    "vecs": "المصفوفات",
    "move_semantics": "دلالات النقل",
    "structs": "الهياكل",
    "enums": "التعدادات",
    "strings": "النصوص",
    "modules": "الوحدات",
    "hashmaps": "جداول التجزئة",
    "options": "الخيارات",
    "error_handling": "معالجة الأخطاء",
    "generics": "الأنواع العامة",
    "traits": "السمات",
    "lifetimes": "فترات الحياة",
    "tests": "الاختبارات",
    "iterators": "المكررات",
    "smart_pointers": "المؤشرات الذكية",
    "threads": "الخيوط",
    "macros": "الماكرو",
    "conversions": "التحويلات",
  },
  "fr": {
    // Header
    "rustWorkbook": "Cahier d'exercices Rust",
    "users": "utilisateurs",
    "runCode": "Exécuter",
    "compiling": "Compilation...",
    "run": "Exécuter",
    "hint": "Indice",
    "reset": "Réinitialiser",
    "showHint": "Afficher l'indice",
    "resetCode": "Réinitialiser le code",
    "lightMode": "Mode clair",
    "darkMode": "Mode sombre",
    "signIn": "Se connecter",
    "logOut": "Se déconnecter",
    "myAccount": "Mon compte",
    "noExerciseSelected": "Aucun exercice sélectionné",
    "user": "Utilisateur",
    
    // Info dialog
    "infoDescription": "Un cahier d'exercices interactif pour apprendre Rust. Travaillez sur {count} exercices couvrant les variables, fonctions, propriété, durées de vie, et plus.",
    "peopleUsed": "{count} personnes ont utilisé ce cahier.",
    "forEducators": "Pour les enseignants",
    "eduRates": "Les établissements d'enseignement bénéficient de tarifs spéciaux.",
    
    // Educators dialog
    "educatorsDescription": "Le cahier Rust fonctionne dans le navigateur sans configuration. Les apprenants peuvent commencer à coder immédiatement.",
    "educatorsExercises": "94 exercices des bases aux sujets avancés. Utilise le vrai compilateur Rust.",
    "getInTouch": "Nous contacter",
    
    // Exercise hint dialog
    "exerciseHint": "Indice de l'exercice",
    "noHintAvailable": "Aucun indice disponible pour cet exercice.",
    
    // About modal
    "about": "À propos",
    
    // Donate modal
    "donate": "Faire un don",
    
    // Console
    "console": "Console",
    "clear": "Effacer",
    "readyToRun": "Prêt à exécuter votre code...",
    "output": "Sortie",
    "problems": "Problèmes",
    
    // Exercise list
    "exercises": "Exercices",
    "completed": "terminé",
    "filterExercises": "Filtrer les exercices...",
    "resetProgress": "Réinitialiser la progression",
    
    // Editor
    "editor": "Éditeur",
    
    // Language
    "language": "Langue",
    "selectLanguage": "Choisir la langue",
    
    // Exercise categories
    "intro": "Introduction",
    "variables": "Variables",
    "functions": "Fonctions",
    "if": "Conditions",
    "primitive_types": "Types primitifs",
    "vecs": "Vecteurs",
    "move_semantics": "Sémantique de déplacement",
    "structs": "Structures",
    "enums": "Énumérations",
    "strings": "Chaînes",
    "modules": "Modules",
    "hashmaps": "Tables de hachage",
    "options": "Options",
    "error_handling": "Gestion des erreurs",
    "generics": "Génériques",
    "traits": "Traits",
    "lifetimes": "Durées de vie",
    "tests": "Tests",
    "iterators": "Itérateurs",
    "smart_pointers": "Pointeurs intelligents",
    "threads": "Fils d'exécution",
    "macros": "Macros",
    "conversions": "Conversions",
  },
  "es": {
    // Header
    "rustWorkbook": "Cuaderno de Rust",
    "users": "usuarios",
    "runCode": "Ejecutar código",
    "compiling": "Compilando...",
    "run": "Ejecutar",
    "hint": "Pista",
    "reset": "Reiniciar",
    "showHint": "Mostrar pista",
    "resetCode": "Reiniciar código",
    "lightMode": "Modo claro",
    "darkMode": "Modo oscuro",
    "signIn": "Iniciar sesión",
    "logOut": "Cerrar sesión",
    "myAccount": "Mi cuenta",
    "noExerciseSelected": "Ningún ejercicio seleccionado",
    "user": "Usuario",
    
    // Info dialog
    "infoDescription": "Un cuaderno interactivo para aprender Rust. Trabaja en {count} ejercicios que cubren variables, funciones, propiedad, tiempos de vida y más.",
    "peopleUsed": "{count} personas han usado este cuaderno.",
    "forEducators": "Para educadores",
    "eduRates": "Las instituciones educativas obtienen tarifas especiales.",
    
    // Educators dialog
    "educatorsDescription": "El cuaderno de Rust funciona en el navegador sin configuración. Los estudiantes pueden empezar a programar de inmediato.",
    "educatorsExercises": "94 ejercicios desde lo básico hasta temas avanzados. Usa el compilador real de Rust.",
    "getInTouch": "Contáctanos",
    
    // Exercise hint dialog
    "exerciseHint": "Pista del ejercicio",
    "noHintAvailable": "No hay pista disponible para este ejercicio.",
    
    // About modal
    "about": "Acerca de",
    
    // Donate modal
    "donate": "Donar",
    
    // Console
    "console": "Consola",
    "clear": "Limpiar",
    "readyToRun": "Listo para ejecutar tu código...",
    "output": "Salida",
    "problems": "Problemas",
    
    // Exercise list
    "exercises": "Ejercicios",
    "completed": "completado",
    "filterExercises": "Filtrar ejercicios...",
    "resetProgress": "Reiniciar progreso",
    
    // Editor
    "editor": "Editor",
    
    // Language
    "language": "Idioma",
    "selectLanguage": "Seleccionar idioma",
    
    // Exercise categories
    "intro": "Introducción",
    "variables": "Variables",
    "functions": "Funciones",
    "if": "Condicionales",
    "primitive_types": "Tipos primitivos",
    "vecs": "Vectores",
    "move_semantics": "Semántica de movimiento",
    "structs": "Estructuras",
    "enums": "Enumeraciones",
    "strings": "Cadenas",
    "modules": "Módulos",
    "hashmaps": "Mapas hash",
    "options": "Opciones",
    "error_handling": "Manejo de errores",
    "generics": "Genéricos",
    "traits": "Traits",
    "lifetimes": "Tiempos de vida",
    "tests": "Pruebas",
    "iterators": "Iteradores",
    "smart_pointers": "Punteros inteligentes",
    "threads": "Hilos",
    "macros": "Macros",
    "conversions": "Conversiones",
  },
} as const;

type TranslationKey = keyof typeof translations["en"];

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | null>(null);

const validLocales: Locale[] = ["en", "ar", "fr", "es"];

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && validLocales.includes(saved)) {
      return saved;
    }
    // Try to detect from browser
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "ar") return "ar";
    if (browserLang === "fr") return "fr";
    if (browserLang === "es") return "es";
    return "en";
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
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

  const dir = locale === "ar" ? "rtl" : "ltr";

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
