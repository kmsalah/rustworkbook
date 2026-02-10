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
    "getStarted": "Get Started",
    "logOut": "Log Out",
    "myAccount": "My Account",
    "noExerciseSelected": "No exercise selected",
    "user": "User",
    
    // Info dialog
    "infoDescription": "An interactive coding workbook for learning Rust. Work through {count} exercises covering variables, functions, ownership, lifetimes, and more.",
    "perfectFor": "Perfect for:",
    "useCase1": "Learning to program",
    "useCase2": "Learning Rust",
    "useCase3": "Interview preparation",
    "peopleUsed": "{count} people have used this workbook.",
    "forEducators": "For Educators",
    "eduRates": "Educational institutions get special rates.",
    
    // Educators dialog
    "educatorsDescription": "Rust Workbook runs in the browser with no setup. Learners can start coding right away.",
    "educatorsExercises": "94 exercises from basics to advanced topics. Uses the real Rust compiler.",
    "getInTouch": "Get in touch",
    
    // Learn page
    "learnPageTitle": "Learn Rust - Rust Workbook",
    "learnSubtitle": "An interactive coding workbook for learning Rust",
    "learnTryNow": "Try it now",
    "learnWhyTitle": "Why Rust Workbook?",
    "learnFeature1Title": "94 Interactive Exercises",
    "learnFeature1Desc": "From basics to advanced topics like lifetimes, smart pointers, and macros.",
    "learnFeature2Title": "No Setup Required",
    "learnFeature2Desc": "Runs in the browser. No installation needed. Start coding in seconds.",
    "learnFeature3Title": "Hints & Guidance",
    "learnFeature3Desc": "Get help when you're stuck on any exercise.",
    "learnFeature4Title": "Real Rust Compiler",
    "learnFeature4Desc": "Compile and run real Rust code. Not a simulation.",
    "eduBenefit1": "No setup required — students start coding immediately",
    "eduBenefit2": "Progress tracking for each student",
    "eduBenefit3": "94 exercises covering the full Rust curriculum",
    "eduBenefit4": "Works on any device with a browser",
    
    // Welcome page
    "welcomePageTitle": "Rust Workbook - Learn Rust by Doing",
    "welcomeSubtitle": "Learn Rust through hands-on coding exercises. No setup, no installation — just open and start writing code.",
    "welcomeStartCoding": "Start coding",
    "welcomeHowItWorks": "How it works",
    "welcomeStep1Title": "Open in your browser",
    "welcomeStep1Desc": "No downloads or setup. Works on any device.",
    "welcomeStep2Title": "Write Rust code",
    "welcomeStep2Desc": "94 exercises from basics to advanced topics.",
    "welcomeStep3Title": "Get instant feedback",
    "welcomeStep3Desc": "Real compiler output tells you exactly what to fix.",
    "welcomeWhatsInside": "What's inside",
    "welcomeReadyTitle": "Ready to start?",
    "welcomeReadyDesc": "Jump in and write your first Rust program in seconds.",

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
    "getStarted": "ابدأ الآن",
    "logOut": "تسجيل الخروج",
    "myAccount": "حسابي",
    "noExerciseSelected": "لم يتم اختيار تمرين",
    "user": "مستخدم",
    
    // Info dialog
    "infoDescription": "كتاب تمارين تفاعلي لتعلم رست. اعمل على {count} تمرين تغطي المتغيرات والدوال والملكية وغيرها.",
    "perfectFor": "مثالي لـ:",
    "useCase1": "تعلم البرمجة",
    "useCase2": "تعلم رست",
    "useCase3": "التحضير للمقابلات",
    "peopleUsed": "{count} شخص استخدم هذا الكتاب.",
    "forEducators": "للمعلمين",
    "eduRates": "المؤسسات التعليمية تحصل على أسعار خاصة.",
    
    // Educators dialog
    "educatorsDescription": "كتاب تمارين رست يعمل في المتصفح بدون إعداد. يمكن للمتعلمين البدء بالبرمجة فوراً.",
    "educatorsExercises": "٩٤ تمرين من الأساسيات إلى المواضيع المتقدمة. يستخدم مترجم رست الحقيقي.",
    "getInTouch": "تواصل معنا",
    
    // Learn page
    "learnPageTitle": "تعلم رست - كتاب تمارين رست",
    "learnSubtitle": "كتاب تمارين تفاعلي لتعلم لغة رست",
    "learnTryNow": "جرّبه الآن",
    "learnWhyTitle": "لماذا كتاب تمارين رست؟",
    "learnFeature1Title": "٩٤ تمرين تفاعلي",
    "learnFeature1Desc": "من الأساسيات إلى المواضيع المتقدمة مثل فترات الحياة والمؤشرات الذكية والماكرو.",
    "learnFeature2Title": "لا حاجة للإعداد",
    "learnFeature2Desc": "يعمل في المتصفح. لا حاجة للتثبيت. ابدأ البرمجة في ثوانٍ.",
    "learnFeature3Title": "تلميحات وإرشادات",
    "learnFeature3Desc": "احصل على المساعدة عندما تواجه صعوبة في أي تمرين.",
    "learnFeature4Title": "مترجم رست حقيقي",
    "learnFeature4Desc": "ترجمة وتشغيل كود رست حقيقي. ليس محاكاة.",
    "eduBenefit1": "لا حاجة للإعداد — يبدأ الطلاب البرمجة فوراً",
    "eduBenefit2": "تتبع التقدم لكل طالب",
    "eduBenefit3": "٩٤ تمرين تغطي منهج رست الكامل",
    "eduBenefit4": "يعمل على أي جهاز يحتوي على متصفح",
    
    // Welcome page
    "welcomePageTitle": "كتاب تمارين رست - تعلم رست بالممارسة",
    "welcomeSubtitle": "تعلم رست من خلال تمارين برمجية عملية. بدون إعداد، بدون تثبيت — فقط افتح وابدأ بكتابة الكود.",
    "welcomeStartCoding": "ابدأ البرمجة",
    "welcomeHowItWorks": "كيف يعمل",
    "welcomeStep1Title": "افتح في متصفحك",
    "welcomeStep1Desc": "بدون تنزيل أو إعداد. يعمل على أي جهاز.",
    "welcomeStep2Title": "اكتب كود رست",
    "welcomeStep2Desc": "٩٤ تمرين من الأساسيات إلى المواضيع المتقدمة.",
    "welcomeStep3Title": "احصل على ملاحظات فورية",
    "welcomeStep3Desc": "مخرجات المترجم الحقيقي تخبرك بالضبط ما يجب إصلاحه.",
    "welcomeWhatsInside": "ماذا بالداخل",
    "welcomeReadyTitle": "مستعد للبدء؟",
    "welcomeReadyDesc": "انطلق واكتب أول برنامج رست في ثوانٍ.",

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
    "getStarted": "Commencer",
    "logOut": "Se déconnecter",
    "myAccount": "Mon compte",
    "noExerciseSelected": "Aucun exercice sélectionné",
    "user": "Utilisateur",
    
    // Info dialog
    "infoDescription": "Un cahier d'exercices interactif pour apprendre Rust. Travaillez sur {count} exercices couvrant les variables, fonctions, propriété, durées de vie, et plus.",
    "perfectFor": "Idéal pour :",
    "useCase1": "Apprendre à programmer",
    "useCase2": "Apprendre Rust",
    "useCase3": "Préparation aux entretiens",
    "peopleUsed": "{count} personnes ont utilisé ce cahier.",
    "forEducators": "Pour les enseignants",
    "eduRates": "Les établissements d'enseignement bénéficient de tarifs spéciaux.",
    
    // Educators dialog
    "educatorsDescription": "Le cahier Rust fonctionne dans le navigateur sans configuration. Les apprenants peuvent commencer à coder immédiatement.",
    "educatorsExercises": "94 exercices des bases aux sujets avancés. Utilise le vrai compilateur Rust.",
    "getInTouch": "Nous contacter",
    
    // Learn page
    "learnPageTitle": "Apprendre Rust - Cahier d'exercices Rust",
    "learnSubtitle": "Un cahier d'exercices interactif pour apprendre Rust",
    "learnTryNow": "Essayer maintenant",
    "learnWhyTitle": "Pourquoi le cahier Rust ?",
    "learnFeature1Title": "94 exercices interactifs",
    "learnFeature1Desc": "Des bases aux sujets avancés comme les durées de vie, les pointeurs intelligents et les macros.",
    "learnFeature2Title": "Aucune installation",
    "learnFeature2Desc": "Fonctionne dans le navigateur. Aucune installation nécessaire. Commencez à coder en quelques secondes.",
    "learnFeature3Title": "Indices et guidance",
    "learnFeature3Desc": "Obtenez de l'aide quand vous êtes bloqué sur un exercice.",
    "learnFeature4Title": "Vrai compilateur Rust",
    "learnFeature4Desc": "Compilez et exécutez du vrai code Rust. Pas une simulation.",
    "eduBenefit1": "Aucune configuration — les étudiants commencent à coder immédiatement",
    "eduBenefit2": "Suivi de la progression pour chaque étudiant",
    "eduBenefit3": "94 exercices couvrant tout le programme Rust",
    "eduBenefit4": "Fonctionne sur tout appareil avec un navigateur",
    
    // Welcome page
    "welcomePageTitle": "Cahier Rust - Apprenez Rust en pratiquant",
    "welcomeSubtitle": "Apprenez Rust grâce à des exercices de programmation pratiques. Sans configuration, sans installation — ouvrez et commencez à coder.",
    "welcomeStartCoding": "Commencer à coder",
    "welcomeHowItWorks": "Comment ça marche",
    "welcomeStep1Title": "Ouvrez dans votre navigateur",
    "welcomeStep1Desc": "Aucun téléchargement ni configuration. Fonctionne sur tout appareil.",
    "welcomeStep2Title": "Écrivez du code Rust",
    "welcomeStep2Desc": "94 exercices des bases aux sujets avancés.",
    "welcomeStep3Title": "Obtenez un retour instantané",
    "welcomeStep3Desc": "La sortie du vrai compilateur vous dit exactement quoi corriger.",
    "welcomeWhatsInside": "Ce qu'il contient",
    "welcomeReadyTitle": "Prêt à commencer ?",
    "welcomeReadyDesc": "Lancez-vous et écrivez votre premier programme Rust en quelques secondes.",

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
    "getStarted": "Empezar",
    "logOut": "Cerrar sesión",
    "myAccount": "Mi cuenta",
    "noExerciseSelected": "Ningún ejercicio seleccionado",
    "user": "Usuario",
    
    // Info dialog
    "infoDescription": "Un cuaderno interactivo para aprender Rust. Trabaja en {count} ejercicios que cubren variables, funciones, propiedad, tiempos de vida y más.",
    "perfectFor": "Perfecto para:",
    "useCase1": "Aprender a programar",
    "useCase2": "Aprender Rust",
    "useCase3": "Preparación de entrevistas",
    "peopleUsed": "{count} personas han usado este cuaderno.",
    "forEducators": "Para educadores",
    "eduRates": "Las instituciones educativas obtienen tarifas especiales.",
    
    // Educators dialog
    "educatorsDescription": "El cuaderno de Rust funciona en el navegador sin configuración. Los estudiantes pueden empezar a programar de inmediato.",
    "educatorsExercises": "94 ejercicios desde lo básico hasta temas avanzados. Usa el compilador real de Rust.",
    "getInTouch": "Contáctanos",
    
    // Learn page
    "learnPageTitle": "Aprender Rust - Cuaderno de Rust",
    "learnSubtitle": "Un cuaderno interactivo para aprender Rust",
    "learnTryNow": "Pruébalo ahora",
    "learnWhyTitle": "¿Por qué Cuaderno de Rust?",
    "learnFeature1Title": "94 ejercicios interactivos",
    "learnFeature1Desc": "Desde lo básico hasta temas avanzados como tiempos de vida, punteros inteligentes y macros.",
    "learnFeature2Title": "Sin instalación",
    "learnFeature2Desc": "Funciona en el navegador. Sin instalación necesaria. Empieza a programar en segundos.",
    "learnFeature3Title": "Pistas y guía",
    "learnFeature3Desc": "Obtén ayuda cuando estés atascado en cualquier ejercicio.",
    "learnFeature4Title": "Compilador Rust real",
    "learnFeature4Desc": "Compila y ejecuta código Rust real. No es una simulación.",
    "eduBenefit1": "Sin configuración — los estudiantes empiezan a programar de inmediato",
    "eduBenefit2": "Seguimiento del progreso de cada estudiante",
    "eduBenefit3": "94 ejercicios que cubren todo el plan de estudios de Rust",
    "eduBenefit4": "Funciona en cualquier dispositivo con navegador",
    
    // Welcome page
    "welcomePageTitle": "Cuaderno de Rust - Aprende Rust practicando",
    "welcomeSubtitle": "Aprende Rust con ejercicios de programación prácticos. Sin configuración, sin instalación — solo abre y empieza a escribir código.",
    "welcomeStartCoding": "Empezar a programar",
    "welcomeHowItWorks": "Cómo funciona",
    "welcomeStep1Title": "Abre en tu navegador",
    "welcomeStep1Desc": "Sin descargas ni configuración. Funciona en cualquier dispositivo.",
    "welcomeStep2Title": "Escribe código Rust",
    "welcomeStep2Desc": "94 ejercicios desde lo básico hasta temas avanzados.",
    "welcomeStep3Title": "Obtén retroalimentación instantánea",
    "welcomeStep3Desc": "La salida del compilador real te dice exactamente qué corregir.",
    "welcomeWhatsInside": "Qué incluye",
    "welcomeReadyTitle": "Listo para empezar?",
    "welcomeReadyDesc": "Salta y escribe tu primer programa en Rust en segundos.",

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
