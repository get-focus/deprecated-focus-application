export const INITIALIZE_PROFIL = 'INITIALIZE_PROFIL';
export const SET_ROLE = 'SET_ROLE';
export const ADD_ROLE = 'ADD_ROLE';



export function initializeProfil(profil){
  return {
    type: INITIALIZE_PROFIL,
    profil
  };
}


export function setRole(roles){
  return {
    type: SET_ROLE,
    roles
  };
}


export function addRole(role){
  return {
    type: ADD_ROLE,
    role
  };
}
