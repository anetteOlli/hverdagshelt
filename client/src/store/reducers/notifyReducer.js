// @flow
export type State = { notifications: { key: number, message: string, options: { variant: string } }[] };
export type Action =
  | { type: 'ENQUEUE_SNACKBAR', payload: { key: number, message: string, options: { variant: string } } }
  | { type: 'REMOVE_SNACKBAR', payload: string };

const initState = {
  notifications: []
};

/**
 * The notifyReducer stores the redux state of all the notifications in the app.
 * @param state Current state of the notifyReducer.
 * @param action The action contains the type and payload to update the state.
 * @returns The updated state of the notifyReducer.
 */
export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'ENQUEUE_SNACKBAR':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload
          }
        ]
      };

    case 'REMOVE_SNACKBAR':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.key !== action.payload)
      };

    default:
      return state;
  }
};
