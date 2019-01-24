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
import PictureUpload from '../util/PictureUpload';
import { CardContent } from './CreateProblem';
import { editProblem, getProblemById, goToProblemDetail } from '../../store/actions/problemActions';
import { getCategories } from '../../store/actions/categoryActions';
import MapMarkers from '../map/MapMarkers';
import moment from 'moment';
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
  category: string,
  status: string,
  user_id: number,
  entrepreneur_id: number,
  latitude: number,
  longitude: number,
  support: number,
  municipality: string,
  county: string,
  city: string,
  street: string
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

class EditProblemM extends React.Component<Props, State> {
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
    category: '',
    status: '',
    user_id: '',
    entrepreneur_id: '',
    latitude: '',
    longitude: '',
    support: '',
    municipality: '',
    county: '',
    city: '',
    street: '',
    displayImg: '',
    displayImg2: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    this.props.editProblem(this.state).then(() => this.props.goToProblemDetail(this.state.problem_id));
  };
  handleUpload = e => {
    console.log('user');
    this.setState({
      img_user: e
    });
  };
  handleUpload2 = e => {
    console.log('ENTREPRENEURE');
    this.setState({
      img_entrepreneur: e
    });
  };

  render() {
    const statuss = ['Finished', 'InProgress', 'Unchecked'];
    const { classes, problem, isLoggedIn, categories } = this.props;
    return (
      <div className={classes.main}>
        <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
          <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
            <Grid item xs className={classes.grid2} name={'GridItem UserProblem'}>
              <Paper className={classes.paper2} name={'Paper for UserProblem'}>
                <Typography variant="h2" gutterBottom align="center">
                  Bruker beskrivelse:
                </Typography>
                <TextValidator
                  fullWidth
                  margin="normal"
                  label="Tittel"
                  name="problem_title"
                  value={this.state.problem_title}
                  onChange={this.handleChange}
                  validators={['required', 'minStringLength:1']}
                  errorMessages={['Du må skrive inn en tittel', 'Ugyldig tittel']}
                />
                <SelectValidator
                  fullWidth
                  margin="normal"
                  label="Status:"
                  name="status"
                  value={this.state.status}
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
                  name="category"
                  value={this.state.category}
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

                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <div>
                      <Typography>Bilde</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                      <img id="img" width="100%" src={this.state.displayImg2 || this.state.img_user} alt="Bilde" />
                      <PictureUpload id={'imgUpload1'} uploadImg={this.handleUpload} />
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
                <Paper className={classes.paper}> Entreprenør: {this.state.entrepreneur_id} </Paper>

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

                <Paper className={classes.paper}> Dato Endret: {this.state.last_edited} </Paper>

                <div>
                  <ExpansionPanel>
                    <ExpansionPanelSummary>
                      <div>
                        <Typography>Bilde</Typography>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div>
                        <img
                          id="img"
                          width="100%"
                          src={this.state.displayImg || this.state.img_entrepreneur}
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.problem !== this.props.problem) {
      this.setState({
        ...nextProps.problem
      });
    }
  }

  componentDidMount() {
    this.props.getCategories();
    this.setState({
      ...this.props.problem
    });
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
)(withRoot(withStyles(styles)(withSnackbar(EditProblemM))));
