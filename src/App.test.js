import React from 'react';
import NavBar from './components/navbar';
import Map from './components/map';
import { shallow } from 'enzyme';

it('navbar renders without crashing', () => {
  const mount = shallow(<NavBar refetch={() => {}} registers={[]} history={{ push: () => {} }} />);
});

it('map renders without crashing', () => {
  const mount = shallow(<Map className="" />);
});
