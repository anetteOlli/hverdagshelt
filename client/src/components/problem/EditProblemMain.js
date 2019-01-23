// @flow
import React from 'react';
import withRoot from '../../withRoot';
import { getProblemByUser, goToProblemDetail, setMuni } from '../../store/actions/problemActions';
import { entrepreneurs_get_one_by_User_fk } from '../../store/actions/entrepreneurAction';
// Material-ui
import {
  Select,
  Input,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditProblemA from './EditProblemA';
import EditProblemB from './EditProblemE';
import EditProblemM from './EditProblemM';
import EditProblem from './EditProblem';
import connect from 'react-redux/es/connect/connect';
import { withSnackbar } from 'notistack';
import ProblemDetails from './ProblemDetails';
import MuiTable2 from '../util/MuiTable-2';
import PropTypes from 'prop-types';
import { getUserInfo } from '../../store/actions/userActions';

let bool = false;

type Props = {
  classes: Object,
  rows: PropTypes.array,
  isLoggedIn: boolean
};

type State = {
  problem_id: number,
  problem_title: string,
  problem_description: string,
  problem_locked: number,
  description_entrepreneur: string,
  img_user: string,
  img_entrepreneur: string,
  date_made: date,
  last_edited: date,
  date_finished: date,
  category_fk: string,
  status_fk: string,
  user_fk: number,
  entrepreneur_fk: number,
  latitude: number,
  longitude: number,
  support: number,
  municipality_fk: string,
  county_fk: string,
  city_fk: string,
  street_fk: string
};

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20
  },
  button: {
    marginTop: theme.spacing.unit
  },

  grid: {
    height: '100%',
    paddingBottom: 20,
    //display: 'flex',
    //alignSelf: 'stretch'
  },

  gridLeft: {
    paddingBottom: 20,
    paddingLeft: 200,
    //height: '100%',
    //width: '100%',
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //alignSelf: 'stretch'
  },
  mui: {
    maxHeight: '250',
    height: '250'
  }
});

function getView(bool: boolean, p) {
  var view;
  if (bool) {
    if (p === 'Standard') {
      view = 0;
    } else if (p === 'Entrepreneur') {
      view = 1;
    } else if (p === 'Administrator') {
      view = 2;
    } else if (p === 'Municipality') {
      view = 3;
    }
  } else {
    view = 4;
  }
  return view;
}

function getEditView(priority: number) {
  switch (priority) {
    case 0:
      return <EditProblem />;
    case 1:
      return <EditProblemB />;
    case 2:
      return <EditProblemA />;
    case 3:
      return <EditProblemM />;
    case 4:
      return <ProblemDetails />;
    default:
      return 'Unknown view';
  }
}

class EditProblemMain extends React.Component<Props, State> {
  state = {

    municipality: '',
    county: '',

    priority_fk: '',
    similarProblems: [],
    categories: []
  };

  render() {
    const { classes, problems } = this.props;
    bool = this.props.editMode;

    return (
      <div>
        <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
          <Grid item sm md={3} xs className={classes.gridLeft}>

            <Paper className = {classes.mui}>
            <MuiTable2
              className = {classes.mui}
              rows={problems}
              onClick={e => {
                let myProblem = e;
                this.props.goToProblemDetail(myProblem.problem_id);
              }}
            />
            </Paper>
          </Grid>
          <Grid item sm md={9} xs>
            {getEditView(getView(bool, this.props.priority_fk))}
          </Grid>
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    this.props.getUserInfo().then(() => {
    this.props.entrepreneurs_get_one_by_User_fk().then(() => {
      this.props.getProblemByUser();
      this.props.setMuni(this.props.currentMuni.county, this.props.currentMuni.municipality);
    })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.problems !== nextProps.problems) {
    }
  }
}

const mapStateToProps = state => {
  return {
    problems: state.problem.problems,
    userId: state.user.userID,
    priority_fk: state.user.priority,
    currentMuni: state.user.currentMuni,
    currentProblemId: state.problem.currentProblemId,
    editMode: state.problem.editMode,
    currentEntrepreneur: state.entrepreneur.currentEntrepreneur
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToProblemDetail: id => dispatch(goToProblemDetail(id)),
    getProblemByUser: () => dispatch(getProblemByUser()),
    setMuni: (county, muni) => dispatch(setMuni(county, muni)),
    entrepreneurs_get_one_by_User_fk: () => dispatch(entrepreneurs_get_one_by_User_fk()),
    getUserInfo: () => dispatch(getUserInfo())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(EditProblemMain))));
