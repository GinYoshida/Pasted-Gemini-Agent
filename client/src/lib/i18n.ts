import translations from "./translations.json";

export type Language = "ja" | "en";
export type TranslationKey = keyof typeof translations.ja;

export function t(lang: Language, section: TranslationKey, key: string): string {
  const sectionData = (translations[lang] as any)[section];
  if (!sectionData) return key;
  return sectionData[key] || key;
}

export default translations;
