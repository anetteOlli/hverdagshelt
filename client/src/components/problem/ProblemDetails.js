// @flow
import React from 'react';
import { Button, Typography, MenuItem } from '@material-ui/core/';
import withRoot from '../../withRoot';
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
import { getProblemById, goToProblemEdit } from '../../store/actions/problemActions';
import { entrepreneurs_get_one_by_entrepreneur_id, getEntrepreneursByMuniAndCat } from '../../store/actions/entrepreneurAction';
import { problemAddEntrepreneur } from '../../store/actions/problemActions';
import SelectTable2 from '../util/SelectTable2';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import type { ReduxState } from '../../store/reducers';

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
    },
    minHeight: 40
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

/** Problem Details Component
 * @return the selected problems content. Will update on changes in parent component.
 * */

class ProblemDetails extends React.Component<Props, State> {

  state = {
    categories: [],
    isHidden: true,
    power: '',
    open: false,
    visible: false,
    locked: false,
    editVisible: true
  };


  /** Functions that sets boolean variables in state **/

  toggleHidden() {this.setState({
      isHidden: !this.state.isHidden
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  /** Opens entrepreneurs list component in popup **/
  onClickAdd = () => {
    this.handleClickOpen();
    this.toggleHidden();
  };

  /** Opens edit problem component **/
  onClickEdit = () => {
    this.props.goToProblemEdit(this.props.problem.problem_id);
  };

  /** Function that is called when a entrepreneur
   * is selected in the add entrepreneur component **/
  handleAddEntrepreneur = e => {
    let myEntrepreneur = e;
    this.setState({
      entrepreneur_chosen: myEntrepreneur.entrepreneur_id
    });
    this.handleClose();
    let vals = {
      entrepreneur_id: myEntrepreneur.entrepreneur_id,
      problem_id: this.props.problem.problem_id
    };
    this.props.problemAddEntrepreneur(vals).then(() => {
      if (this.props.errorMessage !== '') this.props.enqueueSnackbar('Noe gikk galt', { variant: 'error' });
      else
        this.props.enqueueSnackbar('Entrepreneør lagt til! Problemet er nå lukket og under behandling.', {
          variant: 'success'
        });
    });
  };

  render() {
    const { classes, problem, currentEntrepreneur } = this.props;

    if (problem) {
      return (
        <div className={classes.main}>
          <Grid container spacing={24} className={classes.grid} name={'Main Grid'}>
            <Grid item xs={12}>
              <div className={classes.btnContainer}>
                {(this.props.priority=== 'Administrator' || this.props.priority === 'Municipality')&& !this.props.problem.entrepreneur_id && (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={classes.linkbtn}
                    onClick={this.onClickAdd}
                  >
                    Legg til entrepreneur
                  </Button>
                )}
                {(this.props.priority === 'Administrator' || this.props.priority === 'Municipality' || this.props.priority === 'Entrepreneur' || !this.props.problem.problem_locked) &&
                <Button variant="contained" className={classes.linkbtn} onClick={this.onClickEdit} color="secondary">
                  <Icon>
                    <Edit />
                  </Icon>{' '}
                  Edit
                </Button>
                }
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
                  Status: {(problem.status === 'Finished' ? 'Ferdig'
                                  : (problem.status === 'InProgress'
                                  ? 'Pågående'
                                  : 'Ikke Godkjent'))}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" gutterBottom align="left">
                  Kategori: {problem.category}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {currentEntrepreneur &&
                  <Typography variant="caption" gutterBottom align="left">
                    Entrepreneur: {currentEntrepreneur.business_name}
                  </Typography>
                }
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
                {(this.props.entrepreneurs && this.props.entrepreneurs.length > 0) ? (
                  <SelectTable2 rows={this.props.entrepreneurs} onClick={this.handleAddEntrepreneur} />
                ) : (
                  <div>Det finnes ingen entrepreneurer i område som passer til problemet.</div>
                )}
              </DialogContent>
              <DialogActions />
            </Dialog>
          </div>
        </div>
      );
    } else {
      return <div>Velg et problem til venstre</div>;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentProblemId !== nextProps.currentProblemId) {
      this.props.getEntrepreneursByMuniAndCat(nextProps.problem);
      this.props.entrepreneurs_get_one_by_entrepreneur_id(nextProps.problem.entrepreneur_id);
    }
  }

}

const mapStateToProps = (state: ReduxState) => {
  const problems = state.problem.problems;
  const problem = problems ? problems.find(p => p.problem_id === state.problem.currentProblemId) : null;
  return {
    currentProblemId: state.problem.currentProblemId,
    problem,
    priority: state.user.priority,
    isLoggedIn: state.user.isLoggedIn,
    entrepreneurs: state.entrepreneur.entrepreneurs,
    currentMuni: state.problem.currentMuni,
    errorMessage: state.problem.errorMessage,
    currentEntrepreneur: state.entrepreneur.currentEntrepreneur
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProblemById: (id: number) => dispatch(getProblemById(id)),
    goToProblemEdit: (id: number) => dispatch(goToProblemEdit(id)),
    getEntrepreneursByMuniAndCat: category => dispatch(getEntrepreneursByMuniAndCat(category)),
    problemAddEntrepreneur: vals => dispatch(problemAddEntrepreneur(vals)),
    entrepreneurs_get_one_by_entrepreneur_id: (id: number) => dispatch(entrepreneurs_get_one_by_entrepreneur_id(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(ProblemDetails))));
