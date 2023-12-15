import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slice/userSlice'
import capKhanChucVuReducer from './Slice/capKhanChucVuSlice'
import memberXuDoanReducer from './Slice/memberXuDoanSlice'

const rootReducer = {
    user: userReducer,
    capKhanChucVu: capKhanChucVuReducer,
    memberXuDoan: memberXuDoanReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store