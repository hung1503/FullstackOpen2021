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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}