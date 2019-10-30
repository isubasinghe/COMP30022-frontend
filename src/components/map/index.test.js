import React from 'react';
import { shallow } from 'enzyme';
import Map from './index';

const artifact = {
  artifact_id: 0,
  register_id: 0,
  lat: '0.00',
  lon: '0.00',
  name: '',
  description: ''
};

it('map renders without crashing', () => {
  shallow(<Map className="" />);
});

it('map renders map of artifacts of length 0', () => {
  shallow(<Map className="" artifacts={[]} displayPopups />);
});

it('map renders map of artifacts of length 1', () => {
  shallow(<Map className="" artifacts={[artifact]} displayPopups />);
});

it('map renders map of artifacts of length 2', () => {
  shallow(<Map className="" artifacts={[artifact, artifact]} displayPopups />);
});

it('map renders map of artifacts of length >= 3', () => {
  const artifactList = [artifact, artifact, artifact];
  for (let i = 0; i < 10; i += 1) {
    shallow(<Map className="" artifacts={artifactList} displayPopups />);
    artifactList.push(artifact);
  }
});
