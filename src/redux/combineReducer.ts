import { combineReducers } from '@reduxjs/toolkit';

//reducers
import { USER_DETAILS, userReducer } from './userSlice';
import { VERIFY_OTP, verifyOtpReudcer } from './verifyOtp';

export const reducers = combineReducers({
  [USER_DETAILS]: userReducer,
  [VERIFY_OTP]: verifyOtpReudcer,
});
