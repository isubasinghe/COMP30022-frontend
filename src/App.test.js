import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './components/navbar';
import Map from './components/map';

it('navbar renders without crashing', () => {
  shallow(<NavBar refetch={() => {}} registers={[]} history={{ push: () => {} }} />);
});

it('map renders without crashing', () => {
  shallow(<Map className="" />);
});
