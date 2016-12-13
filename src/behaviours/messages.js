import {
    pushMessage,
    pushMessageError,
    pushMessageWarning,
    pushMessageSuccess,
    removeMessage
} from '../messages/messages-actions';
import {connect as connectToState} from 'react-redux';


export const connect = () => {
    return (ComponentToConnect) => {
        return connectToState(null, {pushMessage, pushMessageError, pushMessageWarning, pushMessageSuccess})(ComponentToConnect);
    };
};
