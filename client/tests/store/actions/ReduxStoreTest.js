//@flow

import React from 'react';
import { shallow, mount } from 'enzyme';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { shape } from 'prop-types';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import * as actions from './mockActions/'
import * as types from '../../constants/ActionTypes'

/**
* @Author Sindre H. Paulshus
* Unit test of the redux store
*/

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('>>> Redux: problemAction tests', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('+++ Store updates', () => {
    fetchMock.getOnce('/todos', {
      body: { todos: ['do something'] },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(actions.fetchTodos()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
  it('+++ ', () => {

  });
}
