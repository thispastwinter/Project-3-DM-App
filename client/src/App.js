import React, { Component } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import LoginPage from './Pages/loginPage';
import HuePage from './Pages/huePage';
import InitPage from './Pages/initPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from "./components/navTabs";

class App extends Component {
  state = {
    gameId: 1
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavTabs />
          <Switch>
            <Route exact path="/" render={() => <InitPage gameId={this.state.gameId} />} />
            <Route exact path="/hue" component={HuePage} />
            <Route exact path='/login' component={LoginPage} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;