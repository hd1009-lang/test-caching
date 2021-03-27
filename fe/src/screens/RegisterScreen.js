import React, { useEffect, useState } from 'react';
import { Button, Form,Row,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {register} from '../actions/userActions'
const RegisterScreen = ({location,history}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const redirect=location.search?location.search.split('=')[1]:'/'
  const dispatch=useDispatch();
  const userLogin=useSelector(state=>state.userLogin);
  const {userInfo}=userLogin;
  const userRegister=useSelector(state=>state.userRegister);
  const {loading,error}=userRegister;
  useEffect(()=>{
    if(userInfo){
      history.push(redirect)
    }
  },[history,userInfo,redirect])
  const submitHandler=(e)=>{
    e.preventDefault();
    if(password!==passwordConfirm){
      return setMessage('Mật khẩu nhập không trùng')
    }
    // alert('ok')USER_UPDATE_PROFILE_FAIL
    // console.log({
    //   name,email,password
    // });
    dispatch(register(name,email,password))
  }

  return (
    <FormContainer>
      <h1>Đăng ký</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader/>}
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Tên</Form.Label>
          <Form.Control type='text' placeholder='Nhập tên' value={name} onChange={(e)=>setName(e.target.value)} required>

          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e)=>setEmail(e.target.value)} required>

          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control required type='password' placeholder='Nhập mật khẩu' value={password} onChange={(e)=>setPassword(e.target.value)} >

          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <Form.Control required type='password' placeholder='Nhập lại mật khẩu' value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} >

          </Form.Control>
        </Form.Group>
          <Button type="submit" variant="primary">Đăng ký</Button>
      </Form>
      <Row className="py-3">
          <Col>
            Đã có tài khoản ? <Link to='/login'>Đăng nhập</Link>
          </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
