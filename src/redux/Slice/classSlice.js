import { createSlice } from '@reduxjs/toolkit'
const initialState = []
const classes = createSlice({
    name: 'classes',
    initialState: initialState,
    reducers: {
        storeClass: (state, action) => {
            state = action.payload
            return state
        },
        addClass: (state, action) => {
            state.push(action.payload);
        },
        resetClass: (state, action) => {
            return initialState;
        }
    }
});
const {reducer, actions} = classes;
export const {storeClass, addClass, resetClass} = actions;
export default reducer;