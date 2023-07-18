const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const newBlog = require('./controllers/new_blog')
const allBlogs = require('./controllers/all_blogs')
const config = require('./utils/config')
const errorHandler = require('./utils/middleware')


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', allBlogs)

app.post('/api/blogs', newBlog)

app.use(errorHandler)

module.exports = app