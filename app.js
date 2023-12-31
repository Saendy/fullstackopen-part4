const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const errorHandler = require('./middleware/errorHandler')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const tokenExtractor = require('./middleware/tokenExtractor')
const userExtractor = require('./middleware/userExtractor')


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app