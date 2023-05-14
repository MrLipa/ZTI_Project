import React, { useState, createContext } from 'react';
import Navbar from './Navbar';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import Flags from 'country-flag-icons/react/3x2';

export const AppContext = createContext();

function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState(<Flags.PL style={{ width: '25px', height: '25px' }} />);

  const changeSidebar = () => setSidebar(!sidebar);

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (selectedLanguage) => {
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
