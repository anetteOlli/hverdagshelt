// @flow
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../src/store/reducers';
import ChangePassword from '../../../src/components/user/ChangePassword';
import { signIn } from '../../../src/store/actions/userActions';
import { Link, Redirect } from 'react-router-dom';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { createMount } from '@material-ui/core/test-utils';
import { createShallow } from '@material-ui/core/test-utils';
import { createRender } from '@material-ui/core/test-utils';
import { withStyles } from '@material-ui/core/styles';
import { shape } from 'prop-types';

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

// $FlowFixMe
const store = createStore(rootReducer, applyMiddleware(thunk));

//sjekke om confirm passord er likt som første Passord
//sjekke om passord er lengre enn 6 karakterer
//sjekke at passord ikke er identisk med gammelt Passord
//sjekke at man er signedIn eller har aksesstoken

describe('ChangePassword', () => {
  it('should not allow users that is not signed in to changepassword', () => {
    const wrapper = mount(<ChangePassword store={store} />, options);
    console.log('wrapper.children', wrapper.props());

    expect(wrapper.find('TextValidator')).toHaveLength(0);
  });

  it('should render if user is signed in', () => {
    store.dispatch(signIn({ email: 'sindre@sindre.sindre', password: 'sindre' }));
    const wrapper = mount(<ChangePassword store={store} />, options);
    console.log('wrapper.children', wrapper.debug());
    expect(wrapper.find('TextValidator')).toHaveLength(2);
  });
});
