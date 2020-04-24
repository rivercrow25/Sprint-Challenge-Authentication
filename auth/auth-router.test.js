const request = require('supertest')
const server = require('../api/server')

const db = require('../database/dbConfig')

describe('server', () => {
    describe('get /api/jokes', () => {

        it('fails', () => {
            return request(server).get('/')
                .then(res => {
                    expect(res.status).toBe(404)
                })
        })
    })
    describe('post /register', () => {
        it('fails when no info give', async () => {
            await db('users').truncate()
            request(server).post('/api/auth/register')
                .then(res => {
                    expect(res.status).toBe(500)
                })
        })
        it('successfully adds a user to the db', async () => {

            await request(server).post('/api/auth/register')
                .send({ username: 'user', password: 'elbow' })
                .then(res => {
                    expect(res.status).toBe(201)
                })

            const inserted = await db('users')
            expect(inserted).toHaveLength(1)
        })
    })

    describe('post /login', () => {

        it('sends back 200 on log in', async () => {
            await request(server).post('/api/auth/login')
                .send({ username: 'user', password: 'elbow' })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('sends back a token', async () => {
            await request(server).post('/api/auth/login')
                .send({ username: 'user', password: 'elbow' })
                .then(res => {
                    expect(res.body.payload).toBeTruthy()
                })
        })
    })
})