import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProblemsByYearLineChartBarChartPage from './ProblemsByYearLineChartBarChartPage';
import PieChart from './PieChartPage';
import ProblemsByMonthLineChart from './ProblemsByMonthLineChart';
import { connect } from 'react-redux';
import { getProblemsByMuni } from '../../store/actions/statisticsActions';
import { getUserInfo } from '../../store/actions/userActions';
import type { ReduxState } from '../../store/reducers';
import LoadingComponent from '../util/LoadingComponent';
import { Redirect } from 'react-router-dom';

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
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  }
});

type Props = {
  ready: boolean,
  classes: Object
};

class StatisticPage extends React.Component<Props> {
  render() {
    const { classes, ready, priority } = this.props;
    if (priority !== 'Municipality' && priority !== 'Administrator') return <Redirect to="/" />;
    if (ready) {
      return (
        <div className={classes.content}>
          <Typography variant="h2" gutterBottom component="h2" align="center">
            Statistikk i {this.props.currentMuni.municipality}
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Problemer i månden
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <ProblemsByMonthLineChart />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Gjennomstnilit problemer i året
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <ProblemsByYearLineChartBarChartPage />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Problemer pr kategory/entreprenør
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <PieChart />
          </Typography>
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
