// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover/Popover';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Map from '../map/maptest';
import Edit from '@material-ui/icons/BorderColor';

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20,
    paddingBottom: 250
  },

  fab: {
    margin: theme.spacing.unit
  },

  button: {
    marginTop: theme.spacing.unit,
    flex: 1,
    flexDirection: 'row'
  },

  btnContainer: {
    //paddingRight: 30
  },

  linkbtn: {
    margin: theme.spacing.unit,
    minWidth: 400,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }

  },
  grid: {
    height: '100%',
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'flex-end'
  },

  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit
  },

  pdbtnwrapper: {
    align: 'right',
    alignItems: 'flex-end'
  },
  problem_img: {
    width: '100%',
    height: '100%'
  },
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  wrapper1: {
    alignItems: 'flex-end',
    minWidth: 400
  },
  title: {
    paddingTop: 25,
    paddingBottom: 15,
    paddingLeft: 15
  }
});

class ProblemDetails extends React.Component<Props, State> {
  state = {
    categories: [],
    isLoggedIn: false,
    problem_id: -1,
    anchorEl: null
  };

  onClickAdd = () => {
    // history.push('/lagproblem');
    console.log(this.state.problem_id);
  };

  onClickEdit() {
    this.props.history.push('/editbruker');
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  componentDidMount() {
    this.setState({
      problem_id: this.props.match.params.problem_id
    });
    //console.log(this.state.problem_id);
  }

  render() {
    const { classes, problem, isLoggedIn } = this.props;
    console.log(problem);
    console.log(problem.status_fk);
    console.log(this.state.anchorEl, this.props);
    const open = Boolean(this.state.anchorEl);

    return (
      <div className={classes.main}>
        <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
          <Grid item xs={12}>
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                className={classes.linkbtn}
                onClick={this.onClickAdd}
              >
                Legg til entrepreneur
              </Button>

              <Button className={classes.linkbtn} onClick={this.onClickEdit} color="secondary">
                <Icon>
                  <Edit />
                </Icon>{' '}
                Edit
              </Button>
            </div>
          </Grid>

          <div className={classes.title}>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom align="left">
                {problem.problem_title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" gutterBottom align="left">
                Status: {problem.status_fk}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" gutterBottom align="left">
                Kontaktinfo: {problem.user_fk}
              </Typography>
            </Grid>
          </div>

          <Grid item xs={2} />

          <Grid item xs={12}>
            <Grid container spacing={24} className={classes.grid} name={'mainGrid2'}>
              <Grid item xs className={classes.wrapper1}>
                <Typography variant="h6" gutterBottom align="left">
                  Problem
                </Typography>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Beskrivelse</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography variant="body1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <div className={classes.root}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>Vis bilde</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <img className={classes.problem_img} src={problem.img_user} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </Grid>
              <Grid item xs className={classes.wrapper1}>
                <Typography variant="h6" gutterBottom align="left">
                  Entrepreneur
                </Typography>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>Beskrivelse</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography variant="body1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <div className={classes.root}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>Vis bilde</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <img className={classes.problem_img} src={problem.img_user} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div className="mapPlaceholder">
              <Map/>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.problem_id;
  return {
    problem: state.problem.problems[0]
  };
  /*
    getProblem(id).then(() => {
    return {
      problem: state.problem.problem
    };
  });
   */
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(withSnackbar(ProblemDetails))));

