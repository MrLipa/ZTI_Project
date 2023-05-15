import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import Flags from "country-flag-icons/react/3x2";
import { ThemeContext } from './../ThemeContext';
import { LanguageContext } from './../LanguageContext';

interface FlagProps {
  style: React.CSSProperties;
}

interface FlagsType {
  [key: string]: React.ReactElement<FlagProps>;
}

const NavigationBar: React.FC = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  const flagStyles: React.CSSProperties = { width: '25px', height: '25px' };

  const flags: FlagsType = {
    "pl": <Flags.PL style={flagStyles} />,
    "gb": <Flags.GB style={flagStyles} />,
    "de": <Flags.DE style={flagStyles} />,
  };

  return (
    <Navbar bg="transparent" variant="light" expand="md" style={{ marginLeft: '7vw', marginRight: '7vw', paddingTop: '7vh' }}>
      <Navbar.Brand href="#" className="brand-name" style={{ fontSize: '40px' }}>Travelever</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-between">
        <Nav className="mx-auto" style={{ fontSize: '25px' }}>
          <Nav.Link href="/" className='mx-4'>Home</Nav.Link>
          <Nav.Link href="/help" className='mx-4'>Help</Nav.Link>
          <Nav.Link href="/login" className='mx-4'>Login</Nav.Link>
          <Nav.Link href="/register" className='mx-4'>Register</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown className="transparent-dropdown" title={flags[language]}>
            <NavDropdown.Item style={{ width: '70px' }} onClick={() => toggleLanguage("pl")}>{flags["pl"]} 🇵🇱</NavDropdown.Item>
            <NavDropdown.Item style={{ width: '70px' }} onClick={() => toggleLanguage("gb")}>{flags["gb"]} 🇬🇧</NavDropdown.Item>
            <NavDropdown.Item style={{ width: '70px' }} onClick={() => toggleLanguage("de")}>{flags["de"]} 🇩🇪</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {darkTheme ? (
          <FaMoon className="moon-icon mx-4" onClick={toggleTheme} />
        ) : (
          <FaSun className="sun-icon mx-4" onClick={toggleTheme} />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
