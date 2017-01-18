import fetch from 'isomorphic-fetch';
import {updateRequest} from './fetch-actions';
export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';


let requestID = 0;
function createRequestStatus() {
    requestID++;
    return {
        id: `request_${requestID}`
    };
}


// This function is a proxy on the ES6 fetch, it just adds action dispatch before real fetches
// TODO: maybe this could be a middleware...
// see https://github.com/acdlite/redux-promise/blob/master/src/index.js
function focusFetchProxy(...fetchArguments) {
    const requestStatus = createRequestStatus();
    return fetch(...fetchArguments)
      .then(response => {
        if(response.ok){
          return response.json().then(data => ({...data, __Focus__updateRequestStatus: updateRequest(requestStatus, status) }))
        } else {
          return response.json().then(data => ({...data, __Focus__updateRequestStatus: updateRequest(requestStatus, status) , __Focus__status: ERROR}))
        }
      }).catch(error => {
        throw error;
      });
}


export const focusFetch = ({url, method, data, options}) => {
    return focusFetchProxy(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    });
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
export default focusFetch;
