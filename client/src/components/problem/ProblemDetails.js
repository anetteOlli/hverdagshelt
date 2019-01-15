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
import { getProblemById } from '../../store/actions/problemActions';

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20,
    paddingBottom: 50
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
    isHidden: true,
    power: ''
  };

  onClickAdd = () => {

    console.log("Trykte add knappen");
    console.log(this.props.isLoggedIn);

  };
  onClickEdit = () => {
    console.log("Trykte på edit");

  };

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    const { classes, problem, isLoggedIn } = this.props;
    //console.log(problem);

    if (problem) {
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
                      <Typography variant="body1">{problem.problem_description}</Typography>
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
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>Beskrivelse</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography variant="body1">{problem.description_entrepreneur}</Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>

                  <div className={classes.root}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Vis bilde</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <img className={classes.problem_img} src={problem.img_entrepreneur} />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <div className="map">
                <Map />
              </div>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return <div>LOADING PROBLEM...</div>;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentProblemId !== this.props.currentProblemId)
      this.props.getProblemById(nextProps.currentProblemId);

  }

  componentDidMount() {
    if(this.props.isLoggedIn !== undefined) {
      console.log("kom hit.");
      this.setState({
        power: this.props.userPriority
      });
    }

    console.log(this.props.userPriority); //undefined
    console.log(this.props.isLoggedIn);

  }

}

const mapStateToProps = (state, ownProps) => {
  const problems = state.problem.problems;

  //const problem = problems ? problems.find(problem => problem.id === id) : null;
  const problem = problems;
  return {
    currentProblemId: state.problem.currentProblemId,
    problem,
    userPriority: state.user.priority,
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProblemById: (id: number) => dispatch(getProblemById(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(ProblemDetails))));


// bruker kan edit desciption hvis ikke locked
// Admin kan gjøre alt
// Kommuneansatt slett, add entrepreneur, edit
// Entrepeneur edit