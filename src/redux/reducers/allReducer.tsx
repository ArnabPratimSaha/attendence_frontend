import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import { attendanceReducer } from './attendenceReducer';
import { classReducer } from './classReducer';
const store = configureStore({
    reducer: {
      user:userReducer,
      attendence:attendanceReducer,
      classData:classReducer
    },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch