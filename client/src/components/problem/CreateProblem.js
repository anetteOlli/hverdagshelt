// @flow
import React from 'react';
import withRoot from '../../withRoot';
import createHashHistory from 'history/createHashHistory'
const history = createHashHistory();

// Material-ui
import {Select, Input, MenuItem, Stepper, Step, StepLabel, Button, Typography,
        Grid, Paper, Card, CardContent, TextField
        } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator, ValidatorComponent } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

/**
 * @fileOverview Create Problem Component
 * @author Sindre H. Paulshus
 * */

const styles = theme => ({
  root: {
    width: '90%',
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
  }
});

/** @return the title for a specific step in the stepper */
function getSteps() {
  return ['Hvor er problemet?', 'Forslag til like problemer', 'Beskriv problemet'];
}

/** @return the content (divs, buttons, etc) for a specific step in the stepper */
function getStepContent(step, state: State, handleChange: function, handleSubmit: function) {
  switch (step) {
    case 0:
      return (
        <Card className="content-0">
          <CardContent>
            <SelectValidator
              fullWidth
              margin="normal"
              label="Kategori"
              name="category"
              autoComplete="category"
              value={state.category}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['Du må velge en kategori', 'Ugyldig kategori']}
            >
              <MenuItem value={0}>Veier</MenuItem>
              <MenuItem value={1}>Bygninger</MenuItem>
              <MenuItem value={2}>Annet</MenuItem>
            </SelectValidator>
            <TextValidator
              fullWidth
              margin="normal"
              label="Kommune"
              name="municipality"
              autoComplete="municipality"
              value={state.municipality}
              onChange={handleChange}
              validators={['required', 'matchRegexp:^[a-zA-ZøæåØÆÅ]*$']}
              errorMessages={['Du må skrive inn en kommune', 'Ugyldig kommune']}
            />
            <TextValidator
              fullWidth
              margin="normal"
              label="Gate"
              name="street"
              autoComplete="street"
              value={state.street}
              onChange={handleChange}
              validators={['required', 'matchRegexp:^[a-zA-ZøæåØÆÅ]*$']}
              errorMessages={['Du må skrive inn en gate', 'Ugyldig gate']}
            />
            <div className="mapPlaceholder">
              MAP HERE
            </div>
          </CardContent>
        </Card>
      );
    case 1:
      return (
        <Card className="content-1">
          <CardContent>
            <Grid container spacing={8}>
              <Grid item sm={4} className="MU-table">
                MU TABLE HERE
              </Grid>
              <Grid item
              xs container
              direction="column"
              alignItems="flex-start"
              >
                <Grid item xs>
                  <h4>Beskrivelse</h4>
                </Grid>
                <Grid item xs>
                  <Typography>Beskrivelse</Typography>
                </Grid>
                <Grid item xs>
                  <h4>Kommune</h4>
                </Grid>
                <Grid item xs>
                  <Typography>Kommune</Typography>
                </Grid>
                <Grid item xs>
                <h4>Gate</h4>
                </Grid>
                <Grid item xs>
                  <Typography>Gate</Typography>
                </Grid>
                <Grid item xs>
                  <h4>Entreprenør</h4>
                </Grid>
                <Grid item xs>
                  <Typography>Entreprenør</Typography>
                </Grid>
                <Grid item xs>
                  <h4>Status</h4>
                </Grid>
                <Grid item xs>
                  <Typography>Status</Typography>
                </Grid>
                <Grid item xs>
                  <Button variant="contained" color="secondary" className="{classes.button}"
                  onClick={e => console.log("Clicked updoot! Take me away hunny")}>
                     Støtt problemet
                   </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    case 2:
      return (
        <Card className="content-2" align="center">
          <CardContent>
            <Typography>Kategori</Typography>
            <Typography>Kommune</Typography>
            <Typography>Gate</Typography>
            <ValidatorTextField
              fullWidth
              margin="normal"
              label="Beskrivelse"
              name="description"
              autoComplete="description"
              value={state.description}
              onChange={handleChange}
              errorMessages={['Du må skrive inn en beskrivelse', 'Ugyldig beskrivelse']}

              id="myTextField"
              label="Beskrivelse"
              placeholder="Beskrivelse"
            />
            <Typography>Last opp et bilde</Typography>
            <Fab color="primary" aria-label="Add" className="{classes.fab}">
              <AddIcon />
            </Fab>
          </CardContent>
        </Card>
      );
    default:
      return 'Unknown step';
  }
}

/** Validator Component class for multiline textinput */
class ValidatorTextField extends ValidatorComponent{
  render() {
    const { errorMessages, validators, requiredError, value, ...rest } = this.props;
    return (
      <div>
        <TextField
          id={this.props.id}
          label={this.props.label}
          placeholder={this.props.placeholder}
          multiline
          className="ValidatorTextField"
          margin="normal"
          onChange={this.props.onChange}
          name={this.props.name}
          ref={(r) => { this.input = r; }}
        />
      </div>
    );
  }
}

type Props = {};
type State = {
  activeStep: number,
  skipped: any,

  category: string,
  municipality: string,
  street: string,
  description: string,
  imageURL: string,
  entrepreneur: string,
  status: string
};

/** CreateProblem Component */
class CreateProblem extends React.Component<Props, State> {
  state = {
    activeStep: 0,
    skipped: new Set(),

    category: '',
    municipality: '',
    street: '',
    description: '',
    imageURL: '',
    entrepreneur: '',
    status: 'UnChecked'
  };

  /** Handles clicking "Next" button */
  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    this.setState({
      activeStep: activeStep + 1,
      skipped,
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
    console.log(this.state);
    this.handleNext();
  };

  render() {
    //const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <div>
        <Typography>Registrer Problem</Typography>
        <div className=" Stepper">
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
          <div className="bottomContent">
            {activeStep === steps.length ? (
              <Card className="create-problem-done" align="center">
                <CardContent>
                  <Typography className="{classes.instructions}">
                    {"Takk! Du vil bli oppdatert når det skjer noe med problemet"}
                  </Typography>
                  <Button variant="contained" color="primary"
                  className="create-problem-done-button"
                  onClick={e => history.push("/")}
                  >
                    Ferdig
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
                {getStepContent(activeStep, this.state, this.handleChange, this.handleSubmit)}
                <Card className="navigation-buttons" align="center">
                  <CardContent>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="{classes.button}"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="{classes.button}"
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
}

export default withRoot(CreateProblem);
