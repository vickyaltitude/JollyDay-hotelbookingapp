import {createSlice} from "@reduxjs/toolkit"

const clientInitialState = {
    clientToken: null
}

const clientReducer = createSlice({
     name: 'clientauth',
     initialState: clientInitialState,
     reducers:{
         setClientToken(state,action){
             state.clientToken = action.payload
         }
     }
})

export const clientReducerActions = clientReducer.actions;

export default clientReducer.reducer