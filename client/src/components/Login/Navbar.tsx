import React, { useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';
import Flags from "country-flag-icons/react/3x2";
import { SidebarContext } from './Layout';
import { ThemeContext } from './../ThemeContext';
import { LanguageContext } from './../LanguageContext';

interface FlagProps {
  style: React.CSSProperties;
}

interface FlagsType {
  [key: string]: React.ReactElement<FlagProps>;
}

function NavigationBar() {
  const { sidebar, toggleSidebar } = useContext(SidebarContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  const flagStyles = { width: '25px', height: '25px' };

  const flags: FlagsType = {
    "pl": <Flags.PL style={flagStyles} />,
    "gb": <Flags.GB style={flagStyles} />,
    "de": <Flags.DE style={flagStyles} />,
  };

  return (
    <>
      <Navbar className='navbar justify-content-between'>
        <div>
          <FaIcons.FaBars onClick={ toggleSidebar } className="mx-3 fs-4 text-white"/>
        </div>
        <Form className="search-bar-container d-flex align-items-center">
          <FormControl type="text" placeholder="Search"  style={{marginLeft:'300px', width:'700px'}}/>
          <Button variant="outline-light">Search</Button>
        </Form>
        <div className="d-flex align-items-center">
          <Nav>
            <NavDropdown className="transparent-dropdown" title={flags[language]}>
              <NavDropdown.Item style={{width:'70px'}} onClick={() => toggleLanguage("pl")}>{flags["pl"]} 🇵🇱</NavDropdown.Item>
              <NavDropdown.Item style={{width:'70px'}} onClick={() => toggleLanguage("gb")}>{flags["gb"]} 🇬🇧</NavDropdown.Item>
              <NavDropdown.Item style={{width:'70px'}} onClick={() => toggleLanguage("de")}>{flags["de"]} 🇩🇪</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {darkTheme ? (
            <FaMoon className="moon-icon mx-4" onClick={toggleTheme} />
          ) : (
            <FaSun className="sun-icon mx-4" onClick={toggleTheme} />
          )}
        </div>
      </Navbar>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul>

          <li className='navbar-brand mb-5 mt-5 list-unstyled text-white'>
            <FaIcons.FaPlane />
            <span>TRAVEL</span>
          </li>

          {SidebarData.map((item, index) => {
          return (
              <li key={index} className="list-unstyled my-4">
                <Link to={item.path} className="text-white text-decoration-none">
                  {item.icon}
                  <span className="mx-2">{item.title}</span>
                </Link>
              </li>
            );
          })}

          <li className='list-unstyled mx-4 my-5 py-5'>
            <FaIcons.FaArrowLeft
              onClick={ toggleSidebar }
              className="text-white fs-4"
            />
          </li>

        </ul>
      </nav>
    </>
  );
}

export default NavigationBar;
