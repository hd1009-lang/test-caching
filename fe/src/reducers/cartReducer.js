import {CART_SAVE_METHOD, CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_ADDRESS } from "../constants/cartConstant";


export const cartReducer= (state={cartItems:[]},action)=>{

  switch (action.type) {
    case CART_ADD_ITEM:
        const item=action.payload;
        const existItem=state.cartItems.find(el=>el.product===item.product)
        if(existItem){
          return {
            ...state,
            cartItems:state.cartItems.map(el=>el.product===existItem.product?item:el)
          }
        }else{
          return {
            ...state,
            cartItems:[...state.cartItems,item]
          }
        } 
    case CART_REMOVE_ITEM:
      const newCart=state.cartItems.filter(item=>item.product!==action.payload);
      return {
        ...state,
        cartItems:newCart
      }
    case CART_SAVE_ADDRESS:
      return {
        ...state,
        address:action.payload
      }
    case CART_SAVE_METHOD:
      return {
        ...state,
        payment:action.payload
      }
    default:
      return state
  }
}