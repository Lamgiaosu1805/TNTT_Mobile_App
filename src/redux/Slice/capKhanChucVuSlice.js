import { createSlice } from '@reduxjs/toolkit'

const capKhanChucVu = createSlice({
    name: 'capKhanChucVu',
    initialState: null,
    reducers: {
        storeCapKhanChucVu: (state, action) => {
            state = action.payload
            return state
        }
    }
});
const {reducer, actions} = capKhanChucVu;
export const {storeCapKhanChucVu} = actions;
export default reducer;