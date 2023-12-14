import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        storeUser: (state, action) => {
            state = action.payload
            return state
        }
    }
});
const {reducer, actions} = user;
export const {storeUser} = actions;
export default reducer;