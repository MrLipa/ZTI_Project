import React, { useRef, useContext } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from 'react-i18next';

const SettingsIcon = () => {
  const op = useRef(null);
  const { theme, currentTheme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation('translations');

  const settings = [
    {
      label: t("Theme"),
      icon: theme === 1 ? "pi pi-sun" : "pi pi-moon",
      command: () => {
        toggleTheme(theme === 0 ? 1 : 0);
      },
    },
    { 
      label: t("Logout"), 
      icon: "pi pi-fw pi-sign-out",
      command: () => {
        toggleTheme(theme === 0 ? 1 : 0);
      },
    },
  ];

  return (
    <div>
      <i
        className={`pi pi-cog`}
        style={{ fontSize: "2rem" }}
        onClick={(e) => op.current.toggle(e)}
      ></i>
      <OverlayPanel
        ref={op}
        id={`cog-menu`}
        showCloseIcon={false}
        dismissable={true}
      >
        <Menu model={settings} />
      </OverlayPanel>
    </div>
  );
};

export default SettingsIcon;
