import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface TranslationContextType {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  handleLanguageChange: (selectedLanguage: string) => void;
}

// Create a new context with a default value
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Create a custom hook to use the language context
export function useLanguage(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useLanguage must be used within a TranslationProvider');
  }
  return context;
}

// Create a provider component to wrap the application and provide the language context
interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<string>("de");

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  // Value to be provided by the context
  const value = {
    language,
    setLanguage,
    handleLanguageChange,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}
