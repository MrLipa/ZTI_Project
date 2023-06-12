import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Avatar } from 'primereact/avatar';
import SearchBar from "./SearchBar";
import CustomIcon from "./CustomIcon";
import BellIcon from './BellIcon';
import { Divider } from 'primereact/divider';
import avatarImage from './1.jpg'; // Importuj obraz
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";  
import 'primeicons/primeicons.css';
import Flags from "country-flag-icons/react/3x2";



const Navbar = () => {
    const flagStyles: React.CSSProperties = { width: "25px", height: "25px", marginRight: "9px"};
    const language = [
        { label: 'Polski', icon: <Flags.PL style={flagStyles} /> },
        { label: 'Angielski', icon: <Flags.GB style={flagStyles} /> },
        { label: 'Niemiecki', icon: <Flags.DE style={flagStyles} /> }
    ];
    const settings = [
        { label: 'Theme', icon: 'pi pi-fw pi-palette' },
        { label: 'Logout', icon: 'pi pi-fw pi-sign-out' }
    ];
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <>
            <div className="navbar" style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
                <div className="navbar-icons-left" style={{display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '3vw' }}>
                    <h3 style={{ marginRight: '1rem' }}>Air Book</h3>
                    <i className="pi pi-bars" onClick={toggleSidebar} style={{ fontSize: '2rem', marginRight: '5rem' }} />
                </div>
                <div className="navbar-icons-right" style={{ marginRight: '3vw', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <SearchBar />
                    <BellIcon icon="bell" value="7" />
                    <CustomIcon menu={settings} icon="cog" />
                    <CustomIcon menu={language} icon="globe" />
                    <Avatar image={avatarImage} size="large" shape="circle" />
                </div>
            </div>
            
            <Sidebar className="custom-sidebar" visible={sidebarVisible} onHide={toggleSidebar} showCloseIcon={false}>
                <ul className="sidebar-menu">
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/home">
                            <i className="pi pi-home" />
                            <span> Home</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/home">
                        <i className="pi pi-users" />
                        <span> Help</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                    <Link className="sidebar-link" to="/home">
                        <i className="pi pi-calendar" />
                        <span> Profil</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                    <Link className="sidebar-link" to="/home">
                        <i className="pi pi-bookmark" />
                        <span> Search Flights</span>
                        </Link>
                    </li>
                    <Divider />
                    <li className="sidebar-item">
                    <Link className="sidebar-link" to="/home">
                        <i className="pi pi-cog" />
                        <span> Settings</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                    <Link className="sidebar-link" to="/home">
                        <i className="pi pi-cog" />
                        <span> Logout</span>
                        </Link>
                    </li>
                </ul>
            </Sidebar>

            <div className="content" style={{height: '100vh'}}>
               {/* Dodaj tutaj główną zawartość strony */}
            </div>

            <Footer />
        </>
    );
};

export default Navbar;
