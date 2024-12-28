import { createSlice } from "@reduxjs/toolkit";

const bookingOrdersInitial = {
    bookings:[]
}

const bookingOrderReducer = createSlice({
    name : 'bookingorder',
    initialState: bookingOrdersInitial,
    reducers:{
        setBookings(state,action){
           state.bookings = action.payload
        }
    }
})

export const bookingOrderReducerActions = bookingOrderReducer.actions;

export default bookingOrderReducer.reducer;