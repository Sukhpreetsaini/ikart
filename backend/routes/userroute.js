import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
const router = express.Router()
router.get('/login',asyncHandler( async (req,res) => {
    const user = await User.find({})
    res.json(user);
}))
router.get('/login/:id',asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id)
    res.json(user);
}))
router.post('/register',asyncHandler( async (req,res) => {
    const {name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
      })
      
}))

export default router