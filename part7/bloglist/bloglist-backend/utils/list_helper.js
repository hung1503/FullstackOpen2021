const _ = require('lodash')

const dummy = (blogs) => {
    
    return blogs.length === 0
    ? 1
    : blogs.reduce(blogs.length, 0) / blogs.length
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((total, currentValue) => {
        return total + currentValue.likes
      }, 0)
    return total
    }

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((favorite, currentValue) => {
        return favorite.likes > currentValue.likes
        ? favorite
        : currentValue
    }, blogs[0])

    const result = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    return result
}

const authors = (blog) => blog.author

const mostBlogs = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, authors)
    const blogsByAuthors = _.mapValues(groupedBlogs, (e) => e.length)
    const mostBlogs = Object.entries(blogsByAuthors).reduce((a, b) => a[1] > b[1] ? a : b)

    const result = {
        author: mostBlogs[0],
        blogs: mostBlogs[1]
    }
    return result
}

const mostLikes = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, authors)
    const blogsByLikes = _.mapValues(groupedBlogs, totalLikes)
    const mostLikedAuthor = Object.entries(blogsByLikes).reduce((a, b) => a[1] > b[1] ? a : b)
    const result = {
        author: mostLikedAuthor[0],
        likes: mostLikedAuthor[1]
    }
    
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}