import React from 'react';
import styled from './index.module.scss';

function Error() {
  return (
    <div className={styled['container']}>
      <p className={styled['oops-text']}>Whoops! Something went wrong with your request!</p>
      <p className={styled['oops-text']}>Please try again</p>
    </div>
  );
}

export default Error;
