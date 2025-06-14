import userModel from "../models/userModel.js"
import validator from 'validator'
import bcyrpt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//route for user login
const loginUser=async (req,res)=>{

    const {email,password}=req.body
    try{
        
    const user= await userModel.findOne({email})
    if(!user){
        return res.json({success:false,message:"User does not exists"})
    }

    const isMatch=await bcyrpt.compare(password,user.password)
    if(!isMatch){
        return res.json({success:false,message:"Incorrect password"})
    }
    else{
        const token=createToken(user._id)
        res.json({success:true,token})
    }
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//route for register user

const registerUser= async (req,res)=>{
   //res.json({msg:"Register API working"})
   //res.send("registerdfhbref")
   try{

    const {name,email,password}=req.body

    //chechking user already exists or not
    const exists = await userModel.findOne({email})
    if(exists){
        return res.json({success:false,message:"User already exists"})
    }

    //validating email fromat and strong pwd
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid email"})
    }
    if(password.length<8){
        return res.json({success:false,message:"Please enter a strong password"})
    }

    //store hashed pwd in db
    const salt = await bcyrpt.genSalt(10)//provide 10-15 range otherwiase it takes more time
    const hashedPwd=await bcyrpt.hash(password,salt)

    //creat user

    const newUser=new userModel({
        name,
        email,
        password:hashedPwd
    })

    const user = await newUser.save()

    //creating tokens for users
    //when a user is created an _id is generated using this id we create token

    const token=createToken(user._id)

    res.json({success:true,token})



   }
   catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
    
   }

}

//route for admin login
const adminLogin = async (req,res)=>{
    try{
        const {email,password}=req.body
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})
    }
    else{
        res.json({success:false,message:"Invalid Credentials"})
    }
    }
    catch(error){
        res.json({success:false,message:error.message})
    }

}

export {loginUser,registerUser,adminLogin}