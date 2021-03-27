import React, { useEffect, useState } from 'react';
import { Button, Form,Row,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {login} from '../actions/userActions'
const LoginScreen = ({location,history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect=location.search?location.search.split('=')[1]:'/'
  const dispatch=useDispatch();
  const userLogin=useSelector(state=>state.userLogin);
  const {loading,error,userInfo}=userLogin;
  useEffect(()=>{
    if(userInfo){
      history.push(redirect)
    }
  },[history,userInfo,redirect])
  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(login(email,password))
  }

  return (
    <FormContainer>
      <h1>Đăng nhập</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e)=>setEmail(e.target.value)} >

          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Nhập pass' value={password} onChange={(e)=>setPassword(e.target.value)} >

          </Form.Control>
        </Form.Group>
          <Button type="submit" variant="primary">Đăng nhập</Button>
      </Form>
      <Row className="py-3">
          <Col>
            Chưa có tài khoản ? <Link to={redirect ? `/register?redirect=${redirect}`:`/register`}>Đăng kí</Link>
          </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
