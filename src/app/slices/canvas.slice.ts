import { createSlice } from "@reduxjs/toolkit"

export interface IOffCanvas {
    type : number, // 0 is SearchBox, 1 is Cart
    isSearchBoxShown : boolean,
    isMyCartShown : boolean,
    isFilterShown : boolean,
    isEnableScroll : boolean,
    placement : 'start' | 'end'
}

export const initialSearchBox : IOffCanvas = {
    type : 1,
    isSearchBoxShown : false,
    isMyCartShown : false,
    isEnableScroll : false,
    isFilterShown : false,
    placement : 'start'
}

export const canvasSlice = createSlice({
    name : 'canvas',
    initialState : initialSearchBox,
    reducers : {
        setSearchBoxShown : (state) => {
            state.isSearchBoxShown = true
            state.isMyCartShown = false
            state.isFilterShown = false
        },
        setSearchBoxHidden : (state) => {
            state.isSearchBoxShown = false
        },
        setMyCartShown : (state) => {
            state.isMyCartShown = true
            state.isSearchBoxShown = false
            state.isFilterShown = false
        },
        setMyCartHidden : (state) => {
            state.isMyCartShown = false
        },
        setMyFilterShown : (state) => {
            state.isFilterShown = true
            state.isMyCartShown = false
            state.isSearchBoxShown = false
        },
        setMyFilterHidden : (state) => {
            state.isFilterShown = false
        }

    }
})

export const {setSearchBoxShown,setSearchBoxHidden,
    setMyCartHidden,setMyCartShown,
    setMyFilterShown,setMyFilterHidden} = canvasSlice.actions;