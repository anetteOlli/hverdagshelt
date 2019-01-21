import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import type { ReduxState } from '../../store/reducers';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Legend from 'recharts/lib/component/Legend';
import Bar from 'recharts/lib/cartesian/Bar';
import BarChart from 'recharts/lib/chart/BarChart';

const dataSimplePieChart = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 }
];

class LineChart extends React.Component {
  state = {
    showData1: false,
    showData2: false
  };

  handleDataChange = (name: string): void => (): void => {};

  render() {
    return (
      <div>
        <ResponsiveContainer width="99%" height={320}>
          <BarChart width={600} height={300} data={dataDualLineChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch name="showData1" checked={this.state.showData1} onChange={this.handleChange} value="showData1" />
            }
            label="Secondary"
          />
          <FormControlLabel
            control={
              <Switch
                name="showData2"
                checked={this.state.showData2}
                onChange={this.handleChange}
                value="showData2"
                color="primary"
              />
            }
            label="Primary"
          />
        </FormGroup>
      </div>
    );
  }

  componentDidMount(): void {
    this.props.getBarChartData();
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    data: state.statistic.barChartData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBarChartData: () => dispatch(getBarChartData())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(LineChart));
