
import request, { AxiosRequestConfig } from 'axios'
import { IFilter } from '../models/filter.model';
import { IProduct } from '../models/product.model';
import httpCommon from './http.common';
export default class ProductAPI {
    static async getNewestProducts() {
        try {
            var response = await httpCommon.get('/api/product/getNewestProducts');
            var products: Array<IProduct> = [];
            if (response && response.data) {
                products = response.data.products;
            }
            return products;
        } catch (error) {
            if (request.isAxiosError(error) && error.response) {
                console.log(error.message)
                return [];
            }
        }
    }

    static async getProductsByLikeName(searchValue: string, page: number) {
        try {
            var url = '/api/product/getProductsByLikeName'
                + `/${searchValue}`
                + `/${page}`
            console.log("Page : " + page)
            var response = await httpCommon.get(url);
            var products: Array<IProduct> = [];
            if (response && response.data) {
                products = response.data.products;
            }
            return products;
        } catch (error) {
            if (request.isAxiosError(error) && error.message) {
                console.log(error.message);
                return [];
            }
        }

    }

    static async getProductByID(productNo: string) {
        try {
            var url = '/api/product/getProductByID'
                + `/${productNo}`;
            var response = await httpCommon.get(url);
            var product: IProduct | null = null;
            if (response && response.data)
                product = response.data.product;
            return product;
        } catch (error) {
            if (request.isAxiosError(error) && error.message)
                return null;
        }
    }

    static async getProductsByFilterReq(filter: IFilter, pagination: number) {
        try {
            var url = "/api/product/getProductsByFilter";
            // console.log(products)
            var response = await httpCommon.post(url, { filter, pagination });
            var products: Array<IProduct> | null = null;
            if (response && response.data)
                products = response.data.products;
            // console.log(products)
            return products;
        } catch (error) {
            if (request.isAxiosError(error) && error.message)
                return null;
        }
    }
}