import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { detailProduct } from '../actions/productDetailAction';
import axios from 'axios'
import Message from '../components/Message';
import Loader from '../components/Loader';

import { updateProduct } from '../actions/productAction';
import { PRODUCT_UPDATE_RESET} from '../constants/productConstant';
const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [upload, setUpload] = useState(false);
  const [countInStock,setCountInStock]=useState(0)
  const [numReview,setNumReview]=useState(0)
  const data = useSelector((state) => state.productDetails);
  const { loading:loadingDetails, product, error:errorDetails } = data;
  const updateProducts = useSelector((state) => state.updateProduct);
  const { loading, success, error } = updateProducts;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    let formData=new FormData();
    formData.append('file',file)
    setUpload(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data.url)
      setUpload(false)
    } catch (error) {
      console.error(error)
      setUpload(false)
    }
  }
  useEffect(() => {
    if(success){
      dispatch({type:PRODUCT_UPDATE_RESET})
    }
    if(!product || !product.name)
    {
      dispatch(detailProduct(match.params.id));
    }else{
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setImage(product.image);
      setDescription(product.description)
    }
  }, [history,product,success]);
  const submitHandler = (e) => {
    e.preventDefault();
    const newUser={
      id:match.params.id,
      name:name,
      price:price,
      image:image,
      countInStock:countInStock,
      description:description,
      brand:brand,
      numReview:numReview,
      category:category
    }
    dispatch(updateProduct(newUser))
    // dispatch(updateUserWithAdmin({_id:userId,name,email,isAdmin}))
  };

  return (
    <>
      <Link to='/products' className='btn btn-light py-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Th??ng tin</h1>
        {/* {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
        
        {loading&&<Loader/>}
        {error&&<Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group>
            <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {upload && <Loader />}
            </Form.Group>
            <Form.Group>
              <Form.Label>T??n</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nh???p t??n'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Gi??</Form.Label>
              <Form.Control
                type='number'
                placeholder='Gi?? ti???n'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Th??? lo???i</Form.Label>
              <Form.Control
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Nh??n h??ng</Form.Label>
              <Form.Control
                type='text'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>M?? t???</Form.Label>
              <Form.Control
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>S??? l?????ng trong kho</Form.Label>
              <Form.Control
                type='text'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Button type='submit' variant='primary'>
              C???p nh???t
            </Button>
          </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
