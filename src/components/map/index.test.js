import React from 'react';
import { shallow } from 'enzyme';
import Map from './index';

it('map renders without crashing', () => {
  shallow(<Map className="" />);
});
