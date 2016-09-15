import {CLEAR_CONFIG_CONFIRM, SET_CONFIG_CONFIRM} from './confirm-actions';

export function confirmSelector(state){
  return state.confirm;
}

export default function(state = {}, action = {}){
  switch (action.type) {
    case CLEAR_CONFIG_CONFIRM:
    case SET_CONFIG_CONFIRM:
      //console.log({confirmSelector, ...action})
      return action.config;
    default:
      return state;
  }
}
