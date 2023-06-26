import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface InitialState {
    open: boolean
    drawerType: 'TICKETS' | 'THEATRES' | 'SEARCH' | 'ACCOUNT'
}

const initialState: InitialState = {
    open: false,
    drawerType: 'TICKETS'
}

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        openDrawer(state, action: PayloadAction<'TICKETS' | 'THEATRES' | 'SEARCH' | 'ACCOUNT'>) {
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