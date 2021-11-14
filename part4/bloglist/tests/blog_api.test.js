const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('There are some initially blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('the first blog is about how to say hello', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('React patterns')
  })

  test ('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const processedBlog = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlog)
  })

  test('A blog post should have id not _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})



describe('New blog is added', () => {
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'jane', passwordHash })

    await user.save()

    // Login user to get token
    await api
      .post('/api/login')
      .send({ username: 'jane', password: 'password' })
      .then((res) => {
        return (token = res.body.token)
      })

    return token
  })  

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await testing',
      author: 'Hung Nguyen',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      likes: 10,
    }
     
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
      const title = blogsAtEnd.map(r => r.title)
      expect(title).toContain('async/await testing')
  })
  
  test ('blog without likes is a valid blog', async () => {
    const newBlog = {
      title: 'Helen',
      author: 'Hawfafung ofawijo',
      url: 'https://www.youtube.com',
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })
  
  test ('blog without title and url is not added', async () => {
    const newBlog = {
      author: "Hung Nguyen",
      likes: 10,
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})




describe('Deleting a blog', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'jane', passwordHash })

    await user.save()

    // Login user to get token
    await api
      .post('/api/login')
      .send({ username: 'jane', password: 'password' })
      .then((res) => {
        return (token = res.body.token)
      })

      const newBlog = {
        title: 'Hi',
        author: 'Me',
        url: 'idk',
      }
  
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      return token
  })
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(0)
  })  

  test('adding a blog fails if token is not provided', async () => {
    

  })
})


describe('updated blog', () => {
  test('updated likes for a blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
  
    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 4
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  
    expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes)
  })  
})

afterAll(() => {
  mongoose.connection.close()
})