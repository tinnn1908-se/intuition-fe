import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddress, initialAddress, initialAddresses } from "../../models/address.model";

export const addressSlice = createSlice({
    name : 'address',
    initialState : initialAddresses,
    reducers : {
        createAddress : (state, action : PayloadAction<IAddress>) => {
            if(action.payload.isDefault){
                state.addresses.forEach(address => address.isDefault = false);
            }
            state.addresses = [...state.addresses, action.payload];
        },
        removeAddress : (state,action : PayloadAction<IAddress>) => {
            state.addresses = state.addresses.filter(address => address.id !== action.payload.id)
        },
        setSelectingAddress : (state,action : PayloadAction<number>) => {
            state.selectingAddressID = action.payload;
        },
        updateAddress : (state, action : PayloadAction<{id : number,newIsDefault : boolean}>) => {
            if(action.payload.newIsDefault){
                state.addresses.forEach(address => address.isDefault = false);
            }
            for (let i = 0; i < state.addresses.length; i++) {
                if(state.addresses[i].id === action.payload.id){
                    state.addresses[i].isDefault = action.payload.newIsDefault;
                }
            }
        }
    }
})

export const { createAddress, removeAddress, updateAddress,setSelectingAddress} = addressSlice.actions