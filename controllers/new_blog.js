const Blog = require('../models/blog')
const User = require('../models/user')

module.exports = async (request, response) => {

    const user = await User.findById(request.body.userId)

    const blog = new Blog({
        title: request.body.title,
        url: request.body.url,
        likes: request.body.likes,
        author: request.body.author,
        user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()


    response.status(201).json(savedBlog)



}
