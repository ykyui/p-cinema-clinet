import { createSlice } from "@reduxjs/toolkit"
import moment from "moment/moment";

export const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        movie: undefined,
        date: moment().format("YYYY-MM-DD"),
        theatre: undefined,
        field: undefined,
        action: "ticket",
        availableTheatres: [],
    },
    reducers: {
        selectAllMovie(state, action) {
            state.movie = undefined
            state.action = "ticket"
        },
        selectAllTheatres(state, action) {
            state.theatre = undefined
            state.action = "ticket"
        },
        updateSearch(state, action) {
            state.movie = action.payload.movie ?? state.movie;
            state.date = action.payload.date ?? state.date;
            state.theatre = action.payload.theatre ?? state.theatre;
            state.action = "ticket";
        },
        changeAction(state, action) {
            state.action = action.payload
        },
        selectSeat(state, action) {
            state.field = action.payload
            state.action = "selectSeat"
        },
        updateTheatresList(state, action) {
            state.availableTheatres = action.payload
        }
    }
})

export const ticketState = (state) => state.ticket;

export const { selectAllMovie, selectAllTheatres, updateSearch, changeAction, selectSeat, updateTheatresList } = ticketSlice.actions;