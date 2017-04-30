import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = { post: [] }
    this.fetchPost()
  }

  fetchPost = () => {
    fetch(`${process.env.API_URL}/api${this.props.match.url}`, {
      method: 'get',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => response.json())
    .then((json) => this.setState({ post: json }) )
  }

  render () {
    return (
      <div className="post-container">
        <div className="post">
          <h1>{this.state.post.title}</h1>
          <p>{this.state.post.body}</p>
        </div>
        <Link to="/">Go to posts</Link>
      </div>
    )
  }
}
