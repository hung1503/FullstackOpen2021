import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    console.log('blogReducer', action)
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_BLOG':
            return [...state, action.data]
        case 'LIKE_BLOG':
            const id = action.data
            const blog = state.find(blog => blog.id === id)
            const updatedBlog = { ...blog, likes: blog.likes + 1 }
            return state.map(blog => blog.id === id ? updatedBlog : blog)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        default: 
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE_BLOG',
            data: newBlog
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        await blogService.update(blog)
        dispatch({
            type: 'LIKE_BLOG',
            data: blog.id
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export default blogReducer
