// @flow
import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import MainPage from './components/dashboard/MainPage';
import SignUp from './components/user/SignUp';
import CreateProblem from './components/problem/CreateProblem';
import { SnackbarProvider } from 'notistack';
import EditProblem from "./components/problem/EditProblem";
import MuniPage from './components/dashboard/MuniPage';
import MuiTable from './components/util/MuiTable'

export default () => (
  <SnackbarProvider maxSnack={3}>
    <HashRouter>
      <Fragment>
        <CssBaseline />
        <NavBar />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/registrer-bruker" component={SignUp} />
          <Route exact path="/editp" component={EditProblem} />
          <Route exact path="/editbruker" component={MainPage} />
          <Route exact path="/lagproblem" component={CreateProblem}/>
          <Route exact path="/muiTable" component={MuiTable}/>
          {/*<Route exact path="/:municipality" component={MuniPage} /> Kommunenavn og fylket*/}
        </Switch>
        <Footer />
      </Fragment>
    </HashRouter>
  </SnackbarProvider>
);
