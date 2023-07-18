const Blog = require('../models/blog')

module.exports = async (request, response) => {





    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
}
