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
import TextField from '@material-ui/core/TextField/TextField';

const categories = ['Vei','vann','strøm', 'annen skade'];
const statuss = ["til avventing", "påbegynt", "registrert", "ferdig"];
const entrepreneur = ["Bygg AS", "Vann AS", "Strøm AS", "Vi kan kanskje ikke mye, men vi er billig", "Ingen"];
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
  entrepreneur_fk: number;
  location_fk: Geolocation,
  status_fk: 'active'|'inacitve'|'happening',
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
    color: theme.palette.text.secondary,
  },
  paper2: {
    height: '100%',

  },
  grid: {
    height: '100%',
    paddingBottom: 20,
    display: 'flex',

  },
  grid2: {
    paddingBottom: 20,
    height: '100%',

  },
  grid3: {
    paddingBottom: 20,
    minHeight: '100%',
    //alignItems: 'flex-end'
  }
});

class EditProblemB extends React.Component<Props, State> {
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
        <Grid container spacing={24} className={classes.grid} name={"Main Grid"}>
              <Grid item xs className={classes.grid3} name={"GridItem UserProblem"}>
                <Paper className={classes.paper2} name={"Paper for UserProblem"}>
                  <Typography variant="h2" gutterBottom align="center">
                    Bruker beskrivelse:
                  </Typography>

                    <Paper
                      className={classes.paper}
                      fullWidth
                      readOnly
                      margin="normal"
                      label="Status:"
                      name="status_fk"
                      value={"status"}
                    >{"Status:   " + this.state.status_fk}</Paper>
                    <Paper
                      className={classes.paper}
                      readOnly
                    fullWidth
                    margin="normal"
                    multiline
                    label="Beskrivelse"
                    rowsMax={10}
                    name="problem_description"
                    value={"Beskrivelse:"}
                    >{"Beskrivelse: \n" + this.state.problem_description}</Paper>
                    <Paper
                      className={classes.paper}
                      readOnly
                      fullWidth
                      margin="normal"
                      label="Kategori"
                      name="category_fk"
                      value={"Kategori:   "}
                    >{"Kategori:   " + this.state.category_fk}</Paper>

                  <h3> Dato startet:  {this.state.date_made} </h3>

                  <ExpansionPanel>
                    <ExpansionPanelSummary>
                      <div>
                        <Typography >Bilde</Typography>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div/>
                      <div>
                        <img id="img" top width="100%" src={this.state.img_user ||"http://placehold.it/180" } alt="Bilde" />
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>

                </Paper>
              </Grid>

              <Grid item xs className={classes.grid3} name={"GridItem for entrepreneur"}>
                <Paper className={classes.paper2} name={"Paper for entrepreneur"}>
                  <Typography variant="h2" gutterBottom align="center">
                    Entreprenør beskrivelse:
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
                      multiline
                      rowsMax={10}
                      margin="normal"
                      label="Beskrivelse"
                      value={"Beskrivelse:"}
                      name="description_entrepreneur"
                      value={this.state.description_entrepreneur}
                      onChange={this.handleChange}
                    />
                    <Paper className={classes.paper}> Entreprenør:  {this.state.entrepreneur_fk} </Paper>

                    <h3> Dato Endret:  {this.state.last_edited} </h3>

                    <div>
                      <ExpansionPanel>
                        <ExpansionPanelSummary>
                          <div>
                            <Typography >Bilde</Typography>
                          </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <div/>
                          <div>
                            <img id="img" top width="100%" src={this.state.img_user|| "https://iso.500px.com/wp-content/uploads/2014/04/20482.jpg" ||"http://placehold.it/180" } alt="Bilde" />
                          </div>
                        </ExpansionPanelDetails>
                        <Divider />
                        <TextValidator
                          fullWidth
                          margin="normal"
                          label="bilde url"
                          name="img_user"
                          value={this.state.img_user}
                          onChange={this.handleChange}
                        />
                        <input type='file' name="img_user" accept="image/*" value={this.readURL(this)} onChange={this.handleChange}/>

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
                    <Typography >Her skal map komme: </Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div/>
                  <div>
                    <img id="img" top width="100%" src={"https://foreignpolicymag.files.wordpress.com/2015/08/map_china_europe_stereotypes_final_copyrightforeignpolicy.jpg?w=1024&h=741" ||"http://placehold.it/180" } alt="Bilde" />
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Button fullWidth variant="contained" className={classes.button} type="submit">
                Lagre endringer
              </Button>
            </div>
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
)(withRoot(withStyles(styles)(withSnackbar(EditProblemB))));
