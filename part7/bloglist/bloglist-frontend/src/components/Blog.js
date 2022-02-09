import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const Blog = () => {

  const blog = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const text = {
    textDecoration: 'none',
    color: 'black',
    fontStyle: 'italic'

  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  
  return (
    <div>
      <h2>Blogs</h2>
      <Table striped bordered hover>
        <tbody>
        {blog.sort(byLikes).map(blog =>
          (<tr key={blog.id} style={blogStyle} className='blog'>
            <td>
              <Link style={text} to={`/blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link> 
            </td>
          </tr>)
        )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blog