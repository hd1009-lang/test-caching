import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import { deleteUser, getListUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {AiFillCheckCircle,AiOutlineCloseCircle,AiFillEdit,AiOutlineDelete} from 'react-icons/ai'
import {LinkContainer} from 'react-router-bootstrap'
import { USER_DELETE_RESET } from '../constants/userConstant';

const UserListScreen = ({history}) => {
  const dispatch=useDispatch();
  const userList=useSelector(state=>state.listUser);
  const {loading,error,users}=userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success:successDelete } = userDelete;
  const handleDelete=async(id)=>{
    dispatch(deleteUser(id))
  }
  useEffect(()=>{
    if(successDelete) {
      dispatch({type:USER_DELETE_RESET})
    }
    if(!userInfo){
      // window.location.href('/')
      history.push('/');
    }
    dispatch(getListUser())
  },[dispatch,userInfo,successDelete])
  return (
    <>
      <h1>Users</h1>
      {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user=>(
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin?<AiFillCheckCircle/>:<AiOutlineCloseCircle/>}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                        <AiFillEdit/>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={()=>handleDelete(user._id)}>
                        <AiOutlineDelete/>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
