// @flow
import React from 'react';
import withRoot from '../../withRoot';
import { withStyles, Stepper, Step, StepLabel, Card, CardContent, CardMedia, CardActionArea, CardActions, Paper, Grid, Typography, TextField, MenuItem, Button, FormControl, FormControlLabel,} from '@material-ui/core';
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
import Map from '../map/maptest';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path

type Props = {
  classes: Object,
  enqueueSnackbar: Function,
  errorMessage: string,
};

type State = {
  activeStep: number,

  title: string,
  description: string,
  dateStart: string,
  dateEnd: string,
  imageURL: string,
  status: string,

  displayImg: string,
  picture: any,

  municipality: string,
  street: string,

};

/**Styling*/
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
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
  }
});

/**Municipality placeholder*/
const municipalities = [
  {
    value: 'Rogaland',
    label: 'Rogaland',
  },
  {
    value: 'Hordaland',
    label: 'Hordaland',
  },
  {
    value: 'Sør-Trøndelag',
    label: 'Sør-Trøndelag',
  },
  {
    value: 'Finnmark',
    label: 'Finnmark',
  },
];

/** @return the title for a specific step in the stepper */
function getSteps() {
  return ['Hvor er arrangementet?', 'Beskriv problemet'];
}

/** @return the content (divs, buttons, etc) for a specific step in the stepper
* @params step: number, current step in Stepper
* @params state: State, CreateEvent's State
* @params handleChange: @see handleChange
* @params handleChangeSpec: @see handleChangeSpec
* @params handleUpload: @see handleUpload
*/
function getStepContent(step: number,
                        state: State,
                        handleChange: function,
                        handleChangeSpec: function,
                        handleUpload: function,
                        classes: Props) {

  switch (step) {
    case 0:
      return (
        <Card className={classes.contentNull}>
          <CardContent>
          <Typography>Skriv inn lokasjon til eventet eller velg lokasjonen på kartet</Typography>
            <TextValidator
              fullWidth
              margin="normal"
              label="Kommune"
              name="municipality"
              autoComplete="municipality"
              value={state.municipality}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['Du må skrive inn en kommune']}
            />
            <TextValidator
              fullWidth
              margin="normal"
              label="Gate"
              name="street"
              autoComplete="street"
              value={state.street}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['Du må skrive inn en gate']}
            />
            <div className={classes.mapPlaceholder}>
            <Typography className={classes.mapText}>Her kan du velge lokasjonen på kartet:</Typography>
              <Map />
            </div>
          </CardContent>
        </Card>
      );
      case 1:
        return (
          <Card className={classes.contentEn} align="center">
            <CardContent>
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
              <TextValidator
                fullWidth
                margin="normal"
                label="Dato arrangementet starter"
                name="dateStart"
                autoComplete="DD-MM-ÅÅÅÅ"
                value={state.dateStart}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Du må skrive inn en start-dato']}
              />
              <TextValidator
                fullWidth
                margin="normal"
                label="Dato arrangementet slutter"
                name="dateEnd"
                autoComplete="DD-MM-ÅÅÅÅ"
                value={state.dateEnd}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Du må skrive inn en slutt-dato']}
              />
              <TextValidator
                fullWidth
                margin="normal"
                label="Status"
                name="status"
                autoComplete="status"
                value={state.status}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Du må skrive inn en status på arrangementet']}
              />
              <FormControl fullWidth margin="normal">
                {state.displayImg != '' ?
                (<CardMedia
                  image={state.displayImg || ''}
                  title="Image title"
                  style={{
                    height: 0,
                    paddingTop: '56.25%'
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
    dateStart: '',
    dateEnd: '',
    status: '',
    imageURL: '',

    picture: '',
    displayImg: '',

    municipality: '',
    street: '',
  };

  render() {
    const { classes } = this.props;
    //const { enqueueSnackbar } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <div className={classes.Stepper}>
          <Typography variant="h3" className={classes.title}>Opprett et arrangement</Typography>
          <Stepper activeStep={activeStep}>
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
            {activeStep === steps.length ? (
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
                {getStepContent(activeStep, this.state, this.handleChange,
                              this.handleChangeSpec, this.handleUpload, classes)}
                <Card className={classes.navigationbuttons} align="center">
                  <CardContent>
                    <Button
                      disabled={activeStep === 0}
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
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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

  /** Handles clicking "Next" button */
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
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
    //console.log(this.state);

    if(this.state.activeStep > 0){
      if (!picture) {
        this.props.enqueueSnackbar('Please upload an image', { variant: 'warning' });
        return;
      }
      /*--- Need formdata so multer module in backend can store the image ---*/
      const formData = new FormData();
      formData.append('title', title);
      formData.append('picture', picture);
      console.log(formData);
      //@TODO Save in DB/Redux
      this.props.createEvent(this.state).then( e=> this.props.enqueueSnackbar('error', {variant: 'warning'})
      );
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
      picture: e.target.files[0],
      displayImg: URL.createObjectURL(e.target.files[0])
    });
  };

  componentWillMount(){
    // this.getMunicipalities();
  }

  componentWillReceiveProps(nextProps){
    console.log("HEEEER")
    console.log(nextProps);
    if(this.state.street !== nextProps.street){
      this.setState({
        cords: nextProps.cords,
        street: nextProps.street,
        municipality: nextProps.muni,
        county: nextProps.county,
        city: nextProps.city
        })
    }
    // this.getMunicipalities();
  }
}//CreateEvent

/**Handles map information after choosing location*/
const mapStateToProps = state => {
  return {
    errorMessage: state.events.errorMessage,
    //street, county, municipality, cords
    street: state.map.street,
    county: state.map.county,
    municipality: state.map.muni,
    city: state.map.city,
    cords: state.map.cords
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEvent: newEvent => dispatch(createEvent(newEvent))
  };
};

export default connect(
  null,
  mapStateToProps,
  mapDispatchToProps
  )(withRoot(withStyles(styles)(withSnackbar(CreateEvent))));
