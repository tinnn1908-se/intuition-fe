import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../app/store'
import { IOrderResponse } from '../models/order.model'
import OrderService from '../services/order.service'
import Footer from '../components/footer.component'
import Header from '../components/header.component'
import Table from 'react-bootstrap/Table'
import CurrencyUtil from '../utils/currency.util'
import { Link } from 'react-router-dom'
import SinglePurchasedOrder from '../components/singlePurchasedOrder.component'

const PurchasedListView = () => {
  const [orders, setOrders] = useState<Array<IOrderResponse>>([]);
  const { user } = useSelector(authSelector)
  useEffect(() => {
    async function fetchData(phoneNumber: string) {
      var response = await OrderService.getOrderByPhoneNumber(phoneNumber);
      if (response) setOrders(response);
    }
    if (user && user.phoneNumber) fetchData(user.phoneNumber);
  }, [])

  if(orders.length === 0){
    return(
      <div style={{
        "display" : "flex",
        "flexDirection" : "column",
        "justifyContent" : 'center',
        "alignItems" : "center"
      }} className='purchased'>
        <Header/>
        <h1 style={{
          "marginTop" : "100px"
        }}>Order History</h1>
        <Link to="/">You have not ordered anything !</Link>
        <Footer/>
      </div>
    )
  }else{
    return (
      <div style={{
        "display" : "flex",
        "flexDirection" : "column",
        "justifyContent" : 'center',
        "alignItems" : "center"
      }} className='purchased'>
        <Header />
        <h1 style={{
          "marginTop" : "100px"
        }}>Order History</h1>
        <div ><Table responsive="sm" style={{
          "marginBottom" : "100px"
        }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Created Date</th>
                <th>Address</th>
                <th>Quantity</th>
                <th>Payment Method</th>
                <th>Subtotal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <SinglePurchasedOrder key={order.no} order={order} />
              ))}
            </tbody>
          </Table></div>
        <Footer />
      </div>
    )
  }
}

export default PurchasedListView