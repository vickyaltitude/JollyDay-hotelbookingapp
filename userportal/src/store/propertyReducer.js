import {createSlice} from "@reduxjs/toolkit";

const propertyClient = {
    properties:[],
    isLoading: true,
    sortProperty: null
}

const propertyClientReducer = createSlice({
    name: 'propertyclient',
    initialState: propertyClient,
    reducers:{
        setProperties(state,action){
           state.properties = action.payload
        },
        setIsLoading(state){
            state.isLoading = false
        },
        setSortProperty(state,action){
            state.sortProperty = action.payload
        }
    }
})


export const propertyClientReducerActions = propertyClientReducer.actions

export default propertyClientReducer.reducer