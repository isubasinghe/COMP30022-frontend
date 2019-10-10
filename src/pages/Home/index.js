/* eslint-disable dot-notation */
import React from 'react';
import styled from './index.module.scss';

function Home() {
  return (
    <>
      <div className={styled['container']}>
        <div className={styled['banner-top']} />
        <p className={styled.title}>WELCOME TO AIRLOOM</p>
        <h1 className={styled['description']}>A CLOUD BASED HEIRLOOM REGISTER</h1>
      </div>
      <div className={styled['banner-bottom']} />
    </>
  );
}

export default Home;
