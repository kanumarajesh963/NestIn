"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANGUAGE,
  strings,
  type Language,
  type Strings,
} from "@nestin/shared";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Strings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "nestin-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && stored in strings) setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  };

  const value = useMemo(
    () => ({ language, setLanguage, t: strings[language] }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
