// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withRoot from '../../withRoot';
import { Checkbox, FormControlLabel, Paper, Typography, withStyles, CircularProgress } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/userActions';
import purple from '@material-ui/core/colors/purple';

const styles = (theme: Object) => ({
  button: {
    marginTop: theme.spacing.unit
  },
  spinner: {
    color: purple[500],
    marginRight: 12
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
  isLoading: boolean
};

type State = {
  email: string,
  password: string,
  remember: boolean
};

class SignIn extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    remember: false
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
      remember: false
    });
    this.props.onClose();
  };

  handleRemember = () => {
    this.setState(prevState => ({
      remember: !prevState.remember
    }));
  };

  handleSubmit = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.signIn(this.state).then(resp => {
      console.log(this.props.errorMessage);
      if (resp.type === 'SIGN_IN_SUCCESS') this.props.enqueueSnackbar(' U in', { variant: 'success' });
      else this.refs.form.submit();
    });
  };

  render() {
    const { open, onClose, classes, isLoading } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
            <TextValidator
              fullWidth
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
            <FormControlLabel
              control={<Checkbox onChange={this.handleRemember} color="primary" />}
              label="Remember me"
            />
            <Button fullWidth variant="contained" color="primary" type="submit" className={classes.button}>
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
              Cancel
            </Button>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    );
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isRightEmail', () => this.props.errorMessage !== 'WRONG EMAIL');
    ValidatorForm.addValidationRule('isRightPassword', () => this.props.errorMessage !== 'WRONG PASSWORD');
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.user.errorMessage,
    isLoading: state.app.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(SignIn))));
