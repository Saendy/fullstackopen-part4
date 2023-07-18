const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/api/users', async (request, response) => {
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

usersRouter.get('/api/users', async (request, response) => {
    const users = await User.find({})
        .populate('blogs')
    response.json(users)
})

usersRouter.delete('/api/users/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
}
)

module.exports = usersRouter