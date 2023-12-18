import { createSlice } from '@reduxjs/toolkit'

const capKhan = createSlice({
    name: 'capKhan',
    initialState: [],
    reducers: {
        storeCapKhan: (state, action) => {
            state = action.payload
            return state
        }
    }
});
const {reducer, actions} = capKhan;
export const {storeCapKhan} = actions;
export default reducer;