import React from 'react';
import styled from './index.module.scss';

function Home() {
  return (
    <> 
      <div className={styled["banner-top"]}/>
      <p className={styled["title"]}>
        WELCOME TO AIRLOOM
      </p>
      <div className={styled["banner-bottom"]}/>
    </>
  );
}

export default Home;
