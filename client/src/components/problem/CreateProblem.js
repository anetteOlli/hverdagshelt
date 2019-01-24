// @flow
import React from 'react';
import withRoot from '../../withRoot';
import createHashHistory from 'history/createHashHistory'
const history = createHashHistory();

// Material-ui
import {Select, Input, MenuItem, Stepper, Step, StepLabel, Button, Typography,
        Grid, Paper, Card, CardContent, CardActionArea, CardActions, CardMedia , TextField,
        Icon, Fab, Switch, ExpansionPanel, ExpansionPanelSummary,ExpansionPanelDetails,
        FormControl, FormControlLabel, FormHelperText, Divider, Tooltip
        } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator, ValidatorComponent } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//Created by us
import {createProblem, getProblemsByStreet, supportProblem} from '../../store/actions/problemActions';
import {getCategories} from '../../store/actions/categoryActions';
import Map from '../map/MapWithSearchBox';
import MuiTable2 from '../util/MuiTable-2';
import MuiTable from '../util/MuiTable';
import createMuiData from '../util/createMuiData';
import SignedOutLinks from '../layout/SignedOutLinks';

/**
 * @fileOverview Create Problem Component
 * @author Sindre H. Paulshus
 * */

const styles = theme => ({
  "@global": {
     html: {
       [theme.breakpoints.down("sm")]: {
         fontSize: 12
       },
       [theme.breakpoints.up("sm")]: {
         fontSize: 16
       }
    }
  },
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
    padding: 10
  },
  media:{
    objectFit: 'cover',
  },
  MuiTable:{
    [theme.breakpoints.down('xs')]:{
      minWidth: 50
    }
  },
  Typography:{
    fontSize: '50%'
  }
});

/** @return the title for a specific step in the stepper */
function getSteps() {
  return ['Hvor er problemet?', 'Nærliggende problemer', 'Beskriv problemet'];
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
                      handleChange: function, handleChangeSpec: function, handleUpload: function, handleSupport: function,
                      props: any) {
  //console.log(props.categories[0]);
  //props.categories.map((e,i) => console.log(e + " / " + i));
  //console.log(state.categories);
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
            {props.categories.map((e,i) => (
              <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}
            </SelectValidator>
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
            {console.log('state in createProblem', state)}
            <div className="mapPlaceholder">
              <Map />
            </div>
          </CardContent>
        </Card>
      );
    case 1:
      //const rows = (state.similarProblems == null ? [] : createMuiData(state.similarProblems));
      const rows = (state.similarProblems == null ? [] : state.similarProblems);
      //console.log("rows step 1: ", rows);
      const clicked = (state.cur_title != '' && state.cur_title != null);
      const haveRows = (rows[0] != null);
      return (
        <Card className="content-1">

          <CardContent>
          <Typography variant="h5" align="center" color="secondary">
            Nærliggende problemer
          </Typography>
          <Typography variant="subtitle1" align="center" color="primary">
            Finnes problemet fra før av? <br/>
            Gjerne støtt problemet så vet vi at det rammer mange
          </Typography>
          <br/>
            <Grid container
            spacing={8}
            direction="row"
            >
              <Grid item
              md={4} xs={12}
              style={{position: 'relative'}}
              >
              {haveRows ? (
                  <MuiTable2
                    rows={rows}
                    height={"100%"}
                    onClick={e => {
                      let myProblem = e;
                      handleChangeSpec("cur_id", myProblem.problem_id);
                      handleChangeSpec("cur_title", myProblem.problem_title);
                      handleChangeSpec("cur_description", myProblem.problem_description);
                      handleChangeSpec("cur_entrepreneur", myProblem.entrepreneur_id);
                      handleChangeSpec("cur_status", myProblem.status);
                      handleChangeSpec("cur_imageURL", myProblem.img_user);
                    }}
                  />
              ):(
                <div/>
              )}
              </Grid>
              <Grid item container
              direction="column"
              md={8}
              xs={12}
              spacing={24}
              alignItems="center"
              >
                <br/>
                <Typography variant="h5" align="center" color="secondary">
                    {state.municipality},
                </Typography>
                <Typography variant="h5" align="center" color="secondary">
                    {state.street}
                </Typography>
                <Card style={{width:'90%'}} align="center">
                    {haveRows ? (clicked ?  (
                    <div>
                    <CardMedia
                      component="img"
                      alt="Bilde av Problem"
                      height="180"
                      image={state.cur_imageURL || "https://semantic-ui.com/images/wireframe/image.png"}
                      title={state.cur_title}
                      style={{objectFit: 'cover'}}
                    />
                    <CardContent>
                      <Grid item sm={12}>
                        <Typography gutterBottom variant="h5" align="center" color="secondary">{state.cur_title}</Typography>
                      </Grid>
                      <Grid item sm={12}>
                        <Typography align="center">{state.cur_description}</Typography><br/>
                      </Grid>
                      <Grid item md={6}>
                        <Typography variant="subtitle2" color="error" align="center">{state.cur_status}</Typography><br/>
                      </Grid>
                      <Grid item xs>
                        <Tooltip title="Du vil få epost om noe skjer med problemet" placement="top">
                          <Button
                          variant="outlined" color="primary"
                          size="small"
                          align="center"
                          onClick={e => handleSupport(state.cur_id)}
                          >
                             Støtt problemet
                          </Button>
                        </Tooltip>
                        <br/>
                        {state.loadingSupport && (
                        <CircularProgress size={24} />
                        )}
                      </Grid>
                    </CardContent>
                    </div>) : (
                    <Grid item xs>
                      <Typography align="center" color="primary">
                        Velg et problem til venstre for å se beskrivelse
                      </Typography>
                    </Grid>
                    )) : (
                    <Grid item xs>
                      <Typography align="center" color="error">
                        Ingen like problem, gå videre
                      </Typography>
                    </Grid>
                  )}
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    case 2:
      return (
        <Card className="content-2" align="center">
          <CardContent>
            <Typography variant="h6" align="center" color="secondary">{state.category}</Typography>
            <Typography variant="h6" color="primary">{state.municipality},</Typography>
            <Typography variant="h6" color="primary">{state.street}</Typography>
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
            <br/>
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
              : (<i className="imgHere"></i>)}
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                  <CloudUploadIcon className="icon-button" />
                  Last opp bilde
                </Button>
              </label>
            </FormControl>
          </CardContent>
        </Card>
      );
    default:
      return 'How\'d you get to this step boi?';
  }
}

type Props = {
  municipality: string,
  street: string,
  cords : {
    lat: string,
    lng: string
  },
  county: string,
  city: string,
  categories: string,
  similarProblems: string,
  similarProblems: Problem[],
  getProblemsByStreet: Function,
  getCategories: Function,
  user_id: string,
  createProblem: Function,
  errorMessage: string,
  enqueueSnackbar: Function,
  supportProblem: Function,
  isLoggedIn: boolean,
  handleSupportDialogClose: Function,
  handleSupportDialogCloseFron: Function,
  backToFrontPage: Function,
};
type Problem = {
  problem_id: number,
  problem_title: string,
  problem_description: string,
  entrepreneur_id: string,
  status: string,
  img_user: string


};

type   state = {
    activeStep: number,
    //User
    user_id: number,

    municipality: string,
    title: string,
    category: string,
    street: string,
    description: string,
    image: string,
    cords : {
      lat: string,
      lng: string
    },
    displayImg: string,

    cur_id: number,
    cur_title: string,
    cur_description: string,
    cur_imageURL: string,
    cur_entrepreneur: string,
    cur_status: string,
    showSuppordDialog: boolean,
    loadingSupport: boolean,
    loadingCreateProb: boolean,

    similarProblems:
      [
        {problem_id: number, problem_title: string, category: string, municipality: string, entrepreneur_id: string,
        street: string, problem_description: string, status: string, img_user: string}
        ],
    categories:['Default']
  };


/** CreateProblem Component */
class CreateProblem extends React.Component<Props, State> {
  constructor() {
    super();
    // $FlowFixMe
    this.handleChangeSpec = this.handleChangeSpec.bind(this);
    // $FlowFixMe
    this.handleSupport = this.handleSupport.bind(this);
  }

  state = {
    activeStep: 0,
    //User
    user_id: 1,
    city: '',
    county: '',
    municipality: '',
    title: '',
    category: '',
    street: '',
    description: '',
    image: '',
    cords : {
      lat: '',
      lng: ''
    },
    displayImg: '',

    cur_id: -1,
    cur_title: '',
    cur_description: '',
    cur_imageURL: '',
    cur_entrepreneur: '',
    cur_status: '',
    failureDialog: false,
    showSuppordDialog: false,
    loadingSupport: false,
    loadingCreateProb: false,

    similarProblems:
      [
        {problem_id:1, problem_title: '', category: '', municipality: '', entrepreneur_id: '',
        street: '', problem_description: '', status: 'Unchecked', img_user: ""}
        ],
    categories:['Error']
  };

  componentDidMount(){
    //this.props.getCategories();
    this.getCategories();
  }

  componentWillReceiveProps(nextProps: Props){
    console.log("NextProps")
    console.log(nextProps);
    if(this.state.street !== nextProps.street){
      this.setState({
        cords: nextProps.cords,
        street: nextProps.street,
        municipality: nextProps.municipality,
        county: nextProps.county,
        city: nextProps.city
      });
    }
    this.setState({
      categories: nextProps.categories
    });
    //this.handleChangeSpec("category", nextProps.categories[0]);
  }

  /** Gets problems in vicinity
  * @params municipality: string, the user-selected municipality
  * @params street: string, the inputted street
  * */
  getSimilarProblems(street: string, municipality: string, county: string){
     this.props.getProblemsByStreet(street, municipality, county)
     .then(() => {
        //console.log("Ferdiog!!")
        let myProbs = this.props.similarProblems;
        /*
        this.props.similarProblems.map(e => {
          console.log(this.props.similarProblems);
          myProbs.push({
              similarProblems
          })
        });*/
        console.log("My probs");
        console.log(myProbs);

        //Set default to first
        if(myProbs[0] != null){
          this.handleChangeSpec("cur_id", myProbs[0].problem_id);
          this.handleChangeSpec("cur_title", myProbs[0].problem_title);
          this.handleChangeSpec("cur_description", myProbs[0].problem_description);
          this.handleChangeSpec("cur_entrepreneur", myProbs[0].entrepreneur_id);
          this.handleChangeSpec("cur_status", myProbs[0].status);
          this.handleChangeSpec("cur_imageURL", myProbs[0].img_user);
        }
        else{
          //myProbs = [{id:1, title: 'default', category: 'default', municipality: 'default', entrepreneur: 'Bob1', street: 'default', description: 'default', status: 'Unchecked', imageURL: "default"}]
        }

        this.setState({similarProblems: myProbs});
    });
  }

  /** Gets ALL problem categories*/
  getCategories(){
    this.props.getCategories()
    .then(e => {
      console.log("Props after get");
      console.log(this.props.categories);
      this.handleChangeSpec("category", this.props.categories[0]);
    });
    //console.log("Props");
    //console.log(this.props.categories);
    //this.setState({categories: this.props.categories});
    //this.props.getCategories()
    //console.log("State");
    //console.log(this.state.categories);
    //Set default to first
  }

  /** Handles clicking "Next" button */
  handleNext = () => {
    const { activeStep } = this.state;
    if(activeStep == 0){
      this.getSimilarProblems(this.state.street, this.state.municipality, this.state.county);
    }
    if(this.state.municipality != ''){
      this.setState({
        activeStep: activeStep + 1
      });
    }else{
      this.setState({
        failureDialog: true
      });
    }
  };

  /** setting failureDialog: false will close the failureDialog*/
  handleFailureDialogClose = () => {
    this.setState({
      failureDialog: false
    });
  };
  /**  setting showSuppordDialog: false will close the showSuppordDialog and
  * this method will also redirect user to the frontpage
  */
  handleSupportDialogCloseFront = () => {
    this.setState({
      showSuppordDialog: false
    });
    history.push("/");
  };
  /**
  *setting showSuppordDialog: false will close the showSuppordDialog.
  * Rest of the function will refresh the similarProblems-lists, in order
  * to update the number of "likes" on the problem the user clicked on
  */
  handleSupportDialogClose = () => {
    this.setState({
      showSuppordDialog: false
    });
    this.props.getProblemsByStreet(this.state.street, this.state.municipality, this.state.county).then(() => {
       //console.log("Ferdiog!!")
       let myProbs = this.props.similarProblems;
       /*
       this.props.similarProblems.map(e => {
         console.log(this.props.similarProblems);
         myProbs.push({
             similarProblems
         })
       });*/
       console.log("My probs");
       console.log(myProbs);

       //Set default to first
       if(myProbs[0] != null){
         this.handleChangeSpec("cur_id", myProbs[0].problem_id);
         this.handleChangeSpec("cur_title", myProbs[0].problem_title);
         this.handleChangeSpec("cur_description", myProbs[0].problem_description);
         this.handleChangeSpec("cur_entrepreneur", myProbs[0].entrepreneur_id);
         this.handleChangeSpec("cur_status", myProbs[0].status);
         this.handleChangeSpec("cur_imageURL", myProbs[0].img_user);
       }
       else{
         //myProbs = [{id:1, title: 'default', category: 'default', municipality: 'default', entrepreneur: 'Bob1', street: 'default', description: 'default', status: 'Unchecked', imageURL: "default"}]
       }

       this.setState({similarProblems: myProbs});
   });
  };

  /** Handles clicking "Back" button */
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };
  backToFrontPage = () =>{
    history.push("/");
  }

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

  /** Handles validation forms' submit event and post request to server
   *  @see handleNext
   * */
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    if(this.state.activeStep > 1){
      //Save in DB/Redux
      console.log(this.props.cords);
      let k = new FormData();
      k.append("image",this.state.image);

      k.append("problem_title", this.state.title);
      k.append("problem_description", this.state.description);
      k.append("category", this.state.category);
      k.append("status", 'Unchecked');
      k.append("user_id", this.props.user_id);
      k.append("latitude", this.props.cords.lat);
      k.append("longitude", this.props.cords.lng);
      k.append("county", this.state.county);
      k.append("municipality", this.state.municipality);
      k.append("city", this.state.city);
      k.append("street", this.state.street);

      this.setState({
        loadingCreateProb: true
      });

      this.props.createProblem(k)
      .then((status) => {
        if(this.props.errorMessage != ''){
          //console.log(this.props.errorMessage);
          let res = "Error: Kunne ikke lage problemet";
          switch(this.props.errorMessage){
            case "Request failed with status code 429":
              res = "Error: Du har nådd maksgrensen til antall problem man kan ha"
              break;
            default:
              break;
          }
          this.props.enqueueSnackbar(res, {variant: 'warning'})
        }
        else{
          this.props.enqueueSnackbar("Problem laget!", {variant: 'success'})
        }
        this.setState({
          loadingCreateProb: false
        });
      });
    }
    this.handleNext();
  };

  /** Handles when user is done and gets sent away. */
  handleFinish = e => {
    this.setState({
      showSuppordDialog: true
    });
  };

  /** Handles uploading of image files */
  handleUpload = e => {
    this.setState({
      image: e.target.files[0],
      displayImg: URL.createObjectURL(e.target.files[0])
    });
  }

  /** Handles 'supporting' an existing problem
  * @params problemId: number, id of the problem to 'support'
  */
  handleSupport(problemId: number) {
    console.log("Clicked updoot for " + problemId + "/" + this.props.user_id + "! Take me away hunny")
    this.setState({
      loadingSupport: true
    });
    this.props.supportProblem(this.props.user_id, problemId)
    .then((status) => {
      //console.log(status);
      this.setState({
        loadingSupport: false
      });
      if(this.props.errorMessage != ''){
        this.props.enqueueSnackbar("Error: Kunne ikke støtte problemet", {variant: 'warning'});
      }else{
        this.handleFinish();
      }
    });
  }

  render() {
    //const { classes } = this.props;
    //console.log(this.props);
    const steps = getSteps();
    const { activeStep } = this.state;
    //console.log("isLoggedIn");
    //console.log(this.props.isLoggedIn);
    if(!this.props.isLoggedIn){
      return (
        <div>

          <Card className="must-log-in-to-register" align="center">
            <CardContent>
              <Typography variant="h5" color="error">
                Du må logge inn for å kunne registrere problem
              </Typography>
            </CardContent>
            <CardContent>
              <SignedOutLinks />
            </CardContent>
            <CardContent>
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
        open={this.state.showSuppordDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Du har nå støttet et problem'}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {"Takk! Du vil bli oppdatert på epost når det skjer noe med problemet"}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSupportDialogCloseFront} color="primary" autoFocus>
            Til forsiden
          </Button>

          <Button onClick={this.handleSupportDialogClose} color="primary" autoFocus>
            Lukk vindu
          </Button>
        </DialogActions>
        </Dialog>
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
        <Typography variant="h2"
        color="primary"
        align="center"
        id="title"
        >
          Registrer Problem
        </Typography>
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
              this.state.loadingCreateProb ? (
              <CircularProgress size={24} />
              ) : (
              <Card className="create-problem-done" align="center">
                <CardContent>
                  <Typography>
                    {"Takk! Du vil bli oppdatert når det skjer noe med problemet"}
                  </Typography>
                  <br/>
                  <Button variant="contained" color="primary"
                  className="create-problem-done-button"
                  onClick={this.backToFrontPage}
                  >
                    Ferdig
                  </Button>
                </CardContent>
              </Card>
            )) : (
              <ValidatorForm onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
                {getStepContent(activeStep, this.state, this.handleChange,
                              this.handleChangeSpec, this.handleUpload, this.handleSupport,
                              this.props)}
                <Card className="navigation-buttons" align="center">
                  <CardContent>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="{classes.button}"
                    >
                      Tilbake
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="{classes.button}"
                      type="submit"
                    >
                      {activeStep === steps.length - 1 ? 'Send inn' : 'Neste'}
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
    errorMessage: state.problem.errorMessage,
    //street, county, municipality, cords
    street: state.map.street,
    county: state.map.county,
    municipality: state.map.municipality,
    city: state.map.city,
    cords: state.map.currentMarker,
    //Cats, problems
    categories: state.category.categories,
    similarProblems: state.problem.problems,

    //id
    user_id: state.user.user_id,
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProblem: newProblem => dispatch(createProblem(newProblem)),
    getCategories: () => dispatch(getCategories()),
    getProblemsByStreet: (street, municipality, county) => dispatch(getProblemsByStreet(street, municipality, county)),
    supportProblem: (user_id, problemId) => dispatch(supportProblem(user_id, problemId))
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(CreateProblem)));
