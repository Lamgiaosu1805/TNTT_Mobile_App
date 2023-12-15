import { createSlice } from '@reduxjs/toolkit'

const memberXuDoan = createSlice({
    name: 'memberXuDoan',
    initialState: [],
    reducers: {
        storeListMemberXuDoan: (state, action) => {
            state = action.payload
            return state
        },
        addMemberXuDoan:(state, action) => {
            console.log(action.payload);
            return state
        }
    }
});
const {reducer, actions} = memberXuDoan;
export const {storeListMemberXuDoan, addMemberXuDoan} = actions;
export default reducer;