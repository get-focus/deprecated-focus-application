import {INITIALIZE_PROFIL,SET_ROLE, DELETE_ROLE, ADD_ROLE} from './profil-actions';


function profilReducer(state = {user: {roles : []}}, action = {}){
  switch (action.type) {
    case INITIALIZE_PROFIL:
        return {user : action.profil};
    case SET_ROLE:
        return {
          ...state,
          user: {
            ...state.user,
            roles: action.roles
          }

        }
    case ADD_ROLE:
        return {
          ...state,
          user: {
            ...state.user,
            roles: (state.user && state.user.roles) ? [
              ...state.user.roles,
              action.role
            ] : [action.role]
          }

        }
    default:
      return state;
  }
}
export default profilReducer;
