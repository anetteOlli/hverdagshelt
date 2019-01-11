// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover/Popover';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20,
    paddingBottom: 500
  },
  button: {
    //marginTop: theme.spacing.unit,
  },
  editBTN: {
    align: 'right'
  },
  addBTN: {
    align: 'right'
  },
  grid: {
    height: '100%',
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'flex-end'
  },
  gridi1: {},
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
    maxWidth: 400,
    maxHeight: 300
  },
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  wrapper1: {
    alignItems: 'flex-end'
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
    //console.log(problem);
    //console.log(problem.status_fk);
    console.log(this.state.anchorEl, this.props);

    const open = Boolean(this.state.anchorEl);
    return (
      <div className={classes.main}>
        <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
          <Grid xs = {6}/>
          <Grid item xs={2} >
            <div>
              <Button
                aria-owns={open ? 'simple-popper' : undefined}
                aria-haspopup="true"
                variant="contained"
                onClick={this.handleClick}
              >
                kontaktinfo
              </Button>
              <Popover
                id="simple-popper"
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <h4>Per persen, Tlf: 90909090, Email: test@mail.com</h4>
              </Popover>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Button className={classes.addBTN} onClick={this.onClickAdd}>
              Add entrepreneur
            </Button>
            <Button className={classes.editBTN} onClick={this.onClickEdit}>
              Edit Problem
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom align="left">
              Status: {problem.status_fk}
            </Typography>
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={4}>

          </Grid>
          <Grid item xs={8} />

          <Grid item xs={2}>
            <Typography variant="caption" gutterBottom align="left">
              Beskrivelse:
            </Typography>
          </Grid>

          <Grid item xs={4} />
          <Grid item xs={2}>
            <Typography variant="caption">Entrepreneur:</Typography>
          </Grid>

          <Grid item xs={2} />

          <Grid item xs={12}>
            <Grid container spacing={24} className={classes.grid} name={'mainGrid2'}>
              <Grid item xs className="Wrapper1">
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
              <Grid item xs className="Wrapper2">
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
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.problem_id;
  return {
    problem: state.problem.problem
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
