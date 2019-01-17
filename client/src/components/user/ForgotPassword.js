// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import withRoot from '../../withRoot';
import { Checkbox, FormControlLabel, Paper, Typography, withStyles, CircularProgress } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { forgotPassword, clearError } from '../../store/actions/userActions';
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
  isLoading: boolean,
  clearError: Function,
  forgotPassword: Function
};

type State = {
  email: string
};

class ForgotPassword extends React.Component<Props, State> {
  state = {
    email: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.clearError();
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
    this.props.forgotPassword(this.state.email).then(() => {
      if (this.props.errorMessage === '') this.props.enqueueSnackbar(`Midlertidig passsord er sendt til ${this.state.email}`, { variant: 'success' });
      else this.refs.form.submit();
    });
  };

  render() {
    const { classes, isLoading } = this.props;
    return (
      <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
        <TextValidator
          fullWidth
          margin="normal"
          label="E-post adresse"
          name="email"
          autoComplete="email"
          autoFocus
          value={this.state.email}
          onChange={this.handleChange}
          validators={['required', 'isEmail', 'isRightEmail']}
          errorMessages={['Feltet kan ikke være tomt', 'Ugyldig epost-adresse', 'E-post adressen eksisterer ikke']}
        />
        <Button fullWidth variant="contained" color="primary" type="submit" className={classes.button}>
          {isLoading && <CircularProgress size={20} className={classes.spinner} />}
          Send passord til e-post adressen
        </Button>
        <Button fullWidth variant="contained" color="secondary" className={classes.button} onClick={this.handleClose}>
          Avbryt
        </Button>
      </ValidatorForm>
    );
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
)(withRoot(withStyles(styles)(withSnackbar(ForgotPassword))));
