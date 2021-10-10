const request = require('supertest')
const app = require('../app')

test('app should be a function', () => {
    expect(app).toBeInstanceOf(Function)
})