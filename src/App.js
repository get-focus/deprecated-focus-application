import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './layout';
import reducer, {totalsSelector} from './fetch/reducer';
import LoadingBarComponent from './fetch/component';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import createfocusFetchProxy from './fetch/fetch-proxy';
const store = createStore(reducer);
const ConnectedLoadingBar = connect(totalsSelector)(LoadingBarComponent);
const fetch = createfocusFetchProxy(store.dispatch);

class App extends Component {
  componentWillMount(){
    fetch('http://localhost:8888/err')
    .then(d => console.log('d', d))
    .catch(e => console.log('e', e));
    fetch('http://localhost:8888/wait')
    .then(d => console.log('d', d))
    .catch(e => console.log('e', e));
    fetch('http://localhost:8888/ok')
    .then(d => console.log('d', d))
    .catch(e => console.log('e', e));
  }
  render() {
    return <Provider store={store}><Layout >
      <ConnectedLoadingBar/>
    </Layout></Provider>
    ;
  }
}

export default App;
