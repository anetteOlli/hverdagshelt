import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import type { ReduxState } from '../../store/reducers';
import { getLineChartData } from '../../store/actions/statisticsActions';
import { Typography } from '@material-ui/core';

const lineChartData = [
  { name: 'Mon', Visits: 2200, Orders: 3400 },
  { name: 'Tue', Visits: 1280, Orders: 2398 },
  { name: 'Wed', Visits: 5000, Orders: 4300 },
  { name: 'Thu', Visits: 4780, Orders: 2908 },
  { name: 'Fri', Visits: 5890, Orders: 4800 },
  { name: 'Sat', Visits: 4390, Orders: 3800 },
  { name: 'Sun', Visits: 4490, Orders: 4300 }
];

class LineChartPage extends React.Component {
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
      <div>
        <ResponsiveContainer width="99%" height={320}>
          <LineChart data={lineChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Visits" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Orders" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={this.state.showData1} onChange={this.handleDataChange('showData1')} />}
              label="Data1"
            />
            <FormControlLabel
              control={<Switch checked={this.state.showData2} onChange={this.handleDataChange('showData2')} />}
              label="Data2"
            />
            <FormControlLabel
              control={<Switch checked={this.state.showData3} onChange={this.handleDataChange('showData3')} />}
              label="Data3"
            />
            <FormControlLabel
              control={<Switch checked={this.state.showData4} onChange={this.handleDataChange('showData4')} />}
              label="Data4"
            />
          </FormGroup>
      </div>
    );
  }

  componentDidMount(): void {}
}

const mapStateToProps = (state: ReduxState) => {
  return {
    data: state.statistic.lineChartData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLineChartData: () => dispatch(getLineChartData())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(LineChartPage));
