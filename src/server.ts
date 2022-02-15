import express from 'express'

const server = express()

server.use(express.json())

server.get('/test', async (req, res) => {
    res.send({ message: 'Test success!' })
})

export { server }