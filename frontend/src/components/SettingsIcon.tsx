import React, { useRef, useContext } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useToast } from "../context/ToastProvider";

const SettingsIcon = () => {
  const op = useRef<OverlayPanel | null>(null);
  const { theme, currentTheme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation('translations');
  const { showToast } = useToast();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
      await logout();
      navigate('/');
      showToast("success", "Success", "Logout successfully");
  }

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
        signOut()
      },
    },
  ];

  return (
    <div>
      <i
        className={`pi pi-cog`}
        style={{ fontSize: "2rem" }}
        onClick={(e) => op.current?.toggle(e)}
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
