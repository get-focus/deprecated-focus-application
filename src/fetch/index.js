import fetch from 'isomorphic-fetch';

let requestID = 0;
function createRequestStatus() {
    requestID++;
    return {
        id: `request_${requestID}`,
        status: 'pending'
    };
}

function updateRequestStatus(request, status) {
    if(!request || !request.id || !request.status) {return; }
    console.log({request, status});
    return request;
}


function focusFetchProxy(...fetchArguments) {
    let requestStatus = createRequestStatus();
    updateRequestStatus(requestStatus, 'pending');
    return fetch(...fetchArguments).then(response => {
      response.ok ? updateRequestStatus(requestStatus, 'succes') :  updateRequestStatus(requestStatus, 'error');
      return response;
    }).catch(error => {
      console.info('error', error);
      updateRequestStatus(requestStatus, 'error');
      throw error;
    });
}
export default focusFetchProxy;
