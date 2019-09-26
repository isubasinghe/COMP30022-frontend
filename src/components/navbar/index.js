import React, { useState } from 'react';
import { Navbar, Form, FormControl, NavDropdown, Nav, Button, NavItem } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

function AirLoomNavbar({ registers }) {
  const [registerSelect, setRegisterSelect] = useState('Select register');
  const hasRegisters = registers.length > 0;
  const selectedRegister = registerSelect !== 'Select register';
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">AirLoom</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {hasRegisters && selectedRegister && (
            <>
              <Nav.Link
                exact
                to={`/list/${registerSelect}`}
                className="list-nav-link"
                activeClassName="active-nav-list"
              >
                List View
              </Nav.Link>
              {/* Fix the rest and make css nice for the Nav.Link */}
              <Nav.Link tag={Link} to={`/map/${registerSelect}`}>
                Map View
              </Nav.Link>
              <Nav.Link tag={Link} to={`/timeline/${registerSelect}`}>
                Timeline view
              </Nav.Link>
            </>
          )}
          <NavDropdown title={registerSelect} id="basic-nav-dropdown">
            {registers.map(register => {
              return (
                <NavDropdown.Item
                  key={register.register_id}
                  onClick={() => setRegisterSelect(`${register.register_id}`)}
                >
                  {register.register_id}
                </NavDropdown.Item>
              );
            })}
            {hasRegisters && <NavDropdown.Divider />}
            <NavDropdown.Item>Add Register</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AirLoomNavbar;
