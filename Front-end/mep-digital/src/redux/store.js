import { configureStore } from '@reduxjs/toolkit';
import { courseReducer } from './courseReducer';
import { userReducer} from './userReducer';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    coursesInfo: courseReducer
  },
});