import React from 'react'
import Router from '../router'

export default (props) => (
  <div>
    <p>this is header</p>
    <Router {...props} />
    <p>this is footer</p>
  </div>
)
