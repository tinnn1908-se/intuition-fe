import { useSelector } from 'react-redux';
import CartAPI from '../apis/http.cart';
import { addressSelector } from '../app/store';
import { IAddress, initialAddress } from '../models/address.model';
import { ICart, ICartItem } from '../models/cart.model'
import { ICreateOrderDetailRequest, ICreateOrderRequest, IOrder } from '../models/order.model';
import DatetimeUtil from '../utils/datetime.util';
export default class CartService {

    static isExistedItem(cart: ICart, cartItem: ICartItem): number | null {
        console.log(cartItem.color)
        console.log(cartItem.size)
        console.log(cartItem.product.no)
        for (let index = 0; index < cart.items.length; index++) {
            const element = cart.items[index];
            if (element.color === cartItem.color
                && element.size === cartItem.size
                && element.product.no === cartItem.product.no
            ) {
                return index;
            }
        }
        return null;
    }
    static async createOrder(order: IOrder) {
        var createOrderRequest: ICreateOrderRequest = {
            no: order.id,
            fullname: order.cart.ownerName,
            address: order.address,
            // phoneNumber : order.phoneNumber,
            phoneNumber: order.phoneNumber,
            paymentMethod: order.paymentMethod,
            promotionID: null,
            quantity: order.cart.quantity,
            status: 0,
            subTotal: order.cart.total,
            userID: order.cart.userID
        }
        var createOrderResponse = await CartAPI.createOrder(createOrderRequest);
        console.log(createOrderResponse)
        if (createOrderResponse) {
            try {
                var check = true;
                for (let index = 0; index < order.cart.items.length; index++) {
                    const cartItem = order.cart.items[index];
                    var createOrderDetailRequest: ICreateOrderDetailRequest = {
                        orderNo: order.id,
                        productNo: cartItem.product.no,
                        quantity: cartItem.quantity,
                        color: cartItem.color,
                        total: (Number(cartItem.product.price) * cartItem.quantity)
                    }
                    console.log('color : ' + createOrderDetailRequest.color)
                    var createOrderDetailResponse = await CartAPI.createOrderDetail(createOrderDetailRequest);
                    if (typeof createOrderDetailResponse === 'undefined' || createOrderDetailResponse === false)
                        check = false;
                }
                return check;
            } catch (error) {
                console.log(error)
                return false;
            }
        } else {
            return false;
        }
    }

}