import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../../models/cart.model";
import { initialOrder, IOrder } from "../../models/order.model";

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialOrder,
    reducers: {
        setID : (state,action : PayloadAction<string>) => {
            state.id = action.payload;
        } ,
        setCart : (state,action : PayloadAction<ICart>) => {
            state.cart = action.payload
        },
        setAddress : (state,action : PayloadAction<string>) => {
            state.address = action.payload
        },
        setPaymentMethod : (state,action : PayloadAction<0|1|2|3>) => {
            state.paymentMethod = action.payload
        },
        setPhoneNumber : (state,action:PayloadAction<string>) => {
            state.phoneNumber = action.payload
        },
        setFullname : (state,action : PayloadAction<string> ) => {
            state.fullname = action.payload
        }
    }
})

export const {setID,setCart,setAddress,setPaymentMethod, setPhoneNumber, setFullname } = orderSlice.actions