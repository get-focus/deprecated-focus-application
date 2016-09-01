export const UPDATE_REQUEST = 'UPDATE_REQUEST';


export function updateRequest(request, status){
  return {
    type: UPDATE_REQUEST,
    request: {...request, status}
  };
}
