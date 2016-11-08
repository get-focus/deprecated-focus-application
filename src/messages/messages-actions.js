export const PUSH_MESSAGE = 'PUSH_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
let msgId = 0;

const DEFAULT_MESSAGE = {
    content: 'No message defined',
    actionText: undefined,
    actionHandler: undefined
};

function _getMessageId() {
    msgId++;
    return `msgId_${msgId}`;
};

export function pushMessage(message = DEFAULT_MESSAGE) {
    if(!message.id) {
        message.id = _getMessageId();
    }
    if(message.type === undefined) message.type = 'info';
    return {type: PUSH_MESSAGE, message};
};

export function pushMessageError(message = DEFAULT_MESSAGE) {
    message.type = 'error';
    return pushMessage(message);
};

export function pushMessageWarning(message = DEFAULT_MESSAGE) {
    message.type = 'warning';
    return pushMessage(message);
};

export function pushMessageSuccess(message = DEFAULT_MESSAGE) {
    message.type = 'success';
    return pushMessage(message);
};

export function removeMessage(message){
    return {type: REMOVE_MESSAGE, message}
};
