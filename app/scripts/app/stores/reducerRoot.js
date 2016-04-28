import ActionConstants from '../actions/actionConstants.js';
import DefaultState from './defaultState.js';

export default (state, action) => {
  if (typeof state === 'undefined') {
    return DefaultState;
  }
  switch (action.type) {
    case ActionConstants.SET_CONFIG:
      return Object.assign({}, state, {config: action.payload});
    default:
      return state;
  }
};