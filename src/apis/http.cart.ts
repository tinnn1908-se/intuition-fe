import request from "axios";
import { ICreateOrderDetailRequest, ICreateOrderRequest } from "../models/order.model";
import httpCommon from "./http.common";

export default class CartAPI {
    static async createOrder(createOrderRequest: ICreateOrderRequest) {
        try {
            var response = await httpCommon.post('/api/order/createOrder', createOrderRequest);
            console.log(createOrderRequest.phoneNumber)
            if (response && response.status === 200)
                return true;
            return false;
        } catch (error) {
            if (request.isAxiosError(error) && error.message) {
                console.log(error.message)
                return false;
            }
        }
    }
    static async createOrderDetail(createOrderDetailRequest: ICreateOrderDetailRequest) {
        try {
            console.log('color : ')
            console.log(createOrderDetailRequest.color)
            var response = await httpCommon.post('/api/order/createOrderDetail', createOrderDetailRequest);
            if (response && response.status === 200)
                return true;
            return false;
        } catch (error) {
            if (request.isAxiosError(error) && error.message) {
                console.log(error.message)
                return false;
            }
        }
    }
}