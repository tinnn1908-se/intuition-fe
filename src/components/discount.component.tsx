import React from 'react'
import '../styles/discount.style.scss'
import {Link} from 'react-router-dom'

const Discount = () => {
  return (
    <div className='discountOverlay'>
        <div className='__discount'>
            <div className='__content'>
                <h4>ALL UPS FOR GRABS</h4>
                <h3>Enjoy up to 70% off!</h3>
                <small>Grab your limited-time discount and enjoy 70& off on all our products</small>
                <Link to="/productview">Shop Now</Link>
            </div>
            <div className='__ad'>
                <img src="images/discount.png" alt="image" />
            </div>
        </div>
    </div>
  )
}

export default Discount