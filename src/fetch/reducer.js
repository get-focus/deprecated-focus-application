import {UPDATE_REQUEST} from './action';
const DEFAULT_TOTALS = {pending: 0,cancelled: 0, success:0, error: 0, total:0};

function fetchReducer(state = {requests: {}, totals: {}}, action = {}){
  switch (action.type) {
    case UPDATE_REQUEST:
        const request = action.request;
        const requests = state.requests;
        const newRequests = {...requests, [request.id]: request.status
        };
        //console.log("newRequests", {newRequests})
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
      break;
    default:
      return state;
  }
}
export default fetchReducer;
