import {UPDATE_REQUEST} from './action';
const DEFAULT_TOTALS = {pending: 0,cancelled: 0, success:0, error: 0, total:0};

export function totalsSelector(state){
  return state && state.totals;
}


function fetchReducer(state = {requests: {}, totals: {}}, action = {}){
  switch (action.type) {
    case UPDATE_REQUEST:
        const request = action.request;
        const requests = state.requests;
        const newRequests = {...requests, [request.id]: request.status
        };
        const newTotals = Object.keys(newRequests).reduce((tot, currReqKey) => {
          const requestStatus = newRequests[currReqKey];
          return {
            ...tot,
            [requestStatus]: (tot[requestStatus] + 1),
            total: tot.total +1
          }
        },
        DEFAULT_TOTALS);
        return {requests: newRequests, totals: newTotals};
    default:
      return state;
  }
}
export default fetchReducer;
