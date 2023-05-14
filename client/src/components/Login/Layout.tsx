import React, { useState, createContext, ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import Flags from 'country-flag-icons/react/3x2';

interface ContextType {
    sidebar: boolean;
    changeSidebar: () => void;
    theme: string;
    changeTheme: () => void;
    language: ReactNode;
    changeLanguage: (selectedLanguage: ReactNode) => void;
}

export const AppContext = createContext<ContextType | undefined>(undefined);

function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState(<Flags.PL style={{ width: '25px', height: '25px' }} />);

  const changeSidebar = () => setSidebar(!sidebar);

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (selectedLanguage: any) => {
    setLanguage(selectedLanguage);
  };

  const appContextValue = {
    sidebar,
    changeSidebar,
    theme,
    changeTheme,
    language,
    changeLanguage,
  };
  
  return (
    <AppContext.Provider value={appContextValue}>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <div style={{ marginLeft: sidebar ? '260px' : '0px', transition: `margin-left 350ms` }}>
          <Outlet />
        </div>
        <div style={{ marginLeft: sidebar ? '250px' : '0px', transition: `margin-left 600ms`, marginTop: 'auto' }}>
          <Footer />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default Layout;
