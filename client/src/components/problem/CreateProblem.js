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
function getStepContent(step: number, state: State, handleChange: function, similarProblems: any) {
  let curSelProblem = {
    id: -1,
    category: 'Default',
    municipality: 'Default',
    street: 'Default',
    description: 'Default',
    imageURL: 'Default',
    entrepreneur: 'Default',
    status: 'Default'
  };
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
              errorMessages={['Du må velge en kategori']}
            >
              <MenuItem value={"Veier"}>Veier</MenuItem>
              <MenuItem value={"Bygninger"}>Bygninger</MenuItem>
              <MenuItem value={"Annet"}>Annet</MenuItem>
            </SelectValidator>
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
                  <Typography>{curSelProblem.description}</Typography>
                </Grid>
                <Grid item xs>
                  <h4>Kommune</h4>
                </Grid>
                <Grid item xs>
                  <Typography>{curSelProblem.municipality}</Typography>
                </Grid>
                <Grid item xs>
                <h4>Gate</h4>
                </Grid>
                <Grid item xs>
                  <Typography>{curSelProblem.street}</Typography>
                </Grid>
                <Grid item xs>
                  <h4>Entreprenør</h4>
                </Grid>
                <Grid item xs>
                  <Typography>{curSelProblem.entrepreneur}</Typography>
                </Grid>
                <Grid item xs>
                  <h4>Status</h4>
                </Grid>
                <Grid item xs>
                  <Typography>{curSelProblem.status}</Typography>
                </Grid>
                <Grid item xs>
                  <Button variant="contained" color="secondary" className="{classes.button}"
                  onClick={e => handleSupport(curSelProblem.id)}>
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
            <Typography>{state.category}</Typography>
            <Typography>{state.municipality}</Typography>
            <Typography>{state.street}</Typography>
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

/** Handles supporting an existing problem */
function handleSupport(problemId: number){
  //@TODO Handle support a problem
  console.log("Clicked updoot for " + problemId + "! Take me away hunny")
}

type Props = {};
type State = {
  activeStep: number,

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

    category: '',
    municipality: '',
    street: '',
    description: '',
    imageURL: '',
    entrepreneur: '',
    status: 'UnChecked'
  };

  similarProblems = [];

  getSimilarProblems = e => {
    //@TODO AXIOS GET SIMILAR PROBLEMS
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
    console.log(this.state);
    if(this.state.activeStep > 1){
      //@TODO Save in DB/Redux
      console.log("SAVE PROBLEM HERE")
    }
    this.handleNext();
  };

  /** Handles when user is done and gets sent away. */
  handleFinish = e => {
    history.push("/");
  }

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
                  onClick={this.handleFinish}
                  >
                    Ferdig
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
                {getStepContent(activeStep, this.state, this.handleChange)}
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
