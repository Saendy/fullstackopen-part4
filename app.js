const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const newBlog = require('./controllers/new_blog')
const deleteBlog = require('./controllers/delete_blog')
const updateBlog = require('./controllers/update_blog')
const allBlogs = require('./controllers/all_blogs')
const getBlog = require('./controllers/get_blog')
const config = require('./utils/config')
const errorHandler = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(blogsRouter)
app.use(usersRouter)

app.use(errorHandler)

module.exports = app