import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './index';

it('navbar renders without crashing', () => {
  shallow(<NavBar refetch={() => {}} registers={[]} history={{ push: () => {} }} />);
});
