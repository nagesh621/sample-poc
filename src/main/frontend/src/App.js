import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WorkflowList from './WorkflowList';
import WorkflowEdit from "./WorkflowEdit";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/Workflow' exact={true} component={WorkflowList}/>
            <Route path='/Workflow/:id' component={WorkflowEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;