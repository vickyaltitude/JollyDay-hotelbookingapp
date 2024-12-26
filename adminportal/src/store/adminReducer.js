import {createSlice} from '@reduxjs/toolkit';

const adminInitialState = {
    adminAuthToken : null,
    adminDetails: {}
}

const adminReducer = createSlice({
    name: 'adminreducer',
    initialState: adminInitialState,
    reducers:{
        setAdminAuthToken(state,action){
            state.adminAuthToken = action.payload
        },
        setAdminDetails(state,action){
             state.adminDetails = action.payload
        }
    }
})

export const adminReducerActions = adminReducer.actions;

export default adminReducer.reducer;