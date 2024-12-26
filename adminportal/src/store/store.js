import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './adminReducer';
import propertyReducer from './propertyReducer'

const store = configureStore({
    reducer: { admin: adminReducer,property: propertyReducer }
})

export default store;