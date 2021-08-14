import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/product.js'
const router = express.Router()
router.get('/',asyncHandler( async (req,res) => {
    const product = await Product.find({})
    res.json(product);
}))
router.get('/:id', asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
}))
router.delete('/:id',asyncHandler(async(req,res) => {
    await Product.findByIdAndRemove(req.params.id);
}))
router.put('/:id',asyncHandler(async(req,res) => {
    const {name, price, image,brand,category,description,countInStock } = req.body;
    await Product.findByIdAndUpdate(req.params.id,{
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
}))
router.post('/upload',asyncHandler( async (req,res) => {
    const {name, price, image,brand,category,description,countInStock } = req.body;
    const product = await Product.create({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })     
}))
router.put('/change/:id',asyncHandler( async (req,res) => {
    const {countInStock} = req.body;
    await Product.findByIdAndUpdate(req.params.id,{
        countInStock,
      })     
}))

export default router