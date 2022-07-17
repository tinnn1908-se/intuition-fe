import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialProducts, IProduct } from "../../models/product.model";

export const productSlice = createSlice({
    name : 'products',
    initialState : initialProducts,
    reducers : {
        loadProducts : (state,action : PayloadAction<Array<IProduct>>) => {
            state.products = action.payload;
        }
    }
})

export const {loadProducts} = productSlice.actions