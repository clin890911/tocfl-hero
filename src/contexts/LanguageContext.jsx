import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    // Initialize from localStorage or default to 'id'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'id';
    }
    return 'id';
  });

  // Translation function
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];

    // Navigate through nested keys
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Key not found in current language, try Chinese fallback
        value = translations.zh;
        for (const fallbackK of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackK];
          } else {
            // Still not found, return the key itself
            return key;
          }
        }
        return value || key;
      }
    }

    return value || key;
  };

  // Setter that also saves to localStorage
  const setLang = (newLang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
