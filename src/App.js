import React, { PureComponent } from 'react';
//import logo from './logo.svg';
import './App.css';
import Layout from './layout';
import fetchReducer, {totalsSelector} from './fetch/reducer';
import LoadingBarComponent from './fetch/component';
import {createStore, combineReducers} from 'redux';
import ScrollTrigger from './layout/scroll-trigger';
import {Provider, connect} from 'react-redux';
import createfocusFetchProxy from './fetch/fetch-proxy';
import messageReducer from './messages/reducer';
import {removeMessage} from './messages/action';
import MessageCenter from './messages/message-center';
import './messages/message-center.css';
import './messages/reducer';
import AppHeader from './header/header-component';
import headerReducer, {headerSelector, headerIsExpandedSelector} from './header/header-reducer';
import {
  expandHeader,
  unExpandHeader,
  injectBarContentLeftHeader,
  injectBarContentRightHeader,
  injectBarContentSummaryHeader,
  injectBarContentExpandedHeader,
  triggerPosition
} from './header/header-actions'
import {Provider as RoleProvider, Role} from './role';
const ConnectedHeader = connect(headerSelector)(AppHeader)
const store = createStore(combineReducers({fetch: fetchReducer, messages: messageReducer, header: headerReducer}));
const ConnectedLoadingBar = connect(s => totalsSelector(s.fetch))(LoadingBarComponent);
const fetch = createfocusFetchProxy(store.dispatch);
let msgId = 0;

const ConnectedMessageCenter = connect(
  s => ({messages: s.messages}),
  d => ({deleteMessage: id => d(removeMessage(id))})
)(MessageCenter);

const log = d => console.log({logger: d})
const ConnectedScrollTrigger = connect(
  headerIsExpandedSelector,
  d => ({
    expandHeader: () => d(expandHeader()),
    unExpandHeader: () => d(unExpandHeader())
  }))(ScrollTrigger);


const Debug = connect(s => ({redux: s}))(props => <pre><code>{JSON.stringify(props.redux, null, 4)}</code></pre>)

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
    const {dispatch} = store;
    const actions = {
      expandHeader: () => dispatch(expandHeader()),
      unExpandHeader: () => dispatch(unExpandHeader()),
      injectBarContentLeftHeader: () =>dispatch(injectBarContentLeftHeader(p => <div>'injectBarContentLeftHeader'</div>)),
      injectBarContentRightHeader: () =>dispatch(injectBarContentRightHeader(p => <div>'injectBarContentRightHeader'</div>)),
      injectBarContentSummaryHeader:() => dispatch(injectBarContentSummaryHeader(p => <div>'injectBarContentSummaryHeader'</div>)),
      injectBarContentExpandedHeader: () =>dispatch(injectBarContentExpandedHeader(p => <div>'injectBarContentExpandedHeader'</div>)),
      triggerPosition: () => dispatch(triggerPosition(150)),
      clearTrigger: () => dispatch(triggerPosition())
    }
    return <Provider store={store}>

      <RoleProvider roles={['PAPA', 'SINGE']}>
<div>
        <Role hasOne={['PAPA']}><div>{'Got it'}</div></Role>
        <Role hasOne={['PAS_PAPA']}><div>{'Pas Got it'}</div></Role>
        <Role hasAll={['PAPA', 'SINGE']}><div>{'Got it'}</div></Role>
        <Role hasAll={['PAPA', 'SINGE', 'PAS_PAPA']}><div>{'Pas Got it'}</div></Role>
      <ConnectedScrollTrigger>
        <Layout AppHeader={ConnectedHeader} MessageCenter={ConnectedMessageCenter}>
          <div style={{display: 'flex', justifyContent:'space-around'}}>
            <button onClick={() => dispatch({type: 'PUSH_MESSAGE', message:{id: `msg_${msgId++}`, type: 'info'}})}>Push</button>
            <button onClick={actions.expandHeader}>expandHeader</button>
            <button onClick={actions.unExpandHeader}>unExpandHeader</button>
            <button onClick={actions.injectBarContentLeftHeader}>injectBarContentLeftHeader</button>
            <button onClick={actions.injectBarContentRightHeader}>injectBarContentRightHeader</button>
            <button onClick={actions.injectBarContentSummaryHeader}>injectBarContentSummaryHeader</button>
            <button onClick={actions.injectBarContentExpandedHeader}>injectBarContentExpandedHeader</button>
            <button onClick={actions.triggerPosition}>triggerPosition</button>
            <button onClick={actions.clearTrigger}>cleartrigger</button>
          </div>
          <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: 300, width:'100%'}}>Hello</div>
          <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: 300, width:'100%'}}>Hello</div>
          <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: 300, width:'100%'}}>Hello</div>
          <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: 300, width:'100%'}}>Hello</div>
          <ConnectedLoadingBar/>
        </Layout>
        <Debug />
      </ConnectedScrollTrigger>
      </div>
      </RoleProvider>
    </Provider>
    ;
  }
}

export default App;
