import { createSlice } from '@reduxjs/toolkit'

const xuDoan = createSlice({
    name: 'XuDoan',
    initialState: null,
    reducers: {
        storeXuDoan: (state, action) => {
            state = action.payload
            return state
        }
    }
});
const {reducer, actions} = xuDoan;
export const {storeXuDoan} = actions;
export default reducer;