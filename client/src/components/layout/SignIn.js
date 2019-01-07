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
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

type State = {
  email: string,
  password: string,
  remember: string
};

class SignIn extends React.Component<State> {
  state = {
    email: '',
    password: '',
    remember: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleRemember = () => {
    this.setState(prevState => ({
      remember: !prevState.remember
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
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
              onChange={this.handleChange('email')}
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
              onChange={this.handleChange('password')}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <FormControlLabel
              control={<Checkbox value={this.state.remember} onClick={this.handleRemember} color="primary" />}
              label="Remember me"
            />
            <Button fullWidth variant="contained" color="primary" type="submit" className={classes.button}>
              Login
            </Button>
            <Button fullWidth variant="contained" color="secondary" className={classes.button} onClick={onClose}>
              Cancel
            </Button>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withRoot(withStyles(styles)(withSnackbar(SignIn)));
