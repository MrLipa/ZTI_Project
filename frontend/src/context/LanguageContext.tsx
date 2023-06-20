import React, { useState, FC } from "react";
import i18next from "i18next";
import cookies from "js-cookie";
import Flags from "country-flag-icons/react/3x2";

interface Props {
  children: React.ReactNode;
}
interface LanguageContextProps {
  language: string;
  flag: JSX.Element;
  toggleLanguage: (newLanguage: string) => void;
}
const flagStyles: React.CSSProperties = {
  width: "40px",
  height: "30px",
};
const flags: Record<string, JSX.Element> = {
  pl: <Flags.PL style={flagStyles} />,
  en: <Flags.GB style={flagStyles} />,
  de: <Flags.DE style={flagStyles} />,
};
export const LanguageContext = React.createContext<LanguageContextProps>({
  language: "",
  flag: <></>,
  toggleLanguage: () => {},
});

const LanguageProvider: FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState(cookies.get("i18next") || "en");

  function toggleLanguage(newLanguage: string) {
    setLanguage(newLanguage);
    console.log(newLanguage);
    i18next.changeLanguage(newLanguage);
  }

  const contextValue: LanguageContextProps = {
    language,
    flag: flags[language] || <></>,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
