import React from 'react';
import { shallow } from 'enzyme';
import Map from './components/map';

it('map renders without crashing', () => {
  shallow(<Map className="" />);
});
