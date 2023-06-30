import React, { useRef, useContext } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useToast } from "../context/ToastProvider";

/**
 * @typedef {Object} SettingsIcon
 * @description This React component represents a settings icon. 
 * When clicked, it reveals a menu with theme toggling and logout options.
 * It makes use of various hooks and contexts to handle translation, navigation, theme changes, and logging out.
 */
const SettingsIcon = () => {
  const op = useRef<OverlayPanel | null>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation('translations');
  const { showToast } = useToast();
  const navigate = useNavigate();
  const logout = useLogout();

  /**
   * @typedef {Object} signOut
   * @description This async function signs the user out by invoking the logout hook, 
   * then navigates to the homepage and shows a successful logout toast notification.
   */
  const signOut = async () => {
      await logout();
      navigate('/');
      showToast("success", "Success", "Logout successfully");
  }

  /**
   * @typedef {Object} settings
   * @description This is an array that holds the settings options for the OverlayPanel Menu.
   * Each setting has a label (which is translated), an icon, and a command that is executed when the setting is clicked.
   * Currently, it holds two settings: Theme and Logout.
   */
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

export {SettingsIcon};
