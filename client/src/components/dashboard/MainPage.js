// @flow
import React from 'react';
import withRoot from '../../withRoot';
import { withStyles, Card, CardContent, Paper, Grid, Typography, TextField, MenuItem, Button } from '@material-ui/core';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path

type Props = {
  classes: Object
};
type State = {
  municipality: string
};

/**Styling*/
const styles = theme => ({
  card: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },
  tittel: {
    size: 10,
    marginButtom: 30,
    marginTop: 30
  },
  tekst: {
    size: 5,
    marginTop: 50
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    fullWidth: true
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: 50,
    marginBottom: 50,
    size: 200,
    padding: 30
  },
  input: {
    display: 'none'
  }
});

/**Municipality placeholder*/
const municipalities = [
  {
    value: 'Rogaland',
    label: 'Rogaland'
  },
  {
    value: 'Hordaland',
    label: 'Hordaland'
  },
  {
    value: 'Sør-Trøndelag',
    label: 'Sør-Trøndelag'
  },
  {
    value: 'Finnmark',
    label: 'Finnmark'
  }
];

class MainPage extends React.Component<Props, State> {
  state = {
    municipality: ''
  };
  render() {
    const { classes } = this.props;
    return (
      <main>
        <Grid container spacing={24}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h3" className={classes.tittel}>
                  ----------- -----!
                </Typography>
                <Typography variant="h5" className={classes.tekst}>
                  Finn din kommune
                </Typography>
                <TextField
                  id="standard-select-municipalities-full-width"
                  select
                  fullWidth
                  margin="normal"
                  label="Velg din kommune"
                  className={classes.textField}
                  value={this.state.municipality}
                  onChange={this.handleChange('municipality')}
                >
                  {municipalities.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Typography variant="h5" className={classes.tekst}>
                  Eller
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  onClick={this.registerProblem}
                >
                  Registrer et problem
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </main>
    );
  }

  //Usikker på om dette er nødvendig, har det her litt i tilfelle
  // handleChange = municipality => event => {
  //   console.log('før');
  //   this.setState({
  //     [municipality]: event.target.value,
  //   });
  //   console.log('etter' + this.state.municipality);
  // };

  /** User will be pushed to the chosen municipality page */
  handleChange = municipality => event => {
    history.push('/' + event.target.value);
  };

  /**User will be pushed to the registerProblem page */
  registerProblem() {
    history.push('/lagproblem');
  }
}

export default withRoot(withStyles(styles)(MainPage));
