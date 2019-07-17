import React, { Component } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import HuePage from './components/huePage';
import InitPage from './components/initPage';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <InitPage />
        <HuePage />
      </ React.Fragment>
    );
  }
}

export default App;