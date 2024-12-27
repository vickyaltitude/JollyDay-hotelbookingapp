import { createSlice } from "@reduxjs/toolkit";

const propertyInitialState = {
    properties:[],
    propertyLoading: true
}

const propertyReducer = createSlice({
    name: 'propertyreducer',
    initialState: propertyInitialState,
    reducers:{
        setProperties(state,action){
            state.properties = action.payload
        },
        setPropertyLoad(state){
            state.propertyLoading = false
        }
    }
})

export const propertyReducerActions = propertyReducer.actions

export default propertyReducer.reducer;