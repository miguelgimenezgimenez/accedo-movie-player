import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/pages/Home'
import History from './components/pages/History'

export default (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/history" exact component={History} />
  </Switch>
)
