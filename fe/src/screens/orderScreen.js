import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deliveredOrder, getOrderDetails,payOrder } from '../actions/orderAction';
import {PayPalButton} from 'react-paypal-button-v2'
import axios from 'axios'
import {ORDER_DELIVERED_RESET, ORDER_PAY_RESET} from '../constants/orderContanst'
const OrderScreen = ({ match }) => {
  const orderId=match.params.id
  const dispatch = useDispatch();
  const [sdkReady,setSdkReady]=useState(false);
  
 
  const orderDetails= useSelector((state) => state.orderDetails);
  const {order,loading,error}=orderDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderPay= useSelector((state) => state.orderPay);
  const {loading:loadingPay,success:successPay}=orderPay;
  const orderDeliver= useSelector((state) => state.orderDeliver);
  const {loading:loadingDeliver,success:successDeliver}=orderDeliver;
 
  const successPaymentHandler=async(paymentResult)=>{
    dispatch(payOrder(orderId,paymentResult));
  }
  const deliverHandler=async ()=>{
    dispatch(deliveredOrder(order))
  }
  useEffect(() => {
    const addPayPalScript=async ()=>{
      const {data:clientId}=await axios.get('/api/config/paypal')
      const script=document.createElement('script');
      script.type='text/javascript';
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async=true;
      script.onload=()=>{
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }
    if(!order|| successDeliver){
      dispatch({type:ORDER_DELIVERED_RESET});
      dispatch(getOrderDetails(orderId))

    }
    if(!order || successPay){
      dispatch({type:ORDER_PAY_RESET})
      dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
      if(!window.paypal){
        addPayPalScript()
      }else{
        setSdkReady(true)
      }
    }
    addPayPalScript();
   dispatch(getOrderDetails(orderId));
   
  }, [dispatch,orderId,successPay,successDeliver]);
  
  return (
    <div>
      {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:""}
      {order && (
        <Row>
        <Col md={9}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order {order._id}</h2>
              <p><strong>Tên:</strong>{order.user.name}</p>
              <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},
                {order.shippingAddress.district},
                {order.shippingAddress.city}
              </p>
              {order.isDelivered?<Message variant="success">Đã giao</Message>:<Message variant="danger">Chưa giao</Message>}

            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Phương thức thanh toán</h2>
              <p><strong>Method: </strong>
              {order.paymentMethod}</p>
              {order.isPaid?<Message variant="success">Đã thanh toán</Message>:<Message variant="danger">Chưa thanh toán</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Giỏ hàng</h2>
              <ListGroup variant='flush'>
                {order.orderItems.map((el,index)=>(
                  <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                            <Image src={el.image} alt={el.name} fluid rounded/>
                        </Col>
                        <Col>
                          <Link to={`/product/${el.prodcut}`}>
                            {el.name}
                          </Link>
                        </Col>
                        <Col md={5}>
                            {el.qty} x ${el.price} = ${el.qty * el.price}
                        </Col>
                      </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
              <ListGroup varian='flush'>
                  <ListGroup.Item>
                    <h2>Hoá đơn</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.orderItems.reduce((acc,item)=>acc + item.price * item.qty,0).toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tổng</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                   <ListGroup.Item>
                     {loadingDeliver && <Loader/>}
                     <Button
                      type='button'
                      className='btn btn-block'
                      onClick={()=>deliverHandler()}
                    >
                     Thanh toán
                    </Button>
                   </ListGroup.Item>
                 )}
                 {!order.isPaid && (
                   <ListGroup.Item>
                     {loadingPay && <Loader/>}
                     {!sdkReady?<Loader/>:(
                       <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}

                       />
                     )}
                   </ListGroup.Item>
                 )}
              </ListGroup>
            </Card>
        </Col>
      </Row>
      )}
    </div>
    
  )
        

};

export default OrderScreen;
