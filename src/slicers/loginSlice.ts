import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../src/app/store";
import { checkRefresh, getUsers } from "../features/counter/loginAPI";

export interface loginState {
  status: boolean;
  user: string;
  pwd: string;
  refresh: boolean;
}

const initialState: loginState = {
  status: false,
  user: "",
  pwd: "",
  refresh: false,
};

export const loginAsync = createAsyncThunk(
  "login/getUsers",
  async (cred: any) => {
    const response = await getUsers(cred.user, cred.pwd);
    return response.data;
  }
);

export const refreshTok = createAsyncThunk(
  "login/refresh",
  async (refresh: any) => {
    const response = await checkRefresh(refresh);
    return response.data;
  }
);

export const loginslice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLog(state) {
      state.status = false;
    },

    setRefreshToken: (state, actions) => {
      console.log(actions.payload);

      state.refresh = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, actions) => {
      if (actions.payload.access) {
        state.status = true;
        localStorage.setItem("refresh", actions.payload.refresh);
        sessionStorage.setItem("access", actions.payload.access);
      } else {
        state.user = "";
        state.pwd = "";
        state.status = false;
      }
    });
    builder.addCase(refreshTok.fulfilled, (state, actions) => {
      localStorage.setItem("refresh", actions.payload.refresh);
      sessionStorage.setItem("access", actions.payload.access);
    });
  },
});

export const { setRefreshToken } = loginslice.actions;

export const selectStatus = (state: RootState) => state.login.status;
export const selectPwd = (state: RootState) => state.login.pwd;
export const selectUser = (state: RootState) => state.login.user;

export default loginslice.reducer;
