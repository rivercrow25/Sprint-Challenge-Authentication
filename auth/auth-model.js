const db = require('../database/dbConfig')

module.exports = {
    add,
    find,
    findby,
    findbyid,
}

function find() {
    return db('users').select('id', 'username')
}

function findby(filter) {
    return db('users').where(filter)
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id')

    return findbyid(id)
}

function findbyid(id) {
    return db('users')
        .where({ id })
        .first()
}