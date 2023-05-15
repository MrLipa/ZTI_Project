import React, { useState } from 'react';

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
  const [language, setLanguage] = useState('pl');

  function toggleLanguage(newLanguage: string) {
    setLanguage(newLanguage);
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
