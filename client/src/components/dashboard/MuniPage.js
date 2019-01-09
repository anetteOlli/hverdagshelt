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
});

class MuniPage extends React.Component<Props, State> {
  state = {
    municipality: ""
  }
  render() {
    const {classes} = this.props;
    return (
      <main>
      <Grid container spacing={24}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={10}>
          <Card className={classes.card}>
            <CardContent>
              <Button variant="contained" color="primary" size="large" className={classes.button} onClick={this.registerProblem}>
                Registrer et problem
              </Button>
              <Typography variant="h3" className={classes.tittel}>KOMMUNENAVN</Typography>
              <Typography variant="h5" className={classes.tekst}>Arrangementer</Typography>
              <Typography variant="h5" className={classes.tekst}>Problemer</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>
      </main>
    );
  }

  /**User will be pushed to the registerProblem page */
  registerProblem() {
    history.push('/lagproblem');
  }
}


export default withRoot(withStyles(styles)(MuniPage));
