import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import filtersReducer from "./filtersSlice";
import { issuesApi } from "./issuesApi";

export const store = configureStore({
  reducer: {
    [issuesApi.reducerPath]: issuesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(issuesApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
