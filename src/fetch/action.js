export const UPDATE_REQUEST = 'UPDATE_REQUEST';

/** Update or create a given request with a given status.*/
export function updateRequest(request, status){
  return {
    type: UPDATE_REQUEST,
    request: {...request, status}
  };
}
