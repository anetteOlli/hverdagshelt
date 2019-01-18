// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import MapMarkers from '../map/MapMarkers';
import Edit from '@material-ui/icons/BorderColor';
import { getProblemById, goToProblemDetail, goToProblemEdit } from '../../store/actions/problemActions';
import { getAllEntrepreneurs } from '../../store/actions/entrepreneurAction';
import { problemAddEntrepreneur } from '../../store/actions/problemActions';

import SelectTable from '../util/SelectTable';
import SelectTable2 from '../util/SelectTable2';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';

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

  linkbtn: {
    margin: theme.spacing.unit,
    minWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '50%'
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
    minWidth: '100%'
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
    power: '',
    open: false,
    entrepreneur_chosen: -1
  };

  onClickAdd = () => {
    console.log('Trykte add knappen..');

    this.handleClickOpen();
    this.toggleHidden();
  };

  onClickEdit = () => {
    console.log('Trykte på edit');
    console.log('handle clickonEdit. id: ' + this.props.problem.problem_id);
    this.props.goToProblemEdit(this.props.problem.problem_id);
  };

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, problem, isLoggedIn, rows } = this.props;
    console.log(this.props.entrepreneurs);
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
              <div className="mapPlaceholder">
                <MapMarkers />
              </div>
            </Grid>
          </Grid>
          <div>
            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
              <DialogContent>
                <h2>Velg Entrepreneur</h2>
                <Typography gutterBottom />
                <SelectTable2
                  rows={this.props.entrepreneurs}
                  onClick={e => {
                    let myEntrepreneur = e;
                    console.log('EEEEEE', e);
                    this.setState({
                      entrepreneur_chosen: myEntrepreneur.entrepreneur_id
                    });
                    this.handleClose();
                    console.log(myEntrepreneur);
                    let vals = {
                      entrepreneur_fk: myEntrepreneur.entrepreneur_id,
                      problem_id: problem.problem_id
                    };
                    this.props.problemAddEntrepreneur(vals);
                  }}
                />
              </DialogContent>
              <DialogActions />
            </Dialog>
          </div>
        </div>
      );
    } else {
      return <div>LOADING PROBLEM...</div>;
    }
  }
  componentDidMount() {
    this.props.getAllEntrepreneurs();
  }
}

const mapStateToProps = state => {
  const problems = state.problem.problems;
  const problem = problems ? problems.find(p => p.problem_id === state.problem.currentProblemId) : null;
  //const problem = problems ? problems.find(problem => problem.id === id) : null;
  return {
    currentProblemId: state.problem.currentProblemId,
    problem,
    userPriority: state.user.priority,
    isLoggedIn: state.user.isLoggedIn,
    entrepreneurs: state.entrepreneur.entrepreneurs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProblemById: (id: number) => dispatch(getProblemById(id)),
    goToProblemEdit: (id: number) => dispatch(goToProblemEdit(id)),
    getAllEntrepreneurs: () => dispatch(getAllEntrepreneurs()),
    problemAddEntrepreneur: vals => dispatch(problemAddEntrepreneur(vals))
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
