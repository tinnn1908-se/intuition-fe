import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import '../styles/checkoutCart.style.scss'
import { cartSelector } from '../app/store'
import CartItem from './cart.item.component'
import { Link } from 'react-router-dom'
import CurrencyUtil from '../utils/currency.util'
const CheckoutCart = () => {
  const cart = useSelector(cartSelector);
  return (
    <div className='checkoutCart' >
      <div className='__yourCart' >
        <p>Your Cart : </p>
        <p>{` ${cart.quantity} items`}</p>
      </div>
      <div className='__content'>
      {cart.items.length === 0 ? (<React.Fragment>
          <div>Cart is empty ! <Link to='/'>Shopping Now !</Link> </div>
      </React.Fragment>) : (
        <ListGroup>
        {cart.items.map(item => (
          <CartItem key={item.product.no} {...item} />
        ))}
      </ListGroup>
      )}
      <div className='__text' >
        <div className='__voucher'>
          <p>Voucher  </p>
          <input type="text" />
        </div>
        {/* <div className='__singleText'>
          <p>Total  </p>
          <p>{`: ${cart.items.length} items`}</p>
        </div> */}
        <div className='__singleText'>
          <p>VAT  </p>
          <p>{`: 10%`}</p>
        </div>
        <div className='__singleText'>
          <p>Delivery Charge </p>
          <p>{`: ${CurrencyUtil.toVND(25000)}`}</p>
        </div>
        <div className='__singleText'>
          <p>Discount  </p>
          <p>{`: ${CurrencyUtil.toVND(0)}`}</p>
        </div>
        <div className='__singleText'>
          <p>Subtotal  </p>
          <p>{`: ${CurrencyUtil.toVND(Number(cart.total) + (Number(cart.total)* 0.1) + 25000)}`}</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CheckoutCart