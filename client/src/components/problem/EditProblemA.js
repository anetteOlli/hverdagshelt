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
import Map from '../map/maptest';
import { getProblemById, goToProblemDetail, goToProblemEdit } from '../../store/actions/problemActions';
import { getCategories } from '../../store/actions/categoryActions';

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
  category_fk: string
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
    problem_description: '',
    description_entrepreneur: '',
    img_user: '',
    date_made: '',
    last_edited: '',
    entrepreneur_fk: '',
    location_fk: '',
    status_fk: '',
    category_fk: ''
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

  render() {
    const statuss = ['Finished', 'InProgress', 'Unchecked'];
    const { classes, problem, isLoggedIn, categories } = this.props;
    // if (!isLoggedIn) return <Redirect to="/" />;

    if (problem) {
      return (
        <div className={classes.main}>
          <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
            <Grid item xs className={classes.grid2} name={'GridItem UserProblem'}>
              <Paper className={classes.paper2} name={'Paper for UserProblem'}>
                <Typography variant="h2" gutterBottom align="center">
                  Bruker beskrivelse:
                </Typography>
                <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                  <SelectValidator
                    fullWidth
                    margin="normal"
                    label="Status:"
                    name="status_fk"
                    value={problem.status_fk}
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
                    value={problem.problem_description}
                    onChange={this.handleChange}
                    validators={['required', 'minStringLength:1']}
                    errorMessages={['Du må skrive inn en beskrivelse', 'Ugyldig beksrivelse']}
                  />

                  <SelectValidator
                    fullWidth
                    margin="normal"
                    label="Kategori"
                    name="category_fk"
                    value={problem.category_fk}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={['this field is required']}
                  >
                    {categories.map((option, index) => (
                      <MenuItem key={index} value={option.category}>
                        {option.category}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                </ValidatorForm>
                <Paper className={classes.paper}> Dato startet: {problem.date_made} </Paper>

                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <div>
                      <Typography>Bilde</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div />
                    <div>
                      <img id="img" width="100%" src={problem.img_user || 'http://placehold.it/180'} alt="Bilde" />
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

                <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                  <Paper className={classes.paper}> Entreprenør: {problem.entrepreneur_fk} </Paper>

                  <Paper
                    className={classes.paper}
                    readOnly
                    margin="normal"
                    label="Beskrivelse"
                    value={'Beskrivelse:'}
                    name="problem_description"
                  >
                    {'Beskrivelse: \n ' + problem.description_entrepreneur}
                  </Paper>

                  <Paper className={classes.paper}>
                    {' '}
                    Entreprenør kontakt informasjon:{' '}
                    {
                      // her kommer kontakt informasjon
                    }{' '}
                  </Paper>

                  <Paper className={classes.paper}> Dato Endret: {problem.last_edited} </Paper>

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
                              problem.img_entrepreneur ||
                              'https://iso.500px.com/wp-content/uploads/2014/04/20482.jpg' ||
                              'http://placehold.it/180'
                            }
                            alt="Bilde"
                          />
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </ValidatorForm>
              </Paper>
            </Grid>
          </Grid>
          <div>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                <div>
                  <Typography>Kart: </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.mapExpansion}>
                <div className="mapPlaceholder">
                  <Map />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Button fullWidth variant="contained" className={classes.button} type="submit">
              Lagre endringer
            </Button>
          </div>
        </div>
      );
    } else {
      return <h3>Loading current problem</h3>;
    }
  }

  componentDidMount() {
    this.props.getCategories().then(() => console.log("Categories loaded in editproblemA: ",this.props.categories));
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
    getCategories: () => dispatch(getCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(EditProblemA))));
