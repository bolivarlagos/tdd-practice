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

    test('delete() should delete an object whit specific id', async () => {        

        const listDeleted = [
            {
                id: 1,
                description: 'Iphone X',
                price: 1500
            },
            {
                id: 2,
                description: 'Samsumg Galaxy 20',
                price: 1200
            }
        ]

        const response = await request(app).delete('/api/products/3')

        expect(response.body).toEqual(listDeleted)
    })
    test('delete() status code should be 201 if object was found', async () => {

        const response = await request(app).delete('/api/products/3')

        expect(response.status).toEqual(201)
    })

    test('delete() should throw error if id was not found', async () => {

        const response = await request(app).delete('/api/products/4')
        const message = JSON.parse(response.text)        

        expect(message).toEqual({ message: "Invalid ID" })
    })

    test('delete() status code should be 404', async () => {

        const response = await request(app).delete('/api/products/4')

        expect(response.status).toEqual(404)
    })
})

describe('Put routes', () => {
    
    test('put() should modify description', async () => {

        const toChange = {
            id: 1,
            description: 'Iphone X-2',
            price: 1500
        }

        const changedProducts = [
            {
                id: 1,
                description: 'Iphone X-2',
                price: 1500
            },
            {
                id: 2,
                description: 'Samsumg Galaxy 20',
                price: 1200
            },
            {
                id: 3,
                description: 'Macbook Pro',
                price: 2000
            }            
        ]
        
        const response = await request(app).put('/api/products/1').send(toChange)
        expect(response.body).toEqual(changedProducts)        
    })
    test('put() should return status code 201', async () => {
        const toChange = {
            id: 1,
            description: 'Iphone X-2',
            price: 1500
        }        

        const response = await request(app).put('/api/products/1').send(toChange)
        expect(response.status).toBe(201)
    })

    test('put() should display message', async () => {
        const toChange = {
            id: 1,
            price: 1500
        }

        const response = await request(app).put('/api/products/1').send(toChange)
        const message = JSON.parse(response.text)

        expect(message).toEqual({ message: "Must have id, price and description" })
    })

    test('put() status code should be 404', async () => {
        const toChange = {
            id: 1,
            price: 1500
        }

        const response = await request(app).put('/api/products/1').send(toChange)

        expect(response.status).toBe(404)
    })

})