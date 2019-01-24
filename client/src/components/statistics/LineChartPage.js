// @flow
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
import type { ReduxState } from '../../store/reducers';
import { getProblemsByMonth } from '../../store/actions/statisticsActions';
import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import moment from 'moment';

const lineChartData = [
  { name: 'Mon', Problems: 2200 },
  { name: 'Tue', Problems: 1200 },
  { name: 'Wed', Problems: 5000 },
  { name: 'Thu', Problems: 4780 },
  { name: 'Fri', Problems: 5890 },
  { name: 'Sat', Problems: 4390 },
  { name: 'Sun', Problems: 4490 }
];

type Props = {
  dropDownMonths: { value: string, name: string }[],
  getProblemsByMonthLine: (selectedMonth: string) => void,
  lineChartData: any
};
type State = {
  selectedMonth: string
};

class LineChartPage extends React.Component<Props, State> {
  state = {
    selectedMonth: moment(Date.now()).format('YYYY-M')
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({
      selectedMonth: e.target.value
    });
    this.props.getProblemsByMonthLine(e.target.value);
  };

  render() {
    console.log(this.props.lineChartData);
    return (
      <div>
        <ResponsiveContainer width="99%" height={320}>
          <LineChart data={this.props.lineChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="problemer" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <ValidatorForm onSubmit={() => console.log('')}>
          <SelectValidator
            fullWidth
            margin="normal"
            label="Fylke: "
            name="county"
            value={this.state.selectedMonth}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
          >
            {this.props.dropDownMonths.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </SelectValidator>
        </ValidatorForm>
      </div>
    );
  }

  componentDidMount(): void {
    this.props.getProblemsByMonth(this.state.selectedMonth);
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    dropDownMonths: state.statistic.dropDownMonths,
    lineChartData: state.statistic.lineChartData
  };
};
const mapDispatchToProps = dispatch => ({
  getProblemsByMonth: month => dispatch(getProblemsByMonth(month))
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(LineChartPage));

/*
  <InputLabel shrink htmlFor="age-label-placeholder">
              Age
            </InputLabel>
            <Select
              value={this.state.age}
              onChange={this.handleChange}
              input={<Input name="age" id="age-label-placeholder" />}
              displayEmpty
              name="age"
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>

 */
