import React, { useEffect } from 'react'
import { Col, Image, ListGroup, Row,Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addCartItem,removeCartItem } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = ({match,history}) => {
  const {cartItems}=useSelector(state=>state.cart)
  const dispatch=useDispatch()
  const qty=parseInt(history.location.search.split('=')[1]);
  // useEffect(()=>{
    
  //   dispatch(addCartItem(match.params.id,qty));
  // },[dispatch,qty])
  const removeItem=(id)=>{
    dispatch(removeCartItem(id))
  }
  const checkOut=()=>{
    history.push(`/shipping`)
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? <Message>Trống !</Message>:
        <ListGroup  variant="flush">
            {cartItems.map(item=>
              <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}><Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addCartItem(item.product,e.target.value))}>
                        { [...Array(item.countInStock).keys()].map(x=>(
                              <option key={x+1} value={x+1}>{x+1}</option>
                            ))}

                        </Form.Control></Col>

                  <Col md={2}>
                    <Button type="button" variant="light" onClick={()=>removeItem(item.product)}><AiFillDelete/></Button>
                  </Col>
                  </Row>
              </ListGroup.Item>
            )}
        </ListGroup>
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Tổng có ({cartItems.reduce((acc,item)=>acc + item.qty,0)}) trong giỏ hàng</h2>
              ${cartItems.reduce((acc,item)=>acc + item.qty*item.price,0).toFixed(2)} $
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className='btn-block' disabled={cartItems.length===0} onClick={()=>checkOut()}>
                  Thanh toán
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  )
}

export default CartScreen
