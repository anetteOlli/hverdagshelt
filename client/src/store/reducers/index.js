// @flow
import type { Action as CategoryAction, State as CategoryState } from './categoryReducer';
import type { Action as MapAction, State as MapState } from './mapReducer';
import type { Action as UserAction, State as UserState } from './userReducer';
import type { Action as EventAction, State as EventState } from './eventReducer';
import type { Action as AppAction, State as AppState } from './appReducer';
import type { Action as ProblemAction, State as ProblemState } from './problemReducer';
import type { Action as MuniAction, State as MuniState } from './muniReducer';
import type { Action as EntrepreneurAction, State as EntrepreneurState } from './entrepreneurReducer';
import type { Action as StatisticAction, State as StatisticState } from './statisticsReducer';

import userReducer from './userReducer';
import problemReducer from './problemReducer';
import eventReducer from './eventReducer';
import mapReducer from './mapReducer';
import appReducer from './appReducer';
import categoryReducer from './categoryReducer';
import muniReducer from './muniReducer';
import entrepreneurReducer from './entrepreneurReducer';
import statisticsReducer from './statisticsReducer';

import { combineReducers } from 'redux';

export type ReduxState = {
  app: AppState,
  user: UserState,
  problem: ProblemState,
  event: EventState,
  map: MapState,
  category: CategoryState,
  muni: MuniState,
  entrepreneur: EntrepreneurState,
  statistic: StatisticState
};
type Action =
  | CategoryAction
  | MapAction
  | UserAction
  | EventAction
  | AppAction
  | ProblemAction
  | MuniAction
  | EntrepreneurAction
  | StatisticAction;

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type GetState = () => ReduxState;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;

// $FlowFixMe
export default combineReducers({
  app: appReducer,
  user: userReducer,
  problem: problemReducer,
  event: eventReducer,
  map: mapReducer,
  category: categoryReducer,
  muni: muniReducer,
  entrepreneur: entrepreneurReducer,
  statistic: statisticsReducer
});
