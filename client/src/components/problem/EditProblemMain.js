// @flow
import React from 'react';
import withRoot from '../../withRoot';
import createHashHistory from 'history/createHashHistory'
const history = createHashHistory();

// Material-ui
import {Select, Input, MenuItem, Stepper, Step, StepLabel, Button, Typography,
  Grid, Paper, Card, CardContent, TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditProblemA from './EditProblemA';
import EditProblemB from './EditProblemB';
import EditProblem from './EditProblem';
import { signIn } from '../../store/actions/userActions';
import connect from 'react-redux/es/connect/connect';
import { withSnackbar } from 'notistack';
import MuiTable from '../util/MuiTable';
import createMuiData from '../util/createMuiData';

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
  entrepreneur_fk: number;
  location_fk: Geolocation,
  status_fk: 'active'|'inacitve'|'happening',
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
    color: theme.palette.text.secondary,
  },
  paper2: {
    height: '100%',

  },
  grid: {
    height: '100%',
    paddingBottom: 20,
    display: 'flex',
  },
  grid2: {
    paddingBottom: 20,
    height: '100%',
  },
  grid3: {
    paddingBottom: 20,
    Height: '100%',
    alignItems: 'flex-end'
  },
  MUI: {
    height: '100%',
  }
});


function getUserPri(user_fk: number){
  // get user priority
  const prio = 1;
  return prio;
}

function getEditView(priority: number){
  switch (priority){

    case 0:
      return(
        <EditProblem/>
    );
    case 1:
      return(
        <EditProblemB/>
    );
    case 2:
      return(
       <EditProblemA/>

    );
    default:
      return (
        'Unknown step'
    );
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
    categories: [],
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


render(){
  const { classes, problem, isLoggedIn } = this.props;
  const a = getUserPri(this.state.user_fk);
  // noinspection JSAnnotator
  var problem_id = 0;
  const rows = (this.similarProblems == null ? [] : createMuiData(this.similarProblems));

  return (
    <div>
      <Grid container spacing={24} className={classes.grid} name={"Main Grid"}>
        <Grid item xs={6} sm={3}>
          <MuiTable
            className={classes.MUI}
            rows={rows}
            onClick={e => {
              let myProblem = this.similarProblems.filter(a => e.rowData.eId == a.id)[0];
              problem_id = myProblem.id
              // history.push til problem details med id = problem_id
            }}
          />
        </Grid>
        <Grid item xs>
          {getEditView(1)}
        </Grid>
      </Grid>
    </div>

  );
}

  getSimilarProblems(municipality: string, location: string) {
    //@TODO AXIOS GET SIMILAR PROBLEMS
    this.similarProblems = [
      {id:1, title: 'Hull i vei', category: 'Veier', municipality: 'Vestby', location: 'Kongens Gate', description: 'abc', status: 'Unchecked' },
      {id:2, title: 'Dårlig', category: 'Veier', municipality: 'Trondheim', location: 'Jørunds Gate', description: 'def', status: 'Checked' },
      {id:3, title: 'Problem', category: 'Veier', municipality: 'Ås', location: 'Torget', description: 'mnl', status: 'Working' }
    ]
  }

  componentDidMount() {
    this.getSimilarProblems();
    this.setState({
      ...this.props.problem
    });
  }
}

const mapStateToProps = state => {
  return {
    problem: state.problem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(EditProblemMain))));

