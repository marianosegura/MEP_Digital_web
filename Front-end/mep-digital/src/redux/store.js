import { configureStore } from '@reduxjs/toolkit';
import { courseReducer } from './courseReducer';
import { userReducer} from './userReducer';
import { teachersReducer } from './teachersReducer'
import { studentsReducer } from './studentsReducer';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    coursesInfo: courseReducer,
    teachersInfo: teachersReducer,
    studentsInfo: studentsReducer
  },
});