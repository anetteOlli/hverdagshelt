// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { signIn } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import Divider from "@material-ui/core/Divider/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";

const categories = ['Vei','vann','strøm', 'annen skade'];

type Props = {
  classes: Object,
  isLoggedIn: boolean
};

type State = {
  problem_id: number,
  problem_description: string,
  img_user: string,
  date_made: datetime,
  last_edited: datetime,
  category_fk: string
};

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20
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
            const fileExtension = input.substr((fileName.lastIndexOf('.') + 1));
            if(fileExtension !== 'jpeg' && fileExtension !== 'jpg' && fileExtension !== 'png' && fileExtension !== 'gif') {
                alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
                return false;
            }
            else {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result);
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
        <Typography variant="h2" gutterBottom align="center">
          Endre på problem
        </Typography>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
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

                          <img id="img" top width="80%" src={this.state.img_user|| "https://iso.500px.com/wp-content/uploads/2014/04/20482.jpg" ||"http://placehold.it/180" } alt="Bilde" />
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

            <h3> Sted:  {this.state.location_fk} </h3>
            <h3> Dato startet:  {this.state.date_made} </h3>
            <h3> Status:    {this.state.status_fk} </h3>


            <Button fullWidth variant="contained" className={classes.button} type="submit">
            Lagre endringer
          </Button>
        </ValidatorForm>
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
