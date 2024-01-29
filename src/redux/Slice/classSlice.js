import { createSlice } from '@reduxjs/toolkit'

const classes = createSlice({
    name: 'classes',
    initialState: [],
    reducers: {
        storeClass: (state, action) => {
            state = action.payload
            return state
        },
        addClass: (state, action) => {
            state.push(action.payload);
        }
    }
});
const {reducer, actions} = classes;
export const {storeClass, addClass} = actions;
export default reducer;