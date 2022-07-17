import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddress } from "../../models/address.model";
import { initialPopup } from "../../models/popup.model";

export const popupSlice = createSlice({
    name: 'popup',
    initialState: initialPopup,
    reducers: {
        openCreateNewAddressPopup: (state) => {
            state.isCreateNewAddressShown = true;
            state.isEditAddressShown = false
        },
        closeCreateNewAddressPopup: (state) => {
            state.isCreateNewAddressShown = false;
        },
        openEditAddressPopup: (state) => {
            state.isEditAddressShown = true;
            state.isCreateNewAddressShown = false;
        },
        closeEditAddressPopup: (state) => {
            state.isEditAddressShown = false;
        }
    }
})

export const { openCreateNewAddressPopup, closeCreateNewAddressPopup,
    openEditAddressPopup, closeEditAddressPopup
} = popupSlice.actions