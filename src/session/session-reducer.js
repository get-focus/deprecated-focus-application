import {INITIALIZE_SESSION,SET_LOCAL_PERMISSIONS, SET_GLOBAL_PERMISSIONS, ADD_GLOBAL_PERMISSION, ADD_LOCAL_PERMISSION} from './session-actions';


function sessionReducer(state = {user: {}, globalPermissions: [], localPermissions: []}, action = {response: {}}){
  switch (action.type) {
    case INITIALIZE_SESSION:
        return {user : action.response.user, localPermissions: action.response.localPermissions, globalPermissions: action.response.globalPermissions};
    case SET_LOCAL_PERMISSIONS:
        return {
          ...state,
          localPermissions : action.permissions
        }
    case SET_GLOBAL_PERMISSIONS:
      return {
        ...state,
        globalPermissions : action.permissions
      }
    case ADD_GLOBAL_PERMISSION:
        return {
          ...state,
          globalPermissions: ( state.globalPermissions) ? [
            ...state.globalPermissions,
            action.permission
          ] : [action.permission]
        }
    case ADD_LOCAL_PERMISSION:
        return {
          ...state,
          localPermissions: ( state.localPermissions) ? [
            ...state.localPermissions,
            action.permission
          ] : [action.permission]
        }
    default:
      return state;
  }
}
export default sessionReducer;
