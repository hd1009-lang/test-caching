import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailUser, updateProfile } from '../actions/userActions';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getListOrder} from '../actions/orderAction'
import {FaTimes} from 'react-icons/fa'
const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success,errorUpdate } = userUpdate;
  const orderList=useSelector(state=>state.orderList);
  const {loading:loadingOrder,error:errorOrder,orders}=orderList
  const submitHandler = (e) => {
    e.preventDefault();
    const newInfo={
      name:name,
      email:email,
      password:password,
      passwordNew:passwordNew,
      address:address,
      district:district,
      city:city,
    }
    dispatch(updateProfile(newInfo))
  };
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (!user || !user.name) {
      dispatch(detailUser());
      dispatch(getListOrder());
    } else {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setDistrict(user.district);
      setCity(user.city)
    }
  }, [dispatch, userInfo, history, user]);
  return (
    <Row>
      <Col md={3}>
      <h1>Th??ng tin </h1>
          {error && <Message variant='danger'>{error}</Message>}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {success && <Message variant='success'>C???p nh???t th??nh c??ng</Message>}
          {loading && <Loader />}
          {user && (
            <>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label>T??n</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Nh???p t??n'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Nh???p email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>?????a ch???</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Nh???p ?????a ch???'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Qu???n - huy???n</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Nh???p qu???n - huy???n'
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Th??nh ph???</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Nh???p th??nh ph???'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>M???t kh???u hi???n t???i</Form.Label>
                  <Form.Control
                    
                    type='password'
                    placeholder='Nh???p m???t kh???u'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>M???t kh???u m???i</Form.Label>
                  <Form.Control
                    
                    type='password'
                    placeholder='Nh???p m???t kh???u'
                    value={passwordNew}
                    onChange={(e) => setPasswordNew(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  C???p nh???t
                </Button>
              </Form>
            </>
          )}
      </Col>
      <Col md={9}>
        <h1>Danh s??ch ????n h??ng</h1>
        {loadingOrder?<Loader/>:errorOrder?<Message variant="danger">{errorOrder}</Message>:(
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order=>(
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid?order.paidAt.substring(0,10):(
                    <FaTimes/>

                  )}</td>
                  <td>{order.isDelivered?order.deliveredAt.substring(0,10):
                    <FaTimes/>
                  }</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
