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
import { getBarChartData } from '../../store/actions/statisticsActions';

const barChartData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];

class BarChartPage extends React.Component {
  state = {
    showData1: false,
    showData2: false
  };

  handleDataChange = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  render() {
    return (
      <div>
        <ResponsiveContainer width="99%" height={320}>
          <BarChart
            width={600}
            height={300}
            data={barChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
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
              <Switch
                name="showData1"
                color="primary"
                checked={this.state.showData1}
                onChange={this.handleDataChange}
                value="showData1"
              />
            }
            label="Secondary"
          />
        </FormGroup>
      </div>
    );
  }

  componentDidMount(): void {
    this.props.getBarChartData();
  }
}

const mapStateToProps = (state: ReduxState) => ({
  data: state.statistic.barChartData
});

const mapDispatchToProps = dispatch => ({
  getBarChartData: () => dispatch(getBarChartData())
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(BarChartPage));
