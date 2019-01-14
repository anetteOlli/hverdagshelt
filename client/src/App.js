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
import CreateEvent from './components/event/CreateEvent';
import MuiTable from './components/util/MuiTable';
import MuiTable2Test from './components/util/MuiTable-2';
import Stati from './components/statistics/StatisticPage';
import SimpleMap from './components/map/GoogleMap';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import { refresh } from './store/actions/userActions';
import { connect } from 'react-redux';
const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  site: {
    flex: '1 0 auto',
    padding: '2em 0 2em 0',
    width: '100%',
    '&::after': {
      content: '|\\00a0\\00a0',
      display: 'block',
      marginTop: '2em 0',
      height: '0',
      visibility: 'hidden'
    }
  }
});

type Props = {
  classes: Object,
  refresh: Function,
  hasCheckedJWT: boolean
};

class App extends React.Component<Props> {
  render() {
    const { classes, hasCheckedJWT } = this.props;
    if (hasCheckedJWT) {
      return (
        <SnackbarProvider maxSnack={3}>
          <HashRouter>
            <Fragment>
              <CssBaseline />
              <div className={classes.root}>
                <NavBar />
                <div className={classes.site}>
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/uploadfile" component={UploadFile} />
                    <Route exact path="/map" component={Map} />
                    <Route exact path="/registrer-bruker" component={SignUp} />
                    <Route exact path="/editp" component={EditProblem} />
                    <Route exact path="/editpb" component={EditProblemB} />
                    <Route exact path="/editpa" component={EditProblemA} />
                    <Route exact path="/lagproblem" component={CreateProblem} />
                    <Route exact path="/problemdetails" component={ProblemDetails} />
                    <Route exact path="/opprArrangement" component={CreateEvent} />
                    <Route exact path="/muiTable" component={MuiTable2Test} />
                    <Route exact path="/munipage" component={MuniPage} />
                    <Route exact path="/lagproblem" component={CreateProblem} />
                    <Route exact path="/uploadfile" component={UploadFile} />
                    <Route exact path="/problemdetails/:problem_id" component={ProblemDetails} />
                    <Route exact path="/map_simpel" component={SimpleMap} />
                    <Route exact path="/stati" component={Stati} />
                    <Route exact path="/:municipality" component={MuniPage} />
                    {/*<Route exact path="/:municipality" component={MuniPage} /> Kommunenavn og fylket*/}
                  </Switch>
                </div>
                <Footer />
              </div>
            </Fragment>
          </HashRouter>
        </SnackbarProvider>
      );
    } else return <div/>;
  }

  componentDidMount(): void {
    this.props.refresh();
  }
}

const mapStateToProps = state => {
  return {
    hasCheckedJWT: state.app.hasCheckedJWT
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refresh: () => dispatch(refresh())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(App)));
