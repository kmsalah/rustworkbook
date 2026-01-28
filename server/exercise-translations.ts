// Exercise translations for multi-language support
// Each exercise can have translated hints and code comments

export type SupportedLocale = "en" | "ar" | "fr" | "es";

interface ExerciseTranslation {
  hint: string;
  code: string;
}

// Translations organized by locale -> exerciseId
export const exerciseTranslations: Record<SupportedLocale, Record<string, ExerciseTranslation>> = {
  en: {}, // English is the default - stored in exercises-data.ts
  
  ar: {
    intro1: {
      hint: "ببساطة اضغط على زر تشغيل الكود لتنفيذ هذا البرنامج ورؤية النتيجة!",
      code: `// مرحباً بك في كتاب تمارين رست!
// اضغط على زر تشغيل الكود أعلاه لترجمة وتشغيل هذا البرنامج.

fn main() {
    println!("مرحباً بك في رحلتك مع رست!");
}
`,
    },
    intro2: {
      hint: "انظر بعناية إلى اسم الماكرو. الماكرو الصحيح لطباعة سطر هو println! - تحقق من الأخطاء الإملائية.",
      code: `// أصلح الخطأ الإملائي لجعل هذا البرنامج يترجم!

fn main() {
    prinltn!("جاهز لتعلم رست!");
}
`,
    },
    variables1: {
      hint: "في رست، تحتاج إلى الكلمة المفتاحية 'let' للإعلان عن متغير.",
      code: `// اجعل هذا الكود يترجم بإضافة الكلمة المفتاحية الصحيحة للإعلان عن متغير.

fn main() {
    score = 100;
    println!("نتيجتك هي {}", score);
}
`,
    },
    variables2: {
      hint: "يجب تهيئة المتغيرات قبل استخدامها. أعطِ قيمة للمتغير.",
      code: `// هذا البرنامج لن يترجم لأن المتغير ليس له قيمة.
// أعطه قيمة لإصلاح الخطأ!

fn main() {
    let temperature;
    if temperature > 30 {
        println!("الجو حار في الخارج!");
    } else {
        println!("الطقس لطيف.");
    }
}
`,
    },
    variables3: {
      hint: "افتراضياً، المتغيرات في رست غير قابلة للتغيير. استخدم الكلمة المفتاحية 'mut' لجعل المتغير قابلاً للتغيير.",
      code: `// هذا الكود يحاول تغيير متغير، لكن متغيرات رست غير قابلة للتغيير افتراضياً.
// أصلحه حتى تعمل إعادة التعيين!

fn main() {
    let count = 1;
    println!("العدد: {}", count);
    count = 2; // لا تغير هذا السطر
    println!("العدد: {}", count);
}
`,
    },
    variables4: {
      hint: "يمكنك 'إخفاء' متغير باستخدام 'let' مرة أخرى بنفس الاسم. هذا ينشئ متغيراً جديداً.",
      code: `// هذا الكود لديه نفس المشكلة كالتمرين السابق.
// لكن هذه المرة، استخدم التظليل بدلاً من التغييرية!

fn main() {
    let name = "مرحباً";
    println!("الاسم: {}", name);
    name = "عالم"; // لا تغير هذا السطر
    println!("الاسم: {}", name);
}
`,
    },
  },
  
  fr: {
    intro1: {
      hint: "Cliquez simplement sur le bouton Exécuter pour lancer ce programme et voir le résultat!",
      code: `// Bienvenue dans le Cahier d'exercices Rust!
// Cliquez sur le bouton Exécuter ci-dessus pour compiler et exécuter ce programme.

fn main() {
    println!("Bienvenue dans votre voyage Rust!");
}
`,
    },
    intro2: {
      hint: "Regardez attentivement le nom de la macro. La bonne macro pour imprimer une ligne est println! - vérifiez les fautes de frappe.",
      code: `// Corrigez la faute de frappe pour que ce programme compile!

fn main() {
    prinltn!("Prêt à apprendre Rust!");
}
`,
    },
    variables1: {
      hint: "En Rust, vous avez besoin du mot-clé 'let' pour déclarer une variable.",
      code: `// Faites compiler ce code en ajoutant le bon mot-clé pour déclarer une variable.

fn main() {
    score = 100;
    println!("Votre score est {}", score);
}
`,
    },
    variables2: {
      hint: "Les variables doivent être initialisées avant d'être utilisées. Assignez une valeur à la variable.",
      code: `// Ce programme ne compilera pas car la variable n'a pas de valeur.
// Donnez-lui une valeur pour corriger l'erreur!

fn main() {
    let temperature;
    if temperature > 30 {
        println!("Il fait chaud dehors!");
    } else {
        println!("Le temps est agréable.");
    }
}
`,
    },
    variables3: {
      hint: "Par défaut, les variables en Rust sont immuables. Utilisez le mot-clé 'mut' pour rendre une variable mutable.",
      code: `// Ce code essaie de modifier une variable, mais les variables Rust sont immuables par défaut.
// Corrigez-le pour que la réassignation fonctionne!

fn main() {
    let count = 1;
    println!("Compteur: {}", count);
    count = 2; // Ne modifiez pas cette ligne
    println!("Compteur: {}", count);
}
`,
    },
    variables4: {
      hint: "Vous pouvez 'masquer' une variable en utilisant 'let' à nouveau avec le même nom. Cela crée une nouvelle variable.",
      code: `// Ce code a le même problème que l'exercice précédent.
// Mais cette fois, utilisez le masquage au lieu de la mutabilité!

fn main() {
    let name = "Bonjour";
    println!("Nom: {}", name);
    name = "Monde"; // Ne modifiez pas cette ligne
    println!("Nom: {}", name);
}
`,
    },
  },
  
  es: {
    intro1: {
      hint: "¡Simplemente haz clic en el botón Ejecutar para ejecutar este programa y ver el resultado!",
      code: `// ¡Bienvenido al Cuaderno de Rust!
// Haz clic en el botón Ejecutar arriba para compilar y ejecutar este programa.

fn main() {
    println!("¡Bienvenido a tu viaje con Rust!");
}
`,
    },
    intro2: {
      hint: "Mira cuidadosamente el nombre de la macro. La macro correcta para imprimir una línea es println! - busca errores tipográficos.",
      code: `// ¡Corrige el error tipográfico para que este programa compile!

fn main() {
    prinltn!("¡Listo para aprender Rust!");
}
`,
    },
    variables1: {
      hint: "En Rust, necesitas la palabra clave 'let' para declarar una variable.",
      code: `// Haz que esto compile agregando la palabra clave correcta para declarar una variable.

fn main() {
    score = 100;
    println!("Tu puntuación es {}", score);
}
`,
    },
    variables2: {
      hint: "Las variables deben inicializarse antes de usarse. Asigna un valor a la variable.",
      code: `// Este programa no compilará porque la variable no tiene valor.
// ¡Dale un valor para corregir el error!

fn main() {
    let temperature;
    if temperature > 30 {
        println!("¡Hace calor afuera!");
    } else {
        println!("El clima es agradable.");
    }
}
`,
    },
    variables3: {
      hint: "Por defecto, las variables en Rust son inmutables. Usa la palabra clave 'mut' para hacer una variable mutable.",
      code: `// Este código intenta cambiar una variable, pero las variables de Rust son inmutables por defecto.
// ¡Arréglalo para que la reasignación funcione!

fn main() {
    let count = 1;
    println!("Cuenta: {}", count);
    count = 2; // No cambies esta línea
    println!("Cuenta: {}", count);
}
`,
    },
    variables4: {
      hint: "Puedes 'sombrear' una variable usando 'let' de nuevo con el mismo nombre. Esto crea una nueva variable.",
      code: `// Este código tiene el mismo problema que el ejercicio anterior.
// ¡Pero esta vez, usa el sombreado en lugar de la mutabilidad!

fn main() {
    let name = "Hola";
    println!("Nombre: {}", name);
    name = "Mundo"; // No cambies esta línea
    println!("Nombre: {}", name);
}
`,
    },
  },
};

// Helper function to get translated exercise content
export function getLocalizedExercise(
  exerciseId: string,
  locale: SupportedLocale,
  defaultHint: string,
  defaultCode: string
): { hint: string; code: string } {
  if (locale === "en") {
    return { hint: defaultHint, code: defaultCode };
  }
  
  const translation = exerciseTranslations[locale]?.[exerciseId];
  if (translation) {
    return translation;
  }
  
  // Fall back to English if no translation exists
  return { hint: defaultHint, code: defaultCode };
}
