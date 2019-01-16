// @flow
import type { State as CategoryState } from './categoryReducer';
import type { State as MapState } from './mapReducer';
import type { State as UserState } from './userReducer';
import type { State as EventState } from './eventReducer';
import type { State as AppState } from './appReducer';
import type { State as ProblemState } from './problemReducer';
import type { State as MuniState } from './muniReducer';
import type { State as EntrepreneurState } from './entrepreneurReducer';

import userReducer from './userReducer';
import problemReducer from './problemReducer';
import eventReducer from './eventReducer';
import mapReducer from './mapReducer';
import appReducer from './appReducer';
import categoryReducer from './categoryReducer';
import muniReducer from './muniReducer';
import entrepreneurReducer from './entrepreneurReducer';

import { combineReducers } from 'redux';

export type State = {
  app: AppState,
  user: UserState,
  problem: ProblemState,
  event: EventState,
  map: MapState,
  category: CategoryState,
  muni: MuniState,
  entrepreneur: EntrepreneurState
};

// $FlowFixMe
export default combineReducers({
  app: appReducer,
  user: userReducer,
  problem: problemReducer,
  event: eventReducer,
  map: mapReducer,
  category: categoryReducer,
  muni: muniReducer,
  entrepreneur: entrepreneurReducer
});
