import { AnyAction, createSlice, Dispatch } from '@reduxjs/toolkit';

import { Client } from '../config';
import { apiRoutes } from '../constants/apiRoutes';
import { UserDetails } from '../common/interface/userDetails.interface';
import { ErrorCallback } from 'typescript';

interface IState {
  userDetails: any;
  isLoading: boolean;
}

const initialState: IState = {
  userDetails: {},
  isLoading: false
};

export const USER_DETAILS = 'userDetails';

export const LoggedInUser = createSlice({
  name: USER_DETAILS,
  initialState,
  reducers: {
    getUserDetails: (state, actions) => {
      state.userDetails = actions.payload;
    },
    updateLoading: (state, actions) => {
      state.isLoading = actions.payload;
    }
  }
});

export const { getUserDetails, updateLoading } = LoggedInUser.actions;

export const userReducer = LoggedInUser.reducer;

export const userDetails = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(updateLoading(true));
      const details = await Client.get(apiRoutes.userDetails);
      dispatch(getUserDetails(details.data.data));
      dispatch(updateLoading(false));
    } catch (err: any) {
      dispatch(updateLoading(false));
      throw new Error(err);
    }
  };
};
