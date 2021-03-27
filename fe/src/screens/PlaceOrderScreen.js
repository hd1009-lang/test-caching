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
import CheckOutStep from '../components/CheckOutStep';
import { saveAddress } from '../actions/cartActions';
import { createOrder } from '../actions/orderAction';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const cart = useSelector(state=>state.cart)
  cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc + item.price * item.qty,0);
  cart.shippingPrice=cart.itemsPrice > 100 ? 0 :100;
  cart.totalPrice=(cart.itemsPrice+cart.shippingPrice).toFixed(2)
  
  const orderCreate=useSelector(state=>state.orderCreate);
  const {error,success,order}=orderCreate
  useEffect(() => {
    if(!cart.payment || !user){
      history.push('/payment')
    }
      if(success){
        history.push(`/order/${order._id}`)
      }
    
  }, [ history,success]);

  const placeOrderHandler=()=>{
    const shippingAddress={
      address:user.address,
      district:user.district,
      city:user.city,
    }
    dispatch(createOrder({
      orderItems:cart.cartItems,
      shippingPrice:cart.shippingPrice,
      paymentMethod:cart.payment,
      totalPrice:cart.totalPrice,
      itemsPrice:cart.itemsPrice,
      shippingAddress:shippingAddress,
    }))
  }
  return (
    <>
      <CheckOutStep step1 step2 step3 step4 />
      <Row>
        <Col md={9}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {user.address},
                {user.district},
                {user.city}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Phương thức thanh toán</h2>
              <strong>Method: </strong>
              {cart.payment}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Giỏ hàng</h2>
              <ListGroup variant='flush'>
                {cart.cartItems.map((el,index)=>(
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
                      <Col>${cart.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${cart.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tổng</Col>
                      <Col>${cart.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error&&<Message variant="danger">{error}</Message>}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button type='button' className='btn-block' onClick={()=>placeOrderHandler()}>
                      Thanh toán
                    </Button>
                  </ListGroup.Item>
                  
              </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
