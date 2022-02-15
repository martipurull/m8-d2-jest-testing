import { server } from './server'
import mongoose from 'mongoose'

const port = process.env.PORT || 3001

mongoose.connect(<string>process.env.MONGO_CONNECTION + '/prod', () => {
    console.log('Connected to Mongo!')
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})