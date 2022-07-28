import OrderAPI from "../apis/http.order";

export default class OrderService{
    static async getOrderByPhoneNumber(phoneNumber : string){
        var response = await OrderAPI.getOrderByPhoneNumber(phoneNumber);
        return response;
    }
    static async getOrderDetailsByOrderNo(orderNo : string){
        var response = await OrderAPI.getOrderDetailsByOrderNo(orderNo);
        return response;
    }
    static async updateOrderStatus(status : number,orderNo : string){
        var response = await OrderAPI.updateOrderStatus(status,orderNo);
        return response;
    }
}