import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import type { ReduxState } from '../../store/reducers';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import { getCategories } from '../../store/actions/categoryActions';
import { getProblemsByCategory, getProblemsByEntrepreneur } from '../../store/actions/statisticsActions';
import { getEntrepreneursByMuni } from '../../store/actions/entrepreneurAction';

const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 }
];

class PieChartPage extends React.Component {
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
          <PieChart width={800} height={400}>
            <Pie
              dataKey="problemer"
              data={this.props.pieChartData}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
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
)(withSnackbar(PieChartPage));
