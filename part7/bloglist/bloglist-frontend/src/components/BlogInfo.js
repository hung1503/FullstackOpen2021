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
            <p>author:{blogInfo.author}</p>
            <a href={blogInfo.url}>URL: {blogInfo.url}</a>
            <p>{blogInfo.likes} likes <button onClick={()=>handleLike(blog)}>like</button></p>
            <p>added by {blogInfo.user.name}</p>
            {own&&<button onClick={()=>handleRemove(blog)}>remove</button>}
        </div>
    )
}

export default BlogInfo