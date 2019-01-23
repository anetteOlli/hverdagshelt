// @flow
import React from 'react';
import withRoot from '../../withRoot';
import { withStyles, Stepper, Step, StepLabel, Card, CardContent, CardMedia, CardActionArea, CardActions, Paper, Grid, Typography, TextField, MenuItem, Button, FormControl, FormControlLabel, Input, InputLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ValidatorForm, TextValidator, SelectValidator, ValidatorComponent } from 'react-material-ui-form-validator';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {createEvent} from '../../store/actions/eventActions';
import Map from '../map/MapWithSearchBox';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from 'material-ui-pickers';
import 'date-fns';
import DateFormat from 'dateformat';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Use history.push(...) to programmatically change path
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

type Props = {
  classes: Object,
  enqueueSnackbar: Function,
  errorMessage: string,
};

type State = {
  activeStep: number,

  title: string,
  description: string,
  dateStart: Date,
  dateEnd: Date,
  dateEndInput: Date,
  displayImg: string,
  image: any,
  failureDialog: boolean,

  county: string,
  municipality: string,
  city: string,
  street: string,
  cords : {
    lat: string,
    lng: string
  },

  //User
  userId: number,
  isLoggedIn: boolean,
  priority: string
};

/**Styling*/
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  title: {
    marginTop: 30,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    //width: 200,
    fullWidth: true,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  form: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  Select: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  Card:{
    textAlign: 'center',
  },
  mapText:{
    marginTop: 40,
  },
});

/** @return the title for a specific step in the stepper */
function getSteps() {
  return ['Hvor er arrangementet?', 'Beskriv arrangementet'];
}

/** @return the content (divs, buttons, etc) for a specific step in the stepper
* @params step: number, current step in Stepper
* @params state: State, CreateEvent's State
* @params handleChange: @see handleChange
* @params handleStartDateChange: @see handleStartDateChange
* @params handleEndDateChange: @see handleEndDateChange
* @params handleUpload: @see handleUpload
*/
function getStepContent(step: number,
                        state: State,
                        handleChange: function,
                        handleStartDateChange: function,
                        handleEndDateChange: function,
                        handleUpload: function,
                        classes: Props) {

  switch (step) {
    case 0:
      return (
        <Card className={classes.contentNull}>
          <CardContent>
          <Typography variant="body1" className={classes.info}>Velg lokasjonen på kartet eller bruk søkefeltet</Typography>

          <Typography variant="subtitle2" align="left" >
              {state.municipality}
          </Typography>
          <Typography variant="subtitle2" align="left" >
              {state.street}
          </Typography>
            <input type='hidden' onChange={handleChange} name= 'municipality' value={state.municipality} required />
            <input type='hidden' onChange={handleChange} name= 'street' value={state.street} required />

            <div className={classes.mapPlaceholder}>
              <Map />
            </div>
          </CardContent>
        </Card>
      );
      case 1:
        return (
          <Card className={classes.contentEn} align="center">
            <CardContent>
              <Typography variant="body1">Lokasjon:</Typography>
              <Typography>{state.municipality}</Typography>
              <Typography>{state.street}</Typography>
              <TextValidator
                fullWidth
                margin="normal"
                label="Tittel"
                name="title"
                autoComplete="title"
                value={state.title}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Du må skrive inn en tittel']}
              />
              <TextValidator
                multiline
                fullWidth
                rows="2"
                rowsMax="6"
                margin="normal"
                label="Beskrivelse"
                name="description"
                autoComplete="description"
                value={state.description}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Du må skrive inn en beskrivelse']}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around">
                  <DatePicker
                    fullWidth
                    margin="normal"
                    label="Dato arrangementet starter"
                    value={state.dateStart}
                    onChange={handleStartDateChange}
                  />
                  <TimePicker
                    fullWidth
                    margin="normal"
                    label="Tid arrangementet starter"
                    value={state.dateStart}
                    onChange={handleStartDateChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around">
                  <DatePicker
                    fullWidth
                    margin="normal"
                    label="Dato arrangementet slutter"
                    value={state.dateEnd}
                    onChange={handleEndDateChange}
                  />
                  <TimePicker
                    fullWidth
                    margin="normal"
                    label="Tid arrangementet slutter"
                    value={state.dateEnd}
                    onChange={handleEndDateChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <FormControl fullWidth margin="normal">
                {state.displayImg != '' ?
                (<CardMedia
                  image={state.displayImg || ''}
                  title="Image title"
                  style={{
                    height: 400,
                    paddingTop: '20%'
                  }}
                  />)
                  : (<i className={classes.imghere}></i>)}
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="contained-button-file">
                  <Button fullWidth variant="contained" component="span">
                    <CloudUploadIcon className="icon-button" />
                    Last opp bilde
                  </Button>
                </label>
              </FormControl>
            </CardContent>
          </Card>
        );
    default:
      return 'Unknown step';
  }
}

/** Handles 'supporting' an existing problem
* @params problemId: number, id of the problem to 'support'
*/
function handleSupport(eventId: number){
  //@TODO Handle support a event
  console.log("Clicked updoot for " + eventId + "! Take me away hunny")
}

class CreateEvent extends React.Component<Props, State>{

  state = {
    activeStep: 0,

    title: '',
    description: '',
    dateStart: new Date('0000-00-00T00:00:00'),
    dateEnd: new Date('0000-00-00T00:00:0'),
    dateEndInput: '',
    image: '',

    picture: '',
    displayImg: '',

    county: '',
    municipality: '',
    city: '',
    street: '',
    cords : {
      lat: '',
      lng: ''
    },

    //User
    userId: -1,
    isLoggedIn: false,
    priority: '',
    failureDialog: false
  };

  render() {
    const { classes } = this.props;
    //const { enqueueSnackbar } = this.props;
    const steps = getSteps();
    const { dateStart, dateEnd } = this.state;
    console.log("this.props");
    console.log(this.props);

    if(!this.props.isLoggedIn){
      return (
        <div>
          <Card className="must-log-in-to-create-event" align="center">
            <CardContent>
              <Typography variant="h5" color="error">
                Du må logge inn for å kunne lage et arrangement
              </Typography>
              <Typography variant="h6" color="error">
                Merk: Bare kommuneansatte kan legge til arrangementer
              </Typography>
              <Button justify="centre" onClick={e => history.push("/")} variant="contained">
                Tilbake til hovedmenyen
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
    if(this.props.priority != 'Municipality' && this.props.priority != 'Administrator'){
      return (
        <div>
          <Card className="must-log-in-to-create-event" align="center">
            <CardContent>
              <Typography variant="h5" color="error">
                Du har ikke lov til å legge til arrangementer
              </Typography>
              <Typography variant="h5" color="error">
                Merk: Bare kommuneansatte kan legge til arrangementer
              </Typography>
              <Button justify="centre" onClick={e => history.push("/")} variant="contained">
                Tilbake til hovedmenyen
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
    return (
      <div>
      <Dialog
        open={this.state.failureDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Du må velge et sted på kartet eller ved å søke det opp'}</DialogTitle>
        <DialogActions>
          <Button onClick={this.handleFailureDialogClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
        <div className={classes.Stepper}>
          <Typography variant="h2" className={classes.title} align="center" color="primary">Opprett et arrangement</Typography>
          <Stepper activeStep={this.state.activeStep}>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div className={classes.bottomContent}>
            {this.state.activeStep === steps.length ? (
              <Card className={classes.createeventdone} align="center">
                <CardContent>
                  <Typography className={classes.instructions}>
                    {"Takk! Arrangementet er blitt opprettet."}
                  </Typography>
                  <Button variant="contained" color="primary"
                  className={classes.createeventdonebutton}
                  onClick={this.handleFinish}
                  >
                    Ferdig
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
                {getStepContent(this.state.activeStep, this.state, this.handleChange,
                              this.handleStartDateChange, this.handleEndDateChange, this.handleUpload, this.props.classes)}
                <Card className={classes.navigationbuttons} align="center">
                  <CardContent>
                    <Button
                      disabled={this.state.activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                    >
                      {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </CardContent>
              </Card>
            </ValidatorForm>
            )}
          </div>
        </div>
      </div>
    );
  }

  /**Handles the dates*/
  handleStartDateChange = date => {
    var dateFormat = require('dateformat');
    // console.log("Changes start date to " + dateFormat(date, "isoDateTime").slice(0,19));
    this.setState({
      dateStart: ""+ dateFormat(date, "isoDateTime").slice(0,19).toString()
      });
    console.log(this.state.dateStart);

  };
  /**Handles the dates*/
  handleEndDateChange = date => {
    var dateFormat = require('dateformat');
    // var dateEndInput = ""+ dateFormat(date, "isoDateTime").slice(0,19);
    // console.log("Changes end date to " + dateFormat(date, "isoDateTime").slice(0,19));
    // console.log("dateEndInput: " + dateEndInput);
    // console.log("dateEnd før: " + this.state.dateEnd);
    this.setState({
      dateEnd: ""+ dateFormat(date, "isoDateTime").slice(0,19)
      });
    console.log("dateEnd etter: " + this.state.dateEnd);
  };

  /** Handles clicking "Next" button */
  handleNext = () => {
    const { activeStep } = this.state;
    if(this.state.municipality != ''){
      this.setState({
      activeStep: activeStep + 1
    });}else{
      this.setState({
        failureDialog: true
        })
    }
  };
  /** removes the failureDialog once the user press ok **/
  handleFailureDialogClose = () => {
    this.setState({
      failureDialog: false
    });
  };

  /** Handles clicking "Back" button */
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  /** Handles input values
   * changes this component's state values
   * */
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /** Handles validation forms' submit event
   *  @see handleNext
   * */
  handleSubmit = e => {
    e.preventDefault();
    const { picture, title} = this.state;

    console.log(this.state);

    if(this.state.activeStep > 0){
      // if (!picture) {
      //   this.props.enqueueSnackbar('Please upload an image', { variant: 'warning' });
      //   return;
      // }
      /*--- Need formdata so multer module in backend can store the image ---*/
      let k = new FormData();
      if(this.state.image){
      k.append("image",this.state.image);
      k.append("event_name", this.state.title);
      k.append("event_description", this.state.description);
      k.append("date_starting", this.state.dateStart);
      k.append("date_ending", this.state.dateEnd);
      k.append("latitude", this.props.cords.lat);
      k.append("longitude", this.props.cords.lng);
      k.append("county_fk", this.state.county);
      k.append("municipality_fk", this.state.municipality);
      k.append("city_fk", this.state.city);
      k.append("street_fk", this.state.street);
      this.props.createEvent(k,true);
    } else this.props.createEvent({
        event_name: this.state.title,
        event_description: this.state.description,
        date_starting: this.state.dateStart,
        date_ending: this.state.dateEnd,
        latitude: this.props.cords.lat,
        longitude: this.props.cords.lng,
        county_fk: this.state.county,
        municipality_fk: this.state.municipality,
        city_fk: this.state.city,
        street_fk: this.state.street
      },false)
      // this.props.createEvent(k).then( e=> this.props.enqueueSnackbar('error', {variant: 'warning'});
    }
    this.handleNext();
  };

  /** Handles when user is done and gets sent away. */
  handleFinish = e => {
    history.push("/");
  };

  /** Handles uploading of image files */
  handleUpload = e => {
    this.setState({
      image: e.target.files[0],
      displayImg: URL.createObjectURL(e.target.files[0])
    });
  };

  componentWillReceiveProps(nextProps){
    console.log("HEEEER");
    console.log(nextProps);
    if(this.state.street !== nextProps.street){
      this.setState({
        cords: nextProps.cords,
        street: nextProps.street,
        municipality: nextProps.municipality,
        county: nextProps.county,
        city: nextProps.city
        })
    }
  }
}//Class

/**Handles map information after choosing location*/
const mapStateToProps = state => {
  return {
    errorMessage: state.errorMessage,
    //street, county, municipality, cords
    street: state.map.street,
    county: state.map.county,
    municipality: state.map.muni,
    city: state.map.city,
    cords: state.map.currentMarker,

    //user
    userId: state.user.userID,
    isLoggedIn: state.user.isLoggedIn,
    priority: state.user.priority
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEvent: (newEvent,bool) => dispatch(createEvent(newEvent,bool))
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(withRoot(withStyles(styles)(withSnackbar(CreateEvent))));
