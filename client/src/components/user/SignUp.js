// @flow
import React from 'react';
import { Button, IconButton, InputAdornment, Typography } from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { signUp } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { validateEmail } from '../../store/util';

type Props = {
  classes: Object,
  isLoggedIn: boolean,
  signUp: Function,
  enqueueSnackbar: Function
};

type State = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  cnfPassword: string,
  showPassword: boolean,
  isUniqueEmail: boolean
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

class SignUp extends React.Component<Props, State> {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cnfPassword: '',
    showPassword: false,
    isUniqueEmail: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    console.log(this.state);
    this.props
      .signUp({
        firstName,
        lastName,
        email,
        password
      })
      .then(() => this.props.enqueueSnackbar(' U in', { variant: 'success' }));
  };

  handleValidateEmail = () => {
    validateEmail(this.state.email).then((resp: { isUniqueEmail: boolean }) =>
      this.setState({
        isUniqueEmail: resp.isUniqueEmail
      })
    );
  };

  render() {
    const { classes, isLoggedIn } = this.props;
    if (isLoggedIn) return <Redirect to="/" />;
    return (
      <div className={classes.main}>
        <Typography variant="h2" gutterBottom align="center">
          Register ny bruker
        </Typography>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
          <TextValidator
            fullWidth
            margin="normal"
            label="Fornavn"
            name="firstName"
            autoComplete="given-name"
            value={this.state.firstName}
            onChange={this.handleChange}
            validators={['required', 'matchRegexp:^[a-zA-ZøæåØÆÅ]*$']}
            errorMessages={['Du må skrive inn fornavnet ditt', 'Ugyldig navn']}
          />
          <TextValidator
            fullWidth
            margin="normal"
            label="Etternavn"
            name="lastName"
            autoComplete="family-name"
            value={this.state.lastName}
            onChange={this.handleChange}
            validators={['required', 'matchRegexp:^[a-zA-ZøæåØÆÅ]*$']}
            errorMessages={['Du må skrive inn etternavnet ditt', 'Ugyldig navn']}
          />
          <TextValidator
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleChange}
            onBlur={this.handleValidateEmail}
            validators={['required', 'isEmail', 'isUniqueEmail']}
            errorMessages={['Feltet kan ikke være tomt', 'Ugyldig epost-adresse', 'Epost-adressen finnes fra før']}
          />
          <TextValidator
            fullWidth
            margin="normal"
            label="New password"
            name="password"
            autoComplete="new-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange}
            validators={['required', 'minStringLength:6']}
            errorMessages={['Feltet kan ikke være tomt', 'Passordet må være lenger']}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility" onClick={this.handleVisibility}>
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextValidator
            fullWidth
            margin="normal"
            label="Confirm password"
            name="cnfPassword"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.cnfPassword}
            onChange={this.handleChange}
            validators={['required', 'isPasswordMatch']}
            errorMessages={['Feltet kan ikke være tomt', 'Passordene er ikke like']}
          />
          <Button fullWidth variant="contained" className={classes.button} type="submit">
            Register
          </Button>
          <Button fullWidth variant="contained" className={classes.button} color="secondary" component={Link} to={'/'}>
            Cancel
          </Button>
        </ValidatorForm>
      </div>
    );
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => value === this.state.password);
    ValidatorForm.addValidationRule('isUniqueEmail', () => !this.state.isUniqueEmail);
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(SignUp))));
