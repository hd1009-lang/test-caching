import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserWithAdmin } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstant';
const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const userUpdateWAdmin=useSelector(state=>state.userUpdateWithAdmin)
  const {loading:loadingUpdate,success:successUpdate,error:errorUpdate}=userUpdateWAdmin
  const { loading, error, user } = userDetails;
  useEffect(() => {
    if(successUpdate){
      dispatch({type:USER_UPDATE_RESET})
      history.push("/users")
    }
    if(!user.name || user._id !== userId){
      dispatch(getUserDetails(userId))
    }else{
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [history,user]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserWithAdmin({_id:userId,name,email,isAdmin}))
  };

  return (
    <>
      <Link to='/users' className='btn btn-light py-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Thông tin</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập tên'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Nhập email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Admin</Form.Label>
              <Form.Check
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            
            <Button type='submit' variant='primary'>
              Cập nhật
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
