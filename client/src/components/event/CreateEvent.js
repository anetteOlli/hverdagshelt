// @flow
import React from 'react';
import withRoot from '../../withRoot';
import { withStyles, Stepper, Step, StepLabel, Card, CardContent, CardMedia, CardActionArea, CardActions, Paper, Grid, Typography, TextField, MenuItem, Button, FormControl, FormControlLabel, Input, InputLabel } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator, ValidatorComponent } from 'react-material-ui-form-validator';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import {createEvent} from '../../store/actions/eventActions';
import Map from '../map/MapWithSearchBox';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from 'material-ui-pickers';
import 'date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignedOutLinks from '../layout/SignedOutLinks';

var dateFormat = require('dateformat');


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
  user_id: number,
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
  const today = new Date();

  switch (step) {
    case 0:
      return (
        <Card className={classes.contentNull}>
          <CardContent>
          <Typography variant="body1" className={classes.info}>Velg lokasjonen på kartet eller bruk søkefeltet</Typography>
            <Typography variant="h5" align="left" color="secondary">
              <br/>
              Lokasjon som er valgt:
            </Typography>
          <Typography variant="subtitle2" align="left" >
              Kommune: {state.municipality}
          </Typography>
          <Typography variant="subtitle2" align="left" >
              Gate: {state.street}
            <br/>
            <br/>
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
              <Typography variant="h5" align="center" color="secondary">
                Lokasjon som er valgt:
              </Typography>
              <Typography>Kommune: {state.municipality}</Typography>
              <Typography>Gate: {state.street}</Typography>
              <TextValidator
                fullWidth
                margin="normal"
                label="Tittel"
                name="title"
                autoComplete="title"
                value={state.title}
                onChange={handleChange}
                validators={['required', 'minStringLength:5', 'maxStringLength:50']}
                errorMessages={['Du må skrive inn en tittel', 'Du må skrive minst 5 bokstaver', 'Du kan ha max 50 bokstaver i tittelen']}
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
                validators={['required', 'maxStringLength:300', 'minStringLength:10']}
                errorMessages={['Du må skrive inn en beskrivelse', 'Beskrivelsen kan være maks 300 ord', 'Beskrivelsen må være minst 10 ord']}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around">
                  <DatePicker
                    minDate={today}                    fullWidth
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
                    minDate={today}                    fullWidth
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
class CreateEvent extends React.Component<Props, State>{
  state = {
    activeStep: 0,

    title: '',
    description: '',
    // dateStart: new Date(),
    // dateEnd: new Date(),

    dateStart: dateFormat(new Date(), "isoDateTime").slice(0,19).toString(),
    dateEnd: dateFormat(new Date(), "isoDateTime").slice(0,19).toString(),

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
    user_id: -1,
    isLoggedIn: false,
    priority: '',
    failureDialog: false
  };

  render() {
    const { classes } = this.props;
    //const { enqueueSnackbar } = this.props;
    const steps = getSteps();
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
            </CardContent>
            <CardContent>
              <SignedOutLinks />
            </CardContent>
            <CardContent>
              <Button justify="centre" onClick={this.handleFinish} variant="contained">
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
            </CardContent>
            <CardContent>
              <Button justify="centre" onClick={this.handleFinish} variant="contained">
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
                      Tilbake
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                    >
                      {this.state.activeStep === steps.length - 1 ? 'Send Inn' : 'Neste'}
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
    this.setState({
      dateStart: ""+ dateFormat(date, "isoDateTime").slice(0,19).toString()
      });
  };
  /**Handles the dates*/
  handleEndDateChange = date => {
    var dateFormat = require('dateformat');
    this.setState({
      dateEnd: ""+ dateFormat(date, "isoDateTime").slice(0,19)
      });
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
      k.append("county", this.state.county);
      k.append("municipality", this.state.municipality);
      k.append("city", this.state.city);
      k.append("street", this.state.street);
      this.props.createEvent(k,true);
    } else this.props.createEvent({
        event_name: this.state.title,
        event_description: this.state.description,
        date_starting: this.state.dateStart,
        date_ending: this.state.dateEnd,
        latitude: this.props.cords.lat,
        longitude: this.props.cords.lng,
        county: this.state.county,
        municipality: this.state.municipality,
        city: this.state.city,
        street: this.state.street
      })
      // this.props.createEvent(k).then( e=> this.props.enqueueSnackbar('error', {variant: 'warning'});
    }
    this.handleNext();
  };

  /** Handles when user is done and gets sent away. */
  handleFinish = () => {
    this.props.history.push("/");
  };

  /** Handles uploading of image files */
  handleUpload = e => {
    this.setState({
      image: e.target.files[0],
      displayImg: URL.createObjectURL(e.target.files[0])
    });
  };

  componentWillReceiveProps(nextProps){
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
    municipality: state.map.municipality,
    city: state.map.city,
    cords: state.map.currentMarker,

    //user
    user_id: state.user.user_id,
    isLoggedIn: state.user.isLoggedIn,
    priority: state.user.priority
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEvent: (newEvent,bool = false) => dispatch(createEvent(newEvent,bool))
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(withRoot(withStyles(styles)(withSnackbar(CreateEvent))));
