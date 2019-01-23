// @flow
import React from 'react';
import withRoot from '../../withRoot';
import {
  withStyles,
  Card, CardContent, CardMedia, CardActionArea, CardActions,
  Paper, Grid, Typography, TextField, MenuItem, Button, Tabs, Tab
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventsByMuni } from '../../store/actions/eventActions';
import { getProblemsByMuni } from '../../store/actions/problemActions';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path
import moment from 'moment';
import { CheckCircle, ThumbUp } from '@material-ui/icons';
import { easyDateFormat } from '../util/DateFormater';

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
    width: "100%"
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
    marginBottom: 30
  },
  card: {
    margin: 10,
    height:"100%",
    [theme.breakpoints.up('sm')]: {
      maxWidth: "100%",
      minWidth: 310
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: "100%",
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
  cardTitle:{
    [theme.breakpoints.up('sm')]: {
      fontSize: 25
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },
  cardDescription:{
    [theme.breakpoints.up('sm')]: {
      fontSize: 15
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 12
    },
  },
  cardProps:{
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
    value: 0
  };

  render() {
    const { classes, events, problems, municounty } = this.props;
    const { value } = this.state;
    const { municipality } = this.props.match.params;
    //console.log("Propbs", problems);
    var moment = require('moment');
    if(events == undefined) return (<div/>);
    return (
      <main>
        <Grid container spacing={8} alignItems="center" alignContent="center">
          <Grid item>
            <Card className={classes.cardPage}>
              <CardContent>
                <Grid container spacing={24}>
                  <Grid item md={9} sm={12}>
                    <Typography variant="h3" className={classes.tittel}>
                      {municipality.split('&')[0]}
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
                    {console.log("EVENTER: ", events)}
                      <Grid container spacing={24}>
                        {events.map(event => (
                          <Grid key={event.event_id} item lg={4} md={6} sm={12} sx={12}>
                            <Card className={classes.card}>
                              <CardMedia
                                component="img"
                                alt="Bilde av arrangement"
                                className={classes.media}
                                height="180"
                                image={event.event_img || "https://semantic-ui.com/images/wireframe/image.png"}
                                title={event.event_name}
                              />
                              <CardContent>
                                <Typography align="center" component="p" className={classes.statustext}>
                                  <b>{new Date(event.date_ending) <= new Date() ? "Ferdig" :
                                     (new Date(event.date_starting) <= new Date() ? "Pågår" : "Ikke Startet")
                                  }</b>
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                                  <b>{event.event_name}</b>
                                </Typography>
                                <Typography component="p" className={classes.cardDescription}>{event.event_description}</Typography>
                                <Typography className={classes.cardProps}>
                                  <br />
                                  Starter: {easyDateFormat(event.date_starting)}<br />
                                  Slutter: {easyDateFormat(event.date_ending)}<br />
                                  <br />
                                </Typography>
                                <Typography component="p" className={classes.cardProps}>Lokasjon: {event.street}</Typography>
                              </CardContent>
                              <CardActions>
                                <Grid container spacing={24}>
                                  <Grid item md={8} />
                                  <Grid item md={4}>
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
                    {console.log("PROBLEMER: ", problems)}
                      <Grid container spacing={24}>
                        {problems.map(problem => (
                          <Grid key={problem.problem_id} item lg={4} md={6} sm={12} sx={12}>
                            <Card className={classes.card}>
                              <CardMedia
                                component="img"
                                alt="Bilde av Problem"
                                className={classes.media}
                                height="180"
                                image={problem.img_user || "https://semantic-ui.com/images/wireframe/image.png"}
                                title={problem.problem_title}
                              />
                              <CardContent>
                                <Grid container spacing={24} justify="space-between">
                                  <Grid item md={6}>
                                    <Typography align="center" component="p" className={classes.statustext}>
                                      <b>{problem.status == "Finished" ? "Ferdig" :
                                      (problem.status == "InProgress" ? "Pågående" : "Ikke Godkjent"
                                      )}</b>
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
                                <Typography component="p" className={classes.cardDescription}>{problem.problem_description}</Typography>
                                <Typography className={classes.cardProps}>
                                  <br />
                                  Lagt ut: {easyDateFormat(problem.date_made)} <br />
                                  <br />
                                </Typography>
                                <Typography component="p" className={classes.cardProps}>Lokasjon: {problem.street}</Typography>
                              </CardContent>
                              <CardActions>
                                <Grid container direction="row" spacing={0}>
                                  <Grid item md={8}/>
                                  <Grid item md={2}>
                                    <ThumbUp className="material-icons" color="primary" size="50%"/>
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
  registerProblem() {
    history.push('/lagproblem');
  }

  /**Set state of municipality*/
  componentDidMount() {
    const municounty = this.props.match.params.municipality.split('&');
    this.props.getEvents(municounty[0], municounty[1]);
    this.props.getProblems(municounty[0], municounty[1]);

  }
} //class

const mapStateToProps = state => {
  return {
    events: state.event.events,
    problems: state.problem.problems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEvents: (muni, county) => dispatch(getEventsByMuni(muni, county)),
    getProblems: (muni, county) => dispatch(getProblemsByMuni(muni, county))
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(MuniPage)));
