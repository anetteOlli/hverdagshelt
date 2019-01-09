import SignUpForm from './SignUpForm';
import React from 'react';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  main: {
    margin: 20,
    padding: 20
  }
});

class SignUpPage extends React.Component {
  handleSubmit = values => {
    // Do something with the form values
    console.log(values);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <SignUpForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
export default withRoot(withStyles(styles)(SignUpPage));
