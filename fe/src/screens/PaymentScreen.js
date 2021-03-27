import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CheckOutStep from '../components/CheckOutStep';
import { savePayment } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState('Paypal');
  const { address } = useSelector((state) => state.cart);
  useEffect(() => {
    if (!address) {
      history.push('/shipping');
    }
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePayment(payment));

    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckOutStep step1 step2 step3 />
      <h1>Phương thức thanh toán</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Chọn phương thức</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal'
              id='PayPal'
              name='payment'
              value='PayPal'
              checked
              onChange={(e) => setPayment(e.target.value)}
            ></Form.Check>
          </Col>
          <Col>
            <Form.Check
              type='radio'
              label='Card'
              id='Card'
              name='payment'
              value='Card'
              onChange={(e) => setPayment(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Xác nhận
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
