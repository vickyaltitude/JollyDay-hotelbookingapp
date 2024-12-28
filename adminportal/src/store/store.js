import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './adminReducer';
import propertyReducer from './propertyReducer';
import bookingReducer from './bookingReducer';

const store = configureStore({
    reducer: { admin: adminReducer,property: propertyReducer,bookings:bookingReducer }
})

export default store;