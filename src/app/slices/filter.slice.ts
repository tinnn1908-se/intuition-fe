import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialFilter } from "../../models/filter.model";

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilter,
    reducers: {
        addFilter: (state, action: PayloadAction<{
            type: "cate" | "color" | "size" | "price"
            title: string
        }>) => {
            switch (action.payload.type) {
                case "cate":
                    state.cates = [...state.cates, action.payload.title]
                    break;
                case "color":
                    state.colors = [...state.colors, action.payload.title]
                    break;
                case "size":
                    state.sizes = [...state.sizes, action.payload.title]
                    break;
                case "price":
                    console.log(action.payload.title)
                    var prices = action.payload.title.split("-");
                    state.price = {
                        min: Number(prices[0]),
                        max: Number(prices[1])
                    }
                    console.log('min : ' + state.price.min)
                    console.log('max : ' + state.price.max)
                    break;
                default:
                    break;
            }
        },
        removeFilter: (state, action: PayloadAction<{
            type: "cate" | "color" | "size" | "price"
            title: string
        }>) => {
            switch (action.payload.type) {
                case "cate":
                    state.cates = state.cates.filter(cate => cate !== action.payload.title)
                    console.log('cate : ' + action.payload.title)
                    var el = document.getElementById(`${action.payload.title}`);
                    console.log('el : ' + el);
                    if (el) {
                        console.log('el : ' + el.ariaChecked);
                        el.setAttribute('checked', 'false');
                    }
                    break;
                case "color":
                    state.colors = state.colors.filter(color => color !== action.payload.title)
                    break;
                case "size":
                    state.sizes = state.sizes.filter(size => size !== action.payload.title)
                    break;
                case "price":
                    state.price = {
                        min: 0,
                        max: 10000000
                    }
                    break;
                default:
                    break;
            }
        },
        clearCateFilter: (state) => {
            state.cates = []
        }
    }
})

export const { addFilter, removeFilter,clearCateFilter } = filterSlice.actions