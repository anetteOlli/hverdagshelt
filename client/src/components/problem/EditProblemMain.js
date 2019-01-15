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
import {getProblemsByMuni} from '../../store/actions/problemActions';
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
  status_fk: 'active' | 'inacitve' | 'happening',
  category_fk: string,
  user_fk: number
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
    alignItems: 'display-end'
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
    width: '100%',
  },
  MUI: {
    height: '100%'
  }
});

function getView(bool: boolean) {
  var view;
    if (bool) {
      view = this.props.user.priority_fk;
    } else {
      view = 3;
    }
  return view;
}
/*
function getUserPri(user_fk: number) {
  var prio;
  prio = this.state.priority_fk;
  // get user priority
  return prio;
}
*/

function getEditView(priority: number) {
  switch (priority) {
    case 0:
      return <EditProblem />;
    case 1:
      return <EditProblemB />;
    case 2:
      return <EditProblemA />;
    case 3:
      return <ProblemDetails/>;
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

    similarProblems: [],
    categories: []
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    // gå videre til å lagre endringer
    this.state.last_edited = new Date();
    e.preventDefault();
    console.log(this.state);
  };

  handleTableClick = e => {
    let myProblem = this.similarProblems.filter(a => e.rowData.eId == a.id)[0];
    this.props.goToProblemDetail(myProblem.id);
  };

  render() {
    console.log(this.props.problem.currentProblemId);
    const { classes, problem, isLoggedIn } = this.props;
    var a = this.state.user_fk;
    bool =  this.props.editMode || true;
    //const rows = this.similarProblems == null ? [] : createMTableData(this.similarProblems);

    console.log(this.similarProblems )
    return (
      <div>
        <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
          <Grid item sm md={3} xs className={classes.gridLeft}>
            {
              <Tabletest className={classes.MUI} onClick={this.handleTableClick} />
            }
          </Grid>
          <Grid item sm md={9} xs>
            {getEditView(getView(bool, a))}
          </Grid>
        </Grid>
      </div>
    );
  }

  getSimilarProblems(municipality: string, location: string) {
    //@TODO AXIOS GET SIMILAR PROBLEMS
    this.similarProblems = [
      {
        id: 1,
        title: 'Hull i vei',
        category: 'Veier',
        municipality: 'Vestby',
        location: 'Kongens Gate',
        description: 'abc',
        status: 'Unchecked'
      },
      {
        id: 2,
        title: 'Dårlig',
        category: 'Veier',
        municipality: 'Trondheim',
        location: 'Jørunds Gate',
        description: 'def',
        status: 'Checked'
      },
      {
        id: 3,
        title: 'Problem',
        category: 'Veier',
        municipality: 'Ås',
        location: 'Torget',
        description: 'mnl',
        status: 'Working'
      }
    ];
  }


  componentDidMount() {
    this.getSimilarProblems();
    this.setState({
      ...this.props.problem
    });
    this.props.getProblemsByMuni(this.props.match.params.muni, this.props.match.params.county)
  }
}

const mapStateToProps = state => {
  return {
    problem: state.problem,
    userId: state.user.userID,
    priority_fk: state.priority_fk,
    currentProblemId: state.problem.currentProblemId,
    editMode: state.problem.editMode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToProblemDetail: id => dispatch(goToProblemDetail(id)),
    getProblemsByMuni: (muni, county) => dispatch(getProblemsByMuni(muni, county))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(EditProblemMain))));
