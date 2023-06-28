import { configureStore } from "@reduxjs/toolkit";
import { drawerSlice } from "./drawerSlice";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { ticketSlice } from "./ticketSlice";
import { headSlice } from "./headSlice";
import { paymentSlice } from "./paymentSlice";

const store = () => configureStore({
    reducer: {
        [drawerSlice.name]: drawerSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [ticketSlice.name]: ticketSlice.reducer,
        [headSlice.name]: headSlice.reducer,
        [paymentSlice.name]: paymentSlice.reducer,
    }
})

export const wrapper = createWrapper(store);