import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import type { ReduxState } from '../../store/reducers';
import { getLineChartData } from '../../store/actions/statisticsActions';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';

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
          <PieChart width={800} height={400}>
            <Pie data={dataSimplePieChart} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
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
    this.props.getPieChartData();
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    data: state.statistic.lineChartData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPieChartData: () => dispatch(getPieChartData())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(LineChart));
