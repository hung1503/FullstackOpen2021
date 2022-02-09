import React from "react"
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogInfo = ({ blogInfo, own }) => {
    if(!blogInfo) return <p>No info</p>
    const dispatch = useDispatch()

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
        <div>
            <h2>{blogInfo.title}</h2>
            <ul>
              <li>author:{blogInfo.author}</li>
              <li><a href={blogInfo.url}>URL: {blogInfo.url}</a></li>
              <li>{blogInfo.likes} likes <button onClick={()=>handleLike(blogInfo)}>like</button></li>
              <li>added by {blogInfo.user.name}</li>
              {own&&<button onClick={()=>handleRemove(blogInfo)}>remove</button>}
            </ul>
            
        </div>
    )
}

export default BlogInfo