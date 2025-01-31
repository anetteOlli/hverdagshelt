// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  withStyles,
  CircularProgress,
  DialogActions
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { signIn, clearError } from '../../store/actions/userActions';
import purple from '@material-ui/core/colors/purple';
import ForgotPassword from './ForgotPassword';
import type { Dispatch, ReduxState } from '../../store/reducers';

const styles = (theme: Object) => ({
  button: {
    marginTop: theme.spacing.unit
  },
  spinner: {
    color: purple[500],
    marginRight: 12
  },
  grow: {
    flexGrow: 1
  }
});

type Props = {
  classes: Object,
  enqueueSnackbar: Function,
  open: Function,
  onClose: Function,
  signIn: Function,
  enqueueSnackbar: Function,
  errorMessage: string,
  isLoading: boolean,
  clearError: Function
};

type State = {
  email: string,
  password: string,
  remember: boolean,
  forgotPasswordOpen: boolean
};

class SignIn extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    remember: false,
    forgotPasswordOpen: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClose = () => {
    this.setState({
      email: '',
      password: '',
      remember: false,
      forgotPasswordOpen: false
    });
    this.props.clearError();
    this.props.onClose();
  };

  handleRemember = () => {
    this.setState(prevState => ({
      remember: !prevState.remember
    }));
  };

  handleSubmit = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.signIn(this.state).then(() => {
      if (this.props.errorMessage === '') this.props.enqueueSnackbar('Logget inn!', { variant: 'success' });
      else this.refs.signInForm.submit();
    });
  };

  handleGoToPassword = () => {
    this.setState({
      forgotPasswordOpen: true
    });
  };

  handleClear = () => {
    this.props.clearError();
  };

  render() {
    const { open, classes, isLoading } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        {!this.state.forgotPasswordOpen ? (
          <div>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <ValidatorForm ref="signInForm" onSubmit={this.handleSubmit}>
                <TextValidator
                  fullWidth
                  onFocus={this.props.clearError}
                  margin="normal"
                  label="Epost"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleChange}
                  validators={['required', 'isEmail', 'isRightEmail']}
                  errorMessages={['Feltet kan ikke være tomt', 'Ugyldig epost-adresse', 'Feil epost-adresse']}
                />
                <TextValidator
                  fullWidth
                  onFocus={this.props.clearError}
                  margin="normal"
                  label="Passord"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  validators={['required', 'isRightPassword']}
                  errorMessages={['Feltet kan ikke være tomt', 'Feil passord']}
                />
                <DialogActions>
                  <FormControlLabel
                    control={<Checkbox onChange={this.handleRemember} color="primary" />}
                    label="Husk meg"
                  />
                  <div className={classes.grow} />
                  <Button color="primary" onClick={this.handleGoToPassword}>
                    Glemt passord
                  </Button>
                </DialogActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={this.handleClear}
                  className={classes.button}
                >
                  {isLoading && <CircularProgress size={20} className={classes.spinner} />}
                  Login
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleClose}
                >
                  Avbryt
                </Button>
              </ValidatorForm>
            </DialogContent>
          </div>
        ) : (
          <ForgotPassword onClose={this.handleClose} />
        )}
      </Dialog>
    );
  }

  componentDidMount() {
    ValidatorForm.addValidationRule(
      'isRightEmail',
      () => this.props.errorMessage !== 'Request failed with status code 404'
    );
    ValidatorForm.addValidationRule(
      'isRightPassword',
      () => this.props.errorMessage !== 'Request failed with status code 401'
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    errorMessage: state.user.errorMessage,
    isLoading: state.async.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    clearError: () => dispatch(clearError())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(SignIn)));
