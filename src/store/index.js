import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './reducers/student.slice'

export const store = configureStore({
  reducer: {
    student: studentReducer
  },
})