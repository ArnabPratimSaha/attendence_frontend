import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import { attendenceReducer } from './attendenceReducer';
import { classReducer } from './classReducer';
const store = configureStore({
    reducer: {
      user:userReducer,
      attendence:attendenceReducer,
      classData:classReducer
    },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch