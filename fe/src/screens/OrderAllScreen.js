import React, { useEffect } from 'react'
import { Button, Table,Row,Col } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import {deleteProduct, listProduct,createProduct} from '../actions/productAction'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {AiFillCheckCircle,AiOutlineCloseCircle,AiFillEdit,AiOutlineDelete,AiFillPlusSquare} from 'react-icons/ai'
import {LinkContainer} from 'react-router-bootstrap'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstant';
import { getAllListOrder } from '../actions/orderAction';

const OrderAllScreen = ({history,match}) => {
  const dispatch=useDispatch();
 
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const allOrder=useSelector(state=>state.allOrder);
  const {loading,error,orders}=allOrder;
  
  
  useEffect(()=>{
    if(!userInfo){
      history.push('/login')
    }
    dispatch(getAllListOrder())
  },[dispatch,userInfo])
  return (
    <>
      <h1>Danh sách đơn hàng</h1>
      {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
            <th>ID</th>
                <th>Khách hàng</th>
                <th>Ngày</th>
                <th>Tổng tiền</th>
                <th>Thanh toán</th>
                <th>Giao hàng</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map(order=>(
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt}</td>
                <td>
                  {order.isPaid?<AiFillCheckCircle/>:<AiOutlineCloseCircle/>}
                </td>
                <td>
                  {order.isDelivered?<AiFillCheckCircle/>:<AiOutlineCloseCircle/>}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                        <AiFillEdit/>
                    </Button>
                  </LinkContainer>
                  {/* <Button variant='danger' className='btn-sm' onClick={()=>handleDelete(order._id)}>
                        <AiOutlineDelete/>
                    </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderAllScreen
