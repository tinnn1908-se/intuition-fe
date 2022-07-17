import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUser, IUser } from "../../models/user.model";

export const userSlice = createSlice({
    name : 'user',
    initialState : initialUser,
    reducers : {
       setCurrentUser : (state,action : PayloadAction<IUser>) => {
            state = action.payload;
            console.log("state.fullname : " + state.fullname)
       }
    }
})
export const {setCurrentUser} = userSlice.actions