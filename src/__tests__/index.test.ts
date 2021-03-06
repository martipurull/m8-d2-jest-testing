import { server } from '../server'
import supertest from 'supertest'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const request = supertest(server)

describe('Checking out jest in typscript', () => {
    it('should test that true is true', () => {
        expect(true).toBe(true)
    })
    test('that false is not true', () => {
        expect(false).not.toBe(true)
    })
})

describe('Tests all endpoints in the server', () => {

    beforeAll(done => {
        try {
            mongoose.connect(process.env.MONGO_CONNECTION_JEST_TEST, () => {
                console.log('Connected to Mongo')
                done()
            })
            mongoose.connection.on('error', (err) => console.log(err))

        } catch (error) {
            console.error(error)
        }
    })

    afterAll(done => {
        mongoose.connection.close().then(() => done())
    })

    test('that the test endpoint returns a success message', async () => {
        const response = await request.get('/test')
        expect(response.body.message).toBe('Test success!')
    })

    const validProduct = {
        name: 'Valid Test Product',
        price: 100
    }

    const invalidProduct = {
        name: 'Invalid Test Product'
    }

    test('that the POST /products route does not work with the wrong data', async () => {
        const response = await request.post('/products').send(invalidProduct)
        expect(response.status).toBe(400)
    })

    let createdProductId = ''

    test('that the POST /products route actually creates a product', async () => {
        const response = await request.post('/products').send(validProduct)
        expect(response.body._id).toBeDefined()
        createdProductId = response.body._id
    })

    test('that GET /products/:productId returns 404 on a non-existing product', async () => {
        const response = await request.get('/products/123456789123456789123456')
        expect(response.status).toBe(404)
    })

    test('that GET /products/:productId returns the correct product', async () => {
        const response = await request.get(`/products/${createdProductId}`)
        expect(response.body._id).toBeDefined()
    })

    test('that DELETE /products/:productId deletes the product', async () => {
        const response = await request.delete(`/products/${createdProductId}`)
        expect(response.status).toBe(204)
    })

    test('that DELETE /products/:productId returns 404 on a non-existing product', async () => {
        const response = await request.delete('/products/123456789123456789123456')
        expect(response.status).toBe(404)
    })

    test('that PUT /products/:productId requests are accepted', async () => {
        const response = await request.put(`/products/${createdProductId}`)
        expect(response.status).toBe(200)
    })

    test('that PUT /products/:productId returns 404 on a non-existing product', async () => {
        const response = await request.put('/products/123456789123456789123456')
        expect(response.status).toBe(404)
    })

    test('that PUT /products/:productId changes the name of the product', async () => {
        const response = await request.put(`/products/${createdProductId}`)
        expect(response.body.name).not.toBe(validProduct.name)
    })

    test('that PUT /products/:productId returns a name of type string', async () => {
        const response = await request.put(`/products/${createdProductId}`)
        expect(typeof response.body.name).toBeInstanceOf(String)
    })
})