import {configureStore} from '@reduxjs/toolkit';
import clientReducer from './userReducer'
import propertyClientReducer from './propertyReducer';
import bookingsReducer from './bookingorder'

const store = configureStore({
    reducer : {client: clientReducer,propertyClient: propertyClientReducer,bookings: bookingsReducer }
})

export default store;