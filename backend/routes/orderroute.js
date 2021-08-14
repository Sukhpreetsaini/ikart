import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/order.js'
const router = express.Router()

router.get('/',asyncHandler( async (req,res) => {
    const product = await Order.find({})
    res.json(product);
}))
router.get('/get/:id', asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
}))
router.post('/add',asyncHandler( async (req,res) => {
    const {userid, productid, productqty, address, amountpaid, isdelivered } = req.body;
    const order = await Order.create({
        userid,
        productid,
        productqty,
        address,
        amountpaid,
        isdelivered,
      })  
}))
router.put('/deliver/:id',asyncHandler( async (req,res) => {
    const {isdelivered } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id,{
        isdelivered,
      })
}))
router.put('/cancel/:id',asyncHandler( async (req,res) => {
    const {cancel, } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id,{
        cancel,
      })
}))
router.delete('/:id',asyncHandler( async (req,res) => {
    await Order.findByIdAndRemove(req.params.id);
}))

export default router