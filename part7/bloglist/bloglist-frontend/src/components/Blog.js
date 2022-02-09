import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, own }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(likeBlog(updatedBlog))
  }

  const handleRemove = (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <Link to={`/blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link> 
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog