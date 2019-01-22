// @flow
import type { Problem } from './problemReducer';
export type State = {
  problems: Problem[],
  lineChartData: [],
  pieChartData: [],
  barChartData: [],
  errorMessage: string,
  selectedMuni: { municipality: string, county: string } | null,
  ready: boolean
};
export type Action =
  | { type: 'GET_ALL_PROBLEMS_SUCCESS', payload: [] }
  | { type: 'GET_ALL_PROBLEMS_ERROR', payload: Error }
  | { type: 'LINE_CHART_DATA_SUCCESS', payload: [] }
  | { type: 'LINE_CHART_DATA_ERROR', payload: Error }
  | { type: 'PIE_CHART_DATA_SUCCESS', payload: [] }
  | { type: 'PIE_CHART_DATA_ERROR', payload: Error }
  | { type: 'BAR_CHART_DATA_SUCCESS', payload: [] }
  | { type: 'BAR_CHART_DATA_ERROR', payload: Error };

const initState = {
  lineChartData: [],
  pieChartData: [],
  barChartData: [],
  problems: [],
  errorMessage: '',
  selectedMuni: null,
  ready: false
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'GET_ALL_PROBLEMS_SUCCESS':
      console.log('%c GET_ALL_PROBLEMS_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload,
        ready: true,
        errorMessage: ''
      };
    case 'GET_ALL_PROBLEMS_ERROR':
      console.log('%c GET_ALL_PROBLEMS_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload
      };
    case 'LINE_CHART_DATA_SUCCESS':
      console.log('%c LINE_CHART_DATA_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        lineChartData: action.payload,
        errorMessage: ''
      };
    case 'LINE_CHART_DATA_ERROR':
      console.log('%c LINE_CHART_DATA_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PIE_CHART_DATA_SUCCESS':
      console.log('%c PIE_CHART_DATA_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        pieChartData: action.payload,
        errorMessage: ''
      };
    case 'PIE_CHART_DATA_ERROR':
      console.log('%c PIE_CHART_DATA_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'BAR_CHART_DATA_SUCCESS':
      console.log('%c BAR_CHART_DATA_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        barChartData: action.payload,
        errorMessage: ''
      };
    case 'BAR_CHART_DATA_ERROR':
      console.log('%c BAR_CHART_DATA_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
