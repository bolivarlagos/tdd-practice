const request = require('supertest')
const app = require('../app')
const { products } = require('../utils/utils')

describe('Get routes', () => {

    test('app should be a function', () => {
        expect(app).toBeInstanceOf(Function)
    })
    
    test('get(/) should return { message: "Home Page"}', async () => {
        
        const response = await request(app).get('/')
        const message = { message: 'Home Page'}
    
        expect(response.body).toEqual(message)
    })
    
    test(`get(/api/products) should return all products` , async () => {
        
        const response = await request(app).get('/api/products') 
        expect(response.body).toEqual(products)
    })
    
    test(`get(/api/products) status code should be 201` , async () => {
        
        const response = await request(app).get('/api/products') 
        expect(response.status).toBe(201)
    })
    
    test(`get(/api/products/id) should return a single product` , async () => {
        
        const response = await request(app).get('/api/products/1')     
        expect(response.body).toEqual(products[0])
    })
    
    test(`get(/api/products/id) status code should be 201` , async () => {
        
        const response = await request(app).get('/api/products/1')     
        expect(response.status).toBe(201)
    })
    
    test(`get(/api/products/id) inexistent id should return a message` , async () => {
        
        const response = await request(app).get('/api/products/4')     
        expect(response.body).toEqual({ message: "Unknow ID" })
    })
    
    test(`get(/api/products/id) inexistent id status code should be 404` , async () => {
        
        const response = await request(app).get('/api/products/4')     
        expect(response.status).toBe(404)
    })
})    

describe('Post routes', () => {    
    
    test('post(/) should add an object to the array', async () => {
        
        const newProd = {
            id: 4,
            description: 'Lenovo Ideapad',
            price: 1100
        }

        const allProds = [...products, newProd]

        const response = await request(app).post('/api/products/post').send(newProd)
        
        expect(response.body).toEqual(allProds)
    })

    test('post(/) status code should be 201 ', async () => {
        
        const newProd = {
            id: 4,
            description: 'Lenovo Ideapad',
            price: 1100
        }

        const response = await request(app).post('/api/products/post').send(newProd)
        
        expect(response.status).toBe(201)
    })
    test('post(/) must have object with length 3 ', async () => {
        
        const newProd = {
            description: 'Lenovo Ideapad',
            price: 1100
        }

        const response = await request(app).post('/api/products/post').send(newProd)
        
        expect(response.status).toBe(404)
    })
    test('post(/) should throw an error ', async () => {
        
        const newProd = {
            banan: 5,
            description: 'Lenovo Ideapad',
            price: 1100
        }

        const response = await request(app).post('/api/products/post').send(newProd)
        const message = await JSON.parse(response.text)

        expect(message).toEqual({ message: "Must have id, price and description" })
    })
})

describe('Delete routes', () => {

    test('')
})