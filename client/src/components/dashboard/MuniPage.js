// @flow
import React from 'react';
import withRoot from '../../withRoot';
import {
  withStyles,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Paper,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Tabs,
  Tab
} from '@material-ui/core';
import PropTypes from 'prop-types';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path

type Props = {
  classes: Object,
  match: { params: { municipality: string } }
};

type State = {
  municipality: string,
  municipalities: [],
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
    }
  },
  button: {
    //size: 200,
    //padding: 30,
  },
  labeltext: {
    [theme.breakpoints.down('lg')]: {
      fontSize: '60%'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '180%'
    }
  },
  tabRoot: {
    marginTop: 100,
    marginBottom: 30
  },
  card: {
    margin: 5,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 310,
      minWidth: 310
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 200,
      minWidth: 10
    }
  },
  media: {
    objectFit: 'cover'
  },
  statustext: {
    color: '#ff9800',
    marginBottom: 20
  },
  categorytext: {
    color: '#1565c0',
    marginBottom: 20
  }
});

/**Event replacement*/
const events = [
  {
    event_id: 0,
    event_name: 'Konsert på tunet',
    event_description:
      'brabrabrabrabrabberbeewkfnefleirjglekrnfrlgjntkjtnfreregjernkjgnerkjgnrefkm v,djfenwlrkgmlrkgmvf,md r,kwelwøkflvbktmb',
    date_starting: '12-14-2356',
    date_ending: '12-14-2356',
    status_fk: 'KOMMER!',
    location_fk: 'tunet',
    event_img:
      'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VigDKUTomMIUj8h6FODmWgHaFS%26pid%3D15.1&f=1'
  },
  {
    event_id: 1,
    event_name: 'Høytlesning på biblioteket',
    event_description:
      'brabrabrabrabrabberbeewkfnefleirjglekrnfrlgjntkjtnfreregjernkjgnerkjgnrefkm v,djfenwlrkgmlrkgmvf,md r,kwelwøkflvbktmb',
    date_starting: '12-14-2356',
    date_ending: '12-14-2356',
    status_fk: 'FOREGÅR NÅ!',
    location_fk: 'biblioteket',
    event_img: 'https://cdn.cnn.com/cnnnext/dam/assets/130925122807-09-kids-books-0925-horizontal-large-gallery.jpg'
  },
  {
    event_id: 2,
    event_name: 'Felles vårrengjøring av fotballbanen',
    event_description:
      'brabrabrabrabrabberbeewkfnefleirjglekrnfrlgjntkjtnfreregjernkjgnerkjgnrefkm v,djfenwlrkgmlrkgmvf,md r,kwelwøkflvbktmb',
    date_starting: '12-14-2356',
    date_ending: '12-14-2356',
    status_fk: 'AVSLUTTET',
    location_fk: 'Fotballbanen',
    event_img:
      'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.fotballbanen.com%2Fwp-content%2Fuploads%2F2017%2F10%2Fatletico-madrid.jpg&f=1'
  },
  {
    event_id: 3,
    event_name: 'Høytlesning på biblioteket',
    event_description:
      'brabrabrabrabrabberbeewkfnefleirjglekrnfrlgjntkjtnfreregjernkjgnerkjgnrefkm v,djfenwlrkgmlrkgmvf,md r,kwelwøkflvbktmb',
    date_starting: '12-14-2356',
    date_ending: '12-14-2356',
    status_fk: 'FOREGÅR NÅ!',
    location_fk: 'biblioteket',
    event_img: 'https://cdn.cnn.com/cnnnext/dam/assets/130925122807-09-kids-books-0925-horizontal-large-gallery.jpg'
  },
  {
    event_id: 4,
    event_name: 'Felles vårrengjøring av fotballbanen',
    event_description:
      'brabrabrabrabrabberbeewkfnefleirjglekrnfrlgjntkjtnfreregjernkjgnerkjgnrefkm v,djfenwlrkgmlrkgmvf,md r,kwelwøkflvbktmb',
    date_starting: '12-14-2356',
    date_ending: '12-14-2356',
    status_fk: 'AVSLUTTET',
    location_fk: 'Fotballbanen',
    event_img:
      'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.fotballbanen.com%2Fwp-content%2Fuploads%2F2017%2F10%2Fatletico-madrid.jpg&f=1'
  },
  {
    event_id: 5,
    event_name: 'Konsert på tunet',
    event_description:
      'brabrabrabrabrabberbeewkfnefleirjglekrnfrlgjntkjtnfreregjernkjgnerkjgnrefkm v,djfenwlrkgmlrkgmvf,md r,kwelwøkflvbktmb',
    date_starting: '12-14-2356',
    date_ending: '12-14-2356',
    status_fk: 'KOMMER!',
    location_fk: 'tunet',
    event_img:
      'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VigDKUTomMIUj8h6FODmWgHaFS%26pid%3D15.1&f=1'
  },
  {
    event_id: 6,
    event_name: 'Felles vårrengjøring av fotballbanen',
    event_description:
      'brabrabrabrabrabberbeewkfnefleirjglekrnfrlgjntkjtnfreregjernkjgnerkjgnrefkm v,djfenwlrkgmlrkgmvf,md r,kwelwøkflvbktmb',
    date_starting: '12-14-2356',
    date_ending: '12-14-2356',
    status_fk: 'AVSLUTTET',
    location_fk: 'Fotballbanen',
    event_img:
      'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.fotballbanen.com%2Fwp-content%2Fuploads%2F2017%2F10%2Fatletico-madrid.jpg&f=1'
  }
];

/**Event replacement*/
const problems = [
  {
    problem_id: 0,
    problem_title: 'Biblioteket raste ned',
    problem_description:
      'brabrabrabrabrabberbeewkfnefleirjglekrnfrlgjntkjtnfreregjernkjgnerkjgnrefkm v,djfenwlrkgmlrkgmvf,md r,kwelwøkflvbktmb',
    date_made: '12-14-2356',
    last_edited: '12-14-2356',
    status_fk: 'UNDER BEHANDLING',
    location_fk: 'rådhusplassen',
    img_user:
      'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Ffarm3.staticflickr.com%2F2372%2F2520041294_a67c6bd12b_z.jpg&f=1',
    category_fk: 'Ødeleggelse'
  }
];

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

class MuniPage extends React.Component<Props, State> {
  state = {
    municipality: '',
    municipalities: ['Default'],
    value: 0
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <main>
        <Grid container spacing={24}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Card className={classes.cardPage}>
              <CardContent>
                <Grid container spacing={24}>
                  <Grid item md={9} sm={12}>
                    <Typography variant="h3" className={classes.tittel}>
                      {this.state.municipality}
                    </Typography>
                  </Grid>
                  <Grid item md={3} sm={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      onClick={this.registerProblem}
                    >
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
                    <LinkTab
                      variant="fullWidth"
                      label={<span className={classes.labeltext}>Arrangementer</span>}
                      href="arrangement"
                    />
                    <LinkTab
                      variant="fullWidth"
                      label={<span className={classes.labeltext}>Problemer</span>}
                      href="problemer"
                    />
                  </Tabs>
                  {value === 0 && (
                    <TabContainer>
                      <Grid container spacing={24}>
                        {events.map(event => (
                          <Grid key={event.event_id} item lg={4} md={6} sm={12} sx={12}>
                            {console.log('Events', JSON.stringify(event))}

                            <Card className={classes.card}>
                                <CardMedia
                                  component="img"
                                  alt="Bilde av arrangement"
                                  className={classes.media}
                                  height="180"
                                  image={event.event_img}
                                  title={event.event_name}
                                />
                                <CardContent>
                                  <Typography component="p" className={classes.statustext}>
                                    <b>{event.status_fk}</b>
                                  </Typography>
                                  <Typography gutterBottom variant="h5" component="h2">
                                    {event.event_name}
                                  </Typography>
                                  <Typography component="p">{event.event_description}</Typography>
                                  <Typography component="p">
                                    <br />
                                    Starter den: {event.date_starting} <br />
                                    Slutter den: {event.date_ending} <br />
                                    <br />
                                  </Typography>
                                  <Typography component="p">Lokasjon: {event.location_fk}</Typography>
                                </CardContent>
                              <CardActions>
                                <Grid container spacing={24}>
                                  <Grid item md={8} />
                                  <Grid item md={4}>
                                    <Button variant="contained" size="small" color="primary">
                                      Kart
                                    </Button>
                                  </Grid>
                                </Grid>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </TabContainer>
                  )}

                  {value === 1 && (
                    <TabContainer>
                      <Grid container spacing={24}>
                        {problems.map(problem => (
                          <Grid key={problem.problem_id} item lg={4} md={6} sm={12} sx={12}>
                            {console.log('Problems', JSON.stringify(problem))}

                            <Card className={classes.card}>
                                <CardMedia
                                  component="img"
                                  alt="Bilde av Problem"
                                  className={classes.media}
                                  height="180"
                                  image={problem.img_user}
                                  title={problem.problem_title}
                                />
                                <CardContent>
                                  <Grid container spacing={24}>
                                    <Grid item md={8}>
                                      <Typography component="p" className={classes.statustext}>
                                        <b>{problem.status_fk}</b>
                                      </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                      <Typography component="p" className={classes.categorytext}>
                                        <i>{problem.category_fk}</i>
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Typography gutterBottom variant="h5" component="h2">
                                    {problem.problem_title}
                                  </Typography>
                                  <Typography component="p">{problem.problem_description}</Typography>
                                  <Typography component="p">
                                    <br />
                                    Starter den: {problem.date_made} <br />
                                    Slutter den: {problem.last_edited} <br />
                                    <br />
                                  </Typography>
                                  <Typography component="p">Lokasjon: {problem.location_fk}</Typography>
                                </CardContent>
                              <CardActions>
                                <Grid container spacing={24}>
                                  <Grid item md={8} />
                                  <Grid item md={4}>
                                    <Button variant="contained" size="small" color="primary">
                                      Kart
                                    </Button>
                                  </Grid>
                                </Grid>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </TabContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} />
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

/** List of municipalities from database*/
  // componentWillMount(){
  //   this.getMunicipalities();
  // }

  /**Set state of municipality*/
  componentDidMount() {
    console.log(this.props.match.params.municipality);
    this.setState({
      municipality: this.props.match.params.municipality
    });
  }
}

export default withRoot(withStyles(styles)(MuniPage));
