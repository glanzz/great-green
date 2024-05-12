import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";
import { User } from "../models/user";

export type UserState = User;


const initiateState: UserState = {
  username: "",
  name: "",
  email: "",
  gender: "",
  locationX: 0,
  locationY: 0,
  badges: []
};

export const usersSlice = createSlice({
  name: 'user',
  initialState: initiateState,
  reducers: {
    loadUserInfo: (state: UserState, action: PayloadAction<UserState>) => action.payload
  }
}) ;


export const { loadUserInfo } = usersSlice.actions;


export const getUser = (): ((state: AppState) => UserState) => {
    return (state: AppState) => state.user;
}
export const isLoggedIn = (): ((state: AppState) => boolean) => {
    return (state: AppState) => {
      return !!state.user.username;
    };
}

export default usersSlice.reducer;