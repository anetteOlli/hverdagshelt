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
  | { type: 'GET_PROBLEMS_BY_MONTH', payload: string }
  | { type: 'GET_PROBLEMS_BY_CATEGORY', payload: string[] }
  | { type: 'SET_SELECTED_MUNI', payload: string }
  | { type: 'GET_PROBLEMS_BY_ENTREPRENEUR', payload: any }
  | { type: 'GET_PROBLEMS_BY_YEAR', payload: string };

const initState = {
  lineChartData: { problemsByMonthData: [], problemsByYearData: [] },
  pieChartData: { categoryData: [], entrepreneurData: [] },
  barChartData: [],
  problems: [],
  errorMessage: '',
  ready: false,
  dropDownMonths: []
};

/**
 * The statisticsReducer stores the redux state of all the statistics in the app.
 * @param state Current state of the statisticsReducer.
 * @param action The action contains the type and payload to update the state.
 * @returns The updated state of the statisticsReducer.
 */
export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'GET_ALL_PROBLEMS_SUCCESS':
      return {
        ...state,
        problems: action.payload,
        ready: true,
        dropDownMonths: setUpDropDownMonth(action.payload[0].date_made, Date.now()),
        dropDownYears: setUpDropDownYear(action.payload[0].date_made, Date.now()),
        errorMessage: ''
      };
    case 'GET_ALL_PROBLEMS_ERROR':
      return {
        ...state,
        ready: true,
        errorMessage: action.payload
      };
    case 'GET_PROBLEMS_BY_MONTH':
      return {
        ...state,
        lineChartData: {
          ...state.lineChartData,
          problemsByMonthData: getProblemsByMonth(state.problems, action.payload)
        }
      };
    case 'GET_PROBLEMS_BY_CATEGORY':
      return {
        ...state,
        pieChartData: { ...state.pieChartData, categoryData: getProblemsByCategory(state.problems, action.payload) }
      };
    case 'GET_PROBLEMS_BY_ENTREPRENEUR':
      return {
        ...state,
        pieChartData: {
          ...state.pieChartData,
          entrepreneurData: getProblemsByEntrepreneur(state.problems, action.payload)
        }
      };
    case 'SET_SELECTED_MUNI':
      return {
        ...state,
        selectedMuni: action.payload
      };
    case 'GET_PROBLEMS_BY_YEAR':
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
