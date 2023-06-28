import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface InitialState {
    open: boolean
    drawerType: 'TICKETS' | 'THEATRES' | 'SEARCH' | 'ACCOUNT' | 'PAYMENT'
}

const initialState: InitialState = {
    open: false,
    drawerType: 'TICKETS'
}

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        openDrawer(state, action: PayloadAction<'TICKETS' | 'THEATRES' | 'SEARCH' | 'ACCOUNT' | 'PAYMENT'>) {
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