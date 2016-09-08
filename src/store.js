import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import messageReducer from './messages/messages-reducer';
import headerReducer from './header/header-reducer';
import confirmReducer from './confirm/confirm-reducer';
import fetchReducer from './fetch/fetch-reducer';

export function getApplicationReducer(){
  return combineReducers({
    fetch: fetchReducer,
    messages: messageReducer,
    header: headerReducer,
    confirm: confirmReducer
  });
}

export default function create(){
  return createStore(
    getApplicationReducer(), applyMiddleware(thunk));
}
