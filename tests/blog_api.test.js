const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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

beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()
})



test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)

})
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('blog 2')
})

test('check blogs have an id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('adding a new blog is successful', async () => {
    const newBlog = {
        title: 'blog 3',
        author: 'author 3',
        url: 'url 3',
        likes: 6
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('blog 3')
})

test('add a blog with no likes specified defaults to 0', async () => {
    const newBlog = {
        title: 'blog 3',
        author: 'author 3',
        url: 'url 3'
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)

    expect(response.body.likes).toBe(0)
})

test('creating a blog with no title returns status code 400', async () => {
    const newBlog = {
        author: 'author 3',
        url: 'url 3'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('creating a blog with no url returns status code 400', async () => {
    const newBlog = {
        author: 'author 3',
        title: 'title 3'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})



afterAll(async () => {
    await mongoose.connection.close()
})