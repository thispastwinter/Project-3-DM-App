import React, { Component } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import HuePage from './Pages/huePage';
import InitPage from './Pages/initPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from "./components/navTabs";

class App extends Component {

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavTabs />
          <Switch>
            <Route exact path="/" component={InitPage} />
            <Route exact path="/hue" component={HuePage} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;