// @flow
import type { Problem } from './problemReducer';
import {
  setUpDropDownMonth,
  getCategoryProblemsByEntrepreneur,
  getEntrepreneurProblemsByCategory,
  getProblemsByCategory,
  getProblemsByEntrepreneur,
  getProblemsByMonth,
  getSolvedTimeByTime,
  setUpDropDownYear
} from '../../components/statistics/statisticMethods';

export type State = {
  problems: Problem[],
  lineChartData: { name: string, problemer: string }[],
  pieChartData: [],
  barChartData: [],
  errorMessage: string,
  ready: boolean,
  dropDownMonths: { value: string, name: string }[]
};
export type Action =
  | { type: 'GET_ALL_PROBLEMS_SUCCESS', payload: Problem[] }
  | { type: 'GET_ALL_PROBLEMS_ERROR', payload: Error }
  | { type: 'GET_PROBLEMS_BY_MONTH', payload: string };

const initState = {
  lineChartData: { problemsByMonthData: [] },
  pieChartData: { categoryData: [], entrepreneurData: [] },
  barChartData: [],
  problems: [],
  errorMessage: '',
  ready: false,
  dropDownMonths: []
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'GET_ALL_PROBLEMS_SUCCESS':
      console.log('%c GET_ALL_PROBLEMS_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload,
        ready: true,
        dropDownMonths: setUpDropDownMonth(action.payload[0].date_made, Date.now()),
        dropDownYears: setUpDropDownYear(action.payload[0].date_made, Date.now()),
        errorMessage: ''
      };
    case 'GET_ALL_PROBLEMS_ERROR':
      console.log('%c GET_ALL_PROBLEMS_ERROR', 'color: red; font-weight: bold;', action.payload.message);
      return {
        ...state,
        ready: true,
        errorMessage: action.payload
      };
    case 'GET_PROBLEMS_BY_MONTH':
      console.log('%c GET_PROBLEMS_BY_MONTH', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        lineChartData: {
          ...state.lineChartData,
          problemsByMonthData: getProblemsByMonth(state.problems, action.payload)
        }
      };
    case 'GET_PROBLEMS_BY_CATEGORY':
      console.log('%c GET_PROBLEMS_BY_MONTH', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        pieChartData: { ...state.pieChartData, categoryData: getProblemsByCategory(state.problems, action.payload) }
      };
    case 'GET_PROBLEMS_BY_ENTREPRENEUR':
      console.log('%c GET_PROBLEMS_BY_MONTH', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        pieChartData: {
          ...state.pieChartData,
          entrepreneurData: getProblemsByEntrepreneur(state.problems, action.payload)
        }
      };
    case 'SET_SELECTED_MUNI':
      console.log('%c SET_SELECTED_MUNI', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        selectedMuni: action.payload
      };
    case 'GET_PROBLEMS_BY_YEAR':
      console.log('%c GET_PROBLEMS_BY_YEAR', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        lineChartData: {
          ...state.lineChartData,
          problemsByYearData: getSolvedTimeByTime(state.problems, action.payload)
        }
      };
    default:
      return state;
  }
};
