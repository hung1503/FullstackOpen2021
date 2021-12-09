import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [noti, setNoti] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setNoti({
          text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
          type: 'success'
        })
        setTimeout(() => {
          setNoti(null)
        }, 5000)
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch(() => {
        setNoti({
          text: `Blog can't be added`,
          type: 'error'
        })
        setTimeout(() => {
          setNoti(null)
        }, 5000)
      })
  }

  const addLike = (id, blogObject) => {

    blogService.update(id, blogObject)

    const blogToUpdate = {
      ...blogObject,
      id
    }
    setBlogs(blogs.map(blog => blog.id !== id ? blog : blogToUpdate))
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    const msg = `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`

    if (window.confirm(msg) === true) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setNoti({
            text: `blog ${blogToRemove.title} by ${blogToRemove.author} removed`,
            type: 'success'
          })
          setTimeout(() => {
            setNoti(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNoti({
        text:`wrong username or password`,
        type: 'error'
      })
      setTimeout(() => {
        setNoti(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={noti} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <h2>Create new</h2>
          {blogForm()}
          <h2>All blogs</h2>
          <ul>
            {blogs
              .sort((a, b) => a.likes - b.likes)
              .map((blog, i) =>
                <Blog
                  key={i}
                  blog={blog}
                  addLike={addLike}
                  removeBlog={removeBlog}
                  user={user}
                />
              )}
          </ul>
        </div>
      }

    </div>
  )
}

export default App