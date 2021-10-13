import React, { Component } from 'react';
import './App.css';

import Login from "./Login";
import Dashboard from "./Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
 
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/workflow">
          <Dashboard />
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect exact from="/" to="workflow" />
        </Route>
        <Route path="*">
          <Redirect from="/" to="workflow" />
        </Route>
      </Switch>
    </Router>
  );
}