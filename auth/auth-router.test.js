const request = require('supertest')
const server = require('../api/server')

const db = require('../database/dbConfig')

describe('server', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })
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
            request(server).post('/api/auth/register')
                .then(res => {
                    expect(res.status).toBe(500)
                })
        })
        it('successfully adds a user to the db', async () => {
            await request(server).post('/api/auth/register')
                .send({ username: 'testing', password: 'elbow' })
                .then(res => {
                    expect(res.status).toBe(201)
                })

            const inserted = await db('users')
            expect(inserted).toHaveLength(1)
        })
    })
})