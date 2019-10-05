import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import RegisterForm from '../registerform';
import ArtifactForm from '../artifactform';
import Settings from '../settings';
import styled from './index.module.scss';

// overwrite some css in the DropDown menu
import './index.scss';

function AirLoomNavbar({ refetchRegisters, registers, history }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showArtifactModal, setShowArtifactModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const selectRegister = 'SELECT REGISTER';
  const [registerSelect, setRegisterSelect] = useState(selectRegister);
  const [registerDisplay, setRegisterDisplay] = useState(selectRegister);
  const [isAdmin, setIsAdmin] = useState(false);
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
        {isAdmin ? (
          <>
            <Nav.Link
              className={styled['text-modifier']}
              onClick={() => {
                setShowArtifactModal(true);
              }}
            >
              ADD ARTIFACT
            </Nav.Link>
            <Nav.Link
              className={styled['text-modifier']}
              onClick={() => {
                setShowSettingsModal(true);
              }}
            >
              SETTINGS
            </Nav.Link>
          </>
        ) : (
          <></>
        )}
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
                    setIsAdmin(register.is_admin);
                    redirect('')();
                  }}
                >
                  {register.name}
                </NavDropdown.Item>
              );
            })}
            {hasRegisters && <NavDropdown.Divider />}
            <NavDropdown.Item
              onClick={() => {
                setShowRegisterModal(true);
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
        showModal={showRegisterModal}
        setShowModal={setShowRegisterModal}
      />
      <ArtifactForm
        registerId={registerSelect}
        showModal={showArtifactModal}
        setShowModal={setShowArtifactModal}
      />
      <Settings
        registerId={registerSelect}
        showModal={showSettingsModal}
        setShowModal={setShowSettingsModal}
      />
    </Navbar>
  );
}

AirLoomNavbar.propTypes = {
  refetchRegisters: PropTypes.func.isRequired,
  registers: PropTypes.arrayOf( 
    PropTypes.shape(
      PropTypes.number.isRequired,
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired
    ).isRequired
  ).isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(AirLoomNavbar);
