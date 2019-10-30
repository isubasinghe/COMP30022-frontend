import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './index';

it('navbar renders without crashing', () => {
  shallow(<NavBar refetch={() => {}} registers={[]} history={{ push: () => {} }} />);
});

it('navbar renders registers with empty names', () => {
  shallow(
    <NavBar
      refetch={() => {}}
      registers={[
        {
          register_id: 0,
          name: '',
          is_admin: false
        }
      ]}
      history={{ push: () => {} }}
    />
  );
});
