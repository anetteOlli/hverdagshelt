// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import { Checkbox, FormControlLabel, Paper, Typography, withStyles, CircularProgress } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { forgotPassword, clearError } from '../../store/actions/userActions';
import purple from '@material-ui/core/colors/purple';
import Dialog from '@material-ui/core/DialogTitle';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

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
  isLoading: boolean,
  clearError: Function,
  forgotPassword: Function
};

type State = {
  email: string,
  passwordSentSuccess: boolean
};

class ForgotPassword extends React.Component<Props, State> {
  state = {
    email: '',
    passwordSentSuccess: false
  };

  handleChange = e => {
    console.log('target.value = ' + e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClose = () => {
    this.setState({
      email: ''
    });
    this.props.clearError();
    this.props.onClose();
  };

  handleSubmit = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.forgotPassword(this.state.email)
    .then(() => {
      if (this.props.errorMessage === ''){
        this.setState({ passwordSentSuccess: true });
      }
      else {
        console.log("Got error: ", this.props.errorMessage);
        this.refs.forgotPasswordForm.submit();
      }
    });
  };

  render() {
    const { classes, isLoading } = this.props;
    console.log(this.state);
    if (this.state.passwordSentSuccess) {
      return (
        <div>
          <Dialog>
            <DialogTitle>Nytt passord sendt</DialogTitle>
            <DialogContent>
              <Typography> Passord sendt til {this.state.email} om den finnes</Typography>
            </DialogContent>
          </Dialog>
        </div>
      );
    } else {
      return (
        <div>
          <DialogTitle>Send nytt passord</DialogTitle>
          <DialogContent>
            <ValidatorForm ref="forgotPasswordForm" onSubmit={this.handleSubmit}>
              <TextValidator
                fullWidth
                onFocus={this.props.clearError}
                margin="normal"
                label="E-post adresse"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={this.handleChange}
                validators={['required', 'isEmail', 'isRightEmail']}
                errorMessages={[
                  'Feltet kan ikke være tomt',
                  'Ugyldig epost-adresse',
                  'E-post adressen eksisterer ikke'
                ]}
              />
              <Button fullWidth variant="contained" color="primary" type="submit" className={classes.button}>
                {isLoading && <CircularProgress size={20} className={classes.spinner} />}
                Send passord til e-post adressen
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
      );
    }
  }

  componentDidMount() {
    /*
    ValidatorForm.addValidationRule(
      'isRightEmail',
      () => this.props.errorMessage !== 'Request failed with status code 400'
    );*/
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.user.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: (email: string) => dispatch(forgotPassword(email)),
    clearError: () => dispatch(clearError())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(ForgotPassword)));
