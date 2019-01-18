// @flow

//testing som bør utføres:

//sjekke at kartet rendres

import * as React from 'react';

import { shallow, mount } from 'enzyme';
import MapMarkers from '../../../src/components/map/MapMarkers';
import GoogleMapReact from 'google-map-react';
import { problems } from './testData';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../src/store/reducers';
import { getProblemsByMuni, goToProblemDetail } from '../../../src/store/actions/problemActions';

// $FlowFixMe
const store = createStore(rootReducer, applyMiddleware(thunk));

describe('MapMarkers', () => {
  store.dispatch(getProblemsByMuni('Trondheim', 'Trøndelag'));
  const wrapper = shallow(<MapMarkers includedProp="store" store={store} />);

  it('will start with currentProblemId= 1', () => {
    expect(wrapper.props().currentProblemId).toEqual(2);
  });

  it('will update currentProblemId', () => {
    store.dispatch(goToProblemDetail(3));
    expect(wrapper.props().currentProblemId).toEqual(3);
  });
});
