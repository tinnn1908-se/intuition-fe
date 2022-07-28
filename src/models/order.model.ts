import {initialCart,ICart} from '../models/cart.model';
import {IAddress} from '../models/address.model';
export interface IOrder {
    id : string,
    cart : ICart,
    address : string,
    phoneNumber : string,
    fullname : string,
    paymentMethod : 0 | 1 | 2 | 3;
    // 0 : COD
    // 1 : Internet Banking
    // 2 : Momo
    // 3 : Card
}

export interface ICreateOrderRequest {
    no : string,
    address : string,
    fullname : string,
    promotionID : string | null,
    userID : string,
    phoneNumber : string,
    paymentMethod : number,
    quantity : number,
    status : 0 | 1 | 2,
    subTotal : number
    // 0 : Created
    // 1 : Processing
    // 2 : Completed
}

export interface ICreateOrderDetailRequest {
    orderNo : string,
    productNo : string,
    quantity : number,
    color : string,
    total : number
}

export const initialOrder : IOrder = {
    id : '0',
    cart : initialCart,
    address : '',
    fullname : '',
    phoneNumber : '',
    paymentMethod : 0
}

export interface IOrderResponse{
    no : string, 
    address : string,
    quantity : string,
    payment_method : number,
    subtotal : string,
    status: number,
    insert_date : string
}
export interface IOrderDetailResponse{
    name : string,
    price : string,
    quantity : number,
    total : string
}