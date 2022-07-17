import { IProduct } from "./product.model";

export interface ICartItem {
    product: IProduct,
    quantity: number,
    size : string,
    color : string
}

export interface ICart {
    items: Array<ICartItem>,
    quantity : number,
    total : number,
    userID : string,
    ownerName : string
}

export const initialCart : ICart = {
    items : [],
    quantity : 0,
    total : 0,
    userID : 'SYSTEM',
    ownerName : ''
}