// @flow
import moment from 'moment';
import 'moment/locale/nb';
moment.locale('nb');

import type { Problem } from './problemReducer';
export type State = {
  problems: Problem[],
  lineChartData: { name: string, problemer: string }[],
  pieChartData: [],
  barChartData: [],
  errorMessage: string,
  selectedMuni: { municipality: string, county: string } | null,
  ready: boolean,
  dropDownMonths: { value: string, name: string }[]
};
export type Action =
  | { type: 'GET_ALL_PROBLEMS_SUCCESS', payload: Problem[] }
  | { type: 'GET_ALL_PROBLEMS_ERROR', payload: Error }
  | { type: 'GET_PROBLEMS_BY_MONTH', payload: string };

const initState = {
  lineChartData: [],
  pieChartData: [],
  barChartData: [],
  problems: [],
  errorMessage: '',
  selectedMuni: null,
  ready: false,
  dropDownMonths: []
};

const setUpDropDown = (dateStart: moment, dateEnd: moment): { value: string, name: string }[] => {
  const timeValues = [];
  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    timeValues.push({ value: dateStart.format('YYYY-M'), name: dateStart.format('MMMM YYYY') });
    dateStart.add(1, 'month');
  }
  return timeValues;
};

const getProblemsByMonth = (allProblems: Problem[], selectedMonth: string): { name: string, problemer: number }[] => {
  const problems = allProblems.filter(
    p => selectedMonth === `${new Date(p.date_made).getFullYear()}-${new Date(p.date_made).getMonth() + 1}`
  );
  console.log('PROBLEMS', problems);

  const year = selectedMonth.split('-')[0];
  const month = selectedMonth.split('-')[1];

  const result = (Array(new Date(parseInt(year), parseInt(month), 0).getDate())
    .fill(null)
    .map((u, i) => ({ name: `Dag ${i + 1}`, problemer: 0 })): Array<{ name: string, problemer: number }>);
  problems.map(p => result[new Date(p.date_made).getDate()].problemer++);
  console.log(result);
  return result;
};

const getProblemsByCategoryPie = (
  allProblems: Problem[],
  allCategories: string[]
): { name: string, problemer: number }[] => {
  const result = (Array(allCategories.length)
    .fill(null)
    .map((u, i) => ({ name: allCategories[i], problemer: 0 })): Array<{ name: string, problemer: number }>);

  allProblems.map(p => result[allCategories.findIndex(c => c === p.category)].problemer++);
  console.log(result);
  return result;
};

const getProblemsByEntrepreneurPie = (
  allProblems: Problem[],
  entrepreneurs: []
): { name: string, problemer: number }[] => {

  const result = (Array(entrepreneurs.length)
    .fill(null)
    .map((u, i) => ({ name: entrepreneurs[i].business_name, problemer: 0 })): Array<{ name: string, problemer: number }>);

  allProblems.map(p => result[entrepreneurs.findIndex(e => e.entrepreneur_id === p.entrepreneur_id)].problemer++);
  console.log(result);
  return result;
};

const getProblemsByEntrepreneurBar = (
  allProblems: Problem[],
  entrepreneurs: []
): { name: string, problemer: number }[] => {

  const result = (Array(entrepreneurs.length)
    .fill(null)
    .map((u, i) => ({ name: entrepreneurs[i].business_name, problemer: 0 })): Array<{ name: string, problemer: number }>);

  allProblems.map(p => result[entrepreneurs.findIndex(e => e.entrepreneur_id === p.entrepreneur_id)].problemer++);
  console.log(result);
  return result;
};


export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'GET_ALL_PROBLEMS_SUCCESS':
      console.log('%c GET_ALL_PROBLEMS_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload,
        ready: true,
        dropDownMonths: setUpDropDown(moment(action.payload[0].date_made.toString()), moment(Date.now())),
        errorMessage: ''
      };
    case 'GET_ALL_PROBLEMS_ERROR':
      console.log('%c GET_ALL_PROBLEMS_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload
      };
    case 'GET_PROBLEMS_BY_MONTH':
      console.log('%c GET_PROBLEMS_BY_MONTH', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        lineChartData: getProblemsByMonth(state.problems, action.payload)
      };
    case 'GET_PROBLEMS_BY_ENTREPRENEUR':
      console.log('%c GET_PROBLEMS_BY_MONTH', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        lineChartData: getProblemsByEntrepreneurPie(state.problems, action.payload)
      };
    case 'SET_SELECTED_MUNI':
      console.log('%c SET_SELECTED_MUNI', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        selectedMuni: action.payload
      };
    default:
      return state;
  }
};
