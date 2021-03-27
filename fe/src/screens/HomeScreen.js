import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.js';
// import products from '../products';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../actions/productAction.js';
import Loader from '../components/Loader.js';
import Paginate from '../components/Paginate'
import Message from '../components/Message.js';
const HomeScreen = ({match}) => {
  // const [products,setProducts]=useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productList);
  const { loading, error, products,pages,page } = data;
  const keyword=match.params.keyword;
  const pageNumber=match.params.pageNumber || 1;
  useEffect(() => {
    dispatch(listProduct(keyword,pageNumber));
  }, [dispatch,keyword,pageNumber]);
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
      <Paginate pages={pages} page={page} keyword={keyword?keyword:''} />
    </>
  );
};
export default HomeScreen;
