// @flow
import { Button, withStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import React from 'react';
import SignIn from '../user/SignIn';

type Props = {
  classes: Object
};

type State = {
  loginForm: boolean
};

const styles = (theme: Object) => ({
  button: {
    margin: theme.spacing.unit
  }
});

class SignedOutLinks extends React.Component<Props, State> {
  state = {
    loginForm: false
  };

  handleOpen = () => {
    this.setState({
      loginForm: true
    });
  };

  handleClose = () => {
    this.setState({
      loginForm: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          component={NavLink}
          className={classes.button}
          to="/registrer-bruker"
          variant="outlined"
          size="small"
          color="inherit"
        >
          Registrer
        </Button>
        <Button onClick={this.handleOpen} variant="outlined" size="small" color="inherit">
          Login
        </Button>
        <SignIn open={this.state.loginForm} onClose={this.handleClose} />
      </div>
    );
  }
}
export default withStyles(styles)(SignedOutLinks);
