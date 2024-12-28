import {createSlice} from "@reduxjs/toolkit"

const bookingInitialState = {
     bookings:[]
}

const bookingsReducer = createSlice({
    name: 'bookingreducer',
    initialState : bookingInitialState,
    reducers:{
         setBookings(state,action){
            state.bookings = action.payload
         }
    }
})

export const bookingsReducerActions = bookingsReducer.actions;

export default bookingsReducer.reducer;