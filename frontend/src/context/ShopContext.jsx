import { createContext, useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
export const ShopContext=createContext();
import axios from 'axios'

const ShopContextProvider=(props)=>{
    const currency = '$'
    const deliveryFee=10
    const [search,setSearch]=useState('')
    const [showSearch,setShowSearch]=useState(false)
    const [cartItems,setCartItems]=useState({})
    //{ [itemId]: { [size]: quantity } }---cartItems
    const navigate = useNavigate()
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    
    const [products,setProducts]=useState([])

    const [token,setToken]=useState('')

    const addToCart=async (itemId,size)=>{
        if(!size){
            toast.error('Select product size')
            return;
        }
        if(!token){
            toast.error('Please login to add tems to cart')
            return;
        }

        let cartData=structuredClone(cartItems)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        setCartItems(cartData)
        toast.success("Product added to cart successfully")
        if(token){
            try{
              //  await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
              const response = await axios.post(backendUrl+'/api/cart/add',{itemId,size}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(response)
            }
            catch(error){
            
                console.log(error)
                toast.error(error.message)
            }
        }
        
        //navigate('/cart')
    }

 /*    useEffect(()=>{
        console.log(cartItems)
    },[cartItems]) */


    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                         totalCount+=cartItems[items][item]
                    }
                }
                catch(error){

                }
            }
               
        }
        return totalCount
    }


    const updateQuantity = async (itemId, size, quantity) => {
        // Update cart items locally
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    
        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Ensure token is included
                        },
                    }
                );
    
                console.log("Item ID, Size, Quantity:", itemId, size, quantity);
                console.log("Response:", response);
    
                if (response.data.success) {
                    console.log("Cart updated successfully.");
                } else {
                    console.error("Error updating cart:", response.data.message);
                    toast.error(response.data.message || "Failed to update the cart.");
                }
            } catch (error) {
                console.error("Error during API call:", error);
                toast.error(error.message || "An error occurred while updating the cart.");
            }
        } else {
            toast.error("User is not authenticated.");
            console.error("Token is missing.");
        }
    };
    

    const getCartAmount=()=>{
        let totalAmount=0
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items)
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price*cartItems[items][item]
                    }
                }
                catch(error){}
            }
            
        }
        return totalAmount
    }

    const getProductsData= async()=>{
        try{
            const response= await axios.get( backendUrl +'/api/product/list')
             console.log("ddshb")
            console.log(response.data.products) 
             if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            } 

        }
        catch(error){
            console.log(error)
            toast.error(error.message)

        }
    }
     
    useEffect(()=>{
       getProductsData()
       console.log(backendUrl) 
    },[])



    useEffect(()=>{
        if(!token && localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            console.log("token set")
            //getUserCart(localStorage.getItem("token"))
        }
    },[])
    useEffect(() => {
        if (token) {
            getUserCart(token); // Fetch cart when token updates
        }
    }, [token]); // Runs whenever token changes

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            if (response.data && response.data.success) {
                setCartItems(response.data.cartData); // Set the cart data properly
                console.log(response.data.cartData);
                console.log("cart set")
            } else {
                toast.error(response.data?.message || "Failed to fetch cart data."); // Handle error message
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred while fetching the cart data.");
        }
    };
    

    const value={
        products,currency,deliveryFee,search,setSearch,showSearch,setShowSearch,cartItems,addToCart,setCartItems,
        getCartCount,updateQuantity,getCartAmount,navigate,backendUrl,token,setToken,getUserCart
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider