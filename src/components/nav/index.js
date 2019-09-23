import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import styled from './index.module.scss';

function Nav({ registerId }) {
  return (
    <ButtonToolbar>
      {registerId !== undefined ? (
        <ul className={styled['list-component']}>
          <li className={styled['list-element']}><Button href="/">Home</Button></li>
          <li className={styled['list-element']}><Button href={`/list/${registerId}`}>List</Button></li>
          <li className={styled['list-element']}><Button href={`/map/${registerId}`}>Map</Button></li>
          <li className={styled['list-element']}><Button href={`/timeline/${registerId}`}>Timeline</Button></li>
        </ul>
      ) : (
        <Button href="/">Home</Button>
      )}
    </ButtonToolbar>
  );
}

export default Nav;
