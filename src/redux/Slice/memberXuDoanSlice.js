import { createSlice } from '@reduxjs/toolkit'
const initialState = []
const memberXuDoan = createSlice({
    name: 'memberXuDoan',
    initialState: initialState,
    reducers: {
        storeListMemberXuDoan: (state, action) => {
            state = action.payload
            return state
        },
        addMemberXuDoan:(state, action) => {
            state.push(action.payload);
        },
        resetMemberXuDoan: (state, action) => {
            return initialState;
        }
    },
});
const {reducer, actions} = memberXuDoan;
export const {storeListMemberXuDoan, addMemberXuDoan, resetMemberXuDoan} = actions;
export default reducer;