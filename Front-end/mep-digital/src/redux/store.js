import { configureStore } from '@reduxjs/toolkit';
import { courseReducer } from './courseReducer';
import { userReducer} from './userReducer';
import { teachersReducer } from './teachersReducer'

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    coursesInfo: courseReducer,
    teachersInfo: teachersReducer
  },
});