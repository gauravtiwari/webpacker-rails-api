import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = { posts: [] }
    this.fetchPosts()
  }

  fetchPosts = () => {
    fetch('http://localhost:5000/api/posts', {
      method: 'get',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => response.json())
    .then((json) => this.setState({ posts: json }) )
  }

  render () {
    return (
      <div className="posts">
        {this.state.posts.map((post) => {
          return (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <div className="post">
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </Link>
          )
        })
        }
      </div>
    )
  }
}
