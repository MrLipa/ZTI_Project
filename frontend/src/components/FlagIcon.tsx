import React, { useRef, useContext } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menu } from 'primereact/menu';
import { LanguageContext } from "../context/LanguageContext";
import Flags from "country-flag-icons/react/3x2";
import { useTranslation } from 'react-i18next';

const FlagIcon = () => {
  const op = useRef(null);
  const { language, flag, toggleLanguage } = useContext(LanguageContext);
  const { t } = useTranslation('translations');

  const flagStyles: React.CSSProperties = {
    width: "25px",
    height: "25px",
    marginRight: "9px",
  };

  const languageOptions = [
    {
      label: t('Polish'),
      icon: <Flags.PL style={flagStyles} />,
      command: () => {
        toggleLanguage("pl");
      },
    },
    {
      label: t('English'),
      icon: <Flags.GB style={flagStyles} />,
      command: () => {
        toggleLanguage("en");
      },
    },
    {
      label: t('German'),
      icon: <Flags.DE style={flagStyles} />,
      command: () => {
        toggleLanguage("de");
      },
    },
  ];

  return (
    <div>
      <i onClick={(e) => op.current.toggle(e)}>{flag}</i>
      <OverlayPanel
        ref={op}
        id={`globe-menu`}
        showCloseIcon={false}
        dismissable={true}
      >
        <Menu model={languageOptions} />
      </OverlayPanel>
    </div>
  );
};

export default FlagIcon;
