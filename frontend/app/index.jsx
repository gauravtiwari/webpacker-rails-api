import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'

import App from '../layouts'
const history = createBrowserHistory()

render((
  <Router history={history}>
    <Route path='/' component={App} />
  </Router>
), document.getElementById('app'))

if (module.hot) {
  module.hot.accept('../layouts', () => {
    const NextApp = require('../layouts').default
    render((
      <Router history={history}>
        <Route path='/' component={NextApp} />
      </Router>
    ), document.getElementById('app'))
  })
}
