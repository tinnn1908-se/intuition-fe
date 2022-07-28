import React from 'react'
import { Link } from 'react-router-dom'
import { IOrderResponse } from '../models/order.model'
import CurrencyUtil from '../utils/currency.util'
interface IProps {
    order: IOrderResponse
}
const SinglePurchasedOrder = (params: IProps) => {
    const { order } = params;
    if(order.status === 0){
        return (
            <tr key={order.no} style={{
                "backgroundColor" : "white"
            }}>
                <td><Link style={{"color" : "#121111"}} to={`/orderDetailHistory/${order.status}/${order.no}`}>{order.no}</Link></td>
                <td>{order.insert_date}</td>
                <td>{order.address}</td>
                <td>{order.quantity}</td>
                <td>
                    {order.payment_method === 0 && "COD"}
                    {order.payment_method === 1 && "Banking"}
                    {order.payment_method === 2 && "Momo"}
                    {order.payment_method === 3 && "Card"}
                </td>
                <td>{CurrencyUtil.toVND(Number(order.subtotal))}</td>
                <td>
                    {order.status === 0 && "Ordered"}
                </td>
            </tr>
        )
    }else if(order.status === 1){
        return (
            <tr key={order.no} style={{
                "backgroundColor" : "#f5bf49"
            }}>
                <td><Link style={{"color" : "#121111"}} to={`/orderDetailHistory/${order.status}/${order.no}`}>{order.no}</Link></td>
                <td>{order.insert_date}</td>
                <td>{order.address}</td>
                <td>{order.quantity}</td>
                <td>
                    {order.payment_method === 0 && "COD"}
                    {order.payment_method === 1 && "Banking"}
                    {order.payment_method === 2 && "Momo"}
                    {order.payment_method === 3 && "Card"}
                </td>
                <td>{CurrencyUtil.toVND(Number(order.subtotal))}</td>
                <td>
                    {order.status === 1 && "Delivered"}
                </td>
            </tr>
        )
    }else if(order.status === 2){
        return (
            <tr key={order.no} style={{
                "backgroundColor" : "#47b01a"
            }}>
               <td><Link style={{"color" : "#121111"}} to={`/orderDetailHistory/${order.status}/${order.no}`}>{order.no}</Link></td>
                <td>{order.insert_date}</td>
                <td>{order.address}</td>
                <td>{order.quantity}</td>
                <td>
                    {order.payment_method === 0 && "COD"}
                    {order.payment_method === 1 && "Banking"}
                    {order.payment_method === 2 && "Momo"}
                    {order.payment_method === 3 && "Card"}
                </td>
                <td>{CurrencyUtil.toVND(Number(order.subtotal))}</td>
                <td>
                    {order.status === 2 && "Completed"}
                </td>
            </tr>
        )
    }else{
        return (
            <tr key={order.no} style={{
                "backgroundColor" : "#f72105"
            }}>
                <td>{order.no}</td>
                <td>{order.insert_date}</td>
                <td>{order.address}</td>
                <td>{order.quantity}</td>
                <td>
                    {order.payment_method === 0 && "COD"}
                    {order.payment_method === 1 && "Banking"}
                    {order.payment_method === 2 && "Momo"}
                    {order.payment_method === 3 && "Card"}
                </td>
                <td>{CurrencyUtil.toVND(Number(order.subtotal))}</td>
                <td>
                    {order.status === 3 && "Cancelled"}
                </td>
            </tr>
        )
    }

}

export default SinglePurchasedOrder