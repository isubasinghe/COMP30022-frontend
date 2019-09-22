import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import './index.css';

function Nav({ registerId }) {
  return (
    <ButtonToolbar>
      {registerId !== undefined ? (
        <ul>
          <li><Button href="/">Home</Button></li>
          <li><Button href={`/list/${registerId}`}>List</Button></li>
          <li><Button href={`/map/${registerId}`}>Map</Button></li>
          <li><Button href={`/timeline/${registerId}`}>Timeline</Button></li>
        </ul>
      ) : (
        <Button href="/">Home</Button>
      )}
    </ButtonToolbar>
  );
}

export default Nav;
