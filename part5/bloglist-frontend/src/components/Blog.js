import React from 'react'
const Blog = ({blog}) => (
  <div>
    <p>- Title: {blog.title} / Author: {blog.author} / Likes: {blog.likes}</p>
  </div>  
)

export default Blog