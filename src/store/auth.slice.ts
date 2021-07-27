import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/search-panel";
import * as auth from "auth-provider";
import { AuthForm, bootstrapUser } from "context/auth-contex";
import { AppDispatch, RootState } from "store";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (from: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(from).then((user) => dispatch(setUser(user)));
export const register = (from: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(from).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));
