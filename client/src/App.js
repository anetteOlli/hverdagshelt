// @flow
import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import MainPage from './components/dashboard/MainPage';
import SignUp from './components/user/SignUp';
import CreateProblem from './components/problem/CreateProblem';
import ProblemDetails from './components/problem/ProblemDetails';
import { SnackbarProvider } from 'notistack';
import EditProblem from './components/problem/EditProblem';
import Map from './components/map/maptest';
import MuniPage from './components/dashboard/MuniPage';
import EditProblemB from './components/problem/EditProblemB';
import EditProblemA from './components/problem/EditProblemA';
import UploadFile from './components/util/test';
import Stati from './components/statistics/StatisticPage';

export default () => (
  <SnackbarProvider maxSnack={3}>
    <HashRouter>
      <Fragment>
        <CssBaseline />
        <NavBar />
        <Switch>
          <Route exact path="/uploadfile" component={UploadFile} />
          <Route exact path="/" component={Map} />
          <Route exact path="/registrer-bruker" component={SignUp} />
          <Route exact path="/editp" component={EditProblem} />
          <Route exact path="/editpb" component={EditProblemB} />
          <Route exact path="/editpa" component={EditProblemA} />
          <Route exact path="/editbruker" component={MainPage} />
          <Route exact path="/lagproblem" component={CreateProblem} />
          <Route exact path="/stati" component={Stati} />
          <Route exact path="/problemdetails/:problem_id" component={ProblemDetails} />
          {/*<Route exact path="/:municipality" component={MuniPage} /> Kommunenavn og fylket*/}
        </Switch>
        <Footer />
      </Fragment>
    </HashRouter>
  </SnackbarProvider>
);
