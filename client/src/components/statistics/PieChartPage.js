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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
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
                data={this.props.pieChartData.categoryData}
                labelLine={false}
                label={renderCustomizedLabel}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
              >
              >
              {this.props.pieChartData.categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Pie
              dataKey="problemer"
              data={this.props.pieChartData.entrepreneurData}
              cx={500}
              cy={200}
              innerRadius={40}
              outerRadius={80}
              fill="#82ca9d"
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div>dsadad</div>
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
