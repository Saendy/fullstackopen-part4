const Blog = require('../models/blog')

module.exports = async (request, response) => {
    const blog = {
        title: request.body.title,
        url: request.body.url,
        author: request.body.author,
        likes: request.body.likes
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    response.status(201).json(result)
}
