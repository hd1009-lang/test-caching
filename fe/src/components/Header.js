import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Route} from 'react-router-dom'
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox'
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <LinkContainer to='/'>
        <Navbar.Brand>Shop</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
      <Route render={({history})=><SearchBox history={history}/>}/>
        <Nav className='ml-auto'>
          <LinkContainer to='/cart'>
            <Nav.Link>
              <AiOutlineShoppingCart /> Cart
            </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Thông tin</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={() => handleLogout()}>
                Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link>
                <AiOutlineUser /> Sign In
              </Nav.Link>
            </LinkContainer>
          )}
          {userInfo && userInfo.isAdmin &&(
            <NavDropdown title='Admin' id='admin'>
              <LinkContainer to='/users'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/products'>
                <NavDropdown.Item>Product</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/orders'>
                <NavDropdown.Item>Order</NavDropdown.Item>
              </LinkContainer>
              
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
