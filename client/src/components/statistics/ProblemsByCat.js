import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import { getCategories } from '../../store/actions/categoryActions';
import { connect } from 'react-redux';
import { getEntrepreneursByMuni } from '../../store/actions/entrepreneurAction';
import { getProblemsByCategory, getProblemsByEntrepreneur } from '../../store/actions/statisticsActions';
import { Typography } from '@material-ui/core';
import BarChart from 'recharts/es6/chart/BarChart';
import XAxis from 'recharts/es6/cartesian/XAxis';
import YAxis from 'recharts/es6/cartesian/YAxis';
import Legend from 'recharts/es6/component/Legend';
import Bar from 'recharts/es6/cartesian/Bar';
import CartesianGrid from 'recharts/es6/cartesian/CartesianGrid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chartContainer: {
    marginLeft: -22,
    paddingBottom: theme.spacing.unit * 4
  }
});

class ProblemsByCat extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div id="ProblemsByCat" >
        <Typography variant="h4" gutterBottom component="h2">
          Problemer per kategori
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <ResponsiveContainer width="99%" height={320}>
            <BarChart
              width={600}
              height={300}
              data={this.props.pieChartData.categoryData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="problemer" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Typography>
      </div>
    );
  }

  componentDidMount(): void {
    this.props.getCategories().then(() => this.props.getProblemsByCategory());
    this.props.getEntrepreneursByMuni().then(() => this.props.getProblemsByEntrepreneur());
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    pieChartData: state.statistic.pieChartData
  };
};

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  getProblemsByCategory: () => dispatch(getProblemsByCategory()),
  getEntrepreneursByMuni: () => dispatch(getEntrepreneursByMuni()),
  getProblemsByEntrepreneur: () => dispatch(getProblemsByEntrepreneur())
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProblemsByCat));
