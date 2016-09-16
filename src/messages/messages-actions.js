export const PUSH_MESSAGE = 'PUSH_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
let msgId = 0;

function _getMessageId(){
  msgId++;
  return `msgId_${msgId}`;
}

export function pushMessage(message = {}){
  if(!message.id) {
    message.id = _getMessageId();
  }
  return {type: PUSH_MESSAGE, message}
}

export function removeMessage(message){
  return {type: REMOVE_MESSAGE, message}
}
