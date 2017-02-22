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



function _parseResponse(response, requestStatus, status, error = false){
    const result = response ? JSON.parse(response) : {}
    if(error) return {...result, __Focus__updateRequestStatus: updateRequest(requestStatus, status),  __Focus__status: ERROR}
    return {...result, __Focus__updateRequestStatus: updateRequest(requestStatus, status)}
}

// This function is a proxy on the ES6 fetch, it just adds action dispatch before real fetches
// TODO: maybe this could be a middleware...
// see https://github.com/acdlite/redux-promise/blob/master/src/index.js
function focusFetchProxy(...fetchArguments) {
    const requestStatus = createRequestStatus();
    return fetch(...fetchArguments).then(response => {
        if(response.ok){
            return response.text().then(data => _parseResponse(data, requestStatus, status))
        } else {
            return response.text().then(data => _parseResponse(data, requestStatus, status, true))
        }
    }).catch(error => {
        throw error;
    });
}

export const fetchBuilder = ({baseUrl, useCredentials = false}) => {
    return ({url, method, data, options}) => {
        const calledUrl = `${baseUrl}/${url}`;
        return focusFetch({url: calledUrl, method, data, options, useCredentials});
    }
};

export const focusFetch = ({url, method, data, options, useCredentials = false}) => {
    const credentialProps = credentialProps ? { useCredentials: 'include' } : {}; //pass cookies, for authentication
    return focusFetchProxy(url, {
        useCredentials: useCredentials ? 'include' : undefined,
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8;'
            //'Content-Type': 'application/json'
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
