import React, { useEffect } from 'react'
import { Button, Table,Row,Col } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import {deleteProduct, listProduct,createProduct} from '../actions/productAction'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {AiFillCheckCircle,AiOutlineCloseCircle,AiFillEdit,AiOutlineDelete,AiFillPlusSquare} from 'react-icons/ai'
import {LinkContainer} from 'react-router-bootstrap'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstant';
import Paginate from '../components/Paginate'

const ProductListScreen = ({history,match}) => {
  const keyword=match.params.keyword;
  const pageNumber=match.params.pageNumber || 1;
  const dispatch=useDispatch();
  const productList=useSelector(state=>state.productList);
  const {loading,error,products,pages,page}=productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productDelete = useSelector((state) => state.productDelete);
  const { success:successDelete } = productDelete;
  const productCreate = useSelector((state) => state.createProduct);
  const { loading:loadingCreate,success:successCreate,error:errorCreate,product:createdProduct } = productCreate;
  const handleDelete=async(id)=>{
    dispatch(deleteProduct(id))
    // console.log('delete');
  }
  const createProductHandler=async()=>{
      dispatch(createProduct())
  }
  useEffect(()=>{
    dispatch({type:PRODUCT_CREATE_RESET})
    if(successDelete) {
      dispatch({type:PRODUCT_DELETE_RESET})
    }
    if(successCreate){
      history.push(`/product/${createdProduct._id}/edit`)
    }
    if(!userInfo){
      // window.location.href('/')
      history.push('/');
    }
    dispatch(listProduct('',pageNumber))
  },[dispatch,userInfo,successDelete,successCreate,pageNumber])
  return (
    <>
     <Row className='align-items-center'>
        <Col>
          <h1>Sản phẩm</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <AiFillPlusSquare/> Create Product
          </Button>
        </Col>
      </Row>
      {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
            <th>ID</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Thể loại</th>
                <th>Hãng</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {products && products.map(product=>(
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  {product.category}
                </td>
                <td>
                  {product.brand}
                </td>
                <td>
                  <LinkContainer to={`/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                        <AiFillEdit/>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={()=>handleDelete(product._id)}>
                        <AiOutlineDelete/>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
        <Paginate isAdmin={true} pages={pages} page={page} keyword={keyword?keyword:''} />
    </>
  )
}

export default ProductListScreen
