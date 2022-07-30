import React from 'react';
import { Routes, Route } from 'react-router-dom'
import PurchasedListView from './views/purchasedList.view';
import CheckoutView from './views/checkout.view';
import HomeView from './views/home.view';
import LoginView from './views/login.view';
import ProductDetailView from './views/product.detail.view';
import ProductsView from './views/products.view';
import RegisterView from './views/register.view';
import OrderDetailView from './views/orderDetail.view';
import UpdateUserView from './views/updateUser.view';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'fitContent',
      backgroundColor: '#F6F7FB',
      margin: '0',
      padding: '0',
      width: '100%',
      boxSizing: 'border-box'
    }} className='app'>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/productview' element={<ProductsView />} ></Route>
        <Route path='/ProductDetail/:productID' element={<ProductDetailView />} />
        <Route path='/checkout' element={<CheckoutView />} ></Route>
        <Route path='/orderhistory' element={<PurchasedListView/>} ></Route>
        <Route path='/orderDetailHistory/:status/:orderNo' element={<OrderDetailView/>} ></Route>
        <Route path='/profile' element={<UpdateUserView/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
