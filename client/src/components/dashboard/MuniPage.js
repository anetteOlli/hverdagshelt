// @flow
import React from 'react';
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
import { connect } from 'react-redux';
import { getEventsByMuni, deleteEvent } from '../../store/actions/eventActions';
import { getProblemsByMuni } from '../../store/actions/problemActions';
import { CheckCircle, ThumbUp } from '@material-ui/icons';
import moment from 'moment';
import 'moment/locale/nb';
moment.locale('nb');

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
  cardPage: {
    margin: 0,
    width: '100%'
  },
  tittel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '300%'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '300%'
    }
  },
  button: {
    //size: 200,
    //padding: 30,
  },
  labeltext: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '150%'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '100%'
    }
  },
  tabRoot: {
    marginTop: 50,
    marginBottom: 30,
    width: '100%'
  },
  card: {
    margin: 10,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '100%',
      minWidth: 310
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      minWidth: 100
    }
  },
  media: {
    objectFit: 'cover'
  },
  statustext: {
    color: '#ff9800',
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      fontSize: 15
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 12
    }
  },
  categorytext: {
    color: '#1565c0',
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      fontSize: 15
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 12
    }
  },
  cardTitle: {
    [theme.breakpoints.up('sm')]: {
      fontSize: 25
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },
  cardDescription: {
    [theme.breakpoints.up('sm')]: {
      fontSize: 15
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 12
    }
  },
  cardProps: {
    color: '#228B22',
    [theme.breakpoints.up('sm')]: {
      fontSize: 15
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 12
    }
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
  children: PropTypes.node.isRequired
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

class MuniPage extends React.Component<Props, State> {
  state = {
    municipality: '',
    municipalities: ['Default'],
    value: 0,

    //Sorting
    sortEvent: "nada",
    sortProb: "nada",
    direction: "asc"
  };

  render() {
    const { classes, events, problems, municounty } = this.props;
    const { value } = this.state;
    const { municipality } = this.props.match.params;
    //console.log("state", this.state);
    var moment = require('moment');
    if (events == undefined) return <div />;
    let myEvents = this.getSorted(true, events);
    let myProblems = this.getSorted(false, problems);
    return (
      <main>
        <Grid container alignItems="center" alignContent="center">
          <Grid item xs={12}>
            <Card className={classes.cardPage}>
              <CardContent>
                <Grid container spacing={32}>
                  <Grid item md={6} sm={12}>
                    <Typography variant="h3" className={classes.tittel}>
                      {municipality.split('&')[0]}
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={12}>
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
                    variant="fullwidth"
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <LinkTab label={<span className={classes.labeltext}>Arrangementer</span>} href="arrangement" />
                    <LinkTab label={<span className={classes.labeltext}>Problemer</span>} href="problemer" />
                  </Tabs>
                  {value === 0 && (
                    <TabContainer>
                      <Button size="medium" variant="contained" color="primary" onClick={this.sortEventDateStart}>
                        Sorter på startsdato
                      </Button>
                      <Button size="medium" variant="contained" color="primary" onClick={this.sortEventDateEnd}>
                        Sorter på sluttdato
                      </Button>
                      {console.log('EVENTER: ', events)}
                      <Grid container spacing={32}>
                        {myEvents.map(event => (
                          <Grid key={event.event_id} item lg={4} md={6} sm={12} sx={12}>
                            <Card className={classes.card}>
                              <CardMedia
                                component="img"
                                alt="Bilde av arrangement"
                                className={classes.media}
                                height="180"
                                image={event.event_img || 'https://semantic-ui.com/images/wireframe/image.png'}
                                title={event.event_name}
                              />
                              <CardContent>
                                <Typography align="center" component="p" className={classes.statustext}>
                                  <b>
                                    {new Date(event.date_ending) <= new Date()
                                      ? 'Ferdig'
                                      : new Date(event.date_starting) <= new Date()
                                      ? 'Pågår'
                                      : 'Ikke Startet'}
                                  </b>
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                                  <b>{event.event_name}</b>
                                </Typography>
                                <Typography component="p" className={classes.cardDescription}>
                                  {event.event_description}
                                </Typography>
                                <Typography className={classes.cardProps}>
                                  <br />
                                  Starter: {moment(event.date_starting).calendar()}
                                  <br />
                                  Slutter: {moment(event.date_ending).calendar()}
                                  <br />
                                  <br />
                                </Typography>
                                <Typography component="p" className={classes.cardProps}>
                                  Lokasjon: {event.street}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Grid container spacing={24} >
                                  <Grid item md={8}>
                                  </Grid>
                                  <Grid item md={4}>
                                    <Button
                                      align="right"
                                      variant="contained"
                                      color="primary"
                                      size="large"
                                      className={classes.button}
                                      onClick={() => this.deleteEvent(event.event_id)}
                                    >
                                      Slett
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
                      <Button size="medium" variant="contained" color="primary" onClick={this.sortProbDate}>
                        Sorter på dato
                      </Button>
                      <Button size="medium" variant="contained" color="primary" onClick={this.sortProbSupport}>
                        Sorter på støtte
                      </Button>
                      {console.log('PROBLEMER: ', problems)}
                      <Grid container spacing={24}>
                        {myProblems.map(problem => (
                          <Grid key={problem.problem_id} item lg={4} md={6} sm={12} sx={12}>
                            <Card className={classes.card}>
                              <CardMedia
                                component="img"
                                alt="Bilde av Problem"
                                className={classes.media}
                                height="180"
                                image={problem.img_user || 'https://semantic-ui.com/images/wireframe/image.png'}
                                title={problem.problem_title}
                              />
                              <CardContent>
                                <Grid container spacing={24} justify="space-between">
                                  <Grid item md={6}>
                                    <Typography align="center" component="p" className={classes.statustext}>
                                      <b>
                                        {problem.status === 'Finished'
                                          ? 'Ferdig'
                                          : problem.status === 'InProgress'
                                          ? 'Pågående'
                                          : 'Ikke Godkjent'}
                                      </b>
                                    </Typography>
                                  </Grid>
                                  <Grid item md={6}>
                                    <Typography align="center" component="p" className={classes.categorytext}>
                                      <i>{problem.category}</i>
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                                  <b>{problem.problem_title}</b>
                                </Typography>
                                <Typography component="p" className={classes.cardDescription}>
                                  {problem.problem_description}
                                </Typography>
                                <Typography className={classes.cardProps}>
                                  <br />
                                  Lagt ut: {moment(problem.date_made).calendar()} <br />
                                  <br />
                                </Typography>
                                <Typography component="p" className={classes.cardProps}>
                                  Lokasjon: {problem.street}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Grid container direction="row" spacing={0}>
                                  <Grid item md={8} />
                                  <Grid item md={2}>
                                    <ThumbUp className="material-icons" color="primary" size="50%" />
                                  </Grid>
                                  <Grid item md={2}>
                                    <Typography>{problem.support}</Typography>
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
        </Grid>
      </main>
    );
  }

  /**Set state of value of tab*/
  handleChange = (event, value) => {
    this.setState({ value });
  };

  /**User will be pushed to the registerProblem page */
  registerProblem = () => {
    this.props.history.push('/lagproblem');
  }

  /**User deletes the event */
  deleteEvent = (id: number) => {
    const { county, municipality } = this.props.match.params;
    console.log(county + ' / ' + municipality);
    console.log('id = ' + id);
    this.props.deleteEvent(id).then(window.location.reload());
  }

  /**Set state of municipality*/
  componentDidMount() {
    const { county, municipality } = this.props.match.params;
    this.props.getEvents(municipality, county);
    this.props.getProblems(municipality, county);
  }

  /** Helping function for sorting asc and desc. Toggles between them*/
  directionHandler(){
    if (this.state.direction == 'asc') {
      this.setState({
        direction: 'desc'
      });
    } else {
      this.setState({
        direction: 'asc'
      });
    }
  }

  /** Button event for sorting by support*/
  sortProbSupport = e => {
    console.log('Sorting prob by support');
    if (this.state.sortProb == 'support') {
      this.directionHandler();
    }
    this.setState({
      sortProb: 'support'
    });
  };

  /** Button event for sorting by date */
  sortProbDate = e => {
    console.log('Sorting prob by date');
    if (this.state.sortProb == 'date') {
      this.directionHandler();
    }
    this.setState({
      sortProb: 'date'
    });
  };

  /** Button event for sorting by date_starting */
  sortEventDateStart = e => {
    console.log('Sorting events by dateStart');
    if (this.state.sortEvent == 'dateStart') {
      this.directionHandler();
    }
    this.setState({
      sortEvent: 'dateStart'
    });
  };

  /** Button event for sorting by date_ending */
  sortEventDateEnd = e => {
    console.log('Sorting events by date');
    if (this.state.sortEvent == 'dateEnd') {
      this.directionHandler();
    }
    this.setState({
      sortEvent: 'dateEnd'
    });
  };

  /** Sorts problems or events
   * @params events, a boolean: true if rows contains events
   * @params rows, array of problems or events
   * */
  getSorted(events: boolean, rows: any) {
    let sort = rows;
    //console.log("Getting sorted: ", rows);
    if(events){
      //Events
      //console.log("Events: ", sort);
      if (this.state.sortEvent == 'dateStart') {
        sort.sort(function(a, b) {
          if(a.date_starting == b.date_starting){
            return a.date_ending.localeCompare(b.date_ending);
          }
          return a.date_starting.localeCompare(b.date_starting);
        });
        if (this.state.direction == 'asc') {
          sort.reverse();
        }
      } else if (this.state.sortEvent == 'dateEnd') {
        sort.sort(function(a, b) {
          if(a.date_ending == b.date_ending){
            return a.date_starting.localeCompare(b.date_starting);
          }
          return a.date_ending.localeCompare(b.date_ending);
        });
        if (this.state.direction == 'asc') {
          sort.reverse();
        }
      }
    }
    else{
      //probs
      //console.log("Prob");
      if (this.state.sortProb == 'support') {
        if (this.state.direction == 'asc') {
          sort.sort(function(a, b) {
            if(a.support == b.support){
              return a.date_made.localeCompare(b.date_made);
            }
            return a.support - b.support;
          })
          .reverse();
        } else {
          sort.sort(function(a, b) {
            if(a.support == b.support){
              return a.date_made.localeCompare(b.date_made);
            }
            return a.support - b.support;
          });
        }
      } else if (this.state.sortProb == 'date') {
        if (this.state.direction == 'asc') {
          sort.sort(function(a, b) {
            return a.date_made.localeCompare(b.date_made);
          })
          .reverse();
        } else {
          sort.sort(function(a, b) {
            return a.date_made.localeCompare(b.date_made);
          });
        }
      }
    }
  return sort;
  }
}

const mapStateToProps = state => {
  return {
    events: state.event.events,
    problems: state.problem.problems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: (municipality, county) => dispatch(getEventsByMuni(municipality, county)),
    getProblems: (municipality, county) => dispatch(getProblemsByMuni(municipality, county)),
    deleteEvent: (id: number) => dispatch(deleteEvent(id))
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MuniPage));
