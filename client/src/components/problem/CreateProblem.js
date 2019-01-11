// @flow
import React from 'react';
import withRoot from '../../withRoot';
import createHashHistory from 'history/createHashHistory'
const history = createHashHistory();

// Material-ui
import {Select, Input, MenuItem, Stepper, Step, StepLabel, Button, Typography,
        Grid, Paper, Card, CardContent, CardActionArea, CardActions, CardMedia , TextField,
        Icon, Fab
        } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator, ValidatorComponent } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import MuiTable from '../util/MuiTable'
import createMuiData from '../util/createMuiData'
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import {createProblem, getProblemsByMuniAndStreet} from '../../store/actions/problemActions';
import {getCategories} from '../../store/actions/categoryActions';

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
  },
  media:{
    objectFit: 'cover',
  }
});

/** @return the title for a specific step in the stepper */
function getSteps() {
  return ['Hvor er problemet?', 'Forslag til like problemer', 'Beskriv problemet'];
}

/** @return the content (divs, buttons, etc) for a specific step in the stepper
* @params step: number, current step in Stepper
* @params state: State, CreateProblem's State
* @params handleChange: @see handleChange
* @params handleChangeSpec: @see handleChangeSpec
* @params handleUpload: @see handleUpload
* @params similarProblems: [], array of similar problems to our user's
* @params categories: [], array of ALL problem categories
*/
function getStepContent(step: number, state: State,
                      handleChange: function, handleChangeSpec: function, handleUpload: function,
                      similarProblems: [], categories: []) {
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
            {state.categories.map((e,i) => (
              <MenuItem key={i} value={e}>{e}</MenuItem>
              ))}
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
      const rows = (state.similarProblems == null ? [] : createMuiData(state.similarProblems));
      //console.log(rows);
      return (
        <Card className="content-1">
          <CardContent>
            <Grid container spacing={8}>
              <Grid item sm={4} className="MuiTable">
                <MuiTable
                rows={rows}
                onClick={e => {
                  let myProblem = state.similarProblems.filter(a => e.rowData.eId == a.id)[0];
                  handleChangeSpec("cur_id", myProblem.id);
                  handleChangeSpec("cur_title", myProblem.title);
                  handleChangeSpec("cur_municipality", myProblem.municipality);
                  handleChangeSpec("cur_street", myProblem.street);
                  handleChangeSpec("cur_description", myProblem.description);
                  handleChangeSpec("cur_entrepreneur", myProblem.entrepreneur);
                  handleChangeSpec("cur_status", myProblem.status);
                  handleChangeSpec("cur_imageURL", myProblem.imageURL);
                  }}
                />
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
                  <Typography>{state.cur_description}</Typography>
                </Grid>
                <Grid item xs>
                  <h4>Kommune</h4>
                </Grid>
                <Grid item xs>
                  <Typography>{state.cur_municipality}</Typography>
                </Grid>
                <Grid item xs>
                <h4>Gate</h4>
                </Grid>
                <Grid item xs>
                  <Typography>{state.cur_street}</Typography>
                </Grid>
                <Grid item xs>
                  <h4>Entreprenør</h4>
                </Grid>
                <Grid item xs>
                  <Typography>{state.cur_entrepreneur}</Typography>
                </Grid>
                <Grid item xs>
                  <h4>Status</h4>
                </Grid>
                <Grid item xs>
                  <Typography>{state.cur_status}</Typography>
                </Grid>
                <Grid item xs>
                  <Button variant="contained" color="secondary" className="{classes.button}"
                  onClick={e => handleSupport(state.cur_id)}>
                     Støtt problemet
                   </Button>
                </Grid>
              </Grid>
              <Grid item
              xs container
              direction="column"
              alignItems="center"
              justify="center"
              >
                <Grid item sm={10}>
                  <Card>
                    <CardMedia
                    component="img"
                    alt="problem img"
                    height="300"
                    width="300"
                    image={state.cur_imageURL}
                    title="problem image"
                    />
                  </Card>
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
            <Typography>Last opp et bilde</Typography>
            <Fab color="primary" aria-label="Add" className="{classes.fab}">
              <AddIcon onClick={handleUpload}/>
            </Fab>
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
function handleSupport(problemId: number){
  //@TODO Handle support a problem
  console.log("Clicked updoot for " + problemId + "! Take me away hunny")
}

type Props = {};
type State = {
  activeStep: number,

  title: string,
  category: string,
  municipality: string,
  street: string,
  description: string,
  imageURL: string,
  entrepreneur: string,
  status: string,

  cur_id: -1,
  cur_title: 'Default',
  cur_category: 'Default',
  cur_municipality: 'Default',
  cur_street: 'Default',
  cur_description: 'Default',
  cur_imageURL: 'Default',
  cur_entrepreneur: 'Default',
  cur_status: 'Default',

  similarProblems: [],
  categories: []
};

/** CreateProblem Component */
class CreateProblem extends React.Component<Props, State> {
  constructor() {
    super();
    this.handleChangeSpec = this.handleChangeSpec.bind(this);
  }

  state = {
    activeStep: 0,

    title: '',
    category: '',
    municipality: '',
    street: '',
    description: '',
    imageURL: '',
    entrepreneur: '',
    status: 'Unchecked',

    cur_id: -1,
    cur_title: 'defaultTitle',
    cur_category: 'defaultCat',
    cur_municipality: 'defaultMuni',
    cur_street: 'defaultStreet',
    cur_description: 'defaultDesc',
    cur_imageURL: 'defaultImgUrl',
    cur_entrepreneur: 'defaultEntrepreneur',
    cur_status: 'defaultStatus',

    similarProblems: [{id:1, title: 'default', category: 'default', municipality: 'default',
                      street: 'default', description: 'default', status: 'Unchecked', imageURL: "default"}],
    categories: ['Default']
  };

  componentWillMount(){
    //this.getSimilarProblems("", "");
    this.getCategories();
  }

  /** Gets problems in vicinity
   * @params municipality: string, the user-selected municipality
   * @params street: string, the inputted street
   * */
  getSimilarProblems(municipality: string, street: string) {
    //@TODO AXIOS GET SIMILAR PROBLEMS
    /*
    [
      {id:1, title: 'Hull i vei', category: 'Veier', municipality: 'Vestby', street: 'Kongens Gate', description: 'abc', status: 'Unchecked', imageURL: "https://frontnews.eu/contents/news/7936/images/resize_g0fGyc2N8zYuO6kVZUKI3hqe7mWn45Tv_980x590.jpg"},
      {id:2, title: 'Dårlig rengjøring', category: 'Bygninger', municipality: 'Trondheim', street: 'Jørunds Gate', description: 'def', status: 'Checked', imageURL: "https://previews.123rf.com/images/metrue/metrue1412/metrue141200013/34190474-abandoned-overgrown-building-exterior-urban-industrial-construction.jpg" },
      {id:3, title: 'Problem?', category: 'Annet', municipality: 'Ås', street: 'Torget', description: 'mnl', status: 'Working', imageURL: "https://i.kym-cdn.com/photos/images/newsfeed/000/096/044/trollface.jpg?1296494117" }
    ]
    */
    let simProbs = this.props.getProblemsByMuniAndStreet(municipality, street)
    .then(e => this.props.enqueueSnackbar('error',{variant: 'warning'})
    );

    if(simProbs[0] != null){
      this.state.similarProblems = simProbs;
    }
  }

  /** Gets ALL problem categories*/
  getCategories(){
    //@TODO AXIOS GET CATEGORIES
    //this.state.categories = ['Veier', 'Bygninger', 'Annet'];
     let categories = this.props.getCategories();

    if(categories[0] != null){
      this.state.categories = categories;
    }
  }

  /** Handles clicking "Next" button */
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
    if(activeStep == 1){
      this.getSimilarProblems(this.state.municipality, this.state.street);
    }
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

  /** Handles input values which are not from ordinary events
   * changes this component's state values
   * @params name: the name of the state variable to set
   * @params value: the value to set a state variable
   * */
  handleChangeSpec(name, value){
    this.setState({ [name]: value });
  };

  /** Handles validation forms' submit event
   *  @see handleNext
   * */
  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
    if(this.state.activeStep > 1){
      //@TODO Save in DB/Redux
      this.props.createProblem(this.state).then( e =>
        this.props.enqueueSnackbar('error',{variant: 'warning'})
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
    //@TODO make uploader for image
    console.log("Upload me hunny!");
  }

  render() {
    //const { classes } = this.props;
    //console.log(this.props);
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
              <ValidatorForm onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
                {getStepContent(activeStep, this.state, this.handleChange,
                              this.handleChangeSpec, this.handleUpload)}
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


const mapStateToProps = state => {
  return {
    errorMessage: state.problems.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProblem: newProblem => dispatch(createProblem(newProblem)),
    getCategories: categories => dispatch(getCategories()),
    getProblemsByMuniAndStreet: (muni, street) => dispatch(getProblemsByMuniAndStreet(muni, street))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(CreateProblem))));
