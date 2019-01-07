// @flow
import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import MainPage from './components/dashboard/MainPage';

import { SnackbarProvider } from 'notistack';

type Props = {
  classes: Object
};

class App extends React.Component<Props> {
  render() {
    return (
      <SnackbarProvider maxSnack={3}>
        <HashRouter>
          <Fragment>
            <CssBaseline />
            <NavBar />
            <Switch>
              <Route exact path="/" component={MainPage} />
            </Switch>
            <Footer />
          </Fragment>
        </HashRouter>
      </SnackbarProvider>
    );
  }
}

export default App;
