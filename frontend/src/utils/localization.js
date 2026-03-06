const PROFESSIONAL_TRANSLATIONS = {
  en: {
    singular: "Healthcare Professional",
    plural: "healthcare professionals",
  },
  es: {
    singular: "Profesional de la salud",
    plural: "profesionales de la salud",
  },
  fr: {
    singular: "Professionnel de sante",
    plural: "professionnels de sante",
  },
  pt: {
    singular: "Profissional de saude",
    plural: "profissionais de saude",
  },
  de: {
    singular: "Medizinische Fachkraft",
    plural: "medizinische Fachkrafte",
  },
};

const resolveLanguage = (locale) => {
  if (!locale || typeof locale !== "string") {
    return "en";
  }

  const normalized = locale.toLowerCase();
  const languageCode = normalized.split("-")[0];
  return PROFESSIONAL_TRANSLATIONS[languageCode] ? languageCode : "en";
};

export const getLocalizedProfessional = (form = "singular", locale) => {
  const safeLocale =
    locale ||
    (typeof navigator !== "undefined" && navigator.language ? navigator.language : "en");
  const language = resolveLanguage(safeLocale);
  return PROFESSIONAL_TRANSLATIONS[language][form] || PROFESSIONAL_TRANSLATIONS.en[form];
};
