// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withRoot from '../../withRoot';
import { Checkbox, FormControlLabel, Paper, Typography, withStyles } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withSnackbar } from 'notistack';

const styles = (theme: Object) => ({
  button: {
    marginTop: theme.spacing.unit
  }
});

type Props = {
  classes: Object,
  enqueueSnackbar: any,
  open: function,
  onClose: function
};

type State = {
  email: string,
  password: string,
  remember: string
};

class SignIn extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    remember: ''
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
      remember: ''
    });
    this.props.onClose();
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { enqueueSnackbar, open, onClose, classes } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={(errors: TextValidator[]) =>
              errors.map(error =>
                enqueueSnackbar(`Warning ${error.props.label.toString().toLowerCase()} is invalid`, {
                  variant: 'warning'
                })
              )
            }
          >
            <TextValidator
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            <TextValidator
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <FormControlLabel
              control={<Checkbox name="remember" value={this.state.remember} onClick={this.handleChange} color="primary" />}
              label="Remember me"
            />
            <Button fullWidth variant="contained" color="primary" type="submit" className={classes.button}>
              Login
            </Button>
            <Button fullWidth variant="contained" color="secondary" className={classes.button} onClick={this.handleClose}>
              Cancel
            </Button>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withRoot(withStyles(styles)(withSnackbar(SignIn)));
