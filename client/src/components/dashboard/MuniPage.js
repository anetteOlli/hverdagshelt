// @flow
import React from 'react';
import withRoot from '../../withRoot';
import { withStyles, Card, CardContent, Paper, Grid, Typography, TextField, MenuItem, Button, Tabs, Tab, AppBar, NoSsr } from '@material-ui/core';
import PropTypes from 'prop-types';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path

type Props = {
  classes: Object,
  match: {params: {municipality: string}}
};

type State = {
  municipality: string,
  value: number
};

/**Styling*/
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  tittel: {
    [theme.breakpoints.down('lg')]: {
      fontSize: '150%'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '300%'
    },
  },
  button: {
    size: 200,
    padding: 30,
  },
  labeltext: {
    [theme.breakpoints.down('lg')]: {
      fontSize: '60%'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '180%'
    },
  },
  tabRoot: {
    marginTop: 100,
    marginBottom: 30
  }

});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}


class MuniPage extends React.Component<Props, State>{

  state = {
    municipality: '',
    value: 0
  }

  render() {
    const {classes} = this.props;
    const { value } = this.state;

    return (
      <main>
      <Grid container spacing={24}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={10}>
          <Card className={classes.card}>
            <CardContent>
            <Grid container spacing={24}>
              <Grid item md={9}>
                <Typography variant="h3" className={classes.tittel}>{this.state.municipality}</Typography>
                </Grid>
                <Grid item md={3}>
                  <Button variant="contained" color="primary" size="large" className={classes.button} onClick={this.registerProblem}>
                    Registrer et problem
                  </Button>
                </Grid>
              </Grid>
                <div className={classes.tabRoot}>
                    <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    >
                      <LinkTab variant="fullWidth" label= {<span className={classes.labeltext}>Arrangementer</span>} href="arrangement" />
                      <LinkTab variant="fullWidth" label= {<span className={classes.labeltext}>Problemer</span>} href="problemer" />
                    </Tabs>
                  {value === 0 && <TabContainer>Arrangementer kommer her</TabContainer>}
                  {value === 1 && <TabContainer>Problemer kommer her</TabContainer>}
                </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>
      </main>
    );
  }

  /**Set state of value of tab*/
  handleChange = (event, value) => {
      this.setState({ value });
    };

  /**User will be pushed to the registerProblem page */
  registerProblem() {
    history.push('/lagproblem');
  }

  /**Set state of municipality*/
  componentDidMount(){
    console.log(this.props.match.params.municipality);
    this.setState({
      municipality: this.props.match.params.municipality
    });
  }
}


export default withRoot(withStyles(styles)(MuniPage));
