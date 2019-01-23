// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import configureStore from './store/configStore';
import { refresh } from './store/actions/userActions';
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
  serviceWorker.register();
}
