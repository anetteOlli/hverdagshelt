// @flow
import React from 'react';
import {
  Button,
  Typography,
  MenuItemCard,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia
} from '@material-ui/core/';
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
import { editProblem, getProblemById, goToProblemDetail } from '../../store/actions/problemActions';
import { getCategories } from '../../store/actions/categoryActions';
import type { Problem } from '../../store/reducers/problemReducer';
import { easyDateFormat } from '../util/DateFormater';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

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

/** Edit Problem component for USER with ENTREPRENEUR priority**/
class EditProblemE extends React.Component<Props, State> {
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
    entrepreneur: {}
  };

  /** Handles input values
   * changes this component's state values
   * */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /** Handles validation forms' submit event and post request to server
   * then it redirects you to the Problem Details component of the current problem
   **/
  handleSubmit = e => {
    e.preventDefault();
    this.props.editProblem(this.state).then(() => {
      this.props.enqueueSnackbar('Oppdatert problem', { variant: 'success' });
      this.props.goToProblemDetail(this.state.problem_id);
    });
  };

  /** Handles uploading of image files */
  handleUpload = e => {
    this.setState({
      img_entrepreneur: e.target.files[0],
      displayImg: URL.createObjectURL(e.target.files[0])
    });
  };


  /**Handles the dates*/
  handleEndDateChange = date => {
    const dateFormat = require('dateformat');
    this.setState({
      date_finished: ""+ dateFormat(date, "isoDateTime").slice(0,19)
    });
  };

  render() {
    const statuss = ['Finished', 'InProgress', 'Unchecked'];
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
          <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
            <Grid item xs className={classes.grid2} name={'GridItem UserProblem'}>
              <Paper className={classes.paper2} name={'Paper for UserProblem'}>
                <Typography variant="h2" gutterBottom align="center">
                  Bruker beskrivelse:
                </Typography>
                <Typography>{this.state.problem_title}</Typography>
                <Typography className={classes.paper} margin="normal" label="Status:" name="status" value={'status'}>
                  {'Status:   ' + (this.state.status === 'Finished' ? 'Ferdig'
                                  : (this.state.status === 'InProgress'
                                  ? 'Pågående'
                                  : 'Ikke Godkjent')) }
                </Typography>
                <Typography
                  className={classes.paper}
                  margin="normal"
                  multiline
                  label="Beskrivelse"
                  rowsMax={10}
                  name="problem_description"
                  value={'Beskrivelse:'}
                >
                  {'Beskrivelse: \n' + this.state.problem_description}
                </Typography>
                <Typography
                  className={classes.paper}
                  margin="normal"
                  label="Kategori"
                  name="category"
                  value={'Kategori:   '}
                >
                  {'Kategori:   ' + this.state.category}
                </Typography>

                <Typography variant="i" className={classes.paper}>
                  {' '}
                  Dato startet: {easyDateFormat(this.state.date_made)}{' '}
                </Typography>

                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <div>
                      <Typography>Bilde</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                      <img id="img" width="100%" src={this.state.img_user || 'http://placehold.it/180'} alt="Bilde" />
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
                  multiline
                  rowsMax={10}
                  margin="normal"
                  label="Beskrivelse"
                  value={'Beskrivelse:'}
                  name="description_entrepreneur"
                  value={this.state.description_entrepreneur}
                  onChange={this.handleChange}
                />
                <Typography variant="i" className={classes.paper}>
                  {' '}
                  Entreprenør: {this.state.entrepreneur.business_name}{' '}
                </Typography>

                <Typography variant="i" className={classes.paper}>
                  {' '}
                  Dato Endret: {easyDateFormat(this.state.last_edited)}{' '}
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container className={classes.grid} justify="space-around">
                    <DatePicker
                      minDate={new Date(this.state.date_made)}
                      fullWidth
                      margin="normal"
                      label="Dato problemet ble ferdig"
                      value={this.state.date_finished}
                      onChange={this.handleEndDateChange}
                    />
                    <TimePicker
                      fullWidth
                      margin="normal"
                      label="Klokkeslett problemet ble ferdig"
                      value={this.state.date_finished}
                      onChange={this.handleEndDateChange}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <div>
                  <ExpansionPanel>
                    <ExpansionPanelSummary>
                      <div>
                        <Typography>Bilde</Typography>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <FormControl fullWidth margin="normal">
                        {this.state.displayImg != '' ? (
                          <CardMedia
                            image={this.state.displayImg || this.state.img_entrepreneur || ''}
                            title="Image title"
                            style={{
                              height: 400,
                              paddingTop: '20%'
                            }}
                          />
                        ) : (
                          <i className="imgHere" />
                        )}
                        <input
                          accept="image/*"
                          id="contained-button-file"
                          name="userImg"
                          type="file"
                          onChange={this.handleUpload}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="contained-button-file">
                          <Button variant="contained" component="span">
                            <CloudUploadIcon className="icon-button" />
                            Last opp bilde
                          </Button>
                        </label>
                      </FormControl>
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
                <div className="mapPlaceholder">
                  <MapMarkers />
                </div>
            </Grid>
          </ValidatorForm>
        </Grid>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.problem !== this.props.problem) {
      const date_finished = nextProps.problem.date_finished ? new Date(nextProps.problem.date_finished) : null;
      this.setState({
        ...nextProps.problem,
        date_finished
      });
    }
  }

  componentDidMount() {
    this.props.getCategories();
    const date_finished = this.props.problem.date_finished ? new Date(this.props.problem.date_finished) : null;
    this.setState({
      ...this.props.problem,
      date_finished,
      entrepreneur: this.props.currentEntrepreneur
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
    categories: state.category.categories,
    currentEntrepreneur: state.entrepreneur.currentEntrepreneur
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
)(withRoot(withStyles(styles)(withSnackbar(EditProblemE))));
