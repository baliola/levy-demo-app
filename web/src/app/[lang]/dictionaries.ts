import "server-only";
import type { IDictionaries } from "@/types/dictionaries";

const dictionaries = {
  en: (): Promise<IDictionaries> => import("./dictionaries/en").then((module) => module.default as IDictionaries),
  id: (): Promise<IDictionaries> => import("./dictionaries/id").then((module) => module.default as IDictionaries),
};

export type Locale = 'en' | 'id';

export const getDictionary = async (locale: Locale): Promise<IDictionaries> => dictionaries[locale]();
