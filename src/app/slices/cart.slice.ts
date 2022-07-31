import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, initialCart } from "../../models/cart.model";
import CartService from "../../services/cart.service";
import { AppDispatch } from "../store";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            var pos = CartService.isExistedItem(state, action.payload);
            console.log("pos : " + pos)
            console.log(state.items)
            if (pos != null && pos >= 0) {
                state.items[pos].quantity += action.payload.quantity;
            } else {
                state.items = [...state.items, action.payload]
            }
            console.log(state.items)
            state.quantity += action.payload.quantity;
            console.log(Number(action.payload.product.price))
            console.log(action.payload.quantity)
            console.log((Number(action.payload.product.price) * action.payload.quantity))
            console.log(state.total)
            state.total += (Number(action.payload.product.price) * action.payload.quantity);
        },
        removeFromCart: (state, action: PayloadAction<ICartItem>) => {
            console.log("removeFromCart")

            // for (let index = 0; index < state.items.length; index++) {
            //     if (state.items[index].product.no === action.payload.product.no
            //         && state.items[index].color === action.payload.color
            //         && state.items[index].size === action.payload.size
            //     ) {
            //         state.items.splice(index, 1);
            //     }
            // }
            var pos = CartService.isExistedItem(state, action.payload);
            if (pos != null && pos >= 0) {
                state.items.splice(pos, 1);
                state.quantity -= action.payload.quantity;
                state.total -= (Number(action.payload.product.price) * action.payload.quantity);
            }

            // state.items.forEach(item => {
            //     console.log(item.product.no)
            // })
        },
        updateQuantity: (state, action: PayloadAction<{
            type: string,
            item: ICartItem,
            quantity: number,

        }>) => {
            switch (action.payload.type) {
                case 'increment':
                    // for (let index = 0; index < state.items.length; index++) {
                    //     const element = state.items[index];
                    //     if (element.product.no === action.payload.item.product.no) {
                    //         element.quantity += action.payload.quantity;
                    //         state.quantity += action.payload.quantity;
                    //         console.log(Number(element.product.price))
                    //         console.log(action.payload.quantity)
                    //         state.total += (Number(element.product.price) * action.payload.quantity)
                    //     }
                    // }
                    break;
                case 'decrement':
                    // for (let index = 0; index < state.items.length; index++) {
                    //     const element = state.items[index];
                    //     if (element.product.no === action.payload.item.product.no) {
                    //         element.quantity -= action.payload.quantity;
                    //         state.quantity -= action.payload.quantity;
                    //         console.log(Number(element.product.price))
                    //         console.log(action.payload.quantity)
                    //         state.total -= (Number(element.product.price) * action.payload.quantity)
                    //     }
                    // }
                    var pos = CartService.isExistedItem(state, action.payload.item);
                    if (pos != null && pos >= 0) {
                        state.items[pos].quantity -= 1;
                        state.quantity -= action.payload.quantity;
                        state.total -= (Number(state.items[pos].product.price) * action.payload.quantity)
                    }
                    break;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.quantity = 0;
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions