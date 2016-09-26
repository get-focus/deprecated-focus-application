import fetch from 'isomorphic-fetch';
import {updateRequest} from './fetch-actions';
export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';


let requestID = 0;
let dispatch = (...dispatchArgs) => {
  throw new Error(`FOCUS_APPLICATION_FETCH, you need to create your focus fetch proxy using createfocusFetchProxy and by providing your dispatcher`, dispatchArgs);
}

function createRequestStatus() {
    requestID++;
    return {
        id: `request_${requestID}`
    };
}

function updateRequestStatus(request, status) {
    if(!request || !request.id ) {throw new Error('focusFetchProxy: Your request should have an id...')}
    dispatch(updateRequest(request, status));
    return request;
}

// This function is a proxy on the ES6 fetch, it just adds action dispatch before real fetches
// TODO: maybe this could be a middleware...
// see https://github.com/acdlite/redux-promise/blob/master/src/index.js
function focusFetchProxy(...fetchArguments) {
    const requestStatus = createRequestStatus();
    updateRequestStatus(requestStatus, PENDING);
    return fetch(...fetchArguments)
      .then(response => {
        if(response.ok){
          updateRequestStatus(requestStatus, SUCCESS)
          return {response: response, status: SUCCESS};
        } else {
          updateRequestStatus(requestStatus,ERROR)
          return {response: response, status: ERROR};
        }
      }).catch(error => {
        updateRequestStatus(requestStatus,ERROR);
        throw error;
      });
}

function createfocusFetchProxy(projectDispatcher){
  dispatch = projectDispatcher;
  return focusFetchProxy;
}

/*
function isPromise(val) {
return val && typeof val.then === 'function';
}
export function focusFetchMiddleware({ dispatch }){
  return next => action => {

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}
*/
export default createfocusFetchProxy;
