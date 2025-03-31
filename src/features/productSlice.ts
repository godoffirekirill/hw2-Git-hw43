import {ProductType} from "../utils/types-bakery-shop.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:{products:ProductType[]}={products:[]}

const productSlice = createSlice({
    name: "currProduct",
    initialState,
    reducers: {
        setAllProducts: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload
        },

    }
})
export const productsReduser =productSlice.reducer;
export const {setAllProducts}= productSlice.actions;