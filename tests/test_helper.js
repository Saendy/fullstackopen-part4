const User = require('../models/user')

const initialBlogs = [
    {
        title: 'blog 1',
        author: 'author 1',
        url: 'url 1',
        likes: 6
    },
    {
        title: 'blog 2',
        author: 'author 2',
        url: 'url 2',
        likes: 3
    },
]


const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    initialBlogs, usersInDb
}