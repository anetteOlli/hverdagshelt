// @flow
import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import SimpleMap from './components/layout/map';
import MainPage from './components/dashboard/MainPage';
import SignUp from './components/user/SignUp';
import CreateProblem from './components/problem/CreateProblem';
import SimpleMap from './components/layout/GoogleMap';
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
            <SimpleMap center={[45, 32]} />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/registrer-bruker" component={SignUp} />
              <Route exact path="/editbruker" component={MainPage} />
              <Route exact path="/signup" component={MainPage} />
              <Route exact path="/" component={MainPage} />
              <Route exact path="/lagproblem" component={CreateProblem}/>
              <Route exact path="/map" component={SimpleMap} />
            </Switch>
            <Footer />
          </Fragment>
        </HashRouter>
      </SnackbarProvider>
    );
  }
}

export default App;
