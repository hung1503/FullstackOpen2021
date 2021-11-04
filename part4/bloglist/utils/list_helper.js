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

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}