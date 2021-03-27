import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productCreateReducer, productDeleteReducer, productReducer, productReviewReducer, productUpdateReducer } from './reducers/productReducer'
import { productDetailsReducer } from './reducers/productDetailReducer'
import { cartReducer } from './reducers/cartReducer'
import {orderReducer,orderDetailsReducer,orderPayReducer, orderListReducer, orderListAllReducer, orderDeliveredReducer} from './reducers/orderReducer'
import { userDeleteReducer, userDetailsReducer, userListReducer, userReducer, userRegisterReducer, userUpdateReducer,userUpdateWithAdminReducer } from './reducers/userReducer'
const reducer=combineReducers({
  productList:productReducer,
  productDetails:productDetailsReducer,
  cart:cartReducer,
  userLogin:userReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdate:userUpdateReducer,
  orderCreate:orderReducer,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderList:orderListReducer,
  listUser:userListReducer,
  userDelete:userDeleteReducer,
  userUpdateWithAdmin:userUpdateWithAdminReducer,
  productDelete:productDeleteReducer,
  createProduct:productCreateReducer,
  updateProduct:productUpdateReducer,
  allOrder:orderListAllReducer,
  orderDeliver:orderDeliveredReducer,
  reviewProduct:productReviewReducer
})
const cartItemsFormLocalStore=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFormLocalStore=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const initialState={
  cart:{cartItems:cartItemsFormLocalStore},
  userLogin:{userInfo:userInfoFormLocalStore}
}
const middleware=[thunk];
const devTools =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);
const store=createStore(reducer,initialState,devTools)
// const store=createStore(reducer,initialState,applyMiddleware(...middleware))
// const store=createStore(reducer,initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store