import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from './index.module.scss';

function Nav({ registerId }) {
  return (
    <div className={styled.nav}>
      <div className={styled.logo}>airloom</div>
      <ButtonToolbar className={styled['button-toolbar']}>
        <Button href="/" className={styled.button}>
          Home
        </Button>
        {registerId !== undefined ? (
          <>
            <LinkContainer to={`/list/${registerId}`}>
              <Button className={styled.button}>List</Button>
            </LinkContainer>
            <LinkContainer to={`/map/${registerId}`}>
              <Button className={styled.button}>Map</Button>
            </LinkContainer>
            <LinkContainer to={`/timeline/${registerId}`}>
              <Button className={styled.button}>Timeline</Button>
            </LinkContainer>
          </>
        ) : (
          <></>
        )}
      </ButtonToolbar>
    </div>
  );
}

export default Nav;
