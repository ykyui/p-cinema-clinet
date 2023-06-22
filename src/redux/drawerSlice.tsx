import { createSlice } from "@reduxjs/toolkit"

export const drawerSlice = createSlice({
    name: "drawer",
    initialState: {
        open: false,
        drawerType: 'TICKETS'
    },
    reducers: {
        openDrawer(state, action) {
            state.open = true
            state.drawerType = action.payload
        },
        closeDrawer(state) {
            state.open = false
        }
    }
})

export const drawerState = (state) => state.drawer;

export const { openDrawer, closeDrawer } = drawerSlice.actions;