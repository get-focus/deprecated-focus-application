import {PUSH_MESSAGE, REMOVE_MESSAGE} from './messages-actions';

export function messagesSelector(state){
    return {messages: state.messages};
}

export function messageToDisplaySelector(state){
    return {messages: state.messages.length > 0 ? state.messages.slice(0,1) : []};
}

function messageCenterReducer(state = [], action){
    switch (action.type) {
        case PUSH_MESSAGE:
            return [...state, action.message];
        case REMOVE_MESSAGE:
            const msgIndex = state.findIndex(m => m.id === action.message.id);
            if(msgIndex === (-1)) return state;
            return [...state.slice(0, msgIndex), ...state.slice(msgIndex + 1)];
        default:
            return state;
    };
};
export default messageCenterReducer;
