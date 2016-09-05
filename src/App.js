import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './layout';
import fetchReducer, {totalsSelector} from './fetch/reducer';
import LoadingBarComponent from './fetch/component';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import createfocusFetchProxy from './fetch/fetch-proxy';
let msgId = 0;
import messageReducer from './messages/reducer';
import {removeMessage} from './messages/action';
const store = createStore(combineReducers({fetch: fetchReducer, messages: messageReducer}));
const ConnectedLoadingBar = connect(s => totalsSelector(s.fetch))(LoadingBarComponent);
const fetch = createfocusFetchProxy(store.dispatch);
import MessageCenter from './messages/message-center';
import './messages/message-center.css';
import './messages/reducer';

const ConnectedMessageCenter = connect(
  s => ({messages: s.messages}),
  d => ({deleteMessage: id => d(removeMessage(id))})
)(MessageCenter);

const log = d => console.log({logger: d})

class App extends PureComponent {
  componentWillMount(){
    fetch('http://localhost:8888/err')
      .then(log)
      .catch(log);
    fetch('http://localhost:8888/wait')
      .then(log)
      .catch(log);
    fetch('http://localhost:8888/ok')
      .then(log)
      .catch(log);
  }
  render() {
    return <Provider store={store}>
      <Layout MessageCenter={ConnectedMessageCenter}>
        <button onClick={() => store.dispatch({type: 'PUSH_MESSAGE', message:{id: `msg_${msgId++}`, type: 'info'}})}>Push</button>
        <ConnectedLoadingBar/>
      </Layout>
    </Provider>
    ;
  }
}

export default App;
