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
class LineChart extends React.Component {
  state = {
    showUserData: false
  };

  handleDataChange = (name: string): void => (): void => {};

  render() {
    return (
      <div>
        <ResponsiveContainer width="99%" height={320}>
          <LineChart data={dataSimpleLineChart}>
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
            control={<Switch checked={this.state.checkedA} onChange={this.handleChange('checkedA')} value="checkedA" />}
            label="Secondary"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.checkedB}
                onChange={this.handleChange('checkedB')}
                value="checkedB"
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

  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    data: state.statistic.Link
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatisticData: (dataName: string) => dispatch(dataName(dataName))
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(LineChart));
