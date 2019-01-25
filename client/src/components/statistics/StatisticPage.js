import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProblemsByYear from './ProblemsByYear';
import ProblemsByCat from './ProblemsByCat';
import ProblemsByEnt from './ProblemsByEnt';
import ProblemsByMonth from './ProblemsByMonth';
import { connect } from 'react-redux';
import { getProblemsByMuni } from '../../store/actions/statisticsActions';
import { getUserInfo } from '../../store/actions/userActions';
import type { ReduxState } from '../../store/reducers';
import LoadingComponent from '../util/LoadingComponent';
import { Redirect } from 'react-router-dom';
import Pdf from 'react-to-pdf';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  chartContainer: {
    marginLeft: -22,
    paddingBottom: theme.spacing.unit * 5
  },
  tableContainer: {
    height: 320
  }
});

type Props = {
  ready: boolean,
  classes: Object
};
const ref = React.createRef();

class StatisticPage extends React.Component<Props> {
  render() {
    const { classes, ready, priority } = this.props;
    if (priority !== 'Municipality' && priority !== 'Administrator') return <Redirect to="/" />;
    if (ready) {
      return (
        <div ref={ref} className={classes.content}>
          <Typography variant="h2" gutterBottom component="h2" align="center">
            Statistikk i {this.props.currentMuni.municipality}
          </Typography>
          <ProblemsByMonth />
            <ProblemsByYear />
          <ProblemsByCat />
          <ProblemsByEnt />
        </div>
      );
    } else {
      return <LoadingComponent />;
    }
  }

  componentDidMount(): void {
    this.props.getAllProblemsFromMuni();
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    ready: state.statistic.ready,
    priority: state.user.priority,
    currentMuni: state.user.currentMuni
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
    getAllProblemsFromMuni: () => dispatch(getProblemsByMuni())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StatisticPage));
