import React from 'react'
import Checkout from '../components/checkout.component'
import Footer from '../components/footer.component'
import Header from '../components/header.component'
import '../styles/checkout.style.scss'

const CheckoutView = () => {
  return (
    <div className='checkout' >
        <Header/>
        <Checkout/>
        <Footer/>
    </div>
  )
}

export default CheckoutView