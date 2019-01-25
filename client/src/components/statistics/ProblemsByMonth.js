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
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type Props = {
  dropDownMonths: { value: string, name: string }[],
  getProblemsByMonthLine: (selectedMonth: string) => void,
  lineChartData: any
};
type State = {
  selectedMonth: string
};

const styles = theme => ({
  formControl: {
    marginLeft: theme.spacing.unit *5
  }
});


class ProblemsByMonth extends React.Component<Props, State> {
  state = {
    selectedMonth: moment(Date.now()).format('YYYY-M')
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({
      selectedMonth: e.target.value
    });
    this.props.getProblemsByMonth(e.target.value);
  };

  render() {
    return (
      <div>
        <ResponsiveContainer width="99%" height={320}>
          <LineChart data={this.props.lineChartData.problemsByMonthData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="problemer" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <FormControl className={this.props.classes.formControl}>
          <Select
            margin="normal"
            label="Velg månde"
            name="selectedMonth"
            value={this.state.selectedMonth}
            onChange={this.handleChange}
          >
            {this.props.dropDownMonths.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
)(withStyles(styles)(ProblemsByMonth));