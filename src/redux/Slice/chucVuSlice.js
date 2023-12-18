import { createSlice } from '@reduxjs/toolkit'

const chucVu = createSlice({
    name: 'chucVu',
    initialState: [],
    reducers: {
        storeChucVu: (state, action) => {
            state = action.payload
            return state
        }
    }
});
const {reducer, actions} = chucVu;
export const {storeChucVu} = actions;
export default reducer;