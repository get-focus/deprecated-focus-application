import {
    confirm
} from '../confirm/confirm-actions';
import {connect as connectToState} from 'react-redux';


export const connect = () => {
    return (ComponentToConnect) => {
        return connectToState(null, {confirm})(ComponentToConnect);
    };
};
