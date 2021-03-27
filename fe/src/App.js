import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/orderScreen';
import UserListScreen from './screens/UserListScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen';
import OrderAllScreen from './screens/OrderAllScreen';
const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
      <Header />
      <main>
        <Container>
        <Switch>

          <Route path='/' exact component={HomeScreen}/>
          <Route path='/users' exact component={userInfo && userInfo.isAdmin?UserListScreen:NotFoundScreen}/>
          <Route path='/product/:id' exact component={ProductScreen}/>
          <Route path='/product/:id/edit' exact component={ProductEditScreen}/>
          <Route path='/order/:id' exact component={OrderScreen}/>
          <Route path='/cart/:id?' exact component={CartScreen}/>
          <Route path='/login' exact component={LoginScreen}/>
          <Route path='/orders' exact component={OrderAllScreen}/>
          <Route path='/register' exact component={RegisterScreen}/>
          <Route path='/profile' exact component={ProfileScreen}/>
          <Route path='/shipping' exact component={ShippingScreen}/>
          <Route path='/payment' exact component={PaymentScreen}/>
          <Route path='/user/:id/edit' exact component={UserEditScreen}/>
          <Route path='/products' exact component={ProductListScreen}/>
          <Route path='/products/:pageNumber' exact component={ProductListScreen}/>
          <Route path='/placeorder' exact component={PlaceOrderScreen}/>
          <Route path='/search/:keyword' exact component={HomeScreen}/>
          <Route path='/search/:keyword/page/:pageNumber' exact component={HomeScreen}/>
          <Route path='/page/:pageNumber' exact component={HomeScreen}/>
          <Route path='*' component={NotFoundScreen}/>
          
          {/* <Route path='/login' exact component={LoginScreen}/> */}

        </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
