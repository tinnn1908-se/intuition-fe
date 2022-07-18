import React from 'react'
import { FiPackage } from 'react-icons/fi'
import {MdOutlinePriceCheck, MdOutlineLocalShipping} from 'react-icons/md'
import { Link } from 'react-router-dom'
import '../styles/trend.style.scss'

const Trend = () => {
    return (
        <div className='trend'>
            <h1>Stay In Trend With Intuition</h1>
            <div className='__boxes'>
                <div className='__box'>
                    <FiPackage />
                    <p>Lastest Styles</p>
                    <small>Our designs follow the latest fashion styles to help you stay updated with new trends.</small>
                    <Link to="/#">Read more</Link>
                </div>
                <div className='__box'>
                    <MdOutlinePriceCheck />
                    <p>Best Prices</p>
                    <small>Enjoy the best prices for high quality clothing and accessories.</small>
                    <Link to="/#">Read more</Link>
                </div>
                <div className='__box'>
                    <MdOutlineLocalShipping />
                    <p>Free Shipping</p>
                    <small>We provide free shipping worldwide. You can order from anywhere, anytime.</small>
                    <Link to="/#">Read more</Link>
                </div>
            </div>
        </div>
    )
}

export default Trend