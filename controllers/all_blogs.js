const Blog = require('../models/blog')


module.exports = async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
}