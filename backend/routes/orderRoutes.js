import express from 'express'

import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,updateStatus,userOrders,verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/userAuth.js'

const orderRouter = express.Router()

//admin feautres
orderRouter.post('/list',adminAuth,allOrders)

orderRouter.post('/status',adminAuth,updateStatus)

//payment features

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//verify stripe
orderRouter.post('/verifyStripe',authUser,verifyStripe)

//user feature

orderRouter.post('/userorders',authUser,userOrders)


export default orderRouter