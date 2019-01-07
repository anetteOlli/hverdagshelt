// @flow

import * as React from 'react';
import { Notify, storeToken, loadToken } from '../src/widgets.js';
import { shallow } from 'enzyme';
import { formatDate } from '../src/widgets';
import { ToastContainer } from 'react-toastify';

describe('Widgets tests', () => {
  it('correct formdate', () => {
    const date = new Date(2018, 11, 24, 10, 33, 30, 0);
    expect(formatDate(date)).toEqual('24/12/2018 - 10:33');
  });
});

describe('Token tests', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('correct sessionStorage', () => {
    storeToken(false, 'TestToken');
    expect(loadToken()).toEqual('TestToken');
  });
  it('correct localStorage', () => {
    storeToken(true, 'TestToken');
    expect(loadToken()).toEqual('TestToken');
  });
});

describe('Nofiy tests', () => {
  const wrapper = shallow(
    <ToastContainer
      id={'TestId'}
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  );
  const minProps = {
    type: 'info',
    message: 'Test'
  };
  it('correct init Nofify', () => {
      /*--- Check if the notification appers ---*/
      // $FlowFixMe
    expect(shallow(<Notify {...minProps} />).length).toEqual(1);
  });
  it('correct time', () => {
      // $FlowFixMe
      const notification = shallow(<Notify {...minProps} />);
    setTimeout(() => console.log('simulate time'), 5500);
    /*--- Check if the notification goes away after 5,5 secounds ---*/
    expect(wrapper.find('.Toastify__toast-container').length).toEqual(0);
  });
});