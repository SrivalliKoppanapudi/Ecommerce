
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

import Stripe from 'stripe' 

//global var
const currency = 'inr'
const deliveryCharge=10


/* gate way initialize */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing orders using cash on delivery

const placeOrder = async(req,res)=>{

    try{

        const {items,userId,amount,address}=req.body

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"cod",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})//cart data will reset

        res.json({success:true,message:"Order placed "})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }

}



//place order stripe
const placeOrderStripe = async(req,res)=>{

    try{
        const {items,userId,amount,address}=req.body
        const {origin} = req.headers
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"stripe",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        const resp = await newOrder.save()
        console.log(resp)
        console.log(newOrder)
        const  line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100 ,

            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:deliveryCharge*100 ,

            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            success_url :`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url :`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:"payment",
        })
        console.log(session.url)
        res.json({success:true,session_url:session.url})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
    
    
}

//verify stripe

const verifyStripe = async (req,res)=>{

    const {orderId,userId,success}=req.body

    try {
        
        if(success===true){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//place order razor pay

const placeOrderRazorpay = async(req,res)=>{



    
}


//all orders data for admin panel

const allOrders = async(req,res)=>{

    try{
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        

    }

    
}


//orders for my orders page

const userOrders = async(req,res)=>{

    try{
        const {userId} = req.body

        const orders = await orderModel.find({userId})
        res.json({success:true,orders})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        

    }
    
}

//update order status from admin panel

const updateStatus = async(req,res)=>{

    try{

        const {orderId,status}=req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Order Updated"})

    }

    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        

    }
}



export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,updateStatus,userOrders,verifyStripe}