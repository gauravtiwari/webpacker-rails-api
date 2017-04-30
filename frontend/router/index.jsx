import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Posts from '../posts/index'
import Post from '../posts/show'

export default (props) => {
  return (
    <div>
      <Switch>
        <Route path='/' component={Posts} exact />
        <Route path='/posts/:id' component={Post} />
      </Switch>
    </div>
  )
}
