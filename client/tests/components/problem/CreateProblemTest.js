//@flow

import React from 'react';
import { shallow, mount } from 'enzyme';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../src/store/reducers';
import CreateProblem from '../../../src/components/problem/CreateProblem.js';

import { signIn } from '../../../src/store/actions/userActions';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { shape } from 'prop-types';

/**
 * @Author Sindre H. Paulshus
 * Integration test of CreateProblem
 */

const options = {
  context: {
    router: {
      history: {
        push: jest.fn(),
        replace: jest.fn(),
        createHref: jest.fn()
      },
      route: {
        location: {
          hash: '',
          pathname: '',
          search: '',
          state: ''
        },
        match: {
          params: {},
          isExact: false,
          path: '',
          url: ''
        }
      }
    }
  },
  childContextTypes: {
    router: shape({
      route: shape({
        location: shape({}),
        match: shape({})
      }),
      history: shape({})
    })
  }
};

describe('>>> CreateProblem tests', () => {
  // it('+++ User is not logged in', () => {
  //   const store = createStore(rootReducer, applyMiddleware(thunk));
  //   const wrapper = mount(
  //     <div store={store(state)}>
  //       <CreateProblem />
  //     </div>,
  //     options
  //   );
  //   console.log('createProblem.debug()', wrapper.debug());
  //   expect(wrapper.find('Card')).toHaveLength(1);
  //   expect(wrapper.find('Typography')).toHaveLength(1); //desc
  //   expect(wrapper.find('Button')).toHaveLength(1); //back
  // });
  // it('+++ User is logged in', () => {
  //   const storeLoggedIn = createStore(rootReducer, applyMiddleware(thunk));
  //   storeLoggedIn.dispatch({ type: 'SIGN_IN_SUCCESS', payload: { userId: 1, priority: 'Administrator' }});
  //   const wrapper = mount(<CreateProblem store={storeLoggedIn}/>, options);
  //   //store.dispatch({ type: 'SIGN_IN_SUCCESS', payload: { userId: 1, priority: 'Administrator' }});
  //   expect(wrapper.find('Card')).toHaveLength(1);
  //   expect(wrapper.find('Typography')).toHaveLength(1); //title
  //   expect(wrapper.find('Button')).toHaveLength(2); //next + prev
  // });
  // it('Writing in step 1', done => {
  //
  //   done();
  // });
  // it('Objects in step 2', done => {
  //   expect(wrapper.find('')).toHaveLength(1);
  //   done();
  // });
  // it('Writing in step 3', done => {
  //
  //   done();
  // });
  // it('Objects when finished', done => {
  //   expect(wrapper.find(Card)).toHaveLength(1);
  //   expect(wrapper.find(Typography)).toHaveLength(1);
  //   expect(wrapper.find(Button)).toHaveLength(1);
  //   done();
  // });
  // after(() => {
  //   mount.cleanUp();
  // });
});
