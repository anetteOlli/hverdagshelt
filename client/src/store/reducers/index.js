// @flow
import type { Action as CategoryAction, State as CategoryState } from './categoryReducer';
import type { Action as MapAction, State as MapState } from './mapReducer';
import type { Action as UserAction, State as UserState } from './userReducer';
import type { Action as EventAction, State as EventState } from './eventReducer';
import type { Action as ProblemAction, State as ProblemState } from './problemReducer';
import type { Action as MuniAction, State as MuniState } from './muniReducer';
import type { Action as EntrepreneurAction, State as EntrepreneurState } from './entrepreneurReducer';
import type { Action as StatisticAction, State as StatisticState } from './statisticsReducer';
import type { Action as AsyncAction, State as AsyncState } from './asyncReducer';
import type { Action as NotifyAction, State as NotifyState } from './asyncReducer';

import userReducer from './userReducer';
import problemReducer from './problemReducer';
import eventReducer from './eventReducer';
import mapReducer from './mapReducer';
import categoryReducer from './categoryReducer';
import muniReducer from './muniReducer';
import entrepreneurReducer from './entrepreneurReducer';
import statisticsReducer from './statisticsReducer';
import asyncReducer from './asyncReducer';
import notifyReducer from './notifyReducer';

import { combineReducers } from 'redux';

export type ReduxState = {
  user: UserState,
  problem: ProblemState,
  event: EventState,
  map: MapState,
  category: CategoryState,
  municipality: MuniState,
  entrepreneur: EntrepreneurState,
  statistic: StatisticState,
  notify: NotifyState,
  async: AsyncState
};

type Action =
  | CategoryAction
  | MapAction
  | UserAction
  | EventAction
  | ProblemAction
  | MuniAction
  | EntrepreneurAction
  | StatisticAction
  | AsyncAction
  | NotifyAction;

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type GetState = () => ReduxState;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;

/**
 * The rootReducer that combines all the different reducers in the app.
 */

// $FlowFixMe
export default combineReducers({
  user: userReducer,
  problem: problemReducer,
  event: eventReducer,
  map: mapReducer,
  category: categoryReducer,
  municipality: muniReducer,
  entrepreneur: entrepreneurReducer,
  statistic: statisticsReducer,
  async: asyncReducer,
  notify: notifyReducer
});
