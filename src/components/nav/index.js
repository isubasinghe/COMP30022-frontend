import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

function Nav({ registerId }) {
  return (
  <ButtonToolbar>
    <Button href="/">Home</Button>
    { (registerId !== undefined) 
      ? (
          <>
            <Button href={`/list/${registerId}`}>List</Button>    
            <Button href={`/map/${registerId}`}>Map</Button>
            <Button href={`/timeline/${registerId}`}>Timeline</Button>
          </>
        )
      : null
    }
  </ButtonToolbar>
  );
}

export default Nav;
