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
import SimpleMap from './components/layout/GoogleMap';
import MuniPage from './components/dashboard/MuniPage';

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
              <Route exact path="/registrer-bruker" component={SignUp} />
              <Route exact path="/editbruker" component={MainPage} />
              <Route exact path="/signup" component={MainPage} />
              {/*<Route exact path="/:municipality" component={MuniPage} /> Kommunenavn og fylket*/}
              <Route exact path="/lagproblem" component={CreateProblem}/>
              <Route exact path='/map' component={SimpleMap}/>
            </Switch>
            <Footer />
          </Fragment>
        </HashRouter>
      </SnackbarProvider>
    );
  }
}

export default App;
