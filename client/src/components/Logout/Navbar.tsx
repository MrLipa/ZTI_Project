import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaSun } from 'react-icons/fa';
import { useState } from 'react';
import Flags from "country-flag-icons/react/3x2";

const NavigationBar = () => {
  const flagStyles = { width: '25px', height: '25px'};
  const polandFlag = <Flags.PL style={flagStyles} />;
  const ukFlag = <Flags.GB style={flagStyles} />;
  const germanyFlag = <Flags.DE style={flagStyles} />;

  const [selectedFlag, setSelectedFlag] = useState(polandFlag);

  const handleFlagChange = (flag: any) => {
    setSelectedFlag(flag);
  };
  
  return (
    <Navbar bg="transparent" variant="light" expand="md" style={{marginLeft: '7vw',marginRight: '7vw', paddingTop: '7vh'}}>
      <Navbar.Brand href="#" className="brand-name" style={{fontSize: '40px'}}>Travelever</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-between">
        <Nav className="mx-auto" style={{fontSize: '25px'}}>
          <Nav.Link href="/" className='mx-4'>Home</Nav.Link>
          <Nav.Link href="/help" className='mx-4'>Help</Nav.Link>
          <Nav.Link href="/login" className='mx-4'>Login</Nav.Link>
          <Nav.Link href="/register" className='mx-4'>Register</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown className="transparent-dropdown" title={selectedFlag}>
            <NavDropdown.Item style={{width:'70px'}} onClick={() => handleFlagChange(polandFlag)}>{polandFlag} 🇵🇱</NavDropdown.Item>
            <NavDropdown.Item  style={{width:'70px'}} onClick={() => handleFlagChange(ukFlag)}>{ukFlag} 🇬🇧</NavDropdown.Item>
            <NavDropdown.Item  style={{width:'70px'}} onClick={() => handleFlagChange(germanyFlag)}>{germanyFlag} 🇩🇪</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <FaSun className="sun-icon mx-4" />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar;