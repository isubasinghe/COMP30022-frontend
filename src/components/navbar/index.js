import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useLocalStorage } from 'react-use';
import RegisterForm from '../registerform';
import NewArtifactForm from '../newartifactform';
import Settings from '../settings';
import Logo from '../../assets/favicon.svg';
import styled from './index.module.scss';

// overwrite some css in the DropDown menu
import './index.scss';

const KEY_SELECT_REGISTER = 'AIRLOOMNAVBAR_SELECT_REGISTER';
const KEY_DISPLAY_REGISTER = 'AIRLOOMNAVBAR_DISPLAY_REGISTER';
const SELECT_REGISTER = 'SELECT REGISTER';

const KEY_IS_ADMIN = 'AIRLOOMNAVBAR_IS_ADMIN';
const IS_ADMIN = false;

function AirLoomNavbar({ refetchRegisters, registers, history }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showArtifactModal, setShowArtifactModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [registerSelect, setRegisterSelect] = useLocalStorage(KEY_SELECT_REGISTER, SELECT_REGISTER);
  const [registerDisplay, setRegisterDisplay] = useLocalStorage(
    KEY_DISPLAY_REGISTER,
    SELECT_REGISTER
  );
  const [isAdmin, setIsAdmin] = useLocalStorage(KEY_IS_ADMIN, IS_ADMIN);
  const hasRegisters = registers.length > 0;
  const selectedRegister = registerSelect !== SELECT_REGISTER;

  const redirect = location => {
    return () => {
      history.push(location);
    };
  };

  const logout = () => {
    Auth.signOut();
  };
  const styledLink = `${styled['text-modifier']} hover-link`;
  return (
    <Navbar className={styled['navbar-main']} expand="lg">
      <Navbar.Brand className={`${styled['home-nav-link']} hover-link`} onClick={redirect('')}>
        <img className={styled.logo} src={Logo} alt="Airloom" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {hasRegisters && selectedRegister && (
            <>
              <Nav.Link className={styledLink} onClick={redirect(`/list/${registerSelect}`)}>
                LIST
              </Nav.Link>
              <Nav.Link className={styledLink} onClick={redirect(`/map/${registerSelect}`)}>
                MAP
              </Nav.Link>
              <Nav.Link className={styledLink} onClick={redirect(`/timeline/${registerSelect}`)}>
                TIMELINE
              </Nav.Link>
            </>
          )}
        </Nav>
        {isAdmin ? (
          <>
            <Nav.Link
              className={styledLink}
              onClick={() => {
                setShowArtifactModal(true);
              }}
            >
              ADD ARTIFACT
            </Nav.Link>
            <Nav.Link
              className={styledLink}
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
            className={`${styled['text-modifier']}`}
            title={registerDisplay}
            id="basic-nav-dropdown"
            alignRight
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
      <NewArtifactForm
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(AirLoomNavbar);
