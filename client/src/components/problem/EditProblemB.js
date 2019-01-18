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
import Map from '../map/MapWithSearchBox';
import { CardContent } from './CreateProblem';
import { getProblemById, goToProblemDetail } from '../../store/actions/problemActions';
import { getCategories } from '../../store/actions/categoryActions';
import MapMarkers from '../map/MapMarkers';

const statuss = ['til avventing', 'påbegynt', 'registrert', 'ferdig'];

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

class EditProblemB extends React.Component<Props, State> {
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
  handleUpload = e => {
    this.setState({
      displayImg: e
    });
  };

  render() {
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
                <Paper
                  className={classes.paper}
                  readOnly
                  fullWidth
                  margin="normal"
                  multiline
                  label="Beskrivelse"
                  rowsMax={10}
                  name="problem_description"
                  value={'Beskrivelse:'}
                >
                  {'Beskrivelse: \n' + this.state.problem_description}
                </Paper>
                <Paper
                  className={classes.paper}
                  readOnly
                  fullWidth
                  margin="normal"
                  label="Kategori"
                  name="category_fk"
                  value={'Kategori:   '}
                >
                  {'Kategori:   ' + this.state.category_fk}
                </Paper>

                <h3> Dato startet: {this.state.date_made} </h3>

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
                        top
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
                  multiline
                  rowsMax={10}
                  margin="normal"
                  label="Beskrivelse"
                  value={'Beskrivelse:'}
                  name="description_entrepreneur"
                  value={this.state.description_entrepreneur}
                  onChange={this.handleChange}
                />
                <Paper className={classes.paper}> Entreprenør: {this.state.entrepreneur_fk} </Paper>

                <h3> Dato Endret: {this.state.last_edited} </h3>

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
                        <img id="img" top width="100%" src={this.state.displayImg || this.state.img_user} alt="Bilde" />
                        <PictureUpload uploadImg={this.handleUpload} />
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
      console.log('REEE', this.state);
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
    getCategories: () => dispatch(getCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(EditProblemB))));
