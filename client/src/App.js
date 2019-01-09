// @flow
import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import MainPage from './components/dashboard/MainPage';
import SignUp from './components/user/SignUp';
import SimpleMap from './components/layout/GoogleMap';
import { SnackbarProvider } from 'notistack';

export default () => (
  <SnackbarProvider maxSnack={3}>
    <HashRouter>
      <Fragment>
        <CssBaseline />
        <NavBar />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/registrer-nybruker" component={SignUp} />
          <Route exact path="/editbruker" component={MainPage} />
          <Route exact path="/map" component={SimpleMap} />
        </Switch>
        <Footer />
      </Fragment>
    </HashRouter>
  </SnackbarProvider>
);