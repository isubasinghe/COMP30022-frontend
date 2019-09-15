import React from 'react';
import './index.scss';

function Home() {
  return (<div>
               <home-button href='/map'>item list</home-button >
               <home-button href='/map'>timeline</home-button >
               <home-button href='/map'>map view</home-button >
               <home-button href='/map'>setting</home-button >
               <home-button href='/map'>log out</home-button >

         </div>
     );
}

export default Home;
