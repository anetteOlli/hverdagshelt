// @flow
import React from 'react';
import withRoot from '../../withRoot';
import { goToProblemDetail } from '../../store/actions/problemActions';

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
import EditProblemB from './EditProblemB';
import EditProblem from './EditProblem';
import connect from 'react-redux/es/connect/connect';
import { withSnackbar } from 'notistack';
import Tabletest from '../util/Tabletest';
import { getProblemsByMuni } from '../../store/actions/problemActions';
import ProblemDetails from './ProblemDetails';

var bool = false;

type Props = {
  classes: Object,
  isLoggedIn: boolean
};

type State = {
  problem_id: number,
  problem_description: string,
  description_entrepreneur: string,
  img_user: string,
  date_made: Date,
  last_edited: Date,
  entrepreneur_fk: number,
  location_fk: Geolocation,
  status_fk: 'Standard' | 'Municipality' | 'Entrepreneur' | 'Administrator',
  category_fk: string,
  user_fk: number,
  priority_fk: string
};

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20
  },
  button: {
    marginTop: theme.spacing.unit
  },
  paper: {
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    color: theme.palette.text.secondary
  },
  paper2: {
    height: '100%'
  },
  grid: {
    height: '100%',
    paddingBottom: 20,
    display: 'flex',
  },
  grid2: {
    paddingBottom: 20,
    height: '100%'
  },
  grid3: {
    paddingBottom: 20,
    Height: '100%',
    alignItems: 'flex-end'
  },
  gridLeft: {
    paddingBottom: 20,
    paddingLeft: 200,
    height: '100%',
    width: '100%'
  },
  MUI: {
    height: '100%'
  }
});

function getView(bool: boolean, p) {
  var view;
  if (bool) {
    if (p === 'standard') {
      view = 0;
    } else if (p === 'Entrepreneur') {
      view = 1;
    } else if (p === 'Administrator' || 'Municipality') {
      view = 2;
    }
  } else {
    view = 3;
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
      return <ProblemDetails />;
    default:
      return 'Unknown view';
  }
}

class EditProblemMain extends React.Component<Props, State> {
  state = {
    problem_id: null,
    problem_description: '',
    description_entrepreneur: '',
    img_user: '',
    date_made: '',
    last_edited: '',
    entrepreneur_fk: '',
    location_fk: '',
    status_fk: '',
    category_fk: '',
    user_fk: '',

    priority_fk: '',
    similarProblems: [],
    categories: []
  };

  render() {
    const { classes, problem, isLoggedIn, priority_fk } = this.props;
    bool = this.props.editMode;

    return (
      <div>
        <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
          <Grid item sm md={3} xs className={classes.gridLeft}>
            <Tabletest className={classes.MUI} />
          </Grid>
          <Grid item sm md={9} xs>
            {getEditView(getView(bool, this.props.priority_fk))}
          </Grid>
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      ...this.props.problem
    });
    console.log(this.props.match.params.muni, this.props.match.params.county);
    this.props.getProblemsByMuni(this.props.match.params.muni, this.props.match.params.county);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentProblemId !== nextProps.currentProblemId) {
    }
  }
}

const mapStateToProps = state => {
  return {
    problem: state.problem,
    userId: state.user.userID,
    priority_fk: state.user.priority,
    currentProblemId: state.problem.currentProblemId,
    editMode: state.problem.editMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToProblemDetail: id => dispatch(goToProblemDetail(id)),
    getProblemsByMuni: (muni, county) => dispatch(getProblemsByMuni(muni, county))
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(EditProblemMain))));
