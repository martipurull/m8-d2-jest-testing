import mongoose from 'mongoose'
import { ProductSchema } from './schema'

export const ProductModel = mongoose.model("products", ProductSchema)