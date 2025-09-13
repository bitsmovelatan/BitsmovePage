import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  changeLanguage: (newLanguage: string) => void;
  t: (key: string, fallback?: string) => string;
  translations: any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to 'en'
    return localStorage.getItem('bitsmove-language') || 'en';
  });

  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations based on current language
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const translationModule = await import(`../translations/${language}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to English if translation file doesn't exist
        if (language !== 'en') {
          const fallbackModule = await import('../translations/en.json');
          setTranslations(fallbackModule.default);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('bitsmove-language', newLanguage);
  };

  const t = (key: string, fallback: string = ''): string => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return value || fallback || key;
  };

  const value: LanguageContextType = {
    language,
    changeLanguage,
    t,
    translations,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
