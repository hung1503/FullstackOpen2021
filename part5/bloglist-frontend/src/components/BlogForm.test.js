import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
  
    const component = render(
      <BlogForm createBlog={createBlog} />
    )
  
    const inputTitle = component.container.querySelector('.title')
    const inputAuthor = component.container.querySelector('.author')
    const form = component.container.querySelector('form')
  
    fireEvent.change(inputTitle, { 
      target: { value: 'testing of forms could be easier' } 
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'test author' }
    })
    fireEvent.submit(form)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
  })