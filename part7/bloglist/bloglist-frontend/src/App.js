import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import User from './components/User'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'

import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { noti } from './reducers/notificationReducer'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { getAllUsers } from './reducers/userReducer'

import { Switch,  Route,  Link,  useRouteMatch } from 'react-router-dom'
import { Table, Form, Button, Navbar, Nav, Container } from 'react-bootstrap'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()
  
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
 

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const matchUser = useRouteMatch('/users/:id')
  const userInfo = matchUser
  ? users.find(user => user.id === matchUser.params.id)
  : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogInfo = matchBlog
  ? blog.find(blog => blog.id === matchBlog.params.id)
  : null

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
      dispatch(noti(`${user.name} welcome back!`, 5000, 'success'))
    } catch(exception) {
      dispatch(noti('wrong username/password', 5000, 'danger'))
    }
  }

  const handleLogout = () => {
      window.localStorage.removeItem('loggedNoteappUser')
      setUser(null)
    }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blog))
      dispatch(noti(`a new blog '${blog.title}' by ${blog.author} added!`, 5000, 'success'))
    } catch(exception) {
      console.log(exception)
      dispatch(noti('something went wrong', 5000, 'danger'))
    }
  }
 
  if ( !user ) {
    return (
      <div>
        <h2>Login to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button id="login" variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
  const text = {
    textDecoration: 'none',
    color: 'black'
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Navbar collapseOnSelect bg="light" variant="light">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand  >
            <Link style={text} to="/">Blogs</Link>
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link  as="span">
                <Link style={text} to="/">Home</Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link style={text} to="/blogs">Blogs</Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link style={text} to="/users">Users</Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link style={text} to="/create">Create New</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </Container>
      </Navbar>

      <Notification />

      <Switch>
        <Route path="/users/:id">
          <UserInfo userInfo={userInfo} />
        </Route>
        <Route path="/users">
          <User />
        </Route>
        <Route path="/create">
          <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
        </Route>
        <Route path="/blogs/:id">
          <BlogInfo blogInfo={blogInfo}/>
        </Route>
        <Route path="/blogs">
          <Blog />
        </Route>
      </Switch>
      
    </div>
  )
}

export default App