import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/authSlice.ts";
import {productsReduser} from "../features/productSlice.ts";
import {cartReducer} from "../features/cartSlice.ts";

export const store = configureStore({
    reducer: {
        "auth": authReducer,
        "currProduct": productsReduser,
        "cart": cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store