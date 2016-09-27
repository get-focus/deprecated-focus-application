export const INITIALIZE_SESSION = 'INITIALIZE_SESSION';
export const SET_LOCAL_PERMISSIONS = 'SET_LOCAL_PERMISSIONS';
export const SET_GLOBAL_PERMISSIONS = 'SET_GLOBAL_PERMISSIONS';

export const ADD_GLOBAL_PERMISSION = 'ADD_GLOBAL_PERMISSION';
export const ADD_LOCAL_PERMISSION = 'ADD_LOCAL_PERMISSION';



export function initializeSession(response){
  return {
    type: INITIALIZE_SESSION,
    response
  };
}


export function setGlobalPermissions(permissions){
  return {
    type: SET_GLOBAL_PERMISSIONS,
    permissions
  };
}

export function setLocalPermissions(permissions){
  return {
    type: SET_LOCAL_PERMISSIONS,
    permissions
  };
}

export function addGlobalRole(permission){
  return {
    type: ADD_GLOBAL_PERMISSION,
    permission
  };
}

export function addLocalRole(permission){
  return {
    type: ADD_LOCAL_PERMISSION,
    permission
  };
}
