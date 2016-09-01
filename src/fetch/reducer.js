import {UPDATE_REQUEST} from './action';
function fetchReducer(state = {requests: {}, totals: {}}, action = {}){
  switch (action.type) {
    case UPDATE_REQUEST:
        const request = action.request;
        const requests = state.requests;
        const newRequests = {...requests, [request.id]: request.status
        };
        const newTotals = Object.keys(newRequests).reduce((tot, currReqKey) => {
          const requestStatus = requests[currReqKey];
          return {
            ...tot,
            [requestStatus]: (tot[requestStatus]+1)
          }
        },
        {pending: 0,cancelled: 0, success:0, error: 0, total:0});
        return {requests: newRequests, totals: newTotals}
      break;
    default:
      return state;
  }
}
let st = fetchReducer(undefined, {type: UPDATE_REQUEST, request: {id: 1, status: 'pending'}});
let st2 = fetchReducer(st, {type:UPDATE_REQUEST, request: {id: 2, status: 'pending'}});
let st3 = fetchReducer(st2, {type:UPDATE_REQUEST, request: {id: 3, status: 'pending'}});
let st4 = fetchReducer(st3, {type:UPDATE_REQUEST, request: {id: 1, status: 'success'}});
console.log({
  st,
  st2,
  st3,
  st4
});
export default fetchReducer;
