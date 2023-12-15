import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slice/userSlice'
import capKhanChucVuReducer from './Slice/capKhanChucVuSlice'

const rootReducer = {
    user: userReducer,
    capKhanChucVu: capKhanChucVuReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store