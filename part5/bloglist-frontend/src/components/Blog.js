import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const blogObject = {
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    setUsername(blog.user?.username || username)
    addLike(blog.id ,blogObject)
  }

  return (
    <div style={blogStyle} className={blog}>
      <div style={hideWhenVisible} className="hiddenByDefault">
        <p>{blog.title} - {blog.author}
          <button onClick={toggleVisibility}>View</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>Title: {blog.title}
          <button onClick={toggleVisibility}>Hide</button>
        </p>
        <p>Author: {blog.author}</p>
        <p>Likes: {blog.likes}
          <button onClick={handleLike}>Like</button>
        </p>
        {(user.username === blog.user?.username ||
          user.username === username) &&
          <button onClick={() => removeBlog(blog.id)}>Remove</button>
        }
      </div>
    </div>
  )}

Blog.protoTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog