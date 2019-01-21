// @flow
import * as React from 'react';
import { mount } from 'enzyme';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../src/store/reducers';
import ChangePassword from '../../../src/components/user/ChangePassword';
import { signIn } from '../../../src/store/actions/userActions';
import { Link, Redirect } from 'react-router-dom';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { createShallow } from '@material-ui/core/test-utils';

import { shape } from 'prop-types';

//denne må brukes hvis du får feilmelding, om at den krever en Router:
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

//sjekke om confirm passord er likt som første Passord
//sjekke om passord er lengre enn 6 karakterer
//sjekke at passord ikke er identisk med gammelt Passord
//sjekke at man er signedIn eller har aksesstoken

// it('gives errorMessage if the the two text inputs are different', () => {
//   store.dispatch(signIn({ email: 'sindre@sindre.sindre', password: 'sindre' }));
//   const wrapper = mount(<ChangePassword store={store} />, options);
//
//   let inputPassword = wrapper
//     .find('TextValidator')
//     .find('input')
//     .find('[name="password"]');
//
//   let inputPasswordCnf = wrapper
//     .find('TextValidator')
//     .find('input')
//     .find('[name="cnfPassword"]');
//   inputPassword.simulate('change', { target: { value: '123456' } });
//   console.log(wrapper.degub());
//   expect(inputPassword.prop('error')).toBe('');
// });

// må lage et store objekt, i dette tilfellet er det våres ekte reducers som fores inn
//Invariant Violation: Could not find "store" in either the context or props of "Connect(WithStyles(Component))".
//Either wrap the root component in a <Provider>,
//or explicitly pass "store" as a prop to "Connect(WithStyles(Component))"

// DETTE ER EN INTEGRASJONSTEST, IKKE EN ENHETSTEST: PGA AT DEN IKKE BRUKER MOCK REDUX.

describe('ChangePassword', () => {
  it('should not allow users that is not signed in to changepassword', () => {
    // $FlowFixMe
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const wrapper = mount(<ChangePassword store={store} />);
    expect(wrapper.find('TextValidator')).toHaveLength(0);
  });

  it('should render if user is signed in', () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    let fungerer = false;
    store.dispatch(signIn({ email: 'a@a.a', password: 'aaaaaa', remember: 'false' })).then(resp => {
      if (resp.type === 'SIGN_IN_SUCCESS') {
        const wrapper = mount(<ChangePassword store={store} />);
        console.log('wrapper.debug()', wrapper.debug());
        fungerer = true;
        expect(wrapper.find('TextValidator')).toHaveLength(2);
      } else {
        console.log('resp.type', resp.type);
      }
      console.log('skriv ut noe da!');
      expect(fungerer).toBe(true);
    });
  });
});
