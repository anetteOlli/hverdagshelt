// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { signIn } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import PictureUpload from '../util/PictureUpload';
import { editProblem, getProblemById, goToProblemDetail } from '../../store/actions/problemActions';
import { getCategories } from '../../store/actions/categoryActions';
import MapMarkers from '../map/MapMarkers';
import type { Problem } from '../../store/reducers/problemReducer';

type Props = {
  classes: Object,
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
  paper: {
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    color: theme.palette.text.secondary
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

class EditProblem extends React.Component<Props, State> {
  state = {
    problem_id: null,
    problem_title: '',
    problem_description: '',
    problem_locked: '',
    description_entrepreneur: '',
    img_user: '',
    img_entrepreneur: '',
    date_made: '',
    last_edited: '',
    date_finished: '',
    category_fk: '',
    status_fk: '',
    user_fk: '',
    entrepreneur_fk: '',
    latitude: '',
    longitude: '',
    support: '',
    municipality_fk: '',
    county_fk: '',
    city_fk: '',
    street_fk: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const date = new Date();
    console.log(this.state);

    this.setState({
      last_edited: date
    });

    this.props.editProblem(this.state).then(() => this.props.goToProblemDetail(this.state.problem_id));
  };

  handleUpload = e => {
    this.setState({
      displayImg: e
    });
  };

  render() {
    const { classes, problem, isLoggedIn, categories } = this.props;
    return (
      <div className={classes.main}>
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                <Typography variant="h2" gutterBottom align="center">
                  Endre på problem
                </Typography>
                <Paper
                  className={classes.paper}
                  fullWidth
                  readOnly
                  margin="normal"
                  label="Status:"
                  name="status_fk"
                  value={'status'}
                >
                  {'Status:   ' + this.state.status_fk}
                </Paper>

                <TextValidator
                  fullWidth
                  margin="normal"
                  multiline
                  label="Beskrivelse"
                  name="problem_description"
                  value={this.state.problem_description}
                  onChange={this.handleChange}
                  validators={['required', 'minStringLength:1']}
                  errorMessages={['Du må skrive inn en beskrivelse', 'Ugyldig beksrivelse']}
                />
                <SelectValidator
                  fullWidth
                  margin="normal"
                  label="Kategori"
                  name="category_fk"
                  value={this.state.category_fk}
                  onChange={this.handleChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                >
                  {categories.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </SelectValidator>
                <Paper className={classes.paper}> Dato startet: {this.state.date_made} </Paper>

                <div>
                  <ExpansionPanel>
                    <ExpansionPanelSummary>
                      <div>
                        <Typography>Bilde</Typography>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div />
                      <div>
                        <img id="img" width="100%" src={this.state.displayImg || this.state.img_user} alt="Bilde" />
                        <PictureUpload uploadImg={this.handleUpload} />
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>

                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <div>
                      <Typography>Kart: </Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="mapPlaceholder">
                      <MapMarkers />
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <Button fullWidth variant="contained" className={classes.button} type="submit">
                  Lagre endringer
                </Button>
              </ValidatorForm>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.problem !== this.props.problem) {
      this.setState({
        ...nextProps.problem
      });
    }
  }

  componentDidMount() {
    this.props.getCategories().then(() => console.log('Categories loaded in editproblem: ', this.props.categories));
    this.setState({
      ...this.props.problem
    });
    console.log(this.state);
  }
}

const mapStateToProps = state => {
  const problems = state.problem.problems;
  const problem = problems ? problems.find(p => p.problem_id === state.problem.currentProblemId) : null;

  return {
    currentProblemId: state.problem.currentProblemId,
    problem,
    userPriority: state.user.priority,
    isLoggedIn: state.user.isLoggedIn,
    categories: state.category.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProblemById: (id: number) => dispatch(getProblemById(id)),
    goToProblemDetail: (id: number) => dispatch(goToProblemDetail(id)),
    getCategories: () => dispatch(getCategories()),
    editProblem: (problem: Problem) => dispatch(editProblem(problem))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(EditProblem))));