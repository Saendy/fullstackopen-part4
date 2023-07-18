const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.post('/api/users', async (request, response) => {
    const { username, name, password } = request.body
    if (password) {
        if (password.length < 4) {
            response.status(400).end()
        } else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)

            const user = new User({
                username,
                name,
                passwordHash,
            })

            const savedUser = await user.save()

            response.status(201).json(savedUser)
        }
    } else {
        response.status(400).end()
    }
})

blogRouter.get('/api/users', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.delete('/api/users/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.get('/api/users/:id', async (request, response) => {
    const blogs = await Blog.findById(request.params.id)
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
module.exports = blogRouter