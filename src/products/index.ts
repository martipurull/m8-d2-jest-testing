import express from 'express'
import { ProductModel } from './model'

const productRouter = express.Router()

productRouter
    .post('/', async (req, res) => {
        try {
            if (!req.body.name || !req.body.price) {
                return res.status(400).send()
            } else {
                const newProduct = new ProductModel(req.body)
                await newProduct.save()
                res.send(newProduct)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    })

export default productRouter