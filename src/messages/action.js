export const PUSH_MESSAGE = 'PUSH_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export function pushMessage(message){
  return {type: PUSH_MESSAGE, message}
}

export function removeMessage(message){
  return {type: REMOVE_MESSAGE, message}
}
