// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import configureStore from './store/configStore';
import {refresh} from './store/actions/userActions';

const store = configureStore();
const root = document.getElementById('root');
store.dispatch(refresh());

if (root) {
  let render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
        <App />
        </SnackbarProvider>
      </Provider>,
      root
    );
  };

  if (module.hot) {
    module.hot.accept('./App', () => {
      setTimeout(render);
    });
  }

  render();
  serviceWorker.unregister();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

/*--- Reload application when not in production environment ---*/
/*
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}
*/
