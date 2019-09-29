import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from './index.module.scss';

function AirSpinner(props) {
  // eslint-disable-next-line dot-notation
  return <Spinner className={styled['loader']} animation="border" variant="primary" />;
}

export default AirSpinner;
