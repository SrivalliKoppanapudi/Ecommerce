import express from 'express'
import { addToCart,updateCart,getCart } from '../controllers/cartController.js'
import authUser from '../middleware/userAuth.js'

const cartRouter=express.Router() //router is interface

cartRouter.post('/get',authUser,getCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter