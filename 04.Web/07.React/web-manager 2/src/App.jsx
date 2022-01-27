import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/home' component={Home}></Route>
          <Redirect to="/login"/>
        </Switch>
      </Fragment>
    )
  }
}