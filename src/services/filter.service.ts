import { APPLICATION } from "../Constants/application.constant";
import { IFilter } from "../models/filter.model";

export default class FilterService {
    static isExistedInFilter(payload: { type: "cate" | "color" | "size" | "price", title: string }, filter: IFilter) {
        var isExisted = false;
        switch (payload.type) {
            case "cate":
                var counter = 0;
                for (let i = 0; i < filter.cates.length; i++) {
                    if (filter.cates[i] === payload.title) {
                        counter++;
                    }
                }
                if (counter > 0)
                    isExisted = true;
                break;
            case "color":
                var counter = 0;
                for (let i = 0; i < filter.colors.length; i++) {
                    if (filter.colors[i] === payload.title) {
                        counter++;
                    }
                }
                if (counter > 0)
                    isExisted = true;
                break;
            case "size":
                var counter = 0;
                for (let i = 0; i < filter.sizes.length; i++) {
                    if (filter.sizes[i] === payload.title) {
                        counter++;
                    }
                }
                if (counter > 0)
                    isExisted = true;
                break;
            case "price":
                break;
            default:
                break;
        }
        return isExisted;
    }
    static isEmptyFilter(filter: IFilter) {
        if (filter.cates.length === 0
            && filter.colors.length === 0
            && filter.price.min === 0
            && filter.price.max === Number(APPLICATION.PRODUCT_MAX_PRICE)) {
            return true
        }
        return false;
    }
}