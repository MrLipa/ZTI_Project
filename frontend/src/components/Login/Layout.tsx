import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

interface SidebarContextProps {
  sidebar: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = React.createContext<SidebarContextProps>({
  sidebar: false,
  toggleSidebar: () => {}
});

function Layout() {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar(!sidebar);

  const contextValue: SidebarContextProps = {
    sidebar,
    toggleSidebar
  };
  
  return (
    <SidebarContext.Provider value={contextValue}>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <div style={{ marginLeft: sidebar ? '260px' : '0px', transition: `margin-left 350ms` }}>
          <Outlet />
        </div>
        <div style={{ marginLeft: sidebar ? '250px' : '0px', transition: `margin-left 600ms`, marginTop: 'auto' }}>
          <Footer />
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export default Layout;
