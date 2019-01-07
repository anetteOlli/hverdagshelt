// @flow
import React from 'react';
import { Paper, Grid, Typography, withStyles } from '@material-ui/core';
import withRoot from '../../withRoot';

const styles = (theme: Object) => ({
  main: {
    flexGrow: 1
  }
});

const Footer = props => {
  const { classes } = props;
  return (
    <Paper>
      <Grid className={classes.main} container>
        Footer
      </Grid>
    </Paper>
  );
};

export default withRoot(withStyles(styles)(Footer));
