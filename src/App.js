import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './layout';
import fetch from './fetch'
import reducer from './fetch/reducer';
import LoadingBarComponent from './fetch/component';
class App extends Component {
  componentWillMount(){
    fetch('http://localhost:3000/sockjs-nodesss/info?t=1472751685367')
    .then(d => console.log('d', d))
    .catch(e => console.log('e', e));
  }
  render() {
    return <Layout >
      <LoadingBarComponent pending={5} total={10} />
    </Layout>
    ;
  }
}

export default App;
