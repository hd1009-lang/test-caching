import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { detailProduct,reviewProduct } from '../actions/productDetailAction';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import { addCartItem } from '../actions/cartActions';
import {PRODUCT_REVIEW_RESET} from '../constants/productConstant'
const ProductScreen = ({history, match }) => {
  const [qty,setQty]=useState(1);
  const [rating,setRating]=useState(0)
  const [comment,setComment]=useState('')
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const data = useSelector((state) => state.productDetails);
  const { loading, product, error } = data;
  const reviewProducts=useSelector(state=>state.reviewProduct);
  const {loading:loadingProductReview,error:errorProductReview,success:successProductReview}=reviewProducts
  useEffect(() => {
    if(successProductReview){
      dispatch({type:PRODUCT_REVIEW_RESET})
      dispatch(detailProduct(match.params.id));
      setComment('');
      setRating(0);

    }
    dispatch(detailProduct(match.params.id));
  }, [dispatch,match,successProductReview]);
  const handleAddCart=async ()=>{
    history.push(`/cart/${match.params.id}?qty=${qty}`);
    dispatch(addCartItem(match.params.id,parseInt(qty)))
  }
 
  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(reviewProduct(match.params.id,{
      rating:Number(rating),
      comment:comment
    }))
  }
  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>
        GO BACK
      </Link>{
        loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
          <>
          <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={product.numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Số lượng</Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                        { [...Array(product.countInStock).keys()].map(x=>(
                              <option key={x+1} value={x+1}>{x+1}</option>
                            ))}

                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                  onClick={()=>handleAddCart()}
                    className='btn-black'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
            <Col md={6}>
              <h2>Đánh giá</h2>
              {product.review.length === 0 && <Message>Chưa có đánh giá</Message>}
              <ListGroup variant='flush'>
                {product.review.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Viết bình luận tại đây</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Đánh giá thành công
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Chọn...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Đánh giá</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Xác nhận
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Đi <Link to='/login'>Đăng nhập</Link> để viết đánh giá{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          </>
        )
      }
      
    </>
  );
};

export default ProductScreen;
