import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import moment from "moment/moment";
import { Theatre } from "../model/theatre";
import { Movie } from "../model/movie";
import { Field } from "../model/field";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openDrawer } from "./drawerSlice";

interface _TicketStatus {
    date: string
    movie: Movie | undefined
    theatre: Theatre | undefined
    field: Field | undefined
    action: string
    availableTheatres: Theatre[]
}
const initialState: _TicketStatus = {
    date: dayjs().format("YYYY-MM-DD"),
    movie: undefined,
    theatre: undefined,
    field: undefined,
    action: "ticket",
    availableTheatres: []
}


export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        selectAllMovie(state) {
            state.movie = undefined
            state.action = "ticket";
        },
        selectAllTheatres(state) {
            state.theatre = undefined
            state.action = "ticket";
        },
        updateSearch(state, action: PayloadAction<{ movie?: Movie | undefined, date?: string | undefined, theatre?: Theatre | undefined }>) {
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