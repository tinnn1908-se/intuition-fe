import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomeView from './views/home.view';
import LoginView from './views/login.view';
import ProductsView from './views/products.view';
import RegisterView from './views/register.view';
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
        {/*
            <Route path='/' element={<HomeView/>} />
            <Route path='/ProductDetail/:productID' element={<ProductDetailView/>}/>
            <Route path='/checkout' element={<CheckoutView/>} ></Route>*/}
        <Route path='/' element={<HomeView />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/productview' element={<ProductsView />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
