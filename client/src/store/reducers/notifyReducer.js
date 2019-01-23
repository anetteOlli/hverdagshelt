// @flow
export type State = { notifications: { key: number, message: string, options: { variant: string } }[] };
export type Action =
  | { type: 'ENQUEUE_SNACKBAR', payload: { key: number, message: string, options: { variant: string } } }
  | { type: 'REMOVE_SNACKBAR', payload: string };

const initState = {
  notifications: []
};

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
