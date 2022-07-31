import ProductAPI from "../apis/http.product";
import { IFilter } from "../models/filter.model";
import { IProduct } from "../models/product.model";

export default class ProductService {
    static async getNewestProducts() {
        var response = await ProductAPI.getNewestProducts();
        if (response) return response;
        return [];
    }
    static async getProductsByLikeName(searchValue: string, page: number) {
        var response = await ProductAPI.getProductsByLikeName(searchValue, page);
        if (response) return response;
        return [];
    }
    static async getProductByID(productNo: string) {
        var response = await ProductAPI.getProductByID(productNo);
        if (response) return response;
        return null;
    }
    static async getProductsByFilterReq(filter: IFilter,pagination : number) {
        var response: Array<IProduct> | undefined | null = await ProductAPI.getProductsByFilterReq(filter,pagination);
        console.log(response)
        if (response) return response;
        return [];
    }
}