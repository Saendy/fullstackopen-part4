const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const newBlog = require('./controllers/new_blog')
const deleteBlog = require('./controllers/delete_blog')
const updateBlog = require('./controllers/update_blog')
const allBlogs = require('./controllers/all_blogs')
const config = require('./utils/config')
const errorHandler = require('./utils/middleware')


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', allBlogs)

app.post('/api/blogs', newBlog)

app.delete('/api/blogs/:id', deleteBlog)

app.put('/api/blogs/:id', updateBlog)

app.use(errorHandler)

module.exports = app