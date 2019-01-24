// @flow
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import MainPage from './components/dashboard/MainPage';
import CreateProblem from './components/problem/CreateProblem';
import ProblemDetails from './components/problem/ProblemDetails';
import { SnackbarProvider } from 'notistack';
import MuniPage from './components/dashboard/MuniPage';
import EditProblemMain from './components/problem/EditProblemMain';
import UploadFile from './components/util/Test';
import CreateEvent from './components/event/CreateEvent';
import MuiTable2 from './components/util/MuiTable-2';
import Stati from './components/statistics/StatisticPage';
import SignUp from './components/user/SignUp';
import Settings from './components/user/Settings';
import Profile from './components/user/Profile';
import withRoot from './withRoot';
import ScrollToTop from './components/util/ScrollToTop';
import type { ReduxState } from './store/reducers';
import { connect } from 'react-redux';
import LoadingComponent from './components/util/LoadingComponent';
import Notifier from './components/util/Notifier';
import PageNotFound from './components/util/PageNotFound';

type Props = {
  checkedJWT: boolean
};

class App extends React.Component<Props> {
  render() {
    if (!this.props.checkedJWT) return <LoadingComponent />;
    else
      return (
        <HashRouter>
          <ScrollToTop>
            <Notifier />
            <NavBar />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/uploadfile" component={UploadFile} />
              <Route exact path="/registrer-bruker" component={SignUp} />
              <Route exact path="/problems" component={EditProblemMain} />
              <Route exact path="/lagproblem" component={CreateProblem} />
              <Route exact path="/problemdetails" component={ProblemDetails} />
              <Route exact path="/opprArrangement" component={CreateEvent} />
              <Route exact path="/muiTable" component={MuiTable2} />
              <Route exact path="/munipage" component={MuniPage} />
              <Route exact path="/lagproblem" component={CreateProblem} />
              <Route exact path="/uploadfile" component={UploadFile} />
              <Route exact path="/stati" component={Stati} />
              <Route exact path="/innstillinger" component={Settings} />
              <Route exact path="/profil" component={Profile} />
              <Route exact path="/:county/:municipality" component={MuniPage} />
              <Route component={PageNotFound} />
            </Switch>
          </ScrollToTop>
        </HashRouter>
      );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    checkedJWT: state.async.checkedJWT
  };
};

export default connect(mapStateToProps)(withRoot(App));
