import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";
import { Theatre } from "../model/theatre";
import { Movie } from "../model/movie";
import { Field } from "../model/field";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openDrawer } from "./drawerSlice";
import { Seat } from "../model/seat";

interface _PaymentStatus {
  field: number;
  adult: number;
  student: number;
  child: number;
  disabled: number;
  selectedSeat: Seat[];
}
const initialState: _PaymentStatus = {
  field: 0,
  adult: 0,
  student: 0,
  child: 0,
  disabled: 0,
  selectedSeat: [],
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    initPayment(state, action: PayloadAction<_PaymentStatus>) {
      state.field = action.payload.field;
      state.adult = action.payload.adult;
      state.student = action.payload.student;
      state.child = action.payload.child;
      state.disabled = action.payload.disabled;
      state.selectedSeat = action.payload.selectedSeat;
    },
  },
});

export const paymentState = (state) => state.payment;

export const { initPayment } = paymentSlice.actions;
