import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import loginSlice from "../slicers/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
