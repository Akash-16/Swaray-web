import { AnyAction, createSlice, Dispatch } from '@reduxjs/toolkit';
import { ConfirmationResult } from 'firebase/auth';

interface IState {
  recaptchaVerifier: any;
}

const initialState: IState = {
  recaptchaVerifier: {}
};

export const VERIFY_OTP = 'verifyOtp';

export const LoggedInUser = createSlice({
  name: VERIFY_OTP,
  initialState,
  reducers: {
    verifyUserOtp: (state, actions) => {
      state.recaptchaVerifier = actions.payload;
    }
  }
});

export const { verifyUserOtp } = LoggedInUser.actions;

export const verifyOtpReudcer = LoggedInUser.reducer;

export const recaptchaDetails = (recaptchaData: ConfirmationResult): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(verifyUserOtp(recaptchaData));
    } catch (err: any) {
      throw new Error(err);
    }
  };
};
