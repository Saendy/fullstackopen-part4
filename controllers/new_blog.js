const Blog = require('../models/blog')

module.exports = async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
}
