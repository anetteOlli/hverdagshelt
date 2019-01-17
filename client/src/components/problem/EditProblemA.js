// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import MapMarkers from '../map/MapMarkers';
import { editProblem, getProblemById, goToProblemDetail, goToProblemEdit } from '../../store/actions/problemActions';
import { getCategories } from '../../store/actions/categoryActions';
import type { Problem } from '../../store/reducers/problemReducer';
import moment from 'moment';
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
  street_fk: string,
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
    alignItems: 'flex-end'
  },
  grid2: {
    paddingBottom: 20,
    height: '100%',
    alignItems: 'flex-end'
  }
});

class EditProblemA extends React.Component<Props, State> {
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
    street_fk: '',

  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    // gå videre til å lagre endringer
    const date = new Date();
    console.log(this.state);

    this.setState({
      last_edited: date
    })

    this.props.editProblem(this.state).then(() => this.props.goToProblemDetail(this.state.problem_id))
  };

  render() {
    const statuss = ['Finished', 'InProgress', 'Unchecked'];
    const { classes, problem, isLoggedIn, categories } = this.props;

    if (problem) {
      return (
        <div className={classes.main}>
          <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
            <ValidatorForm ref="problemForm" onSubmit={this.handleSubmit}>
              <Grid item xs className={classes.grid2} name={'GridItem UserProblem'}>
                <Paper className={classes.paper2} name={'Paper for UserProblem'}>
                  <Typography variant="h2" gutterBottom align="center">
                    Bruker beskrivelse:
                  </Typography>
                  <SelectValidator
                    fullWidth
                    margin="normal"
                    label="Status:"
                    name="status_fk"
                    value={this.state.status_fk}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={['this field is required']}
                  >
                    {statuss.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </SelectValidator>

                  <TextValidator
                    fullWidth
                    margin="normal"
                    multiline
                    label="Beskrivelse"
                    rowsMax={10}
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
                  <Paper className={classes.paper}> Dato startet: {moment(this.state.date_made).calendar()} </Paper>

                  <ExpansionPanel>
                    <ExpansionPanelSummary>
                      <div>
                        <Typography>Bilde</Typography>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div />
                      <div>
                        <img
                          id="img"
                          width="100%"
                          src={this.state.img_user || 'http://placehold.it/180'}
                          alt="Bilde"
                        />
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Paper>
              </Grid>
              <Grid item xs className={classes.grid2} name={'GridItem for entrepreneur'}>
                <Paper className={classes.paper2} name={'Paper for entrepreneur'}>
                  <Typography variant="h2" gutterBottom align="center">
                    Entreprenør beskrivelse:
                  </Typography>
                  <Paper className={classes.paper}> Entreprenør: {this.state.entrepreneur_fk} </Paper>

                  <Paper
                    className={classes.paper}
                    readOnly
                    margin="normal"
                    label="Beskrivelse"
                    value={'Beskrivelse:'}
                    name="problem_description"
                  >
                    {'Beskrivelse: \n ' + this.state.description_entrepreneur}
                  </Paper>

                  <Paper className={classes.paper}>
                    Entreprenør kontakt informasjon:{' '}
                    {
                      // her kommer kontakt informasjon
                    }
                  </Paper>

                  <Paper className={classes.paper}> Dato Endret: {moment(this.state.last_edited).calendar()} </Paper>

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
                          <img
                            id="img"
                            width="100%"
                            src={
                              this.state.img_entrepreneur ||
                              'https://s3.amazonaws.com/pas-wordpress-media/content/uploads/2014/06/shutterstock_185422997-653x339.jpg'
                            }
                            alt="Bilde"
                          />
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs className={classes.grid2} name={'GridItem for map and submit-button'}>
                <Button type="submit" fullWidth variant="contained" className={classes.button}>
                  {/*onClick={this.handleSubmit()}*/}
                  Lagre endringer
                </Button>

                <div>
                  <ExpansionPanel>
                    <ExpansionPanelSummary>
                      <div>
                        <Typography>Kart: </Typography>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {
                        // I want map to be here, but alas - expansionPanel and MapMakers cannot put away past differences and reconcile.
                      }
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <div className="mapPlaceholder">
                    <MapMarkers />
                  </div>
                </div>
              </Grid>
            </ValidatorForm>
          </Grid>
        </div>
      );
    } else {
      return <h3>Loading current problem</h3>;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.problem !== this.props.problem) {
      this.setState({
        ...nextProps.problem
      });
    }
    console.log(this.state);
  }

  componentDidMount() {
    this.props.getCategories().then(() => console.log('Categories loaded in editproblemA: ', this.props.categories));
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
)(withRoot(withStyles(styles)(withSnackbar(EditProblemA))));
