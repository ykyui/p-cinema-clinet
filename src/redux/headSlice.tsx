import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const headSlice = createSlice({
    name: "head",
    initialState: {
        title: "",
    },
    reducers: {
        updateHead(state, action: PayloadAction<{ title: string }>) {
            state.title = action.payload.title;
        },
    }
})

export const headState = (state) => state.head;

export const { updateHead } = headSlice.actions;
