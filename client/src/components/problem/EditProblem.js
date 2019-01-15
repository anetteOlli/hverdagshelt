// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { signIn } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import PictureUpload from '../util/PictureUpload';
import Map from '../map/maptest';

const categories = ['Vei', 'vann', 'strøm', 'annen skade'];

type Props = {
  classes: Object,
  isLoggedIn: boolean
};

type State = {
  problem_id: number,
  problem_description: string,
  img_user: string,
  date_made: Date,
  last_edited: Date,
  location_fk: Geolocation,
  status_fk: 'active' | 'inacitve' | 'happening',
  category_fk: string
};

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20
  },
  paper: {
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    color: theme.palette.text.secondary
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

class EditProblem extends React.Component<Props, State> {
  state = {
    problem_id: null,
    problem_description: '',
    img_user: '',
    date_made: '',
    last_edited: '',
    location_fk: '',
    status_fk: '',
    category_fk: '',
    displayImg: ''
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

  handleUpload = (e) => {
    this.setState({
      displayImg: e
    })
  }

  render() {
    const { classes, problem, isLoggedIn } = this.props;
    // if (!isLoggedIn) return <Redirect to="/" />;
    return (
      <div className={classes.main}>
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography variant="h2" gutterBottom align="center">
                Endre på problem
              </Typography>
              <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
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

                <TextValidator
                  fullWidth
                  margin="normal"
                  multiline
                  label="Beskrivelse"
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
                  name="category_fk"
                  value={this.state.category_fk}
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
                        <img
                          id="img"
                          top
                          width="100%"
                          src={
                            this.state.displayImg ||
                            this.state.img_user
                          }
                          alt="Bilde"
                        />
                        <PictureUpload uploadImg={this.handleUpload} />
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </ValidatorForm>
              <ExpansionPanel>
                <ExpansionPanelSummary>
                  <div>
                    <Typography >Kart: </Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.mapExpansion}>
                  <div className="mapPlaceholder">
                    <Map />
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Button fullWidth variant="contained" className={classes.button} type="submit">
                Lagre endringer
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      ...this.props.problem
    });
  }
}

const mapStateToProps = state => {
  return {
    problem: state.problem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(EditProblem))));
