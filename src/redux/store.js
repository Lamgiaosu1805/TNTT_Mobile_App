import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slice/userSlice'
import capKhanReducer from './Slice/capKhanSlice'
import chucVuReducer from './Slice/chucVuSlice'
import memberXuDoanReducer from './Slice/memberXuDoanSlice'

const rootReducer = {
    user: userReducer,
    capKhan: capKhanReducer,
    memberXuDoan: memberXuDoanReducer,
    chucVu: chucVuReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store