import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BarChart from './BarChartPage';
import PieChart from './PieChartPage';
import LineChart from './LineChartPage';
import { connect } from 'react-redux';
import { getProblemsByMuni } from '../../store/actions/statisticsActions';
import { getUserInfo } from '../../store/actions/userActions';
import type { ReduxState } from '../../store/reducers';
import LoadingComponent from '../util/LoadingComponent';

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
    if (priority !== 'Municipality' && priority !== 'Administrator') return <div>Du hakke tilgang ha deg vekk</div>;
    if (ready) {
      return (
        <div className={classes.content}>
          <Typography variant="h2" gutterBottom component="h2" align="center">
            Statistikk i {this.props.currentMuni.municipality}
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            LineChart
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <LineChart />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            PieChart
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <PieChart />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            BarChart
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <BarChart />
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
    currentMuni: state.user.currentMuni,
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
