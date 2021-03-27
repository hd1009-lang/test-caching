import React, { useEffect, useState } from 'react';
import { Button, Form,Row,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { detailUser } from '../actions/userActions';
import CheckOutStep from '../components/CheckOutStep';
import { saveAddress } from '../actions/cartActions';

const ShippingScreen = ({history}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [message,setMessage]=useState('');
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart=useSelector(state=>state.cart)
  useEffect(()=>{
    if (!userInfo) {
      history.push('/login');
    }
    if(cart.cartItems.length<=0)
    history.push('/');
    if (!user || !user.name) {
      dispatch(detailUser());
    } else {
      setName(user.name);
      setAddress(user.address);
      setDistrict(user.district);
      setCity(user.city)
    }

  },[dispatch, userInfo, history, user])

  const submitHandler = (e) => {
    e.preventDefault();
    if(!name || !district || !city || !address){
      return setMessage('Vui lòng nhập đầy đủ thông tin');
    }
    const addressShip={
      address:address,
      district:district,
      city:city
    }
    dispatch(saveAddress(addressShip))

    history.push('/payment')
  };
  return (
    <FormContainer>
      <CheckOutStep step1 step2/>
      <h1>Shipping</h1>
      {message?<Message variant="danger">{message}</Message>:''}
      <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label controlId='name'>Tên người nhận</Form.Label>
        <Form.Control
        type="name"
        placeholder='Nhập tên người nhận'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label controlId='address'>Địa chỉ</Form.Label>
        <Form.Control
        type="name"
        placeholder='Nhập địa chỉ'
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label controlId='district'>Quận - huyện</Form.Label>
        <Form.Control
        type="name"
        placeholder='Nhập quận huyện'
        value={district}
        onChange={(e)=>setDistrict(e.target.value)}
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label controlId='city'>Thành phố</Form.Label>
        <Form.Control
        type="name"
        placeholder='Nhập thành phố'
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        >
        </Form.Control>
      </Form.Group>
      <Button type="submit" variant="primary">Xác nhận</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
