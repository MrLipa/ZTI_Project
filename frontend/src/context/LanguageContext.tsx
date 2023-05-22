import React, { useState } from 'react';
import i18next from 'i18next'
import cookies from 'js-cookie'

interface Props {
  children: React.ReactNode;
}

interface LanguageContextProps {
  language: string;
  toggleLanguage: (newLanguage: string) => void;
}

export const LanguageContext = React.createContext<LanguageContextProps>({
  language: '',
  toggleLanguage: () => {}
});

const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState(cookies.get('i18next') || 'en');

  function toggleLanguage(newLanguage: string) {
    setLanguage(newLanguage);
    console.log(newLanguage);
    i18next.changeLanguage(newLanguage)
  }

  const contextValue: LanguageContextProps = {
    language,
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
