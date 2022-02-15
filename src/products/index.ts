import express from 'express'
import { ProductModel } from './model'

const productRouter = express.Router()

productRouter
    .post('/', async (req, res) => {
        try {
            if (!req.body.name || !req.body.price) {
                return res.status(400).send()
            } else {
                const newProduct = await new ProductModel(req.body)
                await newProduct.save()
                res.send(newProduct)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    })
    .get('/:productId', async (req, res) => {
        const product = await ProductModel.findById(req.params.productId)
        product ? res.send(product) : res.status(404).send()
    })
// .put('/:productId', async (req, res) => {
//     const editedProduct = await ProductModel.findByIdAndUpdate(req.params.productId)
// })

export default productRouter