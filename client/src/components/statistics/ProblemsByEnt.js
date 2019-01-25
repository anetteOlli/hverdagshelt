

import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import { withSnackbar } from 'notistack';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import { getCategories } from '../../store/actions/categoryActions';
import Cell from 'recharts/lib/component/Cell';
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
const COLORS = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF'
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class ProblemsByEnt extends React.Component {
  state = {
    showData1: false,
    showData2: false,
    showData3: false,
    showData4: false
  };

  handleDataChange = (name: string) => (e: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({
      [name]: e.target.checked
    });
  };

  render() {

    return (
      <ResponsiveContainer width="99%" height={320}>
        <BarChart width={600} height={300} data={this.props.pieChartData.entrepreneurData}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="problemer" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  componentDidMount(): void {
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
  getEntrepreneursByMuni: () => dispatch(getEntrepreneursByMuni()),
  getProblemsByEntrepreneur: () => dispatch(getProblemsByEntrepreneur())
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ProblemsByEnt));
