const Blog = require('../models/blog')


module.exports = async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
}