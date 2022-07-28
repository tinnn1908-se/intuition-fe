import request, { AxiosRequestConfig } from 'axios'
import { IOrderDetailResponse, IOrderResponse } from '../models/order.model';
import httpCommon from './http.common';
export default class OrderAPI{
    static async getOrderByPhoneNumber(phoneNumber : string) {
        try {
            var url = `/api/order/getOrderByPhoneNumber/${phoneNumber}`;
            var response = await httpCommon.get(url);
            var orders : Array<IOrderResponse>= [];
            if (response && response.data) {
                orders = response.data.orders;
            }
            return orders;
        } catch (error) {
            if (request.isAxiosError(error) && error.message) {
                console.log(error.message);
                return [];
            }
        }
    }
    static async getOrderDetailsByOrderNo(orderNo : string) {
        try {
            var url = `/api/order/getOrderDetailsByOrderNo/${orderNo}`;
            var response = await httpCommon.get(url);
            var orders : Array<IOrderDetailResponse>= [];
            if (response && response.data) {
                orders = response.data.orderDetails;
            }
            return orders;
        } catch (error) {
            if (request.isAxiosError(error) && error.message) {
                console.log(error.message);
                return [];
            }
        }
    }
    static async updateOrderStatus(status : number,orderNo : string) {
        try {
            var url = `/api/order/updateOrderStatus/${status}/${orderNo}`;
            var response = await httpCommon.put(url);
            if(response && response.data){
                return response.data.result;
            };
            return false;
        } catch (error) {
            if (request.isAxiosError(error) && error.message) {
                console.log(error.message);
                return [];
            }
        }
    }
}