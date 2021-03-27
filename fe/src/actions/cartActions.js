import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_ADDRESS,CART_SAVE_METHOD } from "../constants/cartConstant";

export const addCartItem=(id,qty)=>async(dispatch,getState)=>{
  const {data}=await axios.get(`/api/products/${id}`);
  dispatch({
    type:CART_ADD_ITEM,
    payload:{
      product:data._id,
      name:data.name,
      image:data.image,
      price:data.price,
      countInStock:data.countInStock,
      qty:parseInt(qty)
    }
  })
  localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const removeCartItem=(id)=>async(dispatch,getState)=>{
  // const {data}=await axios.get(`/api/products/${id}`);
  dispatch({
    type:CART_REMOVE_ITEM,
    payload:id
  })
  localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const saveAddress=(address)=>async(dispatch,getState)=>{
  dispatch({
    type:CART_SAVE_ADDRESS,
    payload:address
  })
}
export const savePayment=(payment)=>async(dispatch,getState)=>{
  dispatch({
    type:CART_SAVE_METHOD,
    payload:payment
  })
}