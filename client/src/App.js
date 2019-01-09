// @flow
import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import MainPage from './components/dashboard/MainPage';
import SignUp from './components/user/SignUp';
import SignUpTest from './components/user/SignUpTest';

import { SnackbarProvider } from 'notistack';

type Props = {};

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
              <Route exact path="/registrer-bruker" component={SignUp } />
              <Route exact path="/editbruker" component={MainPage} />
              <Route exact path="/signup" component={MainPage} />
              <Route exact path="/signuptest" component={SignUpTest} />
            </Switch>
            <Footer />
          </Fragment>
        </HashRouter>
      </SnackbarProvider>
    );
  }
}

export default App;
