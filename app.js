const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
//const blogController = require('./controllers/blogs')
const config = require('./utils/config')
const errorHandler = require('./utils/middleware')
const Blog = require('./models/blog')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    //try {
    const result = await blog.save()
    response.status(201).json(result)
    // } catch (exception) {
    //      response.status(400).end()
    // }
})

app.use(errorHandler)

module.exports = app