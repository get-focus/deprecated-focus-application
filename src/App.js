import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './layout';
import fetch from './fetch'
import reducer from './fetch/reducer';
class App extends Component {
  componentWillMount(){
    fetch('http://localhost:3000/sockjs-nodesss/info?t=1472751685367')
    .then(d => console.log('d', d))
    .catch(e => console.log('e', e));
  }
  render() {
    return <Layout ></Layout>
    ;
  }
}

export default App;
