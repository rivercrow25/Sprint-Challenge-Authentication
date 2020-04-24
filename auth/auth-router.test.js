const request = require('supertest')
const server = require('./auth-router')
const first = require('../api/server')

const db = require('../database/dbConfig')

describe('server', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })
    describe('get /api/jokes', () => {

        it('fails', () => {
            return request(first).get('/')
                .then(res => {
                    expect(res.status).toBe(404)
                })
        })
    })
    describe('post /register', () => {
        it('fails when no info give', async () => {

            request(server).post('/register')
                .then(res => {
                    expect(res.status).toBe(500)
                })
            const existing = await db('users')
            return expect(existing).toHaveLength(0)
        })
    })
})