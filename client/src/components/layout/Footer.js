// @flow
import React from 'react';
import { Paper, Grid, Typography, withStyles } from '@material-ui/core';

const styles = () => ({
  main: {
    flexGrow: 1,
    marginTop: 20
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
    <Paper className={classes.main}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Typography variant="body1" className={classes.footertekst}>
            Hverdagshelt
            <br />
            Rådhuset, postboks 167, 4291 Kopervik
            <br />
            Telefon: 52 85 75 00 · Servicetorg: 52 85 75 10
            <br />
            Organisasjonsnummer: 940 791 901
            <br />
          </Typography>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(Footer);
