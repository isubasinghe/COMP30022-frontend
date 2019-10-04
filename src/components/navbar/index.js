import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import RegisterForm from '../registerform';
import styled from './index.module.scss';

// overwrite some css in the DropDown menu
import './index.scss';

function AirLoomNavbar({ refetchRegisters, registers, history }) {
  const [showModal, setShowModal] = useState(false);
  const selectRegister = 'SELECT REGISTER';
  const [registerSelect, setRegisterSelect] = useState(selectRegister);
  const [registerDisplay, setRegisterDisplay] = useState(selectRegister);
  const hasRegisters = registers.length > 0;
  const selectedRegister = registerSelect !== selectRegister;

  const redirect = location => {
    return () => {
      history.push(location);
    };
  };

  const logout = () => {
    Auth.signOut();
  };
  return (
    <Navbar className={styled['navbar-main']} expand="lg">
      <Navbar.Brand className={styled['home-nav-link']} onClick={redirect('')}>
        Airloom
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {hasRegisters && selectedRegister && (
            <>
              <Nav.Link
                className={styled['text-modifier']}
                onClick={redirect(`/list/${registerSelect}`)}
              >
                LIST
              </Nav.Link>
              <Nav.Link
                className={styled['text-modifier']}
                onClick={redirect(`/map/${registerSelect}`)}
              >
                MAP
              </Nav.Link>
              <Nav.Link
                className={styled['text-modifier']}
                onClick={redirect(`/timeline/${registerSelect}`)}
              >
                TIMELINE
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          <NavDropdown
            className={styled['text-modifier']}
            title={registerDisplay}
            id="basic-nav-dropdown"
          >
            {registers.map(register => {
              return (
                <NavDropdown.Item
                  key={register.register_id}
                  onClick={() => {
                    setRegisterSelect(`${register.register_id}`);
                    setRegisterDisplay(`${register.name}`);
                  }}
                >
                  {register.name} 
                </NavDropdown.Item>
              );
            })}
            {hasRegisters && <NavDropdown.Divider />}
            <NavDropdown.Item
              onClick={() => {
                setShowModal(true);
              }}
            >
              ADD REGISTER
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav.Link className={styled['text-modifier']} onClick={logout}>
          LOG OUT
        </Nav.Link>
      </Navbar.Collapse>
      <RegisterForm
        refetchRegisters={refetchRegisters}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Navbar>
  );
}

export default withRouter(AirLoomNavbar);
