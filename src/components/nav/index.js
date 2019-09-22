import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Nav({ registerId }) {
  return (
    <ButtonToolbar>
      <Button href="/">Home</Button>
      {registerId !== undefined ? (
        <>
          <LinkContainer to={`/list/${registerId}`}>
            <Button>List</Button>
          </LinkContainer>
          <LinkContainer to={`/map/${registerId}`}>
            <Button>Map</Button>
          </LinkContainer>
          <LinkContainer to={`/timeline/${registerId}`}>
            <Button>Timeline</Button>
          </LinkContainer>
        </>
      ) : null}
    </ButtonToolbar>
  );
}

export default Nav;
