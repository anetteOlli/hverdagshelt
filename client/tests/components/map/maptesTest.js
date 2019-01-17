// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import MapMarkers from '../../../src/components/map/MapMarkers';
import GoogleMapReact from 'google-map-react';

//testing som bør utføres:

//sjekke at kartet rendres
describe('articleForm tests', () => {
  const wrapper = shallow(<MapMarkers />);

  it('renders', () => {
    expect(wrapper.find('GoogleMapReact')).toHaveLength(1);
  });
});
