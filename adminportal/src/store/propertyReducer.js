import { createSlice } from "@reduxjs/toolkit";

const propertyInitialState = {
    properties:[]
}

const propertyReducer = createSlice({
    name: 'propertyreducer',
    initialState: propertyInitialState,
    reducers:{
        setProperties(state,action){
            state.properties = action.payload
        }
    }
})

export const propertyReducerActions = propertyReducer.actions

export default propertyReducer.reducer;