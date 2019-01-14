// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { signIn } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';

const categories = ['Vei', 'vann', 'strøm', 'annen skade'];
const statuss = ['til avventing', 'påbegynt', 'registrert', 'ferdig'];
const entrepreneur = ['Bygg AS', 'Vann AS', 'Strøm AS', 'Vi kan kanskje ikke mye, men vi er billig', 'Ingen'];
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
    height: '100%'
  }
});

class EditProblemA extends React.Component<Props, State> {
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

  readURL(input) {
    if (input.files && input.files[0]) {
      const fileExtension = input.substr(input.lastIndexOf('.') + 1);
      if (fileExtension !== 'jpeg' && fileExtension !== 'jpg' && fileExtension !== 'png' && fileExtension !== 'gif') {
        alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
        return false;
      } else {
        var reader = new FileReader();

        reader.onload = function(e) {
          $('#img').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    }
  }

  render() {
    const { classes, problem, isLoggedIn } = this.props;
    // if (!isLoggedIn) return <Redirect to="/" />;
    return (
      <div className={classes.main}>
        <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
          <Grid item xs={6} sm={3} className={classes.grid2} />

          <Grid item xs name={'Grid item for problems'}>
            <Grid container spacing={24} className={classes.grid2} name={'Grid cointainer for problems'}>
              <Grid item xs className={classes.grid2} name={'GridItem UserProblem'}>
                <Paper className={classes.paper2} name={'Paper for UserProblem'}>
                  <Typography variant="h2" gutterBottom align="center">
                    Bruker beskrivelse:
                  </Typography>
                  <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
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
                      margin="normal"
                      multiline
                      label="Beskrivelse"
                      rowsMax={10}
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
                  </ValidatorForm>
                  <h3> Dato startet: {this.state.date_made} </h3>

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
                          width="80%"
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
                    Entrepreneur:
                  </Typography>

                  <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                    <SelectValidator
                      fullWidth
                      margin="normal"
                      label="Entrepreneur: "
                      name="entrepreneur_fk"
                      value={this.state.entrepreneur_fk}
                      onChange={this.handleChange}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    >
                      {entrepreneur.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </SelectValidator>

                    <Paper className={classes.paper}> Entreprenør: {this.state.entrepreneur_fk} </Paper>

                    <Paper
                      className={classes.paper}
                      readOnly
                      margin="normal"
                      label="Beskrivelse"
                      value={'Beskrivelse:'}
                      name="problem_description"
                    >
                      {'Beskrivelse: \n ' + this.state.description_entrepreneur}
                    </Paper>

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
                            <img
                              id="img"
                              top
                              width="80%"
                              src={
                                this.state.img_user ||
                                'https://iso.500px.com/wp-content/uploads/2014/04/20482.jpg' ||
                                'http://placehold.it/180'
                              }
                              alt="Bilde"
                            />
                          </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </div>
                  </ValidatorForm>
                </Paper>
              </Grid>
            </Grid>
            <div>
              <ExpansionPanel>
                <ExpansionPanelSummary>
                  <div>
                    <Typography>Her skal map komme: </Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div />
                  <div>
                    <img
                      id="img"
                      top
                      width="80%"
                      src={
                        this.state.img_user ||
                        'https://foreignpolicymag.files.wordpress.com/2015/08/map_china_europe_stereotypes_final_copyrightforeignpolicy.jpg?w=1024&h=741' ||
                        'http://placehold.it/180'
                      }
                      alt="Bilde"
                    />
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Button fullWidth variant="contained" className={classes.button} type="submit">
                Lagre endringer
              </Button>
            </div>
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
)(withRoot(withStyles(styles)(withSnackbar(EditProblemA))));
