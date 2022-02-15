import express from 'express'
import productRouter from './products'

const server = express()

server.use(express.json())

server.get('/test', async (req, res) => {
    res.send({ message: 'Test success!' })
})

server.use('/products', productRouter)

export { server }