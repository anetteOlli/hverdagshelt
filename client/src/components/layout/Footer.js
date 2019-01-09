// @flow
import React from 'react';
import { Paper, Grid, Typography, withStyles } from '@material-ui/core';
import withRoot from '../../withRoot';

const styles = () => ({
  main: {
    flexGrow: 1
  },
  footertekst: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: 20,
    textAlign: 'center',
    color: '#2196f3'
  }
});

const Footer = props => {
  const { classes } = props;
  return (
    <Paper>
      <Grid className={classes.main} container>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" className={classes.footertekst}>
        Hverdagshelt<br/>
        Rådhuset, postboks 167, 4291 Kopervik<br/>
        Telefon: 52 85 75 00 · Servicetorg: 52 85 75 10<br/>
        Organisasjonsnummer: 940 791 901<br/>
        </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withRoot(withStyles(styles)(Footer));
