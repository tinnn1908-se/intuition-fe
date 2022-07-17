import { IColor } from "./color.model"

export interface IProduct {
    no : string,
    name : string,
    price : string,
    description : string,
    quantity : number,
    entp_no : number,
    cate_no : number,
    insert_id : string,
    insert_date : string,
    modify_id : string,
    modified_date : string,
    sizes : Array<string>,
    images :Array<string>,
    colors : Array<IColor>
}

export const initialProduct : IProduct = {
    no : '',
    name : '',
    price : '',
    description : '',
    quantity : 0,
    entp_no : 0,
    cate_no : 0,
    insert_id : '',
    insert_date : '',
    modify_id : '',
    modified_date : '',
    sizes : [],
    images :[],
    colors : []
}

export interface IProducts {
    products : Array<IProduct>
}

export const initialProducts : IProducts = {
    products : []
}

