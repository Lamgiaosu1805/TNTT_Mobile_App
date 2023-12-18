import { createSlice } from '@reduxjs/toolkit'
const initialState = null;
const user = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        storeUser: (state, action) => {
            state = action.payload
            return state
        },
        resetUser: (state, action) => {
            return initialState;
        }
    }
});
const {reducer, actions} = user;
export const {storeUser, resetUser} = actions;
export default reducer;