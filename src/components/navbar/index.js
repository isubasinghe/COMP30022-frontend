import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import RegisterForm from '../registerform';
import styled from './index.module.scss';

function AirLoomNavbar({ registers, history }) {
  const [showModal, setShowModal] = useState(false);
  const [registerSelect, setRegisterSelect] = useState('Select register');
  const hasRegisters = registers.length > 0;
  const selectedRegister = registerSelect !== 'Select register';

  const redirect = location => {
    return () => {
      history.push(location);
    };
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className={styled['home-nav-link']} onClick={redirect('')}>
        AirLoom
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {hasRegisters && selectedRegister && (
            <>
              <Nav.Link onClick={redirect(`/list/${registerSelect}`)}>List View</Nav.Link>
              <Nav.Link onClick={redirect(`/map/${registerSelect}`)}>Map View</Nav.Link>
              <Nav.Link onClick={redirect(`/timeline/${registerSelect}`)}>Timeline view</Nav.Link>
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
            <NavDropdown.Item
              onClick={() => {
                setShowModal(true);
              }}
            >
              Add Register
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <RegisterForm showModal={showModal} setShowModal={setShowModal} />
    </Navbar>
  );
}

export default withRouter(AirLoomNavbar);
