import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, initialAuth } from "../../models/auth.model";
import { intitialTokens, ITokens } from "../../models/tokens.model";

export const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuth,
    reducers : {
        saveInfor : (state,action : PayloadAction<IAuth>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.tokens = action.payload.tokens;
            state.user = action.payload.user;
        },
        logout : (state) => {
            state.isLoggedIn = false;
            state.tokens = null;
            state.user = null;
        }
    }
})
export const {saveInfor,logout} = authSlice.actions;