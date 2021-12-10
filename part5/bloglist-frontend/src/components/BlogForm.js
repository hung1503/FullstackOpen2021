import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className="formDiv">
        <h2>Create a new blog</h2>
        <form onSubmit={addBlog}>
            <div>
            title
            <input className="title" id="title" value={title} onChange={({ target }) => setTitle(target.value)}/>
            </div>
            <div>
            author
            <input className="author" id="author" value={author} onChange={({ target }) => setAuthor(target.value)}/>
            </div>
            <div>
            url
            <input id="url" value={url} onChange={({ target }) => setUrl(target.value)}/>
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default BlogForm